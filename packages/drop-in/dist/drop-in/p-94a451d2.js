import{l as i,u as t,i as c,c as e,a as n,g as r}from"./p-e22d4299.js";function s(i){return i.sku}const o=async(n,r=Array.from(document.querySelectorAll("cl-price")))=>{await customElements.whenDefined("cl-price"),i("group","registerPrices invoked"),i("info","found",r.length,"cl-price");const o=t(r.map(s).filter(c));i("info","found",o.length,"unique skus",o);const a=e(o,25),u=(await Promise.all(a.map((async i=>await n.prices.list({pageSize:25,filters:{sku_code_in:i.join(",")}}))))).flat().reduce(((i,t)=>(void 0!==t.sku_code&&(i[t.sku_code]=t),i)),{});r.forEach((i=>{const t=s(i);if(void 0!==t){const c=u[t];null!=c&&i.dispatchEvent(new CustomEvent("priceUpdate",{detail:c}))}})),i("groupEnd")},a={"cl-price":function(i){return"cl-price"===i.nodeName.toLowerCase()}},u=async function(){const i=await n(r());await o(i),new MutationObserver((t=>{const c=t.reduce(((i,t)=>("childList"===t.type&&Object.keys(a).forEach((c=>{i[c].push(...Array.from(t.addedNodes).filter(a[c])),i[c].push(...Array.from(t.addedNodes).flatMap((i=>Array.from(i.querySelectorAll(c)))))})),i)),{"cl-price":[]});o(i,c["cl-price"]).catch((i=>{throw i}))})).observe(document.body,{childList:!0,subtree:!0})};export{u as i}