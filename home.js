if(!document.querySelector('link[data-hx-layout]')){
  const layout=document.createElement('link');
  layout.rel='stylesheet';
  layout.href='/layout.css?v=20260905-4';
  layout.setAttribute('data-hx-layout','');
  document.head.appendChild(layout);
}

const sidebar=document.querySelector('.site-sidebar');
const sidebarOverlay=document.querySelector('.sidebar-overlay');
const menuButton=document.querySelector('.mobile-menu-button');

function ensureSidebarExtras(){
  const scroll=sidebar?.querySelector('.sidebar-scroll');
  if(!scroll)return;
  if(!scroll.querySelector('[data-sidebar-sites]')){
    const group=document.createElement('section');
    group.className='sidebar-group';
    group.setAttribute('data-sidebar-sites','');
    group.innerHTML='<p class="sidebar-label">站点</p><nav class="sidebar-nav"><a class="sidebar-link" href="https://hx.mizuki.top" target="_blank" rel="noreferrer"><span class="sidebar-icon">HX</span><span>Hong Xing</span><span class="external">↗</span></a><a class="sidebar-link" href="https://qso.mizuki.top" target="_blank" rel="noreferrer"><span class="sidebar-icon">Q</span><span>QSO 档案</span><span class="external">↗</span></a><a class="sidebar-link" href="https://qsl.mizuki.top" target="_blank" rel="noreferrer"><span class="sidebar-icon">QSL</span><span>QSL 卡片</span><span class="external">↗</span></a><a class="sidebar-link" href="https://help.mizuki.top/status" target="_blank" rel="noreferrer"><span class="sidebar-icon">S</span><span>服务状态</span><span class="external">↗</span></a></nav>';
    scroll.appendChild(group);
  }
  if(!scroll.querySelector('[data-sidebar-friends]')){
    const group=document.createElement('section');
    group.className='sidebar-group';
    group.setAttribute('data-sidebar-friends','');
    group.innerHTML='<p class="sidebar-label">友链</p><nav class="sidebar-nav"><a class="sidebar-link" href="https://ba4slt.cn" target="_blank" rel="noreferrer"><span class="sidebar-icon">4S</span><span>BA4SLT</span><span class="external">↗</span></a><a class="sidebar-link" href="https://www.bd4rfg.cn" target="_blank" rel="noreferrer"><span class="sidebar-icon">4R</span><span>BD4RFG</span><span class="external">↗</span></a><a class="sidebar-link" href="https://ba4sbf.cn" target="_blank" rel="noreferrer"><span class="sidebar-icon">4B</span><span>BA4SBF</span><span class="external">↗</span></a></nav>';
    scroll.appendChild(group);
  }
  const friendGrid=document.querySelector('.friend-link-grid');
  if(friendGrid&&!friendGrid.querySelector('a[href="https://ba4sbf.cn"]')){
    friendGrid.insertAdjacentHTML('beforeend','<a class="site-link-card" href="https://ba4sbf.cn" target="_blank" rel="noreferrer"><span class="site-link-type">FRIEND</span><h3>BA4SBF</h3><p>ba4sbf.cn</p><span class="site-link-arrow">↗</span></a>');
  }
}
ensureSidebarExtras();

function setMenu(open){
  sidebar?.classList.toggle('is-open',open);
  sidebarOverlay?.classList.toggle('is-open',open);
  sidebarOverlay?.setAttribute('aria-hidden',String(!open));
  menuButton?.classList.toggle('is-open',open);
  menuButton?.setAttribute('aria-expanded',String(open));
  menuButton?.setAttribute('aria-label',open?'关闭菜单':'打开菜单');
  document.body.style.overflow=open?'hidden':'';
}
menuButton?.addEventListener('click',()=>setMenu(!sidebar?.classList.contains('is-open')));
sidebarOverlay?.addEventListener('click',()=>setMenu(false));
sidebar?.querySelectorAll('a').forEach((link)=>link.addEventListener('click',()=>setMenu(false)));
document.addEventListener('keydown',(event)=>{if(event.key==='Escape')setMenu(false)});
window.addEventListener('resize',()=>{if(innerWidth>900)setMenu(false)});

const revealItems=document.querySelectorAll('.reveal');
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){
  const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{
    if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
  }),{threshold:.07});
  revealItems.forEach((item)=>observer.observe(item));
}else revealItems.forEach((item)=>item.classList.add('is-visible'));

const projectPreview={
  mizuki:{kicker:'ANDROID / MAIMAI DX',title:'Amia Sync Android',state:'重做中',desc:'舞萌 DX 的 Android 客户端。玩家信息、成绩和曲库都在手机上看，最近主要在重做界面和交互。',stack:['Kotlin','Android','FastAPI'],flow:['玩家数据','同步服务','Android'],metaLeft:'Amia-Sync-Android',metaRight:'UI 重做'},
  ham:{kicker:'WINDOWS / RADIO',title:'业余无线电点名助手',state:'维护中',desc:'中继点名现场用的 Windows 本地录入工具。先把记录写进 SQLite，需要协作时再同步到 Excel。',stack:['Python','SQLite','Excel'],flow:['现场输入','本地记录','Excel'],metaLeft:'ham-checkin-assistant',metaRight:'Windows'},
  retro:{kicker:'HARDWARE / MONITOR',title:'Retro Monitor',state:'公开',desc:'把 Windows 硬件状态接到 Home Assistant，再送到 ESP32-S3 桌面终端。',stack:['C#','Home Assistant','ESP32-S3'],flow:['Windows','Home Assistant','ESP32-S3'],metaLeft:'retro-monitor',metaRight:'硬件监控'},
  hongxing:{kicker:'WEB / HONG XING',title:'Hong Xing 官网',state:'在线',desc:'hx.mizuki.top 的源码。项目、更新、生命周期、基础设施和相关服务都放在这个站里。',stack:['Static Web','Cloudflare Pages','HTML/CSS/JS'],flow:['HongXingWeb','Cloudflare Pages','hx.mizuki.top'],metaLeft:'HongXingWeb',metaRight:'hx.mizuki.top'},
  amia:{kicker:'BOT / RHYTHM GAME',title:'Amia · Mizuki',state:'维护中',desc:'开发组这边主要维护 Bot、PJSK、舞萌相关插件和公共组件。',stack:['NoneBot','PJSK','maimai'],flow:['QQ / OneBot','插件','数据服务'],metaLeft:'Amia-Mizuki-Dev-Team',metaRight:'多仓库'}
};
const previewTabs=document.querySelectorAll('.workspace-tab[data-preview]');
function renderPreview(key){
  const data=projectPreview[key];if(!data)return;
  previewTabs.forEach((tab)=>tab.classList.toggle('is-active',tab.dataset.preview===key));
  const set=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value;};
  set('[data-preview-kicker]',data.kicker);set('[data-preview-title]',data.title);set('[data-preview-state]',data.state);set('[data-preview-desc]',data.desc);set('[data-preview-meta-left]',data.metaLeft);set('[data-preview-meta-right]',data.metaRight);
  const stack=document.querySelector('[data-preview-stack]');if(stack)stack.innerHTML=data.stack.map((item)=>`<span class="tech-chip">${item}</span>`).join('');
  const flow=document.querySelector('[data-preview-flow]');if(flow)flow.innerHTML=data.flow.map((item)=>`<div class="flow-node">${item}</div>`).join('');
}
previewTabs.forEach((tab)=>tab.addEventListener('click',()=>renderPreview(tab.dataset.preview)));

const legacyTarget=location.hash;
if(legacyTarget==='#projects'||legacyTarget==='#work')location.replace('./projects.html');
if(legacyTarget==='#about')location.replace('./about.html');

// Hero particle field: BA4THG stays readable while a dense square stream rolls right-to-left.
(()=>{
  const canvas=document.querySelector('[data-hero-shader]');if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});if(!ctx){canvas.hidden=true;return;}
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const maskCanvas=document.createElement('canvas');
  const maskCtx=maskCanvas.getContext('2d',{alpha:true,willReadFrequently:true});if(!maskCtx){canvas.hidden=true;return;}

  let cssW=0,cssH=0,dpr=1,maskData=null,rowRightEdge=null,raf=0,start=performance.now();
  const FLOW_X=-.052,FLOW_Y=0,FLOW_LEN=Math.hypot(FLOW_X,FLOW_Y)||1,FLOW_DX=FLOW_X/FLOW_LEN,FLOW_DY=FLOW_Y/FLOW_LEN;
  const PALETTE_STEPS=40;
  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const smooth=(t)=>{t=clamp(t,0,1);return t*t*(3-2*t);};
  const hash=(x,y,seed=0)=>{let n=(Math.imul(x+11,374761393)^Math.imul(y+17,668265263)^Math.imul(seed+23,2246822519))>>>0;n=(n^(n>>>13))>>>0;n=Math.imul(n,1274126177)>>>0;n=(n^(n>>>16))>>>0;return n/4294967295;};
  const makePalette=(r,g,b)=>Array.from({length:PALETTE_STEPS+1},(_,i)=>`rgba(${r},${g},${b},${(i/PALETTE_STEPS).toFixed(3)})`);
  const mainPalette=makePalette(49,132,255),cyanPalette=makePalette(55,205,255),deepPalette=makePalette(20,77,191),trailPalette=makePalette(67,190,255);
  const alphaIndex=(alpha)=>Math.round(clamp(alpha,0,1)*PALETTE_STEPS);

  function sample(x,y){
    if(!maskData||x<0||y<0||x>=cssW||y>=cssH)return 0;
    const ix=Math.min(cssW-1,Math.max(0,x|0)),iy=Math.min(cssH-1,Math.max(0,y|0));
    return maskData[(iy*cssW+ix)*4+3]>127?1:0;
  }

  function drawBA4THGMask(){
    maskCtx.save();
    maskCtx.strokeStyle='#000';maskCtx.fillStyle='#000';maskCtx.lineWidth=58;maskCtx.lineCap='square';maskCtx.lineJoin='miter';
    const top=220,mid=425,bot=630;
    maskCtx.beginPath();maskCtx.moveTo(55,bot);maskCtx.lineTo(55,top);maskCtx.lineTo(135,top);maskCtx.bezierCurveTo(220,top,220,mid-10,135,mid-10);maskCtx.lineTo(55,mid-10);maskCtx.moveTo(135,mid-10);maskCtx.bezierCurveTo(230,mid-10,230,bot,135,bot);maskCtx.lineTo(55,bot);maskCtx.stroke();
    maskCtx.beginPath();maskCtx.moveTo(220,bot);maskCtx.lineTo(300,top);maskCtx.lineTo(380,bot);maskCtx.moveTo(252,475);maskCtx.lineTo(348,475);maskCtx.stroke();
    maskCtx.beginPath();maskCtx.moveTo(485,top);maskCtx.lineTo(400,480);maskCtx.lineTo(535,480);maskCtx.moveTo(505,top);maskCtx.lineTo(505,bot);maskCtx.stroke();
    maskCtx.beginPath();maskCtx.moveTo(555,top);maskCtx.lineTo(720,top);maskCtx.moveTo(638,top);maskCtx.lineTo(638,bot);maskCtx.stroke();
    maskCtx.beginPath();maskCtx.moveTo(735,top);maskCtx.lineTo(735,bot);maskCtx.moveTo(870,top);maskCtx.lineTo(870,bot);maskCtx.moveTo(735,425);maskCtx.lineTo(870,425);maskCtx.stroke();
    maskCtx.beginPath();maskCtx.arc(990,425,142,.42*Math.PI,1.58*Math.PI,false);maskCtx.moveTo(990,425);maskCtx.lineTo(1080,425);maskCtx.lineTo(1080,555);maskCtx.stroke();
    maskCtx.restore();
  }

  function rebuildMask(){
    maskCanvas.width=Math.max(1,Math.round(cssW));maskCanvas.height=Math.max(1,Math.round(cssH));
    maskCtx.clearRect(0,0,cssW,cssH);
    maskCtx.save();maskCtx.setTransform(cssW/1160,0,0,cssH/850,0,0);drawBA4THGMask();maskCtx.restore();
    maskData=maskCtx.getImageData(0,0,cssW,cssH).data;
    rowRightEdge=new Int32Array(cssH);rowRightEdge.fill(-1);
    for(let y=0;y<cssH;y++){
      const rowOffset=y*cssW*4;
      for(let x=cssW-1;x>=0;x--){
        if(maskData[rowOffset+x*4+3]>127){rowRightEdge[y]=x;break;}
      }
    }
  }

  function resize(){
    const rect=canvas.getBoundingClientRect();
    const nextW=Math.max(1,Math.round(rect.width)),nextH=Math.max(1,Math.round(rect.height));
    const dprCap=nextW<760?1.22:1.45,nextDpr=Math.min(window.devicePixelRatio||1,dprCap);
    if(nextW===cssW&&nextH===cssH&&nextDpr===dpr)return false;
    cssW=nextW;cssH=nextH;dpr=nextDpr;
    canvas.width=Math.max(1,Math.round(cssW*dpr));canvas.height=Math.max(1,Math.round(cssH*dpr));
    ctx.setTransform(dpr,0,0,dpr,0,0);ctx.imageSmoothingEnabled=false;
    rebuildMask();
    return true;
  }

  function drawSquare(x,y,size,alpha,palette=mainPalette){
    if(alpha<.012)return;
    const s=Math.max(2,Math.round(size));
    ctx.fillStyle=palette[alphaIndex(alpha)];
    ctx.fillRect(Math.round(x-s*.5),Math.round(y-s*.5),s,s);
  }

  function draw(ms=0){
    raf=0;
    if(!cssW||!cssH||!maskData)resize();
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,cssW,cssH);

    const t=reduced?2600:ms-start;
    const spacing=cssW<760?9:10;
    const probe=spacing*2.1;
    const outsideProbe=spacing*2.65;
    const wakeLength=spacing*(cssW<760?16:21);
    const distanceX=reduced?0:t*FLOW_X;
    const wholeX=Math.floor(distanceX/spacing);
    const shiftX=distanceX-wholeX*spacing;
    const scanX=(cssW+wakeLength)-((t*.094)%(cssW+wakeLength*1.8));
    const secondaryScan=(cssW+wakeLength*.5)-((t*.061+cssW*.38)%(cssW+wakeLength*1.45));

    let row=0;
    for(let y=-spacing;y<cssH+spacing;y+=spacing,row++){
      let col=0;
      for(let x=-spacing+shiftX;x<cssW+wakeLength+spacing;x+=spacing,col++){
        const gx=col-wholeX,gy=row;
        const tone=hash(gx,gy,41);
        const inside=sample(x,y)===1;
        const left=sample(x-outsideProbe,y),right=sample(x+outsideProbe,y),up=sample(x,y-outsideProbe),down=sample(x,y+outsideProbe);
        const edgeNear=left||right||up||down;
        const iy=Math.min(cssH-1,Math.max(0,y|0));
        const rightEdge=rowRightEdge?.[iy]??-1;
        const wakeDistance=rightEdge>=0?x-rightEdge:0;
        const inWake=rightEdge>=0&&wakeDistance>0&&wakeDistance<wakeLength;
        const corridor=Math.exp(-Math.pow((y-cssH*.50)/(cssH*.36),2));
        const inRightFeed=x>cssW*.56&&corridor>.06;
        const scanGlow=Math.max(
          Math.exp(-Math.pow((x-scanX)/(spacing*5.4),2)),
          Math.exp(-Math.pow((x-secondaryScan)/(spacing*7.2),2))*.62
        );

        let alpha=0,size=spacing*.64,palette=mainPalette;

        if(inside){
          const innerLeft=sample(x-probe,y),innerRight=sample(x+probe,y),innerUp=sample(x,y-probe),innerDown=sample(x,y+probe);
          const core=innerLeft&&innerRight&&innerUp&&innerDown;
          const keepThreshold=core?.06:.18;
          if(hash(gx,gy,73)<keepThreshold)continue;
          alpha=(core?.58:.48)+tone*(core?.28:.30)+scanGlow*.20;
          size=spacing*(core?.68:.61);
          if(tone>.91)palette=deepPalette;
          else if(tone>.64||scanGlow>.54)palette=cyanPalette;
        }else if(inWake){
          const fade=smooth(1-wakeDistance/wakeLength);
          const keep=.38+(1-fade)*.34;
          if(hash(gx,gy,131)<keep)continue;
          alpha=(.11+hash(gx,gy,173)*.27)*fade*(1+scanGlow*.78);
          size=spacing*(.38+hash(gx,gy,199)*.22);
          palette=hash(gx,gy,211)>.70?cyanPalette:mainPalette;
        }else if(edgeNear){
          if(hash(gx,gy,131)<.955)continue;
          alpha=(.07+hash(gx,gy,173)*.16)*(1+scanGlow*.6);
          size=spacing*(.34+hash(gx,gy,199)*.18);
        }else if(inRightFeed){
          const feedChance=.987-corridor*.020-scanGlow*.018;
          if(hash(gx,gy,131)<feedChance)continue;
          alpha=(.035+hash(gx,gy,173)*.09)*(0.65+corridor*.55)*(1+scanGlow*.85);
          size=spacing*(.26+hash(gx,gy,199)*.18);
          palette=hash(gx,gy,211)>.78?cyanPalette:mainPalette;
        }else continue;

        const jitterY=Math.sin(t*.00105+gx*.31+hash(gx,gy,251)*6.28)*spacing*.055;
        const px=x;
        const py=y+jitterY;
        const pulse=.76+.24*Math.sin((px*-FLOW_DX)*.12-t*.0022+hash(gx,gy,281)*1.7);
        const finalAlpha=clamp(alpha*(.92+.14*pulse),0,.98);

        const streak=!reduced&&hash(gx,gy,307)>(inside?.89:.82);
        if(streak){
          const tailCount=inside?3:2;
          for(let k=1;k<=tailCount;k++){
            const tx=px-FLOW_DX*spacing*(k*.78);
            const ty=py-FLOW_DY*spacing*(k*.78);
            const tailAlpha=finalAlpha*(inside?.18:.14)*Math.pow(.53,k-1);
            drawSquare(tx,ty,size*Math.pow(.77,k),tailAlpha,trailPalette);
          }
        }

        drawSquare(px,py,size,finalAlpha,palette);
      }
    }

    if(!reduced&&!document.hidden)raf=requestAnimationFrame(draw);
  }

  const resizeObserver='ResizeObserver' in window?new ResizeObserver(()=>{
    const changed=resize();
    if(reduced&&changed)draw(2600);
  }):null;
  resizeObserver?.observe(canvas);
  window.addEventListener('resize',()=>{if(!resizeObserver)resize()},{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(reduced)return;
    if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;}
    else if(!raf)raf=requestAnimationFrame(draw);
  });

  resize();
  if(reduced)draw(2600);
  else raf=requestAnimationFrame(draw);
})();
