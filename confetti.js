'use strict';
// One small overlay, no idle frames, and no particles in comparison snapshots.
window.ChimeConfetti=(()=>{
 const stage=document.getElementById('stage');
 const canvas=document.createElement('canvas');
 canvas.className='reveal-confetti';canvas.setAttribute('aria-hidden','true');
 stage.append(canvas);
 const ctx=canvas.getContext('2d');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const phone=matchMedia('(max-width:540px)');
 const colors=['#d6bb79','#eee2c6','#a76b69','#54755d','#c9b890'];
 const champagne=['#e3bd6e','#f2d799'];
 const christmasColors=['#b44b5c','#f6edd7'];
 let frame=0,timer=0,particles=[],cue=null;
 function reset(){
  clearTimeout(timer);cancelAnimationFrame(frame);timer=frame=0;
  particles=[];cue=null;ctx.clearRect(0,0,canvas.width,canvas.height);
 }
 function draw(now){
  const elapsed=now-cue.start,u=Math.max(0,elapsed/cue.duration);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(reduced.matches||document.hidden){reset();return;}
  // Completion belongs to the last particle, including its fade, rather
  // than a second timer in the card UI. Cancellation never completes a burst.
  if(particles.every(p=>u>=p.end)){
   reset();window.dispatchEvent(new Event('chime-confetti-complete'));return;
  }
  const scale=canvas.width/cue.width;ctx.setTransform(scale,0,0,scale,0,0);
  for(const p of particles){
   const t=Math.max(0,(u-p.delay)/(p.end-p.delay));
   if(u<p.delay||t>=1)continue;
   // A brief lift relaxes into the approved long, slow fall.
   const lift=1-Math.exp(-t*23),fall=Math.pow(t,p.fall);
   const float=Math.sin(Math.min(1,t*3)*Math.PI/2);
   const x=cue.x+p.x+p.spread*lift+Math.sin(t*p.waft+p.phase)*p.sway*float;
   const y=cue.y-p.lift*lift+(p.lift+140)*fall+Math.sin(t*p.waft*1.3+p.phase)*7*float;
   ctx.save();ctx.translate(x,y);ctx.rotate(p.phase+t*p.turn);
   if(phone.matches)ctx.scale(1.9,1.9);
   const fade=Math.min(1,(1-t)/p.fade);
   ctx.globalAlpha=.9*Math.min(1,t*32)*fade*fade*(3-2*fade);
   ctx.fillStyle=p.color;
   if(p.shape===0){ctx.beginPath();ctx.arc(0,0,2,0,Math.PI*2);ctx.fill();}
   else if(p.shape===1){ctx.scale(Math.max(.35,Math.abs(Math.cos(t*p.waft+p.phase))),1);ctx.fillRect(-2,-3.5,4,7);}
   else {
    // Finale stars keep their legible screen size as the reveal area changes.
    const star=p.shape===3,points=star?10:8;
    ctx.beginPath();for(let i=0;i<points;i++){
     const radius=star?cue.starRadius:3.8;
     const a=star?i*Math.PI/5-Math.PI/2:i*Math.PI/4,r=i%2?(star?radius*.44:1.2):radius;
     ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);
    }ctx.closePath();ctx.fill();
   }
   ctx.restore();
  }
  frame=requestAnimationFrame(draw);
 }
 function schedule({start,duration}){
  reset();if(reduced.matches||document.hidden)return;
  const christmasDay=stage.dataset.design==='christmasDay';
  const bounds=stage.getBoundingClientRect(),lid=stage.querySelector('.box-lid').getBoundingClientRect();
  const area=christmasDay?(stage.closest('.reveal-stage')||stage).getBoundingClientRect():bounds;
  const unit=600/(bounds.width||600),width=christmasDay?area.width*unit:600,height=christmasDay?area.height*unit:490;
  canvas.style.width=christmasDay?`${area.width}px`:'100%';
  canvas.style.height=christmasDay?`${area.height}px`:'100%';
  canvas.style.left=christmasDay?`${area.left-bounds.left}px`:'0px';
  canvas.style.top=christmasDay?`${area.top-bounds.top}px`:'0px';
  canvas.style.right='auto';canvas.style.bottom='auto';
  const mouth=stage.querySelector('.box-body').getBoundingClientRect();
  cue={start,duration:Math.max(1,duration),width,
   x:christmasDay?(bounds.left+bounds.width/2-area.left)*unit:(lid.left+lid.width/2-bounds.left)*unit,
   y:christmasDay?(mouth.top+mouth.height*.12-area.top)*unit:(lid.top+lid.height*.55-bounds.top)*unit,
   starRadius:(phone.matches?12:19)*unit/(phone.matches?1.9:1)};
  const ratio=Math.min(2,devicePixelRatio||1);
  canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);
  // The finale uses the visible reveal area, with stars sized in screen pixels.
  // All gifts retain the same gentle fall, fade and last-particle completion.
  const count=christmasDay?(phone.matches?90:288):28;
  const reach=Math.max(100,width*.47-26*unit);
  const starEvery=phone.matches?10:12;
  const headroom=Math.max(0,cue.y-24*unit);
  particles=Array.from({length:count},(_,i)=>({
   x:Math.sin(i*2.4)*24,
   spread:christmasDay?(((i*37)%count)/(count-1)*2-1)*reach:Math.sin(i*4.1)*132,
   lift:christmasDay?(phone.matches?Math.min(headroom,130+(i*19%80)):headroom*(.52+.48*((i*53)%count)/(count-1))):70+(i*19%61),
   delay:(i%5)*.009,phase:i*2.399,
   sway:16+i%11,waft:6+(i%5)*.65,fall:1.8+(i%4)*.18,
   // A few finale pieces linger 1.8s into the Christmas recording.
   end:.91+(i%7)*.015+(christmasDay&&i%4===0?1800/cue.duration:0),fade:.18+(i%4)*.025,
   turn:(i%2?1:-1)*(2+i%4),
   shape:christmasDay?(i%starEvery===0?3:i%3===0?0:1):(i%11===0?2:i%3===0?0:1),
   color:christmasDay?(i%starEvery===0?champagne[(i/starEvery)%champagne.length]:christmasColors[i%christmasColors.length]):colors[i%colors.length]
  }));
  timer=setTimeout(()=>{frame=requestAnimationFrame(draw);},Math.max(0,start-performance.now()));
 }
 window.addEventListener('chime-reveal-cue',event=>schedule(event.detail));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 reduced.addEventListener('change',()=>{if(reduced.matches)reset();});
 return Object.freeze({schedule,reset,get active(){return cue!==null;}});
})();
