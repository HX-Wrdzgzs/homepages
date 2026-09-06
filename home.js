if(!document.querySelector('link[data-hx-layout]')){
  const layout=document.createElement('link');
  layout.rel='stylesheet';
  layout.href='/layout.css?v=20260905-4';
  layout.setAttribute('data-hx-layout','');
  document.head.appendChild(layout);
}

const sidebar = document.querySelector('.site-sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const menuButton = document.querySelector('.mobile-menu-button');

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
  sidebar?.classList.toggle('is-open', open);
  sidebarOverlay?.classList.toggle('is-open', open);
  sidebarOverlay?.setAttribute('aria-hidden', String(!open));
  menuButton?.classList.toggle('is-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
  menuButton?.setAttribute('aria-label', open ? '关闭菜单' : '打开菜单');
  document.body.style.overflow = open ? 'hidden' : '';
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

// Hero: lightweight WebGL2 pixel field inspired by shader-driven conference visuals.
(()=>{
  const canvas=document.querySelector('[data-hero-shader]');
  if(!canvas)return;

  const style=document.createElement('style');
  style.textContent=`
    .hero{position:relative;isolation:isolate;overflow:hidden}
    .hero-copy,.product-window{position:relative;z-index:2}
    .hero-shader{position:absolute;z-index:0;inset:0 0 0 38%;width:62%;height:100%;pointer-events:none;opacity:.9;mask-image:linear-gradient(90deg,transparent 0,#000 18%,#000 100%);-webkit-mask-image:linear-gradient(90deg,transparent 0,#000 18%,#000 100%)}
    .hero::after{content:"";position:absolute;z-index:1;inset:auto 0 0 35%;height:34%;pointer-events:none;background:linear-gradient(180deg,transparent,rgba(255,255,255,.88) 78%,#fff)}
    @media(max-width:1050px){.hero-shader{inset:0 0 auto 24%;width:76%;height:58%;opacity:.72}.hero::after{inset:20% 0 auto 18%;height:42%;background:linear-gradient(180deg,transparent,rgba(255,255,255,.94) 76%,#fff)}}
    @media(max-width:620px){.hero-shader{inset:0 -18% auto 22%;width:96%;height:50%;opacity:.58}.hero::after{inset:10% -10% auto 12%;height:44%}}
    @media(prefers-reduced-motion:reduce){.hero-shader{opacity:.46}}
  `;
  document.head.appendChild(style);

  const gl=canvas.getContext('webgl2',{alpha:true,antialias:false,premultipliedAlpha:true,powerPreference:'high-performance'});
  if(!gl){canvas.hidden=true;return;}

  const vertex=`#version 300 es
  in vec2 a_position;
  void main(){gl_Position=vec4(a_position,0.0,1.0);}`;

  const fragment=`#version 300 es
  precision highp float;
  uniform vec2 u_resolution;
  uniform float u_time;
  out vec4 outColor;

  float hash21(vec2 p){
    p=fract(p*vec2(123.34,456.21));
    p+=dot(p,p+45.32);
    return fract(p.x*p.y);
  }

  float noise(vec2 p){
    vec2 i=floor(p),f=fract(p);
    f=f*f*(3.0-2.0*f);
    float a=hash21(i);
    float b=hash21(i+vec2(1.0,0.0));
    float c=hash21(i+vec2(0.0,1.0));
    float d=hash21(i+vec2(1.0,1.0));
    return mix(mix(a,b,f.x),mix(c,d,f.x),f.y);
  }

  float blob(vec2 p,vec2 c,vec2 s){
    vec2 q=(p-c)/s;
    return exp(-dot(q,q)*2.2);
  }

  void main(){
    vec2 uv=gl_FragCoord.xy/u_resolution.xy;
    float aspect=u_resolution.x/max(u_resolution.y,1.0);
    vec2 p=vec2((uv.x-.5)*aspect,uv.y-.5);

    float shape=0.0;
    shape+=blob(p,vec2(.16,.18),vec2(.31,.23))*1.10;
    shape+=blob(p,vec2(.38,.02),vec2(.24,.30))*.92;
    shape+=blob(p,vec2(.03,-.12),vec2(.22,.27))*.78;
    shape+=blob(p,vec2(.53,.25),vec2(.15,.16))*.72;
    shape-=blob(p,vec2(.25,.10),vec2(.10,.09))*.45;

    float drift=noise(p*4.6+vec2(u_time*.055,-u_time*.035));
    float detail=noise(p*10.0+vec2(-u_time*.08,u_time*.045));
    float wave=.5+.5*sin(p.x*8.0-p.y*5.0+u_time*.75);
    float field=shape*.74+drift*.23+detail*.11+wave*.045;

    float grid=66.0;
    vec2 g=uv*vec2(grid*aspect,grid);
    vec2 id=floor(g);
    vec2 cell=fract(g)-.5;
    float rnd=hash21(id);
    float threshold=.52+(rnd-.5)*.20;
    float alive=smoothstep(threshold,threshold+.07,field);

    float sq=1.0-smoothstep(.27,.37,max(abs(cell.x),abs(cell.y)));
    float edge=pow(clamp(shape,0.0,1.0),.54);
    float sparkle=.62+.38*sin(u_time*1.1+rnd*6.2831);
    float alpha=sq*alive*mix(.25,1.0,edge)*mix(.58,1.0,sparkle);

    float dust=sq*step(.965,rnd)*smoothstep(.22,.72,drift)*(1.0-smoothstep(.38,.88,shape));
    alpha=max(alpha,dust*.48);

    vec3 blue=mix(vec3(.15,.39,.92),vec3(.08,.26,.68),clamp(uv.y*.75+detail*.25,0.0,1.0));
    outColor=vec4(blue,alpha*.72);
  }`;

  const compile=(type,source)=>{
    const shader=gl.createShader(type);gl.shaderSource(shader,source);gl.compileShader(shader);
    if(!gl.getShaderParameter(shader,gl.COMPILE_STATUS)){console.warn('hero shader compile failed',gl.getShaderInfoLog(shader));gl.deleteShader(shader);return null;}
    return shader;
  };
  const vs=compile(gl.VERTEX_SHADER,vertex),fs=compile(gl.FRAGMENT_SHADER,fragment);
  if(!vs||!fs){canvas.hidden=true;return;}
  const program=gl.createProgram();gl.attachShader(program,vs);gl.attachShader(program,fs);gl.linkProgram(program);
  gl.deleteShader(vs);gl.deleteShader(fs);
  if(!gl.getProgramParameter(program,gl.LINK_STATUS)){console.warn('hero shader link failed',gl.getProgramInfoLog(program));canvas.hidden=true;return;}

  const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array([-1,-1,3,-1,-1,3]),gl.STATIC_DRAW);
  gl.useProgram(program);
  const position=gl.getAttribLocation(program,'a_position');gl.enableVertexAttribArray(position);gl.vertexAttribPointer(position,2,gl.FLOAT,false,0,0);
  const resolution=gl.getUniformLocation(program,'u_resolution');
  const time=gl.getUniformLocation(program,'u_time');
  gl.enable(gl.BLEND);gl.blendFunc(gl.ONE,gl.ONE_MINUS_SRC_ALPHA);

  let width=0,height=0,raf=0;
  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  function resize(){
    const rect=canvas.getBoundingClientRect();
    const dpr=Math.min(devicePixelRatio||1,1.75);
    const w=Math.max(1,Math.round(rect.width*dpr));
    const h=Math.max(1,Math.round(rect.height*dpr));
    if(w===width&&h===height)return;
    width=canvas.width=w;height=canvas.height=h;gl.viewport(0,0,w,h);
  }
  function draw(ms=0){
    resize();
    gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform2f(resolution,width,height);gl.uniform1f(time,reduced?7.0:ms*.001);
    gl.drawArrays(gl.TRIANGLES,0,3);
    if(!reduced)raf=requestAnimationFrame(draw);
  }
  const observer='ResizeObserver' in window?new ResizeObserver(resize):null;
  observer?.observe(canvas);
  document.addEventListener('visibilitychange',()=>{
    if(reduced)return;
    if(document.hidden){cancelAnimationFrame(raf);raf=0}else if(!raf)raf=requestAnimationFrame(draw);
  });
  raf=requestAnimationFrame(draw);
})();
