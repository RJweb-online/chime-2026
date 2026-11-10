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
 [327,195,369,192,369,212,17], [369,233,326,242,302,239,17],
 [317,244,316,225,301,228,18], [285,229,288,248,300,245,18],
 [286,249,275,279,264,295,22]];
const pullTied = [[300,223,40], [300,227,300,233,299,238,18],
 [271,199,231,196,231,214,17], [231,235,276,243,302,239,17],
 [322,246,336,267,344,285,22]];
const pullTaut = [[300,223,40], [300,227,300,233,299,238,17],
 [273,199,235,198,235,214,16], [235,235,277,242,302,239,15],
 [329,242,352,252,371,262,18]];
const pullCollapsed = [[300,223,40], [300,227,300,233,299,238,17],
 [291,229,281,226,282,234,12], [283,242,294,241,304,239,14],
 [357,238,411,250,466,265,20]];
const pullFree = [[300,223,40], [300,227,302,232,307,236,20],
 [314,239,324,240,335,241,18], [351,241,368,241,385,243,18],
 [417,246,447,256,471,265,21]];
// The collar opens into a visible C, then straightens into the released end.
const frontLoose = [[300,414,42], [300,356,300,285,300,241,19],
 [326,197,367,193,367,214,17], [367,235,329,246,309,240,17],
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
const NS='http://www.w3.org/2000/svg';
function surface(id) {
 const group=document.getElementById(id);
 return ['base','sheen','selvedge','edge'].map((name,i)=>{
  const path=document.createElementNS(NS,'path');
  path.setAttribute('fill',['url(#loop)','#fff1bc','#f5dda3','none'][i]);
  if(i===1) path.setAttribute('opacity','.38');
  if(i===2) path.setAttribute('opacity','.65');
  if(i===3) {path.setAttribute('stroke','#705025');path.setAttribute('stroke-width','.65');}
  path.dataset.surface=name; group.append(path); return path;
 });
}
const frontSurface=surface('ribbon-front'), pullSurface=surface('ribbon-pull');
const crossingSurface=surface('ribbon-crossing');
function sample(rows) {
 const points=[];
 let [x,y,width]=rows[0];
 rows.slice(1).forEach((row,segment)=>{
  const [ax,ay,bx,by,ex,ey,ew]=row;
  for(let i=segment?1:0;i<=18;i++) {
   const t=i/18,s=1-t;
   const dx=3*s*s*(ax-x)+6*s*t*(bx-ax)+3*t*t*(ex-bx);
   const dy=3*s*s*(ay-y)+6*s*t*(by-ay)+3*t*t*(ey-by);
   const length=Math.hypot(dx,dy)||1;
   points.push({x:s*s*s*x+3*s*s*t*ax+3*s*t*t*bx+t*t*t*ex,
    y:s*s*s*y+3*s*s*t*ay+3*s*t*t*by+t*t*t*ey,
    nx:-dy/length,ny:dx/length,width:mix(width,ew,ease(t)),segment});
  }
  [x,y,width]=[ex,ey,ew];
 });
 return points;
}
function outline(points,low,high) {
 const edge=(p,o)=>`${(p.x+p.nx*p.width*o).toFixed(2)},${(p.y+p.ny*p.width*o).toFixed(2)}`;
 return `M${points.map(p=>edge(p,low)).join('L')}L${points.slice().reverse().map(p=>edge(p,high)).join('L')}Z`;
}
function paint(paths,points) {
 const body=outline(points,-.5,.5);
 paths[0].setAttribute('d',body);
 paths[1].setAttribute('d',outline(points,-.29,-.08));
 paths[2].setAttribute('d',outline(points,.43,.46));
 paths[3].setAttribute('d',body);
}
function drawRibbon(ms) {
 const {front,pull}=geometry(ms), frontPoints=sample(front);
 paint(frontSurface,frontPoints); paint(pullSurface,sample(pull));
 // Repaint the same collar material OVER the pulled strand's underpass.
 // This is the opening knot, not a separate piece that shrinks or fades.
 paint(crossingSurface,frontPoints.filter(p=>p.segment>=3));
 stage.dataset.phase=ms<830?'tension':ms<1530?'first-loop':ms<1900?'knot-opening':ms<2800?'last-loop':ms<3570?'ribbon-slipping':'reveal';
}
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
