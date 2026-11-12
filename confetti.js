'use strict';
// One small overlay, no idle frames, and no particles in comparison snapshots.
window.ChimeConfetti=(()=>{
 const stage=document.getElementById('stage');
 const canvas=document.createElement('canvas');
 canvas.className='reveal-confetti';canvas.setAttribute('aria-hidden','true');
 stage.append(canvas);
 const ctx=canvas.getContext('2d');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');
 const colors=['#d6bb79','#eee2c6','#a76b69','#54755d','#c9b890'];
 let frame=0,timer=0,particles=[],cue=null;
 function reset(){
  clearTimeout(timer);cancelAnimationFrame(frame);timer=frame=0;
  particles=[];cue=null;ctx.clearRect(0,0,canvas.width,canvas.height);
 }
 function draw(now){
  const elapsed=now-cue.start,u=Math.max(0,elapsed/cue.duration);
  ctx.clearRect(0,0,canvas.width,canvas.height);
  if(u>=1||reduced.matches||document.hidden){reset();return;}
  const scale=canvas.width/600;ctx.setTransform(scale,0,0,scale,0,0);
  for(const p of particles){
   const t=Math.max(0,(u-p.delay)/(p.end-p.delay));
   if(u<p.delay||t>=1)continue;
   // A brief lift relaxes into a long, slow fall. Drift remains near the box.
   const lift=1-Math.exp(-t*23),fall=Math.pow(t,p.fall);
   const float=Math.sin(Math.min(1,t*3)*Math.PI/2);
   const x=cue.x+p.x+p.spread*lift+Math.sin(t*p.waft+p.phase)*p.sway*float;
   const y=cue.y-p.lift*lift+(p.lift+140)*fall+Math.sin(t*p.waft*1.3+p.phase)*7*float;
   ctx.save();ctx.translate(x,y);ctx.rotate(p.phase+t*p.turn);
   const fade=Math.min(1,(1-t)/p.fade);
   ctx.globalAlpha=.9*Math.min(1,t*32)*fade*fade*(3-2*fade);
   ctx.fillStyle=p.color;
   if(p.shape===0){ctx.beginPath();ctx.arc(0,0,2,0,Math.PI*2);ctx.fill();}
   else if(p.shape===1){ctx.scale(Math.max(.35,Math.abs(Math.cos(t*p.waft+p.phase))),1);ctx.fillRect(-2,-3.5,4,7);}
   else {ctx.beginPath();for(let i=0;i<8;i++){const a=i*Math.PI/4,r=i%2?1.2:3.8;ctx.lineTo(Math.cos(a)*r,Math.sin(a)*r);}ctx.closePath();ctx.fill();}
   ctx.restore();
  }
  frame=requestAnimationFrame(draw);
 }
 function schedule({start,duration}){
  reset();if(reduced.matches||document.hidden)return;
  const bounds=stage.getBoundingClientRect(),lid=stage.querySelector('.box-lid').getBoundingClientRect();
  const unit=600/(bounds.width||600);
  cue={start,duration:Math.max(1,duration),x:(lid.left+lid.width/2-bounds.left)*unit,y:(lid.top+lid.height*.55-bounds.top)*unit};
  const ratio=Math.min(2,devicePixelRatio||1);
  canvas.width=Math.round(600*ratio);canvas.height=Math.round(490*ratio);
  // Deterministic variety gives every replay the same restrained flourish.
  particles=Array.from({length:28},(_,i)=>({
   x:Math.sin(i*2.4)*24,spread:Math.sin(i*4.1)*132,
   lift:70+(i*19%61),delay:(i%5)*.009,phase:i*2.399,
   sway:16+i%11,waft:6+(i%5)*.65,fall:1.8+(i%4)*.18,
   end:.91+(i%7)*.015,fade:.18+(i%4)*.025,
   turn:(i%2?1:-1)*(2+i%4),shape:i%11===0?2:i%3===0?0:1,color:colors[i%colors.length]
  }));
  timer=setTimeout(()=>{frame=requestAnimationFrame(draw);},Math.max(0,start-performance.now()));
 }
 window.addEventListener('chime-reveal-cue',event=>schedule(event.detail));
 document.addEventListener('visibilitychange',()=>{if(document.hidden)reset();});
 reduced.addEventListener('change',()=>{if(reduced.matches)reset();});
 return Object.freeze({schedule,reset});
})();
