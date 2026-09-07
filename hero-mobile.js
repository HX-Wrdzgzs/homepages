(()=>{
  const mobile=matchMedia('(max-width:620px)');
  if(!mobile.matches)return;
  const canvas=document.querySelector('[data-hero-shader-mobile]');
  if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
  if(!ctx){canvas.hidden=true;return;}

  const mask=document.createElement('canvas');
  const maskCtx=mask.getContext('2d',{alpha:true,willReadFrequently:true});
  if(!maskCtx){canvas.hidden=true;return;}

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cssW=0,cssH=0,dpr=1,maskData=null,raf=0,start=performance.now();

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const smooth=(v)=>{v=clamp(v,0,1);return v*v*(3-2*v);};
  const hash=(x,y,seed=0)=>{
    let n=(Math.imul(x+31,374761393)^Math.imul(y+67,668265263)^Math.imul(seed+97,2246822519))>>>0;
    n=(n^(n>>>13))>>>0;n=Math.imul(n,1274126177)>>>0;n=(n^(n>>>16))>>>0;
    return n/4294967295;
  };

  function rebuildMask(){
    mask.width=Math.max(1,cssW);
    mask.height=Math.max(1,cssH);
    maskCtx.clearRect(0,0,cssW,cssH);

    const fontSize=Math.min(cssH*.74,cssW*.19);
    maskCtx.save();
    maskCtx.fillStyle='#000';
    maskCtx.font=`900 ${fontSize}px "Arial Black",Arial,sans-serif`;
    maskCtx.textBaseline='middle';
    maskCtx.textAlign='center';
    maskCtx.translate(cssW/2,cssH/2+fontSize*.015);
    maskCtx.scale(1.08,1);
    maskCtx.fillText('BA4THG',0,0,cssW*.91/1.08);
    maskCtx.restore();

    maskData=maskCtx.getImageData(0,0,cssW,cssH).data;
  }

  function sample(x,y){
    if(!maskData||x<0||y<0||x>=cssW||y>=cssH)return 0;
    const ix=clamp(x|0,0,cssW-1);
    const iy=clamp(y|0,0,cssH-1);
    return maskData[(iy*cssW+ix)*4+3]>92?1:0;
  }

  function resize(){
    const rect=canvas.getBoundingClientRect();
    const nextW=Math.max(1,Math.round(rect.width));
    const nextH=Math.max(1,Math.round(rect.height));
    const nextDpr=Math.min(window.devicePixelRatio||1,1.5);
    if(nextW===cssW&&nextH===cssH&&nextDpr===dpr)return false;

    cssW=nextW;cssH=nextH;dpr=nextDpr;
    canvas.width=Math.round(cssW*dpr);
    canvas.height=Math.round(cssH*dpr);
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.imageSmoothingEnabled=false;
    rebuildMask();
    return true;
  }

  function drawSquare(x,y,size,alpha,variant){
    if(alpha<.012)return;
    const s=Math.max(2,Math.round(size));
    ctx.fillStyle=variant===2
      ?`rgba(18,76,204,${alpha})`
      :variant===1
        ?`rgba(52,214,255,${alpha})`
        :`rgba(46,124,255,${alpha})`;
    ctx.fillRect(Math.round(x-s/2),Math.round(y-s/2),s,s);
  }

  function draw(now){
    raf=0;
    if(!cssW||!cssH||!maskData)resize();
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,cssW,cssH);

    const t=reduced?2650:now-start;
    const spacing=cssW<390?4.35:4.8;
    const speed=.0315;
    const travel=t*speed;
    const whole=Math.floor(travel/spacing);
    const offset=travel-whole*spacing;
    const probe=spacing*2.15;
    const scanX=(cssW+140)-((t*.070)%(cssW+280));

    let row=0;
    for(let y=spacing*.3;y<cssH-spacing*.1;y+=spacing,row++){
      let col=0;
      for(let x=-spacing-offset;x<cssW+spacing;x+=spacing,col++){
        const gx=col+whole;
        const gy=row;
        const r1=hash(gx,gy,11);
        const r2=hash(gx,gy,23);
        const r3=hash(gx,gy,47);
        const r4=hash(gx,gy,79);
        const r5=hash(gx,gy,113);

        const inside=sample(x,y);
        const near=!inside&&(
          sample(x-probe,y)||sample(x+probe,y)||sample(x,y-probe)||sample(x,y+probe)||
          sample(x-probe*.7,y-probe*.7)||sample(x+probe*.7,y+probe*.7)
        );

        const corridor=Math.exp(-Math.pow((y-cssH*.5)/(cssH*.38),2));
        const wave=.5+.5*Math.sin(gx*.37+gy*.21+t*.00125);
        const scanGlow=Math.exp(-Math.pow((x-scanX)/(spacing*7),2));
        const rightFeed=smooth((x+cssW*.08)/(cssW*1.08));

        let keep=false,alpha=0,size=0;
        if(inside){
          keep=r1>.045;
          alpha=(.61+r2*.34)*(.90+.10*wave)+scanGlow*.25;
          size=spacing*(.44+r3*.44);
        }else if(near){
          keep=r1>(.60-.08*corridor-.06*scanGlow);
          alpha=(.11+r2*.23)*(1+.72*scanGlow);
          size=spacing*(.30+r3*.31);
        }else{
          const cloudChance=.934-corridor*.043-rightFeed*.013-scanGlow*.024;
          keep=r1>cloudChance;
          alpha=(.032+r2*.096)*(0.70+.30*corridor)*(1+.48*scanGlow);
          size=spacing*(.20+r3*.23);
        }
        if(!keep)continue;

        const py=y+(r4-.5)*spacing*.42+Math.sin(t*.00125+gx*.33+r5*5.1)*spacing*.10;
        const px=x+(r5-.5)*spacing*.24+Math.sin(t*.00095+gy*.61+r3*4.4)*spacing*.035;
        const variant=r4>.92?2:(r4>.52?1:0);

        if(!reduced&&inside&&r5>.76){
          drawSquare(px+spacing*.66,py,size*.62,alpha*.19,1);
          drawSquare(px+spacing*1.24,py,size*.39,alpha*.075,1);
        }
        if(!reduced&&inside&&r4>.965){
          drawSquare(px-spacing*.46,py-spacing*.28,size*.30,alpha*.22,1);
        }
        drawSquare(px,py,size,clamp(alpha,0,.99),variant);
      }
    }

    if(!reduced&&!document.hidden)raf=requestAnimationFrame(draw);
  }

  const resizeObserver='ResizeObserver' in window?new ResizeObserver(()=>{
    if(resize()&&reduced)draw(performance.now());
  }):null;
  resizeObserver?.observe(canvas);
  window.addEventListener('resize',()=>{if(!resizeObserver)resize()},{passive:true});
  document.addEventListener('visibilitychange',()=>{
    if(reduced)return;
    if(document.hidden){if(raf)cancelAnimationFrame(raf);raf=0;}
    else if(!raf)raf=requestAnimationFrame(draw);
  });

  resize();
  if(reduced)draw(performance.now());
  else raf=requestAnimationFrame(draw);
})();