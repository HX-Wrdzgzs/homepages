(()=>{
  const mobile=matchMedia('(max-width:620px)');
  if(!mobile.matches)return;
  const canvas=document.querySelector('[data-hero-shader-mobile]');
  if(!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:true,desynchronized:true});
  if(!ctx){canvas.hidden=true;return;}

  const primaryMask=document.createElement('canvas');
  const secondaryMask=document.createElement('canvas');
  const primaryCtx=primaryMask.getContext('2d',{alpha:true,willReadFrequently:true});
  const secondaryCtx=secondaryMask.getContext('2d',{alpha:true,willReadFrequently:true});
  if(!primaryCtx||!secondaryCtx){canvas.hidden=true;return;}

  const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  let cssW=0,cssH=0,dpr=1,primaryData=null,secondaryData=null,raf=0,start=performance.now();

  const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
  const smooth=(v)=>{v=clamp(v,0,1);return v*v*(3-2*v);};
  const hash=(x,y,seed=0)=>{
    let n=(Math.imul(x+31,374761393)^Math.imul(y+67,668265263)^Math.imul(seed+97,2246822519))>>>0;
    n=(n^(n>>>13))>>>0;n=Math.imul(n,1274126177)>>>0;n=(n^(n>>>16))>>>0;
    return n/4294967295;
  };

  function drawTextMask(targetCanvas,targetCtx,text,fontSize,y,maxWidth,weight=900,stretch=1){
    targetCanvas.width=Math.max(1,cssW);
    targetCanvas.height=Math.max(1,cssH);
    targetCtx.clearRect(0,0,cssW,cssH);
    targetCtx.save();
    targetCtx.fillStyle='#000';
    targetCtx.font=`${weight} ${fontSize}px "Arial Black","Arial Narrow",Arial,sans-serif`;
    targetCtx.textBaseline='middle';
    targetCtx.textAlign='center';
    targetCtx.translate(cssW/2,y);
    targetCtx.scale(stretch,1);
    targetCtx.fillText(text,0,0,maxWidth/stretch);
    targetCtx.restore();
    return targetCtx.getImageData(0,0,cssW,cssH).data;
  }

  function rebuildMasks(){
    const primarySize=Math.min(cssH*.43,cssW*.19);
    const secondarySize=Math.min(cssH*.205,cssW*.076);
    primaryData=drawTextMask(primaryMask,primaryCtx,'BA4THG',primarySize,cssH*.35,cssW*.92,900,1.08);
    secondaryData=drawTextMask(secondaryMask,secondaryCtx,'HX-Wrdzgzs',secondarySize,cssH*.74,cssW*.80,800,1.04);
  }

  function sample(data,x,y,threshold=92){
    if(!data||x<0||y<0||x>=cssW||y>=cssH)return 0;
    const ix=clamp(x|0,0,cssW-1);
    const iy=clamp(y|0,0,cssH-1);
    return data[(iy*cssW+ix)*4+3]>threshold?1:0;
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
    rebuildMasks();
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
    if(!cssW||!cssH||!primaryData||!secondaryData)resize();
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,cssW,cssH);

    const t=reduced?3600:now-start;
    const spacing=cssW<390?4.35:4.8;
    // Deliberately slower, constant conveyor-like motion: closer to the steady Cloudflare-style flow than a fast scan.
    const speed=.0225;
    const travel=t*speed;
    const whole=Math.floor(travel/spacing);
    const offset=travel-whole*spacing;
    const probe=spacing*2.15;
    const scanX=(cssW+150)-((t*.043)%(cssW+300));

    let row=0;
    for(let y=spacing*.3;y<cssH-spacing*.1;y+=spacing,row++){
      let col=0;
      for(let x=-spacing-offset;x<cssW+spacing*2.4;x+=spacing,col++){
        const gx=col+whole;
        const gy=row;
        const r1=hash(gx,gy,11);
        const r2=hash(gx,gy,23);
        const r3=hash(gx,gy,47);
        const r4=hash(gx,gy,79);
        const r5=hash(gx,gy,113);

        const inPrimary=sample(primaryData,x,y);
        const inSecondary=sample(secondaryData,x,y,84);
        const inside=inPrimary||inSecondary;
        const nearPrimary=!inside&&(
          sample(primaryData,x-probe,y)||sample(primaryData,x+probe,y)||sample(primaryData,x,y-probe)||sample(primaryData,x,y+probe)||
          sample(primaryData,x-probe*.7,y-probe*.7)||sample(primaryData,x+probe*.7,y+probe*.7)
        );
        const nearSecondary=!inside&&!nearPrimary&&(
          sample(secondaryData,x-probe,y,84)||sample(secondaryData,x+probe,y,84)||sample(secondaryData,x,y-probe,84)||sample(secondaryData,x,y+probe,84)
        );
        const near=nearPrimary||nearSecondary;

        const corridor=Math.exp(-Math.pow((y-cssH*.51)/(cssH*.44),2));
        const wave=.5+.5*Math.sin(gx*.34+gy*.19+t*.00095);
        const scanGlow=Math.exp(-Math.pow((x-scanX)/(spacing*8.5),2));
        const rightFeed=smooth((x+cssW*.08)/(cssW*1.08));

        let keep=false,alpha=0,size=0;
        if(inPrimary){
          keep=r1>.040;
          alpha=(.63+r2*.34)*(.90+.10*wave)+scanGlow*.23;
          size=spacing*(.45+r3*.44);
        }else if(inSecondary){
          keep=r1>.085;
          alpha=(.48+r2*.30)*(.91+.09*wave)+scanGlow*.15;
          size=spacing*(.35+r3*.34);
        }else if(near){
          const secondaryBias=nearSecondary?.035:0;
          keep=r1>(.60+secondaryBias-.08*corridor-.06*scanGlow);
          alpha=(nearSecondary?.075:.11)+r2*(nearSecondary?.17:.23);
          alpha*=1+.66*scanGlow;
          size=spacing*((nearSecondary?.25:.30)+r3*(nearSecondary?.27:.31));
        }else{
          const cloudChance=.934-corridor*.043-rightFeed*.013-scanGlow*.024;
          keep=r1>cloudChance;
          alpha=(.032+r2*.096)*(0.70+.30*corridor)*(1+.44*scanGlow);
          size=spacing*(.20+r3*.23);
        }
        if(!keep)continue;

        const py=y+(r4-.5)*spacing*.46+Math.sin(t*.00102+gx*.31+r5*5.1)*spacing*.11;
        const px=x+(r5-.5)*spacing*.26+Math.sin(t*.00076+gy*.59+r3*4.4)*spacing*.04;
        const variant=r4>.92?2:(r4>.52?1:0);

        if(!reduced&&inside&&r5>(inPrimary?.70:.78)){
          drawSquare(px+spacing*.72,py,size*.64,alpha*.24,1);
          drawSquare(px+spacing*1.42,py,size*.43,alpha*.11,1);
          drawSquare(px+spacing*2.06,py,size*.28,alpha*.045,1);
        }
        if(!reduced&&inPrimary&&r4>.962){
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