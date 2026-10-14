class CrocodileGame {
 constructor(app){this.app=app;this.layer=document.getElementById('crocLayer');this.upper=document.getElementById('upperTeethSvg');this.lower=document.getElementById('lowerTeethSvg');this.remaining=[];this.toothMap=new Map()}
 start(){this.layer.className='croc-layer';this.remaining=this.app.shuffle([...this.app.selected]);this.render()}
 stop(){this.layer.className='croc-layer hidden';this.upper.replaceChildren();this.lower.replaceChildren();this.remaining=[];this.toothMap.clear()}
 render(){
  this.upper.replaceChildren();this.lower.replaceChildren();this.toothMap.clear();
  // Coordinates are tied to the ACTUAL green lip contours in the 1100x720 crocodile SVG.
  // Upper border: centre (550,322), sides (340/760,302).
  // Lower border: centre (550,665), sides (370/730,638).
  // Every tooth is identical in size. Each root touches its jaw's green rim.
  const numbers=this.remaining;
  const top=numbers.filter((_,i)=>i%2===0);
  const bottom=numbers.filter((_,i)=>i%2===1);
  const svgNS='http://www.w3.org/2000/svg';
  const make=(tag,attrs={})=>{const el=document.createElementNS(svgNS,tag);for(const [k,v] of Object.entries(attrs))el.setAttribute(k,String(v));return el};
  const draw=(list,isTop)=>list.forEach((n,i)=>{
   // Fixed-size tooth width 62, height 73; enough spacing even with six upper teeth.
   const spread=isTop?410:360;
   const x=550+(list.length===1?0:(i/(list.length-1)-.5)*spread);
   const dx=x-550;
   // Match the jaw outline instead of positioning teeth on a horizontal row.
   const rootY=isTop?322-0.00047*dx*dx:665-0.00083*dx*dx;
   // Tangent of the gum curve: the tooth rotates WITH the green lip border.
   const slope=isTop?-0.00094*dx:-0.00166*dx;
   const angle=Math.atan(slope)*180/Math.PI;
   const anchor=make('g',{transform:`translate(${x.toFixed(2)} ${rootY.toFixed(2)}) rotate(${angle.toFixed(2)})`,class:'tooth-anchor'});
   const tooth=make('g',{tabindex:0,role:'button','aria-label':`Tooth number ${n}`});
   tooth.classList.add('croc-tooth');tooth.dataset.number=String(n);
   // Tooth root (y=0) sits flush on the green mouth rim; body extends into mouth.
   const d=isTop
    ?'M-31,-3 Q0,-8 31,-3 L29,33 Q25,57 15,67 Q0,76 -15,67 Q-25,57 -29,33 Z'
    :'M-31,3 Q0,8 31,3 L29,-33 Q25,-57 15,-67 Q0,-76 -15,-67 Q-25,-57 -29,-33 Z';
   const shape=make('path',{d,fill:'url(#crocTooth)',stroke:'#c6d5c9','stroke-width':3.5,'stroke-linejoin':'round'});
   const shine=make('path',{d:isTop?'M-20,10 Q-24,29 -17,45':'M-20,-10 Q-24,-29 -17,-45',fill:'none',stroke:'#fff','stroke-width':5,'stroke-linecap':'round',opacity:.85});
   // Counter-rotate the number to stay upright and legible to children.
   const cy=isTop?36:-35;
   const label=make('text',{x:0,y:cy,'text-anchor':'middle','dominant-baseline':'middle',transform:`rotate(${(-angle).toFixed(2)} 0 ${cy})`});
   label.textContent=n;label.setAttribute('font-size',n===10?'35':'43');
   const face=make('g',{class:'tooth-visual'});
   face.append(shape,shine,label);tooth.append(face);
   tooth.addEventListener('click',()=>this.app.answer(n,tooth));
   tooth.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();this.app.answer(n,tooth)}});
   anchor.append(tooth);(isTop?this.upper:this.lower).append(anchor);this.toothMap.set(n,tooth);
  });
  draw(top,true);draw(bottom,false);
 }

 press(n,el,correct,resolve){
  // One five-finger hand, index fingertip touches the actual selected tooth first.
  // All actions are scheduled in order; one wrong answer produces exactly one bite.
  const layer=this.layer,hand=layer.querySelector('#biteHand');
  if(!el||!el.isConnected){resolve();return}
  layer.classList.remove('finger-press','finger-touch','finger-wrong','finger-right','biting','happy','injured','jaw-closing','jaw-closed','jaw-opening','bite-impact');
  const rect=el.getBoundingClientRect(),box=layer.getBoundingClientRect();
  const x=rect.left+rect.width/2-box.left,y=rect.top+rect.height/2-box.top;
  hand.style.left=x+'px';hand.style.top=y+'px';
  void layer.offsetWidth;
  const later=(fn,ms)=>this.app.schedule(fn,ms);
  layer.classList.add('finger-press');audio.effect('reach');
  // 0–600ms: whole hand approaches with extended index finger; no feedback.
  later(()=>{
   layer.classList.remove('finger-press');layer.classList.add('finger-touch');audio.effect('tap');
   // 600–730ms: fingertip depresses tooth; evaluate only AFTER contact.
   later(()=>{
    if(correct){
     layer.classList.remove('finger-touch');layer.classList.add('finger-right');
     resolve();later(()=>layer.classList.remove('finger-right'),540);return;
    }
    if(!this.app.$('biteCheck').checked){
     layer.classList.remove('finger-touch');layer.classList.add('finger-wrong');
     resolve();later(()=>layer.classList.remove('finger-wrong'),500);return;
    }
    // 730–990ms: jaw closes once while fingertip remains at tooth.
    layer.classList.add('jaw-closing');
    later(()=>{
     layer.classList.remove('jaw-closing');layer.classList.add('jaw-closed','bite-impact','injured');
     audio.effect('bite');
     // 990–1180ms: single bite impact, hold briefly, show cartoon bite marks.
     later(()=>{
      layer.classList.remove('bite-impact','jaw-closed','finger-touch');
      layer.classList.add('jaw-opening','finger-wrong');
      // 1180–1630ms: mouth reopens as hand withdraws; feedback after animation.
      later(()=>{
       layer.classList.remove('jaw-opening','injured','finger-wrong');
       resolve();
      },450);
     },190);
    },260);
   },130);
  },600);
 }

 correct(n,el){if(!this.toothMap.has(n))return;this.layer.classList.add('happy');el.classList.add('removed');el.setAttribute('tabindex','-1');el.style.pointerEvents='none';this.remaining=this.remaining.filter(x=>x!==n);this.toothMap.delete(n);this.app.schedule(()=>{el.remove();this.layer.classList.remove('happy')},630)}
 wrong(){}
}
window.CrocodileGame=CrocodileGame;
