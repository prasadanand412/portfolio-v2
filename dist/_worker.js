var e=(e,t,n)=>(r,i)=>{let a=-1;return o(0);async function o(s){if(s<=a)throw Error(`next() called multiple times`);a=s;let c,l=!1,u;if(e[s]?(u=e[s][0][0],r.req.routeIndex=s):u=s===e.length&&i||void 0,u)try{c=await u(r,()=>o(s+1))}catch(e){if(e instanceof Error&&t)r.error=e,c=await t(e,r),l=!0;else throw e}else r.finalized===!1&&n&&(c=await n(r));return c&&(r.finalized===!1||l)&&(r.res=c),r}},t=Symbol(),n=(e,t)=>new Response(e,{headers:{"Content-Type":t.replace(/^[^;]+/,e=>e.toLowerCase())}}).formData(),r=32,i=1e4,a=e=>`headers`in e,o=async(e,t=Object.create(null))=>{let{all:n=!1,dot:r=!1}=t,i=(a(e)?e.headers:e.raw.headers).get(`Content-Type`)?.split(`;`)[0].trim().toLowerCase();return i===`multipart/form-data`||i===`application/x-www-form-urlencoded`?s(e,{all:n,dot:r}):{}};async function s(e,t){if(!a(e)&&e.bodyCache.formData)return c(await e.bodyCache.formData,t);let r=a(e)?e.headers:e.raw.headers,i=n(await e.arrayBuffer(),r.get(`Content-Type`)||``);a(e)||(e.bodyCache.formData=i);let o=await i;return o?c(o,t):{}}function c(e,t){let n=Object.create(null),r={count:0};return e.forEach((e,r)=>{t.all||r.endsWith(`[]`)?l(n,r,e):n[r]=e}),t.dot&&Object.entries(n).forEach(([e,t])=>{e.includes(`.`)&&(u(n,e,t,r),delete n[e])}),n}var l=(e,t,n)=>{e[t]===void 0?e[t]=t.endsWith(`[]`)?[n]:n:Array.isArray(e[t])?e[t].push(n):e[t]=[e[t],n]},u=(e,t,n,a)=>{if(/(?:^|\.)__proto__\./.test(t))return;let o=e,s=t.split(`.`,r+2);s.length>r+1&&d(),s.forEach((e,t)=>{t===s.length-1?o[e]=n:((!o[e]||typeof o[e]!=`object`||Array.isArray(o[e])||o[e]instanceof File)&&(a.count++>=i&&d(),o[e]=Object.create(null)),o=o[e])})},d=()=>{throw Error(`Nesting limit exceeded`)},f=e=>{let t=e.split(`/`);return t[0]===``&&t.shift(),t},p=e=>{let{groups:t,path:n}=m(e);return h(f(n),t)},m=e=>{let t=[];return e=e.replace(/\{[^}]+\}/g,(e,n)=>{let r=`@${n}`;return t.push([r,e]),r}),{groups:t,path:e}},h=(e,t)=>{for(let n=t.length-1;n>=0;n--){let[r]=t[n];for(let i=e.length-1;i>=0;i--)if(e[i].includes(r)){e[i]=e[i].replace(r,t[n][1]);break}}return e},g={},_=(e,t)=>{if(e===`*`)return`*`;let n=e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);if(n){let r=`${e}#${t}`;return g[r]||(g[r]=n[2]?t&&t[0]!==`:`&&t[0]!==`*`?[r,n[1],RegExp(`^${n[2]}(?=/${t})`)]:[e,n[1],RegExp(`^${n[2]}$`)]:[e,n[1],!0]),g[r]}return null},v=(e,t)=>{try{return t(e)}catch{return e.replace(/(?:%[0-9A-Fa-f]{2})+/g,e=>{try{return t(e)}catch{return e}})}},y=e=>v(e,decodeURI),b=e=>{let t=e.url,n=t.indexOf(`/`,t.indexOf(`:`)+4),r=n;for(;r<t.length;r++){let e=t.charCodeAt(r);if(e===37){let e=t.indexOf(`?`,r),i=t.indexOf(`#`,r),a=e===-1?i===-1?void 0:i:i===-1?e:Math.min(e,i),o=t.slice(n,a);return y(o.includes(`%25`)?o.replace(/%25/g,`%2525`):o)}if(e===63||e===35)break}return t.slice(n,r)},ee=e=>{let t=b(e);return t.length>1&&t.at(-1)===`/`?t.slice(0,-1):t},x=(e,t,...n)=>(n.length&&(t=x(t,...n)),`${e?.[0]===`/`?``:`/`}${e}${t===`/`?``:`${e?.at(-1)===`/`?``:`/`}${t?.[0]===`/`?t.slice(1):t}`}`),S=e=>{if(e.charCodeAt(e.length-1)!==63||!e.includes(`:`))return null;let t=e.split(`/`),n=[],r=``;return t.forEach(e=>{if(e!==``&&!/\:/.test(e))r+=`/`+e;else if(/\:/.test(e)){if(e.charCodeAt(e.length-1)===63){n.length===0&&r===``?n.push(`/`):n.push(r);let t=e.slice(0,-1);r+=`/`+t,n.push(r)}else r+=`/`+e}}),n.filter((e,t,n)=>n.indexOf(e)===t)},C=e=>e.indexOf(`%`)===-1?e:v(e,ne),w=e=>(e.indexOf(`+`)!==-1&&(e=e.replace(/\+/g,` `)),C(e)),T=(e,t,n)=>{let r=e.indexOf(`#`,8);r!==-1&&(e=e.slice(0,r));let i;if(!n&&t&&t.indexOf(`%`)===-1&&t.indexOf(`+`)===-1){let n=e.indexOf(`?`,8);if(n===-1)return;for(e.startsWith(t,n+1)||(n=e.indexOf(`&${t}`,n+1));n!==-1;){let r=e.charCodeAt(n+t.length+1);if(r===61){let r=n+t.length+2,i=e.indexOf(`&`,r);return w(e.slice(r,i===-1?void 0:i))}if(r==38||isNaN(r))return``;n=e.indexOf(`&${t}`,n+1)}if(i=/[%+]/.test(e),!i)return}let a=Object.create(null);i??=/[%+]/.test(e);let o=e.indexOf(`?`,8);for(;o!==-1;){let t=e.indexOf(`&`,o+1),r=e.indexOf(`=`,o);r>t&&t!==-1&&(r=-1);let s=e.slice(o+1,r===-1?t===-1?void 0:t:r);if(i&&(s=w(s)),o=t,s===``)continue;let c;r===-1?c=``:(c=e.slice(r+1,t===-1?void 0:t),i&&(c=w(c))),n?(a[s]&&Array.isArray(a[s])||(a[s]=[]),a[s].push(c)):a[s]??=c}return t?a[t]:a},E=T,te=(e,t)=>T(e,t,!0),ne=decodeURIComponent,re=class{raw;#e;#t;routeIndex=0;path;bodyCache={};constructor(e,t=`/`,n=[[]]){this.raw=e,this.path=t,this.#t=n}param(e){return e?this.#n(e):this.#r()}#n(e){let t=this.#t[0][this.routeIndex]?.[1][e],n=this.#i(t);return n&&C(n)}#r(){let e={},t=Object.keys(this.#t[0][this.routeIndex]?.[1]??{});for(let n of t){let t=this.#i(this.#t[0][this.routeIndex][1][n]);t!==void 0&&(e[n]=C(t))}return e}#i(e){return this.#t[1]?this.#t[1][e]:e}query(e){return E(this.url,e)}queries(e){return te(this.url,e)}header(e){if(e)return this.raw.headers.get(e)??void 0;let t=Object.create(null);return this.raw.headers.forEach((e,n)=>{t[n]=e}),t}async parseBody(e){return o(this,e)}#a=e=>{let{bodyCache:t,raw:n}=this,r=t[e];if(r)return r;for(let n in t)return t[n].then(t=>(n===`json`&&(t=JSON.stringify(t)),new Response(t)[e]()));return t[e]=n[e]()};json(){return this.#a(`text`).then(e=>JSON.parse(e))}text(){return this.#a(`text`)}arrayBuffer(){return this.#a(`arrayBuffer`)}bytes(){return this.#a(`arrayBuffer`).then(e=>new Uint8Array(e))}blob(){return this.#a(`blob`)}formData(){return this.#a(`formData`)}addValidatedData(e,t){(this.#e??={})[e]=t}valid(e){return this.#e?.[e]}get url(){return this.raw.url}get method(){return this.raw.method}get[t](){return this.#t}get matchedRoutes(){return this.#t[0].map(([[,e]])=>e)}get routePath(){return this.#t[0].map(([[,e]])=>e)[this.routeIndex].path}},ie={Stringify:1,BeforeStream:2,Stream:3},ae=(e,t)=>{let n=new String(e);return n.isEscaped=!0,n.callbacks=t,n},D=async(e,t,n,r,i)=>{typeof e==`object`&&!(e instanceof String)&&(e instanceof Promise||(e=e.toString()),e instanceof Promise&&(e=await e));let a=e.callbacks;if(!a?.length)return Promise.resolve(e);i?i[0]+=e:i=[e];let o=Promise.all(a.map(e=>e({phase:t,buffer:i,context:r}))).then(e=>Promise.all(e.filter(Boolean).map(e=>D(e,t,!1,r,i))).then(()=>i[0]));return n?ae(await o,a):o},O=`text/plain; charset=UTF-8`,k=(e,t)=>({"Content-Type":e,...t}),A=(e,t)=>new Response(e,t),oe=class{#e;#t;env={};#n;finalized=!1;error;#r;#i;#a;#o;#s;#c;#l;#u;#d;constructor(e,t){this.#e=e,t&&(this.#i=t.executionCtx,this.env=t.env,this.#c=t.notFoundHandler,this.#d=t.path,this.#u=t.matchResult)}get req(){return this.#t??=new re(this.#e,this.#d,this.#u),this.#t}get event(){if(this.#i&&`respondWith`in this.#i)return this.#i;throw Error(`This context has no FetchEvent`)}get executionCtx(){if(this.#i)return this.#i;throw Error(`This context has no ExecutionContext`)}get res(){return this.#a||=A(null,{headers:this.#l??=new Headers})}set res(e){if(this.#a&&e){e=A(e.body,e);for(let[t,n]of this.#a.headers.entries())if(t!==`content-type`){if(t===`set-cookie`){let t=this.#a.headers.getSetCookie();e.headers.delete(`set-cookie`);for(let n of t)e.headers.append(`set-cookie`,n)}else e.headers.set(t,n)}}this.#a=e,this.finalized=!0}render=(...e)=>(this.#s??=e=>this.html(e),this.#s(...e));setLayout=e=>this.#o=e;getLayout=()=>this.#o;setRenderer=e=>{this.#s=e};header=(e,t,n)=>{this.finalized&&(this.#a=A(this.#a.body,this.#a));let r=this.#a?this.#a.headers:this.#l??=new Headers;t===void 0?r.delete(e):n?.append?r.append(e,t):r.set(e,t)};status=e=>{this.#r=e};set=(e,t)=>{this.#n??=new Map,this.#n.set(e,t)};get=e=>this.#n?this.#n.get(e):void 0;get var(){return this.#n?Object.fromEntries(this.#n):{}}#f(e,t,n){let r=this.#a?new Headers(this.#a.headers):this.#l;if(typeof t==`object`&&t.headers){r??=new Headers;for(let[e,n]of new Headers(t.headers))e===`set-cookie`?r.append(e,n):r.set(e,n)}if(n){if(!r){let e=0;for(let t in n)if(++e>1||typeof n[t]!=`string`){r=new Headers;break}}if(r)for(let e in n){let t=n[e];if(typeof t==`string`)r.set(e,t);else{r.delete(e);for(let n of t)r.append(e,n)}}}return A(e,{status:typeof t==`number`?t:t?.status??this.#r,headers:r??n})}newResponse=(...e)=>this.#f(...e);body=(e,t,n)=>this.#f(e,t,n);text=(e,t,n)=>!this.#l&&!this.#r&&!t&&!n&&!this.finalized?new Response(e):this.#f(e,t,k(O,n));json=(e,t,n)=>this.#f(JSON.stringify(e),t,k(`application/json`,n));html=(e,t,n)=>{let r=e=>this.#f(e,t,k(`text/html; charset=UTF-8`,n));return typeof e==`object`?D(e,ie.Stringify,!1,{}).then(r):r(e)};redirect=(e,t)=>{let n=String(e);return this.header(`Location`,/[^\x00-\xFF]/.test(n)?encodeURI(n):n),this.newResponse(null,t??302)};notFound=()=>(this.#c??=()=>A(),this.#c(this))},se=[`get`,`post`,`put`,`delete`,`options`,`patch`,`query`],j=`Can not add a route since the matcher is already built.`,M=class extends Error{},ce=`__COMPOSED_HANDLER`,le=e=>e.text(`404 Not Found`,404),N=(e,t)=>{if(`getResponse`in e){let n=e.getResponse();return t.newResponse(n.body,n)}return console.error(e),t.text(`Internal Server Error`,500)},ue=class t{get;post;put;delete;options;patch;query;all;on;use;router;getPath;_basePath=`/`;#e=`/`;routes=[];constructor(e={}){[...se,`all`].forEach(e=>{this[e]=(t,...n)=>(typeof t==`string`?this.#e=t:this.#r(e,this.#e,t),n.forEach(t=>{this.#r(e,this.#e,t)}),this)}),this.on=(e,t,...n)=>{for(let r of[t].flat()){this.#e=r;for(let t of[e].flat())n.map(e=>{this.#r(t.toUpperCase(),this.#e,e)})}return this},this.use=(e,...t)=>(typeof e==`string`?this.#e=e:(this.#e=`*`,t.unshift(e)),t.forEach(e=>{this.#r(`ALL`,this.#e,e)}),this);let{strict:t,...n}=e;Object.assign(this,n),this.getPath=t??!0?e.getPath??b:ee}#t(){let e=new t({router:this.router,getPath:this.getPath});return e.errorHandler=this.errorHandler,e.#n=this.#n,e.routes=this.routes,e}#n=le;errorHandler=N;route(t,n){let r=this.basePath(t);return n.routes.map(t=>{let i;n.errorHandler===N?i=t.handler:(i=async(r,i)=>(await e([],n.errorHandler)(r,()=>t.handler(r,i))).res,i[ce]=t.handler),r.#r(t.method,t.path,i,t.basePath)}),this}basePath(e){let t=this.#t();return t._basePath=x(this._basePath,e),t}onError=e=>(this.errorHandler=e,this);notFound=e=>(this.#n=e,this);mount(e,t,n){let r,i;n&&(typeof n==`function`?i=n:(i=n.optionHandler,r=n.replaceRequest===!1?e=>e:n.replaceRequest));let a=i?e=>{let t=i(e);return Array.isArray(t)?t:[t]}:e=>{let t;try{t=e.executionCtx}catch{}return[e.env,t]};return r||=(()=>{let t=x(this._basePath,e),n=t===`/`?0:t.length;return e=>{let t=new URL(e.url);return t.pathname=this.getPath(e).slice(n)||`/`,new Request(t,e)}})(),this.#r(`ALL`,x(e,`*`),async(e,n)=>{let i=await t(r(e.req.raw),...a(e));if(i)return i;await n()}),this}#r(e,t,n,r){e=e.toUpperCase(),t=x(this._basePath,t);let i={basePath:r===void 0?this._basePath:x(this._basePath,r),path:t,method:e,handler:n};this.router.add(e,t,[n,i]),this.routes.push(i)}#i(e,t){if(e instanceof Error)return this.errorHandler(e,t);throw e}#a(t,n,r,i){if(i===`HEAD`)return(async()=>new Response(null,await this.#a(t,n,r,`GET`)))();let a=this.getPath(t,{env:r}),o=this.router.match(i,a),s=new oe(t,{path:a,matchResult:o,env:r,executionCtx:n,notFoundHandler:this.#n});if(o[0].length===1){let e;try{e=o[0][0][0][0](s,async()=>{s.res=await this.#n(s)})}catch(e){return this.#i(e,s)}return e instanceof Promise?e.then(e=>e||(s.finalized?s.res:this.#n(s))).catch(e=>this.#i(e,s)):e??this.#n(s)}let c=e(o[0],this.errorHandler,this.#n);return(async()=>{try{let e=await c(s);if(!e.finalized)throw Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");return e.res}catch(e){return this.#i(e,s)}})()}fetch=(e,...t)=>this.#a(e,t[1],t[0],e.method);request=(e,t,n,r)=>e instanceof Request?this.fetch(t?new Request(e,t):e,n,r):(e=e.toString(),this.fetch(new Request(/^https?:\/\//.test(e)?e:`http://localhost${x(`/`,e)}`,t),n,r));fire=()=>{addEventListener(`fetch`,e=>{e.respondWith(this.#a(e.request,e,void 0,e.request.method))})}},P=()=>Object.create(null),F=[];function de(e,t){let n=this.buildAllMatchers(),r=((e,t)=>{let r=n[e]||n.ALL,i=r[2][t];if(i)return i;let a=t.match(r[0]);if(!a)return[[],F];let o=a.indexOf(``,1);return[r[1][o],a]});return this.match=r,r(e,t)}var I=`[^/]+`,L=`(?:|/.*)`,R=Symbol(),z=new Set(`.\\+*[^]$()`);function B(e,t){return e.length===1?t.length===1?e<t?-1:1:-1:t.length===1?1:e===`.*`||e===`(?:|/.*)`?t===`(?:|/.*)`?-1:1:t===`.*`||t===`(?:|/.*)`?-1:e===`[^/]+`?1:t===`[^/]+`?-1:e.length===t.length?e<t?-1:1:t.length-e.length}var V=class e{#e;#t;#n=P();insert(t,n,r,i,a){let o=this;for(let n=0,a=t.length;n<a;n++){let s=t[n],c=s.length===1?s===`*`?n===a-1?[``,``,`.*`]:[``,``,I]:null:s===`/*`?[``,``,L]:s.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/),l;if(c){let t=c[1],n=c[2]||`[^/]+`;if(t&&c[2]&&(n===`.*`||(n=n.replace(/^\((?!\?:)(?=[^)]+\)$)/,`(?:`),/\((?!\?:)/.test(n))||n.length===1&&z.has(n)))throw R;if(l=o.#n[n],!l){if(n!==`.*`&&n!==`(?:|/.*)`){for(let e in o.#n)if((n.length>1||e.length>1)&&e!==`.*`&&e!==`(?:|/.*)`)throw R}l=o.#n[n]=new e}t!==``&&(l.#t??=i.varIndex++,r.push([t,l.#t]))}else if(l=o.#n[s],!l){for(let e in o.#n)if(e.length>1&&e!==`.*`&&e!==`(?:|/.*)`)throw R;l=o.#n[s]=new e}o=l}if(o.#e!==void 0)throw R;o.#e=a?-1:n}buildRegExpStr(){let e=Object.keys(this.#n).sort(B).map(e=>{let t=this.#n[e],n=t.buildRegExpStr();return n===``?``:(typeof t.#t==`number`?`(${e})@${t.#t}`:z.has(e)?`\\${e}`:e)+n}).filter(Boolean);return typeof this.#e==`number`&&this.#e!==-1&&e.unshift(`#${this.#e}`),e.length===0?``:e.length===1?e[0]:`(?:`+e.join(`|`)+`)`}},H=class{#e={varIndex:0};#t=new V;#n=0;paths=P();insert(e,t){if(t){this.#t.insert(e.split(``),0,[],this.#e,!0);return}let n=[],r=[],i=e;for(let e=0;;){let t=!1;if(i=i.replace(/\{[^}]+\}/g,n=>{let i=`@\\${e}`;return r[e]=[i,n],e++,t=!0,i}),!t)break}let a=i.match(/(?::[^\/]+)|(?:\/\*$)|./g)||[];for(let e=r.length-1;e>=0;e--){let[t]=r[e];for(let n=a.length-1;n>=0;n--)if(a[n].indexOf(t)!==-1){a[n]=a[n].replace(t,r[e][1]);break}}this.#t.insert(a,this.#n,n,this.#e,!1),this.paths[e]=[this.#n++,n]}buildRegExp(){let e=this.#t.buildRegExpStr();if(e===``)return[/^$/,[],[]];let t=0,n=[],r=[];return e=e.replace(/#(\d+)|@(\d+)|\.\*\$/g,(e,i,a)=>i===void 0?(a===void 0||(r[Number(a)]=++t),``):(n[++t]=Number(i),`$()`)),[RegExp(`^${e}`),n,r]}},U=P();function W(e){return U[e]??=RegExp(`^${e.replace(/\/:[^/{}]+(?:\{\[\^\/]\+})?(?=[/{]|$)|\/?\*$|([.\\+*[^\]$()?{}|])/g,(e,t)=>t?`\\${t}`:e===`/*`?L:e===`*`?`.*`:`/:${I}`)}$`)}function G(e,t){for(let n of Object.keys(e).sort((e,t)=>t.length-e.length))if(W(n).test(t))return[...e[n]]}var fe=class{name=`RegExpRouter`;#e;#t;#n;constructor(){this.#e={ALL:P()},this.#t={ALL:P()},this.#n={ALL:new H}}#r(e,t){try{this.#n[e].insert(t,!/\*|\/:/.test(t))}catch(e){throw e===R?new M(t):e}}add(e,t,n){let r=this.#e,i=this.#t;if(!r)throw Error(j);if(!r[e]){this.#n[e]=new H;for(let t of[r,i]){t[e]=P();for(let n in t.ALL)t[e][n]=[...t.ALL[n]],this.#r(e,n)}}t===`/*`&&(t=`*`);let a=e===`ALL`?Object.keys(r):[e];if(/\*$/.test(t)){let e=W(t);for(let e of a)r[e][t]||(this.#r(e,t),r[e][t]=G(r[e],t)||G(r.ALL,t)||[]);for(let o of[r,i])for(let r of a)for(let i in o[r])e.test(i)&&o[r][i].push([n,t]);return}let o=S(t)||[t];for(let e of o)for(let t of a)i[t][e]||(this.#r(t,e),i[t][e]=G(r[t],e)||G(r.ALL,e)||[]),i[t][e].push([n,e])}match=de;buildAllMatchers(){let e=P();for(let t of Object.keys(this.#t))e[t]=this.#i(t);return this.#e=this.#t=this.#n=void 0,U=P(),e}#i(e){let t=this.#e[e],n=this.#t[e],r=this.#n[e],i=P(),a=[],[o,s,c]=r.buildRegExp();for(let e of[t,n])for(let t in e){let n=e[t],o=r.paths[t];if(!o){i[t]=[n.map(([e])=>[e,P()]),F];continue}a[o[0]]=n.map(([e,t])=>[e,r.paths[t][1].reduceRight((e,[t],n)=>(e[t]=c[o[1][n][1]],e),P())])}return[o,s.map(e=>a[e]),i]}},pe=class{name=`SmartRouter`;#e=[];#t=[];constructor(e){this.#e=e.routers}add(e,t,n){if(!this.#t)throw Error(j);this.#t.push([e,t,n])}match(e,t){if(!this.#t)throw Error(`Fatal error`);let n=this.#e,r=this.#t,i=n.length,a=0,o;for(;a<i;a++){let i=n[a];try{for(let e=0,t=r.length;e<t;e++)i.add(...r[e]);o=i.match(e,t)}catch(e){if(e instanceof M)continue;throw e}this.match=i.match.bind(i),this.#e=[i],this.#t=void 0;break}if(a===i)throw Error(`Fatal error`);return this.name=`SmartRouter + ${this.activeRouter.name}`,o}get activeRouter(){if(this.#t||this.#e.length!==1)throw Error(`No active router has been determined yet.`);return this.#e[0]}},K=P(),me=0,he=class e{#e=[];#t=P();#n=[];#r;#i=K;insert(t,n,r){let i=this,a=p(n),o=new Set,s=0;for(let t of a){let n=a[++s],r=_(t,n)||(n===void 0&&t&&t.indexOf(`*`)===t.length-1?t:null),c=Array.isArray(r),l=c?r[0]:r||t,u=i.#t[l]||=new e;r&&!u.#r&&(u.#r=r,i.#n.push(u)),i=u,c&&o.add(r[1])}i.#e.push({[t]:{handler:r,possibleKeys:[...o],score:++me}})}#a(e,t,n,r,i){for(let a=0,o=t.#e.length;a<o;a++){let o=t.#e[a],s=o[n]||o.ALL;if(s){s.params=P(),e.push(s);for(let e=0,t=s.possibleKeys.length;e<t;e++){let t=s.possibleKeys[e];s.params[t]=i?.[t]&&!e?i[t]:r[t]??i?.[t]}}}}search(e,t){let n=[];this.#i=K;let r=[this],i=f(t),a=[],o=i.length,s=null;for(let c=0;c<o;c++){let l=i[c],u=c===o-1,d=[];for(let f=0,p=r.length;f<p;f++){let p=r[f],m=p.#t[l];m&&(m.#i=p.#i,u?(m.#t[`*`]&&this.#a(n,m.#t[`*`],e,p.#i),this.#a(n,m,e,p.#i)):d.push(m));for(let r of p.#n){let f=r.#r,m=p.#i===K?{}:{...p.#i};if(typeof f==`string`){(f===`*`||l.startsWith(f.slice(0,-1)))&&(this.#a(n,r,e,p.#i),f===`*`&&(r.#i=m,d.push(r)));continue}let[,h,g]=f;if(!(!l&&g===!0)){if(g!==!0){if(!s){s=[];let e=+(t[0]===`/`);for(let t=0;t<o;t++)s[t]=e,e+=i[t].length+1}let l=t.slice(s[c]),u=g.exec(l);if(u){m[h]=u[0],this.#a(n,r,e,p.#i,m),u[0].length===l.length&&r.#t[`*`]&&this.#a(n,r.#t[`*`],e,p.#i,m);for(let e in r.#t){r.#i=m;let e=u[0].match(/\//g)?.length??0;(a[e]||=[]).push(r);break}continue}}(g===!0||g.test(l))&&(m[h]=l,u?(this.#a(n,r,e,m,p.#i),r.#t[`*`]&&this.#a(n,r.#t[`*`],e,m,p.#i)):(r.#i=m,d.push(r)))}}}let f=a.shift();r=f?d.concat(f):d}return n[1]&&n.sort((e,t)=>e.score-t.score),[n.map(({handler:e,params:t})=>[e,t])]}},ge=class{name=`TrieRouter`;#e=new he;add(e,t,n){for(let r of S(t)||[t])this.#e.insert(e,r,n)}match(e,t){return this.#e.search(e,t)}},q=class extends ue{constructor(e={}){super(e),this.router=e.router??new pe({routers:[new fe,new ge]})}},_e=/^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|msgpack|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|vnd\.msgpack|wasm|x-httpd-php|x-javascript|x-msgpack|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml|msgpack))(?:[;\s]|$)/i,J=(e,t=ve)=>{let n=e.match(/\.([a-zA-Z0-9]+?)$/);if(n)return t[n[1].toLowerCase()]},ve={aac:`audio/aac`,avi:`video/x-msvideo`,avif:`image/avif`,av1:`video/av1`,bin:`application/octet-stream`,bmp:`image/bmp`,css:`text/css; charset=utf-8`,csv:`text/csv; charset=utf-8`,eot:`application/vnd.ms-fontobject`,epub:`application/epub+zip`,gif:`image/gif`,gz:`application/gzip`,htm:`text/html; charset=utf-8`,html:`text/html; charset=utf-8`,ico:`image/x-icon`,ics:`text/calendar; charset=utf-8`,jpeg:`image/jpeg`,jpg:`image/jpeg`,js:`text/javascript; charset=utf-8`,json:`application/json`,jsonld:`application/ld+json`,map:`application/json`,mid:`audio/x-midi`,midi:`audio/x-midi`,mjs:`text/javascript; charset=utf-8`,mp3:`audio/mpeg`,mp4:`video/mp4`,mpeg:`video/mpeg`,oga:`audio/ogg`,ogv:`video/ogg`,ogx:`application/ogg`,opus:`audio/opus`,otf:`font/otf`,pdf:`application/pdf`,png:`image/png`,rtf:`application/rtf`,svg:`image/svg+xml; charset=utf-8`,tif:`image/tiff`,tiff:`image/tiff`,ts:`video/mp2t`,ttf:`font/ttf`,txt:`text/plain; charset=utf-8`,wasm:`application/wasm`,webm:`video/webm`,weba:`audio/webm`,webmanifest:`application/manifest+json`,webp:`image/webp`,woff:`font/woff`,woff2:`font/woff2`,xhtml:`application/xhtml+xml; charset=utf-8`,xml:`application/xml; charset=utf-8`,zip:`application/zip`,"3gp":`video/3gpp`,"3g2":`video/3gpp2`,gltf:`model/gltf+json`,glb:`model/gltf-binary`},ye=(...e)=>{let t=e.filter(e=>e!==``).join(`/`);t=t.replace(/(?<=\/)\/+/g,``);let n=t.split(`/`),r=[];for(let e of n)e===`..`&&r.length>0&&r.at(-1)!==`..`?r.pop():e!==`.`&&r.push(e);return r.join(`/`)||`.`},Y={br:`.br`,zstd:`.zst`,gzip:`.gz`},be=Object.keys(Y),xe=`index.html`,Se=e=>{let t=e.root??`./`,n=e.path,r=e.join??ye;return async(i,a)=>{if(i.finalized)return a();let o;if(e.path)o=e.path;else try{if(o=y(i.req.path),/(?:^|[\/\\])\.{1,2}(?:$|[\/\\])|[\/\\]{2,}|\\/.test(o))throw Error()}catch{return await e.onNotFound?.(i.req.path,i),a()}let s=r(t,!n&&e.rewriteRequestPath?e.rewriteRequestPath(o):o);e.isDir&&await e.isDir(s)&&(s=r(s,xe));let c=e.getContent,l=await c(s,i);if(l instanceof Response)return i.newResponse(l.body,l);if(l!=null){let t=e.mimes&&J(s,e.mimes)||J(s);if(i.header(`Content-Type`,t||`application/octet-stream`),e.precompressed&&(!t||_e.test(t))){let e=new Set(i.req.header(`Accept-Encoding`)?.split(`,`).map(e=>e.trim()));for(let t of be){if(!e.has(t))continue;let n=await c(s+Y[t],i);if(n){l=n,i.header(`Content-Encoding`,t),i.header(`Vary`,`Accept-Encoding`,{append:!0});break}}}return await e.onFound?.(s,i),i.body(l)}await e.onNotFound?.(s,i),await a()}},Ce=async(e,t)=>{let n;n=t&&t.manifest?typeof t.manifest==`string`?JSON.parse(t.manifest):t.manifest:typeof __STATIC_CONTENT_MANIFEST==`string`?JSON.parse(__STATIC_CONTENT_MANIFEST):__STATIC_CONTENT_MANIFEST;let r;r=t&&t.namespace?t.namespace:__STATIC_CONTENT;let i=n[e];return i&&await r.get(i,{type:`stream`})||null},X=(e={})=>async function(t,n){let r=async n=>Ce(n,{manifest:e.manifest,namespace:e.namespace?e.namespace:t.env?t.env.__STATIC_CONTENT:void 0});return Se({...e,getContent:r})(t,n)},we=e=>X(e),Z=new q;Z.use(`/static/*`,we({root:`./public`})),Z.get(`/`,e=>e.html(Te));var Te=`<!doctype html>
<html lang="en" data-theme="dark">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<title>Prasad Anand — AI/ML Engineer</title>
<meta name="description" content="Prasad Anand — computer engineering student and AI/ML intern in Pune, IN. Applied machine learning, NLP systems, and pragmatic backend engineering." />
<meta property="og:title" content="Prasad Anand — AI/ML Engineer" />
<meta property="og:description" content="Computer engineering student and AI/ML intern in Pune, IN. Applied machine learning, NLP systems, and pragmatic backend engineering." />
<meta property="og:type" content="website" />
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,500;1,9..144,400&display=swap" rel="stylesheet">
<link href="/static/style.css" rel="stylesheet" />
</head>
<body>

<!-- ============ TOP BAR ============ -->
<header class="topbar">
  <div class="wrap topbar-inner">
    <div class="brand">
      <span class="dot"></span>
      <span>prasad_anand</span>
      <small>&middot; v2.026</small>
    </div>
    <nav class="nav" aria-label="Primary">
      <a href="#work" class="on">work</a>
      <a href="#about">about</a>
      <a href="#skills">skills</a>
      <a href="#experience">experience</a>
      <a href="#projects">projects</a>
      <a href="#contact">contact</a>
    </nav>
    <div class="top-right">
      <span class="status"><span class="pulse" aria-hidden="true"></span> available &middot; IST</span>
      <button class="theme-toggle" id="themeToggle" type="button" aria-label="Toggle color theme">&mdash; light</button>
    </div>
  </div>
</header>

<main id="main-content">

<!-- ============ HERO ============ -->
<section class="hero" id="work" aria-label="Introduction">
  <div class="wrap">

    <p class="hero-meta">
      <span>portfolio / 2026</span>
      <span>pune, IN</span>
      <span>lat 18.51&deg;N &middot; lon 73.85&deg;E</span>
    </p>

    <div class="hero-grid">
      <div>
        <h1 class="hero-title">
          Prasad <span class="accent">Anand</span>.
        </h1>
        <p class="hero-role">
          <span class="k">ML Intern @ Cubeage Technologies Pvt. Ltd.</span> &mdash; building applied ML pipelines
          and <span class="k">NLP systems</span>. Currently developing
          <span class="k">DocuSense</span>, a document analyzer that extracts structured meaning from
          contracts, agreements &amp; resumes using local LLMs (Qwen&nbsp;2.5&nbsp;7B) and Gemini.
          Previously ML intern @ Tantrata Digital.
        </p>
        <div class="hero-cta">
          <a href="#projects" class="btn primary">view projects <span class="arrow" aria-hidden="true">&rarr;</span></a>
          <a href="#contact" class="btn">get in touch</a>
        </div>
      </div>

      <!-- Notebook cell block -->
      <div class="notebook" role="img" aria-label="Notebook cell demonstrating Prasad's engineer bio, a training loss curve, and a live command prompt">
        <div class="cell md">
          <div class="cell-gutter">md</div>
          <div class="cell-body"># prasad_bio.ipynb &middot; cell 01</div>
        </div>
        <div class="cell">
          <div class="cell-gutter"><span class="marker">In [1]:</span></div>
          <div class="cell-body code"><span class="tok-kw">from</span> prasad <span class="tok-kw">import</span> Engineer

me = Engineer(
    role=<span class="tok-str">"ML Intern"</span>,
    org=<span class="tok-str">"Cubeage Technologies"</span>,
    stack=[<span class="tok-str">"python"</span>, <span class="tok-str">"pytorch"</span>, <span class="tok-str">"nlp"</span>],
    building=<span class="tok-str">"docusense &middot; nlp pipelines"</span>,
)
me.<span class="tok-fn">summary</span>()<span class="caret" aria-hidden="true"></span></div>
        </div>
        <div class="cell out">
          <div class="cell-gutter">Out[1]:</div>
          <div class="cell-body">
            <div><span class="tok-comment"># training curve &middot; docusense classifier v2</span></div>
            <svg class="mini-chart" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true">
              <defs>
                <pattern id="ga" width="30" height="15" patternUnits="userSpaceOnUse">
                  <path d="M30 0 L0 0 0 15" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.25"/>
                </pattern>
              </defs>
              <rect width="300" height="60" fill="url(#ga)"/>
              <polyline fill="none" stroke="var(--muted)" stroke-width="1"
                points="0,10 40,14 80,20 120,28 160,36 200,44 240,50 280,54 300,55" opacity="0.6"/>
              <polyline fill="none" stroke="var(--accent)" stroke-width="1.4"
                points="0,55 40,42 80,32 120,26 160,20 200,16 240,13 280,11 300,10"/>
              <circle cx="300" cy="10" r="2.2" fill="var(--accent)"/>
            </svg>
            <div style="display:flex; justify-content:space-between; font-size:10.5px; margin-top:4px;">
              <span>epoch 0</span><span>loss &darr; 0.021</span><span>epoch 50</span>
            </div>
          </div>
        </div>
        <div class="cell">
          <div class="cell-gutter"><span class="marker">In [2]:</span></div>
          <div class="cell-body code" id="live-cell" aria-hidden="true"></div>
        </div>
      </div>
    </div>

    <dl class="coords">
      <div><dt>current focus</dt><dd>NLP &middot; document AI &middot; LLM pipelines</dd></div>
      <div><dt>internships</dt><dd>02 completed &middot; 01 active</dd></div>
      <div><dt>open to</dt><dd>Remote &middot; Collab &middot; Research</dd></div>
      <div><dt>last commit</dt><dd id="last-commit">&mdash;</dd></div>
    </dl>

  </div>
</section>

<!-- ============ ABOUT ============ -->
<section class="section" id="about" aria-labelledby="about-title">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag"><b>&sect; 01</b> / about</div>
      <div>
        <h2 class="section-title" id="about-title">A short <i>readme</i>.</h2>
        <p class="section-sub">Where I come from, what I work on, and what I'm optimising for.</p>
      </div>
    </div>

    <div class="about-body">
      <div></div>
      <div class="about-prose">
        <p class="lead">
          I'm a computer engineering student and software intern based in Pune, working at the
          intersection of <em>applied machine learning</em> and pragmatic backend systems.
        </p>
        <p>
          My work sits between two disciplines. On one side, training and evaluating models &mdash;
          currently focused on sequence models (LSTM, small transformers) for financial and
          health-signal data. On the other, the unglamorous plumbing that makes them useful:
          ETL, schema design in PostgreSQL, deployment on Vercel/Supabase.
        </p>
        <p>
          I write C++ when the problem calls for it &mdash; graph algorithms, competitive programming,
          anything where the constant factor matters. Python is where I <em>think</em>; C++ is
          where I <em>measure</em>.
        </p>
      </div>

      <!-- Confusion matrix figure -->
      <figure class="about-figure" style="margin:0;">
        <svg viewBox="0 0 240 200" width="100%" role="img" aria-labelledby="cm-title cm-desc">
          <title id="cm-title">Confusion matrix, 4-class classifier</title>
          <desc id="cm-desc">A 4x4 confusion matrix heatmap with diagonal accuracy values 0.85, 0.78, 0.72 and 0.90.</desc>
          <style>
            .cm-t { font: 10px 'JetBrains Mono', monospace; fill: var(--muted); }
            .cm-h { font: 9px 'JetBrains Mono', monospace; fill: var(--muted-2); letter-spacing: 0.05em; }
          </style>
          <text class="cm-h" x="120" y="14" text-anchor="middle">predicted &rarr;</text>
          <text class="cm-h" x="10" y="110" text-anchor="middle" transform="rotate(-90 10 110)">actual &rarr;</text>

          <!-- axis labels -->
          <text class="cm-t" x="50" y="30" text-anchor="middle">A</text>
          <text class="cm-t" x="110" y="30" text-anchor="middle">B</text>
          <text class="cm-t" x="170" y="30" text-anchor="middle">C</text>
          <text class="cm-t" x="230" y="30" text-anchor="middle">D</text>
          <text class="cm-t" x="26" y="64" text-anchor="middle">A</text>
          <text class="cm-t" x="26" y="104" text-anchor="middle">B</text>
          <text class="cm-t" x="26" y="144" text-anchor="middle">C</text>
          <text class="cm-t" x="26" y="184" text-anchor="middle">D</text>

          <!-- 4x4 grid -->
          <g transform="translate(40,40)">
            <!-- row 1 -->
            <rect x="0"   y="0"  width="40" height="40" fill="var(--accent)" opacity="0.85"/>
            <rect x="40"  y="0"  width="40" height="40" fill="var(--accent)" opacity="0.1"/>
            <rect x="80"  y="0"  width="40" height="40" fill="var(--accent)" opacity="0.05"/>
            <rect x="120" y="0"  width="40" height="40" fill="var(--accent)" opacity="0.12"/>
            <!-- row 2 -->
            <rect x="0"   y="40" width="40" height="40" fill="var(--accent)" opacity="0.08"/>
            <rect x="40"  y="40" width="40" height="40" fill="var(--accent)" opacity="0.78"/>
            <rect x="80"  y="40" width="40" height="40" fill="var(--accent)" opacity="0.15"/>
            <rect x="120" y="40" width="40" height="40" fill="var(--accent)" opacity="0.03"/>
            <!-- row 3 -->
            <rect x="0"   y="80" width="40" height="40" fill="var(--accent)" opacity="0.05"/>
            <rect x="40"  y="80" width="40" height="40" fill="var(--accent)" opacity="0.18"/>
            <rect x="80"  y="80" width="40" height="40" fill="var(--accent)" opacity="0.72"/>
            <rect x="120" y="80" width="40" height="40" fill="var(--accent)" opacity="0.09"/>
            <!-- row 4 -->
            <rect x="0"   y="120" width="40" height="40" fill="var(--accent)" opacity="0.02"/>
            <rect x="40"  y="120" width="40" height="40" fill="var(--accent)" opacity="0.06"/>
            <rect x="80"  y="120" width="40" height="40" fill="var(--accent)" opacity="0.14"/>
            <rect x="120" y="120" width="40" height="40" fill="var(--accent)" opacity="0.9"/>
            <!-- grid lines -->
            <g stroke="var(--bg)" stroke-width="1" fill="none">
              <line x1="40" y1="0" x2="40" y2="160"/>
              <line x1="80" y1="0" x2="80" y2="160"/>
              <line x1="120" y1="0" x2="120" y2="160"/>
              <line x1="0" y1="40" x2="160" y2="40"/>
              <line x1="0" y1="80" x2="160" y2="80"/>
              <line x1="0" y1="120" x2="160" y2="120"/>
            </g>
            <!-- numbers -->
            <g style="font: 10px 'JetBrains Mono', monospace; fill: var(--bg); text-anchor: middle;">
              <text x="20" y="25">0.85</text>
              <text x="60" y="65">0.78</text>
              <text x="100" y="105">0.72</text>
              <text x="140" y="145">0.90</text>
            </g>
          </g>
        </svg>
        <figcaption class="figure-cap">
          <b>fig. 01</b> &mdash; confusion matrix, 4-class classifier &middot; val_acc = 0.81
        </figcaption>
      </figure>
    </div>
  </div>
</section>

<div class="cli-strip">
  <div class="wrap cli-strip-inner">
    <span><span class="prompt">$</span> <span class="cmd">cat ~/portfolio/skills.yaml</span></span>
    <span class="sep">|</span>
    <span class="out">21 tools &middot; 4 tiers &middot; sorted by comfort</span>
    <span class="sep">|</span>
    <span><span class="prompt">$</span> <span class="cmd">tier=1 grep .</span></span>
    <span class="out">python, c++, numpy, postgres, git, linux</span>
  </div>
</div>

<!-- ============ SKILLS ============ -->
<section class="section" id="skills" aria-labelledby="skills-title">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag"><b>&sect; 02</b> / stack</div>
      <div>
        <h2 class="section-title" id="skills-title">Working <i>toolkit</i>.</h2>
        <p class="section-sub">Ordered by comfort and time-under-the-hood, not by hype. Row 1 is where I ship daily.</p>
      </div>
    </div>

    <div class="skills-row">
      <div class="skills-row-label"><span class="num">01</span> &middot; daily driver</div>
      <div class="skills-cloud">
        <span class="chip t1">Python <span class="lvl">// primary</span></span>
        <span class="chip t1">C / C++ <span class="lvl">// perf</span></span>
        <span class="chip t1">NumPy</span>
        <span class="chip t1">PostgreSQL</span>
        <span class="chip t1">Git</span>
        <span class="chip t1">Linux shell</span>
      </div>
    </div>

    <div class="skills-row">
      <div class="skills-row-label"><span class="num">02</span> &middot; comfortable</div>
      <div class="skills-cloud">
        <span class="chip t2">PyTorch</span>
        <span class="chip t2">TensorFlow / Keras</span>
        <span class="chip t2">scikit-learn</span>
        <span class="chip t2">Matplotlib</span>
        <span class="chip t2">Pandas</span>
        <span class="chip t2">JavaScript &middot; ES2022</span>
        <span class="chip t2">React</span>
        <span class="chip t2">Tailwind</span>
        <span class="chip t2">Supabase</span>
      </div>
    </div>

    <div class="skills-row">
      <div class="skills-row-label"><span class="num">03</span> &middot; exploring</div>
      <div class="skills-cloud">
        <span class="chip t3">NLP &middot; spaCy &middot; Transformers</span>
        <span class="chip t3">Local LLMs &middot; Ollama &middot; Qwen 2.5</span>
        <span class="chip t3">Gemini API</span>
        <span class="chip t3">CUDA basics</span>
        <span class="chip t3">Docker</span>
        <span class="chip t3">FastAPI</span>
        <span class="chip t3">Vercel edge</span>
        <span class="chip t3">DuckDB</span>
        <span class="chip t3">Rust</span>
      </div>
    </div>

    <div class="skills-row">
      <div class="skills-row-label"><span class="num">04</span> &middot; foundations</div>
      <div class="skills-cloud">
        <span class="chip t3">Data structures &amp; algorithms</span>
        <span class="chip t3">Graph algorithms</span>
        <span class="chip t3">Linear algebra</span>
        <span class="chip t3">Probability &amp; statistics</span>
        <span class="chip t3">Competitive programming</span>
        <span class="chip t3">System design (intro)</span>
      </div>
    </div>
  </div>
</section>

<div class="cli-strip">
  <div class="wrap cli-strip-inner">
    <span><span class="prompt">$</span> <span class="cmd">git log --oneline --since="2024-01" ./career</span></span>
    <span class="sep">|</span>
    <span class="out">3 commits &middot; head @ cubeage</span>
    <span class="sep">|</span>
    <span><span class="prompt">$</span> <span class="cmd">whoami</span></span>
    <span class="out">ml_intern &middot; building docusense</span>
  </div>
</div>

<!-- ============ EXPERIENCE ============ -->
<section class="section" id="experience" aria-labelledby="experience-title">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag"><b>&sect; 03</b> / experience</div>
      <div>
        <h2 class="section-title" id="experience-title">Where I've <i>shipped</i>.</h2>
        <p class="section-sub">Two internships to date, one active. Compact log &mdash; reverse chronological.</p>
      </div>
    </div>

    <div class="xp-table">
      <article class="xp-row">
        <div class="xp-date">JUN 2026 &mdash;<br/>PRESENT</div>
        <div>
          <h3 class="xp-role">ML Intern</h3>
          <div class="xp-company">CUBEAGE TECHNOLOGIES PVT. LTD.</div>
          <p class="xp-desc">
            Building applied ML pipelines and NLP systems. Currently developing
            <em>DocuSense</em>, a document analyzer that reads contracts, rental agreements
            and resumes and extracts key terms, obligations, and ATS-style scoring &mdash;
            powered by local LLMs (Qwen&nbsp;2.5&nbsp;7B via Ollama) and the Gemini API.
          </p>
        </div>
        <div class="xp-tags">
          <span>python</span>
          <span>nlp &middot; transformers</span>
          <span>qwen &middot; gemini</span>
          <span>ollama</span>
        </div>
        <div class="xp-arrow" aria-hidden="true">&rarr;</div>
      </article>

      <article class="xp-row">
        <div class="xp-date">JAN 2026 &mdash;<br/>FEB 2026</div>
        <div>
          <h3 class="xp-role">Software Intern, AI/ML</h3>
          <div class="xp-company">TANTRATA DIGITAL SOLUTIONS PVT. LTD.</div>
          <p class="xp-desc">
            Contributed to specialised software cycles focused on data-driven logic inside
            AI/ML workflows. Built feature-extraction pipelines, model evaluation harnesses,
            and internal tooling in Python.
          </p>
        </div>
        <div class="xp-tags">
          <span>python</span>
          <span>numpy &middot; pandas</span>
          <span>model eval</span>
        </div>
        <div class="xp-arrow" aria-hidden="true">&rarr;</div>
      </article>

      <article class="xp-row">
        <div class="xp-date">JUN 2025 &mdash;<br/>JUL 2025</div>
        <div>
          <h3 class="xp-role">Data Intern</h3>
          <div class="xp-company">GREENFINCH DIGITAL BUSINESS SOLUTIONS PVT. LTD.</div>
          <p class="xp-desc">
            Worked on digital-transformation projects &mdash; data cleaning, business-process
            modelling, and prototype dashboards. Focused summer program.
          </p>
        </div>
        <div class="xp-tags">
          <span>sql</span>
          <span>dashboards</span>
          <span>data modelling</span>
        </div>
        <div class="xp-arrow" aria-hidden="true">&rarr;</div>
      </article>
    </div>
  </div>
</section>

<div class="cli-strip">
  <div class="wrap cli-strip-inner">
    <span><span class="prompt">$</span> <span class="cmd">ls ~/projects</span></span>
    <span class="sep">|</span>
    <span class="out">docusense/&nbsp; oiltrace/&nbsp; wellnesspluss/&nbsp; blood-bank/</span>
    <span class="sep">|</span>
    <span><span class="prompt">$</span> <span class="cmd">wc -l **/*.py</span></span>
    <span class="out">~ 8.4k loc python</span>
  </div>
</div>

<!-- ============ PROJECTS ============ -->
<section class="section" id="projects" aria-labelledby="projects-title">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag"><b>&sect; 04</b> / selected work</div>
      <div style="display:flex; justify-content:space-between; align-items:baseline; gap:24px; flex-wrap:wrap;">
        <div>
          <h2 class="section-title" id="projects-title">Selected <i>works</i>.</h2>
          <p class="section-sub">A short set of projects that show how I think &mdash; across ML, systems, and web.</p>
        </div>
        <div class="proj-filter" role="tablist" aria-label="Filter projects">
          <button class="filter-btn on" data-filter="all" role="tab" aria-selected="true">all &middot; 04</button>
          <button class="filter-btn" data-filter="ml" role="tab" aria-selected="false">ml / nlp</button>
          <button class="filter-btn" data-filter="sys" role="tab" aria-selected="false">systems</button>
          <button class="filter-btn" data-filter="web" role="tab" aria-selected="false">web</button>
        </div>
      </div>
    </div>

    <div class="proj-grid">

      <!-- 01 DocuSense (wide feature) -->
      <article class="proj wide" data-tags="ml">
        <div class="proj-head">
          <span class="proj-idx">01 &middot; nlp &middot; document AI</span>
          <span class="proj-status live">shipped</span>
        </div>
        <div class="proj-figure">
          <!-- Document -> tokens -> extracted fields diagram -->
          <svg viewBox="0 0 400 150" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" role="img" aria-label="Diagram: a rental agreement document is processed by Qwen 2.5 7B into tokenized fields, then converted to structured JSON output with tenant, rent, term, notice, risks and score keys">
            <!-- document page -->
            <g fill="none" stroke="var(--rule-strong)" stroke-width="0.8">
              <rect x="20" y="20" width="90" height="110"/>
            </g>
            <g stroke="var(--muted-2)" stroke-width="1" opacity="0.55">
              <line x1="30" y1="34" x2="92" y2="34"/>
              <line x1="30" y1="44" x2="85" y2="44"/>
              <line x1="30" y1="54" x2="100" y2="54"/>
            </g>
            <g stroke="var(--accent)" stroke-width="1.2">
              <line x1="30" y1="68" x2="70" y2="68"/>
              <line x1="30" y1="84" x2="88" y2="84"/>
            </g>
            <g stroke="var(--muted-2)" stroke-width="1" opacity="0.55">
              <line x1="30" y1="96" x2="98" y2="96"/>
              <line x1="30" y1="106" x2="80" y2="106"/>
              <line x1="30" y1="116" x2="92" y2="116"/>
            </g>
            <text x="20" y="14" style="font:9px 'JetBrains Mono',monospace; fill:var(--muted); letter-spacing:0.05em">rental_agreement.pdf</text>

            <!-- arrow -->
            <g stroke="var(--rule-strong)" stroke-width="0.8" fill="none">
              <line x1="115" y1="75" x2="165" y2="75" stroke-dasharray="3 3"/>
              <path d="M162 71 L168 75 L162 79" stroke="var(--accent)"/>
            </g>
            <text x="140" y="70" text-anchor="middle" style="font:8.5px 'JetBrains Mono',monospace; fill:var(--accent)">qwen2.5 7b</text>

            <!-- token stream -->
            <g style="font:9px 'JetBrains Mono',monospace; fill:var(--ink-strong)">
              <rect x="175" y="30"  width="70" height="14" fill="none" stroke="var(--rule-strong)" stroke-width="0.6"/>
              <text x="179" y="40">tenant</text>
              <rect x="175" y="50"  width="70" height="14" fill="none" stroke="var(--rule-strong)" stroke-width="0.6"/>
              <text x="179" y="60">rent &middot; term</text>
              <rect x="175" y="70"  width="70" height="14" fill="var(--accent)" opacity="0.9"/>
              <text x="179" y="80" fill="var(--bg)">clauses &middot; 12</text>
              <rect x="175" y="90"  width="70" height="14" fill="none" stroke="var(--rule-strong)" stroke-width="0.6"/>
              <text x="179" y="100">notice period</text>
              <rect x="175" y="110" width="70" height="14" fill="none" stroke="var(--rule-strong)" stroke-width="0.6"/>
              <text x="179" y="120">obligations</text>
            </g>

            <!-- second arrow -->
            <g stroke="var(--rule-strong)" stroke-width="0.8" fill="none">
              <line x1="250" y1="75" x2="290" y2="75" stroke-dasharray="3 3"/>
              <path d="M287 71 L293 75 L287 79" stroke="var(--accent)"/>
            </g>

            <!-- json output -->
            <g fill="none" stroke="var(--rule)" stroke-width="0.8">
              <rect x="298" y="25" width="92" height="105"/>
            </g>
            <g style="font:9.5px 'JetBrains Mono',monospace; fill:var(--muted)">
              <text x="304" y="40">&#123;</text>
              <text x="310" y="52"><tspan fill="var(--accent)">"tenant"</tspan>: "...",</text>
              <text x="310" y="64"><tspan fill="var(--accent)">"rent"</tspan>: 24000,</text>
              <text x="310" y="76"><tspan fill="var(--accent)">"term"</tspan>: "11m",</text>
              <text x="310" y="88"><tspan fill="var(--accent)">"notice"</tspan>: 30,</text>
              <text x="310" y="100"><tspan fill="var(--accent)">"risks"</tspan>: [2],</text>
              <text x="310" y="112"><tspan fill="var(--accent)">"score"</tspan>: 0.94</text>
              <text x="304" y="124">&#125;</text>
            </g>
            <text x="390" y="14" text-anchor="end" style="font:9px 'JetBrains Mono',monospace; fill:var(--muted); letter-spacing:0.05em">extracted.json</text>
          </svg>
        </div>
        <h3 class="proj-title">DocuSense &mdash; Document Extractor</h3>
        <p class="proj-desc">
          A document analyzer that reads any long-form document &mdash; land registration, rental
          agreements, resumes &mdash; and returns the important terms, clauses and risks as
          structured data. For resumes it produces an ATS-style score. Runs on <em>local LLMs</em>
          (Qwen 2.5 7B via Ollama) with the Google Gemini API as a fallback. Building this
          currently at Cubeage Technologies.
        </p>
        <div class="proj-foot">
          <div class="proj-stack">
            <span><b>Python</b></span>
            <span><b>Qwen 2.5</b></span>
            <span><b>Gemini</b></span>
            <span><b>Ollama</b></span>
          </div>
          <a class="proj-link" href="https://github.com/prasadanand412/DocuSense-document-extractor" target="_blank" rel="noopener">github &#8599;</a>
        </div>
      </article>

      <!-- 02 OilTrace (narrow) -->
      <article class="proj narrow" data-tags="ml sys">
        <div class="proj-head">
          <span class="proj-idx">02 &middot; sat imagery &middot; SIH</span>
          <span class="proj-status">in development</span>
        </div>
        <div class="proj-figure">
          <!-- satellite tile + oil spill + backtrace arrow -->
          <svg viewBox="0 0 140 100" width="100%" height="100%" role="img" aria-label="Diagram: an oil spill detected on a satellite ocean tile, with a backtrace arrow pointing to a predicted source location, factoring in wind direction">
            <!-- ocean tile grid -->
            <defs>
              <pattern id="sea" width="12" height="12" patternUnits="userSpaceOnUse">
                <rect width="12" height="12" fill="var(--bg)"/>
                <path d="M12 0 L0 0 0 12" fill="none" stroke="var(--rule-strong)" stroke-width="0.25" opacity="0.55"/>
              </pattern>
            </defs>
            <rect x="10" y="10" width="120" height="80" fill="url(#sea)" stroke="var(--rule-strong)" stroke-width="0.6"/>
            <!-- oil spill blob -->
            <path d="M92,42 C102,38 112,44 110,54 C114,62 104,68 96,64 C88,68 82,58 88,52 C84,46 88,42 92,42 Z"
                  fill="var(--accent)" opacity="0.85"/>
            <path d="M92,42 C102,38 112,44 110,54 C114,62 104,68 96,64 C88,68 82,58 88,52 C84,46 88,42 92,42 Z"
                  fill="none" stroke="var(--accent)" stroke-width="0.6" opacity="0.6"/>
            <!-- backtrace arrow -->
            <path d="M96 54 Q75 40 45 30" fill="none" stroke="var(--accent)" stroke-width="1.2" stroke-dasharray="3 2"/>
            <path d="M48 32 L42 28 L46 34 Z" fill="var(--accent)"/>
            <!-- source point (predicted) -->
            <circle cx="42" cy="28" r="3" fill="none" stroke="var(--accent)" stroke-width="1"/>
            <circle cx="42" cy="28" r="1.4" fill="var(--accent)"/>
            <!-- wind vector -->
            <g stroke="var(--muted)" stroke-width="0.5" opacity="0.7">
              <line x1="20" y1="20" x2="32" y2="20"/>
              <line x1="30" y1="18" x2="32" y2="20"/>
              <line x1="30" y1="22" x2="32" y2="20"/>
            </g>
            <text x="14" y="18" style="font:7px 'JetBrains Mono',monospace; fill:var(--muted)">wind</text>
            <text x="42" y="22" text-anchor="middle" style="font:7px 'JetBrains Mono',monospace; fill:var(--accent)">src?</text>
            <text x="100" y="78" text-anchor="middle" style="font:7px 'JetBrains Mono',monospace; fill:var(--accent)">spill</text>
          </svg>
        </div>
        <h3 class="proj-title">OilTrace &mdash; Spill Origin Tracer</h3>
        <p class="proj-desc">
          SIH project. Analyses satellite imagery to detect oil spills, then backtraces
          the drift to the actual source using particle physics and environmental factors:
          wind speed, sea-surface temperature, water flow, tide and current.
        </p>
        <div class="proj-foot">
          <div class="proj-stack">
            <span><b>PyTorch</b></span>
            <span><b>CUDA</b></span>
          </div>
          <a class="proj-link" href="https://github.com/prasadanand412/oiltrace" target="_blank" rel="noopener">github &#8599;</a>
        </div>
      </article>

      <!-- 03 WellnessPlus (half) -->
      <article class="proj" data-tags="web ml">
        <div class="proj-head">
          <span class="proj-idx">03 &middot; full-stack + health signals</span>
          <span class="proj-status live">live</span>
        </div>
        <div class="proj-figure">
          <!-- steps bar + HR baseline + symptom -> prediction -->
          <svg viewBox="0 0 300 100" width="100%" height="100%" preserveAspectRatio="none" role="img" aria-label="Chart: daily step-count bars overlaid with a heart-rate trace, trending toward a symptom-based prediction">
            <defs>
              <pattern id="pg2" width="30" height="20" patternUnits="userSpaceOnUse">
                <path d="M30 0 L0 0 0 20" fill="none" stroke="currentColor" stroke-width="0.3" opacity="0.18"/>
              </pattern>
            </defs>
            <rect width="300" height="100" fill="url(#pg2)"/>
            <!-- steps bars -->
            <g fill="var(--accent)" opacity="0.85">
              <rect x="14"  y="60" width="10" height="30"/>
              <rect x="30"  y="48" width="10" height="42"/>
              <rect x="46"  y="52" width="10" height="38"/>
              <rect x="62"  y="38" width="10" height="52"/>
              <rect x="78"  y="30" width="10" height="60"/>
              <rect x="94"  y="56" width="10" height="34"/>
              <rect x="110" y="42" width="10" height="48"/>
            </g>
            <!-- HR trace overlay -->
            <polyline fill="none" stroke="var(--muted)" stroke-width="1" opacity="0.9"
              points="140,60 160,60 165,25 170,80 175,60 200,60 220,60 225,30 230,75 235,60 260,60 280,60"/>
            <text x="8" y="14" style="font:9px 'JetBrains Mono',monospace; fill:var(--muted)">steps</text>
            <text x="140" y="14" style="font:9px 'JetBrains Mono',monospace; fill:var(--muted)">HR &middot; bpm</text>
            <text x="280" y="96" text-anchor="end" style="font:9px 'JetBrains Mono',monospace; fill:var(--accent)">predict &rarr;</text>
          </svg>
        </div>
        <h3 class="proj-title">WellnessPlus Health Tracker</h3>
        <p class="proj-desc">
          Tracks health via day-to-day signals like steps and vitals, surfaces insights
          over time, and analyses reported symptoms to predict likely conditions.
          React front-end with Supabase for auth and row-level-secure persistence.
        </p>
        <div class="proj-foot">
          <div class="proj-stack">
            <span><b>React</b></span>
            <span><b>Supabase</b></span>
            <span><b>Tailwind</b></span>
          </div>
          <span class="proj-links">
            <a class="proj-link" href="https://wellnesspluss.vercel.app/" target="_blank" rel="noopener">live &#8599;</a>
            <a class="proj-link" href="https://github.com/prasadanand412/wellnesspluss" target="_blank" rel="noopener">github &#8599;</a>
          </span>
        </div>
      </article>

      <!-- 04 Blood Bank Management (half) -->
      <article class="proj" data-tags="sys web">
        <div class="proj-head">
          <span class="proj-idx">04 &middot; data systems</span>
          <span class="proj-status">shipped</span>
        </div>
        <div class="proj-figure">
          <!-- ER diagram-ish -->
          <svg viewBox="0 0 300 100" width="100%" height="100%" role="img" aria-label="Entity-relationship diagram connecting donors, requests, inventory and hospitals tables">
            <g fill="none" stroke="var(--rule-strong)" stroke-width="0.8">
              <rect x="20" y="30" width="60" height="40"/>
              <rect x="120" y="10" width="60" height="30"/>
              <rect x="120" y="60" width="60" height="30"/>
              <rect x="220" y="30" width="60" height="40"/>
              <line x1="80" y1="45" x2="120" y2="25"/>
              <line x1="80" y1="55" x2="120" y2="75"/>
              <line x1="180" y1="25" x2="220" y2="45"/>
              <line x1="180" y1="75" x2="220" y2="55"/>
            </g>
            <g style="font:8px 'JetBrains Mono',monospace; fill:var(--muted); text-anchor:middle">
              <text x="50" y="54">donors</text>
              <text x="150" y="28">requests</text>
              <text x="150" y="78">inventory</text>
              <text x="250" y="54">hospitals</text>
            </g>
            <g fill="var(--accent)">
              <circle cx="80" cy="45" r="1.5"/><circle cx="80" cy="55" r="1.5"/>
              <circle cx="120" cy="25" r="1.5"/><circle cx="120" cy="75" r="1.5"/>
              <circle cx="180" cy="25" r="1.5"/><circle cx="180" cy="75" r="1.5"/>
              <circle cx="220" cy="45" r="1.5"/><circle cx="220" cy="55" r="1.5"/>
            </g>
          </svg>
        </div>
        <h3 class="proj-title">Blood Bank Management</h3>
        <p class="proj-desc">
          Python + SQL system for donor registration, inventory tracking, and request routing
          across hospital records. Focus on schema correctness, transactional integrity, and
          a clean admin surface.
        </p>
        <div class="proj-foot">
          <div class="proj-stack">
            <span><b>Python</b></span>
            <span><b>SQL</b></span>
          </div>
          <a class="proj-link" href="https://github.com/prasadanand412/blood-bank-management-system" target="_blank" rel="noopener">github &#8599;</a>
        </div>
      </article>

    </div>
  </div>
</section>

<div class="cli-strip">
  <div class="wrap cli-strip-inner">
    <span><span class="prompt">$</span> <span class="cmd">ping prasadanand412@gmail.com</span></span>
    <span class="sep">|</span>
    <span class="out">reply within 48h &middot; IST</span>
    <span class="sep">|</span>
    <span><span class="prompt">$</span> <span class="cmd">open --linkedin</span></span>
    <span class="out">/in/prasad-anand</span>
  </div>
</div>

<!-- ============ CONTACT ============ -->
<section class="section" id="contact" aria-labelledby="contact-title">
  <div class="wrap">
    <div class="section-head">
      <div class="section-tag"><b>&sect; 05</b> / contact</div>
      <div>
        <h2 class="section-title" id="contact-title">Open a <i>connection</i>.</h2>
        <p class="section-sub">Available for remote collaborations and internships. I read every message.</p>
      </div>
    </div>

    <div class="contact-grid">
      <div></div>
      <div class="contact-info">
        <dl>
          <dt>// email</dt>
          <dd><a href="mailto:prasadanand412@gmail.com">prasadanand412@gmail.com</a></dd>
          <dt>// linkedin</dt>
          <dd><a href="https://www.linkedin.com/in/prasad-anand/" target="_blank" rel="noopener">/in/prasad-anand</a></dd>
          <dt>// github</dt>
          <dd><a href="https://github.com/prasadanand412" target="_blank" rel="noopener">/prasadanand412</a></dd>
          <dt>// leetcode</dt>
          <dd><a href="https://leetcode.com/u/Prasad_Anand/" target="_blank" rel="noopener">/u/Prasad_Anand</a></dd>
          <dt>// codeforces</dt>
          <dd><a href="https://codeforces.com/profile/AArray" target="_blank" rel="noopener">/AArray</a></dd>
          <dt>// location</dt>
          <dd>Pune, Maharashtra &middot; IN &middot; IST</dd>
        </dl>
      </div>
      <form id="contact-form">
        <div class="field">
          <label for="n">01 &middot; full name</label>
          <input id="n" name="name" required placeholder="jane doe"/>
        </div>
        <div class="field">
          <label for="e">02 &middot; email address</label>
          <input id="e" name="email" type="email" required placeholder="jane@company.com"/>
        </div>
        <div class="field">
          <label for="m">03 &middot; message</label>
          <textarea id="m" name="message" required placeholder="what are you working on?"></textarea>
        </div>
        <p class="form-note">This form is not yet wired to a backend &mdash; messages are not sent. Please use the email link above for now.</p>
        <div class="form-actions">
          <small>replies within 48h &middot; IST business hours</small>
          <button type="submit" class="btn primary">send message <span class="arrow" aria-hidden="true">&rarr;</span></button>
        </div>
      </form>
    </div>
  </div>
</section>

</main>

<footer>
  <div class="wrap foot-grid">
    <div class="foot-brand"><span class="dot" style="width:8px;height:8px;background:var(--accent);display:inline-block;" aria-hidden="true"></span> prasad_anand</div>
    <div>&copy; 2026 &middot; built by hand with html &amp; care</div>
    <div class="foot-links">
      <a href="#work">&uarr; top</a>
      <a href="#projects">projects</a>
      <a href="#contact">contact</a>
    </div>
  </div>
</footer>

<script src="/static/app.js"><\/script>

</body>
</html>`,Q=new q,Ee=Object.assign({"/src/index.tsx":Z}),$=!1;for(let[,e]of Object.entries(Ee))e&&(Q.all(`*`,t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),Q.notFound(t=>{let n;try{n=t.executionCtx}catch{}return e.fetch(t.req.raw,t.env,n)}),$=!0);if(!$)throw Error(`Can't import modules from ['/src/index.ts','/src/index.tsx','/app/server.ts']`);export{Q as default};