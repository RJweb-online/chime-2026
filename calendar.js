'use strict';
// Calendar data is independent of the twelve approved present renderers.
// Temporary day assignments reuse the approved collection in its original order.
const approvedPresentOrder=['crimson','ivory','midnight','plum','kraft','emerald','book','frost','copper','rose','citrus','oval'];
const calendarDays=Array.from({length:25},(_,index)=>({
 day:index+1,design:approvedPresentOrder[index]||null
}));
(()=>{
 const main=document.querySelector('main'),source=document.querySelector('.design-picker');
 const wrapped=new Map([...source.querySelectorAll('button')].map(button=>[button.dataset.design,{
  image:button.querySelector('img').src,name:button.querySelector('b').textContent.replace(/^\d+ · /,'')
 }]));
 const opened=new Map();let activeDay=null,returnTarget=null;
 // Include home-network addresses so phone previews get the same local controls.
 const privateIPv4=/^(?:10\.\d{1,3}|192\.168|172\.(?:1[6-9]|2\d|3[01]))(?:\.\d{1,3}){2}$/;
 const local=['localhost','127.0.0.1','[::1]'].includes(location.hostname)||privateIPv4.test(location.hostname);
 // TEMPORARY LOCAL UNLOCK: set to false before publishing to restore date checks locally.
 const temporarilyUnlockLocalDecember1=true;
 const requestedPreview=new URLSearchParams(location.search).get('preview');
 const preview=local&&['locked','unlocked'].includes(requestedPreview)?requestedPreview:null;
 const unlockAt=Date.parse('2026-12-01T00:00:00+09:00');
 const unlocked=()=>preview!=='locked'&&(preview==='unlocked'||(local&&temporarilyUnlockLocalDecember1)||Date.now()>=unlockAt);
 const storageKey=preview?'chime:2026:december-1:preview':'chime:2026:december-1:opened';
 let saved=false,storageAvailable=true;
 try{saved=localStorage.getItem(storageKey)==='opened';}catch{storageAvailable=false;}
 function saveOpened(value){
  saved=value;
  try{if(value)localStorage.setItem(storageKey,'opened');else localStorage.removeItem(storageKey);}
  catch{storageAvailable=false;}
 }
 let songUrl='',songState='loading';
 function songAction(){
  return songUrl?`<a class="watch-youtube" href="${songUrl.replaceAll('&','&amp;').replaceAll('"','&quot;')}" target="_blank" rel="noopener noreferrer">Watch on YouTube <span aria-hidden="true">↗</span></a>`:`<p class="song-pending" role="status">${songState==='loading'?'Loading your December 1 song…':'Your song couldn’t load. Please reload to try again.'}</p>`;
 }
 document.body.classList.add('calendar-page');
 document.querySelector('.edition').textContent='AN ADVENT OF LITTLE WONDERS';
 document.querySelector('.eyebrow').textContent='DECEMBER 1–25 · A LITTLE WONDER EVERY DAY';
 document.querySelector('.intro').textContent='Twenty-five little moments. Yours to unwrap.';
 document.querySelector('footer').innerHTML='<span>CHIME 2026 · DECEMBER 1</span><span>Made for a little Christmas wonder.</span>';
 source.hidden=true;source.classList.add('calendar-source');
 document.querySelectorAll('.preview-jump').forEach(link=>link.remove());
 const section=document.createElement('section');section.className='calendar';
 section.setAttribute('aria-label','December Advent calendar');
 section.innerHTML='<div class="calendar-heading"><span>DECEMBER <b>2026</b></span><span id="calendar-progress" role="status">December 1</span></div><div class="calendar-grid"></div><div class="calendar-tools"><p><strong id="unlock-status"></strong> <span>Days 1–12: approved presents. Only December 1 opens in this preview. Days 13–25: designs to come.</span></p></div>';
 main.insertBefore(section,source);
 if(local){
  const tools=document.createElement('nav');tools.className='local-preview';tools.setAttribute('aria-label','Local preview controls');
  tools.innerHTML=`<strong>Local preview: ${preview||(temporarilyUnlockLocalDecember1?'date lock temporarily off':'real date')}</strong><a href="?preview=locked">Locked</a><a href="?preview=unlocked">Unlocked</a><a href="?">Calendar</a><button type="button">Reset this opening</button>`;
  section.before(tools);
  tools.querySelector('button').addEventListener('click',()=>{saveOpened(false);location.reload();});
 }
 const grid=section.querySelector('.calendar-grid');
 const dialog=document.createElement('dialog');dialog.className='present-dialog';
 dialog.setAttribute('aria-labelledby','day-title');
 dialog.innerHTML='<div class="dialog-top"><button type="button" class="return-calendar" autofocus>← Calendar</button><span id="day-date"></span></div><h2 id="day-title"></h2><div class="live-present"></div><div class="future-present" hidden><div class="future-emblem" aria-hidden="true">✧</div><p>A little wonder in the making.</p><small>This day is ready for a future present design.</small><button type="button" class="placeholder-toggle">Mark as opened</button></div><div class="prototype-controls"><button type="button" class="preview-opened">Preview opened state</button><span>Local preview · December 1</span></div>';
 document.body.append(dialog);
 const live=dialog.querySelector('.live-present'),future=dialog.querySelector('.future-present');
 // Review copy stays in normal flow, outside the gift/card positioning area.
 // Removing either prototype label therefore leaves no reserved space.
 const designNote=document.getElementById('design-note');
 if(designNote)live.before(designNote);
 live.append(stage,document.querySelector('.under-gift'));
 // The SVG card keeps its authored rise. After the confetti, its final pose
 // hands off to one readable card with the song link attached to its face.
 const phone=matchMedia('(max-width:540px)');
 const readable=document.createElement('article');readable.className='readable-card';readable.hidden=true;
 readable.setAttribute('aria-label','Your daily song');
 readable.innerHTML='<p class="reveal-kicker">A LITTLE MOMENT OF WONDER</p><h3>Your December 1 song</h3><p class="reveal-artist">CHIME 2026 · December 1</p><div class="card-song"></div><p class="reveal-caption">THE MAGIC IS IN THE MAKING</p>';
 live.append(readable);
 const cardSong=readable.querySelector('.card-song');
 cardSong.innerHTML=songAction();
 window.ChimeDecember1Song.load().then(url=>{
  songUrl=url;songState='ready';cardSong.innerHTML=songAction();
  if(stage.classList.contains('is-open'))status.textContent='Your December 1 song is ready.';
 }).catch(error=>{
  songState='error';cardSong.innerHTML=songAction();
  console.warn('CHIME December 1:',error.message);
 });
 stage.querySelector('.card-title').textContent='Your December 1 song';
 stage.querySelector('.card-artist').textContent='CHIME 2026 · December 1';
 document.getElementById('gift-desc').textContent='The bow unties, the ribbon slips away, and the lid lifts to reveal your December 1 song.';
 openButton.setAttribute('aria-label','Unwrap your December 1 present');
 openButton.querySelector('span').innerHTML='Tap to unwrap <span aria-hidden="true">↗</span>';
 replayButton.hidden=!local;
 dialog.querySelector('.prototype-controls').hidden=!local;
 let cardAnimation=null,instantCard=false;
 function clearCard(){
  cardAnimation?.cancel();cardAnimation=null;readable.hidden=true;
  live.classList.remove('has-readable-card');
 }
 function showCard(animate){
  if(!dialog.open||!activeDay?.design||!readable.hidden)return;
  const start=stage.querySelector('.song-card').getBoundingClientRect();
  readable.hidden=false;
  const end=readable.getBoundingClientRect();
  live.classList.add('has-readable-card');
  if(animate&&!reducedMotion.matches){
   cardAnimation=readable.animate([
    {transform:`translate(${start.left-end.left}px,${start.top-end.top}px) scale(${start.width/end.width},${start.height/end.height})`},
    {transform:'translate(0,0) scale(1)'}
   ],{duration:650,easing:'cubic-bezier(.22,.7,.25,1)'});
  }
 }
 function mobileLayout(){
  document.querySelector('.gift').setAttribute('viewBox',phone.matches?'30 35 540 455':'0 0 600 490');
  sizeRibbon();clearCard();
  if(stage.classList.contains('is-open')&&!window.ChimeConfetti?.active)showCard(false);
 }
 phone.addEventListener('change',mobileLayout);
 reducedMotion.addEventListener('change',()=>{
  if(reducedMotion.matches){
   cardAnimation?.finish();
   if(stage.classList.contains('is-open'))showCard(false);
  }
 });
 window.addEventListener('chime-confetti-complete',()=>{
  if(stage.classList.contains('is-open'))showCard(true);
 });
 document.addEventListener('visibilitychange',()=>{
  if(!document.hidden&&stage.classList.contains('is-open')&&!window.ChimeConfetti?.active)showCard(false);
 });
 mobileLayout();
 function update(day){
  const button=grid.querySelector(`[data-day="${day.day}"]`),isOpen=opened.has(day.day);
  button.classList.toggle('day-opened',isOpen);
  const name=day.design?wrapped.get(day.design).name:'Coming later';
  const locked=day.day===1&&!unlocked();
  button.disabled=day.day!==1||locked;
  button.setAttribute('aria-label',`December ${day.day}, ${name}, ${isOpen?'opened':'wrapped'}${locked?', locked until December 1 at midnight Japan time':day.day===1?'':day.design?', reveal coming later':', design coming later'}`);
  const image=button.querySelector('img');if(image)image.src=isOpen?opened.get(day.day):wrapped.get(day.design).image;
  button.querySelector('.day-state').textContent=locked?'Locked':isOpen?'Opened':day.day===1?'Tap to open':day.design?'Reveal later':'Design to come';
  document.getElementById('calendar-progress').textContent=opened.has(1)?'December 1 · opened':'December 1 · a song awaits';
 }
 function openedSnapshot(){
  // Reuse the original snapshot, retaining its exact paper and construction.
  // Only substitute the released ribbon and the live lid's final transform.
  const xml=decodeURIComponent(wrapped.get(activeDay.design).image.split(',').slice(1).join(','));
  const svg=new DOMParser().parseFromString(xml,'image/svg+xml').documentElement;
  svg.setAttribute('viewBox','60 45 480 445');
  svg.querySelector('image').setAttribute('href',ribbonCanvas.toDataURL());
  const lid=svg.querySelector('.box-lid'),pose=getComputedStyle(stage.querySelector('.box-lid'));
  lid.style.transform=pose.transform;lid.style.transformOrigin=pose.transformOrigin;lid.style.transformBox='view-box';
  return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(new XMLSerializer().serializeToString(svg));
 }
 function rememberOpened(){
  if(!dialog.open||!activeDay?.design||!stage.classList.contains('is-open'))return;
  opened.set(activeDay.day,openedSnapshot());saveOpened(true);update(activeDay);
  status.textContent=(songUrl?'Your December 1 song is ready.':'Your December 1 present is unwrapped.')+(storageAvailable?'':' Browser storage is unavailable; this opening cannot be remembered.');
 }
 new MutationObserver(()=>{
  rememberOpened();
  if(stage.classList.contains('is-open')){
   if(!window.ChimeConfetti?.active)showCard(!instantCard);
  }
  else clearCard();
 }).observe(stage,{attributes:true,attributeFilter:['class']});
 function previewOpened(){
  if(!activeDay?.design)return;
  clearCard();instantCard=true;
  replay();drawRibbon(designs[selected].duration||DURATION);
  stage.classList.add('is-opening');finish();
  stage.querySelectorAll('.present,.box-lid,.song-card,.inner-light,.sparkles').forEach(element=>element.getAnimations().forEach(animation=>animation.finish()));
  rememberOpened();
  showCard(false);instantCard=false;
 }
 function showDay(day,button){
  if(day.day!==1||!day.design||!unlocked())return;
  clearCard();
  activeDay=day;returnTarget=button;
  live.hidden=!day.design;future.hidden=!!day.design;
  dialog.querySelector('.preview-opened').hidden=!day.design;
  dialog.querySelector('#day-date').textContent=`DECEMBER ${day.day}`;
  const title=dialog.querySelector('#day-title');
  if(title)title.textContent=day.design?wrapped.get(day.design).name:'A wonder yet to come';
  dialog.setAttribute('aria-labelledby',title&&!title.hidden?'day-date day-title':'day-date');
  dialog.showModal();document.body.classList.add('calendar-dialog-open');
  if(day.design){selectDesign(day.design);sizeRibbon();if(saved||opened.has(day.day))previewOpened();}
  else dialog.querySelector('.placeholder-toggle').textContent=opened.has(day.day)?'Rewrap this day':'Mark as opened';
 }
 for(const day of calendarDays){
  const button=document.createElement('button');button.type='button';button.className='calendar-day';button.dataset.day=day.day;
  if(day.day===25)button.classList.add('christmas-day');
  button.innerHTML=`<span class="day-number">${String(day.day).padStart(2,'0')}</span>${day.design?'<img class="calendar-present" alt="" width="132" height="102">':'<span class="day-placeholder" aria-hidden="true">✧<span>CHIME</span></span>'}<span class="day-state"></span>`;
  grid.append(button);update(day);button.addEventListener('click',()=>showDay(day,button));
 }
 dialog.querySelector('.return-calendar').addEventListener('click',()=>dialog.close());
 dialog.addEventListener('close',()=>{clearCard();replay();activeDay=null;document.body.classList.remove('calendar-dialog-open');returnTarget?.focus({preventScroll:true});});
 dialog.querySelector('.preview-opened').addEventListener('click',previewOpened);
 replayButton.addEventListener('click',()=>{clearCard();if(activeDay){opened.delete(activeDay.day);saveOpened(false);update(activeDay);}});
 dialog.querySelector('.placeholder-toggle').addEventListener('click',()=>{
  if(opened.has(activeDay.day))opened.delete(activeDay.day);else opened.set(activeDay.day,true);
  update(activeDay);dialog.querySelector('.placeholder-toggle').textContent=opened.has(activeDay.day)?'Rewrap this day':'Mark as opened';
 });
 let previousUnlock=null;
 function refreshLock(){
  if(previousUnlock===unlocked())return;
  previousUnlock=unlocked();
  document.getElementById('unlock-status').textContent=unlocked()?'December 1 is ready to unwrap.':'Unlocks December 1, 2026 · 00:00 Japan time.';
  update(calendarDays[0]);
 }
 refreshLock();setInterval(refreshLock,1000);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)refreshLock();});
 if(saved&&unlocked())showDay(calendarDays[0],grid.querySelector('[data-day="1"]'));
})();
