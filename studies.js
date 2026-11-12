'use strict';
// Studies 07–12 extend the approved collection. Each owns its construction and
// authored ribbon arrangement, while selection, replay and timing stay shared.
const strand=(width,points,options={})=>({rows:points.map((p,i)=>i?[...p,width]:[...p,width]),...options});
const band=(x,y,bottom=417,width=18)=>strand(width,[[x,y-19],[x,y+30,x,bottom-25,x,bottom]],{flat:true});
const loop=(x,y,dx,dy,width)=>strand(width,[[x,y],[x+dx*.5,y+dy,x+dx,y+dy,x+dx,y+dy*.45],[x+dx,y+dy*.05,x+dx*.35,y+3,x,y]],{bow:true});
const tail=(x,y,dx,dy,width)=>strand(width,[[x,y],[x+dx*.2,y+dy*.3,x+dx*.7,y+dy*.8,x+dx,y+dy]],{flat:true});

Object.assign(constructions, {
 book:{base:'M168 284L226 247L414 272L414 399L359 422L168 398Z',
  lid:`<path d="M157 274L217 234L424 260L365 301Z" fill="url(#lid-top)"/>
   <path d="M157 274L365 301V321L157 294Z" fill="url(#lid-front)"/>
   <path d="M365 301L424 260V281L365 321Z" fill="url(#paper-side)"/>
   <path d="M170 272L219 243L409 267L363 291Z" fill="none" stroke="#c8ac70" opacity=".8"/>
   <path d="M185 258L392 284" stroke="#a88c58" opacity=".5"/>`,
  body:`<path d="M166 294L359 320V416L166 390Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M359 320L418 281V389L359 426Z" fill="#ded0aa"/>
   <path d="M367 322L410 294M367 332L410 304M367 343L410 315M367 354L410 326M367 365L410 337M367 376L410 348M367 387L410 359M367 398L410 370M367 408L410 380" stroke="#a99c7d" stroke-width="1"/>
   <path d="M158 389L359 416L420 378V391L359 431L158 403Z" fill="#1c3240"/>
   <path d="M166 294L186 297V405L166 402Z" fill="#142b38"/>
   <path d="M171 307L181 308M171 322L181 323M171 370L181 371M171 385L181 386" stroke="#d2b575" stroke-width="2"/>
   <path d="M201 327L340 345V392L201 373Z" fill="none" stroke="#b9a16a" opacity=".7"/>
   <text x="270" y="355" transform="rotate(7 270 355)" fill="#e2ce9e" text-anchor="middle" font-size="11" font-family="Georgia,serif" letter-spacing="2">A WINTER STORY</text>`},
 frost:{base:'M148 351L239 278L437 319L348 397V424L148 385Z',
  lid:`<path d="M137 339L236 266L448 310L348 387Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M137 339L236 266L448 310L348 387Z" fill="url(#frost-emboss)"/>
   <path d="M137 339L348 387V399L137 352Z" fill="url(#lid-front)"/>
   <path d="M348 387L448 310V324L348 399Z" fill="url(#paper-side)"/>
   <path d="M148 338L238 275L436 313L347 377Z" fill="none" stroke="#fcffff" opacity=".8"/>`,
  body:`<path d="M148 354L348 399V427L148 383Z" fill="url(#paper-front)"/>
   <path d="M348 399L438 330V359L348 427Z" fill="url(#paper-side)"/>
   <path d="M151 380L348 423L434 357" stroke="#e4f3f4" fill="none"/>
   <path d="M150 358L347 402" stroke="#f8ffff" opacity=".7"/>`},
 copper:{base:'M237 199L280 168L370 187L334 219V420L237 399Z',
  lid:`<path d="M228 189L274 153L380 176L335 213Z" fill="url(#lid-top)"/>
   <path d="M228 189L335 213V233L228 210Z" fill="url(#lid-front)"/>
   <path d="M335 213L380 176V198L335 233Z" fill="url(#paper-side)"/>
   <path d="M234 188L276 160L371 180L334 207Z" stroke="#ffe1ab" fill="none" opacity=".8"/>`,
  body:`<path d="M237 211L334 234V420L237 397Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M334 234L370 205V390L334 420Z" fill="url(#paper-side)"/>
   <path d="M243 218L250 220V395L243 393Z" fill="#ffdfaa" opacity=".36"/>
   <path d="M258 221L269 224V401L258 398Z" fill="#fff1c6" opacity=".12"/>
   <path d="M243 389L326 410V244L243 225Z" fill="none" stroke="#ebc390" stroke-width=".7"/>
   <path d="M348 233V396M360 225V387" stroke="#e4a771" opacity=".35"/>
   <text x="284" y="333" transform="rotate(13 284 333)" fill="#ffe1ab" font-size="9" text-anchor="middle" font-family="Georgia,serif" letter-spacing="3">NOËL</text>`},
 rose:{base:'M154 302L210 260L455 285L405 329L386 420L174 397Z',
  lid:`<path d="M140 285Q140 276 151 277L205 239L466 265L411 311Z" fill="url(#lid-top)"/>
   <path d="M140 285L411 311V336L147 309Z" fill="url(#lid-front)"/>
   <path d="M411 311L466 265L461 291L411 336Z" fill="url(#paper-side)"/>
   <path d="M153 283L207 248L454 269L409 302Z" fill="url(#rose-damask)"/>
   <path d="M147 306L411 332L461 289" stroke="#ca9d85" fill="none"/>`,
  body:`<path d="M154 310L405 336L386 420L174 397Z" fill="url(#paper-front)"/>
   <path d="M405 336L455 296L431 382L386 420Z" fill="url(#paper-side)"/>
   <path d="M154 310L405 336L386 420L174 397Z" fill="url(#rose-damask)"/>
   <path d="M174 315L189 318L203 400L189 398ZM376 334L389 335L371 417L359 416Z" fill="#70463f" opacity=".5"/>
   <path d="M258 346L308 351L304 372L257 367Z" fill="#c9a075" stroke="#ebcda3"/>
   <path d="M267 357Q284 342 298 361" fill="none" stroke="#6d5442" stroke-width="3"/>
   <circle cx="282" cy="360" r="2" fill="#70563d"/>`},
 citrus:{base:'M191 302L229 255L352 260L407 311L390 393L274 423L199 388Z',
  lid:`<path d="M178 289L225 237L356 243L419 298L301 335L192 313Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M178 289L192 313L301 335L419 298V317L301 355L192 332L178 307Z" fill="url(#lid-front)"/>
   <path d="M184 290L227 244L354 250L409 297L300 328L196 307Z" fill="url(#natural-flecks)"/>
   <g transform="translate(360 286) rotate(16)"><circle r="22" fill="#9c4d25" stroke="#e5ab57" stroke-width="3"/><circle r="17" fill="#d28a3b" stroke="#f3c77a"/>
    <path d="M0 0V-17M0 0L15-8M0 0L15 8M0 0V17M0 0L-15 8M0 0L-15-8" stroke="#f5cf8c" stroke-width="2"/><circle r="3" fill="#f5cf8c"/></g>
   <path d="M378 309Q411 296 403 282Q382 283 378 309Z" fill="#637655"/><path d="M380 307L400 286" stroke="#bcc19b"/>`,
  body:`<path d="M191 332L301 355L404 321L390 393L274 423L199 388Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M301 355L404 321L390 393L274 423Z" fill="url(#paper-side)"/>
   <path d="M191 332L301 355L404 321L390 393L274 423L199 388Z" fill="url(#natural-flecks)"/>
   <path d="M199 341L206 384L273 414L383 388L395 334M301 359L277 411" stroke="#a99978" fill="none" opacity=".65"/>`},
 oval:{base:'M142 284C142 250 179 235 217 242L399 266C463 274 479 313 436 338L431 387C421 422 379 431 342 423L181 402C145 397 135 379 142 354Z',
  lid:`<path d="M211 235L402 260C470 269 484 308 435 333C417 343 393 344 367 340L178 315C111 305 111 260 161 242C176 236 193 233 211 235Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M129 278C127 298 147 311 178 315L367 340C399 346 422 340 435 333C452 324 459 315 460 304V322C453 346 416 365 367 358L178 333C148 328 128 316 129 298Z" fill="url(#lid-front)"/>
   <path d="M211 243L400 268C457 276 472 305 430 326C414 335 393 336 369 332L181 307C125 299 124 268 164 250C179 244 194 241 211 243Z" fill="none" stroke="#c6b98d" stroke-width="1.2"/>
   <path d="M132 297C133 315 153 325 180 328L368 353C413 360 447 344 456 323" fill="none" stroke="#decb9a" stroke-width="1.3"/>`,
  body:`<path d="M140 315C150 327 164 331 184 334L366 358C407 364 434 349 449 333L443 388C433 416 406 431 366 424L180 400C150 396 136 384 137 365Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M140 315C150 327 164 331 184 334L366 358C407 364 434 349 449 333L443 388C433 416 406 431 366 424L180 400C150 396 136 384 137 365Z" fill="url(#case-grain)"/>
   <path d="M147 337C146 374 154 388 182 393L368 417C400 422 424 410 434 391" fill="none" stroke="#b5bfab" stroke-width=".8" opacity=".55"/>
   <path d="M154 337L166 339V387Q156 382 154 373Z" fill="#c9ddd1" opacity=".1"/>
   <g transform="rotate(7 375 387)"><rect x="344" y="375" width="62" height="22" rx="11" fill="#bda978" stroke="#e6d4a7" stroke-width=".7"/><text x="375" y="389" text-anchor="middle" font-size="8" font-family="Georgia,serif" letter-spacing="2" fill="#234d50">CHIME</text></g>`}
});

// Four paper tones expand into the established sixteen-stop material palette.
const paper=(front,shade,top,edge)=>[top,front,front,shade,shade,shade,front,top,top,front,edge,top,front,front,shade,edge];
Object.assign(designs, {
 book:{shape:'book',scale:[1,1],material:'woven',arrangement:'knot',anchor:[277,278],
  ribbon:[[71,101,15],[9,34,12],[20,37,13]],palette:paper('#294553','#142a35','#526674','#bd9d62'),
  title:'A book-shaped navy parcel with page edges and a narrow burgundy knot',note:'A winter story · Book cloth, gilt spine bands and page edges. A narrow burgundy tape closes in a simple knot.'},
 frost:{shape:'frost',scale:[1,1],material:'grosgrain',arrangement:'tailored',anchor:[302,321],
  ribbon:[[53,110,28],[85,122,30],[100,122,31]],palette:paper('#c2d7dc','#829da9','#edf5f4','#a6c5d0'),
  title:'A flat square ice-paper parcel with a wide flat tailored blue bow',note:'Frost & fold · Embossed snow crystals on a flat square parcel, crossed grosgrain bands and a crisp tailored bow.'},
 copper:{shape:'copper',scale:[1,1],material:'organza',arrangement:'oversized',anchor:[294,191],
  ribbon:[[112,99,39],[100,105,44],[72,102,59]],palette:paper('#b36e42','#673c28','#ebbc8b','#cd945d'),
  title:'A very tall copper tower crowned by an oversized ivory organza bow',note:'Copper candlelight · A slender metallic tower, enormous airy ivory loops and long split streamers. No extra ornament.'},
 rose:{shape:'rose',scale:[1,1],material:'velvet',arrangement:'diagonal',anchor:[389,294],
  ribbon:[[48,77,16],[8,25,16],[24,39,19]],palette:paper('#b58176','#684d4b','#dfb4a3','#bc9784'),
  title:'A tapered rose damask trunk with diagonal wine velvet and a corner fan bow',note:'Rosewood carriage · Tapered damask trunk, antique clasp and a diagonal velvet sash with a corner-mounted fan.'},
 citrus:{shape:'citrus',scale:[1,1],material:'twine',arrangement:'twine',anchor:[275,292],
  ribbon:[[103,80,15],[82,74,20],[47,62,17]],palette:paper('#d5c7a6','#9b9275','#eee4ca','#bdaf8d'),
  title:'A natural hexagonal parcel with crossed jute twine and dried orange',note:'Winter pantry · Flecked oatmeal paper folded around six sides; crossed jute, a loose rustic tie and dried orange.'},
 oval:{shape:'oval',scale:[1,1],material:'silk',arrangement:'butterfly',anchor:[290,281],
  ribbon:[[102,111,37],[91,111,42],[61,91,68]],palette:paper('#2c6266','#173b42','#6a9691','#b4b590'),
  title:'An elongated peacock-blue keepsake case with a fitted oval lid and ivory butterfly bow',note:'Peacock keepsake · A single curved confectioner’s case, fine textured blue paper, a fitted gilt-edged lid and an ivory silk butterfly bow.'}
});

// Bespoke tied centerlines: these do not scale or recolour the original bow.
const arrangements={
 knot:[band(277,278,416,9),tail(277,278,-32,18,9),tail(277,278,31,27,9),
  strand(8,[[270,274],[273,277,280,284,284,285]],{flat:true}),
  strand(7,[[279,273],[278,279,274,282,272,285]],{flat:true})],
 tailored:[band(302,321,414,27),strand(23,[[151,343],[218,352,284,366,350,382]],{flat:true}),
  strand(26,[[302,321],[271,303,240,300,232,304],[226,315,267,331,302,321]],{flat:true,bow:true}),
  strand(26,[[302,321],[329,309,359,312,370,321],[369,333,329,331,302,321]],{flat:true,bow:true}),
  tail(300,325,-53,37,22),tail(304,325,53,39,22),strand(20,[[302,311],[302,318,302,325,302,333]],{flat:true})],
 oversized:[band(294,191,417,18),loop(294,191,-88,-91,33),loop(294,191,100,-83,33),
  strand(26,[[291,193],[242,213,259,254,246,294],[235,325,270,354,257,377]],{bow:true}),
  strand(23,[[298,193],[340,213,313,260,344,285],[370,313,325,332,347,352]],{bow:true}),
  strand(23,[[294,184],[308,188,307,200,295,202],[283,200,282,189,294,184]],{flat:true})],
 diagonal:[strand(28,[[188,405],[255,371,322,329,389,294],[405,283,426,274,450,268]],{flat:true}),
  loop(389,294,-48,-30,21),loop(389,294,-20,-54,21),loop(389,294,31,-40,21),
  tail(389,297,-57,45,23),tail(393,298,12,53,19),strand(17,[[388,286],[401,289,402,300,389,304]],{flat:true})],
 twine:[band(275,292,417,3),strand(3,[[185,300],[246,312,294,324,302,336],[343,326,372,315,410,303]],{flat:true}),
  loop(275,292,-49,-27,3),loop(275,292,44,-19,3),
  strand(3,[[275,292],[255,309,264,333,241,350]],{flat:true}),tail(278,295,43,44,3),
  strand(5,[[272,290],[284,282,286,298,275,299],[267,297,267,290,272,290]],{flat:true})],
 butterfly:[band(290,281,420,25),
  loop(290,281,-77,-49,25),loop(290,281,88,-59,27),
  strand(23,[[287,282],[270,307,266,338,242,360]],{bow:true}),
  strand(23,[[294,282],[320,304,325,327,341,343]],{bow:true}),
  strand(23,[[286,273],[302,268,310,285,293,291],[279,291,274,280,286,273]],{flat:true})]
};

function paintTwine(points) {
 const ctx=ribbonContext;
 ctx.save();ctx.lineCap='round';ctx.lineJoin='round';
 ctx.beginPath();points.forEach((p,i)=>i?ctx.lineTo(p.x,p.y):ctx.moveTo(p.x,p.y));
 ctx.shadowColor='#08181199';ctx.shadowBlur=2;ctx.shadowOffsetY=2;
 ctx.lineWidth=points[0].width;ctx.strokeStyle='#a38b5e';ctx.stroke();
 ctx.shadowColor='transparent';ctx.lineWidth=1;ctx.strokeStyle='#f2dfaf';ctx.setLineDash([2,3]);ctx.stroke();ctx.restore();
}
// Topology describes material, not independently moving ornaments. Two ends of
// the wrap pass through the knot; bights and tails are joined to those ends.
// Cross-bands are complete additional belts, held until the bow is free.
const releasePlans={
 knot:{loops:[[],[]],tails:[1,2],collars:[3,4],cross:[],loopEnd:1550,peel:1750,edge:3100,settled:4200,lid:4350,sides:[145,440]},
 tailored:{loops:[[2],[3]],tails:[4,5],collars:[6],cross:[1],loopEnd:3400,peel:3600,edge:4700,settled:5700,lid:5850,sides:[112,474]},
 oversized:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:3900,peel:4100,edge:5500,settled:6500,lid:6650,sides:[207,398]},
 diagonal:{loops:[[1,2],[3]],tails:[4,5],collars:[6],cross:[],loopEnd:3700,peel:3900,edge:5200,settled:6200,lid:6350,sides:[136,478]},
 twine:{loops:[[2],[3]],tails:[4,5],collars:[6],cross:[1],loopEnd:3500,peel:3700,edge:4800,settled:5800,lid:5950,sides:[164,438]},
 butterfly:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:3700,peel:3900,edge:5050,settled:6000,lid:6150,sides:[122,463]}
};
const strandCache=new Map();
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function measured(points) {
 let length=0;
 const path=points.map((p,i)=>{if(i)length+=distance(points[i-1],p);return {...p,s:length}});
 return {points:path,length};
}
function along(path,s) {
 const pts=path.points;
 s=Math.max(0,Math.min(path.length,s));
 let lo=0,hi=pts.length-1;
 while(lo+1<hi){const mid=(lo+hi)>>1;if(pts[mid].s<s)lo=mid;else hi=mid}
 const a=pts[lo],b=pts[hi],t=(s-a.s)/(b.s-a.s||1);
 return {...a,x:mix(a.x,b.x,t),y:mix(a.y,b.y,t),width:mix(a.width,b.width,t),bank:mix(a.bank||0,b.bank||0,t)};
}
function connected(parts) {
 // Short joins live under the collar while tied. They remain part of the strip
 // when the collar opens; adjacent parts never get unrelated destinations.
 return parts.flatMap(part=>part);
}
function prepareStrands(key) {
 if(strandCache.has(key))return strandCache.get(key);
 const design=designs[key],plan=releasePlans[design.arrangement];
 const runs=arrangements[design.arrangement].map(run=>sample(run.rows,'front',0).map(p=>({...p,lift:0,pleat:0,bank:run.flat?.05:p.bank*.4})));
 const root={x:design.anchor[0],y:design.anchor[1]};
 const wrap=runs[0];
 let split=0;
 wrap.forEach((p,i)=>{if(distance(p,root)<distance(wrap[split],root))split=i});
 const center={...wrap[split],...root};
 const halves=[wrap.slice(split+1).reverse().concat(center),wrap.slice(0,split).concat(center)];
 const chains=halves.map((bandPoints,side)=>{
  const loopParts=plan.loops[side].map(index=>runs[index]);
  const collars=plan.collars.filter((_,i)=>i%2===side).map(index=>runs[index]);
  const tailPoints=runs[plan.tails[side]];
  const original=measured(connected([bandPoints,...loopParts,...collars,tailPoints]));
  return {band:bandPoints,loops:loopParts,collars,tail:tailPoints,original,side};
 });
 const model={runs,chains,cross:plan.cross.map(i=>measured(runs[i])),plan,root};
 strandCache.set(key,model);return model;
}
// A long, rounded route accepts material paid out through the knot. Tail length
// grows by the exact length withdrawn from the bights and band, rather than
// creating several short strips or scaling the ribbon width toward zero.
function payoutRoute(tailPoints,side,edge) {
 const end=tailPoints[tailPoints.length-1],sign=side?1:-1;
 const outside=Math.max(76,Math.min(524,edge+sign*60));
 const rows=[[end.x,end.y,end.width],
  [end.x+sign*24,Math.min(445,end.y+12),outside,Math.min(450,end.y+32),outside,Math.max(421,Math.min(446,end.y+40)),end.width],
  [outside,463,edge-sign*50,455,edge-sign*100,450,end.width],
  [300,440,side?145:455,435,side?127:473,449,end.width],
  [side?95:505,467,300,476,side?462:138,468,end.width],
  [side?500:100,450,300,428,side?140:460,442,end.width]];
 return measured(tailPoints.concat(sample(rows,'front',DURATION).slice(1).map(p=>({...p,lift:0,pleat:0,bank:.08}))));
}
function ribbonFrames(points,falling=false) {
 // Recompute tangents and sheet normals after deformation. Reusing the tied
 // normals was another cause of folded-looking shards in the previous motion.
 return points.map((p,i)=>{
  const radius=falling?2:1;
  const a=points[Math.max(0,i-radius)],b=points[Math.min(points.length-1,i+radius)];
  const dx=b.x-a.x,dy=b.y-a.y,len=Math.hypot(dx,dy)||1;
  return {...p,tx:dx/len,ty:dy/len,nx:-dy/len,ny:dx/len,lift:0,pleat:0,bendRadius:10000};
 });
}
function chainPose(chain,model,ms) {
 const {plan,root}=model,side=chain.side,edge=plan.sides[side];
 const peel=phase(ms,plan.peel,plan.edge),settle=phase(ms,plan.edge,plan.settled);
 const travel=phase(ms,plan.peel,plan.peel+(plan.edge-plan.peel)*.6);
 const drop=phase(ms,plan.peel+(plan.edge-plan.peel)*.3,plan.edge);
 const pin={x:mix(root.x,edge,travel),y:mix(root.y,426,drop)};
 const dx=pin.x-root.x,dy=pin.y-root.y;
 const bandPoints=chain.band.map(p=>{
  // As the free end is pulled, material leaves the wrap over the edge and is
  // paid into the tail. The short rear end follows the same pin; it must not
  // stretch into a new full-height strip on its way down.
  return {...p,x:pin.x+(p.x-root.x)*(1-peel),y:pin.y+(p.y-root.y)*(1-peel)};
 });
 const loopParts=chain.loops.map((points,i,all)=>{
  // Pull-side bights feed out first. Florist and fan loops release serially,
  // with overlap, rather than six loops shrinking in lockstep.
  const start=(side?1250:2050)+i*(plan.loopEnd-(side?1250:2050)-650)/Math.max(1,all.length);
  const release=phase(ms,start,Math.min(plan.loopEnd,start+1050));
  return points.map(p=>({...p,x:pin.x+(p.x-root.x)*(1-release),y:pin.y+(p.y-root.y)*(1-release),bank:mix(p.bank,1.1,Math.sin(release*Math.PI))}));
 });
 const collarParts=chain.collars.map(points=>{
  const loosen=phase(ms,750,1350),open=phase(ms,1250,plan.loopEnd);
  return points.map(p=>({...p,x:pin.x+(p.x-root.x)*(1+loosen*.65)*(1-open),y:pin.y+(p.y-root.y)*(1+loosen*.45)*(1-open)}));
 });
 const prefix=connected([bandPoints,...loopParts,...collarParts]);
 const tailStart=chain.tail[0];
 const tailPoints=chain.tail.map((p,i,pts)=>{
  const u=i/(pts.length-1);
  const tug=phase(ms,350,950)*(side?15:3)*u;
  return {...p,x:mix(p.x+dx+(side?1:-1)*tug,edge+(side?1:-1)*u*60,drop),y:mix(p.y+dy*(1-u)-6*phase(ms,350,950)*u,432+Math.sin(u*Math.PI)*6,drop)};
 });
 // Weld the tail root to the same knot translation as the preceding material.
 tailPoints[0]={...tailStart,x:tailStart.x+dx,y:tailStart.y+dy};
 const joined=measured(prefix.concat(tailPoints[0]));
 const remaining=Math.max(1,chain.original.length-joined.length);
 const route=payoutRoute(tailPoints,side,edge);
 const tailCount=Math.max(24,Math.ceil(remaining/3));
 const paidOut=Array.from({length:tailCount},(_,i)=>along(route,remaining*i/(tailCount-1)));
 const guide=measured(prefix.concat(paidOut));
 const count=Math.max(80,Math.ceil(chain.original.length/3));
 const points=Array.from({length:count},(_,i)=>{
  const u=i/(count-1),s=u*chain.original.length;
  const p=along(guide,u*guide.length),material=along(chain.original,s);
  // Once clear, keep the laid-out x coordinates and material ordering. A small
  // vertical relaxation settles the existing folds, without cross-fading to a
  // different floor curve (which could cancel half of the strip's length).
  const restY=438+Math.sin(s/85+side)*9;
  return {...material,x:p.x,y:mix(p.y,restY,settle*.12),bank:p.bank*(1-settle*.6)};
 });
 return ribbonFrames(points,ms>=plan.peel);
}
function arrangementPose(key,ms) {
 const model=prepareStrands(key),{plan,root}=model;
 const chains=model.chains.map(chain=>chainPose(chain,model,ms));
 // A cross-band is one intact belt, not many bow fragments. It slides from
 // under the released knot only after every bight has been paid out.
 model.cross.forEach(belt=>{
  const slide=phase(ms,plan.peel+120,plan.edge),settle=phase(ms,plan.edge,plan.settled);
  const points=belt.points.map(p=>{
   const u=p.s/(belt.length||1);
   return {...p,x:p.x+(plan.sides[0]-root.x)*slide*.45,y:mix(mix(p.y,429+u*7,slide),438+Math.sin(u*Math.PI*2)*5,settle*.15)};
  });
  chains.unshift(ribbonFrames(points,ms>=plan.peel));
 });
 return chains;
}
function drawArrangement(ms) {
 const design=designs[selected],model=prepareStrands(selected),{plan}=model;
 ribbonContext.setTransform(ribbonScale,0,0,ribbonScale,0,0);
 ribbonContext.clearRect(0,0,600,490);
 // Use the same continuous strips while wrapped and moving. The authored
 // tied centerlines/materials are retained, without a renderer handoff on click.
 const paths=arrangementPose(selected,ms);
 for(const points of paths) {
  ribbonContext.save();
  if(design.material==='organza')ribbonContext.globalAlpha=.82;
  if(design.material==='twine')paintTwine(points);else paintRibbon(points,true,ms>=plan.peel);
  ribbonContext.restore();
 }
 stage.dataset.phase=ms<750?'tail-pull':ms<1350?'knot-loosening':ms<plan.peel?'loops-feeding':ms<plan.edge?'wrap-sliding':ms<plan.settled?'ribbon-settling':'reveal';
}

// Opening waits for material to clear and settle. The original six retain
// their existing 4.9-second timing; these six have construction-specific cues.
for(const design of Object.values(designs))if(design.arrangement) {
 const plan=releasePlans[design.arrangement];
 design.duration=plan.lid+1350;
 design.lidDelay=plan.lid;
}

document.querySelector('svg defs').insertAdjacentHTML('beforeend',`
 <pattern id="frost-emboss" width="42" height="40" patternUnits="userSpaceOnUse"><g fill="none" stroke="#f8ffff" stroke-width=".9" opacity=".75"><path d="M21 9V31M11 14L31 26M11 26L31 14M17 12L21 16L25 12M17 28L21 24L25 28M13 18L18 18L16 13M26 27L25 22L30 22"/></g></pattern>
 <pattern id="rose-damask" width="47" height="49" patternUnits="userSpaceOnUse"><path d="M23 7Q4 17 15 28Q23 19 23 7Q23 19 31 28Q42 17 23 7ZM23 22Q12 37 23 43Q34 37 23 22Z" fill="none" stroke="#f2c9b3" stroke-width=".8" opacity=".35"/></pattern>
 <pattern id="natural-flecks" width="31" height="28" patternUnits="userSpaceOnUse"><path d="M4 8l3 1M17 19l2-3M25 6l-1 2M8 24h2" stroke="#776b4c" stroke-width=".7" opacity=".3"/><path d="M10 13l5 2M23 23l4-1" stroke="#fff4db" opacity=".5"/></pattern>
 <pattern id="case-grain" width="13" height="12" patternUnits="userSpaceOnUse"><path d="M2 3h2M8 8h2" stroke="#b6c5b0" stroke-width=".6" opacity=".22"/><circle cx="7" cy="2" r=".5" fill="#132e38" opacity=".2"/></pattern>`);

buildThumbnails();
selectDesign('crimson');
