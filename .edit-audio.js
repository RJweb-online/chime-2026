(async()=>{
 const c=new OfflineAudioContext(1,1,22050),decoded={};
 for(const [name,b64] of Object.entries(sources))decoded[name]=await c.decodeAudioData(Uint8Array.from(atob(b64),v=>v.charCodeAt(0)).buffer);
 const clips={slide:['fabric',.7,1.05,.6],fall:['fabric',11.35,.9,.6],dry:['fabric',13.13,1.1,.6],lid:['lid',1.05,.56,.4],chime:['bell',.015,1.15,.5]};
 const result={};
 for(const [name,[from,start,duration,target]] of Object.entries(clips)){
  const buffer=decoded[from],n=Math.round(duration*22050),data=new Float32Array(n);
  for(let i=0;i<n;i++){const at=Math.round(start*22050)+i;for(let ch=0;ch<buffer.numberOfChannels;ch++)data[i]+=(buffer.getChannelData(ch)[at]||0)/buffer.numberOfChannels}
  let mean=data.reduce((a,b)=>a+b,0)/n,peak=0;
  for(let i=0;i<n;i++){const fadeIn=name==='chime'?.004:.016,fadeOut=name==='lid'?.14:name==='chime'?.15:.06;const envelope=Math.min(1,i/(fadeIn*22050),(n-1-i)/(fadeOut*22050));data[i]=(data[i]-mean)*(.5-.5*Math.cos(Math.PI*Math.max(0,envelope)));peak=Math.max(peak,Math.abs(data[i]))}
  const wav=new ArrayBuffer(44+n*2),view=new DataView(wav);const str=(at,s)=>[...s].forEach((v,i)=>view.setUint8(at+i,v.charCodeAt(0)));
  str(0,'RIFF');view.setUint32(4,36+n*2,true);str(8,'WAVE');str(12,'fmt ');view.setUint32(16,16,true);view.setUint16(20,1,true);view.setUint16(22,1,true);view.setUint32(24,22050,true);view.setUint32(28,44100,true);view.setUint16(32,2,true);view.setUint16(34,16,true);str(36,'data');view.setUint32(40,n*2,true);
  let energy=0;for(let i=0;i<n;i++){const v=data[i]*target/peak;energy+=v*v;view.setInt16(44+i*2,Math.round(Math.max(-1,Math.min(1,v))*32767),true)}
  const bytes=new Uint8Array(wav);let binary='';for(let i=0;i<bytes.length;i+=8192)binary+=String.fromCharCode(...bytes.subarray(i,i+8192));
  result[name]={base64:btoa(binary),duration,peak:target,rms:Math.sqrt(energy/n),source:from,start};
 }
 return JSON.stringify(result);
})()