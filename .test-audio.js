(async()=>{
 const results=[],check=(label,ok)=>results.push((ok?'PASS ':'FAIL ')+label),log=[],contexts=[];
 const Native=window.AudioContext,connect=AudioNode.prototype.connect,start=AudioBufferSourceNode.prototype.start,stop=AudioBufferSourceNode.prototype.stop;
 const muted=new Map();
 window.AudioContext=function(...args){const c=new Native(...args),mute=c.createGain();mute.gain.value=0;connect.call(mute,c.destination);muted.set(c.destination,mute);contexts.push(c);return c};
 AudioNode.prototype.connect=function(dest,...args){return connect.call(this,muted.get(dest)||dest,...args)};
 AudioBufferSourceNode.prototype.start=function(when,...args){const record={node:this,when,duration:this.buffer?.duration,rate:this.playbackRate.value,stops:[]};log.push(record);return start.call(this,when,...args)};
 AudioBufferSourceNode.prototype.stop=function(when){const r=log.find(x=>x.node===this);if(r)r.stops.push(when);return stop.call(this,when)};
 check('audio remains uninitialised before unwrap',contexts.length===0);
 selectDesign('oval');openButton.click();await new Promise(r=>setTimeout(r,250));
 let real=log.filter(r=>r.duration>.01);check('gesture initialises running audio',contexts.length===1&&contexts[0].state==='running');
 check('recorded foley scheduled',real.length>=6);
 check('lid and chime use recorded buffers',real.some(r=>Math.abs(r.duration-.56)<.005)&&real.some(r=>Math.abs(r.duration-1.15)<.005));
 const lidCue=real.find(r=>Math.abs(r.duration-.56)<.005),chimeCue=real.find(r=>Math.abs(r.duration-1.15)<.005);
 check('reveal chime follows lid by 1.05 seconds',lidCue&&chimeCue&&Math.abs(chimeCue.when-lidCue.when-1.05)<.01);
 replayButton.click();check('reset cancels scheduled foley',real.every(r=>r.stops.length>=2));
 for(const key of Object.keys(designs)){
  selectDesign(key);const before=log.length;openButton.click();await new Promise(r=>setTimeout(r,20));
  const voices=log.slice(before).filter(r=>r.duration>.01);check(key+' sound cues',voices.length>=4);
  selectDesign('crimson');check(key+' switching fades previous cues',voices.every(r=>r.stops.length>=2));
 }
 const before=log.length;const ok=await ChimeSound.begin({material:'silk',reduced:true,lid:3600},performance.now());
 const reduced=log.slice(before).filter(r=>r.duration>.01);check('reduced motion plays only immediate chime',ok&&reduced.length===1&&Math.abs(reduced[0].duration-1.15)<.005);
 ChimeSound.stop();check('single reusable AudioContext',contexts.length===1);
 AudioNode.prototype.connect=connect;AudioBufferSourceNode.prototype.start=start;AudioBufferSourceNode.prototype.stop=stop;
 return JSON.stringify({checks:results,scheduled:real.map(r=>({duration:+r.duration.toFixed(3),when:+r.when.toFixed(3),rate:r.rate})),sampleBytes:Object.values(CHIME_SOUND_SAMPLES).reduce((n,v)=>n+atob(v).length,0)});
})()