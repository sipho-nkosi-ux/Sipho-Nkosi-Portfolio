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
    tanks:[{x:13,y:2.2,r:1.1,z0:0,h:5.0,dome:true,m:'tank',bands:[1.5,3.5],bg:true}],
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
    tanks:[3.235,8.945,14.655].map(x=>({x,y:4.95,r:1.8,z0:7.36,h:4.85,dome:true,cone:.7,legs:4,legZ:zd,m:'tank',bands:[8.4,9.9,11.4]})),
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
