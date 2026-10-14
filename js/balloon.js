class BalloonGame {
 constructor(app){this.app=app;this.layer=document.getElementById('balloonLayer');this.balloons=[];this.reserve=[];this.raf=null;this.positions=[];this.animate=this.animate.bind(this);this.colors=['#ff6495','#9269ee','#ffb13f','#33c1e4','#59ce80','#ff8c75','#e975d5','#529eff','#f0ce4c','#3bcab4','#f48a58']}
 start(){document.getElementById('archeryBow')?.classList.remove('hidden');this.layer.classList.remove('hidden');this.layer.innerHTML='';this.balloons=[];this.reserve=this.app.shuffle([...this.app.selected]);this.fill();this.raf=requestAnimationFrame(this.animate)}
 stopMotion(){if(this.raf)cancelAnimationFrame(this.raf);this.raf=null}
 stop(){this.shotToken=(this.shotToken||0)+1;const bow=document.getElementById('archeryBow');bow?.classList.add('hidden');bow?.classList.remove('is-loading','bow-release');bow?.querySelector('.bow-loaded-arrow')?.remove();document.querySelectorAll('.v19-arrow').forEach(a=>a.remove());if(this.raf)cancelAnimationFrame(this.raf);this.raf=null;this.layer.innerHTML='';this.balloons=[];this.reserve=[]}
 count(){return Math.min(Number(this.app.$('balloonCount').value)||4,this.app.selected.length)}
 size(){const w=this.layer.clientWidth||950,h=this.layer.clientHeight||480;const count=this.count();let cols=Math.min(count,Math.max(1,Math.floor(w/135)));let rows=Math.ceil(count/cols);const bw=Math.min(135,Math.max(65,(w-32)/cols*.68));const bh=bw*1.37;const availableH=Math.max(150,h-155);if(rows*bh>availableH){cols=Math.min(count,Math.max(cols,Math.ceil(count/Math.max(1,Math.floor(availableH/125)))));rows=Math.ceil(count/cols)}const scale=Math.min(1,bw/135,Math.max(.52,availableH/(rows*185)));return {w,h,cols,rows,scale}}
 slot(index){const {w,h,cols,rows,scale}=this.size();const row=Math.floor(index/cols),col=index%cols;const rowCount=Math.min(cols,this.count()-row*cols);const usableTop=Math.min(150,Math.max(110,h*.22)),usableBottom=Math.max(usableTop+95,h-110);const spacingY=(usableBottom-usableTop)/Math.max(1,rows);return {x:w*(col+1)/(rowCount+1),y:usableTop+(row+.5)*spacingY,scale}}
 fill(){while(this.balloons.length<this.count()&&this.reserve.length){const n=this.reserve.shift();const slotIndex=this.firstFreeSlot();const b=this.create(n,slotIndex);this.balloons.push(b)}this.relayout();if(this.app.turnWrong>=2&&this.app.$('hintCheck').checked)this.app.showTargetHint()}
 firstFreeSlot(){const taken=new Set(this.balloons.map(b=>b.slot));for(let i=0;i<this.count();i++)if(!taken.has(i))return i;return this.balloons.length}
 create(n,slot){const el=document.createElement('button');el.type='button';el.className='balloon';el.setAttribute('aria-label',`Balloon number ${n}`);el.style.setProperty('--balloon',this.colors[n%this.colors.length]);el.innerHTML=`<span class="balloon-shape"><span class="balloon-number">${n}</span></span><span class="balloon-knot" aria-hidden="true"></span><span class="balloon-string" aria-hidden="true"><svg viewBox="0 0 40 115" preserveAspectRatio="none"><path d="M20 0 C5 21 34 29 19 50 S7 82 24 114" fill="none" stroke="#40566c" stroke-width="3" stroke-linecap="round"/><path d="M20 0 C5 21 34 29 19 50 S7 82 24 114" fill="none" stroke="#f2e8df" stroke-width="1" stroke-linecap="round" opacity=".85"/></svg></span>`;el.addEventListener('click',()=>this.app.answer(n,el));this.layer.append(el);return {n,el,slot,phase:n*1.74+slot*1.13,speed:.9+(n%4)*.15}}
 relayout(){for(const b of this.balloons){const p=this.slot(b.slot);b.x=p.x;b.y=p.y;b.scale=p.scale}}
 available(){return this.balloons.map(b=>b.n)}
 animate(t){if(!this.app.paused){const s=t/1000;const speed=this.app.difficulty==='easy'?1.65:this.app.difficulty==='normal'?2.25:3;for(const b of this.balloons){const driftX=Math.sin(s*b.speed*speed+b.phase)*Math.min(12,16*b.scale);const driftY=Math.cos(s*(b.speed+.12)*speed+b.phase)*Math.min(15,18*b.scale);b.el.style.left=b.x+'px';b.el.style.top=b.y+'px';b.el.style.transform=`translate(-50%,-50%) translate(${driftX}px,${driftY}px) scale(${b.scale})`}}this.raf=requestAnimationFrame(this.animate)}
 shoot(btn,onImpact){
  const area=document.getElementById('gameArea'),bow=document.getElementById('archeryBow');
  const ar=area.getBoundingClientRect(),r=btn.getBoundingClientRect(),br=bow.getBoundingClientRect();
  const targetX=r.left+r.width*.5-ar.left,targetY=r.top+r.height*.36-ar.top;
  const startX=br.left+br.width*.5-ar.left,startY=br.top+br.height*.63-ar.top;
  const dx=targetX-startX,dy=targetY-startY;
  const aim=Math.atan2(dx,-dy)*180/Math.PI;
  bow.style.setProperty('--aim',aim+'deg');
  const token=(this.shotToken=(this.shotToken||0)+1);
  const valid=()=>token===this.shotToken&&this.app.screen==='play';
  // Create a temporary nocked arrow only after the learner chooses a balloon.
  bow.querySelector('.bow-loaded-arrow')?.remove();
  const nocked=document.createElementNS('http://www.w3.org/2000/svg','g');
  nocked.setAttribute('class','bow-loaded-arrow');
  nocked.innerHTML='<path d="M110 132 V14" stroke="#7d4c2d" stroke-width="8" stroke-linecap="round"/><path d="M110 132 V14" stroke="#eac78b" stroke-width="3" stroke-linecap="round"/><path d="M98 35 L110 6 L122 35Z" fill="#dbe7ed" stroke="#587789" stroke-width="2"/><path d="M110 132 L95 150 L110 142 L125 150Z" fill="#e47f9e" stroke="#a84665" stroke-width="2"/>';
  bow.querySelector('.bow-rotor')?.append(nocked);
  bow.classList.add('is-loading');
  const arrow=document.createElement('div');arrow.className='flying-arrow v19-arrow';
  arrow.innerHTML='<svg viewBox="0 0 44 160" aria-hidden="true"><path d="M22 151 V25" stroke="#704123" stroke-width="7" stroke-linecap="round"/><path d="M22 151 V25" stroke="#f0bf76" stroke-width="3" stroke-linecap="round"/><path d="M7 34 L22 2 L37 34 L22 26Z" fill="#dbe9f0" stroke="#668395" stroke-width="2"/><path d="M22 146 L6 157 L17 132 L22 139 L27 132 L38 157Z" fill="#e8759c" stroke="#ae496e" stroke-width="2"/></svg>';
  arrow.style.left=startX+'px';arrow.style.top=startY+'px';arrow.style.visibility='hidden';area.append(arrow);
  let done=false;
  const cleanup=()=>{if(done)return false;done=true;arrow.remove();bow.classList.remove('bow-release','is-loading');bow.querySelector('.bow-loaded-arrow')?.remove();return true};
  const distance=Math.hypot(dx,dy),flight=Math.max(260,Math.min(520,distance/1.85));
  const pose=(x,y)=>`translate(${x}px,${y}px) rotate(${aim}deg) translate(-50%,0)`;
  // Aim, draw the string, then release. Flight begins only after release.
  bow.classList.remove('bow-release');void bow.offsetWidth;
  this.app.schedule(()=>{
   if(!valid()){cleanup();return}
   bow.classList.remove('is-loading');nocked.remove();arrow.style.visibility='visible';bow.classList.add('bow-release');audio.effect('bow');
   const animation=arrow.animate([{transform:pose(0,0),opacity:1},{transform:pose(dx,dy),opacity:1}],{duration:flight,easing:'linear',fill:'forwards'});
   this.app.schedule(()=>{if(valid())audio.effect('whoosh')},45);
   const hit=()=>{if(!cleanup())return;if(valid())onImpact()};
   animation.onfinish=hit;this.app.schedule(hit,flight+65);
  },180);
 }

 correct(btn){const b=this.balloons.find(item=>item.el===btn);if(!b)return;const r=btn.getBoundingClientRect(),area=document.getElementById('gameArea').getBoundingClientRect();this.app.particles(r.left+r.width/2-area.left,r.top+r.height*.32-area.top);btn.classList.add('pop');btn.disabled=true;this.balloons=this.balloons.filter(item=>item!==b);setTimeout(()=>btn.remove(),380);this.app.schedule(()=>{if(this.app.screen==='play')this.fill()},390)}
 wrong(btn){btn.classList.remove('wrong');void btn.offsetWidth;btn.classList.add('wrong');setTimeout(()=>btn.classList.remove('wrong'),440)}
}
window.BalloonGame=BalloonGame;
