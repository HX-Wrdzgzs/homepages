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
  const observer=new IntersectionObserver((entries)=>entries.forEach((entry)=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}}),{threshold:.07});
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
  const set=(selector,value)=>{const el=document.querySelector(selector);if(el)el.textContent=value};
  set('[data-preview-kicker]',data.kicker);set('[data-preview-title]',data.title);set('[data-preview-state]',data.state);set('[data-preview-desc]',data.desc);set('[data-preview-meta-left]',data.metaLeft);set('[data-preview-meta-right]',data.metaRight);
  const stack=document.querySelector('[data-preview-stack]');if(stack)stack.innerHTML=data.stack.map((item)=>`<span class="tech-chip">${item}</span>`).join('');
  const flow=document.querySelector('[data-preview-flow]');if(flow)flow.innerHTML=data.flow.map((item)=>`<div class="flow-node">${item}</div>`).join('');
}
previewTabs.forEach((tab)=>tab.addEventListener('click',()=>renderPreview(tab.dataset.preview)));

const legacyTarget=location.hash;
if(legacyTarget==='#projects'||legacyTarget==='#work')location.replace('./projects.html');
if(legacyTarget==='#about')location.replace('./about.html');

// Hero particle field: an explicit SVG-path mask with a continuously scrolling square lattice.
(()=>{
  const canvas=document.querySelector('[data-hero-shader]');
  if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:true});
  if(!ctx||typeof Path2D==='undefined'){canvas.hidden=true;return;}

  const MASK_PATH='M 72 298 C 93 222 161 173 252 176 C 304 105 404 78 489 126 C 564 72 690 87 752 166 C 842 157 917 214 926 302 C 982 351 973 431 925 475 C 966 560 922 654 837 679 C 806 761 708 807 623 762 C 557 831 449 838 374 782 C 286 820 184 782 151 705 C 77 676 39 602 67 532 C 17 474 24 382 84 339 C 76 326 71 312 72 298 Z';
  const silhouette=new Path2D(MASK_PATH);
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const maskCanvas=document.createElement('canvas');
  const maskCtx=maskCanvas.getContext('2d',{alpha:true,willReadFrequently:true});
  if(!maskCtx){canvas.hidden=true;return;}

  let cssW=0,cssH=0,dpr=1,maskData=null,raf=0,lastFrame=0;
  const STATE_MS=4400;
  const FLOW_X=.0068;
  const FLOW_Y=.0026;

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const smooth=(t)=>{t=clamp(t,0,1);return t*t*(3-2*t)};
  const hash=(x,y,seed=0)=>{
    let n=(Math.imul(x+11,374761393)^Math.imul(y+17,668265263)^Math.imul(seed+23,2246822519))>>>0;
    n=(n^(n>>>13))>>>0;n=Math.imul(n,1274126177)>>>0;n=(n^(n>>>16))>>>0;
    return n/4294967295;
  };

  function sample(x,y){
    if(!maskData||x<0||y<0||x>=cssW||y>=cssH)return 0;
    const ix=Math.min(cssW-1,Math.max(0,x|0));
    const iy=Math.min(cssH-1,Math.max(0,y|0));
    return maskData[(iy*cssW+ix)*4+3]>127?1:0;
  }

  function rebuildMask(){
    maskCanvas.width=Math.max(1,Math.round(cssW));
    maskCanvas.height=Math.max(1,Math.round(cssH));
    maskCtx.clearRect(0,0,cssW,cssH);
    maskCtx.save();
    maskCtx.setTransform(cssW/1000,0,0,cssH/850,0,0);
    maskCtx.fillStyle='#000';
    maskCtx.fill(silhouette);
    maskCtx.restore();
    maskData=maskCtx.getImageData(0,0,cssW,cssH).data;
  }

  function resize(){
    const rect=canvas.getBoundingClientRect();
    const nextW=Math.max(1,Math.round(rect.width));
    const nextH=Math.max(1,Math.round(rect.height));
    const nextDpr=Math.min(window.devicePixelRatio||1,1.6);
    if(nextW===cssW&&nextH===cssH&&nextDpr===dpr)return false;
    cssW=nextW;cssH=nextH;dpr=nextDpr;
    canvas.width=Math.max(1,Math.round(cssW*dpr));
    canvas.height=Math.max(1,Math.round(cssH*dpr));
    ctx.setTransform(dpr,0,0,dpr,0,0);
    rebuildMask();
    return true;
  }

  function edgePresence(gx,gy,epoch){
    return hash(gx,gy,epoch+503)>.20?1:0;
  }

  function draw(ms=0){
    raf=0;
    resize();
    if(!reduced&&ms-lastFrame<32){raf=requestAnimationFrame(draw);return;}
    lastFrame=ms;
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,cssW,cssH);

    const t=reduced?9200:ms;
    const spacing=cssW<520?8:9.5;
    const half=spacing*.5;
    const probe=spacing*2.25;
    const outsideProbe=spacing*2.8;
    const epoch=Math.floor(t/STATE_MS);
    const epochProgress=(t%STATE_MS)/STATE_MS;
    const stateBlend=smooth((epochProgress-.68)/.32);

    const distanceX=reduced?0:t*FLOW_X;
    const distanceY=reduced?0:t*FLOW_Y;
    const wholeX=Math.floor(distanceX/spacing);
    const wholeY=Math.floor(distanceY/spacing);
    const shiftX=distanceX-wholeX*spacing;
    const shiftY=distanceY-wholeY*spacing;

    let row=0;
    for(let y=-spacing+shiftY;y<cssH+spacing;y+=spacing,row++){
      let col=0;
      for(let x=-spacing+shiftX;x<cssW+spacing;x+=spacing,col++){
        const gx=col-wholeX;
        const gy=row-wholeY;
        const inside=sample(x,y)===1;
        const tone=hash(gx,gy,41);
        let type='outside';
        let alpha=0;
        let nx=0,ny=0;

        if(inside){
          const core=sample(x-probe,y)&&sample(x+probe,y)&&sample(x,y-probe)&&sample(x,y+probe)&&sample(x-probe*.72,y-probe*.72)&&sample(x+probe*.72,y+probe*.72);
          if(core){
            type='core';
            alpha=.43+tone*.24;
          }else{
            type='edge';
            const a=edgePresence(gx,gy,epoch);
            const b=edgePresence(gx,gy,epoch+1);
            const present=a+(b-a)*stateBlend;
            alpha=present*(.31+tone*.24);
          }
        }else{
          const near=sample(x-outsideProbe,y)||sample(x+outsideProbe,y)||sample(x,y-outsideProbe)||sample(x,y+outsideProbe)||sample(x-outsideProbe*.72,y-outsideProbe*.72)||sample(x+outsideProbe*.72,y+outsideProbe*.72);
          if(!near||hash(gx,gy,131)<=.974)continue;
          alpha=.17+hash(gx,gy,173)*.18;
        }

        if(type!=='core'){
          nx=sample(x-probe,y)-sample(x+probe,y);
          ny=sample(x,y-probe)-sample(x,y+probe);
          const len=Math.hypot(nx,ny)||1;nx/=len;ny/=len;
          if(type==='outside'){nx=-nx;ny=-ny;}
        }

        const outward=type==='outside'?(2.2+1.1*Math.sin(t*.00022+hash(gx,gy,211)*Math.PI*2)):(type==='edge'?1.0*Math.sin(t*.00018+hash(gx,gy,79)*Math.PI*2):0);
        const size=spacing*(type==='outside'?.56:.70);
        const dark=tone>.93;
        ctx.fillStyle=dark?`rgba(31,82,181,${Math.min(alpha+.08,.76)})`:`rgba(82,155,244,${alpha})`;
        ctx.fillRect(
          Math.round(x+nx*outward-size*.5),
          Math.round(y+ny*outward-size*.5),
          Math.max(2,Math.round(size)),
          Math.max(2,Math.round(size))
        );
      }
    }

    if(!reduced&&!document.hidden)raf=requestAnimationFrame(draw);
  }

  const resizeObserver='ResizeObserver' in window?new ResizeObserver(()=>{resize();if(reduced)draw(9200)}):null;
  resizeObserver?.observe(canvas);
  document.addEventListener('visibilitychange',()=>{
    if(reduced)return;
    if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;}
    else if(!raf)raf=requestAnimationFrame(draw);
  });
  resize();
  if(reduced)draw(9200);else raf=requestAnimationFrame(draw);
})();
