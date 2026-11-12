'use strict';
// Recorded, local foley. See assets/audio/LICENSES.md for sources and edits.
// Audio is optional: no failed decode/resume can hold up the animation.
window.ChimeSound=(()=>{
 let context=null,master=null,decoded=null,generation=0;
 const voices=new Set();
 // These local assets are short PCM WAVs. Read their samples without opening
 // an audio device, so the first tap need not wait for an asynchronous codec.
 // Only prepare() creates/resumes a playback context, inside the user gesture.
 const pcm=(()=>{
  try{return Object.entries(window.CHIME_SOUND_SAMPLES||{}).map(([name,b64])=>{
   const bytes=Uint8Array.from(atob(b64),c=>c.charCodeAt(0)),view=new DataView(bytes.buffer);
   if(view.getUint32(0)!==0x52494646||view.getUint32(8)!==0x57415645||view.getUint16(20,true)!==1||view.getUint16(22,true)!==1||view.getUint16(34,true)!==16||view.getUint32(36)!==0x64617461)throw Error('Unsupported PCM asset');
   const length=view.getUint32(40,true)/2,rate=view.getUint32(24,true),data=new Float32Array(length);
   for(let i=0;i<length;i++)data[i]=view.getInt16(44+i*2,true)/32768;
   return [name,rate,data];
  })}catch{return null}
 })();
 const variants={
  satin:{sample:'slide',rate:1,lowpass:6200,highpass:90,gain:.24},
  silk:{sample:'slide',rate:1.03,lowpass:6500,highpass:110,gain:.22},
  velvet:{sample:'slide',rate:.93,lowpass:2400,highpass:75,gain:.20},
  organza:{sample:'fall',rate:1.05,lowpass:7800,highpass:190,gain:.20},
  woven:{sample:'dry',rate:.98,lowpass:5000,highpass:100,gain:.22},
  grosgrain:{sample:'dry',rate:1,lowpass:5600,highpass:120,gain:.22},
  linen:{sample:'dry',rate:.96,lowpass:4300,highpass:95,gain:.22},
  twine:{sample:'dry',rate:.94,lowpass:3600,highpass:140,gain:.20}
 };
 function stop(){
  generation++;
  if(!context)return;
  const now=context.currentTime;
  for(const voice of voices){
   if(voice.cancelled)continue;
   voice.cancelled=true;
   // Per-voice fades also silence future scheduled sources. A new opening has
   // its own gains, so cancelling the previous gift cannot mute the new one.
   const elapsed=now-voice.start;
   const held=elapsed<0?0:elapsed<voice.attack?voice.level*elapsed/voice.attack:elapsed>voice.duration-voice.fade?voice.level*Math.max(0,(voice.duration-elapsed)/voice.fade):voice.level;
   voice.gain.gain.cancelScheduledValues(now);
   voice.gain.gain.setValueAtTime(held,now);
   voice.gain.gain.linearRampToValueAtTime(0,now+.045);
   try{voice.source.stop(now+.065)}catch{/* already ended */}
  }
 }
 function prepare(){
  if(!context){
   const Audio=window.AudioContext||window.webkitAudioContext;
   if(!Audio||!pcm||pcm.length!==5)return Promise.resolve(null);
   context=new Audio({latencyHint:'interactive'});
   master=context.createGain();master.gain.value=.8;master.connect(context.destination);
  }
  // Called synchronously inside the unwrap event before any await. The quiet
  // one-frame source also unlocks output on older mobile WebKit versions.
  const resume=context.state==='running'?Promise.resolve():context.resume();
  const unlock=context.createBufferSource();unlock.buffer=context.createBuffer(1,1,context.sampleRate);unlock.connect(master);unlock.start();unlock.onended=()=>unlock.disconnect();
  if(!decoded)decoded=Promise.resolve(Object.fromEntries(pcm.map(([name,rate,data])=>{
   const buffer=context.createBuffer(1,data.length,rate);buffer.getChannelData(0).set(data);return [name,buffer];
  }))).then(async buffers=>{
   // Decode the supplied recording unchanged; retain the other foley even if
   // this optional MP3 cannot be decoded by the browser.
   try{
    const bytes=Uint8Array.from(atob(window.CHIME_REVEAL_SAMPLE),c=>c.charCodeAt(0));
    buffers.reveal=await context.decodeAudioData(bytes.buffer);
   }catch{/* unavailable signature sound does not block the other effects */}
   return buffers;
  });
  return Promise.all([resume,decoded]).then(([,buffers])=>context.state==='running'?buffers:null);
 }
 function play(buffers,cue,epoch){
  const now=context.currentTime,when=epoch+cue.at/1000;
  // Do not bunch late effects together after a slow decode or a background tab.
  if(when<now-.12)return;
  const source=context.createBufferSource(),gain=context.createGain();
  source.buffer=buffers[cue.sample];if(!source.buffer)return;
  source.playbackRate.value=cue.rate||1;
  const high=context.createBiquadFilter(),low=context.createBiquadFilter();
  high.type='highpass';high.frequency.value=cue.highpass||65;high.Q.value=.5;
  low.type='lowpass';low.frequency.value=cue.lowpass||8000;low.Q.value=.5;
  const signature=cue.sample==='reveal';
  if(signature)source.connect(gain);
  else {source.connect(high);high.connect(low);low.connect(gain);}
  gain.connect(master);
  const start=Math.max(now+.005,when),duration=Math.min(cue.duration??Infinity,source.buffer.duration/source.playbackRate.value);
  const attack=signature?0:Math.min(.025,duration*.15),fade=signature?0:Math.min(.11,duration*.3);
  gain.gain.setValueAtTime(0,start);
  gain.gain.linearRampToValueAtTime(cue.gain,start+attack);
  gain.gain.setValueAtTime(cue.gain,Math.max(start+attack,start+duration-fade));
  gain.gain.linearRampToValueAtTime(0,start+duration);
  const voice={source,gain,cancelled:false,start,duration,attack,fade,level:cue.gain};voices.add(voice);
  source.onended=()=>{source.disconnect();high.disconnect();low.disconnect();gain.disconnect();voices.delete(voice)};
  source.start(start);source.stop(start+duration+.015);
  if(signature)window.dispatchEvent(new CustomEvent('chime-reveal-cue',{detail:{start:performance.now()+(start-now)*1000,duration:duration*1000}}));
 }
 function cuesFor(options){
  if(options.reduced)return [{at:30,sample:'reveal',gain:.24}];
  const v=variants[options.material]||variants.satin;
  const cloth=(at,duration,fall=false,scale=1)=>({at,duration,sample:fall?'fall':v.sample,rate:v.rate,lowpass:v.lowpass,highpass:v.highpass,gain:v.gain*scale});
  const cues=[cloth(380,.80)];
  if(options.arranged){
   cues.push(cloth(1250,.50,false,.75));
   if(options.loopEnd>2700)cues.push(cloth(2150,.65,false,.65));
   if(options.loopEnd>3500)cues.push(cloth(options.loopEnd-520,.50,false,.55));
   cues.push(cloth(options.slide,.72,true,.75),cloth(options.edge-120,.65,true,.55));
  }else cues.push(cloth(1450,.78,false,.7),cloth(2800,.72,true,.75));
  cues.push({at:options.lid,sample:'lid',duration:.50,gain:.48,lowpass:4200,highpass:90});
  cues.push({at:options.lid+250,sample:'reveal',gain:.24});
  return cues;
 }
 function begin(options,started){
  stop();const token=generation;
  try{
   return prepare().then(buffers=>{
    if(!buffers||token!==generation||document.hidden)return false;
    const visualStart=typeof started==='function'?started():started;
    const epoch=context.currentTime-(performance.now()-visualStart)/1000;
    cuesFor(options).forEach(cue=>play(buffers,cue,epoch));return true;
   }).catch(()=>false);
  }catch{return Promise.resolve(false)}
 }
 function reduce(){
  stop();
  if(!context||context.state!=='running'||!decoded)return;
  const token=generation;
  decoded.then(buffers=>{if(buffers&&token===generation)play(buffers,{at:15,sample:'reveal',gain:.24},context.currentTime)}).catch(()=>{});
 }
 document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
 return Object.freeze({begin,stop,reduce});
})();
