/* Portfolio 3D viewer — one shared WebGL renderer that moves to whichever project is on screen.
   Plan coordinates: x to the right, y down the drawing (metres). Three: X = x, Z = y, Y = up. */
(function(){
const T = THREE;
let seed = 7; const rnd = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// ---------- textures ----------
function ctex(w,h,fn){const c=document.createElement('canvas');c.width=w;c.height=h;fn(c.getContext('2d'),w,h);const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.encoding=T.sRGBEncoding;t.anisotropy=8;return t;}
function speck(g,w,h,cols,n,s){for(let i=0;i<n;i++){g.fillStyle=cols[Math.floor(rnd()*cols.length)];g.fillRect(rnd()*w,rnd()*h,s*(.5+rnd()),s*(.5+rnd()));}}
const TX = {};
function textures(){
  if (TX.ready) return TX;
  TX.plaster = ctex(256,256,(g,w,h)=>{g.fillStyle='#e9e4d9';g.fillRect(0,0,w,h);speck(g,w,h,['#dfd9cd','#efebe3','#e3ddd1'],2500,2);});
  // concrete roof tiles: rows of rounded tiles, 1 texture unit = 1 m
  TX.tile = ctex(256,256,(g,w,h)=>{g.fillStyle='#7e3526';g.fillRect(0,0,w,h);
    const rows=3, cols=8;
    for(let r=0;r<rows;r++){const y0=r*h/rows;
      for(let c=0;c<cols;c++){const x0=c*w/cols;const gr=g.createLinearGradient(x0,0,x0+w/cols,0);
        gr.addColorStop(0,'#7a3324');gr.addColorStop(.45,'#a9503a');gr.addColorStop(1,'#7f3727');g.fillStyle=gr;
        g.beginPath();g.moveTo(x0+2,y0+h/rows-4);g.lineTo(x0+2,y0+6);g.quadraticCurveTo(x0+w/cols/2,y0-2,x0+w/cols-2,y0+6);g.lineTo(x0+w/cols-2,y0+h/rows-4);g.closePath();g.fill();}
      g.fillStyle='rgba(40,12,6,.45)';g.fillRect(0,y0+h/rows-5,w,5);}
    speck(g,w,h,['rgba(60,20,10,.25)','rgba(255,200,170,.12)'],600,2);});
  TX.metal = ctex(256,64,(g,w,h)=>{g.fillStyle='#6f7b81';g.fillRect(0,0,w,h);for(let i=0;i<8;i++){const x=i*w/8;g.fillStyle='#8a969c';g.fillRect(x,0,6,h);g.fillStyle='#57636a';g.fillRect(x+6,0,2,h);}});
  TX.grass = ctex(256,256,(g,w,h)=>{g.fillStyle='#5f8a3f';g.fillRect(0,0,w,h);speck(g,w,h,['#557f38','#6c9849','#4f7834','#77a152'],5000,3);});
  TX.pave = ctex(256,256,(g,w,h)=>{g.fillStyle='#d8d3c8';g.fillRect(0,0,w,h);g.strokeStyle='#bdb7aa';g.lineWidth=2;for(let y=0;y<h;y+=32){for(let x=(y/32)%2?0:-32;x<w;x+=64){g.strokeRect(x,y,64,32);}}speck(g,w,h,['#cfc9bd','#e2ddd3'],900,2);});
  TX.road = ctex(256,256,(g,w,h)=>{g.fillStyle='#5d6266';g.fillRect(0,0,w,h);speck(g,w,h,['#53585c','#686d71','#4b5054'],4000,2);});
  TX.garage = ctex(64,128,(g,w,h)=>{g.fillStyle='#d9dad6';g.fillRect(0,0,w,h);for(let y=0;y<h;y+=8){g.fillStyle='#b9bbb6';g.fillRect(0,y,w,1.5);}});
  TX.timber = ctex(64,128,(g,w,h)=>{g.fillStyle='#7a5236';g.fillRect(0,0,w,h);for(let x=0;x<w;x+=4){g.fillStyle=rnd()>.5?'#6f4a30':'#86603f';g.fillRect(x,0,2,h);}});
  TX.grating = (()=>{const c=document.createElement('canvas');c.width=c.height=128;const g=c.getContext('2d');g.clearRect(0,0,128,128);g.fillStyle='#9aa2a7';for(let i=0;i<128;i+=8){g.fillRect(i,0,2,128);}for(let j=0;j<128;j+=26){g.fillRect(0,j,128,3);}const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.encoding=T.sRGBEncoding;t.anisotropy=8;return t;})();
  TX.brick = ctex(256,256,(g,w,h)=>{g.fillStyle='#b9b3a8';g.fillRect(0,0,w,h);for(let y=0,r=0;y<h;y+=16,r++){for(let x=(r%2)*-24;x<w;x+=48){const c=['#a85b3c','#b8673f','#9e5236','#c07448','#93492f'][Math.floor(rnd()*5)];g.fillStyle=c;g.fillRect(x+1,y+1,46,14);}}});
  TX.redbrick = ctex(256,256,(g,w,h)=>{g.fillStyle='#6a4038';g.fillRect(0,0,w,h);for(let y=0,r=0;y<h;y+=16,r++){for(let x=(r%2)*-24;x<w;x+=48){const c=['#7b2f25','#863829','#6f2a21','#8f3f2d'][Math.floor(rnd()*4)];g.fillStyle=c;g.fillRect(x+1,y+1,46,14);}}});
  TX.gravel = ctex(256,256,(g,w,h)=>{g.fillStyle='#a69a86';g.fillRect(0,0,w,h);speck(g,w,h,['#968a76','#b5aa96','#8c806d','#c2b8a5'],7000,2.5);});
  TX.ready = true; return TX;
}
function rep(t,x,y){const c=t.clone();c.needsUpdate=true;c.repeat.set(x,y);return c;}
const M = {};
function mats(){
  if (M.ready) return M; const t=textures();
  const SM=o=>{const m=new T.MeshStandardMaterial(Object.assign({roughness:.85,metalness:0},o)); if(o.color!==undefined&&!o.map) m.color.convertSRGBToLinear(); return m;};
  Object.assign(M,{
    wall: SM({map:t.plaster}), band: SM({color:0xe1dccf}), ctx: SM({color:0xd4d0c8}), ctxRoof: SM({color:0x9a8f87}),
    tile: SM({map:t.tile, side:T.DoubleSide}), metal: SM({map:t.metal, roughness:.65, metalness:.15, side:T.DoubleSide}),
    flat: SM({color:0xcfcac0}), fascia: SM({color:0xf4f3ef}), glass: SM({color:0x1d2a33, roughness:.08, metalness:.6, envMapIntensity:1.2}),
    frame: SM({color:0xf2f2ef, roughness:.5}), alu: SM({color:0x5f676c, roughness:.4, metalness:.5}),
    door: SM({map:t.timber}), garage: SM({map:t.garage, roughness:.6}), slab: SM({color:0xdcd7cd}),
    steel: SM({color:0x2c3236, roughness:.5, metalness:.4}), col: SM({color:0xf3f1ec}),
    grass: SM({map:rep(t.grass,40,40)}), pave: SM({map:t.pave}), road: SM({map:t.road}), kerb: SM({color:0xc9c5bb}),
    pool: SM({color:0x3f9fd0, roughness:.1, metalness:.2}), coping: SM({color:0xd5d0c5}),
    trunk: SM({color:0x6b4a34}), leaf:[0x3f7a35,0x4f8c3c,0x5d9a45,0x3b6f30].map(c=>SM({color:c,flatShading:true})),
    chimney: SM({color:0x9a5a43}),
    galv: SM({color:0xb7bdc1, roughness:.45, metalness:.6}), yellow: SM({color:0xe8c21a, roughness:.5}), yellow2: SM({color:0xf0b400, roughness:.5}),
    conc: SM({color:0xbdb8ad, roughness:.95}), tank: SM({color:0xe7e9ea, roughness:.35, metalness:.3}), tyre: SM({color:0x1e1e1e, roughness:.9}),
    grateDark: SM({color:0x8a9196, roughness:.5, metalness:.5}), brick: SM({map:t.brick}), redbrick: SM({map:t.redbrick}), darkRoof: SM({color:0x3a3f44, roughness:.7, side:T.DoubleSide})
  });
  M.ready=true; return M;
}

// ---------- scene building ----------
function build(P){
  const m = mats(); seed = 11;
  const scene = new T.Scene();
  const root = new T.Group(); scene.add(root);
  let TAGROOF=false, STG=null;
  const add = (o,parent,cast=true,recv=true)=>{o.castShadow=cast;o.receiveShadow=recv; if(TAGROOF) o.userData.roof=true; if(STG&&!o.userData.stg) o.userData.stg=STG; (parent||root).add(o);return o;};
  const box = (w,h,d,x,y,z,mat,parent,cast)=>{const g=new T.Mesh(new T.BoxGeometry(w,h,d),mat);g.position.set(x,y,z);return add(g,parent,cast!==false);};
  const texBox=(w,h,d,x,y,z,tex,face,parent)=>{const r=face==='x'?[d,h]:face==='y'?[w,d]:[w,h];const mm=new T.MeshStandardMaterial({map:rep(tex,r[0]/(tex===TX.pave?2:4),r[1]/(tex===TX.pave?1:4)),roughness:.9});return box(w,h,d,x,y,z,mm,parent,false);};
  const FL = P.fl || 3.0;

  // ---------- interiors from room layouts ----------
  const INV = new T.MeshBasicMaterial({visible:false});
  const CONC_SITE = new T.MeshStandardMaterial({color:0xbdb8ad, roughness:.95});
  const blk = P.blocks||[];
  const tf = b=>{ const th=-(b.rot||0)*Math.PI/180, c=Math.cos(th), s2=Math.sin(th); return { inv:(X,Y)=>{const dx=X-b.x, dy=Y-b.y; return [dx*c-dy*s2, dx*s2+dy*c];} }; };
  const inFoot=(b,lx,ly)=>{ if(b.planPoly){ const p=b.planPoly; let ins=false; for(let i=0,j=p.length-1;i<p.length;j=i++){ if(((p[i][1]>ly)!==(p[j][1]>ly)) && (lx < (p[j][0]-p[i][0])*(ly-p[i][1])/(p[j][1]-p[i][1])+p[i][0])) ins=!ins; } return ins; } return lx>0&&lx<b.w&&ly>0&&ly<b.d; };
  function roomsOf(bi,lvl){ const b=blk[bi], t=tf(b); return (P.rooms||[]).filter(r=>(lvl===undefined||(r.lvl||0)===lvl)).map(r=>{
      if(r.b===bi) return Object.assign({},r,{lp: r.poly? r.poly : [[r.x,r.y],[r.x+r.w,r.y],[r.x+r.w,r.y+r.d],[r.x,r.y+r.d]]});
      if(r.b===undefined){ const lp=[[r.x,r.y],[r.x+r.w,r.y],[r.x+r.w,r.y+r.d],[r.x,r.y+r.d]].map(p=>t.inv(p[0],p[1])); const xs=lp.map(p=>p[0]), ys=lp.map(p=>p[1]); if(Math.max(...xs)<=0||Math.min(...xs)>=b.w||Math.max(...ys)<=0||Math.min(...ys)>=b.d) return null; return Object.assign({},r,{lp}); }
      return null; }).filter(Boolean); }
  function hasRooms(bi){ const b=blk[bi]; return !b.ctx && !b.nowall && roomsOf(bi).length>0; }
  function doorsOf(bi,lvl){ const b=blk[bi], t=tf(b); return (P.doors||[]).filter(d=>(d.lvl||0)===lvl).map(d=>{ const th=Math.max(d.t||.14,.3), w=d.w||.81;
      const rc = d.o==='h'? [[d.x,d.y-th/2],[d.x+w,d.y+th/2]] : [[d.x-th/2,d.y],[d.x+th/2,d.y+w]];
      if(d.b===bi) return rc; if(d.b===undefined){ const a=t.inv(rc[0][0],rc[0][1]), c=t.inv(rc[1][0],rc[1][1]); const mx=[Math.min(a[0],c[0]),Math.min(a[1],c[1])], Mx=[Math.max(a[0],c[0]),Math.max(a[1],c[1])]; if(!inFoot(b,(mx[0]+Mx[0])/2,(mx[1]+Mx[1])/2)) return null; return [mx,Mx]; } return null; }).filter(Boolean); }
  const ptIn=(p,lx,ly)=>{ let ins=false; for(let i=0,j=p.length-1;i<p.length;j=i++){ if(((p[i][1]>ly)!==(p[j][1]>ly)) && (lx < (p[j][0]-p[i][0])*(ly-p[i][1])/(p[j][1]-p[i][1])+p[i][0])) ins=!ins; } return ins; };
  function greedy(grid,nx,ny,res,x0,y0){ const rects=[]; let open={};
    for(let j=0;j<=ny;j++){ const runs={}; if(j<ny){ let i=0; while(i<nx){ if(grid[j*nx+i]){ const s0=i; while(i<nx&&grid[j*nx+i]) i++; runs[s0+','+i]=[s0,i]; } else i++; } }
      const next={}; Object.keys(open).forEach(k=>{ if(runs[k]){ next[k]=open[k]; delete runs[k]; } else { const o=open[k]; rects.push([x0+o.i0*res,y0+o.j0*res,x0+o.i1*res,y0+j*res]); } });
      Object.values(runs).forEach(([a,c])=>{ next[a+','+c]={i0:a,i1:c,j0:j}; }); open=next; }
    return rects; }
  function instBoxes(rects,z0,z1,mat,parent,inset){ if(!rects.length) return; const geo=new T.BoxGeometry(1,1,1); const im=new T.InstancedMesh(geo,mat,rects.length); im.userData.stg=mat===MI.wall?'wall':mat===MI.stair?'stair':'slab'; const d=new T.Object3D();
    rects.forEach((r,i)=>{ let [a,b2,c,e]=r; d.position.set((a+c)/2,(z0+z1)/2,(b2+e)/2); d.scale.set(Math.max(.01,c-a-(inset||0)),z1-z0,Math.max(.01,e-b2-(inset||0))); d.updateMatrix(); im.setMatrixAt(i,d.matrix); });
    im.castShadow=true; im.receiveShadow=true; parent.add(im); return im; }
  const MI = { wall:new T.MeshStandardMaterial({color:0xf2efe8,roughness:.9}), slab:new T.MeshStandardMaterial({color:0xc9c4b9,roughness:.95}),
    fl:new T.MeshStandardMaterial({color:0xd9c39f,roughness:.8}), wet:new T.MeshStandardMaterial({color:0xc9dbe3,roughness:.5}), gar:new T.MeshStandardMaterial({color:0xb4b1a9,roughness:.95}),
    out:new T.MeshStandardMaterial({color:0xd6d1c6,roughness:.95}), stair:new T.MeshStandardMaterial({color:0x9a7650,roughness:.7}) };
  function interiors(b,bi,g){ const FL=P.fl||3.0, lv=b.levels||1, res=.05, tw=b.tw||P.tw||.23; const nx=Math.ceil(b.w/res), ny=Math.ceil(b.d/res);
    for(let L=0;L<lv;L++){ const rooms=roomsOf(bi,L); if(!rooms.length) continue; const grid=new Uint8Array(nx*ny), slab=new Uint8Array(nx*ny); const doors=doorsOf(bi,L);
      const exts=(P.open||[]).filter(o=>o.b===bi&&(o.lvl||0)===L&&['door','garage','slide','curtain','void'].includes(o.k)).map(o=>{ const w=o.w; return o.f==='N'?[[o.at,-.1],[o.at+w,tw+.1]]:o.f==='S'?[[o.at,b.d-tw-.1],[o.at+w,b.d+.1]]:o.f==='W'?[[-.1,o.at],[tw+.1,o.at+w]]:[[b.w-tw-.1,o.at],[b.w+.1,o.at+w]]; });
      for(let j=0;j<ny;j++) for(let i=0;i<nx;i++){ const lx=(i+.5)*res, ly=(j+.5)*res; if(!inFoot(b,lx,ly)) continue; let inRoom=null;
        for(const r of rooms){ if(ptIn(r.lp,lx,ly)){ inRoom=r; break; } }
        if(!inRoom){ let gap=false; for(const d of doors.concat(exts)){ if(lx>=d[0][0]&&lx<=d[1][0]&&ly>=d[0][1]&&ly<=d[1][1]){gap=true;break;} } if(!gap) grid[j*nx+i]=1; }
        if(!(inRoom && (inRoom.stairR||inRoom.void))) slab[j*nx+i]=1; }
      const z0=L*FL, z1=(L<lv-1)?(L+1)*FL-.19:b.h-.02;
      const walls=greedy(grid,nx,ny,res,0,0).map(r=>[Math.max(r[0],.008),Math.max(r[1],.008),Math.min(r[2],b.w-.008),Math.min(r[3],b.d-.008)]);
      instBoxes(walls,z0+.02,z1,MI.wall,g);
      if(L>0) instBoxes(greedy(slab,nx,ny,res,0,0).map(r=>[Math.max(r[0],.008),Math.max(r[1],.008),Math.min(r[2],b.w-.008),Math.min(r[3],b.d-.008)]),L*FL-.19,L*FL,MI.slab,g);
      rooms.forEach(r=>{ if(r.void) return; const xs=r.lp.map(p=>p[0]), ys=r.lp.map(p=>p[1]); const mat=r.wet?MI.wet:r.garage?MI.gar:r.outside?MI.out:MI.fl;
        if(r.poly){ const sh=new T.Shape(); r.lp.forEach((p,i)=>i?sh.lineTo(p[0],-p[1]):sh.moveTo(p[0],-p[1])); const ge=new T.ShapeGeometry(sh); ge.rotateX(-Math.PI/2); const me=new T.Mesh(ge,mat); me.position.y=z0+.03; me.receiveShadow=true; g.add(me); }
        else instBoxes([[Math.min(...xs),Math.min(...ys),Math.max(...xs),Math.max(...ys)]],z0+.005,z0+.03,mat,g);
        if(r.stair && L<lv-1){ const n=r.stair.n||14, vert=r.stair.dir==='y', rev=!!r.stair.rev; const x0=Math.min(...xs),x1=Math.max(...xs),y0=Math.min(...ys),y1=Math.max(...ys); const run=(vert?y1-y0:x1-x0)*.84, st=(vert?y0:x0)+(vert?y1-y0:x1-x0)*(rev?.08:.92);
          const tr=[]; for(let k=0;k<n;k++){ const pos=st+(rev?1:-1)*run*(k/n); const pe=pos+(rev?1:-1)*run/n; const zt=z0+(FL)*(k+1)/(n+1);
            tr.push({r: vert?[x0+.05,Math.min(pos,pe),x1-.05,Math.max(pos,pe)]:[Math.min(pos,pe),y0+.05,Math.max(pos,pe),y1-.05], z:zt}); }
          tr.forEach(t=>instBoxes([t.r],t.z-.05,t.z,MI.stair,g)); } }); } }
  // block groups
  const groups = [];
  (P.blocks||[]).forEach((b,bi)=>{
    const g = new T.Group(); g.position.set(b.x,b.z0||0,b.y); g.rotation.y = -(b.rot||0)*Math.PI/180; root.add(g); groups.push(g); g.userData.block=true; if(b.ctx) g.userData.env='ctx';
    const wm = b.ctx ? m.ctx : (b.mat ? (b.mat==='metal'? new T.MeshStandardMaterial({map:rep(TX.metal,b.w/1.5,1),roughness:.6,metalness:.2}) : b.mat==='brick'? new T.MeshStandardMaterial({map:rep(TX.brick,b.w/2,b.h/1)}) : b.mat==='redbrick'? new T.MeshStandardMaterial({map:rep(TX.redbrick,b.w/2,b.h/1)}) : m[b.mat]) : m.wall);
    if (b.poly){ // extruded polygon (local = plan coords relative to x,y)
      const sh=new T.Shape(); b.poly.forEach((p,i)=>i?sh.lineTo(p[0],-p[1]):sh.moveTo(p[0],-p[1]));
      const geo=new T.ExtrudeGeometry(sh,{depth:b.h,bevelEnabled:false}); geo.rotateX(-Math.PI/2);
      add(new T.Mesh(geo,wm),g);
      const sh2=new T.Shape(); b.poly.forEach((p,i)=>i?sh2.lineTo(p[0],-p[1]):sh2.moveTo(p[0],-p[1]));
      const rg=new T.ExtrudeGeometry(sh2,{depth:.22,bevelEnabled:false}); rg.rotateX(-Math.PI/2); const rm=new T.Mesh(rg,b.roofMat==='metal'?m.metal:m.flat); rm.position.y=b.h; add(rm,g); rm.userData.roof=true;
      return;
    }
    if(!b.nowall){ const bx=box(b.w,b.h,b.d,b.w/2,b.h/2,b.d/2,wm,g); if(hasRooms(bi)) bx.material=[wm,wm,INV,INV,wm,wm]; }
    if (b.levels>1 && !b.ctx && !b.nowall){ for(let l=1;l<b.levels;l++) box(b.w+.06,.12,b.d+.06,b.w/2,l*FL+.02,b.d/2,m.band,g,false); }
    if (b.plinth) box(b.w+.04,.45,b.d+.04,b.w/2,.225,b.d/2,m.band,g,false);
    roof(b,g);
    if(hasRooms(bi)) interiors(b,bi,g);
    if (b.chimney){const c=b.chimney; box(.6,c.h,.6,c.x,c.h/2,c.y,m.chimney,g); box(.75,.12,.75,c.x,c.h+.06,c.y,m.coping,g);}
  });

  function roof(b,g){ TAGROOF=true; try{ roofInner(b,g); } finally { TAGROOF=false; } }
  function roofInner(b,g){
    const r = b.roof || {type:'hip'}; if (r.type==='none') return;
    const o = r.oh!==undefined ? r.oh : .45, pitch=(r.pitch||26)*Math.PI/180;
    const ex = r.ext||{}; // extend footprint {n,s,e,w}
    const x0=-o-(ex.w||0), x1=b.w+o+(ex.e||0), z0=-o-(ex.n||0), z1=b.d+o+(ex.s||0);
    const W=x1-x0, D=z1-z0, y=b.h;
    const rm = b.ctx ? m.ctxRoof : (r.mat==='metal'?m.metal:r.mat==='dark'?m.darkRoof:m.tile);
    if (r.type==='flat'){ box(W,.25,D,(x0+x1)/2,y+.125,(z0+z1)/2,m.flat,g); box(W+.02,.25,D+.02,(x0+x1)/2,y+.12,(z0+z1)/2,m.fascia,g,false); return; }
    if (r.type==='mono'){
      // falls toward r.fall: 'n' (low at z0) or 's'
      const rise = D*Math.tan(pitch), lowN = (r.fall||'n')==='n';
      const yA = lowN? y : y+rise, yB = lowN? y+rise : y; // yA at z0, yB at z1
      const geo=new T.BufferGeometry(); const t=.06;
      const v=[x0,yA,z0, x1,yA,z0, x1,yB,z1, x0,yB,z1];
      const pos=[], uv=[]; const L=Math.hypot(D,rise);
      const quad=(a,b2,c,d,ua,va)=>{[a,b2,c,a,c,d].forEach((k,i)=>{pos.push(v[k*3],v[k*3+1],v[k*3+2]);});};
      quad(0,1,2,3); const uvs=[[x0,0],[x1,0],[x1,L],[x0,0],[x1,L],[x0,L]]; uvs.forEach(q=>uv.push(q[0]/1.5,q[1]/1.5));
      geo.setAttribute('position',new T.Float32BufferAttribute(pos,3)); geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2)); geo.computeVertexNormals();
      const mesh=add(new T.Mesh(geo,rm),g);
      // rotate texture so ribs run down the slope: ribs are vertical in texture already (u across, v down slope) — ok
      // fascia boards
      box(W,.22,.04,(x0+x1)/2,yA-.11,z0,m.fascia,g,false); box(W,.22,.04,(x0+x1)/2,yB-.11,z1,m.fascia,g,false);
      // gable fill over the walls (wedge on top of the wall footprint)
      const wz0=0, wz1=b.d, wy0 = lowN? y : y+ (rise*(o+(ex.n||0))/D), slope=rise/D;
      const yAt = z => lowN ? y + (z-z0)*slope : y + (z1-z)*slope;
      const sh=new T.Shape(); sh.moveTo(wz0,y); sh.lineTo(wz1,y); sh.lineTo(wz1,yAt(wz1)); sh.lineTo(wz0,yAt(wz0)); sh.closePath();
      const wg=new T.ExtrudeGeometry(sh,{depth:b.w,bevelEnabled:false}); wg.rotateY(-Math.PI/2); const wm=new T.Mesh(wg,b.ctx?m.ctx:(b.mat==='metal'?new T.MeshStandardMaterial({map:rep(TX.metal,b.w/1.5,1),roughness:.6,metalness:.2}):b.mat==='brick'?new T.MeshStandardMaterial({map:rep(TX.brick,b.w/2,1)}):m.wall)); wm.position.x=b.w; add(wm,g);
      // overhang edges on gable ends
      return;
    }
    if (r.type==='gable'){ const rise=D/2*Math.tan(pitch), zc=(z0+z1)/2; const pos=[],uv=[];
      const P0=[x0,y,z0],P1=[x1,y,z0],P2=[x1,y,z1],P3=[x0,y,z1],R0=[x0,y+rise,zc],R1=[x1,y+rise,zc];
      const L=Math.hypot(D/2,rise); const q=(A,B,C,Dd,flip)=>{[[A,0,0],[B,W,0],[C,W,L],[A,0,0],[C,W,L],[Dd,0,L]].forEach(([p,u,v])=>{pos.push(...p);uv.push(u/1.0,v/1.0);});};
      q(P0,P1,R1,R0); q(P2,P3,R0,R1);
      const geo=new T.BufferGeometry(); geo.setAttribute('position',new T.Float32BufferAttribute(pos,3)); geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2)); geo.computeVertexNormals(); add(new T.Mesh(geo,rm),g);
      const sh=new T.Shape(); sh.moveTo(0,y); sh.lineTo(b.d,y); sh.lineTo(b.d/2,y+(b.d/2)*Math.tan(pitch)); sh.closePath();
      [0,b.w-.001].forEach(xx=>{ const wg=new T.ShapeGeometry(sh); const wmesh=new T.Mesh(wg,new T.MeshStandardMaterial({map:rep(TX.redbrick,b.d/2,1),side:T.DoubleSide})); wmesh.rotation.y=-Math.PI/2; wmesh.position.x=xx; add(wmesh,g); });
      box(W,.2,.04,(x0+x1)/2,y-.1,z0,m.fascia,g,false); box(W,.2,.04,(x0+x1)/2,y-.1,z1,m.fascia,g,false); return; }
    // hip roof
    const rise = Math.min(W,D)/2*Math.tan(pitch);
    const cx0=x0, cz0=z0; let pos=[], uv=[];
    const P0=[x0,y,z0],P1=[x1,y,z0],P2=[x1,y,z1],P3=[x0,y,z1];
    let R0,R1;
    if (W>=D){ R0=[x0+D/2,y+rise,z0+D/2]; R1=[x1-D/2,y+rise,z0+D/2]; }
    else { R0=[x0+W/2,y+rise,z0+W/2]; R1=[x0+W/2,y+rise,z1-W/2]; }
    const slopeLen = Math.hypot(Math.min(W,D)/2, rise);
    function face(pts, e, n, p0){ // e: unit eave dir (x,z); n: unit inward dir (x,z); p0: an eave point
      for(let i=1;i<pts.length-1;i++){ [pts[0],pts[i],pts[i+1]].forEach(p=>{pos.push(p[0],p[1],p[2]);
        const dx=p[0]-p0[0], dz=p[2]-p0[2]; const u=dx*e[0]+dz*e[1]; const vv=(dx*n[0]+dz*n[1])/Math.cos(pitch); uv.push(u/1.0, vv/1.0);}); }
    }
    if (W>=D){
      face([P0,R0,R1,P1],[1,0],[0,1],P0);          // north slope
      face([P2,R1,R0,P3],[-1,0],[0,-1],P2);         // south slope
      face([P3,R0,P0],[0,-1],[1,0],P3);             // west hip
      face([P1,R1,P2],[0,1],[-1,0],P1);             // east hip
    } else {
      face([P3,R1,R0,P0],[0,-1],[1,0],P3);          // west slope
      face([P1,R0,R1,P2],[0,1],[-1,0],P1);          // east slope
      face([P0,R0,P1],[1,0],[0,1],P0);              // north hip
      face([P2,R1,P3],[-1,0],[0,-1],P2);            // south hip
    }
    const geo=new T.BufferGeometry(); geo.setAttribute('position',new T.Float32BufferAttribute(pos,3)); geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2)); geo.computeVertexNormals();
    add(new T.Mesh(geo,rm),g);
    // fascia + soffit
    const ft=.2; box(W,ft,.04,(x0+x1)/2,y-ft/2,z0,m.fascia,g,false); box(W,ft,.04,(x0+x1)/2,y-ft/2,z1,m.fascia,g,false);
    box(.04,ft,D,x0,y-ft/2,(z0+z1)/2,m.fascia,g,false); box(.04,ft,D,x1,y-ft/2,(z0+z1)/2,m.fascia,g,false);
    box(W,.02,D,(x0+x1)/2,y-ft,(z0+z1)/2,m.fascia,g,false);
  }

  // openings
  (P.open||[]).forEach(op=>{
    const b=P.blocks[op.b], g=groups[op.b];
    const lvl=op.lvl||0, z0=lvl*FL + (op.sill!==undefined?op.sill:(op.k==='win'?0.9:0));
    const w=op.w, h=op.h || (op.k==='win'?1.2:op.k==='garage'?2.2:2.1);
    const face=op.f, at=op.at;
    // local frame for the face: centre position & outward axis
    let cx,cz,rotY; const out=.03;
    if(face==='N'){cx=at+w/2;cz=-out;rotY=Math.PI;}
    else if(face==='S'){cx=at+w/2;cz=b.d+out;rotY=0;}
    else if(face==='W'){cx=-out;cz=at+w/2;rotY=-Math.PI/2;}
    else {cx=b.w+out;cz=at+w/2;rotY=Math.PI/2;}
    const og=new T.Group(); og.position.set(cx,z0,cz); og.rotation.y=rotY; g.add(og);
    const k=op.k||'win';
    if(k==='garage'){ const gm=new T.MeshStandardMaterial({map:rep(TX.garage,w/1.2,1),roughness:.6}); box(w,h,.05,0,h/2,0,gm,og,false); box(w+.16,.08,.06,0,h+.04,0,m.frame,og,false);}
    else if(k==='door'){ box(w,h,.05,0,h/2,0,m.door,og,false); box(w+.1,.05,.06,0,h+.025,0,m.frame,og,false); box(.05,h,.06,-w/2-.025,h/2,0,m.frame,og,false); box(.05,h,.06,w/2+.025,h/2,0,m.frame,og,false);}
    else if(k==='void'){ box(w,h,.05,0,h/2,-.02,new T.MeshStandardMaterial({color:0x3a3a38}),og,false);}
    else { // glazing: win, slide, curtain
      box(w,h,.04,0,h/2,0,m.glass,og,false);
      const fm = k==='curtain'? m.alu : m.frame, ft=.05;
      box(w+ft*2,ft,.07,0,h+ft/2,0,fm,og,false); box(w+ft*2,ft,.07,0,-ft/2,0,fm,og,false);
      box(ft,h,.07,-w/2-ft/2,h/2,0,fm,og,false); box(ft,h,.07,w/2+ft/2,h/2,0,fm,og,false);
      const nv = k==='curtain'? Math.max(1,Math.round(w/0.9)) : (w>1.0?Math.round(w/0.75):1);
      for(let i=1;i<nv;i++) box(.035,h,.06,-w/2+i*w/nv,h/2,0,fm,og,false);
      if(k==='curtain'){ const nh=Math.max(1,Math.round(h/1.2)); for(let i=1;i<nh;i++) box(w,.035,.06,0,i*h/nh,0,fm,og,false); }
      else if(k==='win' && h>0.8) box(w,.035,.06,0,h*0.72,0,fm,og,false);
      if(k==='win') box(w+.14,.05,.14,0,-.06,.05,m.band,og,false);
    }
  });

  // helper to place in plan or block-local coordinates
  const parentOf = e => e.b!==undefined ? groups[e.b] : root;
  STG='slab'; (P.slabs||[]).forEach(s=>box(s.w,s.t||.2,s.d,s.x+s.w/2,s.z-(s.t||.2)/2,s.y+s.d/2,s.mat?m[s.mat]:m.slab,parentOf(s)));
  STG='col'; (P.cols||[]).forEach(c=>{const pa=parentOf(c), h=c.h||2.8;
    if(c.sq){ box(.2,h,.2,c.x,h/2,c.y,m.steel,pa); }
    else { const cy=new T.Mesh(new T.CylinderGeometry(.125,.135,h-.6,16),m.col); cy.position.set(c.x,h/2,c.y); add(cy,pa);
      box(.4,.3,.4,c.x,.15,c.y,m.col,pa); box(.4,.3,.4,c.x,h-.15,c.y,m.col,pa);} });
  STG='rail'; (P.rails||[]).forEach(r=>{const pa=parentOf(r); const dx=r.x2-r.x1, dy=r.y2-r.y1, L=Math.hypot(dx,dy), ang=Math.atan2(dy,dx);
    const rg=new T.Group(); rg.position.set(r.x1,r.z,r.y1); rg.rotation.y=-ang; pa.add(rg); const H=1.0;
    box(L,.05,.05,L/2,H,0,m.steel,rg,false); box(L,.04,.04,L/2,.1,0,m.steel,rg,false);
    const n=Math.floor(L/.12); const ig=new T.BoxGeometry(.02,H-.1,.02); const im=new T.InstancedMesh(ig,m.steel,n); im.userData.stg='rail'; const d=new T.Object3D();
    for(let i=0;i<n;i++){d.position.set((i+.5)*L/n,H/2+.05,0);d.updateMatrix();im.setMatrixAt(i,d.matrix);} rg.add(im); });

  // ---------- industrial primitives (plan x,y; z up) ----------
  const V3=(p)=>new T.Vector3(p[0],p[2],p[1]);
  const MM = k => (typeof k==='object'&&k&&k.isMaterial)?k:(m[k]||m.steel);
  function member(a,b,s,mat,parent){ const A=V3(a),B=V3(b),L=A.distanceTo(B); if(L<1e-3) return;
    const sw=Array.isArray(s)?s[0]:s, sh=Array.isArray(s)?s[1]:s;
    const g=new T.Mesh(new T.BoxGeometry(sw,sh,L),MM(mat)); g.position.copy(A).add(B).multiplyScalar(.5); g.lookAt(B); return add(g,parent); }
  STG=null; const memberList=(P.members||[]); memberList.forEach(e=>member(e.a,e.b,e.s||.15,e.m||'steel'));
  (P.plates||[]).forEach(p=>{ STG=p.m==='grating'?'deck':'slab'; const mat = p.m==='grating' ? new T.MeshStandardMaterial({map:rep(TX.grating,p.w/1,p.d/1),roughness:.6,metalness:.4,transparent:true,alphaTest:.35,side:T.DoubleSide}) : MM(p.m||'slab');
    box(p.w,p.t||.05,p.d,p.x+p.w/2,p.z-(p.t||.05)/2,p.y+p.d/2,mat,root,p.m!=='grating'); STG=null; });
  STG='found'; (P.plinths||[]).forEach(p=>box(p.w,p.h,p.d||p.w,p.x,p.z0!==undefined?p.z0+p.h/2:p.h/2-(p.sink||0),p.y,m.conc));
  function hrail(pts,z,mat,h){ h=h||1.1; mat=mat||'yellow'; const prev=STG; if(!STG) STG='rail';
    for(let i=0;i<pts.length-1;i++){ const a=pts[i],b=pts[i+1]; const za=a[2]!==undefined?a[2]:z, zb=b[2]!==undefined?b[2]:z;
      member([a[0],a[1],za+h],[b[0],b[1],zb+h],.045,mat); member([a[0],a[1],za+h*.5],[b[0],b[1],zb+h*.5],.035,mat); member([a[0],a[1],za+.05],[b[0],b[1],zb+.05],[.012,.1],'steel');
      const L=Math.hypot(b[0]-a[0],b[1]-a[1]), n=Math.max(1,Math.ceil(L/1.5));
      for(let k=0;k<=n;k++){ const t=k/n, x=a[0]+(b[0]-a[0])*t, y=a[1]+(b[1]-a[1])*t, zz=za+(zb-za)*t; member([x,y,zz],[x,y,zz+h],.04,mat);} } STG=prev; }
  STG=null; (P.hrails||[]).forEach(r=>hrail(r.pts,r.z||0,r.m,r.h));
  function stair(a,b,w,mat){ mat=mat||'galv'; STG='stair'; const dx=b[0]-a[0], dy=b[1]-a[1], run=Math.hypot(dx,dy), rise=b[2]-a[2]; const ux=dx/run, uy=dy/run, px=-uy*w/2, py=ux*w/2;
    member([a[0]+px,a[1]+py,a[2]],[b[0]+px,b[1]+py,b[2]],[.03,.18],mat); member([a[0]-px,a[1]-py,a[2]],[b[0]-px,b[1]-py,b[2]],[.03,.18],mat);
    const n=Math.max(2,Math.round(rise/.19)); const tg=new T.BoxGeometry(w,.03,.26); const tm=new T.InstancedMesh(tg,m.grateDark,n); const d=new T.Object3D(); const ang=Math.atan2(dx,dy);
    for(let i=1;i<=n;i++){ const t=i/(n+1); d.position.set(a[0]+dx*t,a[2]+rise*t,a[1]+dy*t); d.rotation.set(0,ang,0); d.updateMatrix(); tm.setMatrixAt(i-1,d.matrix);} tm.castShadow=true; tm.userData.stg='stair'; root.add(tm);
    [1,-1].forEach(sg=>hrail([[a[0]+sg*px,a[1]+sg*py,a[2]],[b[0]+sg*px,b[1]+sg*py,b[2]]],0,'yellow',1.0)); STG=null; }
  (P.stairs||[]).forEach(s=>stair(s.a,s.b,s.w||.9,s.m));
  function ladder(l){ STG='stair'; const w=l.w||.5, z0=l.z0, z1=l.z1, a=(l.face||0)*Math.PI/180; const cx=Math.sin(a), cy=Math.cos(a), sx=-cy, sy=cx; // c = cage side
    [1,-1].forEach(sg=>member([l.x+sx*w/2*sg,l.y+sy*w/2*sg,z0],[l.x+sx*w/2*sg,l.y+sy*w/2*sg,z1+1.1],[.065,.014],'galv'));
    for(let z=z0+.3;z<z1+.05;z+=.3) member([l.x+sx*w/2,l.y+sy*w/2,z],[l.x-sx*w/2,l.y-sy*w/2,z],.025,'galv');
    if(!l.cage) return; const R=.38, cz0=z0+(l.cageFrom!==undefined?l.cageFrom:2.2), ztop=z1+1.1;
    const P=th=>[l.x+sx*R*Math.cos(th)+cx*R*Math.sin(th), l.y+sy*R*Math.cos(th)+cy*R*Math.sin(th)];
    for(let z=cz0; z<=ztop+1e-6; z+=Math.min(.9,(ztop-cz0)/Math.max(1,Math.round((ztop-cz0)/.9)))){ for(let k=0;k<8;k++){ const p=P(Math.PI*k/8), q=P(Math.PI*(k+1)/8); member([p[0],p[1],z],[q[0],q[1],z],[.05,.01],'galv'); } if(ztop-cz0<.1) break; }
    for(let k=0;k<=4;k++){ const p=P(Math.PI*k/4); member([p[0],p[1],cz0],[p[0],p[1],ztop],[.05,.01],'galv'); } }
  (P.ladders||[]).forEach(ladder); STG='equip';
  (P.tanks||[]).forEach(t=>{ const n0=root.children.length; tankOne(t); if(t.bg) root.children.slice(n0).forEach(o=>o.userData.env='bgtank'); });
  function tankOne(t){ const mat=MM(t.m||'tank'); const c=new T.Mesh(new T.CylinderGeometry(t.r,t.r,t.h,48,1,!!t.open),mat); c.position.set(t.x,t.z0+t.h/2,t.y); add(c);
    if(t.dome){ const d=new T.Mesh(new T.SphereGeometry(t.r,48,12,0,Math.PI*2,0,.35),mat); d.scale.y=.45/Math.max(.01,1-Math.cos(.35))*(t.r>0?.12:1); d.scale.set(1,.6,1); d.position.set(t.x,t.z0+t.h-t.r*Math.cos(.35)*.6,t.y); add(d);} 
    if(t.cone){ const k=new T.Mesh(new T.ConeGeometry(t.r,t.cone,48,1,true),mat); k.rotation.x=Math.PI; k.position.set(t.x,t.z0-t.cone/2,t.y); add(k);} 
    if(t.legs){ for(let i=0;i<t.legs;i++){ const a=i/t.legs*Math.PI*2+Math.PI/4; member([t.x+Math.cos(a)*t.r*.75,t.y+Math.sin(a)*t.r*.75,t.legZ],[t.x+Math.cos(a)*t.r*.75,t.y+Math.sin(a)*t.r*.75,t.z0-(t.cone||0)*.5],.18,'steel'); } }
    if(t.ring){ const n=40; const pts=[...Array(n+1)].map((_,i)=>[t.x+Math.cos(i/n*Math.PI*2)*(t.r-.15),t.y+Math.sin(i/n*Math.PI*2)*(t.r-.15)]); hrail(pts,t.z0+t.h,'galv',1.0);} 
    (t.bands||[]).forEach(z=>{ const tr=new T.Mesh(new T.TorusGeometry(t.r+.02,.04,6,48),m.steel); tr.rotation.x=Math.PI/2; tr.position.set(t.x,z,t.y); add(tr,root,false);} ); }
  STG=null; function frame(f){ // portal frame, long axis x (length w), span d (y)
    const n=f.bays||Math.max(1,Math.round(f.w/6)), h=f.h, pitch=(f.pitch||6)*Math.PI/180, cs=f.col||.25, mat=f.m||'steel';
    const ridgeY = f.roof==='mono' ? null : f.y+f.d/2; const zr = f.roof==='mono' ? h + f.d*Math.tan(pitch) : h + f.d/2*Math.tan(pitch);
    const roofZ = yy => f.roof==='mono' ? (f.fall==='s' ? zr - (yy-f.y)*Math.tan(pitch) : h + (yy-f.y)*Math.tan(pitch)) : h + (f.d/2-Math.abs(yy-ridgeY))*Math.tan(pitch);
    const xs=[...Array(n+1)].map((_,i)=>f.x+f.w*i/n);
    xs.forEach(x=>{ [f.y,f.y+f.d].forEach(y=>{ member([x,y,0],[x,y,roofZ(y)],[cs,cs*.9],mat); if(f.plinth!==false) box(.6,.5,.6,x,.1,y,m.conc,root); });
      if(f.roof==='mono') member([x,f.y,roofZ(f.y)],[x,f.y+f.d,roofZ(f.y+f.d)],[cs*.8,cs*1.3],mat);
      else { member([x,f.y,roofZ(f.y)],[x,ridgeY,zr],[cs*.8,cs*1.3],mat); member([x,ridgeY,zr],[x,f.y+f.d,roofZ(f.y+f.d)],[cs*.8,cs*1.3],mat); } });
    // purlins + roof sheet
    TAGROOF=true; const np=Math.max(2,Math.round(f.d/1.5)); for(let j=0;j<=np;j++){ const y=f.y+f.d*j/np; member([f.x,y,roofZ(y)+.12],[f.x+f.w,y,roofZ(y)+.12],[.08,.15],'galv'); }
    if(f.sheet!==false){ const segs = f.roof==='mono' ? [[f.y,f.y+f.d]] : [[f.y,ridgeY],[ridgeY,f.y+f.d]];
      segs.forEach(([y0,y1])=>{ const o=.3; const ya=y0===f.y?y0-o:y0, yb=y1===f.y+f.d?y1+o:y1; const za=roofZ(y0)+.2+(y0===f.y? -(o*Math.tan(pitch))*(f.roof==='mono'&&f.fall==='s'?-1:1):0), zb=roofZ(y1)+.2+(y1===f.y+f.d? (f.roof==='mono'?(f.fall==='s'?-1:1):-1)*o*Math.tan(pitch):0);
        const L=Math.hypot(yb-ya,zb-za); const mm=new T.MeshStandardMaterial({map:rep(TX.metal,(f.w+.6)/1.5,1),roughness:.6,metalness:.2,side:T.DoubleSide, color:f.sheetColor||0xffffff});
        const s=new T.Mesh(new T.PlaneGeometry(f.w+.6,L),mm); s.position.set(f.x+f.w/2,(za+zb)/2,(ya+yb)/2); s.rotation.x=-Math.PI/2+Math.atan2(zb-za,yb-ya)*-1; s.rotation.order='YXZ';
        const g=new T.Group(); g.position.set(f.x+f.w/2,(za+zb)/2,(ya+yb)/2); const s2=new T.Mesh(new T.PlaneGeometry(f.w+.6,L),mm); s2.rotation.x=-Math.PI/2; const gg=new T.Group(); gg.add(s2); gg.rotation.x=-Math.atan2(zb-za,yb-ya); g.add(gg); s2.castShadow=true; s2.receiveShadow=true; g.userData.roof=true; root.add(g); }); }
    TAGROOF=false;
    // eave ties and bracing in end bays
    [f.y,f.y+f.d].forEach(y=>{ member([f.x,y,roofZ(y)],[f.x+f.w,y,roofZ(y)],[.12,.2],mat); for(let k=1;k<=(f.girts||0);k++){ const z=h*k/(f.girts+1); member([f.x,y,z],[f.x+f.w,y,z],[.06,.12],'galv'); }
      [[xs[0],xs[1]],[xs[n-1],xs[n]]].forEach(([x0,x1])=>{ const zt=roofZ(y)-.3; member([x0,y,.3],[x1,y,zt],.035,'steel'); member([x1,y,.3],[x0,y,zt],.035,'steel'); }); });
    if(f.clad){ const c=f.clad; [f.y,f.y+f.d].forEach(y=>{ const ht=(c.z1!==undefined?c.z1:roofZ(y))-c.z0; const mm=new T.MeshStandardMaterial({map:rep(TX.metal,f.w/1.5,1),side:T.DoubleSide,roughness:.6,metalness:.2}); box(f.w,ht,.04,f.x+f.w/2,c.z0+ht/2,y,mm,root); }); }
    if(f.slab!==false) box(f.w+1,.15,f.d+1,f.x+f.w/2,.075,f.y+f.d/2,m.conc,root,false);
  }
  (P.frames||[]).forEach(frame); STG=null;
  const envFrom=root.children.length;
  (P.trucks||[]).forEach(t=>{ const g=new T.Group(); g.position.set(t.x,0,t.y); g.rotation.y=-(t.rot||0)*Math.PI/180; root.add(g); const L=t.len||9.7;
    const yel=m.yellow2; const tk=new T.Mesh(new T.CylinderGeometry(1,1,L,32),m.tank); tk.rotation.z=Math.PI/2; tk.scale.set(1,1,1); tk.position.set(L/2,2.15,0); const tg=new T.Group(); tg.add(tk); tg.scale.set(1,.85,1.0); g.add(tg); tk.castShadow=true;
    box(L,.3,1.0,L/2,1.05,0,m.steel,g); box(.6,.5,1.3,L/2-.2,3.05,0,m.tank,g); [L*.12,L*.24,L*.85].forEach(x=>[-0.95,.95].forEach(z=>{const w=new T.Mesh(new T.CylinderGeometry(.5,.5,.35,20),m.tyre); w.rotation.x=Math.PI/2; w.position.set(x,.5,z); add(w,g);}));
    box(.8,2.3,2.3,L+.6,1.65,0,m.steel,g); box(1.9,2.4,2.4,L+1.95,1.75,0,yel,g); box(1.2,.9,2.42,L+2.2,2.25,0,m.glass,g); [L+1.9].forEach(x=>[-1.0,1.0].forEach(z=>{const w=new T.Mesh(new T.CylinderGeometry(.5,.5,.35,20),m.tyre); w.rotation.x=Math.PI/2; w.position.set(x,.5,z); add(w,g);})); });
  (P.fences||[]).forEach(f=>{ const pts=f.pts, H=f.h||2.1; for(let i=0;i<pts.length-1;i++){ const a=pts[i],b=pts[i+1]; member([a[0],a[1],H],[b[0],b[1],H],.05,'galv'); member([a[0],a[1],.15],[b[0],b[1],.15],.05,'galv');
      const L=Math.hypot(b[0]-a[0],b[1]-a[1]); const n=Math.floor(L/.15); const ig=new T.BoxGeometry(.03,H,.03); const im=new T.InstancedMesh(ig,m.galv,n); const d=new T.Object3D();
      for(let k=0;k<n;k++){ const t=(k+.5)/n; d.position.set(a[0]+(b[0]-a[0])*t,H/2,a[1]+(b[1]-a[1])*t); d.updateMatrix(); im.setMatrixAt(k,d.matrix);} root.add(im);} });
  root.children.slice(envFrom).forEach(o=>{ if(!o.userData.env) o.userData.env=o.isInstancedMesh||o.material===m.galv?'fence':'truck'; });
  const envSite=root.children.length;
  // ---------- site ----------
  const S=P.site; const bb=S.bounds; // [x0,y0,x1,y1] plan area of interest
  const ground=new T.Mesh(new T.PlaneGeometry(2000,2000),S.ground==='gravel'?new T.MeshStandardMaterial({map:rep(TX.gravel,500,500),roughness:1}):m.grass); ground.rotation.x=-Math.PI/2; ground.position.set((bb[0]+bb[2])/2,0,(bb[1]+bb[3])/2); ground.receiveShadow=true; ground.userData.site=true; scene.add(ground);
  (S.roads||[]).forEach(r=>{const mm=new T.MeshStandardMaterial({map:rep(TX.road,r.w/6,r.d/6),roughness:.95});const g=new T.Mesh(new T.PlaneGeometry(r.w,r.d),mm);g.rotation.x=-Math.PI/2;g.position.set(r.x+r.w/2,.01,r.y+r.d/2);g.receiveShadow=true;g.userData.site=true;scene.add(g);});
  (S.paves||[]).forEach(r=>{const mm=new T.MeshStandardMaterial({map:rep(TX.pave,r.w/2,r.d/2),roughness:.9});const g=new T.Mesh(new T.PlaneGeometry(r.w,r.d),mm);g.rotation.x=-Math.PI/2;g.position.set(r.x+r.w/2,.02,r.y+r.d/2);g.receiveShadow=true;g.userData.site=true;if(r.rot){g.rotation.z=-(r.rot)*Math.PI/180;} scene.add(g);});
  (S.concs||[]).forEach(r=>{const g=new T.Mesh(new T.PlaneGeometry(r.w,r.d),CONC_SITE); g.userData.site=true;g.rotation.x=-Math.PI/2;g.position.set(r.x+r.w/2,.015+(r.z||0),r.y+r.d/2);g.receiveShadow=true;scene.add(g);});
  (S.pools||[]).forEach(p=>{box(p.w+.6,.12,p.d+.6,p.x+p.w/2,.06,p.y+p.d/2,m.coping,root,false);box(p.w,.13,p.d,p.x+p.w/2,.07,p.y+p.d/2,m.pool,root,false);});
  if (S.walls){ const pts=S.walls, H=S.wallH||1.8; for(let i=0;i<pts.length-1;i++){const a=pts[i],c=pts[i+1]; if(!a||!c) continue; const dx=c[0]-a[0],dy=c[1]-a[1],L=Math.hypot(dx,dy); const g=new T.Mesh(new T.BoxGeometry(L,H,.23),m.wall); g.position.set((a[0]+c[0])/2,H/2,(a[1]+c[1])/2); g.rotation.y=-Math.atan2(dy,dx); add(g); const cp=new T.Mesh(new T.BoxGeometry(L+.1,.06,.3),m.coping); cp.position.set(g.position.x,H+.03,g.position.z); cp.rotation.y=g.rotation.y; add(cp,root,false);} }
  function tree(x,y,s){const t=new T.Mesh(new T.CylinderGeometry(.07*s,.12*s,2*s,8),m.trunk);t.position.set(x,s,y);add(t);
    const n=10+Math.floor(rnd()*5);for(let i=0;i<n;i++){const r=(.4+rnd()*.35)*s;const g=new T.Mesh(new T.IcosahedronGeometry(r,1),m.leaf[Math.floor(rnd()*4)]);g.position.set(x+(rnd()-.5)*1.5*s,(1.9+rnd()*1.2)*s,y+(rnd()-.5)*1.5*s);add(g);}}
  (S.trees||[]).forEach(t=>tree(t[0],t[1],t[2]||1.2));
  (S.shrubs||[]).forEach(t=>{for(let i=0;i<3;i++){const r=(t[2]||.6)*(.6+rnd()*.5);const g=new T.Mesh(new T.IcosahedronGeometry(r,1),m.leaf[Math.floor(rnd()*4)]);g.position.set(t[0]+(rnd()-.5)*.8,r*.6,t[1]+(rnd()-.5)*.8);add(g);}});

  // ---------- light ----------
  scene.add(new T.HemisphereLight(0xe3f0ff,0x5d6b4c,.35));
  const cx=(bb[0]+bb[2])/2, cz=(bb[1]+bb[3])/2, R=Math.hypot(bb[2]-bb[0],bb[3]-bb[1])/2;
  const sun=new T.DirectionalLight(0xfff0dc,1.9); sun.position.set(cx-R*.8,R*1.4,cz+R*1.1); sun.target.position.set(cx,0,cz); scene.add(sun.target);
  sun.castShadow=true; sun.shadow.mapSize.set(1536,1536); const sc=sun.shadow.camera; sc.left=-R*1.3;sc.right=R*1.3;sc.top=R*1.3;sc.bottom=-R*1.3;sc.near=.5;sc.far=R*5; sun.shadow.bias=-.0004; sun.shadow.normalBias=.03; scene.add(sun);
  scene.fog=new T.Fog(0xcfdde8,R*3.5,R*10);
  const mb=new T.Box3(); const ex=(x,y,z)=>mb.expandByPoint(new T.Vector3(x,z||0,y));
  (P.blocks||[]).forEach(b=>{ if(b.ctx) return; const th=-(b.rot||0)*Math.PI/180,c=Math.cos(th),s2=Math.sin(th); const pts=b.poly||[[0,0],[b.w||0,0],[b.w||0,b.d||0],[0,b.d||0]]; pts.forEach(p=>ex(b.x+p[0]*c+p[1]*s2, b.y-p[0]*s2+p[1]*c, (b.z0||0)+b.h)); });
  (P.members||[]).forEach(e=>{ex(e.a[0],e.a[1],e.a[2]);ex(e.b[0],e.b[1],e.b[2]);}); (P.plates||[]).forEach(p=>{ex(p.x,p.y,p.z);ex(p.x+p.w,p.y+p.d,p.z);});
  (P.tanks||[]).forEach(t=>{ if(t.bg) return; ex(t.x-t.r,t.y-t.r,t.z0+t.h); ex(t.x+t.r,t.y+t.r,0);}); (P.frames||[]).forEach(f=>{ex(f.x,f.y,f.h);ex(f.x+f.w,f.y+f.d,0);});
  (P.stairs||[]).forEach(t=>{ex(t.a[0],t.a[1],t.a[2]);ex(t.b[0],t.b[1],t.b[2]);}); if(mb.isEmpty()) mb.setFromObject(root); mb.min.y=0;
  const lvls=Math.max(1,...(P.blocks||[]).filter(b=>!b.ctx&&!b.nowall).map(b=>b.levels||1));
  root.children.slice(envSite).forEach(o=>{ if(!o.userData.env) o.userData.env='site'; });
  return {scene, root, center:[cx,cz], R, mb, levels:lvls, FL:P.fl||3.0};
}

// ---------- shared renderer ----------
let renderer, cam, ctl, envTex, active=null, cache={}, need=true, order=[];
const CLIP_V=new T.Plane(new T.Vector3(-1,0,0),1e6), CLIP_H=new T.Plane(new T.Vector3(0,-1,0),1e6), PLANES=[CLIP_V,CLIP_H];

// ---------- build sequence ----------
const STAGES=[['found','Foundations'],['col','Columns'],['brace','Bracing'],['beam','Beams'],['deck','Grating deck'],['wall','Floors & internal walls'],['shell','External walls'],['stair','Stairs & ladders'],['rail','Handrails'],['open','Doors & windows'],['equip','Tanks & equipment'],['misc','Finishes'],['roof','Roof']];
const SORD=Object.fromEntries(STAGES.map((s,i)=>[s[0],i])), SLAB=Object.fromEntries(STAGES);
function seqPrep(S){ if(S.seq) return S.seq; const root=S.root, M_=mats(); const units=new Map(); root.updateMatrixWorld(true);
  const envUp=o=>{ for(let p=o;p&&p!==root;p=p.parent){ if(p.userData.env) return true; } return false; };
  const roofUp=o=>{ for(let p=o;p&&p!==root;p=p.parent){ if(p.userData.roof) return true; } return false; };
  root.traverse(o=>{ if(!(o.isMesh)||envUp(o)) return; const ms=Array.isArray(o.material)?o.material:[o.material]; if(ms.every(mm=>mm&&mm.visible===false)) return;
    let u=o; while(u.parent && u.parent!==root && !u.parent.userData.block) u=u.parent; if(!units.has(u)) units.set(u,[]); units.get(u).push(o); });
  const OPEN=new Set([M_.glass,M_.frame,M_.door,M_.garage,M_.alu]); const v=new T.Vector3(), up=new T.Vector3();
  const list=[]; units.forEach((meshes,u)=>{ const bb=new T.Box3();
    meshes.forEach(o=>{ if(o.isInstancedMesh){ o.geometry.computeBoundingBox(); const gb=o.geometry.boundingBox, mm=new T.Matrix4(); for(let i=0;i<o.count;i++){ o.getMatrixAt(i,mm); mm.premultiply(o.matrixWorld); bb.union(gb.clone().applyMatrix4(mm)); } } else bb.expandByObject(o); });
    if(bb.isEmpty()) return; const sz=bb.getSize(new T.Vector3()); const hz=Math.max(sz.x,sz.z);
    const mats_=new Set(); meshes.forEach(o=>(Array.isArray(o.material)?o.material:[o.material]).forEach(mm=>mats_.add(mm)));
    let st=u.userData.stg||meshes.map(o=>o.userData.stg).find(Boolean)||null;
    if(roofUp(u)||meshes.some(o=>o.userData.roof)) st='roof';
    else if(!st){ if([...mats_].some(mm=>OPEN.has(mm))) st='open';
      else if(mats_.has(M_.conc)||mats_.has(M_.slab)||mats_.has(M_.coping)||mats_.has(M_.pool)) st=bb.max.y<.8?'found':'slab';
      else if(mats_.has(M_.tank)) st='equip';
      else if(mats_.has(M_.steel)||mats_.has(M_.galv)||mats_.has(M_.col)||mats_.has(M_.yellow)||mats_.has(M_.yellow2)){ st= sz.y>.7&&hz<.6 ? 'col' : (sz.y<.45||sz.y<.25*hz) ? 'beam' : 'brace'; if(mats_.has(M_.yellow)||mats_.has(M_.yellow2)) st='rail'; }
      else if(u.isMesh && u.parent && u.parent.userData.block) st=(mats_.has(M_.band)?'shell':(sz.y>1?'shell':'misc'));
      else st='misc'; }
    if(st==='slab') st='wall'; if(st==='col'&&bb.max.y-bb.min.y<.6) st='found';
    // can it "rise" (scale up from its base)? only if no x/z tilt anywhere in its chain
    u.matrixWorld.extractBasis(new T.Vector3(),up,new T.Vector3()); const rise=['col','wall','shell','found'].includes(st) && Math.abs(up.normalize().y)>.999 && !(u.isMesh&&u.geometry.type==='BoxGeometry'&&u.parent===root&&st==='col');
    const pw=u.parent.getWorldPosition(new T.Vector3());
    // world up expressed in parent space
    const inv=new T.Matrix4().copy(u.parent.matrixWorld).invert(); const dir=new T.Vector3(0,1,0).transformDirection(inv);
    list.push({u,st,bb,rise,base:bb.min.y-pw.y,p0:u.position.clone(),s0:u.scale.clone(),dir,vis:u.visible,lvl:Math.floor((bb.min.y+.25)/(S.FL||3)),sweep:bb.min.x+bb.min.z*.35}); });
  list.sort((a,b)=>(SORD[a.st]-SORD[b.st])||(a.st==='wall'?a.lvl-b.lvl||a.bb.min.y-b.bb.min.y:0)||(a.sweep-b.sweep));
  // timing: each stage a window proportional to sqrt(count); walls stage split by level
  const groups=[]; list.forEach(it=>{ const key=it.st==='wall'?'wall'+it.lvl:it.st; let g=groups[groups.length-1]; if(!g||g.key!==key){ g={key,st:it.st,items:[]}; groups.push(g);} g.items.push(it); });
  let t=0; const ANIM=.55; groups.forEach(g=>{ const dur=Math.min(2.4,Math.max(.7,.35*Math.sqrt(g.items.length))); g.t0=t; g.items.forEach((it,i)=>{ it.t0=t+(g.items.length>1?(dur-ANIM)*i/(g.items.length-1):0); }); t+=dur*.82; g.t1=t; });
  const total=t+ANIM*.4; list.forEach(it=>{ it.a=it.t0/total; it.d=ANIM/total; }); groups.forEach(g=>{ g.a=g.t0/total; g.b=g.t1/total; });
  const drop=Math.min(6,Math.max(1.6,S.R*.18));
  S.seq={list,groups,total,drop,t:1}; return S.seq; }
const ease=x=>1-Math.pow(1-x,3);
function seqApply(S,t){ const q=seqPrep(S); q.t=t; const st=S.state||{}, showRoof=st.roof!==false&&(st.floor||'all')==='all';
  q.list.forEach(it=>{ const u=it.u; let p=(t-it.a)/it.d; if(t>=.9999) p=1; p=Math.max(0,Math.min(1,p));
    if(p<=0){ u.visible=false; return; } u.visible=it.st==='roof'?showRoof:it.vis; const e=ease(p);
    if(it.rise){ const k=Math.max(.001,e); u.scale.set(it.s0.x,it.s0.y*k,it.s0.z); u.position.copy(it.p0); u.position.y=it.base+(it.p0.y-it.base)*k; }
    else { u.scale.copy(it.s0); u.position.copy(it.p0).addScaledVector(it.dir,(1-e)*q.drop); } });
  need=true; seqUI(S); }
function seqStageAt(S,t){ const q=seqPrep(S); let g=q.groups[0]; q.groups.forEach(x=>{ if(t>=x.a-1e-6) g=x; }); return t>=.9999?'Complete':(g?SLAB[g.st]:''); }
function seqUI(S){ const h=document.getElementById('v3d-'+S.id); if(!h||!S.seq) return; const t=S.seq.t;
  h.querySelectorAll('input[data-act="seq"]').forEach(r=>{ if(document.activeElement!==r) r.value=Math.round(t*1000); });
  h.querySelectorAll('.seqlab').forEach(l=>l.textContent=seqStageAt(S,t));
  h.querySelectorAll('[data-act="build"]').forEach(b=>{ b.classList.toggle('on',!!S.playing); b.innerHTML=S.playing?'&#10074;&#10074;&nbsp; Pause':(t<.9999?'&#9654;&nbsp; Resume build':'&#9654;&nbsp; Build sequence'); });
  h.classList.toggle('seqon',!!S.playing||t<.9999); }
function seqSet(id,t){ attach(id); const S=cache[id]; if(!S) return; S.playing=false; seqApply(S,t); }
function seqPlay(id){ attach(id); const S=cache[id]; if(!S) return; const q=seqPrep(S);
  if(S.playing){ S.playing=false; seqUI(S); return; }
  if(q.t>=.9999){ Object.assign(S.state,{cut:1,floor:'all',roof:true}); applyState(S); seqApply(S,0); }
  S.playing=true; S.lastT=performance.now(); seqUI(S); }
function seqTick(now){ if(!active) return; const S=active.S; if(!S.playing) return; const q=S.seq; const dt=Math.min(.1,(now-S.lastT)/1000); S.lastT=now;
  let t=q.t+dt/q.total; if(t>=1){ t=1; S.playing=false; } seqApply(S,t); }
function init(){
  if(renderer) return;
  renderer=new T.WebGLRenderer({antialias:true, preserveDrawingBuffer:false, powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio,1.5));
  renderer.outputEncoding=T.sRGBEncoding; renderer.toneMapping=T.ACESFilmicToneMapping; renderer.toneMappingExposure=.82;
  renderer.shadowMap.enabled=true; renderer.shadowMap.type=T.PCFSoftShadowMap; renderer.localClippingEnabled=true;
  renderer.domElement.addEventListener('webglcontextlost',e=>{e.preventDefault();});
  const sky=ctex(512,256,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#5f93c7');gr.addColorStop(.42,'#a9c8e2');gr.addColorStop(.5,'#d3e2ea');gr.addColorStop(.52,'#9fae8c');gr.addColorStop(1,'#6f7f5c');g.fillStyle=gr;g.fillRect(0,0,w,h);});
  envTex=sky.clone(); envTex.needsUpdate=true; envTex.mapping=T.EquirectangularReflectionMapping; envTex.dome=ctex(16,512,(g,w,h)=>{const gr=g.createLinearGradient(0,0,0,h);gr.addColorStop(0,'#4f86bf');gr.addColorStop(.35,'#86afd6');gr.addColorStop(.49,'#d6e4ec');gr.addColorStop(.5,'#cfdde8');gr.addColorStop(1,'#cfdde8');g.fillStyle=gr;g.fillRect(0,0,w,h);});
  const pm=new T.PMREMGenerator(renderer); envTex.pm=pm.fromEquirectangular(sky).texture; pm.dispose();
  cam=new T.PerspectiveCamera(40,16/9,.1,2500);
  ctl=new T.OrbitControls(cam,renderer.domElement); ctl.enableDamping=true; ctl.dampingFactor=.08; ctl.maxPolarAngle=Math.PI/2-.03; ctl.autoRotateSpeed=.7;
  ctl.addEventListener('change',()=>need=true);
  let onScreen=true; const io=new IntersectionObserver(es=>{ onScreen=es[0].isIntersecting; }); io.observe(renderer.domElement);
  (function loop(now){requestAnimationFrame(loop); if(!active || document.hidden || !onScreen) return; seqTick(now||performance.now()); const moved=ctl.update(); if(need||moved){ renderer.render(active.scene,cam); need=false; }})();
  window.addEventListener('resize',()=>{if(active) size();});
  document.addEventListener('fullscreenchange',()=>{ if(active) setTimeout(size,60); document.querySelectorAll('.v3d').forEach(h=>h.classList.toggle('fs',document.fullscreenElement===h)); });
}
function size(){const host=active.host; const w=host.clientWidth, h=host.clientHeight; renderer.setSize(w,h,false); cam.aspect=w/h; cam.updateProjectionMatrix(); need=true;}
function views(P,S){
  const [cx,cz]=S.center, R=S.R, f=P.front||[0,1], r=[-f[1],f[0]];
  const tgt=new T.Vector3(cx,R*.08,cz);
  const at=(a,b,hgt,dist)=>new T.Vector3(cx+(f[0]*a+r[0]*b)*R*dist, R*hgt, cz+(f[1]*a+r[1]*b)*R*dist);
  const V={ street:[at(1.25,-.12,.16,1),tgt], corner:[at(1.0,.9,.35,1),tgt], back:[at(-1.1,-.7,.3,1),tgt], aerial:[at(.85,-.6,1.25,1),tgt] };
  Object.entries(P.cams||{}).forEach(([k,v])=>V[k]=[new T.Vector3(...v[0]),new T.Vector3(...v[1])]); return V;
}
function prepClip(S){ S.scene.traverse(o=>{ if(!o.isMesh) return; const ms=Array.isArray(o.material)?o.material:[o.material];
  ms.forEach(m=>{ if(!m) return; if(o.userData.site){ return; } m.clippingPlanes=PLANES; m.clipShadows=true; }); });
  S.roofObjs=[]; S.scene.traverse(o=>{ if(o.userData && o.userData.roof) S.roofObjs.push(o); });
  const b=S.mb; S.axis=(b.max.x-b.min.x)>=(b.max.z-b.min.z)?'x':'z'; S.state=S.state||{cut:1,floor:'all',roof:true,spin:false}; }
function applyState(S){ const st=S.state, b=S.mb;
  if(st.cut>=.995){ CLIP_V.normal.set(-1,0,0); CLIP_V.constant=1e6; }
  else if(S.axis==='x'){ CLIP_V.normal.set(-1,0,0); CLIP_V.constant=b.min.x+(b.max.x-b.min.x)*st.cut; }
  else { CLIP_V.normal.set(0,0,-1); CLIP_V.constant=b.min.z+(b.max.z-b.min.z)*st.cut; }
  if(st.floor==='all'){ CLIP_H.constant=1e6; } else { const L=+st.floor; CLIP_H.constant=(L+1)*S.FL-.2; }
  const showRoof = st.roof && st.floor==='all'; S.roofObjs.forEach(o=>o.visible=showRoof); if(S.seq&&S.seq.t<.9999){ S.seq.list.forEach(it=>{ if(it.st==='roof') it.u.visible=showRoof&&((S.seq.t-it.a)/it.d>0); }); }
  ctl.autoRotate=!!st.spin; need=true; syncUI(S); }
function syncUI(S){ const h=document.getElementById('v3d-'+S.id); if(!h) return; const st=S.state;
  h.querySelectorAll('[data-floor]').forEach(b=>b.classList.toggle('on',String(st.floor)===b.dataset.floor));
  if(S.hasRoof===undefined){ S.hasRoof=false; S.scene.traverse(o=>{ if(o.userData.roof) S.hasRoof=true; }); }
  h.querySelectorAll('[data-act="roof"]').forEach(b=>{ b.style.display=S.hasRoof?'':'none'; b.classList.toggle('on',!st.roof||st.floor!=='all'); b.textContent=(st.roof&&st.floor==='all')?'Lift roof':'Show roof'; });
  h.querySelectorAll('[data-act="spin"]').forEach(b=>b.classList.toggle('on',!!st.spin));
  h.querySelectorAll('input[data-act="cut"]').forEach(r=>{ r.value=Math.round(st.cut*100); }); }
function dispose(S){ const shared=new Set(); Object.values(M).forEach(v=>{ if(Array.isArray(v)) v.forEach(x=>shared.add(x)); else if(v&&v.isMaterial) shared.add(v); });
  const base=new Set(Object.values(TX));
  S.scene.traverse(o=>{ if(o.geometry) o.geometry.dispose(); const ms=o.material?(Array.isArray(o.material)?o.material:[o.material]):[]; ms.forEach(m=>{ if(!shared.has(m)){ if(m.map && !base.has(m.map)) m.map.dispose(); m.dispose(); } }); }); }
function attach(id){
  const P=window.PROJECT3D[id]; if(!P) return; init();
  const host=document.getElementById('v3d-'+id);
  if(!cache[id]){ const S=build(P); S.id=id; S.scene.background=new T.Color(0xcfdde8); S.scene.environment=envTex.pm; const dome=new T.Mesh(new T.SphereGeometry(900,32,16),new T.MeshBasicMaterial({map:envTex.dome,side:T.BackSide,fog:false,depthWrite:false,toneMapped:false})); dome.userData.site=true; dome.position.set(S.center[0],0,S.center[1]); S.scene.add(dome); S.views=views(P,S); S.view=P.view||'corner'; prepClip(S); cache[id]=S; }
  const S=cache[id]; order=order.filter(x=>x!==id); order.push(id);
  while(order.length>3){ const old=order.shift(); if(old!==id && cache[old]){ dispose(cache[old]); delete cache[old]; } }
  if(active && active.id===id) return;
  if(active){ active.S.cam=[cam.position.clone(),ctl.target.clone()]; const oh=document.getElementById('v3d-'+active.id); if(oh) oh.classList.remove('live'); }
  host.querySelector('.v3d-stage').appendChild(renderer.domElement);
  active={id,host:host.querySelector('.v3d-stage'),S,scene:S.scene};
  if(S.cam){cam.position.copy(S.cam[0]);ctl.target.copy(S.cam[1]);} else go(id,S.view);
  applyState(S); ctl.update(); size(); host.classList.add('live');
}
function go(id,v){const S=cache[id]; if(!S) return; cam.position.copy(S.views[v][0]); ctl.target.copy(S.views[v][1]); ctl.update(); need=true; S.cam=null;
  document.querySelectorAll('#v3d-'+id+' .views button[data-v]').forEach(b=>b.classList.toggle('on',b.dataset.v===v));}
function setState(id,patch){ attach(id); const S=cache[id]; if(!S) return; Object.assign(S.state,patch); applyState(S); }
function fullscreen(id){ attach(id); const h=document.getElementById('v3d-'+id); if(!h) return;
  try{ if(document.fullscreenElement){ document.exitFullscreen(); } else { const p=h.requestFullscreen? h.requestFullscreen(): (h.webkitRequestFullscreen? h.webkitRequestFullscreen(): null); if(p&&p.catch) p.catch(()=>h.classList.toggle('pseudo-fs')); if(!p && !h.webkitRequestFullscreen) h.classList.toggle('pseudo-fs'); } }catch(e){ h.classList.toggle('pseudo-fs'); }
  setTimeout(()=>{ if(active) size(); },120); }
function levelsOf(id){ const P=window.PROJECT3D[id]; return Math.max(1,...(P.blocks||[]).filter(b=>!b.ctx&&!b.nowall).map(b=>b.levels||1)); }
window.V3D={attach,go,build,setState,seqSet,seqPlay,seqPrep:id=>cache[id]&&seqPrep(cache[id]),STAGES,fullscreen,levelsOf,cache:()=>cache,get renderer(){return renderer},get cam(){return cam},get ctl(){return ctl},get active(){return active},resize:()=>{if(active)size();}};
})();
