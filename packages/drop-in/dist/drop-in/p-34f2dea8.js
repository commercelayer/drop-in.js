let n,t,e=!1;const l={},s=n=>"object"==(n=typeof n)||"function"===n,o=(n,t,...e)=>{let l=null,o=!1,i=!1;const c=[],u=t=>{for(let e=0;e<t.length;e++)l=t[e],Array.isArray(l)?u(l):null!=l&&"boolean"!=typeof l&&((o="function"!=typeof n&&!s(l))&&(l+=""),o&&i?c[c.length-1].t+=l:c.push(o?r(null,l):l),i=o)};u(e);const a=r(n,null);return a.l=t,c.length>0&&(a.o=c),a},r=(n,t)=>({i:0,u:n,t,$:null,o:null,l:null}),i={},c=n=>F(n).h,u=(n,t,e,l,o,r)=>{if(e!==l){let i=U(n,t),c=t.toLowerCase();if("style"===t){for(const t in e)l&&null!=l[t]||(t.includes("-")?n.style.removeProperty(t):n.style[t]="");for(const t in l)e&&l[t]===e[t]||(t.includes("-")?n.style.setProperty(t,l[t]):n.style[t]=l[t])}else if("ref"===t)l&&l(n);else if(i||"o"!==t[0]||"n"!==t[1]){const c=s(l);if((i||c&&null!==l)&&!o)try{if(n.tagName.includes("-"))n[t]=l;else{const s=null==l?"":l;"list"===t?i=!1:null!=e&&n[t]==s||(n[t]=s)}}catch(n){}null==l||!1===l?!1===l&&""!==n.getAttribute(t)||n.removeAttribute(t):(!i||4&r||o)&&!c&&n.setAttribute(t,l=!0===l?"":l)}else t="-"===t[2]?t.slice(3):U(V,c)?c.slice(2):c[2]+t.slice(3),e&&z.rel(n,t,e,!1),l&&z.ael(n,t,l,!1)}},a=(n,t,e,s)=>{const o=11===t.$.nodeType&&t.$.host?t.$.host:t.$,r=n&&n.l||l,i=t.l||l;for(s in r)s in i||u(o,s,r[s],void 0,e,t.i);for(s in i)u(o,s,r[s],i[s],e,t.i)},f=(t,e,l)=>{const s=e.o[l];let o,r,i=0;if(null!==s.t)o=s.$=_.createTextNode(s.t);else if(o=s.$=_.createElement(s.u),a(null,s,!1),null!=n&&o["s-si"]!==n&&o.classList.add(o["s-si"]=n),s.o)for(i=0;i<s.o.length;++i)r=f(t,s,i),r&&o.appendChild(r);return o},$=(n,e,l,s,o,r)=>{let i,c=n;for(c.shadowRoot&&c.tagName===t&&(c=c.shadowRoot);o<=r;++o)s[o]&&(i=f(null,l,o),i&&(s[o].$=i,c.insertBefore(i,e)))},d=(n,t,e,l,s)=>{for(;t<=e;++t)(l=n[t])&&(s=l.$,p(l),s.remove())},h=(n,t)=>n.u===t.u,m=(n,t)=>{const e=t.$=n.$,l=n.o,s=t.o,o=t.t;null===o?("slot"===t.u||a(n,t,!1),null!==l&&null!==s?((n,t,e,l)=>{let s,o=0,r=0,i=t.length-1,c=t[0],u=t[i],a=l.length-1,p=l[0],y=l[a];for(;o<=i&&r<=a;)null==c?c=t[++o]:null==u?u=t[--i]:null==p?p=l[++r]:null==y?y=l[--a]:h(c,p)?(m(c,p),c=t[++o],p=l[++r]):h(u,y)?(m(u,y),u=t[--i],y=l[--a]):h(c,y)?(m(c,y),n.insertBefore(c.$,u.$.nextSibling),c=t[++o],y=l[--a]):h(u,p)?(m(u,p),n.insertBefore(u.$,c.$),u=t[--i],p=l[++r]):(s=f(t&&t[r],e,r),p=l[++r],s&&c.$.parentNode.insertBefore(s,c.$));o>i?$(n,null==l[a+1]?null:l[a+1].$,e,l,r,a):r>a&&d(t,o,i)})(e,l,t,s):null!==s?(null!==n.t&&(e.textContent=""),$(e,null,t,s,0,s.length-1)):null!==l&&d(l,0,l.length-1)):n.t!==o&&(e.data=o)},p=n=>{n.l&&n.l.ref&&n.l.ref(null),n.o&&n.o.map(p)},y=(n,t)=>{t&&!n.m&&t["s-p"]&&t["s-p"].push(new Promise((t=>n.m=t)))},b=(n,t)=>{if(n.i|=16,!(4&n.i))return y(n,n.p),X((()=>w(n,t)));n.i|=512},w=(n,t)=>{const e=n.g;let l;return t&&(n.i|=256,n.v&&(n.v.map((([n,t])=>O(e,n,t))),n.v=null),l=O(e,"componentWillLoad")),k(l,(()=>g(n,e)))},g=async(n,t)=>{const e=n.h,l=e["s-rc"];v(n,t),l&&(l.map((n=>n())),e["s-rc"]=void 0);{const t=e["s-p"],l=()=>j(n);0===t.length?l():(Promise.all(t).then(l),n.i|=4,t.length=0)}},v=(e,l)=>{try{l=l.render(),e.i&=-17,e.i|=2,((e,l)=>{const s=e.h,c=e.j,u=e.M||r(null,null),a=(n=>n&&n.u===i)(l)?l:o(null,null,l);t=s.tagName,c.O&&(a.l=a.l||{},c.O.map((([n,t])=>a.l[t]=s[n]))),a.u=null,a.i|=4,e.M=a,a.$=u.$=s.shadowRoot||s,n=s["s-sc"],m(u,a)})(e,l)}catch(n){W(n,e.h)}return null},j=n=>{const t=n.h,e=n.g,l=n.p;64&n.i||(n.i|=64,L(t),O(e,"componentDidLoad"),n.k(t),l||M()),n.m&&(n.m(),n.m=void 0),512&n.i&&S((()=>b(n,!1))),n.i&=-517},M=()=>{L(_.documentElement),S((()=>(n=>{const t=z.ce("appload",{detail:{namespace:"drop-in"}});return n.dispatchEvent(t),t})(V)))},O=(n,t,e)=>{if(n&&n[t])try{return n[t](e)}catch(n){W(n)}},k=(n,t)=>n&&n.then?n.then(t):t(),L=n=>n.classList.add("hydrated"),P=(n,t,e)=>{if(t.L){n.watchers&&(t.P=n.watchers);const l=Object.entries(t.L),o=n.prototype;if(l.map((([n,[l]])=>{(31&l||2&e&&32&l)&&Object.defineProperty(o,n,{get(){return((n,t)=>F(this).C.get(t))(0,n)},set(e){((n,t,e,l)=>{const o=F(n),r=o.h,i=o.C.get(t),c=o.i,u=o.g;if(e=((n,t)=>null==n||s(n)?n:2&t?parseFloat(n):1&t?n+"":n)(e,l.L[t][0]),(!(8&c)||void 0===i)&&e!==i&&(!Number.isNaN(i)||!Number.isNaN(e))&&(o.C.set(t,e),u)){if(l.P&&128&c){const n=l.P[t];n&&n.map((n=>{try{u[n](e,i,t)}catch(n){W(n,r)}}))}2==(18&c)&&b(o,!1)}})(this,n,e,t)},configurable:!0,enumerable:!0})})),1&e){const e=new Map;o.attributeChangedCallback=function(n,t,l){z.jmp((()=>{const t=e.get(n);if(this.hasOwnProperty(t))l=this[t],delete this[t];else if(o.hasOwnProperty(t)&&"number"==typeof this[t]&&this[t]==l)return;this[t]=(null!==l||"boolean"!=typeof this[t])&&l}))},n.observedAttributes=l.filter((([n,t])=>15&t[0])).map((([n,l])=>{const s=l[1]||n;return e.set(s,n),512&l[0]&&t.O.push([n,s]),s}))}}return n},x=(n,t={})=>{const e=[],l=t.exclude||[],s=V.customElements,o=_.head,r=o.querySelector("meta[charset]"),i=_.createElement("style"),c=[];let u,a=!0;Object.assign(z,t),z.N=new URL(t.resourcesUrl||"./",_.baseURI).href,n.map((n=>{n[1].map((t=>{const o={i:t[0],T:t[1],L:t[2],A:t[3]};o.L=t[2],o.A=t[3],o.O=[],o.P={};const r=o.T,i=class extends HTMLElement{constructor(n){super(n),R(n=this,o),1&o.i&&n.attachShadow({mode:"open"})}connectedCallback(){u&&(clearTimeout(u),u=null),a?c.push(this):z.jmp((()=>(n=>{if(0==(1&z.i)){const t=F(n),e=t.j,l=()=>{};if(1&t.i)C(n,t,e.A);else{t.i|=1;{let e=n;for(;e=e.parentNode||e.host;)if(e["s-p"]){y(t,t.p=e);break}}e.L&&Object.entries(e.L).map((([t,[e]])=>{if(31&e&&n.hasOwnProperty(t)){const e=n[t];delete n[t],n[t]=e}})),(async(n,t,e,l,s)=>{if(0==(32&t.i)){if(t.i|=32,(s=D(e)).then){const n=()=>{};s=await s,n()}s.isProxied||(e.P=s.watchers,P(s,e,2),s.isProxied=!0);const n=()=>{};t.i|=8;try{new s(t)}catch(n){W(n)}t.i&=-9,t.i|=128,n()}const o=t.p,r=()=>b(t,!0);o&&o["s-rc"]?o["s-rc"].push(r):r()})(0,t,e)}l()}})(this)))}disconnectedCallback(){z.jmp((()=>(()=>{if(0==(1&z.i)){const n=F(this);n.F&&(n.F.map((n=>n())),n.F=void 0)}})()))}componentOnReady(){return F(this).H}};o.R=n[0],l.includes(r)||s.get(r)||(e.push(r),s.define(r,P(i,o,1)))}))})),i.innerHTML=e+"{visibility:hidden}.hydrated{visibility:inherit}",i.setAttribute("data-styles",""),o.insertBefore(i,r?r.nextSibling:o.firstChild),a=!1,c.length?c.map((n=>n.connectedCallback())):z.jmp((()=>u=setTimeout(M,30)))},C=(n,t,e)=>{e&&e.map((([e,l,s])=>{const o=N(n,e),r=E(t,s),i=T(e);z.ael(o,l,r,i),(t.F=t.F||[]).push((()=>z.rel(o,l,r,i)))}))},E=(n,t)=>e=>{try{256&n.i?n.g[t](e):(n.v=n.v||[]).push([t,e])}catch(n){W(n)}},N=(n,t)=>8&t?V:n,T=n=>0!=(2&n),A=new WeakMap,F=n=>A.get(n),H=(n,t)=>A.set(t.g=n,t),R=(n,t)=>{const e={i:0,h:n,j:t,C:new Map};return e.H=new Promise((n=>e.k=n)),n["s-p"]=[],n["s-rc"]=[],C(n,e,t.A),A.set(n,e)},U=(n,t)=>t in n,W=(n,t)=>(0,console.error)(n,t),q=new Map,D=n=>{const t=n.T.replace(/-/g,"_"),e=n.R,l=q.get(e);return l?l[t]:import(`./${e}.entry.js`).then((n=>(q.set(e,n),n[t])),W)
/*!__STENCIL_STATIC_IMPORT_SWITCH__*/},V="undefined"!=typeof window?window:{},_=V.document||{head:{}},z={i:0,N:"",jmp:n=>n(),raf:n=>requestAnimationFrame(n),ael:(n,t,e,l)=>n.addEventListener(t,e,l),rel:(n,t,e,l)=>n.removeEventListener(t,e,l),ce:(n,t)=>new CustomEvent(n,t)},B=n=>Promise.resolve(n),G=[],I=[],J=(n,t)=>l=>{n.push(l),e||(e=!0,t&&4&z.i?S(Q):z.raf(Q))},K=n=>{for(let t=0;t<n.length;t++)try{n[t](performance.now())}catch(n){W(n)}n.length=0},Q=()=>{K(G),K(I),(e=G.length>0)&&z.raf(Q)},S=n=>B().then(n),X=J(I,!0);export{i as H,x as b,c as g,o as h,B as p,H as r}