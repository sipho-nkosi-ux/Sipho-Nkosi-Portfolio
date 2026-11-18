/* 3D models for the Uduhu Holdings industrial projects (metres; plan x east, plan y south, z up). */
(function(){
const P = window.PROJECT3D;
const rectRail = (x0,y0,x1,y1)=>[[x0,y0],[x1,y0],[x1,y1],[x0,y1],[x0,y0]];
const xBrace = (a,b,z0,z1,s,mm)=>[{a:[a[0],a[1],z0],b:[b[0],b[1],z1],s:s||.08,m:mm||'galv'},{a:[b[0],b[1],z0],b:[a[0],a[1],z1],s:s||.08,m:mm||'galv'}];

// ---------- ANS OFFLOADING PLATFORM ----------
(()=>{ const zd=3.43, g2=3.891, g3=6.891, Y=.5, hy=.575; const M=[];
  [g2,g3].forEach(x=>[-Y,Y].forEach(y=>M.push({a:[x,y,.45],b:[x,y,zd],s:.15,m:'galv'})));
  [[-hy,hy]].forEach(()=>{ M.push({a:[g2,-hy,zd-.08],b:[g3,-hy,zd-.08],s:[.1,.16],m:'galv'},{a:[g2,hy,zd-.08],b:[g3,hy,zd-.08],s:[.1,.16],m:'galv'},
    {a:[g2,-hy,zd-.08],b:[g2,hy,zd-.08],s:[.1,.16],m:'galv'},{a:[g3,-hy,zd-.08],b:[g3,hy,zd-.08],s:[.1,.16],m:'galv'},{a:[(g2+g3)/2,-hy,zd-.08],b:[(g2+g3)/2,hy,zd-.08],s:[.08,.12],m:'galv'}); });
  M.push(...xBrace([g2,-Y],[g3,-Y],.6,zd-.2,.07),...xBrace([g2,Y],[g3,Y],.6,zd-.2,.07),...xBrace([g2,-Y],[g2,Y],.6,zd-.2,.06),...xBrace([g3,-Y],[g3,Y],.6,zd-.2,.06));
  P.ans = { front:[0,1], view:'corner',
    members:M, plates:[{x:g2,y:-hy,w:3.0,d:1.15,z:zd,m:'grating'}],
    plinths:[{x:g2,y:0,w:.8,d:1.26,h:1.05,z0:-.6},{x:g3,y:0,w:.8,d:1.26,h:1.05,z0:-.6},{x:-.35,y:0,w:.7,d:1.1,h:.79,z0:-.6}],
    stairs:[{a:[-.35,0,.19],b:[g2-.05,0,zd],w:.9}],
    hrails:[{pts:[[g2,-hy],[g3,-hy],[g3,hy],[g2,hy]],z:zd}],
    trucks:[{x:.29,y:-2.04,len:9.7}],
    site:{bounds:[-2,-7,15,3], ground:'gravel',
      roads:[{x:-12,y:-5.22,w:40,d:7.47}], concs:[{x:-12,y:-6.22,w:40,d:1.0},{x:g2+1.5-2.5,y:-5.22,w:4.97,d:2.25,z:.005},{x:-1,y:-.75,w:9,d:1.5,z:.005}],
      trees:[[16,4,1.3],[-6,5,1.2]], shrubs:[]},
    cams:{corner:[[14,6.5,8.5],[4.5,1.8,-1]], street:[[5.4,1.7,9],[5.4,2,-1]], back:[[-6,6,-11],[5,1.5,-1]], aerial:[[16,16,12],[5,0,-1.5]]}
  };
})();

// ---------- 300D BOILER BUILDING ----------
(()=>{ const W=7.74, D=5.85;
  P.boiler = { fl:4.0, front:[0,1], view:'corner',
    blocks:[{x:0,y:0,w:W,d:D,h:4.016,mat:'brick',roof:{type:'none'}},
            {x:0,y:0,z0:4.016,w:W,d:D,h:2.214,mat:'metal',roof:{type:'mono',pitch:11,fall:'n',oh:.35,mat:'metal'}}],
    open:[{b:0,f:'E',at:2.4,w:.9,k:'door'},{b:0,f:'S',at:2.95,w:1.8,k:'door'},{b:1,f:'W',at:1.5,w:2.8,h:.6,sill:.15,k:'void'},{b:1,f:'N',at:2.2,w:3.2,h:.6,sill:.15,k:'void'}],
    cols:[[0,0],[W,0],[0,D],[W,D]].map(([x,y])=>({x,y,h:6.35,sq:true})),
    plinths:[[0,0],[W,0],[0,D],[W,D]].map(([x,y])=>({x,y,w:.6,h:.75,z0:-.45})),
    members:[{a:[1.0,D/2,5.9],b:[W-1.0,D/2,5.9],s:[.2,.3],m:'steel'}],
    site:{bounds:[-3,-3,11,9], ground:'gravel', concs:[{x:-1.5,y:-1.5,w:W+3,d:D+3},{x:2.4,y:D+1.5,w:3,d:6}],
      trees:[[-5,-4,1.3],[-4,11,1.2]]},
    cams:{corner:[[17,6,16],[3.9,2.8,2.9]], street:[[3.9,1.7,15],[3.9,3,2.9]], back:[[-9,6,-9],[3.9,3,2.9]], aerial:[[16,19,15],[3.9,1,2.9]]}
  };
})();

// ---------- 300D SILO TANKS SUPPORT & PLATFORM ----------
(()=>{ const zd=5.99, X=[0,1.68,4.79,7.39,10.5,13.1,16.21,17.89], yA=.935, yJ=4.014, yK=7.042; const M=[];
  const colX=[1.68,4.79,7.39,10.5,13.1,16.21];
  [0,...colX,17.89].forEach(x=>[yA,yK].forEach(y=>M.push({a:[x,y,.45],b:[x,y,zd-.1],s:x===0||x===17.89?.15:.22,m:'steel'})));
  [yA,yJ,yK].forEach(y=>M.push({a:[0,y,zd-.15],b:[17.89,y,zd-.15],s:[.15,.25],m:'steel'}));
  [0,...colX,17.89].forEach(x=>{ M.push({a:[x,yA,zd-.15],b:[x,yK,zd-.15],s:[.15,.25],m:'steel'}); M.push({a:[x,yA,zd-1.3],b:[x,yA+1.4,zd-.2],s:.1,m:'steel'},{a:[x,yK,zd-1.3],b:[x,yK-1.4,zd-.2],s:.1,m:'steel'}); });
  [[1.68,4.79],[7.39,10.5],[13.1,16.21]].forEach(([a,b])=>[yA,yK].forEach(y=>M.push(...xBrace([a,y],[b,y],.8,zd-.4,.12,'steel'))));
  // stairs landing column + top landing
  M.push({a:[12.7,-.375,0],b:[12.7,-.375,2.95],s:.15,m:'steel'},{a:[17.89,-.375,0],b:[17.89,-.375,zd-.1],s:.12,m:'steel'});
  P.silo = { front:[0,-1], view:'corner',
    members:M,
    plates:[{x:0,y:yA,w:17.89,d:yJ-yA,z:zd,m:'grating'},{x:0,y:yJ,w:1.68,d:yK-yJ,z:zd,m:'grating'},{x:16.21,y:yJ,w:1.68,d:yK-yJ,z:zd,m:'grating'},{x:17.89,y:3.0,w:1.0,d:1.8,z:zd,m:'grating'},
            {x:11.8,y:-.75,w:1.8,d:.75,z:3.0,m:'grating'},{x:16.96,y:-.75,w:.93,d:.8,z:zd,m:'grating'}],
    plinths:[0,...colX,17.89].flatMap(x=>[yA,yK].map(y=>({x,y,w:.6,h:.9,z0:-.3}))),
    stairs:[{a:[8.2,-.375,0],b:[11.8,-.375,3.0],w:.75},{a:[13.6,-.375,3.0],b:[16.96,-.375,zd],w:.75}],
    ladders:[{x:1.0,y:yA-.05,z0:0,z1:zd,face:180,cage:true}],
    hrails:[{pts:[[1.6,yA],[0,yA],[0,yK],[1.68,yK],[1.68,yJ],[16.21,yJ],[16.21,yK],[17.89,yK],[17.89,4.8],[18.89,4.8],[18.89,3.0],[17.89,3.0],[17.89,yA],[16.96,yA]],z:zd},
            {pts:[[16.96,-.75],[17.89,-.75],[17.89,0]],z:zd},{pts:[[11.8,-.75],[13.6,-.75]],z:3.0},{pts:[[1.9,yA],[8.2,yA]],z:zd}],
    site:{bounds:[-2,-2,20,9], ground:'gravel', concs:[{x:-1,y:-1.2,w:20.5,d:9.5}], trees:[[-5,12,1.3],[23,-4,1.2]]},
    cams:{corner:[[27,9,-12],[9,5,3.5]], street:[[9,3.5,-17],[9,6,3.5]], back:[[-8,8,19],[9,5,3.5]], aerial:[[28,26,-18],[9,3,3.5]]}
  };
})();

// ---------- AN BUND WALL WALKWAY ----------
(()=>{ const zd=.8, M=[];
  [[0,0],[1.2,0],[0,2.4],[1.2,2.4]].forEach(([x,y])=>{ M.push({a:[x,y,.12],b:[x,y,zd],s:[.1,.05],m:'galv'}); });
  M.push({a:[0,0,zd-.05],b:[1.2,0,zd-.05],s:[.05,.1],m:'galv'},{a:[0,2.4,zd-.05],b:[1.2,2.4,zd-.05],s:[.05,.1],m:'galv'},{a:[0,0,zd-.05],b:[0,2.4,zd-.05],s:[.05,.1],m:'galv'},{a:[1.2,0,zd-.05],b:[1.2,2.4,zd-.05],s:[.05,.1],m:'galv'},{a:[0,1.2,zd-.05],b:[1.2,1.2,zd-.05],s:[.04,.08],m:'galv'});
  P.walk = { front:[1,0], view:'corner',
    members:M, plates:[{x:0,y:0,w:1.2,d:2.4,z:zd,m:'grating'}],
    tanks:[[0,0],[1.2,0],[0,2.4],[1.2,2.4]].map(([x,y])=>({x,y,r:.06,z0:0,h:.12,m:'tyre'})).concat([{x:-4.6,y:1.2,r:2.4,z0:0,h:6.5,dome:true,m:'tank',ring:true,bands:[2,4],bg:true}]),
    stairs:[{a:[.6,3.35,0],b:[.6,2.42,zd],w:.8}],
    hrails:[{pts:[[0,2.4],[0,0],[1.2,0],[1.2,2.4]],z:zd,h:.9}],
    blocks:[{x:-.55,y:-1.6,w:.25,d:5.6,h:1.0,mat:'conc',roof:{type:'none'}}],
    site:{bounds:[-3,-2,4,5], ground:'gravel', concs:[{x:-6.5,y:-1.6,w:6,d:5.6}], trees:[]},
    cams:{corner:[[5.5,2.6,6.3],[.3,.8,1.4]], street:[[5.2,1.4,1.3],[.4,.8,1.3]], back:[[-1.5,4,-3.5],[.4,.6,1.4]], aerial:[[6,7,6],[-.5,.5,1.3]]}
  };
})();

// ---------- 20D TANKS CAT LADDER ----------
(()=>{ const r=3.0, cx=r+1.77, top=8.0, zf=top-2.786;
  P.catl = { front:[0,1], view:'corner',
    tanks:[-cx,cx].map(x=>({x,y:0,r,z0:0,h:top,ring:true,m:'tank',bands:[zf,zf+.51,2.6]})),
    plates:[{x:-1.9,y:-.5,w:3.8,d:1.0,z:top,m:'grating'},{x:-.39,y:.3,w:.78,d:.55,z:zf,m:'grating'}],
    members:[{a:[-1.9,-.5,top-.05],b:[1.9,-.5,top-.05],s:[.05,.1],m:'galv'},{a:[-1.9,.5,top-.05],b:[1.9,.5,top-.05],s:[.05,.1],m:'galv'},
             {a:[-1.85,.55,zf+.51],b:[1.85,.55,zf+.51],s:.07,m:'galv'},{a:[-1.85,.55,zf-.05],b:[1.85,.55,zf-.05],s:.07,m:'galv'},
             {a:[-1.2,.0,top-.1],b:[-.3,.5,zf+.6],s:[.05,.1],m:'galv'}],
    hrails:[{pts:[[-1.9,-.5],[1.9,-.5]],z:top,m:'galv'},{pts:[[-1.9,.5],[-.3,.5]],z:top,m:'galv'},{pts:[[.3,.5],[1.9,.5]],z:top,m:'galv'}],
    ladders:[{x:0,y:.62,z0:zf,z1:top,face:0,cage:true,cageFrom:.41}],
    site:{bounds:[-9,-4,9,4], ground:'gravel', concs:[{x:-cx-3.4,y:-3.4,w:2*cx+6.8,d:6.8}], trees:[[-12,8,1.4],[12,-7,1.3]]},
    cams:{corner:[[5.5,7.8,7.5],[0,6.6,.4]], street:[[0,6.5,6],[0,6.6,0]], back:[[9,13,-12],[0,5.5,0]], aerial:[[14,17,15],[0,4,0]]}
  };
})();

})();

// ---------- STEEL SLATTED DOUBLE SWING GATE (dimensions from GATE-01..05 Rev C) ----------
(()=>{ const P=window.PROJECT3D;
  const POST=.15, HG=.02, LA=3.0, LB=1.0, CG=.01, GC=.05, LH=1.7, PH=1.8, RW=.076, RD=.038, SL=.025, NS=25, GAP=(LH-2*RW-NS*SL)/(NS+1);
  const XA0=POST+HG, XA1=XA0+LA, XB0=XA1+CG, XB1=XB0+LB, XP2=XB1+HG, W=XP2+POST, M=[];
  // posts with cap plates
  [POST/2, XP2+POST/2].forEach(x=>M.push({a:[x,0,0],b:[x,0,PH],s:[POST,POST],m:'steel'}));
  // a leaf: mitred RHS frame + slats
  const leaf=(x0,L,stiff)=>{ const x1=x0+L, z0=GC, z1=GC+LH;
    M.push({a:[x0,0,z0+RW/2],b:[x1,0,z0+RW/2],s:[RD,RW],m:'steel'},{a:[x0,0,z1-RW/2],b:[x1,0,z1-RW/2],s:[RD,RW],m:'steel'});
    M.push({a:[x0+RW/2,0,z0+RW],b:[x0+RW/2,0,z1-RW],s:[RW,RD],m:'steel'},{a:[x1-RW/2,0,z0+RW],b:[x1-RW/2,0,z1-RW],s:[RW,RD],m:'steel'});
    for(let i=0;i<NS;i++){ const z=z0+RW+GAP+SL/2+i*(SL+GAP); M.push({a:[x0+RW,0,z],b:[x1-RW,0,z],s:[SL,SL],m:'steel'}); }
    if(stiff) M.push({a:[(x0+x1)/2,-RD/2-.0025,z0+RW],b:[(x0+x1)/2,-RD/2-.0025,z1-RW],s:[.025,.005],m:'steel'}); };
  leaf(XA0,LA,true); leaf(XB0,LB,false);
  // 40x5 meeting stop on leaf A (outside face), striker on leaf A edge
  M.push({a:[XA1+.005,RD/2+.0025,GC],b:[XA1+.005,RD/2+.0025,GC+LH],s:[.04,.005],m:'steel'});
  // bullet hinges Ø20 × 150: 3 on leaf A, 2 on leaf B (centres 350 / 950 / 1 550 above ground)
  [[POST+HG/2,[.35,.95,1.55]],[XP2-HG/2,[.35,1.55]]].forEach(([x,zs])=>zs.forEach(z=>M.push({a:[x,0,z-.075],b:[x,0,z+.075],s:.02,m:'galv'})));
  // lock pocket and lever handles on leaf B (spindle 1 000 above ground)
  M.push({a:[XB0+RW+.025,0,.88],b:[XB0+RW+.025,0,1.12],s:[.05,.04],m:'steel'});
  [-1,1].forEach(sd=>{ M.push({a:[XB0+RW+.03,sd*.035,.9],b:[XB0+RW+.03,sd*.035,1.08],s:[.03,.008],m:'galv'}); M.push({a:[XB0+RW+.03,sd*.05,1.0],b:[XB0+RW+.14,sd*.05,1.0],s:.018,m:'galv'}); });
  // Ø16 drop bolt on leaf A, inside face, with bent handle and pipe guides
  const xb=XA1-.12, yb=-RD/2-.03;
  M.push({a:[xb,yb,-.06],b:[xb,yb,.6],s:.016,m:'galv'},{a:[xb,yb,.6],b:[xb-.1,yb,.6],s:.016,m:'galv'});
  [.11,.45].forEach(z=>M.push({a:[xb,yb,z-.02],b:[xb,yb,z+.02],s:.027,m:'galv'}));
  P.gate={ front:[0,1], view:'corner', members:M,
    plates:[{x:0,y:-POST/2,w:POST,d:POST,z:PH+.005,t:.005,m:'steel'},{x:XP2,y:-POST/2,w:POST,d:POST,z:PH+.005,t:.005,m:'steel'}],
    plinths:[{x:POST/2,y:0,w:.6,d:.6,h:.04,z0:-.02},{x:XP2+POST/2,y:0,w:.6,d:.6,h:.04,z0:-.02},{x:xb,y:yb,w:.3,d:.3,h:.03,z0:-.015}],
    site:{bounds:[-3,-6,W+3,5], ground:'grass', concs:[{x:XA0,y:-6,w:XP2-XA0,d:6.4}], trees:[[-4.5,-7.5,1.1],[W+4.5,-7,1.2]]},
    cams:{corner:[[6.4,2.3,5.2],[2.2,.85,0]], street:[[2.2,1.4,6.8],[2.2,.85,0]], back:[[-1.6,2.3,-5.4],[2.2,.85,0]], aerial:[[7,6.5,6.5],[2.2,.5,0]]} };
})();
// gate without footings, used only to produce the redrawn elevations and section
window.PROJECT3D.gate2d=Object.assign({},window.PROJECT3D.gate,{plinths:[]});
