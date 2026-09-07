(()=>{
  const mobile=matchMedia('(max-width:620px)');
  if(!mobile.matches)return;
  const canvas=document.querySelector('[data-hero-shader-mobile]');
  if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
  if(!ctx){canvas.hidden=true;return;}

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const glyphs={
    B:['11110','10001','10001','11110','10001','10001','11110'],
    A:['01110','10001','10001','11111','10001','10001','10001'],
    '4':['00110','01010','10010','11111','00010','00010','00010'],
    T:['11111','00100','00100','00100','00100','00100','00100'],
    H:['10001','10001','10001','11111','10001','10001','10001'],
    G:['01110','10001','10000','10111','10001','10001','01110']
  };
  const text='BA4THG';
  const glyphWidth=5,gap=1,rows=7,totalCols=text.length*glyphWidth+(text.length-1)*gap;
  const points=[];
  text.split('').forEach((ch,index)=>{
    const pattern=glyphs[ch];
    pattern.forEach((line,row)=>{
      [...line].forEach((bit,col)=>{
        if(bit==='1')points.push({col:index*(glyphWidth+gap)+col,row,seed:(index+1)*97+row*13+col*29});
      });
    });
  });

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const smooth=(v)=>{v=clamp(v,0,1);return v*v*(3-2*v);};
  const hash=(n)=>{
    n=(n^61)^(n>>>16);n=n+(n<<3);n=n^(n>>>4);n=Math.imul(n,0x27d4eb2d);n=n^(n>>>15);
    return (n>>>0)/4294967295;
  };

  let cssW=0,cssH=0,dpr=1,raf=0,start=performance.now();
  function resize(){
    const rect=canvas.getBoundingClientRect();
    const w=Math.max(1,Math.round(rect.width));
    const h=Math.max(1,Math.round(rect.height));
    const nextDpr=Math.min(window.devicePixelRatio||1,1.5);
    if(w===cssW&&h===cssH&&nextDpr===dpr)return false;
    cssW=w;cssH=h;dpr=nextDpr;
    canvas.width=Math.max(1,Math.round(cssW*dpr));
    canvas.height=Math.max(1,Math.round(cssH*dpr));
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.imageSmoothingEnabled=false;
    return true;
  }

  function square(x,y,size,alpha,variant=0){
    if(alpha<=.01)return;
    if(variant===1)ctx.fillStyle=`rgba(82,194,255,${alpha.toFixed(3)})`;
    else if(variant===2)ctx.fillStyle=`rgba(31,82,181,${alpha.toFixed(3)})`;
    else ctx.fillStyle=`rgba(82,155,244,${alpha.toFixed(3)})`;
    const s=Math.max(2,Math.round(size));
    ctx.fillRect(Math.round(x-s/2),Math.round(y-s/2),s,s);
  }

  function draw(now){
    raf=0;
    if(!cssW||!cssH)resize();
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,cssW,cssH);

    const cell=Math.min((cssW-18)/(totalCols-1),(cssH-16)/(rows-1));
    const gridW=(totalCols-1)*cell;
    const gridH=(rows-1)*cell;
    const x0=(cssW-gridW)/2;
    const y0=(cssH-gridH)/2;
    const elapsed=reduced?3000:now-start;
    const phase=reduced?.68:(elapsed%5200)/5200;

    let assemble=1,release=0;
    if(phase<.58)assemble=phase/.58;
    else if(phase>.82)release=(phase-.82)/.18;
    const scanX=cssW+cell*3-assemble*(cssW+cell*6);
    const releaseEase=smooth(release);

    points.forEach((p)=>{
      const r=hash(p.seed),r2=hash(p.seed+701),r3=hash(p.seed+1709);
      const tx=x0+p.col*cell;
      const ty=y0+p.row*cell;
      let settled=1;
      if(phase<.58)settled=smooth((tx-scanX+cell*1.35)/(cell*2.7));
      settled=clamp(settled,0,1);

      const approach=(1-settled)*cell*(3.2+r*5.8);
      const depart=releaseEase*cell*(2.8+r2*5.2);
      const jitterX=Math.sin(now*.0021+p.seed)*cell*.045;
      const jitterY=Math.cos(now*.0017+p.seed*.7)*cell*.04;
      const px=tx+approach-depart+jitterX;
      const py=ty+jitterY+(r2-.5)*cell*.10;
      const alpha=(.72+r*.24)*settled*(1-releaseEase);
      const size=cell*(.56+r2*.10);
      const variant=r3>.91?2:(r3>.52?1:0);

      const moving=(1-settled)+releaseEase;
      if(!reduced&&moving>.025){
        square(px+cell*.72,py,size*.62,alpha*.20*moving,1);
        square(px+cell*1.35,py,size*.42,alpha*.09*moving,1);
      }
      square(px,py,size,alpha,variant);
    });

    if(!reduced&&!document.hidden)raf=requestAnimationFrame(draw);
  }

  const ro='ResizeObserver' in window?new ResizeObserver(()=>{resize();if(reduced)draw(performance.now());}):null;
  ro?.observe(canvas);
  window.addEventListener('resize',()=>{if(!ro)resize()},{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(reduced)return;
    if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;}
    else{start=performance.now();if(!raf)raf=requestAnimationFrame(draw);}
  });
  resize();
  if(reduced)draw(performance.now());else raf=requestAnimationFrame(draw);
})();