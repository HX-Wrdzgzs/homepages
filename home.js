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
    group.setAttribute('data-sidebar-sites]','');
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
    if(entry.isIntersecting){
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  }),{threshold:.07});
  revealItems.forEach((item)=>observer.observe(item));
}else{
  revealItems.forEach((item)=>item.classList.add('is-visible'));
}

const projectPreview={
  mizuki:{kicker:'ANDROID / MAIMAI DX',title:'Amia Sync Android',state:'重做中',desc:'舞萌 DX 的 Android 客户端。玩家信息、成绩和曲库都在手机上看，最近主要在重做界面和交互。',stack:['Kotlin','Android','FastAPI'],flow:['玩家数据','同步服务','Android'],metaLeft:'Amia-Sync-Android',metaRight:'UI 重做'},
  ham:{kicker:'WINDOWS / RADIO',title:'业余无线电点名助手',state:'维护中',desc:'中继点名现场用的 Windows 本地录入工具。先把记录写进 SQLite，需要协作时再同步到 Excel。',stack:['Python','SQLite','Excel'],flow:['现场输入','本地记录','Excel'],metaLeft:'ham-checkin-assistant',metaRight:'Windows'},
  retro:{kicker:'HARDWARE / MONITOR',title:'Retro Monitor',state:'公开',desc:'把 Windows 硬件状态接到 Home Assistant，再送到 ESP32-S3 桌面终端。',stack:['C#','Home Assistant','ESP32-S3'],flow:['Windows','Home Assistant','ESP32-S3'],metaLeft:'retro-monitor',metaRight:'硬件监控'},
  hongxing:{kicker:'WEB / HONG XING',title:'Hong Xing 官网',state:'在线',desc:'hx.mizuki.top 的源码。项目、更新、生命周期、基础设施和相关服务都放在这个站里。',stack:['Static Web','Cloudflare Pages','HTML/CSS/JS'],flow:['HongXingWeb','Cloudflare Pages','hx.mizuki.top'],metaLeft:'HongXingWeb',metaRight:'hx.mizuki.top'},
  amia:{kicker:'BOT / RHYTHM GAME',title:'Amia · Mizuki',state:'维护中',desc:'开发组这边主要维护 Bot、PJSK、舞萌相关插件和公共组件。',stack:['NoneBot','PJSK','maimai'],flow:['QQ / OneBot','插件','数据服务'],metaLeft:'Amia-Mizuki-Dev-Team',metaRight:'多仓库'}
};
const previewTabs=document.querySelectorAll('.workspace-tab[data-preview]');
function renderPreview(key){
  const data=projectPreview[key];
  if(!data)return;
  previewTabs.forEach((tab)=>tab.classList.toggle('is-active',tab.dataset.preview===key));
  const set=(selector,value)=>{
    const el=document.querySelector(selector);
    if(el)el.textContent=value;
  };
  set('[data-preview-kicker]',data.kicker);
  set('[data-preview-title]',data.title);
  set('[data-preview-state]',data.state);
  set('[data-preview-desc]',data.desc);
  set('[data-preview-meta-left]',data.metaLeft);
  set('[data-preview-meta-right]',data.metaRight);
  const stack=document.querySelector('[data-preview-stack]');
  if(stack)stack.innerHTML=data.stack.map((item)=>`<span class="tech-chip">${item}</span>`).join('');
  const flow=document.querySelector('[data-preview-flow]');
  if(flow)flow.innerHTML=data.flow.map((item)=>`<div class="flow-node">${item}</div>`).join('');
}
previewTabs.forEach((tab)=>tab.addEventListener('click',()=>renderPreview(tab.dataset.preview)));

const legacyTarget=location.hash;
if(legacyTarget==='#projects'||legacyTarget==='#work')location.replace('./projects.html');
if(legacyTarget==='#about')location.replace('./about.html');

// Hero particle field: BA4THG wordmark mask, continuously streaming from right to left.
(()=>{
  const canvas=document.querySelector('[data-hero-shader]');
  if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
  if(!ctx){canvas.hidden=true;return;}

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const maskCanvas=document.createElement('canvas');
  const maskCtx=maskCanvas.getContext('2d',{alpha:true,willReadFrequently:true});
  if(!maskCtx){canvas.hidden=true;return;}

  let cssW=0,cssH=0,dpr=1,maskData=null,rowRightEdge=null,raf=0;
  const STATE_MS=4200;
  const FLOW_X=-.0145;
  const FLOW_Y=0;
  const FLOW_LEN=Math.hypot(FLOW_X,FLOW_Y)||1;
  const FLOW_DX=FLOW_X/FLOW_LEN;
  const FLOW_DY=FLOW_Y/FLOW_LEN;
  const PALETTE_STEPS=32;

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const smooth=(t)=>{t=clamp(t,0,1);return t*t*(3-2*t)};
  const hash=(x,y,seed=0)=>{
    let n=(Math.imul(x+11,374761393)^Math.imul(y+17,668265263)^Math.imul(seed+23,2246822519))>>>0;
    n=(n^(n>>>13))>>>0;n=Math.imul(n,1274126177)>>>0;n=(n^(n>>>16))>>>0;
    return n/4294967295;
  };
  const makePalette=(r,g,b)=>Array.from({length:PALETTE_STEPS+1},(_,i)=>`rgba(${r},${g},${b},${(i/PALETTE_STEPS).toFixed(3)})`);
  const lightPalette=makePalette(82,155,244);
  const darkPalette=makePalette(31,82,181);
  const trailPalette=makePalette(82,194,255);
  const alphaIndex=(alpha)=>Math.round(clamp(alpha,0,1)*PALETTE_STEPS);

  function sample(x,y){
    if(!maskData||x<0||y<0||x>=cssW||y>=cssH)return 0;
    const ix=Math.min(cssW-1,Math.max(0,x|0));
    const iy=Math.min(cssH-1,Math.max(0,y|0));
    return maskData[(iy*cssW+ix)*4+3]>127?1:0;
  }

  function drawBA4THGMask(){
    maskCtx.save();
    maskCtx.font='800 225px "Arial Narrow","Roboto Condensed",Arial,sans-serif';
    maskCtx.textAlign='center';
    maskCtx.textBaseline='middle';
    maskCtx.fillText('BA4THG',500,430,850);
    maskCtx.restore();
  }

  function rebuildMask(){
    maskCanvas.width=Math.max(1,Math.round(cssW));
    maskCanvas.height=Math.max(1,Math.round(cssH));
    maskCtx.clearRect(0,0,cssW,cssH);
    maskCtx.save();
    maskCtx.setTransform(cssW/1000,0,0,cssH/850,0,0);
    maskCtx.fillStyle='#000';
    drawBA4THGMask();
    maskCtx.restore();
    maskData=maskCtx.getImageData(0,0,cssW,cssH).data;

    rowRightEdge=new Int32Array(cssH);
    rowRightEdge.fill(-1);
    for(let y=0;y<cssH;y++){
      const rowOffset=y*cssW*4;
      for(let x=cssW-1;x>=0;x--){
        if(maskData[rowOffset+x*4+3]>127){
          rowRightEdge[y]=x;
          break;
        }
      }
    }
  }

  function resize(){
    const rect=canvas.getBoundingClientRect();
    const nextW=Math.max(1,Math.round(rect.width));
    const nextH=Math.max(1,Math.round(rect.height));
    const dprCap=nextW<700?1.18:1.38;
    const nextDpr=Math.min(window.devicePixelRatio||1,dprCap);
    if(nextW===cssW&&nextH===cssH&&nextDpr===dpr)return false;
    cssW=nextW;cssH=nextH;dpr=nextDpr;
    canvas.width=Math.max(1,Math.round(cssW*dpr));
    canvas.height=Math.max(1,Math.round(cssH*dpr));
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.imageSmoothingEnabled=false;
    rebuildMask();
    return true;
  }

  function edgePresence(gx,gy,epoch){
    return hash(gx,gy,epoch+503)>.20?1:0;
  }

  function draw(ms=0){
    raf=0;
    if(!cssW||!cssH||!maskData)resize();
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,cssW,cssH);

    const t=reduced?9200:ms;
    const spacing=cssW<520?9:10;
    const probe=spacing*2.05;
    const outsideProbe=spacing*2.45;
    const wakeLength=spacing*(cssW<520?8:12);
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
      for(let x=-spacing+shiftX;x<cssW+wakeLength+spacing;x+=spacing,col++){
        const gx=col-wholeX;
        const gy=row-wholeY;
        const inside=sample(x,y)===1;
        const tone=hash(gx,gy,41);
        let type='outside';
        let alpha=0;
        let nx=0,ny=0;
        let left=0,right=0,up=0,down=0;
        let wakeDistance=0;
        let inDirectionalWake=false;

        if(inside){
          left=sample(x-probe,y);right=sample(x+probe,y);up=sample(x,y-probe);down=sample(x,y+probe);
          const core=left&&right&&up&&down;
          if(core){
            type='core';
            alpha=.46+tone*.23;
          }else{
            type='edge';
            const a=edgePresence(gx,gy,epoch);
            const b=edgePresence(gx,gy,epoch+1);
            const present=a+(b-a)*stateBlend;
            alpha=present*(.34+tone*.25);
          }
        }else{
          left=sample(x-outsideProbe,y);right=sample(x+outsideProbe,y);up=sample(x,y-outsideProbe);down=sample(x,y+outsideProbe);
          const iy=Math.min(cssH-1,Math.max(0,y|0));
          const rightEdge=rowRightEdge?.[iy]??-1;
          wakeDistance=rightEdge>=0?x-rightEdge:0;
          inDirectionalWake=rightEdge>=0&&wakeDistance>0&&wakeDistance<wakeLength;
          const edgeNear=left||right||up||down;

          if(inDirectionalWake){
            const fade=1-wakeDistance/wakeLength;
            const threshold=.50+(1-fade)*.30;
            if(hash(gx,gy,131)<=threshold)continue;
            alpha=(.12+hash(gx,gy,173)*.24)*fade;
          }else{
            if(!edgeNear||hash(gx,gy,131)<=.982)continue;
            alpha=.10+hash(gx,gy,173)*.14;
          }
        }

        if(type!=='core'&&!inDirectionalWake){
          nx=left-right;ny=up-down;
          const len=Math.hypot(nx,ny)||1;nx/=len;ny/=len;
          if(type==='outside'){nx=-nx;ny=-ny;}
        }

        const outward=inDirectionalWake?0:(type==='outside'?(1.8+.8*Math.sin(t*.00022+hash(gx,gy,211)*Math.PI*2)):(type==='edge'?.75*Math.sin(t*.00018+hash(gx,gy,79)*Math.PI*2):0));
        const size=spacing*(type==='outside'?.53:.70);
        const px=x+nx*outward;
        const py=y+ny*outward;
        const flowCoord=px*FLOW_DX+py*FLOW_DY;
        const flowPulse=.5+.5*Math.sin(flowCoord*.17-t*.0055);
        const directedAlpha=alpha*(.91+.20*flowPulse);
        const streak=!reduced&&type!=='outside'&&hash(gx,gy,307)>.94;

        if(streak){
          const trailSize=size*.72;
          const trailAlpha=directedAlpha*(.16+.14*flowPulse);
          const tx1=px-FLOW_DX*spacing*1.05;
          const ty1=py-FLOW_DY*spacing*1.05;
          const tx2=px-FLOW_DX*spacing*2.05;
          const ty2=py-FLOW_DY*spacing*2.05;
          const tx3=px-FLOW_DX*spacing*3.00;
          const ty3=py-FLOW_DY*spacing*3.00;

          if(sample(tx1,ty1)){
            ctx.fillStyle=trailPalette[alphaIndex(trailAlpha)];
            ctx.fillRect(Math.round(tx1-trailSize*.5),Math.round(ty1-trailSize*.5),Math.max(2,Math.round(trailSize)),Math.max(2,Math.round(trailSize)));
          }
          if(sample(tx2,ty2)){
            const s=trailSize*.75;
            ctx.fillStyle=trailPalette[alphaIndex(trailAlpha*.58)];
            ctx.fillRect(Math.round(tx2-s*.5),Math.round(ty2-s*.5),Math.max(2,Math.round(s)),Math.max(2,Math.round(s)));
          }
          if(sample(tx3,ty3)){
            const s=trailSize*.56;
            ctx.fillStyle=trailPalette[alphaIndex(trailAlpha*.30)];
            ctx.fillRect(Math.round(tx3-s*.5),Math.round(ty3-s*.5),Math.max(2,Math.round(s)),Math.max(2,Math.round(s)));
          }
        }

        const dark=tone>.93;
        const finalAlpha=dark?Math.min(directedAlpha+.08,.82):directedAlpha;
        ctx.fillStyle=(dark?darkPalette:lightPalette)[alphaIndex(finalAlpha)];
        ctx.fillRect(Math.round(px-size*.5),Math.round(py-size*.5),Math.max(2,Math.round(size)),Math.max(2,Math.round(size)));
      }
    }

    if(!reduced&&!document.hidden)raf=requestAnimationFrame(draw);
  }

  const resizeObserver='ResizeObserver' in window?new ResizeObserver(()=>{
    const changed=resize();
    if(reduced&&changed)draw(9200);
  }):null;
  resizeObserver?.observe(canvas);
  window.addEventListener('resize',()=>{if(!resizeObserver)resize()},{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(reduced)return;
    if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;}
    else if(!raf)raf=requestAnimationFrame(draw);
  });
  resize();
  if(reduced)draw(9200);else raf=requestAnimationFrame(draw);
})();