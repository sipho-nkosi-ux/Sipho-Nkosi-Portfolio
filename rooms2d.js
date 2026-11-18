/* Room layouts, doors, fittings, grids, labels, levels and drawing lists for the redrawn sheets.
   Coordinates in metres, taken from the dimensioned plans. Rooms without "b" are in site coordinates. */
(function(){
const P = window.PROJECT3D; if(!P) return;
const R=(x,y,w,d,n,o)=>Object.assign({x,y,w,d,n},o||{});
const wet={wet:true};

// ---------- STAND 3812 SECUNDA ----------
Object.assign(P.secunda,{ tw:.22,
  rooms:[R(.22,.22,4.38,3.95,'Kitchen'),R(4.71,.22,4.0,4.61,'Lounge'),R(8.93,.22,3.22,6.0,'Garage',{garage:true}),R(2.29,4.39,1.99,3.06,'Stair',{stair:{dir:'y',n:14,rev:true},stairR:true,nodim:true}),
    R(.22,.22,4.38,2.94,'Master|bedroom',{lvl:1}),R(4.71,.22,1.91,2.38,'En-suite',{lvl:1,wet:true}),R(6.73,.22,1.87,2.38,'Bathroom',{lvl:1,wet:true}),R(8.71,.22,3.44,3.05,'Bedroom 1',{lvl:1}),
    R(.22,3.27,4.38,.9,'',{lvl:1}),R(4.6,2.71,4.0,2.12,'Passage',{lvl:1,nodim:true}),R(8.71,3.38,3.44,2.84,'Bedroom 2',{lvl:1}),R(2.29,4.39,1.99,3.06,'Stair void',{lvl:1,void:true,nodim:true})],
  doors:[{o:'v',x:4.655,y:1.3,w:2.6,open:true},{o:'v',x:8.82,y:.9,w:.81,s:-1,t:.24},{o:'h',x:2.7,y:4.28,w:.81,s:1,t:.24},
    {lvl:1,o:'h',x:3.4,y:3.215,w:.81,s:-1},{lvl:1,o:'h',x:5.3,y:2.655,w:.71,s:-1},{lvl:1,o:'h',x:7.3,y:2.655,w:.71,s:-1},{lvl:1,o:'v',x:8.655,y:2.2,w:.81,s:1},{lvl:1,o:'v',x:8.655,y:3.8,w:.81,s:1}],
  fit:[{k:'bic',x:.22,y:.22,w:.6,d:3.95},{k:'sink',x:1.1,y:.22,w:1.1,d:.55},{k:'hob',x:.22,y:1.9,w:.6,d:.6},{k:'car',x:9.6,y:1.0,w:1.9,d:4.5},
    {lvl:1,k:'bic',x:4.0,y:.22,w:.6,d:2.4},{lvl:1,k:'bath',x:4.75,y:.26,w:.75,d:1.7},{lvl:1,k:'wc',x:5.85,y:.3,w:.5,d:.65},{lvl:1,k:'shower',x:5.7,y:1.6,w:.9,d:.9},
    {lvl:1,k:'wc',x:6.85,y:.3,w:.5,d:.65},{lvl:1,k:'basin',x:7.6,y:.26,w:.6,d:.45},{lvl:1,k:'shower',x:7.6,y:1.6,w:.9,d:.9},{lvl:1,k:'bic',x:8.71,y:.4,w:.6,d:1.6},{lvl:1,k:'bic',x:8.71,y:4.6,w:.6,d:1.4}],
  levels:[[0,'ground floor'],[3.0,'first floor'],[5.75,'wall plate'],[7.2,'ridge']],
  sheets2d:[['gf','Ground floor plan','plan',{level:0}],['ff','First floor plan','plan',{level:1}],['rf','Roof plan','plan',{roof:true}],
    ['es','South elevation','elevation',{face:'S'}],['en','North elevation','elevation',{face:'N'}],['ee','East elevation','elevation',{face:'E'}],['ew','West elevation','elevation',{face:'W'}],
    ['sa','Section A-A','section',{face:'E',cut:{at:6.6}}]]
});

// ---------- ERF 1/887 DOORNPOORT ----------
Object.assign(P.doornpoort,{ tw:.22,
  rooms:[R(.22,.22,5.78,7.46,'Double garage',{garage:true}),R(6.22,.22,1.5,1.5,'Pantry',{nodim:true}),R(7.83,.22,2.5,4.38,'Kitchen'),R(6.22,1.83,1.61,2.77,''),R(10.33,.22,4.21,4.38,'Dining'),
    R(12.9,.22,1.6,2.3,'',{stair:{dir:'y',n:13},stairR:true}),R(14.65,.22,1.8,3.22,'Laundry',wet),R(16.56,.22,1.08,3.22,'WC',{wet:true,nodim:true}),R(17.75,.22,1.92,3.22,'En-suite',wet),
    R(14.54,3.55,5.13,1.05,'Passage',{nodim:true}),R(6.22,4.71,3.5,3.47,'Office /|study'),R(9.83,4.71,5.57,3.47,'Lounge'),R(15.51,4.71,4.16,3.47,'Guest|bedroom'),R(15.82,8.18,3.85,.85,''),
    R(6.22,.22,2.65,3.73,'Storage',{lvl:1}),R(8.98,.22,1.8,3.73,'Bathroom',{lvl:1,wet:true}),R(10.89,.22,4.09,3.73,'Double|volume',{lvl:1,void:true}),R(15.09,.22,1.8,3.73,'En-suite',{lvl:1,wet:true}),
    R(17.0,.22,2.67,3.73,'Walk-in|closet',{lvl:1}),R(6.22,4.06,13.45,.94,'Passage',{lvl:1,nodim:true}),R(6.22,5.11,3.94,3.07,'Bedroom 2',{lvl:1}),R(10.27,5.11,4.4,3.07,'Pyjama|lounge',{lvl:1}),R(14.78,5.11,4.89,3.07,'Master|bedroom',{lvl:1})],
  doors:[{o:'v',x:6.11,y:2.3,w:.81,s:1,t:.24},{o:'v',x:7.775,y:.5,w:.71,s:-1},{o:'h',x:10.6,y:4.655,w:3.2,open:true},{o:'h',x:7.2,y:4.655,w:.81,s:1},{o:'h',x:15.0,y:3.495,w:.81,s:-1},{o:'h',x:16.7,y:3.495,w:.71,s:-1},{o:'h',x:18.7,y:3.495,w:.71,s:-1},{o:'h',x:16.0,y:4.655,w:.81,s:1},
    {lvl:1,o:'h',x:7.2,y:4.005,w:.81,s:-1},{lvl:1,o:'h',x:9.4,y:4.005,w:.71,s:-1},{lvl:1,o:'h',x:15.5,y:4.005,w:.71,s:-1},{lvl:1,o:'h',x:17.9,y:4.005,w:.81,s:-1},{lvl:1,o:'h',x:8.0,y:5.055,w:.81,s:1},{lvl:1,o:'h',x:11.5,y:5.055,w:1.8,open:true},{lvl:1,o:'h',x:15.5,y:5.055,w:.81,s:1}],
  fit:[{k:'car',x:.8,y:1.6,w:1.9,d:4.5},{k:'car',x:3.3,y:1.6,w:1.9,d:4.5},{k:'bic',x:7.83,y:.22,w:1.8,d:.6},{k:'sink',x:8.2,y:.22,w:1.0,d:.5},{k:'bic',x:8.6,y:2.0,w:.9,d:1.8},{k:'hob',x:8.75,y:2.5,w:.6,d:.6},
    {k:'bath',x:18.0,y:.3,w:.75,d:1.7},{k:'wc',x:19.0,y:.3,w:.5,d:.65},{k:'shower',x:18.8,y:2.3,w:.85,d:.85},{k:'wc',x:16.85,y:.3,w:.5,d:.65},{k:'bic',x:15.6,y:4.71,w:1.6,d:.6},
    {lvl:1,k:'bath',x:9.0,y:.3,w:.75,d:1.7},{lvl:1,k:'wc',x:10.1,y:.3,w:.5,d:.65},{lvl:1,k:'shower',x:9.9,y:2.9,w:.85,d:.85},{lvl:1,k:'bath',x:15.15,y:.3,w:.75,d:1.7},{lvl:1,k:'wc',x:16.2,y:.3,w:.5,d:.65},{lvl:1,k:'shower',x:15.9,y:2.9,w:.85,d:.85},
    {lvl:1,k:'bic',x:17.0,y:.22,w:2.67,d:.6},{lvl:1,k:'bic',x:17.0,y:.82,w:.6,d:2.6},{lvl:1,k:'bic',x:19.07,y:.82,w:.6,d:2.6},{lvl:1,k:'bic',x:6.22,y:5.11,w:1.6,d:.6}],
  levels:[[0,'ground floor'],[3.0,'first floor'],[5.9,'wall plate'],[8.5,'ridge']],
  sheets2d:[['gf','Ground floor plan','plan',{level:0}],['ff','First floor plan','plan',{level:1}],['rf','Roof plan','plan',{roof:true}],
    ['es','South elevation (street)','elevation',{face:'S'}],['en','North elevation','elevation',{face:'N'}],['ee','East elevation','elevation',{face:'E'}],['ew','West elevation','elevation',{face:'W'}],
    ['sa','Section A-A','section',{face:'S',cut:{at:6.2}}]]
});

// ---------- ERF 1482 CHANTELLE X14 ----------
Object.assign(P.chantelle,{ tw:.22,
  rooms:[R(8.38,.22,3.6,3.59,'Study'),R(12.09,.22,2.4,1.83,'Bath 2',{wet:true,nodim:true}),R(12.09,2.16,2.4,1.87,'Porch',{outside:true,nodim:true}),R(14.6,.22,3.8,3.59,'Store room'),
    R(.26,6.72,2.0,1.88,'Dressing',{nodim:true}),R(.26,8.71,2.0,2.49,'En-suite',wet),R(2.37,6.72,3.99,4.48,'Master|bedroom'),
    R(.78,11.52,3.5,3.08,'Bedroom 2'),R(.26,14.71,3.14,1.79,'Bath 1',{wet:true,nodim:true}),R(3.51,14.71,.88,1.79,''),R(.78,16.61,3.3,4.77,'Bedroom 1'),
    R(4.5,11.52,5.18,3.48,'Lounge'),R(9.79,11.52,2.09,4.88,'Kitchen',{nodim:true}),R(4.5,15.0,5.18,4.58,'Dining'),R(9.68,16.4,2.2,3.18,''),
    R(12.21,14.72,6.19,6.46,'Double|garage',{garage:true})],
  doors:[{o:'h',x:5.0,y:11.36,w:.81,s:-1,t:.34},{o:'v',x:2.315,y:7.2,w:.71,s:1},{o:'v',x:2.315,y:9.6,w:.71,s:-1},{o:'v',x:4.39,y:12.5,w:.81,s:-1,t:.24},{o:'v',x:4.445,y:14.9,w:1.2,open:true},
    {o:'v',x:3.455,y:15.0,w:.71,s:-1},{o:'h',x:3.0,y:16.555,w:.81,s:1},{o:'v',x:12.045,y:15.4,w:.81,s:1,t:.36},{o:'v',x:9.735,y:12.0,w:2.4,open:true},{o:'h',x:12.4,y:2.105,w:.81,s:-1},{o:'v',x:12.035,y:2.4,w:.81,s:-1},{o:'v',x:14.545,y:2.4,w:.81,s:1}],
  fit:[{k:'car',x:12.9,y:15.6,w:1.9,d:4.5},{k:'car',x:15.6,y:15.6,w:1.9,d:4.5},{k:'bic',x:11.28,y:11.52,w:.6,d:4.8},{k:'hob',x:11.28,y:12.6,w:.6,d:.6},{k:'bath',x:.4,y:9.4,w:.75,d:1.7},{k:'shower',x:1.3,y:10.2,w:.9,d:.9},{k:'wc',x:1.5,y:8.8,w:.5,d:.65},
    {k:'bic',x:.26,y:6.72,w:2.0,d:.6},{k:'bath',x:.4,y:14.75,w:1.7,d:.72},{k:'wc',x:2.6,y:14.8,w:.6,d:.5},{k:'bath',x:12.2,y:.3,w:1.4,d:.7},{k:'wc',x:13.8,y:.3,w:.5,d:.6},{k:'bic',x:.78,y:16.61,w:2.0,d:.6},{k:'bic',x:3.48,y:11.52,w:.6,d:1.6}],
  levels:[[0,'ground floor'],[2.7,'wall plate'],[5.4,'ridge']],
  sheets2d:[['gf','Floor plan','plan',{level:0}],['rf','Roof plan','plan',{roof:true}],
    ['es','South elevation','elevation',{face:'S'}],['en','North elevation','elevation',{face:'N'}],['ee','East elevation','elevation',{face:'E'}],['ew','West elevation','elevation',{face:'W'}],
    ['sa','Section A-A','section',{face:'W',cut:{at:7.0}}]]
});

// ---------- ERF 1496 CAPITAL PARK ----------
(()=>{ const rooms=[], doors=[], fit=[];
  const add=(x0,x1,y0,y1,n,o)=>rooms.push(R(x0,y0,x1-x0,y1-y0,n,o));
  // ground floor
  add(10.53,13.1,.23,3.84,'Store',{nodim:true}); add(13.21,15.81,.23,2.68,'Bed 1',{nodim:true}); add(15.92,17.52,.23,2.68,'Bath 1',{wet:true,nodim:true}); add(17.63,20.23,.23,2.68,'Bed 2',{nodim:true}); add(20.34,22.94,.23,2.68,'Bed 3',{nodim:true}); add(23.05,24.65,.23,2.68,'Bath 2',{wet:true,nodim:true});
  add(13.21,24.65,2.79,3.84,'',{nodim:true}); add(18.17,21.355,3.95,6.22,'Study',{nodim:true}); add(21.465,24.65,3.95,6.22,'Study',{nodim:true});
  add(10.53,13.13,3.95,8.45,'Kitchen',{nodim:true}); add(13.13,17.67,3.95,11.67,'Dining'); add(10.53,13.13,8.45,11.67,'',{});
  add(14.7,17.67,9.1,11.67,'',{stair:{dir:'x',n:14},stairR:true});
  [[18.17,20.8,'Bed 4'],[20.91,23.5,'Bed 5'],[23.61,26.1,'Bed 6'],[26.21,27.71,'Bath 3',1],[27.82,31.94,'Laundry'],[32.05,35.8,'Study'],[35.91,39.89,'Study']].forEach(([a,b,n,w])=>add(a,b,8.23,11.56,n,{wet:!!w,nodim:true}));
  add(11.26,39.89,11.67,12.96,'Corridor',{nodim:true}); add(6.69,11.15,12.03,16.37,'Entertainment|room');
  [[11.26,13.42,'Bed 7'],[13.53,15.93,'Bed 8'],[16.04,18.41,'Bed 9'],[18.52,20.83,'Bed 10'],[20.94,24.39,'Study'],[24.5,27.67,'Study'],[27.78,29.89,'Bath 4',1],[30.0,31.66,'Bath 5',1],[31.77,33.37,'Bath 6',1],[33.48,36.49,'Study'],[36.6,39.89,'Study']].forEach(([a,b,n,w])=>add(a,b,13.07,16.37,n,{wet:!!w,nodim:true}));
  add(.23,3.75,14.13,15.9,'CT bath',{wet:true,nodim:true}); add(.23,3.75,16.01,18.37,'Caretaker|flat',{nodim:true});
  // first floor
  const F={lvl:1,nodim:true};
  add(10.53,13.04,.23,2.68,'Store',F); add(13.15,15.75,.23,2.68,'Bed 11',F); add(15.86,17.5,.23,2.68,'Bath 7',Object.assign({wet:true},F)); add(17.61,20.2,.23,2.68,'Bed 12',F); add(20.31,22.9,.23,2.68,'Bed 13',F); add(23.01,24.65,.23,2.68,'Bath 8',Object.assign({wet:true},F));
  add(10.53,24.65,2.79,3.84,'',F); add(13.15,14.34,3.84,11.56,'',F); add(18.06,20.25,3.95,6.22,'Study',F); add(20.36,22.5,3.95,6.22,'Study',F); add(22.61,24.65,3.95,6.22,'Study',F);
  add(10.53,13.04,3.95,6.5,'Bed 14',F); add(10.53,13.04,6.61,9.15,'Bed 15',F); add(10.53,13.04,9.26,11.56,'Bed 16',F); add(14.45,17.79,4.06,8.24,'Study',F); add(14.45,17.79,8.35,11.56,'',Object.assign({stair:{dir:'x',n:14,rev:true},stairR:true},F));
  [[18.06,21.73,'Study'],[21.84,25.49,'Study'],[25.6,29.29,'Study'],[29.4,32.95,'Study'],[33.06,34.67,'Bath 9',1],[34.78,36.41,'Bath 10',1],[36.52,38.12,'Bath 11',1],[38.23,39.89,'Bath 12',1]].forEach(([a,b,n,w])=>add(a,b,8.23,11.56,n,Object.assign({wet:!!w},F)));
  add(9.74,39.89,11.67,12.96,'Corridor',F); add(6.69,9.63,12.03,16.37,'Laundry',F);
  [9.74,13.52,17.3,21.08,24.87,28.65,32.43,36.13,39.89].forEach((x,i,a)=>{ if(i<a.length-1) add(x,a[i+1]-.11,13.07,16.37,'Bed '+(17+i),F); });
  // doors along corridors
  rooms.filter(r=>Math.abs(r.y-8.23)<.01).forEach(r=>doors.push({lvl:r.lvl||0,o:'h',x:r.x+.25,y:11.615,w:.76,s:-1}));
  rooms.filter(r=>Math.abs(r.y-13.07)<.01).forEach(r=>doors.push({lvl:r.lvl||0,o:'h',x:r.x+.25,y:13.015,w:.76,s:1}));
  rooms.filter(r=>Math.abs(r.y-.23)<.01 && r.x>13).forEach(r=>doors.push({lvl:r.lvl||0,o:'h',x:r.x+.2,y:2.735,w:.71,s:-1}));
  rooms.filter(r=>Math.abs(r.y-3.95)<.01 && r.x>18).forEach(r=>doors.push({lvl:r.lvl||0,o:'h',x:r.x+.2,y:3.895,w:.71,s:1}));
  doors.push({o:'v',x:11.205,y:13.3,w:.81,s:-1},{o:'h',x:.8,y:15.955,w:.71,s:-1},{lvl:1,o:'v',x:9.685,y:12.1,w:.81,s:-1},{o:'v',x:13.155,y:.6,w:.81,s:1},
    {lvl:1,o:'v',x:13.095,y:4.6,w:.76,s:-1},{lvl:1,o:'v',x:13.095,y:7.2,w:.76,s:-1},{lvl:1,o:'v',x:13.095,y:9.9,w:.76,s:-1},{lvl:1,o:'v',x:14.395,y:5.4,w:.81,s:1},{lvl:1,o:'v',x:13.095,y:.6,w:.76,s:-1});
  fit.push({k:'bic',x:10.53,y:4.0,w:.6,d:4.3},{k:'sink',x:10.53,y:5.0,w:.6,d:1.0},{k:'hob',x:11.2,y:3.95,w:.6,d:.6});
  Object.assign(P.capitalpark,{ tw:.23, rooms, doors, fit,
    levels:[[0,'ground floor'],[2.9,'first floor'],[5.6,'wall plate'],[7.9,'ridge']],
    sheets2d:[['gf','Ground floor plan','plan',{level:0}],['ff','First floor plan','plan',{level:1}],['rf','Roof plan','plan',{roof:true}],
      ['es','South elevation (street)','elevation',{face:'S'}],['en','North elevation','elevation',{face:'N'}],['ee','East elevation','elevation',{face:'E'}],['ew','West elevation','elevation',{face:'W'}],
      ['sa','Section A-A','section',{face:'E',cut:{at:19.2}}]] });
})();

// ---------- ERF 2433 BOARDING HOUSE ----------
(()=>{ const rooms=[], doors=[], fit=[];
  for(let L=0;L<2;L++){ for(let i=0;i<8;i++){ const a=.23+i*3.23, n=L*16+i+1;
      rooms.push(R(a,.23,3.0,3.0,'Unit '+n,{b:0,lvl:L,nodim:true}),R(a+1.41,3.23,1.59,2.85,'',{b:0,lvl:L}),R(a,3.34,1.3,2.74,'',{b:0,lvl:L,wet:true}));
      doors.push({b:0,lvl:L,o:'h',x:a+.3,y:3.285,w:.7,s:1}); fit.push({b:0,lvl:L,k:'shower',x:a+.05,y:3.4,w:.9,d:.9},{b:0,lvl:L,k:'wc',x:a+.4,y:5.3,w:.5,d:.65},{b:0,lvl:L,k:'bic',x:a+2.4,y:3.3,w:.6,d:1.4});
      const c=1.0+i*3.23, m=L*16+9+i;
      rooms.push(R(c,.23,3.0,2.3,'Unit '+m,{b:2,lvl:L,nodim:true}),R(c+1.41,2.53,1.59,2.14,'',{b:2,lvl:L}),R(c,2.64,1.3,2.03,'',{b:2,lvl:L,wet:true}));
      doors.push({b:2,lvl:L,o:'h',x:c+.3,y:2.585,w:.7,s:1}); fit.push({b:2,lvl:L,k:'shower',x:c+.05,y:2.7,w:.85,d:.85},{b:2,lvl:L,k:'wc',x:c+.4,y:3.9,w:.5,d:.65}); }
    rooms.push(R(.23,.23,2.32,6.29,'Stair',{b:1,lvl:L,stair:{dir:'y',n:16,rev:!!L},stairR:true,nodim:true}),R(26.95,.23,1.82,4.44,'Stair',{b:2,lvl:L,stair:{dir:'x',n:9,rev:!L},stairR:true,nodim:true}),R(.23,.23,.66,4.44,'',{b:2,lvl:L}),R(0,0,1,1,L?'Electrical|control room':'Laundry|room',{b:3,lvl:L,nodim:true,poly:[[-.98,.23],[0,.23],[4.98,5.31],[4.3,6.08],[-.98,6.08]]})); }
  Object.assign(P.erf2433,{ tw:.23, rooms, doors, fit,
    levels:[[0,'ground floor'],[2.925,'first floor'],[5.03,'eaves'],[5.6,'top of roof']],
    labels:[{x:16,y:-3.2,t:'Wing A — units 1–8 below, 17–24 above',fs:13},{x:26,y:22,t:'Wing B — units 9–16 below, 25–32 above',fs:13},{x:15,y:18,t:'Parking',fs:14,w:500,c:'#5A6A71'}],
    sheets2d:[['gf','Ground floor plan','plan',{level:0}],['ff','First floor plan','plan',{level:1}],['rf','Roof plan','plan',{roof:true}],
      ['es','South elevation','elevation',{face:'S'}],['en','North elevation','elevation',{face:'N'}],['ee','East elevation','elevation',{face:'E'}],['ew','West elevation','elevation',{face:'W'}],
      ['sa','Section A-A (through wing A)','section',{face:'W',cut:{at:9.0}}]] });
  // the triangular laundry block is a polygon: give it a plan footprint the engine can draw
  const b3=P.erf2433.blocks[3]; b3.w=5.31; b3.d=6.31; b3.planPoly=b3.poly; b3.levels=2;
})();

// ---------- 300D BOILER BUILDING ----------
Object.assign(P.boiler,{ tw:.23,
  rooms:[R(.23,.23,7.28,5.39,'Boiler room')], fit:[{k:'equip',x:2.0,y:2.4,w:3.6,d:1.6}],
  levels:[[0,'ground level'],[2.54,'top of lintel'],[4.016,'top of wall'],[6.23,'top of column'],[7.37,'top of roof']],
  grids:{x:[[0,'4'],[7.74,'3']],y:[[0,'D'],[5.85,'C']]},
  labels:[{x:3.8,y:3.3,t:'Boiler (by others)',fs:11,w:500,c:'#5A6A71'}],
  sheets2d:[['gf','Ground level plan','plan',{level:0,dims:true}],['rf','Roof plan','plan',{roof:true}],['ee','East elevation','elevation',{face:'E'}],['ew','West elevation','elevation',{face:'W'}],
    ['es','South elevation','elevation',{face:'S'}],['en','North elevation','elevation',{face:'N'}],['sa','Section — grid 3-3 to 4-4','section',{face:'W',cut:{at:3.9}}]]
});

// ---------- ANS OFFLOADING PLATFORM ----------
Object.assign(P.ans,{
  grids:{x:[[-.35,'01'],[3.891,'02'],[6.891,'03']],y:[[-.5,'A'],[.5,'B']]},
  labels:[{x:5.4,y:-3.6,t:'Chemical tanker truck',fs:13},{x:5.4,y:-4.6,t:'Catchment pit',fs:12,w:500,c:'#5A6A71'},{x:5.4,y:-5.75,t:'V-drain',fs:12,w:500,c:'#5A6A71'},{x:5.4,y:1.6,t:'Platform 3000 × 1150 at +3.43',fs:12,w:500,c:'#1F6E8C'},{x:1.6,y:1.6,t:'Stair 38°',fs:12,w:500,c:'#1F6E8C'}],
  levels:[[0,'NGL'],[.449,'top of plinth'],[3.43,'platform']],
  sheets2d:[['pl','Platform layout and site','plan',{cut:6}],['es','Elevation on grid B','elevation',{face:'S'}],['ee','Elevation on grid 03','elevation',{face:'E'}],['sa','Section on centreline','section',{face:'W',cut:{at:5.39}}]]
});

// ---------- 300D SILO TANKS SUPPORT & PLATFORM ----------
Object.assign(P.silo,{
  grids:{x:[[0,'01'],[1.68,'02'],[4.79,'03'],[7.39,'4'],[10.5,'05'],[13.1,'06'],[16.21,'07'],[17.89,'08']],y:[[0,'H'],[.935,'I1'],[2.787,'08g'],[4.014,'J1'],[5.815,'K'],[7.042,'K1']]},
  levels:[[0,'level 1'],[5.99,'level 2 platform'],[7.36,'base of silo'],[12.21,'top of silo']],
  sheets2d:[['pl','Grating layout','plan',{cut:6.6}],['en','North elevation','elevation',{face:'N'}],['ee','East elevation','elevation',{face:'E'}],['sa','Section A-A','section',{face:'S',cut:{at:3.0}}],['rf','Plan at top of silos','plan',{roof:true}]]
});

// ---------- AN BUND WALL WALKWAY ----------
Object.assign(P.walk,{
  grids:{x:[[0,'A'],[.6,'B'],[1.2,'C']],y:[[0,'1'],[2.4,'2']]},
  labels:[{x:-1.6,y:4.3,t:'Bund wall',fs:12,w:500,c:'#5A6A71'}],
  levels:[[0,'ground'],[.8,'deck'],[1.7,'top of guardrail']],
  sheets2d:[['pl','Walkway layout','plan',{cut:3}],['ee','Front view','elevation',{face:'E'}],['es','Side view','elevation',{face:'S'}]]
});

// ---------- 20D TANK CAT LADDER ----------
Object.assign(P.catl,{
  labels:[{x:-4.77,y:0,t:'Existing tank',fs:13},{x:4.77,y:0,t:'Existing tank',fs:13},{x:0,y:1.7,t:'New cat ladder',fs:12,c:'#1F6E8C'}],
  levels:[[0,'ground'],[5.214,'fixed platform'],[5.724,'stiffener'],[8.0,'tank-top walkway']],
  sheets2d:[['pl','Plan at walkway level','plan',{cut:9}],['es','Front elevation','elevation',{face:'S'}],['sa','Side section through ladder','section',{face:'E',cut:{at:0}}]]
});

})();
