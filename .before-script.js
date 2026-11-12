'use strict';
const stage = document.getElementById('stage');
const openButton = document.getElementById('open-gift');
const replayButton = document.getElementById('replay');

const status = document.getElementById('status');
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const DURATION = 4900;
let running = false, frame = 0, started = 0, keyboardOpening = false;
const mix = (a,b,t) => a+(b-a)*t;
const ease = t => t*t*(3-2*t);
const phase = (ms,a,b) => ease(Math.min(1,Math.max(0,(ms-a)/(b-a))));
const blend = (a,b,t) => a.map((v,i)=>Array.isArray(v)?blend(v,b[i],t):mix(v,b[i],t));

// Each row after the initial [x,y,width] is one cubic Bezier:
// [control1 x,y, control2 x,y, end x,y, end width].
// These two visible runs join around the hidden underside of the box.
// Shared endpoints preserve continuity: loops, collar and tails are material,
// never separately translated sprites. All widths remain nonzero throughout.
const frontTied = [[300,414,42],
 [300,356,300,285,300,241,19],
 [326,185,371,167,377,190,21], [386,213,342,239,302,239,16],
 [314,241,310,225,300,229,18], [285,228,288,245,300,245,18],
 [286,249,275,279,264,295,22]];
const pullTied = [[300,223,40], [300,227,300,233,299,238,18],
 [265,182,216,178,218,201,23], [220,224,267,237,302,239,16],
 [322,246,336,267,344,285,22]];
const pullTaut = [[300,223,40], [300,227,300,233,299,238,17],
 [266,184,220,181,222,203,22], [224,225,272,238,302,239,15],
 [329,242,352,252,371,262,18]];
const pullCollapsed = [[300,223,40], [300,227,300,233,299,238,17],
 [291,229,281,226,282,234,12], [283,242,294,241,304,239,14],
 [357,238,411,250,466,265,20]];
const pullFree = [[300,223,40], [300,227,302,232,307,236,20],
 [314,239,324,240,335,241,18], [351,241,368,241,385,243,18],
 [417,246,447,256,471,265,21]];
// The collar opens into a visible C, then straightens into the released end.
const frontLoose = [[300,414,42], [300,356,300,285,300,241,19],
 [328,188,370,171,375,193,21], [380,215,340,243,309,240,16],
 [330,241,324,211,300,218,16], [275,224,279,255,296,253,17],
 [281,261,267,285,256,299,22]];
const frontFree = [[300,414,42], [300,354,301,280,298,242,20],
 [289,232,276,232,263,237,18], [249,242,234,245,219,247,18],
 [205,249,194,253,185,258,18], [175,264,166,270,156,277,19],
 [145,283,134,287,122,290,22]];
const frontPeel = [[300,414,42], [321,382,367,311,405,270,24],
 [409,263,410,252,401,248,18], [387,242,368,248,351,253,18],
 [322,262,300,276,274,286,18], [245,297,219,300,197,298,19],
 [179,296,162,291,150,287,22]];
const pullPeel = [[405,270,24], [414,257,420,244,430,246,19],
 [441,249,435,271,435,287,18], [436,309,452,316,470,315,18],
 [490,315,501,306,512,299,21]];
// Released satin settles on the ground instead of disappearing.
const frontRest = [[385,434,34], [375,447,348,459,326,452,24],
 [307,446,302,432,284,432,18], [264,431,250,451,229,453,18],
 [210,455,197,447,182,441,18], [168,435,154,434,140,438,19],
 [129,441,119,445,109,449,22]];
const pullRest = [[385,434,34], [395,426,407,425,418,432,22],
 [429,441,426,453,437,459,18], [449,466,469,460,480,450,18],
 [492,441,497,433,507,431,21]];

function geometry(ms) {
 let front=blend(frontTied,frontLoose,phase(ms,1320,1900));
 let pull=blend(pullTied,pullTaut,phase(ms,380,830));
 pull=blend(pull,pullCollapsed,phase(ms,830,1530));
 pull=blend(pull,pullFree,phase(ms,1530,1950));
 front=blend(front,frontFree,phase(ms,1900,2780));
 const peel=phase(ms,2800,3200), fall=phase(ms,3200,3570);
 front=blend(front,frontPeel,peel); pull=blend(pull,pullPeel,peel);
 return {front:blend(front,frontRest,fall),pull:blend(pull,pullRest,fall)};
}
// The existing untying curves drive a shaded, folded satin sheet. Canvas is
// embedded in the SVG so it shares the gift's perspective, layers and wiggle.
const ribbonCanvas = document.getElementById('ribbon-canvas');
const ribbonContext = ribbonCanvas.getContext('2d', {alpha:true});
let ribbonTime = 0;
let ribbonScale = 2;

function sample(rows, run, ms) {
 const points=[];
 let [x,y,width]=rows[0];
 const loopAmount=1-phase(ms,run==='front'?1900:830,run==='front'?2780:1950);
 const collarAmount=1-phase(ms,1900,2780);
 rows.slice(1).forEach((row,segment)=>{
  const [ax,ay,bx,by,ex,ey,ew]=row;
  for(let i=segment?1:0;i<=32;i++) {
   const t=i/32,s=1-t;
   const dx=3*s*s*(ax-x)+6*s*t*(bx-ax)+3*t*t*(ex-bx);
   const dy=3*s*s*(ay-y)+6*s*t*(by-ay)+3*t*t*(ey-by);
   const length=Math.hypot(dx,dy)||1;
   const ddx=6*(s*(bx-2*ax+x)+t*(ex-2*bx+ax));
   const ddy=6*(s*(by-2*ay+y)+t*(ey-2*by+ay));
   const bendRadius=length*length*length/Math.max(.001,Math.abs(dx*ddy-dy*ddx));
   const u=(segment-1+t)/2;
   const loop=segment===1||segment===2;
   const collar=run==='front'&&(segment===3||segment===4);
   const gather=loop?loopAmount:collar?collarAmount:0;
   const swell=loop?Math.sin(Math.PI*u):0;
   let bank=.08*Math.sin((segment+t)*2.8);
   if(loop) {
    const turn=Math.exp(-Math.pow((u-.5)/.105,2));
    bank+=(.16+.36*Math.sin(u*Math.PI*2+(run==='front'?.45:-.3))+1.22*turn)*gather;
   }
   if(collar) bank+=.65*Math.sin((segment-3+t)*Math.PI)*gather;
   const tail=segment===rows.length-2;
   const tailGather=tail?(1-t)*(1-phase(ms,1900,2800)):0;
   points.push({x:s*s*s*x+3*s*s*t*ax+3*s*t*t*bx+t*t*t*ex,
    y:s*s*s*y+3*s*s*t*ay+3*s*t*t*by+t*t*t*ey,
    nx:-dy/length,ny:dx/length,tx:dx/length,ty:dy/length,
    width:mix(width,ew,ease(t))*(1+.55*swell*gather+(tail?.18*t:0)),
    bank,bendRadius:loop?bendRadius:10000,lift:loop?10*swell*gather:0,
    pleat:collar?.7*gather:tailGather*.5,
    grain:segment+t,segment,t});
  }
  [x,y,width]=[ex,ey,ew];
 });
 return points;
}
function fabricPoint(p,v) {
 // A banked sheet with a shallow camber and small gathered folds at the knot.
 // The projected width pinches when the cloth turns edge-on.
 const fold=Math.sin(v*17+p.grain*2)*p.pleat;
 const depth=(.07*(1-4*v*v)+fold*.045)*p.width;
 const across=Math.min(p.width*Math.max(.23,Math.cos(p.bank)),p.bendRadius*1.6)*v;
 return {x:p.x+p.nx*across,
  y:p.y+p.ny*across-p.lift-Math.sin(p.bank)*p.width*v*.42-depth*.55};
}
function satinColor(p,v) {
 const fold=Math.cos(v*17+p.grain*2)*p.pleat*.65;
 const angle=p.bank+v*.52+fold;
 const nx=p.nx*Math.sin(angle),ny=p.ny*Math.sin(angle),nz=Math.cos(angle);
 const diffuse=Math.max(0,nx*-.42+ny*-.48+nz*.77);
 // A broad, warm reflection, interrupted by the folds and turned-back edges.
 const material=designs[selected].material;
 const shine=Math.pow(Math.max(0,nx*-.24+ny*-.27+nz*.932),24)*(material==='velvet'?.18:material==='linen'?.25:material==='grosgrain'?.4:1);
 const weave=1+.008*Math.sin(v*220+p.grain*4);
 const shade=(p.segment===2?.91:1)*weave;
 const tones=designs[selected].ribbon;
 const texture=material==='woven'||material==='linen'? .92+.08*Math.sin(p.grain*150)*Math.cos(v*180):material==='grosgrain'?.92+.08*Math.cos(p.grain*95):material==='velvet'?.96+.04*Math.sin(p.grain*260+v*300):1;
 return `rgb(${tones.map(c=>Math.min(255,(c[0]+c[1]*diffuse+c[2]*shine)*shade*texture)|0).join(',')})`;
}
function traceRibbon(ctx,points) {
 const left=points.map(p=>fabricPoint(p,-.5));
 const right=points.map(p=>fabricPoint(p,.5)).reverse();
 ctx.beginPath();ctx.moveTo(left[0].x,left[0].y);
 left.slice(1).forEach(p=>ctx.lineTo(p.x,p.y));
 right.forEach(p=>ctx.lineTo(p.x,p.y));ctx.closePath();
}
function paintRibbon(points, shadow=true) {
 const ctx=ribbonContext;
 ctx.save();
 if(shadow){
  traceRibbon(ctx,points);ctx.shadowColor='rgba(33,12,8,.55)';
  ctx.shadowBlur=4*ribbonScale;ctx.shadowOffsetX=2*ribbonScale;ctx.shadowOffsetY=4*ribbonScale;
  ctx.fillStyle=selected==='plum'?'#71324c':selected==='kraft'?'#b5a17b':'#9d7438';ctx.fill();
  ctx.shadowColor='transparent';
 }
 for(let i=1;i<points.length;i++) {
  const a=points[i-1],b=points[i];
  const al=fabricPoint(a,-.5),ar=fabricPoint(a,.5);
  const bl=fabricPoint(b,-.5),br=fabricPoint(b,.5);
  const gradient=ctx.createLinearGradient((al.x+bl.x)/2,(al.y+bl.y)/2,(ar.x+br.x)/2,(ar.y+br.y)/2);
  for(let band=0;band<=8;band++) gradient.addColorStop(band/8,satinColor(b,band/8-.5));
  ctx.beginPath();ctx.moveTo(al.x,al.y);ctx.lineTo(bl.x,bl.y);
  if(i===points.length-1){
   // A small, irregular fishtail cut gives the loose ends a fabric edge.
   const tip=fabricPoint(b,0);ctx.lineTo(tip.x-b.tx*5,tip.y-b.ty*5);
  }
  ctx.lineTo(br.x,br.y);ctx.lineTo(ar.x,ar.y);ctx.closePath();
  ctx.fillStyle=gradient;ctx.fill();
  // Overlap the tiny patches to prevent hairline seams from antialiasing.
  ctx.strokeStyle=gradient;ctx.lineWidth=.45;ctx.stroke();
 }
 // Fine selvedges and longitudinal silk threads, not metallic outline bands.
 for(let thread=0;thread<=20;thread++) {
  const v=thread/20-.5;
  ctx.beginPath();points.forEach((p,i)=>{
   const q=fabricPoint(p,v);if(i===0)ctx.moveTo(q.x,q.y);else ctx.lineTo(q.x,q.y);
  });
  const edge=selected==='midnight'?'rgba(227,242,255,.5)':selected==='ivory'?'rgba(155,183,139,.35)':selected==='plum'?'rgba(216,143,172,.35)':selected==='kraft'?'rgba(232,220,190,.4)':'rgba(255,236,191,.5)';
  ctx.strokeStyle=thread===0?edge:thread===20?'rgba(18,25,24,.42)':'rgba(230,239,217,.055)';
  ctx.lineWidth=thread===0||thread===20?.6:.25;ctx.stroke();
 }
 ctx.restore();
}
function drawRibbon(ms) {
 ribbonTime=ms;
 if(designs[selected].arrangement) {drawArrangement(ms); return;}
 const {front,pull}=geometry(ms);
 const variant=designs[selected];
 for(const rows of [front,pull]) rows.forEach((row,i)=>{
   row[row.length-1]*=variant.width;
   if(i===2||i===3) {
     const amount=1-phase(ms,380,2780);
     for(let k=0;k<6;k+=2) row[k]=mix(row[k],300+(row[k]-300)*variant.loop,amount);
   }
 });
 // Bow silhouettes vary independently of the container. Blend back to the
 // existing released curves; keep one opening timeline and renderer.
 const tied=1-phase(ms,380,2780);
 for(const [run,rows] of [['front',front],['pull',pull]]) {
  for(let i=2;i<=3;i++) for(let k=0;k<6;k+=2) {
   const factor=run==='front'?(variant.rightLoop||1):(variant.leftLoop||1);
   rows[i][k]=300+(rows[i][k]-300)*mix(1,factor,tied);
   rows[i][k+1]+= (variant.bowDrop||0)*tied;
  }
 }
 if(variant.shape) for(const rows of [front,pull]) rows.forEach((row,i)=>{
  const last=i===0?2:6;
  for(let k=0;k<last;k+=2) {
   const y=row[k+1], knot=variant.knot;
   row[k]=300+(row[k]-300)*variant.span+(variant.offset||0)*(1-phase(ms,2800,3570));
   row[k+1]=y<=241?knot+(y-241)*(variant.bowHeight||1):y<=420?knot+(y-241)*(420-knot)/179:y;
  }
 });
 const frontPoints=sample(front,'front',ms),pullPoints=sample(pull,'pull',ms);
 ribbonContext.setTransform(ribbonScale,0,0,ribbonScale,0,0);
 ribbonContext.clearRect(0,0,600,490);
 if(variant.extraLoops) {
  // Two additional, smaller bights turn the hatbox bow into a rosette.
  // Their geometry shares the untying curves and flattens into them on release.
  for(const [points,side] of [[frontPoints,1],[pullPoints,-1]]) {
   const extra=points.filter(p=>p.segment===1||p.segment===2).map(p=>({...p,
    x:mix(p.x,300+(p.x-300)*1.12+side*18,tied),
    y:p.y+28*tied,width:p.width*.68}));
   paintRibbon(extra);
  }
 }
 paintRibbon(frontPoints);paintRibbon(pullPoints);
 // Same material collar over the pulled strand's underpass; same topology.
 paintRibbon(frontPoints.filter(p=>p.segment>=3));
 stage.dataset.phase=ms<830?'tension':ms<1530?'first-loop':ms<1900?'knot-opening':ms<2800?'last-loop':ms<3570?'ribbon-slipping':'reveal';
}
function sizeRibbon() {
 ribbonScale=Math.min(3,Math.max(1.5,(window.devicePixelRatio||1)*stage.clientWidth/600));
 ribbonCanvas.width=Math.round(600*ribbonScale);
 ribbonCanvas.height=Math.round(490*ribbonScale);
 drawRibbon(ribbonTime);
}
const designs = {
 crimson:{scale:[1,1],width:1,loop:1,ribbon:[[86,144,53],[47,130,76],[14,73,116]],palette:null,title:'A crimson botanical present with a golden satin bow',note:'Crimson botanical · A classic keepsake box with generous satin loops.'},
 ivory:{scale:[1.2,.82],width:1.18,loop:.82,ribbon:[[9,40,35],[29,66,40],[21,42,32]],palette:['#eee0bc','#d9ccaa','#c1b18b','#958465','#b8aa88','#85785d','#a99b79','#fff5d9','#f2e7ca','#ddd0b0','#c4b48e','#f2e8cd','#e3d4b4','#cbbc98','#a59672','#eddfbd'],title:'A wide ivory parcel with a forest green woven bow',note:'Woodland parcel · A low, wide box in warm ivory with a full woven forest bow.'},
 midnight:{scale:[.78,1.28],width:.65,loop:1.15,ribbon:[[60,119,64],[71,126,58],[88,133,34]],palette:['#51768b','#30546d','#203c57','#14253b','#243b55','#132339','#294760','#809cab','#537c94','#355c77','#25445f','#7190a3','#4a718a','#2b506c','#1b354e','#64869d'],title:'A tall midnight blue present with a slender silver silk bow',note:'Midnight stars · A tall blue lustre box, scattered stars and slender silver silk.'}
};
// Each construction owns its silhouette and seam layout, not just a scale.
// Shared gradient IDs let the original material and animation layers survive.
const constructions = {
 plum:{
  base:'M162 293A138 53 0 1 1 438 293V367A138 53 0 0 1 162 367Z',
  lid:`<ellipse cx="300" cy="271" rx="149" ry="57" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <ellipse cx="300" cy="271" rx="138" ry="48" fill="none" stroke="#dfb68c" stroke-width="1" opacity=".7"/>
   <path d="M151 271A149 57 0 0 0 449 271V297A149 57 0 0 1 151 297Z" fill="url(#lid-front)"/>
   <path d="M153 292A147 55 0 0 0 447 292" fill="none" stroke="#ecc599" stroke-width="2"/>
   <path d="M153 279A147 55 0 0 0 447 279" fill="none" stroke="#d7a48b" opacity=".5"/>`,
  body:`<path d="M162 293A138 53 0 0 0 438 293V367A138 53 0 0 1 162 367Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M162 293A138 53 0 0 0 438 293V367A138 53 0 0 1 162 367Z" fill="url(#study-pattern)"/>
   <path d="M164 365A136 51 0 0 0 436 365" fill="none" stroke="#deb489" stroke-width="2"/>
   <ellipse cx="365" cy="367" rx="35" ry="14" fill="#d6b284" opacity=".9"/>
   <text x="365" y="370" text-anchor="middle" fill="#633349" font-family="Georgia,serif" font-size="8" letter-spacing="2">CHIME</text>`},
 kraft:{
  base:'M110 347L153 310L491 334L449 371V420L110 395Z',
  lid:`<path d="M105 337L150 299L496 325L451 363Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M105 337L150 299L496 325L451 363Z" fill="url(#study-pattern)"/>
   <path d="M105 337L451 363V377L105 351Z" fill="url(#lid-front)"/>
   <path d="M451 363L496 325V340L451 377Z" fill="url(#paper-side)"/>
   <path d="M150 299L211 339L105 337M496 325L393 351L451 363M211 339L393 351" fill="none" stroke="#806044" stroke-width="1" opacity=".6"/>
   <path d="M155 302L211 337L392 350" fill="none" stroke="#f4dfbb" opacity=".5"/>`,
  body:`<path d="M110 352L449 377V420L110 395Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M449 377L491 341V385L449 420Z" fill="url(#paper-side)"/>
   <path d="M110 352L449 377V420L110 395Z" fill="url(#study-pattern)" opacity=".7"/>
   <path d="M112 355L143 375L112 392M489 345L467 382L450 417" fill="none" stroke="#70553c" opacity=".6"/>
   <path d="M113 394L448 418" stroke="#efdab1" fill="none" opacity=".6"/>`},
 emerald:{
  base:'M219 291L260 268L343 272L383 302V381L348 413L249 409L219 378Z',
  lid:`<path d="M211 278L251 247L344 254L391 288L352 324L252 316Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M211 278L252 316L352 324L391 288V306L352 343L252 335L211 296Z" fill="url(#lid-front)"/>
   <path d="M222 278L254 256L342 263L379 288L349 314L256 307Z" fill="none" stroke="#d7bd7c" stroke-width="1.2"/>
   <path d="M214 294L253 332L351 340L388 305" fill="none" stroke="#dfc58d"/>
   <circle cx="353" cy="284" r="11" fill="#ab784e" stroke="#e9ce8e"/>
   <path d="M350 279Q359 281 352 287L348 290M347 282L357 284" fill="none" stroke="#f5d89a"/>`,
  body:`<path d="M219 302L251 334L350 342L383 312V381L348 413L249 405L219 375Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M350 342L383 312V381L348 413Z" fill="url(#paper-side)"/>
   <path d="M219 302L251 334V405L219 375Z" fill="#8db396" opacity=".18"/>
   <path d="M251 341V399L345 407V348M224 316V373L245 393M355 349V400L378 379V324" fill="none" stroke="#cdb777" stroke-width=".8" opacity=".65"/>
   <path d="M263 353L334 359M263 390L334 396" stroke="#cdb777" opacity=".35"/>
   <path d="M296 367l4 7 7 2-7 2-4 7-2-8-6-3 7-2Z" fill="#d4bf82" opacity=".7"/>`}
};
Object.assign(designs, {
 plum:{shape:'plum',scale:[1,1],span:1,knot:259,width:1.24,loop:1.02,leftLoop:1.08,rightLoop:.9,extraLoops:true,material:'velvet',ribbon:[[48,95,12],[14,38,10],[26,57,16]],
  palette:['#a36b85','#82506d','#653b59','#42253e','#482a40','#2b1d30','#674059','#c292aa','#ae7996','#8e5d7b','#71445f','#b57e99','#9e6885','#81506d','#58354e','#ad7894'],title:'A round sugarplum hatbox with a layered wine velvet rosette',note:'Sugarplum hatbox · Fluted plum paper, curved gilt rims and a four-loop velvet rosette.'},
 kraft:{shape:'kraft',scale:[1,1],span:1.15,knot:328,offset:-64,bowHeight:.65,width:.5,loop:.72,leftLoop:.65,rightLoop:1.08,bowDrop:15,material:'linen',ribbon:[[93,101,11],[80,101,13],[59,92,14]],
  palette:['#ceb18a','#bea078','#a88a64','#8b704f','#947853','#73593e','#a1835d','#e4cba4','#d9bc91','#c1a177','#ae8d64','#d5b58a','#c5a478','#b08e64','#8a6f4d','#c0a177'],title:'A long flat kraft parcel with offset linen bow and a postage-style label',note:'The long way home · Folded striped kraft, a tiny offset linen tie and a handwritten-style label.'},
 emerald:{shape:'emerald',scale:[1,1],span:.78,knot:283,bowHeight:.62,width:.62,loop:.72,leftLoop:.85,rightLoop:1.1,material:'silk',ribbon:[[74,116,39],[47,110,57],[13,56,78]],
  palette:['#3d7461','#265848','#1d4439','#122f2a','#17372f','#102820','#2a5043','#759786','#517b67','#38634e','#254c3e','#547e66','#3e6853','#2b513e','#193d30','#688c70'],title:'A compact octagonal emerald box with a petite champagne silk bow and bronze seal',note:'Emerald treasure · An eight-sided jewel box, inset gilt lines, petite silk and a bronze seal.'}
});
designs.ivory.material='woven';
designs.ivory.leftLoop=.65;
designs.ivory.rightLoop=1.05;
designs.ivory.bowDrop=10;
designs.midnight.leftLoop=.84;
designs.midnight.rightLoop=.84;
let selected='crimson';
const materialStops=[...document.querySelectorAll('#paper-front stop, #paper-side stop, #lid-top stop, #lid-front stop')];
const originalStops=materialStops.map(stop=>stop.getAttribute('stop-color'));
const pattern=document.getElementById('botanical');
const originalPattern=pattern.innerHTML;
const lid=document.querySelector('.box-lid');
const body=document.querySelector('.box-body');
const originalLid=lid.innerHTML, originalBody=body.innerHTML;
const basePaths=[...document.querySelector('.present').children].filter(el=>el.tagName.toLowerCase()==='path');
document.querySelector('svg defs').insertAdjacentHTML('beforeend',`
 <pattern id="study-pattern" width="12" height="12" patternUnits="userSpaceOnUse"><path d="M1 0V12" stroke="#f8d9c5" opacity=".15"/><path d="M3 0V12" stroke="#311626" opacity=".12"/></pattern>
 <pattern id="kraft-stripe" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(-32)"><path d="M0 0V28" stroke="#694e32" stroke-width="1" opacity=".24"/><path d="M4 0V28" stroke="#f3dfb8" stroke-width=".7" opacity=".25"/></pattern>`);
const pine=`<g aria-hidden="true" transform="translate(347 236) rotate(24)">
 <path d="M-6 38L39-11" stroke="#7a6745" stroke-width="2"/>
 <g stroke="#334e38" stroke-width="2" fill="none"><path d="M1 30l-4-22m8 17 21 0M11 19L7-1m9 15 21-1M22 8l-1-20m7 15 17-2"/></g>
 <g stroke="#7f9561" stroke-width=".8"><path d="M1 28l-10-19m12 16 20-6M12 17L4-4m11 18 19-8M23 5l-7-17m11 13 15-7"/></g>
 <circle cx="12" cy="20" r="3" fill="#92373c"/><circle cx="17" cy="23" r="3" fill="#ad484a"/>
 </g><g aria-hidden="true" transform="rotate(9 364 278)"><path d="M352 252Q341 263 354 280" fill="none" stroke="#9f8a5e"/>
 <path d="M348 270L376 272L381 285L375 317L345 313Z" fill="#f1e6c7" stroke="#ac9870" stroke-width=".7"/><circle cx="362" cy="279" r="2" fill="#8a7957"/>
 <text x="361" y="298" text-anchor="middle" font-family="Georgia,serif" font-style="italic" font-size="8" fill="#506045">for you</text></g>`;
function selectDesign(key) {
 if(!Object.hasOwn(designs,key)) return;
 selected=key; const design=designs[key];
 const construction=constructions[design.shape];
 lid.innerHTML=construction?construction.lid:originalLid;
 body.innerHTML=construction?construction.body:originalBody;
 basePaths.forEach((path,i)=>{
  path.style.display=construction&&i>0?'none':'';
  if(i===0) path.setAttribute('d',construction?construction.base:'M173 273L207 243L439 262L405 293V419L173 400Z');
 });
 if(key==='ivory') lid.insertAdjacentHTML('beforeend',pine);
 if(key==='kraft') lid.insertAdjacentHTML('beforeend',`<g transform="rotate(4 378 336)" aria-hidden="true"><rect x="343" y="320" width="74" height="29" rx="1" fill="#e7d6b5" stroke="#927551"/>
  <path d="M348 324H411V344H348Z" stroke="#917752" stroke-dasharray="2 2" fill="none"/>
  <text x="379" y="337" text-anchor="middle" font-family="Georgia,serif" font-size="10" font-style="italic" fill="#745c42">North Pole</text></g>`);
 if(key==='kraft') body.innerHTML=body.innerHTML.replaceAll('url(#study-pattern)','url(#kraft-stripe)');
 if(key==='kraft') lid.innerHTML=lid.innerHTML.replaceAll('url(#study-pattern)','url(#kraft-stripe)');
 materialStops.forEach((stop,i)=>stop.setAttribute('stop-color',design.palette?design.palette[i]:originalStops[i]));
 pattern.innerHTML=key==='crimson'?originalPattern:key==='ivory'?'<g stroke="#6a7955" fill="none" stroke-width=".8" opacity=".3"><path d="M20 60V20m0 8-9 8m9-1 10 9m-10-1-9 9m9-1 10 9"/></g>':'<g fill="#dceaf0" opacity=".55"><path d="M20 18l1.5 5 5 1.5-5 1.5-1.5 5-1.5-5-5-1.5 5-1.5Z"/><circle cx="48" cy="52" r="1"/></g>';
 document.getElementById('design-shape').setAttribute('transform',`translate(${300*(1-design.scale[0])} ${420*(1-design.scale[1])}) scale(${design.scale.join(' ')})`);
 document.getElementById('gift-title').textContent=design.title;
 document.getElementById('design-note').textContent=design.note;
 stage.dataset.design=key;
 stage.dataset.material=design.material||'satin';
 stage.dataset.shape=design.shape||'box';
 stage.dataset.arrangement=design.arrangement||'';
 if(design.arrangement) {
  stage.style.setProperty('--lid-delay',`${design.lidDelay}ms`);
  stage.style.setProperty('--card-delay',`${design.lidDelay+250}ms`);
  stage.style.setProperty('--sparkle-delay',`${design.lidDelay+100}ms`);
 }
 document.querySelectorAll('.design-picker [data-design]').forEach(button=>button.setAttribute('aria-pressed',String(button.dataset.design===key)));
 replay();
}
document.querySelectorAll('.design-picker [data-design]').forEach(button=>button.addEventListener('click',()=>selectDesign(button.dataset.design)));
new ResizeObserver(sizeRibbon).observe(stage);
function finish() {
 drawRibbon(designs[selected].duration||DURATION); stage.classList.add('is-open'); running=false;
 document.querySelector('.song-card').setAttribute('aria-hidden','false');
 replayButton.disabled=false;
 status.textContent='Unwrapped. Reset to inspect the wrapping, or choose another present.';
 if(keyboardOpening) replayButton.focus({preventScroll:true});
}
function tick(now) {
 const elapsed=now-started; drawRibbon(elapsed);
 if(elapsed<(designs[selected].duration||DURATION)) frame=requestAnimationFrame(tick); else finish();
}
function openGift() {
 if(running||stage.classList.contains('is-open')) return;
 keyboardOpening=openButton.matches(':focus-visible'); running=true;
 replayButton.disabled=false; openButton.disabled=true;
 status.textContent='Unwrapping a little Christmas magic…';
 stage.classList.add('is-opening'); started=performance.now();
 if(reducedMotion.matches) finish(); else frame=requestAnimationFrame(tick);
}
function replay() {
 cancelAnimationFrame(frame); stage.classList.remove('is-opening','is-open');
 running=false; openButton.disabled=false; replayButton.disabled=false;
 document.querySelector('.song-card').setAttribute('aria-hidden','true');
 drawRibbon(0); status.textContent='Fully wrapped. Click or tap the present to unwrap.';
}
reducedMotion.addEventListener('change',()=>{
 if(running&&reducedMotion.matches) {cancelAnimationFrame(frame);finish();}
});
openButton.addEventListener('click',openGift);
replayButton.addEventListener('click',replay);
// Static snapshots reuse the actual SVG and Canvas artwork. Only the selected
// full-size present animates; the overview has no idle loops or live canvases.
function buildThumbnails() {
 const svg=document.querySelector('.gift');
 for(const button of document.querySelectorAll('.design-picker [data-design]')) {
  selectDesign(button.dataset.design);
  const thumbnail=svg.cloneNode(true);
  thumbnail.setAttribute('viewBox','80 105 440 340');
  thumbnail.setAttribute('width','440'); thumbnail.setAttribute('height','340');
  thumbnail.setAttribute('class','stage');
  thumbnail.setAttribute('data-design',selected);
  thumbnail.setAttribute('data-material',designs[selected].material||'satin');
  thumbnail.setAttribute('style','width:440px;height:340px;margin:0;background:transparent');
  const image=document.createElementNS('http://www.w3.org/2000/svg','image');
  image.setAttribute('href',ribbonCanvas.toDataURL());
  image.setAttribute('width','600'); image.setAttribute('height','490');
  thumbnail.querySelector('foreignObject').replaceWith(image);
  const style=document.createElementNS('http://www.w3.org/2000/svg','style');
  // Self-contained SVG images also work when index.html is opened via file://;
  // no stylesheet CSSOM access or external resources are needed.
  style.textContent='.song-card,.inner-light,.sparkles{display:none}';
  if(selected==='ivory'||selected==='midnight') {
   thumbnail.querySelectorAll('.box-body path[stroke],.box-lid>path[stroke]').forEach(path=>path.setAttribute('stroke',selected==='ivory'?'#8f8263':'#b8d3df'));
  }
  thumbnail.prepend(style);
  const preview=document.createElement('img');
  preview.className='design-thumbnail'; preview.alt='';
  preview.width=132; preview.height=102;
  preview.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(thumbnail));
  button.querySelector('.swatch').replaceWith(preview);
 }
}
// Collection setup follows the original six definitions above.
