'use strict';
const stage = document.getElementById('stage');
const openButton = document.getElementById('open-gift');
const replayButton = document.getElementById('replay');
const songLink = document.getElementById('song-link');
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
 const shine=Math.pow(Math.max(0,nx*-.24+ny*-.27+nz*.932),24);
 const weave=1+.008*Math.sin(v*220+p.grain*4);
 const shade=(p.segment===2?.91:1)*weave;
 return `rgb(${Math.min(255,(86+144*diffuse+53*shine)*shade)|0},${Math.min(255,(47+130*diffuse+76*shine)*shade)|0},${Math.min(255,(14+73*diffuse+116*shine)*shade)|0})`;
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
  ctx.fillStyle='#9d7438';ctx.fill();
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
  ctx.strokeStyle=thread===0?'rgba(255,236,191,.5)':thread===20?'rgba(76,41,14,.42)':'rgba(255,231,179,.055)';
  ctx.lineWidth=thread===0||thread===20?.6:.25;ctx.stroke();
 }
 ctx.restore();
}
function drawRibbon(ms) {
 ribbonTime=ms;
 const {front,pull}=geometry(ms);
 const frontPoints=sample(front,'front',ms),pullPoints=sample(pull,'pull',ms);
 ribbonContext.setTransform(ribbonScale,0,0,ribbonScale,0,0);
 ribbonContext.clearRect(0,0,600,490);
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
new ResizeObserver(sizeRibbon).observe(stage);
function finish() {
 drawRibbon(DURATION); stage.classList.add('is-open');
 songLink.setAttribute('tabindex','0'); replayButton.disabled=false;
 status.textContent='For you. A Christmas classic, with love.';
 if(keyboardOpening) songLink.focus({preventScroll:true});
}
function tick(now) {
 const elapsed=now-started; drawRibbon(elapsed);
 if(elapsed<DURATION) frame=requestAnimationFrame(tick); else finish();
}
function openGift() {
 if(running) return;
 keyboardOpening=openButton.matches(':focus-visible'); running=true;
 replayButton.disabled=true; openButton.disabled=true;
 status.textContent='Unwrapping a little Christmas magic…';
 stage.classList.add('is-opening'); started=performance.now();
 if(reducedMotion.matches) finish(); else frame=requestAnimationFrame(tick);
}
function replay() {
 cancelAnimationFrame(frame); stage.classList.remove('is-opening','is-open');
 drawRibbon(0); songLink.setAttribute('tabindex','-1'); replayButton.disabled=true;
 running=false; void stage.getBoundingClientRect(); openGift();
}
reducedMotion.addEventListener('change',()=>{
 if(running&&reducedMotion.matches) {cancelAnimationFrame(frame);finish();}
});
openButton.addEventListener('click',openGift);
replayButton.addEventListener('click',replay);
drawRibbon(0);
