(function(){
const LEAK=/[a-z]+[A-Z][a-zA-Z]+|[a-z]+_[a-z_]+|\w+\s*=\s*(true|false|\d)|recordVersion|snapshot|NP[A-Z]\w+|sc-[a-z-]+/;
const AR=/[؀-ۿ]/;
function mapFs(f){ if(f<11.95) return 13; if(f<12.95) return 14; if(f<13.95) return 14.5; return f; }
(function(){const st=document.createElement('style');st.id='np-v2';st.textContent='.f::before{background-image:none!important;height:108px!important}.f::after{border-radius:0!important;inset-block-start:108px!important;inset-inline-start:0!important;width:100%!important}';document.head.appendChild(st);})();
window.__restyle=function(f){
  const st={leakHidden:0,fontUp:0,gradFlat:0};
  // 1 gradients
  f.querySelectorAll('*').forEach(e=>{
    const cs=getComputedStyle(e); const bi=cs.backgroundImage;
    if(bi&&bi.includes('gradient')&&!bi.includes('repeating')){
      const r=e.getBoundingClientRect();
      if(e.classList.contains('sweep')||(r.height<=60&&r.width>=100&&bi.includes('radial'))){e.style.display='none';}
      else{
        e.style.backgroundImage='none';
        const bc=cs.backgroundColor; const isBtn=e.tagName==='BUTTON'||/btn/.test(e.className.toString()); if(bc==='rgba(0, 0, 0, 0)'||bc==='transparent'){ e.style.backgroundColor=isBtn?'var(--brand-primary,#2962FF)':'var(--brand-deep,#1A237E)'; }
      }
      st.gradFlat++;
    }
  });
  // header wave: flatten curved bottom
  f.querySelectorAll('.hero,.hdr,.hd,.head,.hbar').forEach(e=>{e.style.borderRadius='0';});
  // 2 leaks
  const w=document.createTreeWalker(f,NodeFilter.SHOW_TEXT); const nodes=[]; let n; while(n=w.nextNode()) nodes.push(n);
  nodes.forEach(n=>{
    const t=n.textContent.trim(); if(!t) return;
    if(LEAK.test(t)){
      const el=n.parentElement;
      if(!AR.test(t) || t.length<48 && !AR.test(t.replace(/\(snapshot[^)]*\)/,''))){ el.style.display='none'; st.leakHidden++; }
      else { n.textContent=n.textContent.replace(/\(?snapshot[^)·—]*\)?/g,'').replace(/\b\w*[A-Z]\w*\s*=\s*\w+/g,'').replace(/NP[A-Z]\w+\s*—[^.]*/g,'').replace(/\b[a-z]+(_[a-z]+)+\b/g,'').replace(/\s{2,}/g,' '); st.leakHidden++; }
    }
  });
  // 3 fonts
  f.querySelectorAll('*').forEach(e=>{
    if(e instanceof SVGElement) return;
    const hasText=[...e.childNodes].some(c=>c.nodeType===3&&c.textContent.trim());
    if(!hasText) return;
    const fs=parseFloat(getComputedStyle(e).fontSize); const nf=mapFs(fs);
    if(nf!==fs){e.style.fontSize=nf+'px'; e.style.lineHeight='1.35'; st.fontUp++;}
  });
  // 4 fit
  const cont=f.querySelector('.bd')||f.querySelector('.body');
  if(cont){ let k=0; const over=()=>cont.scrollHeight-cont.clientHeight;
    if(over()>2&&over()<70){
      while(over()>2&&k<10){ k++;
        cont.querySelectorAll('*').forEach(e=>{ if(e instanceof SVGElement) return; const cs=getComputedStyle(e);
          const g=parseFloat(cs.rowGap); if(g>6) e.style.rowGap=(g-2)+'px';
          const pt=parseFloat(cs.paddingTop),pb=parseFloat(cs.paddingBottom);
          if(pt>8&&e.children.length>0) e.style.paddingTop=(pt-2)+'px'; if(pb>8&&e.children.length>0) e.style.paddingBottom=(pb-2)+'px'; });
      } st.fit=k; }
  }
  return st;
};
window.__measure=function(f){
  const fr=f.getBoundingClientRect(); let minfs=99,small=0,tot=0,grad=0,leak=0,over=0,clip=0;
  const w=document.createTreeWalker(f,NodeFilter.SHOW_TEXT); let n;
  while(n=w.nextNode()){const t=n.textContent.trim(); if(!t) continue; const el=n.parentElement; const cs=getComputedStyle(el); if(cs.display==='none'||el.closest('[style*="display: none"]')) continue;
    const fs=parseFloat(cs.fontSize); tot+=t.length; if(fs<12.5){small+=t.length;} minfs=Math.min(minfs,fs);
    if(LEAK.test(t)) leak++;
    const r=n.parentElement.getBoundingClientRect(); if(r.width>0&&(r.bottom>fr.bottom+1||r.right>fr.right+2||r.left<fr.left-2)) over++;
  }
  f.querySelectorAll('*').forEach(e=>{const cs=getComputedStyle(e); if(cs.backgroundImage.includes('gradient')&&!cs.backgroundImage.includes('repeating')&&cs.display!=='none') grad++;
    if((cs.overflow==='hidden'||cs.overflowY==='hidden')&&e.scrollHeight>e.clientHeight+2&&e.clientHeight>40&&!e.classList.contains('hero')) clip++;});
  return {minfs,small,tot,grad,leak,over,clip};
};
})();
