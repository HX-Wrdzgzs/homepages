const sidebar = document.querySelector('.site-sidebar');
const sidebarOverlay = document.querySelector('.sidebar-overlay');
const menuButton = document.querySelector('.mobile-menu-button');

function setMenu(open){
  sidebar?.classList.toggle('is-open', open);
  sidebarOverlay?.classList.toggle('is-open', open);
  menuButton?.classList.toggle('is-open', open);
  menuButton?.setAttribute('aria-expanded', String(open));
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
