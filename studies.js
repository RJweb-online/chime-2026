'use strict';
// Studies 07–25 extend the original collection. Each owns its construction and
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
  const start=plan.loopStarts?.[side]?.[i]??(side?1250:2050)+i*(plan.loopEnd-(side?1250:2050)-650)/Math.max(1,all.length);
  const release=phase(ms,start,Math.min(plan.loopEnd,start+1050));
  // Christmas velvet first softens the outer bights, before either tail moves.
  const relax=i===0&&plan.outerRelax?phase(ms,...plan.outerRelax):0;
  return points.map(p=>({...p,x:pin.x+(p.x-root.x)*(1+relax*.12)*(1-release),y:pin.y+(p.y-root.y)*(1-relax*.25)*(1-release),bank:mix(p.bank,1.1,Math.sin(release*Math.PI))}));
 });
 const collarParts=chain.collars.map(points=>{
  const loosen=phase(ms,...(plan.collarLoosen||[750,1350])),open=phase(ms,...(plan.collarOpen||[1250,plan.loopEnd]));
  return points.map(p=>({...p,x:pin.x+(p.x-root.x)*(1+loosen*.65)*(1-open),y:pin.y+(p.y-root.y)*(1+loosen*.45)*(1-open)}));
 });
 const prefix=connected([bandPoints,...loopParts,...collarParts]);
 const tailStart=chain.tail[0];
 const tailPoints=chain.tail.map((p,i,pts)=>{
  const u=i/(pts.length-1);
  const tug=phase(ms,...(plan.tailTug||[350,950]))*(side?15:3)*u;
  return {...p,x:mix(p.x+dx+(side?1:-1)*tug,edge+(side?1:-1)*u*60,drop),y:mix(p.y+dy*(1-u)-6*phase(ms,...(plan.tailTug||[350,950]))*u,432+Math.sin(u*Math.PI)*6,drop)};
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

// Studies 13–16: fitted, unwrapped gift boxes using the approved material renderer.
Object.assign(constructions, {
 burgundy:{base:'M174 276L229 239L429 258L378 295V420L174 402Z',
  lid:`<path d="M163 248L220 209L437 228L378 270Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M163 248L378 270V294L163 272Z" fill="url(#lid-front)"/>
   <path d="M378 270L437 228V252L378 294Z" fill="url(#paper-side)"/>
   <path d="M165 249L378 271L435 230M165 269L378 291L435 250" fill="none" stroke="#d398a1" stroke-width=".9" opacity=".7"/>
   <path d="M183 244L224 216L418 233L376 262Z" fill="url(#paper-reflection)" opacity=".32"/>
   <path d="M168 255L373 276" stroke="#e1b3b6" stroke-width=".6" opacity=".3"/>`,
  body:`<path d="M174 276L378 295V421L174 402Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M378 295L429 258V382L378 421Z" fill="url(#paper-side)"/>
   <path d="M174 276L378 295V421L174 402Z" fill="url(#paper-bloom)"/>
   <path d="M175 282L377 301V306L175 287Z" fill="#2b1021" opacity=".35"/>
   <path d="M181 289L370 307V411L181 394Z" fill="none" stroke="#c18591" stroke-width=".65" opacity=".3"/>
   <path d="M181 292L220 296Q208 347 226 406L181 401Z" fill="url(#paper-reflection)" opacity=".35"/>
   <path d="M176 397L376 417L426 380M380 301V417" fill="none" stroke="#bb7d8c" stroke-width=".8" opacity=".55"/>`},
 forest:{base:'M148 336L212 293L454 320L393 361V416L148 392Z',
  lid:`<path d="M136 313L207 268L464 294L393 340Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M136 313L393 340V359L136 332Z" fill="url(#lid-front)"/>
   <path d="M393 340L464 294V313L393 359Z" fill="url(#paper-side)"/>
   <path d="M139 314L393 341L461 296M139 329L392 356L461 311" fill="none" stroke="#8ba28e" stroke-width=".8" opacity=".75"/>
   <path d="M159 309L211 276L440 298L389 332Z" fill="url(#paper-reflection)" opacity=".2"/>`,
  body:`<path d="M148 336L393 361V416L148 392Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M393 361L454 320V377L393 416Z" fill="url(#paper-side)"/>
   <path d="M149 339L392 364V369L149 344Z" fill="#081e19" opacity=".4"/>
   <path d="M155 350L385 374V407L155 384Z" fill="none" stroke="#638471" stroke-width=".65" opacity=".4"/>
   <path d="M151 345L193 350L199 396L151 391Z" fill="url(#paper-reflection)" opacity=".24"/>
   <path d="M150 388L392 412L452 375M395 365V411" fill="none" stroke="#73907c" stroke-width=".8" opacity=".6"/>`},
 nocturne:{base:'M299 249L381 256L418 287L384 326L302 349L218 342L182 309L216 270Z',
  lid:`<path d="M299 233L386 240L422 273L388 312L302 335L215 328L178 295L212 256Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M422 273L388 312L302 335L215 328L178 295V313L215 346L302 353L388 330L422 291Z" fill="url(#lid-front)"/>
   <path d="M388 312L422 273V291L388 330Z" fill="url(#paper-side)"/>
   <path d="M301 242L381 249L411 274L382 305L301 326L220 319L189 294L219 263Z" fill="none" stroke="#b5c4d0" stroke-width=".8" opacity=".55"/>
   <path d="M180 295L216 329L302 336L388 313L420 275M180 310L216 343L302 350L388 327L420 289" fill="none" stroke="#8d9fb7" stroke-width=".8" opacity=".75"/>`,
  body:`<path d="M182 313L218 347L303 354L386 331L418 293V357L386 395L303 418L218 411L182 377Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M386 331L418 293V357L386 395Z" fill="url(#paper-side)"/>
   <path d="M303 354L386 331V395L303 418Z" fill="#0c1b33" opacity=".18"/>
   <path d="M182 313L218 347V411L182 377Z" fill="#8c9caf" opacity=".1"/>
   <path d="M185 373L220 407L303 414L384 391L415 356M220 351V405M305 358V411" fill="none" stroke="#7c8fa9" stroke-width=".75" opacity=".6"/>
   <path d="M225 355L248 357V410L225 408Z" fill="url(#paper-reflection)" opacity=".22"/>`},
 cranberry:{base:'M162 331C162 302 223 280 300 280C377 280 438 302 438 331V371C438 404 376 424 300 424C224 424 162 404 162 371Z',
  lid:`<ellipse cx="300" cy="310" rx="146" ry="55" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M154 310C154 340 219 365 300 365C381 365 446 340 446 310V328C446 358 381 382 300 382C219 382 154 358 154 328Z" fill="url(#lid-front)"/>
   <ellipse cx="300" cy="310" rx="137" ry="48" fill="none" stroke="#dda3af" stroke-width=".7" opacity=".45"/>
   <path d="M156 329C158 356 220 379 300 379C379 379 441 356 444 329" fill="none" stroke="#c98d9e" stroke-width="1" opacity=".75"/>
   <path d="M176 296Q223 267 307 270Q240 281 213 310Z" fill="url(#paper-reflection)" opacity=".3"/>`,
  body:`<path d="M162 331C170 360 228 380 300 380C372 380 430 360 438 331V371C438 404 376 424 300 424C224 424 162 404 162 371Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M162 331C170 360 228 380 300 380C372 380 430 360 438 331V371C438 404 376 424 300 424C224 424 162 404 162 371Z" fill="url(#paper-bloom)"/>
   <path d="M390 365Q425 352 438 331V371Q436 396 390 412Z" fill="#321827" opacity=".2"/>
   <path d="M175 359Q189 369 207 373L210 411Q190 405 177 393Z" fill="url(#paper-reflection)" opacity=".5"/>
   <path d="M170 377C180 403 233 419 300 419C366 419 420 403 431 377" fill="none" stroke="#bc7c8f" stroke-width=".8" opacity=".65"/>`}
});
Object.assign(designs, {
 burgundy:{shape:'burgundy',scale:[1,1],material:'satin',arrangement:'ivoryCross',anchor:[296,245],
  ribbon:[[112,115,27],[104,114,30],[80,103,46]],palette:paper('#812f45','#451b2d','#ac6372','#c88c9a'),
  title:'A deep square burgundy gift box with broad crossed ivory satin and a centered bow',note:'Burgundy keepsake · A deep square box, fitted lid and broad ivory satin crossed beneath a generous centered bow.'},
 forest:{shape:'forest',scale:[1,1],material:'silk',arrangement:'cornerSilk',anchor:[376,322],
  ribbon:[[99,116,31],[86,110,38],[56,98,54]],palette:paper('#2b5145','#142f28','#58786a','#799584'),
  title:'A slim rectangular forest-green gift box with fine champagne ribbon and a small corner bow',note:'Forest jewel case · A slim rectangular box, fitted lid and fine champagne silk tied at the corner.'},
 nocturne:{shape:'nocturne',scale:[1,1],material:'silk',arrangement:'silverSculpture',anchor:[300,282],
  ribbon:[[60,119,64],[71,126,58],[88,133,34]],palette:paper('#293e60','#14223c','#536b89','#8193ad'),
  title:'An octagonal midnight-blue gift box with silver ribbon and a sculpted double-loop bow',note:'Midnight octagon · Eight beveled corners, a fitted lid and a sculpted double-loop bow in silver silk.'},
 cranberry:{shape:'cranberry',scale:[1,1],material:'satin',arrangement:'blushAsymmetry',anchor:[275,305],
  ribbon:[[111,113,22],[72,101,39],[75,98,37]],palette:paper('#94374f','#552438','#bd7082','#ce98a6'),
  title:'A low round cranberry gift box with wide blush satin and an asymmetrical bow',note:'Cranberry round · A low circular box, close-fitting lid and wide blush satin with an asymmetrical bow.'}
});
Object.assign(arrangements, {
 ivoryCross:[strand(29,[[334,220],[321,228,308,237,296,245],[288,254,281,264,277,277],[277,321,277,368,277,414]],{flat:true}),
  strand(28,[[185,235],[227,239,264,242,296,245],[338,250,378,251,411,253],[405,287,405,343,405,400]],{flat:true}),
  loop(296,245,-69,-49,29),loop(296,245,70,-46,29),tail(293,250,-52,71,26),tail(300,250,51,76,26),
  strand(25,[[292,234],[310,233,315,253,298,260],[282,258,279,242,292,234]],{flat:true})],
 cornerSilk:[strand(9,[[429,298],[411,304,392,313,376,322],[369,329,363,337,357,347],[357,365,357,389,357,410]],{flat:true}),
  loop(376,322,-34,-23,10),loop(376,322,32,-22,10),tail(374,325,-27,35,9),tail(379,325,27,32,9),
  strand(8,[[374,316],[383,314,387,325,377,330],[369,329,367,320,374,316]],{flat:true})],
 silverSculpture:[strand(19,[[344,239],[328,251,314,266,300,282],[289,300,278,317,269,334],[269,359,269,385,269,412]],{flat:true}),
  loop(300,282,-64,-40,22),loop(300,282,-39,-58,18),loop(300,282,67,-38,22),loop(300,282,41,-58,18),
  strand(19,[[296,286],[274,309,278,336,243,369]],{bow:true}),strand(19,[[305,286],[328,309,330,336,355,359]],{bow:true}),
  strand(20,[[296,271],[313,269,318,288,303,297],[287,297,282,279,296,271]],{flat:true})],
 blushAsymmetry:[strand(30,[[328,272],[310,284,291,293,275,305],[260,322,249,339,244,358],[244,375,244,394,244,414]],{flat:true}),
  loop(275,305,-74,-34,30),loop(275,305,58,-66,28),
  strand(27,[[270,309],[243,332,248,367,219,396]],{bow:true}),strand(25,[[281,310],[308,330,317,370,343,389]],{bow:true}),
  strand(25,[[272,293],[291,288,298,311,279,321],[262,321,257,302,272,293]],{flat:true})]
});
// Keep the established release -> settled cloth -> fitted lid -> card sequence.
Object.assign(releasePlans, {
 ivoryCross:{loops:[[2],[3]],tails:[4,5],collars:[6],cross:[1],loopEnd:2950,peel:3150,edge:4050,settled:5050,lid:5250,sides:[153,448]},
 cornerSilk:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:2500,peel:2700,edge:3650,settled:4600,lid:4750,sides:[143,454]},
 silverSculpture:{loops:[[1,2],[3,4]],tails:[5,6],collars:[7],cross:[],loopEnd:4300,peel:4520,edge:5650,settled:6500,lid:6700,sides:[164,438]},
 blushAsymmetry:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:4600,peel:4800,edge:5800,settled:6600,lid:6800,sides:[143,457]}
});

// Studies 17–20 extend the fitted-box collection without changing the earlier models.
Object.assign(constructions, {
 ivoryHatbox:{base:'M198 245C198 222 244 203 300 203C356 203 402 222 402 245V374C402 401 356 423 300 423C244 423 198 401 198 374Z',
  lid:`<ellipse cx="300" cy="224" rx="109" ry="42" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M191 224C191 247 240 266 300 266C360 266 409 247 409 224V242C409 265 360 284 300 284C240 284 191 265 191 242Z" fill="url(#lid-front)"/>
   <ellipse cx="300" cy="224" rx="101" ry="36" fill="none" stroke="#fff8e8" stroke-width=".8" opacity=".7"/>
   <path d="M194 243C198 265 242 281 300 281C358 281 402 265 406 243" fill="none" stroke="#c7baa0" stroke-width="1"/>
   <path d="M213 215Q252 189 316 192Q259 202 239 226Z" fill="url(#paper-reflection)" opacity=".32"/>`,
  body:`<path d="M198 245C204 266 246 283 300 283C354 283 396 266 402 245V374C402 401 356 423 300 423C244 423 198 401 198 374Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M198 245C204 266 246 283 300 283C354 283 396 266 402 245V374C402 401 356 423 300 423C244 423 198 401 198 374Z" fill="url(#paper-bloom)"/>
   <path d="M365 273Q395 260 402 245V374Q401 393 365 410Z" fill="#786b53" opacity=".12"/>
   <path d="M207 278Q220 287 238 291V410Q220 405 207 393Z" fill="url(#paper-reflection)" opacity=".42"/>
   <path d="M202 374C208 397 249 418 300 418C351 418 392 397 398 374" fill="none" stroke="#beaf94" stroke-width=".9"/>
   <path d="M202 278C225 293 268 301 300 301C337 301 379 291 398 278" fill="none" stroke="#ede3cc" stroke-width=".7" opacity=".45"/>`},
 glacier:{base:'M159 326L250 263L434 309L346 369V423L159 382Z',
  lid:`<path d="M152 307L247 246L443 284L346 353Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M152 307L247 246L443 284L346 353Z" fill="url(#glacier-linen)"/>
   <path d="M152 307L346 353V369L152 323Z" fill="url(#lid-front)"/>
   <path d="M346 353L443 284V300L346 369Z" fill="url(#paper-side)"/>
   <path d="M155 308L346 354L440 286M155 320L346 366L440 299" fill="none" stroke="#e5f0ec" stroke-width=".85" opacity=".75"/>
   <path d="M168 305L249 254L423 288L345 344Z" fill="url(#paper-reflection)" opacity=".15"/>`,
  body:`<path d="M159 326L346 371V423L159 382Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M346 371L434 309V362L346 423Z" fill="url(#paper-side)"/>
   <path d="M159 326L346 371V423L159 382Z" fill="url(#glacier-linen)"/>
   <path d="M346 371L434 309V362L346 423Z" fill="url(#glacier-linen)" opacity=".65"/>
   <path d="M161 331L345 375V380L161 336Z" fill="#6a8b98" opacity=".3"/>
   <path d="M163 379L345 419L431 361M349 376V418" fill="none" stroke="#d2e3e4" stroke-width=".8" opacity=".8"/>
   <path d="M166 344L337 384V413L166 376Z" fill="none" stroke="#e3ece7" stroke-width=".55" opacity=".35"/>`},
 plumStep:{base:'M153 279L217 240L455 264L390 306V418L153 391Z',
  lid:`<path d="M140 251L207 209L465 238L397 282Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M140 251L397 282V303L140 274Z" fill="url(#lid-front)"/>
   <path d="M397 282L465 238V261L397 303Z" fill="url(#paper-side)"/>
   <path d="M164 238L214 205L443 231L392 265Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M164 238L392 265V276L164 250Z" fill="url(#lid-front)"/>
   <path d="M392 265L443 231V242L392 276Z" fill="url(#paper-side)"/>
   <path d="M166 239L392 266L441 233M142 252L397 283L463 240M142 271L397 300L463 259" fill="none" stroke="#ad8fa2" stroke-width=".8" opacity=".65"/>
   <path d="M180 235L218 213L426 236L389 259Z" fill="url(#paper-reflection)" opacity=".22"/>`,
  body:`<path d="M153 279L390 306V418L153 391Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M390 306L455 264V375L390 418Z" fill="url(#paper-side)"/>
   <path d="M153 279L390 306V418L153 391Z" fill="url(#paper-bloom)"/>
   <path d="M154 282L389 309V315L154 288Z" fill="#211323" opacity=".4"/>
   <path d="M160 294L382 319V408L160 383Z" fill="none" stroke="#9b7b91" stroke-width=".65" opacity=".35"/>
   <path d="M158 302L194 307Q185 346 200 395L158 390Z" fill="url(#paper-reflection)" opacity=".3"/>
   <path d="M156 386L388 414L452 373M393 311V412" fill="none" stroke="#98768e" stroke-width=".85" opacity=".65"/>`},
 evergreen:{base:'M192 294L246 255L374 272L417 309V383L365 422L242 409L192 366Z',
  lid:`<path d="M185 278L244 237L376 251L426 300L370 340L235 326Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M185 278L244 237L376 251L426 300L370 340L235 326Z" fill="url(#evergreen-sprigs)"/>
   <path d="M185 278L235 326L370 340L426 300V318L370 358L235 344L185 296Z" fill="url(#lid-front)"/>
   <path d="M370 340L426 300V318L370 358Z" fill="url(#paper-side)"/>
   <path d="M187 279L236 327L370 341L424 301M187 293L236 341L369 355L423 317" fill="none" stroke="#fff5db" stroke-width=".85" opacity=".85"/>
   <path d="M197 278L247 246L372 259L414 299L367 331L240 317Z" fill="none" stroke="#b5b493" stroke-width=".65" opacity=".5"/>`,
  body:`<path d="M192 301L239 344L367 358L417 321V383L365 422L242 409L192 366Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M367 358L417 321V383L365 422Z" fill="url(#paper-side)"/>
   <path d="M192 301L239 344L367 358L417 321V383L365 422L242 409L192 366Z" fill="url(#evergreen-sprigs)"/>
   <path d="M192 301L239 344V409L192 366Z" fill="#fff3d2" opacity=".12"/>
   <path d="M196 364L244 405L364 418L414 382M243 350V401M370 363V414" fill="none" stroke="#c4baa0" stroke-width=".8" opacity=".85"/>
   <path d="M248 353L275 356V410L248 407Z" fill="url(#paper-reflection)" opacity=".35"/>`}
});
Object.assign(designs, {
 ivoryHatbox:{shape:'ivoryHatbox',scale:[1,1],material:'silk',arrangement:'uprightCranberry',anchor:[300,222],
  ribbon:[[77,101,20],[14,38,14],[30,50,19]],palette:paper('#dbd2ba','#aa9d83','#f2ecda','#c7b99f'),
  title:'A tall ivory hatbox with a fitted round lid, narrow cranberry ribbon and a small upright bow',note:'Ivory hatbox · A tall cylindrical box, fitted round lid and narrow cranberry silk in a small upright bow.'},
 glacier:{shape:'glacier',scale:[1,1],material:'silk',arrangement:'diagonalPearl',anchor:[350,325],
  ribbon:[[109,113,29],[108,112,30],[100,113,38]],palette:paper('#aac7d1','#6f8c9b','#d8e9eb','#b7d2da'),
  title:'A shallow glacier-blue linen square box with wide pearl ribbon and a flat diagonal corner bow',note:'Glacier linen · A shallow square box, fine woven texture and wide pearl ribbon laid flat across one corner.'},
 plumStep:{shape:'plumStep',scale:[1,1],material:'silk',arrangement:'antiqueDouble',anchor:[289,250],
  ribbon:[[81,112,31],[60,95,43],[23,67,55]],palette:paper('#513149','#2b1b2e','#7b556f','#a88a9e'),
  title:'A deep dark-plum rectangular box with a stepped fitted lid, two antique-gold bands and a compact double bow',note:'Plum tiered case · A deep rectangular box, stepped fitted lid, twin fine antique-gold bands and a compact double bow.'},
 evergreen:{shape:'evergreen',scale:[1,1],material:'grosgrain',arrangement:'looseEvergreen',anchor:[294,287],
  ribbon:[[13,43,13],[40,64,18],[26,43,16]],palette:paper('#ded5b9','#aaa58c','#f4ecd8','#c4b99a'),
  title:'A cream hexagonal box with subtle evergreen sprigs, green grosgrain and a loose long-tailed bow',note:'Evergreen hexagon · A fitted cream box, subtle sprig print and deep green grosgrain tied loosely with long tails.'}
});
Object.assign(arrangements, {
 uprightCranberry:[strand(12,[[333,194],[322,202,310,214,300,222],[290,235,284,250,280,268],[280,312,280,367,280,416]],{flat:true}),
  loop(300,222,-25,-48,12),loop(300,222,24,-45,12),tail(297,225,-22,56,11),tail(304,225,23,66,11),
  strand(10,[[298,215],[307,212,312,225,302,231],[293,231,290,221,298,215]],{flat:true})],
 diagonalPearl:[strand(29,[[421,282],[396,292,370,310,350,325],[343,335,336,343,329,350],[328,371,326,394,325,418]],{flat:true}),
  strand(26,[[350,325],[329,327,303,344,306,354],[321,361,344,341,350,325]],{flat:true,bow:true}),
  strand(26,[[350,325],[365,303,386,289,397,296],[398,311,369,325,350,325]],{flat:true,bow:true}),
  tail(347,329,-34,42,25),tail(353,325,47,6,25),strand(22,[[344,317],[352,318,358,326,359,334]],{flat:true})],
 antiqueDouble:[strand(9,[[335,225],[319,234,303,243,289,250],[284,263,278,277,275,294],[275,330,275,368,275,405]],{flat:true}),
  strand(9,[[290,220],[278,228,265,239,255,251],[246,262,240,274,235,286],[235,322,235,361,235,400]],{flat:true}),
  loop(289,250,-33,-25,11),loop(289,250,-21,-39,9),loop(289,250,35,-23,11),loop(289,250,23,-37,9),
  tail(286,253,-25,40,9),tail(293,253,26,44,9),strand(10,[[286,243],[297,240,301,254,291,260],[281,258,279,249,286,243]],{flat:true})],
 looseEvergreen:[strand(23,[[328,247],[317,260,305,274,294,287],[285,302,280,322,278,346],[278,368,278,392,278,414]],{flat:true}),
  loop(294,287,-65,-27,23),loop(294,287,70,-40,23),
  strand(22,[[289,292],[257,315,270,356,230,401]],{bow:true}),strand(22,[[300,292],[333,316,327,365,359,408]],{bow:true}),
  strand(18,[[289,277],[310,273,320,294,300,306],[280,307,276,285,289,277]],{flat:true})]
});
Object.assign(releasePlans, {
 uprightCranberry:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:2900,peel:3100,edge:4250,settled:5250,lid:5450,sides:[180,421]},
 diagonalPearl:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:2700,peel:2900,edge:3900,settled:4850,lid:5050,sides:[132,462]},
 antiqueDouble:{loops:[[2,3],[4,5]],tails:[6,7],collars:[8],cross:[1],loopEnd:3700,peel:3900,edge:5000,settled:5900,lid:6100,sides:[135,466]},
 looseEvergreen:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:3300,peel:3550,edge:4650,settled:5600,lid:5800,sides:[167,443]}
});
document.querySelector('svg defs').insertAdjacentHTML('beforeend',`
 <pattern id="glacier-linen" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 1H7M1 0V7" stroke="#f3f6ed" stroke-width=".65" opacity=".2"/><path d="M0 4H7M4 0V7" stroke="#355f70" stroke-width=".55" opacity=".12"/></pattern>
 <pattern id="evergreen-sprigs" width="58" height="50" patternUnits="userSpaceOnUse"><g fill="none" stroke="#45684c" stroke-width=".85" opacity=".23" stroke-linecap="round"><path d="M18 11L34 36M22 17l-9-2m12 7-12-2m15 7-12-1m15 6-11-1M23 18l3-9m0 14 4-12m-1 17 5-12m-2 17 6-10"/></g></pattern>`);

// Days 21–24: solid fitted boxes; each tied ribbon uses the shared release renderer.
Object.assign(constructions, {
 mulberry:{base:'M153 323L214 282L458 313L407 357V416L153 386Z',
  lid:`<path d="M142 305L203 263L470 294L407 337Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/>
   <path d="M142 305L203 263L470 294L407 337Z" fill="url(#mulberry-velvet)"/>
   <path d="M142 305L407 337V355L142 323Z" fill="url(#lid-front)"/><path d="M407 337L470 294V312L407 355Z" fill="url(#paper-side)"/>
   <path d="M144 306L407 338L468 295M145 320L407 352L467 311" fill="none" stroke="#bf839e" stroke-width=".8" opacity=".7"/>`,
  body:`<path d="M153 327L407 357V416L153 386Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/><path d="M407 357L458 323V382L407 416Z" fill="url(#paper-side)"/>
   <path d="M153 327L407 357V416L153 386Z" fill="url(#paper-bloom)"/><path d="M153 327L407 357V416L153 386Z" fill="url(#mulberry-velvet)"/>
   <path d="M156 330L406 360V364L156 334Z" fill="#341b2c" opacity=".32"/><path d="M157 383L405 412L455 380" fill="none" stroke="#b47b95" stroke-width=".7" opacity=".55"/>`},
 ivoryStripe:{base:'M190 253L256 209L420 229L350 276V421L190 401Z',
  lid:`<path d="M180 231L249 186L430 208L358 257Z" fill="url(#lid-top)" filter="url(#paper-fibre)"/><path d="M180 231L249 186L430 208L358 257Z" fill="url(#ivory-top-stripes)"/>
   <path d="M180 231L358 257V279L180 253Z" fill="url(#lid-front)"/><path d="M358 257L430 208V230L358 279Z" fill="url(#paper-side)"/>
   <path d="M182 232L358 258L428 209M182 250L358 276L428 229" fill="none" stroke="#fff6df" stroke-width=".9" opacity=".8"/>`,
  body:`<path d="M190 256L350 280V421L190 401Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/><path d="M350 280L420 233V374L350 421Z" fill="url(#paper-side)"/>
   <path d="M190 256L350 280V421L190 401Z M350 280L420 233V374L350 421Z" fill="url(#ivory-pinstripe)"/>
   <path d="M190 256L350 280V421L190 401Z" fill="url(#paper-bloom)"/><path d="M192 259L349 283V288L192 264Z" fill="#84765e" opacity=".2"/>
   <path d="M194 397L348 417L417 372M353 285V414" fill="none" stroke="#fff4d8" stroke-width=".8" opacity=".7"/>`},
 brassOval:{base:'M146 328C146 304 215 285 300 285S454 304 454 328V368C454 394 385 414 300 414S146 394 146 368Z',
  lid:`<ellipse cx="300" cy="315" rx="164" ry="46" fill="url(#brass-rim)"/>
   <path d="M136 315C136 340 209 361 300 361S464 340 464 315V329C464 355 391 377 300 377S136 355 136 329Z" fill="url(#brass-rim)"/>
   <path d="M136 315C136 340 209 361 300 361S464 340 464 315V329C464 355 391 377 300 377S136 355 136 329Z" fill="url(#brass-brush)"/>
   <ellipse cx="300" cy="313" rx="159" ry="42" fill="url(#lid-top)" filter="url(#paper-fibre)"/><ellipse cx="300" cy="313" rx="156" ry="39" fill="none" stroke="#b9a16b" stroke-width=".65" opacity=".65"/>
   <path d="M139 331C151 355 218 374 300 374S449 355 461 331" fill="none" stroke="#e2cf9c" stroke-width=".9" opacity=".7"/>`,
  body:`<path d="M146 334C146 359 215 379 300 379S454 359 454 334V368C454 394 385 414 300 414S146 394 146 368Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M146 334C146 359 215 379 300 379S454 359 454 334V368C454 394 385 414 300 414S146 394 146 368Z" fill="url(#paper-bloom)"/>
   <path d="M151 372C162 394 224 410 300 410S438 394 449 372" fill="none" stroke="#759079" stroke-width=".8" opacity=".6"/>`},
 christmasEve:{base:'M177 268L224 232L425 253L437 258V374L390 410L369 421L189 399L177 389Z',
  lid:`<path d="M171 247L219 210L242 209L430 230L443 236L395 274L372 276L184 252Z" fill="url(#lid-front)" filter="url(#paper-fibre)"/>
   <path d="M184 246L223 218L242 216L423 237L430 241L391 267L371 268L190 248Z" fill="url(#lid-top)"/>
   <path d="M184 246L223 218L242 216L423 237L430 241L391 267L371 268L190 248Z" fill="url(#eve-foil)"/>
   <path d="M443 236L395 274L372 276L184 252L171 247V269L184 274L372 298L395 296L443 258Z" fill="url(#lid-front)"/>
   <path d="M395 274L443 236V258L395 296L372 298V276Z" fill="url(#paper-side)"/>
   <path d="M173 247L185 253L372 277L395 275L441 237M174 267L185 272L372 295L394 293L440 257" fill="none" stroke="#b1c4db" stroke-width=".85" opacity=".7"/>
   <path d="M184 246L223 218L242 216L423 237L430 241L391 267L371 268L190 248Z" fill="none" stroke="#bed0e3" stroke-width=".6" opacity=".5"/>`,
  body:`<path d="M177 268L189 277L369 298L390 290L437 258V374L390 410L369 421L189 399L177 389Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M390 290L437 258V374L390 410L369 421V298Z" fill="url(#paper-side)"/><path d="M177 268L189 277V399L177 389Z" fill="#63728e" opacity=".2"/>
   <path d="M189 277L369 298V421L189 399Z" fill="url(#paper-bloom)"/>
   <path d="M200 292L359 311V407L200 388Z" fill="none" stroke="#9db6d0" stroke-width=".7" opacity=".42"/>
   <path d="M204 301l2-5 2 6 5 2-5 1-2 5-2-6-5-2Z M349 392l2-5 2 6 5 2-5 1-2 5-2-6-5-2Z" fill="#c9d8e7" opacity=".65"/>
   <path d="M191 395L369 417L389 407L434 373" fill="none" stroke="#849cba" stroke-width=".8" opacity=".7"/>`}
});
Object.assign(designs, {
 mulberry:{shape:'mulberry',scale:[1,1],material:'satin',arrangement:'softCopper',anchor:[296,304],ribbon:[[105,112,24],[46,90,38],[21,66,45]],palette:paper('#6e314f','#3b2037','#955874','#b17a96'),title:'A wide low mulberry velvet box with broad copper satin and a soft bow with one long tail',note:'Mulberry velvet · A low fitted box, soft copper satin loops and one long flowing tail.'},
 ivoryStripe:{shape:'ivoryStripe',scale:[1,1],material:'silk',arrangement:'frontRed',anchor:[284,243],ribbon:[[102,117,18],[10,32,14],[19,37,18]],palette:paper('#e1d8bf','#b2a38a','#f4ecd9','#c6b38e'),title:'A tall warm-ivory square box with fine gold pinstripes and a small upright red bow near the front edge',note:'Ivory pinstripe · Fine gold rules, a fitted square lid and narrow red silk tied upright at the front.'},
 brassOval:{shape:'brassOval',scale:[1,1],material:'silk',arrangement:'flatCream',anchor:[296,307],ribbon:[[108,114,28],[100,110,32],[77,99,49]],palette:paper('#214c41','#102b26','#476a59','#84977a'),title:'A shallow deep-evergreen oval box with a brushed-brass rim, wide cream ribbon and a low flat bow',note:'Evergreen oval · A shallow fitted brass-edged lid, wide cream silk and flat laid loops.'},
 christmasEve:{shape:'christmasEve',scale:[1,1],material:'silk',arrangement:'layeredEve',anchor:[300,237],ribbon:[[61,111,45],[82,118,39],[108,126,21]],palette:paper('#22354f','#101c32','#405774','#839bb9'),title:'A deep midnight-blue clipped-corner box with a beveled fitted lid, silver foil and a full layered silver-blue bow',note:'Christmas Eve · A softly beveled midnight box, quiet silver foil and a full six-loop silver-blue bow.'}
});
Object.assign(arrangements, {
 softCopper:[strand(32,[[334,278],[322,285,306,297,296,304],[286,316,282,327,281,338],[281,360,281,385,281,405]],{flat:true}),loop(296,304,-65,-30,28),loop(296,304,73,-37,29),tail(291,309,-42,40,26),strand(29,[[301,309],[339,330,325,378,362,410]],{bow:true}),strand(25,[[289,293],[310,287,322,312,300,324],[280,323,277,302,289,293]],{flat:true})],
 frontRed:[strand(10,[[337,202],[319,214,298,232,284,243],[283,247,283,252,283,255],[283,310,283,366,283,415]],{flat:true}),loop(284,243,-21,-39,10),loop(284,243,21,-37,10),tail(281,246,-17,35,9),tail(288,246,19,46,9),strand(8,[[281,237],[290,234,295,247,286,252],[278,251,275,242,281,237]],{flat:true})],
 flatCream:[strand(31,[[334,276],[322,284,306,299,296,307],[285,322,276,342,270,356],[270,376,270,396,270,412]],{flat:true}),strand(28,[[296,307],[272,293,213,290,214,307],[222,327,273,315,296,307]],{flat:true,bow:true}),strand(28,[[296,307],[321,289,375,287,379,304],[372,323,319,316,296,307]],{flat:true,bow:true}),tail(291,311,-50,36,26),tail(302,311,53,35,26),strand(24,[[287,299],[303,294,315,312,303,320],[287,323,277,309,287,299]],{flat:true})],
 layeredEve:[strand(25,[[337,219],[324,224,310,232,300,237],[290,248,284,259,280,267],[280,315,280,365,280,414]],{flat:true}),loop(300,237,-70,-50,26),loop(300,237,-46,-73,22),loop(300,237,-22,-82,18),loop(300,237,70,-50,26),loop(300,237,46,-73,22),loop(300,237,22,-82,18),tail(295,242,-51,95,24),tail(306,242,54,109,25),strand(23,[[291,226],[309,219,324,242,306,256],[285,258,279,237,291,226]],{flat:true})]
});
Object.assign(releasePlans, {
 softCopper:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:3450,peel:3700,edge:4850,settled:5750,lid:5950,sides:[135,471]},
 frontRed:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:2650,peel:2850,edge:3900,settled:4900,lid:5100,sides:[169,442]},
 flatCream:{loops:[[1],[2]],tails:[3,4],collars:[5],cross:[],loopEnd:3000,peel:3250,edge:4400,settled:5350,lid:5550,sides:[126,475]},
 layeredEve:{loops:[[1,2,3],[4,5,6]],tails:[7,8],collars:[9],cross:[],loopEnd:4800,peel:5000,edge:6100,settled:7000,lid:7250,sides:[155,456]}
});
document.querySelector('svg defs').insertAdjacentHTML('beforeend',`
 <pattern id="mulberry-velvet" width="4" height="5" patternUnits="userSpaceOnUse"><path d="M1 0v2M3 3v2" stroke="#e9b6cc" stroke-width=".55" opacity=".13"/></pattern>
 <pattern id="ivory-pinstripe" width="16" height="16" patternUnits="userSpaceOnUse"><path d="M4 0V16" stroke="#af8c4c" stroke-width=".65" opacity=".42"/></pattern>
 <pattern id="ivory-top-stripes" href="#ivory-pinstripe" patternTransform="rotate(55)"/>
 <linearGradient id="brass-rim"><stop stop-color="#7b633e"/><stop offset=".27" stop-color="#d1bc87"/><stop offset=".53" stop-color="#ac8f58"/><stop offset=".76" stop-color="#c2aa70"/><stop offset="1" stop-color="#6c5736"/></linearGradient>
 <pattern id="brass-brush" width="11" height="3" patternUnits="userSpaceOnUse"><path d="M0 1H11" stroke="#fff0bc" stroke-width=".45" opacity=".2"/></pattern>
 <pattern id="eve-foil" width="51" height="41" patternUnits="userSpaceOnUse"><path d="M13 9l1.5-4 1.5 4 4 1.5-4 1.5-1.5 4-1.5-4-4-1.5Z" fill="#d4e4f2" opacity=".38"/><circle cx="39" cy="30" r=".75" fill="#e5eef7" opacity=".55"/></pattern>`);

// Christmas Day: embossed champagne case and a broad cranberry velvet bow.
Object.assign(constructions, {
 christmasDay:{base:'M155 273L218 231L451 258L390 307V421L155 393Z',
  lid:`<path d="M146 251L214 207L460 237L390 285Z" fill="url(#lid-front)" filter="url(#paper-fibre)"/>
   <path d="M157 249L218 216L447 241L387 275Z" fill="url(#lid-top)"/>
   <path d="M157 249L218 216L447 241L387 275Z" fill="url(#champagne-stars)"/>
   <path d="M146 251L390 285V307L146 273Z" fill="url(#lid-front)"/><path d="M390 285L460 237V259L390 307Z" fill="url(#paper-side)"/>
   <path d="M148 252L390 286L458 238M149 270L390 303L457 258" fill="none" stroke="#f8e3b4" stroke-width=".9" opacity=".8"/>

   <path d="M157 249L218 216L447 241L387 275Z" fill="none" stroke="#ffefc9" stroke-width=".75" opacity=".65"/>
   <path d="M167 247L222 222L432 245L384 269Z" fill="url(#paper-reflection)" opacity=".24"/>`,
  body:`<g class="christmas-seam" opacity="0" aria-hidden="true">
    <path d="M155 267L390 296L451 253V261L390 304L155 275Z" fill="#fff6da"/>
    <path d="M155 274L390 303L451 260" fill="none" stroke="#fffdf4" stroke-width="5" stroke-linejoin="round"/>
    <path d="M155 274L390 303L451 260" fill="none" stroke="#ffe7aa" stroke-width="14" opacity=".65" filter="url(#reflection-soft)"/>
   </g><path d="M155 278L390 307V421L155 393Z" fill="url(#paper-front)" filter="url(#paper-fibre)"/>
   <path d="M390 307L451 265V378L390 421Z" fill="url(#paper-side)"/>
   <path d="M155 278L390 307V421L155 393Z" fill="url(#paper-bloom)"/>
   <path d="M162 284L383 312V412L162 386Z" fill="url(#champagne-stars)"/>
   <path d="M155 278L162 284V386L155 393Z" fill="#f2dfb6" opacity=".35"/>
   <path d="M162 386L383 412L390 421L155 393Z" fill="#856c48" opacity=".16"/>
   <path d="M383 312L390 307V421L383 412Z" fill="#766145" opacity=".17"/>
   <path d="M164 288L381 315V407L164 382Z" fill="none" stroke="#f4e0b4" stroke-width=".65" opacity=".6"/>
   <path d="M158 391L389 418L448 377M393 311V414" fill="none" stroke="#f2dfb7" stroke-width=".8" opacity=".75"/>`}
});
Object.assign(designs, {
 christmasDay:{shape:'christmasDay',lidOpenDuration:4200,lidLiftDelay:3200,scale:[1,1],material:'velvet',arrangement:'christmasVelvet',anchor:[297,248],ribbon:[[68,83,18],[18,35,16],[33,46,20]],palette:paper('#c4ad7f','#87714f','#e3ce9f','#d6bf8e'),title:'A deep champagne-gold Christmas box with beveled edges, embossed stars and a generous cranberry velvet bow with two long tails',note:'Christmas Day · Embossed champagne gold, a fitted beveled lid and layered cranberry velvet with two long tails.'}
});
Object.assign(arrangements, {
 christmasVelvet:[strand(34,[[336,225],[321,231,308,241,297,248],[286,261,279,275,275,290],[275,331,275,375,275,408]],{flat:true}),
  loop(297,248,-78,-49,32),loop(297,248,-51,-70,28),loop(297,248,-25,-81,22),
  loop(297,248,80,-46,32),loop(297,248,53,-68,28),loop(297,248,26,-79,22),
  strand(30,[[290,252],[260,281,267,344,231,414]],{bow:true}),strand(30,[[305,252],[337,285,328,357,364,417]],{bow:true}),
  strand(27,[[287,237],[310,228,325,253,306,269],[282,271,274,248,287,237]],{flat:true})]
});
Object.assign(releasePlans, {
 christmasVelvet:{loops:[[1,2,3],[4,5,6]],tails:[7,8],collars:[9],cross:[],
  outerRelax:[250,1100],loopStarts:[[1550,2500,3300],[1350,2300,3100]],tailTug:[1450,2450],collarLoosen:[1050,1750],collarOpen:[1750,4400],
  loopEnd:4500,peel:4800,edge:5900,settled:6800,lid:7050,sides:[137,468]}
});
document.querySelector('svg defs').insertAdjacentHTML('beforeend',`
 <pattern id="champagne-stars" width="48" height="43" patternUnits="userSpaceOnUse">
  <path d="M20 9l2.4 5.4 5.8.6-4.3 4 1.2 5.8-5.1-2.9-5.1 2.9 1.2-5.8-4.3-4 5.8-.6Z" transform="translate(.65 .8)" fill="none" stroke="#80653f" stroke-width=".8" opacity=".24"/>
  <path d="M20 9l2.4 5.4 5.8.6-4.3 4 1.2 5.8-5.1-2.9-5.1 2.9 1.2-5.8-4.3-4 5.8-.6Z" fill="none" stroke="#fff1cf" stroke-width=".7" opacity=".43"/>
 </pattern>`);

// Opening waits for material to clear and settle. The original six retain
// their existing 4.9-second timing; these six have construction-specific cues.
for(const design of Object.values(designs))if(design.arrangement) {
 const plan=releasePlans[design.arrangement];
 design.duration=plan.lid+1350;
 design.lidDelay=plan.lid;
 if(design.lidOpenDuration){
  // Leave one display frame after the fully open lid before the burst.
  design.revealDelay=plan.lid+design.lidOpenDuration+30;
  design.cardDelay=design.revealDelay;
  design.lidSoundDelay=plan.lid+design.lidLiftDelay;
  design.duration=design.revealDelay+1350;
 }
}

document.querySelector('svg defs').insertAdjacentHTML('beforeend',`
 <pattern id="frost-emboss" width="42" height="40" patternUnits="userSpaceOnUse"><g fill="none" stroke="#f8ffff" stroke-width=".9" opacity=".75"><path d="M21 9V31M11 14L31 26M11 26L31 14M17 12L21 16L25 12M17 28L21 24L25 28M13 18L18 18L16 13M26 27L25 22L30 22"/></g></pattern>
 <pattern id="rose-damask" width="47" height="49" patternUnits="userSpaceOnUse"><path d="M23 7Q4 17 15 28Q23 19 23 7Q23 19 31 28Q42 17 23 7ZM23 22Q12 37 23 43Q34 37 23 22Z" fill="none" stroke="#f2c9b3" stroke-width=".8" opacity=".35"/></pattern>
 <pattern id="natural-flecks" width="31" height="28" patternUnits="userSpaceOnUse"><path d="M4 8l3 1M17 19l2-3M25 6l-1 2M8 24h2" stroke="#776b4c" stroke-width=".7" opacity=".3"/><path d="M10 13l5 2M23 23l4-1" stroke="#fff4db" opacity=".5"/></pattern>
 <pattern id="case-grain" width="13" height="12" patternUnits="userSpaceOnUse"><path d="M2 3h2M8 8h2" stroke="#b6c5b0" stroke-width=".6" opacity=".22"/><circle cx="7" cy="2" r=".5" fill="#132e38" opacity=".2"/></pattern>`);

buildThumbnails();
selectDesign('crimson');
