/* 3D massing data for each project, taken from the dimensioned plans and elevations (metres, plan coordinates). */
(function(){
const P = {};
const rowWins = (b,f,lvl,list,w,h,sill)=>list.map(at=>({b,f,lvl,at,w:typeof w==='function'?w(at):w,h,sill,k:'win'}));

// ---------------- STAND 3812 SECUNDA — double-storey outbuilding ----------------
P.secunda = {
  fl:3.0, front:[0,1], view:'corner',
  cams:{street:[[13,2.4,19],[6,3,3.5]],corner:[[20,7,15],[5.5,2.5,3]],back:[[-5,5.5,-12],[6,2.5,3]],aerial:[[18,24,24],[5,0,4]]},
  blocks:[
    {x:0,y:0,w:12.37,d:4.39,h:5.75,levels:2,roof:{type:'hip',pitch:26,ext:{s:.66}}},
    {x:8.71,y:0,w:3.66,d:6.44,h:5.75,levels:2},
    {x:2.07,y:4.39,w:2.43,d:3.28,h:5.75,levels:1},
    {x:4.28,y:4.39,w:4.65,d:.66,h:5.75,levels:2,roof:{type:'none'}},
    // existing residence, lapa and garage (context)
    {x:-10.5,y:11.5,w:15,d:8.5,h:2.8,rot:-12,ctx:true},
    {x:-6.5,y:21.5,w:4.5,d:4,h:2.6,ctx:true,rot:-12},
    {x:-14.6,y:23.2,w:5.5,d:7,h:2.6,ctx:true},
  ],
  open:[
    {b:0,f:'N',at:1.3,w:1.2},{b:0,f:'N',at:5.2,w:.6,h:1,sill:1.1},{b:0,f:'N',at:7.9,w:.6,h:1,sill:1.1},
    {b:0,f:'N',at:1.0,w:1.8,lvl:1},{b:0,f:'N',at:4.9,w:.6,h:.9,sill:1.2,lvl:1},{b:0,f:'N',at:6.9,w:.6,h:.9,sill:1.2,lvl:1},{b:1,f:'N',at:.9,w:1.8,lvl:1},
    {b:0,f:'S',at:.6,w:.81,k:'door'},
    {b:3,f:'S',at:.6,w:2.4,k:'slide'},{b:3,f:'S',at:.8,w:.6,h:1,sill:1.1,lvl:1},{b:3,f:'S',at:2.9,w:.6,h:1,sill:1.1,lvl:1},
    {b:1,f:'S',at:.5,w:2.6,k:'garage'},{b:1,f:'S',at:.6,w:2.4,lvl:1},
    {b:1,f:'E',at:2.6,w:1.2,h:.6,sill:1.5},{b:1,f:'E',at:2.0,w:1.2,lvl:1},
    {b:2,f:'S',at:.1,w:2.2,h:4.9,sill:.4,k:'curtain'},{b:2,f:'W',at:.2,w:2.9,h:4.9,sill:.4,k:'curtain'},
    {b:0,f:'W',at:1.4,w:1.2,lvl:1},
  ],
  site:{bounds:[-4,-3,15,12],
    walls:[[-16.1,35.2],[-16.1,-2.8],[11.9,-2.8],[11.9,35.2],[4,35.2],null,[2,35.2],[-9,35.2],null,[-14.8,35.2],[-16.1,35.2]],
    roads:[{x:-40,y:37.2,w:80,d:7}], paves:[{x:-14.8,y:30.2,w:5.8,d:7},{x:-2,y:7.7,w:13,d:2.2},{x:2,y:9.9,w:2,d:27}],
    trees:[[-2,-.5,1.3],[14,6,1.2],[-12,4,1.4],[9,20,1.3],[-14,15,1.1]], shrubs:[[6,8.6,.5],[-1,3,.6],[13.5,1,.5]]}
};

// ---------------- DOORNPOORT — new double-storey dwelling ----------------
P.doornpoort = {
  fl:3.0, front:[0,1],
  blocks:[
    {x:0,y:0,w:6.22,d:7.9,h:3.0},
    {x:6.0,y:0,w:13.89,d:8.4,h:5.9,levels:2},
    {x:15.6,y:8.4,w:4.29,d:.85,h:3.05,roof:{type:'flat',oh:.05}},
    {x:10.3,y:8.4,w:2.8,d:2.05,h:5.9,nowall:true,roof:{type:'hip',pitch:26,oh:.35}},
    {x:19.75,y:7.6,w:.65,d:.7,h:7.4,roof:{type:'flat',oh:.08}},
  ],
  open:[
    {b:0,f:'S',at:.7,w:4.8,k:'garage'},{b:0,f:'W',at:3.0,w:1.6,h:.6,sill:1.6},
    {b:1,f:'S',at:1.3,w:1.5},{b:1,f:'S',at:4.9,w:.6,h:2.1,sill:0,k:'slide'},{b:1,f:'S',at:5.7,w:1.2,h:2.4,k:'door'},{b:1,f:'S',at:7.1,w:.6,h:2.1,sill:0,k:'slide'},
    {b:1,f:'S',at:.9,w:1.8,lvl:1},{b:1,f:'S',at:4.6,w:2.0,k:'slide',lvl:1},{b:1,f:'S',at:10.6,w:2.4,k:'slide',lvl:1},
    {b:2,f:'S',at:1.1,w:1.8},
    {b:1,f:'N',at:3.3,w:1.2,h:1,sill:1.1},{b:1,f:'N',at:4.8,w:.81,k:'door'},{b:1,f:'N',at:9.6,w:1.2,h:1,sill:1.1},{b:1,f:'N',at:11.1,w:.6,h:.6,sill:1.5},{b:1,f:'N',at:12.7,w:.6,h:.6,sill:1.5},
    {b:1,f:'N',at:.6,w:1.5,lvl:1},{b:1,f:'N',at:3.1,w:.6,h:.6,sill:1.5,lvl:1},{b:1,f:'N',at:7.8,w:1.5,h:1.8,sill:.6,lvl:1},{b:1,f:'N',at:10.2,w:.6,h:.6,sill:1.5,lvl:1},
    {b:1,f:'E',at:1.5,w:1.2,lvl:1},{b:1,f:'W',at:5.0,w:1.2,lvl:1},
  ],
  slabs:[{x:10.3,y:8.4,w:2.8,d:2.05,z:3.15},{x:15.6,y:8.4,w:4.3,d:1.0,z:3.2}],
  cols:[{x:10.45,y:10.3,h:5.9},{x:12.95,y:10.3,h:5.9}],
  rails:[{x1:10.3,y1:10.45,x2:13.1,y2:10.45,z:3.15},{x1:15.6,y1:9.4,x2:19.9,y2:9.4,z:3.2},{x1:19.9,y1:8.4,x2:19.9,y2:9.4,z:3.2}],
  site:{bounds:[-1,-2,21,12],
    walls:[[0,20],[-2,20],[-2,-3],[22,-3],[22,20],[13.5,20],null,[11.5,20],[6.4,20]],
    roads:[{x:-30,y:21.5,w:80,d:7}], paves:[{x:.2,y:7.9,w:5.9,d:12.1},{x:10.0,y:8.4,w:3.4,d:2.4},{x:11.4,y:10.8,w:1.4,d:9.2}],
    trees:[[19,15,1.3],[-1.2,18.5,1.0],[3,-1.5,1.2],[16,-1.5,1.2]], shrubs:[[8,11,.6],[15,11,.6],[20.5,11,.5]]}
};

// ---------------- CHANTELLE — additions, single storey ----------------
P.chantelle = {
  fl:2.7, front:[0,1], view:'corner',
  cams:{corner:[[27,8,31],[9,1.5,14]]},
  blocks:[
    {x:8.16,y:0,w:10.46,d:4.03,h:2.7},
    {x:.04,y:6.5,w:6.54,d:4.9,h:2.7},
    {x:.56,y:11.3,w:11.54,d:8.5,h:2.7},
    {x:.56,y:17.7,w:3.74,d:3.9,h:2.7},
    {x:12.1,y:14.5,w:6.52,d:6.9,h:2.7},
    {x:4.46,y:19.8,w:3.48,d:1.85,h:2.7,nowall:true,roof:{type:'hip',pitch:26,oh:.3}},
    {x:6.58,y:7.25,w:1.42,d:2.7,h:2.7,nowall:true,roof:{type:'hip',pitch:26,oh:.3}},
    {x:.04,y:14.6,w:.6,d:2.9,h:2.7,roof:{type:'none'}},
  ],
  open:[
    {b:4,f:'S',at:.8,w:4.9,k:'garage'},{b:4,f:'N',at:3.6,w:2.5,k:'garage',h:2.1},{b:4,f:'E',at:3.3,w:1.2,h:.9,sill:1.2},
    {b:3,f:'S',at:.9,w:1.8},
    {b:2,f:'S',at:5.3,w:1.0,k:'door'},{b:2,f:'S',at:7.9,w:1.6},
    {b:2,f:'W',at:1.2,w:1.2},{b:7,f:'W',at:.6,w:.6,h:.6,sill:1.5},{b:7,f:'W',at:1.9,w:.6,h:.6,sill:1.5},
    {b:1,f:'N',at:3.1,w:2.4},{b:1,f:'W',at:2.6,w:.6,h:.6,sill:1.5},{b:1,f:'E',at:1.0,w:1.8,k:'slide'},
    {b:2,f:'N',at:7.0,w:1.6,k:'slide'},{b:2,f:'E',at:1.8,w:1.2,h:1,sill:1.1},
    {b:0,f:'S',at:1.0,w:1.8},{b:0,f:'S',at:7.4,w:1.8},{b:0,f:'S',at:4.0,w:2.4,h:2.3,k:'void'},{b:0,f:'N',at:5.6,w:.6,h:.6,sill:1.5},
  ],
  cols:[{x:4.65,y:21.5,h:2.7},{x:7.75,y:21.5,h:2.7},{x:7.85,y:7.4,h:2.7},{x:7.85,y:9.8,h:2.7},{x:12.3,y:21.65,h:2.7},{x:18.4,y:21.65,h:2.7}],
  slabs:[{x:12.1,y:21.45,w:6.52,d:.4,z:2.75,t:.35,mat:'band'}],
  site:{bounds:[-1,-1,20,23],
    walls:[[11.9,30.5],[-3.5,30.5],[-3.5,-1.5],[21.5,-1.5],[21.5,30.5],[18.9,30.5]],
    roads:[{x:-30,y:32,w:80,d:7}], paves:[{x:12.1,y:21.4,w:6.5,d:9.1},{x:15.1,y:11.6,w:3.5,d:2.9},{x:4.4,y:21.6,w:3.6,d:1.4},{x:5.2,y:23,w:1.4,d:7.5}],
    trees:[[-1.5,4,1.3],[2,27,1.2],[9,26,1.1],[20,8,1.2]], shrubs:[[9.5,6,.6],[4,5,.5],[10.5,21,.5]]}
};

// ---------------- CAPITAL PARK — two-storey boarding house ----------------
const cpS_GF=[1.2,3.6,6.0,8.4,10.8,13.1,16.1,19.7,22.9,25.4,28.5,31.8], cpS_FF=[1.6,5.3,9.0,12.8,16.6,20.3,24.1,27.9,31.6];
P.capitalpark = {
  fl:2.9, front:[0,1], view:'corner',
  cams:{corner:[[54,13,31],[22,3,9]]},
  blocks:[
    {x:10.3,y:0,w:14.6,d:6.45,h:5.6,levels:2},
    {x:10.3,y:0,w:7.6,d:11.9,h:5.6,levels:2},
    {x:6.46,y:11.8,w:3.9,d:4.8,h:5.6,levels:2},
    {x:10.3,y:8.0,w:29.82,d:8.6,h:5.6,levels:2},
    {x:0,y:13.9,w:3.98,d:4.7,h:2.7},
  ],
  open:[
    ...rowWins(2,'S',0,[.6],1.5),...rowWins(3,'S',0,cpS_GF.map(a=>a-3.84).filter(a=>a>0),a=>(a>20.5&&a<21.8)?.6:1.5),
    ...rowWins(2,'S',1,[.5],1.5),...rowWins(3,'S',1,cpS_FF.map(a=>a-3.84).filter(a=>a>0),1.5),
    ...rowWins(3,'N',0,[8.6,11.3,13.5,19.6,23.5,27.7],1.5),...rowWins(3,'N',0,[15.6],.6,.6,1.5),
    ...rowWins(3,'N',1,[9.6,13.5,17.3,21.0],1.5),...rowWins(3,'N',1,[24.2,25.9,27.6,29.3],.6,.6,1.5),
    ...rowWins(0,'N',0,[1.5,4.1,8.5,11.2],1.5),...rowWins(0,'N',0,[6.7,13.9],.6,.6,1.5),
    ...rowWins(0,'N',1,[1.5,4.2,8.6,11.3],1.5),...rowWins(0,'N',1,[6.8,14.0],.6,.6,1.5),
    ...rowWins(1,'W',0,[5.0,7.4],1.2),...rowWins(1,'W',1,[5.0,7.7,10.4],1.2),
    ...rowWins(0,'S',0,[8.3,11.2],1.5),...rowWins(0,'S',1,[8.3,11.2,13.6],1.5),
    {b:3,f:'E',at:3.3,w:.6,h:.6,sill:1.5},{b:3,f:'E',at:3.3,w:.6,h:.6,sill:1.5,lvl:1},{b:0,f:'E',at:2.8,w:.6,h:.6,sill:1.5},{b:0,f:'E',at:2.8,w:.6,h:.6,sill:1.5,lvl:1},
    {b:4,f:'W',at:.5,w:.6,h:.6,sill:1.5},{b:4,f:'W',at:2.8,w:1.2},{b:4,f:'N',at:2.2,w:.81,k:'door'},
    {b:1,f:'S',at:.6,w:.9,k:'door'},
  ],
  site:{bounds:[-1,-3,41,19],
    walls:[[-2,-3.5],[45,-3.5],[45,21],[30,21],null,[25,21],[-2,21],[-2,-3.5]],
    roads:[{x:-30,y:22.5,w:110,d:7},{x:46.5,y:-30,w:7,d:52}], pools:[{x:28.5,y:.6,w:8.7,d:5.6}],
    paves:[{x:25.5,y:-.3,w:13,d:7.6},{x:25,y:16.6,w:5,d:4.4},{x:4.4,y:16.6,w:2,d:4.4}],
    trees:[[42.5,4,1.4],[2,2,1.3],[42.5,18,1.2],[6,8,1.1]], shrubs:[[24,7.3,.5],[39,7.3,.5],[1,11,.6]]}
};

// ---------------- BOARDING HOUSE — 32-unit two-storey boarding house ----------------
const unitsA=[...Array(8)].map((_,i)=>.23+i*3.23), unitsB=[...Array(8)].map((_,i)=>1.0+i*3.23);
const colsA=[1.2,5.3,9.4,13.5,17.6,21.7,25.8].map(x=>({b:0,x,y:7.82,h:5.03,sq:true}));
const colsB=[2.5,6.6,10.7,14.8,18.9,23.0,27.1].map(x=>({b:2,x,y:6.43,h:5.03,sq:true}));
P.erf2433 = {
  fl:2.925, front:[-.7071,.7071], view:'corner',
  cams:{corner:[[-8,13,38],[21,2,13]],street:[[-2,4.5,31],[22,3,12]]},
  blocks:[
    {x:2.78,y:0,w:26.94,d:6.31,h:5.03,levels:2,roof:{type:'mono',pitch:5,fall:'n',oh:.35,ext:{s:1.61},mat:'metal'}},
    {x:0,y:1.45,w:2.78,d:6.75,h:5.03,levels:2,roof:{type:'mono',pitch:5,fall:'n',oh:.3,mat:'metal'}},
    {x:39.65,y:10.03,w:29,d:4.9,h:5.03,levels:2,rot:135,roof:{type:'mono',pitch:5,fall:'n',oh:.35,ext:{s:1.63},mat:'metal'}},
    {x:29.72,y:0,h:5.03,poly:[[0,0],[5.31,5.41],[4.41,6.31],[0,6.31]],roofMat:'metal'},
  ],
  open:[
    ...unitsA.flatMap(a=>[{b:0,f:'N',at:a+.75,w:1.5},{b:0,f:'N',at:a+.75,w:1.5,lvl:1},
      {b:0,f:'S',at:a+.15,w:.81,k:'door'},{b:0,f:'S',at:a+1.3,w:.6,h:.6,sill:1.5},{b:0,f:'S',at:a+2.2,w:.6,h:.6,sill:1.5},
      {b:0,f:'S',at:a+.15,w:.81,k:'door',lvl:1},{b:0,f:'S',at:a+1.3,w:.6,h:.6,sill:1.5,lvl:1},{b:0,f:'S',at:a+2.2,w:.6,h:.6,sill:1.5,lvl:1}]),
    // back-face windows of the angled wing, positioned from the BlueLid south elevation (7 per floor)
    ...[26.85,23.59,19.34,16.21,11.97,8.84,4.62].flatMap(c=>[{b:2,f:'N',at:c-.75,w:1.5},{b:2,f:'N',at:c-.75,w:1.5,lvl:1}]),
    ...unitsB.flatMap(a=>[
      {b:2,f:'S',at:a+.15,w:.81,k:'door'},{b:2,f:'S',at:a+1.3,w:.6,h:.6,sill:1.5},{b:2,f:'S',at:a+2.2,w:.6,h:.6,sill:1.5},
      {b:2,f:'S',at:a+.15,w:.81,k:'door',lvl:1},{b:2,f:'S',at:a+1.3,w:.6,h:.6,sill:1.5,lvl:1},{b:2,f:'S',at:a+2.2,w:.6,h:.6,sill:1.5,lvl:1}]),
    {b:1,f:'W',at:.4,w:.6,h:.6,sill:1.6},{b:1,f:'W',at:1.2,w:.6,h:.6,sill:1.6},{b:1,f:'W',at:2.0,w:.6,h:.6,sill:1.6},
    {b:1,f:'S',at:.5,w:1.8,k:'void',h:2.4},
  ],
  slabs:[{b:0,x:0,y:6.31,w:27.6,d:1.61,z:2.93},{b:2,x:0,y:4.9,w:29,d:1.63,z:2.93}],
  cols:[...colsA,...colsB],
  rails:[{b:0,x1:0,y1:7.9,x2:27.6,y2:7.9,z:2.93},{b:2,x1:1.2,y1:6.5,x2:29,y2:6.5,z:2.93}],
  site:{bounds:[-2,-2,43,32],
    walls:[[-1.8,14],[-1.8,-1.8],[30.6,-1.8],[42.8,10.4],[20.8,32.6]],
    roads:[{x:-40,y:35,w:100,d:7}], paves:[{x:3,y:8.2,w:23,d:6},{x:4,y:14,w:15,d:17}],
    trees:[[-3.5,4,1.3],[44,4,1.2],[1,22,1.3],[8,30,1.1]], shrubs:[[2,8.6,.5],[27,9,.5]]}
};

window.PROJECT3D = P;
})();
