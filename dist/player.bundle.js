/*! Quiglytube player bundle */
var BTFW = globalThis.BTFW;
(()=>{BTFW.define("feature:player",["feature:layout"],async()=>{let F="#videowrap .video-js",A="vjs-default-skin",T="vjs-theme-city",h="vjs-big-play-centered",j=["#videowrap video","#ytapiplayer video","#videowrap .video-js video","#videowrap .video-js .vjs-tech"].join(","),u={playsinline:"","webkit-playsinline":"","x5-video-player-type":"h5","x5-video-player-fullscreen":"false","x5-video-orientation":"portrait"},a="btfw-videojs-base-css",b="btfw-videojs-city-css",k=["https://vjs.zencdn.net/7.20.3/video-js.css"],p=["https://cdn.jsdelivr.net/npm/@videojs/themes@1/dist/city/index.css","https://unpkg.com/@videojs/themes@1/dist/city/index.css"];function M(v,C){let B=document;if(!B||!B.head||B.getElementById(v))return;let z=B.createElement("link");z.id=v,z.rel="stylesheet";let ne=Array.isArray(C)?C.slice():[C],re=()=>{if(!ne.length)return!1;let ae=ne.shift();return ae?(z.href=ae,!0):re()};z.addEventListener("error",()=>{re()||z.remove()}),re()&&B.head.appendChild(z)}function Z(){if(typeof window=="undefined"||!document.body)return!1;let v=document.createElement("div");v.className=`video-js ${A}`,v.style.position="absolute",v.style.opacity="0",v.style.pointerEvents="none",v.style.width="1px",v.style.height="1px",document.body.appendChild(v);let C=window.getComputedStyle(v).fontSize;return v.remove(),C&&Math.abs(parseFloat(C)-10)<.2}function ue(){Z()||document.querySelector('link[href*="video-js"], link[href*="videojs"], style[data-vjs-styles]')||M(a,k)}function Y(){document.querySelector('link[href*="videojs" i][href*="city" i], link[href*="@videojs/themes" i][href*="city" i]')||M(b,p)}function fe(v){if(!v)return null;try{return v.player||v.player_||window.videojs&&typeof window.videojs.getPlayer=="function"&&window.videojs.getPlayer(v.id)||window.videojs&&window.videojs.players&&window.videojs.players[v.id]}catch(C){return null}}function U(v){let C=fe(v);if(!C)return;let B=typeof C.getChild=="function"?C.getChild("controlBar"):null,z=B&&typeof B.getChild=="function"?B.getChild("volumePanel"):null;if(z){v.classList.add("btfw-volume-inline");try{typeof z.inline=="function"&&z.inline(!0)}catch(ne){}}}function G(){ue(),Y(),document.querySelectorAll(F).forEach(v=>{v.classList.contains(A)&&v.classList.remove(A),Array.from(v.classList).forEach(C=>{C.startsWith("vjs-theme-")&&C!==T&&v.classList.remove(C)}),v.classList.contains(T)||v.classList.add(T),v.classList.contains(h)||v.classList.add(h),U(v)})}function q(){var C;if(typeof window=="undefined")return;let v=(C=window.BTFW)==null?void 0:C.channelPosterUrl;v&&document.querySelectorAll(F).forEach(B=>{B.poster!==v&&(B.poster=v);try{let z=B.player||B.player_||window.videojs&&window.videojs.players&&window.videojs.players[B.id];z&&typeof z.poster=="function"&&z.poster(v)}catch(z){let ne=B.querySelector(".vjs-poster");ne&&(ne.style.backgroundImage=`url("${v}")`)}})}function I(){var B;if(typeof window=="undefined")return;let v=(B=window.PLAYER)==null?void 0:B.mediaType;document.querySelectorAll(".vjs-poster").forEach(z=>{v==="yt"||v==="dm"||v==="vi"||v==="tw"?z.classList.add("hidden"):z.classList.remove("hidden")})}function K(){document.querySelectorAll(j).forEach(C=>{C instanceof HTMLVideoElement&&(typeof C.playsInline=="boolean"&&(C.playsInline=!0),Object.entries(u).forEach(([B,z])=>{try{C.setAttribute(B,z)}catch(ne){}}))})}function Q(){if(typeof window=="undefined")return!1;let v=window.videojs;if(!v)return!1;let C=v.dom||v;if(!C||typeof C.textContent!="function")return!1;if(C.textContent&&C.textContent._btfwOptimized)return!0;let B=C.textContent.bind(C),z=function(re,ae){if(!re)return re;let ce;try{typeof re.textContent!="undefined"?ce=re.textContent:typeof re.innerText!="undefined"&&(ce=re.innerText)}catch(l){ce=void 0}if(ce!==void 0){let l=ae==null?"":String(ae);if(ce===l)return re}return B(re,ae)};return z._btfwOptimized=!0,z._btfwOriginal=B,C.textContent=z,!0}function J(){if(Q()){J._tries=0;return}J._tries>20||(J._tries=(J._tries||0)+1,setTimeout(J,250))}let he="_btfwGuarded";function te(v){if(!v)return!1;let C=[".vjs-control-bar",".vjs-control",".vjs-menu",".vjs-menu-content",".vjs-slider",".vjs-volume-panel",".vjs-text-track-settings",".vjs-tech .alert",'.vjs-tech [role="alert"]','.vjs-tech [role="dialog"]',".vjs-tech .modal",".vjs-tech .modal-dialog",".vjs-big-play-button",".vjs-poster"].join(",");return!!v.closest(C)}function Ee(v){if(!v||v[he])return;v[he]=!0;let C=B=>{te(B.target)||B.type==="click"&&B.button!==0||(B.preventDefault(),B.stopImmediatePropagation())};v.addEventListener("click",C,!0),v.addEventListener("pointerdown",B=>{te(B.target)||(B.preventDefault(),B.stopImmediatePropagation())},!0),v.addEventListener("contextmenu",C,!0)}function pe(){document.querySelectorAll(F).forEach(Ee)}function we(){if(we._mo)return;let v=document.getElementById("videowrap")||document.body,C=new MutationObserver(B=>{var ne,re,ae;let z=!1;for(let ce of B){for(let l of ce.addedNodes)if(l.nodeType===1&&((ne=l.classList)!=null&&ne.contains("video-js")||l.tagName==="VIDEO"||l.tagName==="IFRAME"||(re=l.querySelector)!=null&&re.call(l,F))){z=!0;break}for(let l of ce.removedNodes)if(l.nodeType===1&&((ae=l.classList)!=null&&ae.contains("video-js")||l.tagName==="VIDEO"||l.tagName==="IFRAME")){z=!0;break}}z&&(G(),pe(),K(),q(),I(),document.querySelectorAll(F).forEach(U))});C.observe(v,{childList:!0,subtree:!0,characterData:!1}),we._mo=C}function Se(){setTimeout(()=>{K(),q(),I(),document.querySelectorAll(F).forEach(U)},100)}function le(){if(G(),pe(),K(),J(),q(),I(),we(),setInterval(()=>{I()},1e3),typeof window!="undefined"&&window.socket&&typeof socket.on=="function")try{typeof socket.off=="function"&&socket.off("changeMedia",Se),socket.on("changeMedia",Se)}catch(v){console.warn("[feature:player] Unable to bind changeMedia handler",v)}}return document.readyState==="loading"?document.addEventListener("DOMContentLoaded",le):le(),document.addEventListener("btfw:layoutReady",()=>setTimeout(le,0)),{name:"feature:player",applyCityTheme:G,attachGuards:pe,ensureInlinePlayback:K,applyPosterUrl:q,togglePosterVisibility:I,shouldAllowClick:te}});function Me(F=document){return!F||typeof F.querySelector!="function"?!1:!!(F.querySelector("#pollwrap .well.active")||F.querySelector("#pollwrap .well.muted")||F.querySelector("#pollwrap .poll-menu"))}function Ce(F,A){return F!=null?!!F:!!A}BTFW.define("feature:stack",["feature:layout","util:templates"],async({init:F})=>{let A=await F("util:templates"),{stack:T}=A,h="btfw-stack-order",j="btfw-stack-motd-open",u="btfw-stack-playlist-open",a="btfw-stack-poll-open",b={"motd-group":"btfw-stack-motd-docked","playlist-group":"btfw-stack-playlist-docked","poll-group":"btfw-stack-poll-docked"},k=b,p={"motd-group":{short:"MOTD",title:"Message of the Day"},"playlist-group":{short:"PL",title:"Playlist"},"poll-group":{short:"Poll",title:"Polls & Voting"}},M={"motd-group":"MD","playlist-group":"PL","poll-group":"PV"},Z={"motd-group":1,"poll-group":2,"playlist-group":3},ue=!1,Y=null,fe="",U=null,G=null,q=null,I={"motd-group":{storageKey:j,getDefaultOpen:e=>Ce(e,v()),toggleClass:"btfw-motd-toggle",ariaLabel:"Toggle message of the day visibility",openTitle:"Hide message of the day",closeTitle:"Show message of the day"},"playlist-group":{storageKey:u,getDefaultOpen:e=>Ce(e,!0),toggleClass:"btfw-playlist-toggle",ariaLabel:"Toggle playlist visibility",openTitle:"Hide playlist (improves performance)",closeTitle:"Show playlist"},"poll-group":{storageKey:a,getDefaultOpen:e=>Ce(e,Me()),toggleClass:"btfw-poll-toggle",ariaLabel:"Toggle poll panel visibility",openTitle:"Hide poll panel",closeTitle:"Show poll panel"}},K=null,Q=!1,J=!1,he=null,te=!1,Ee=!1,pe=!1,we=null,Se=!1;function le(e=""){let t=String(e||"").trim();if(!t)return!0;if(typeof document!="undefined"){let n=document.createElement("div");return n.innerHTML=t,!(n.textContent||"").replace(/\u00a0/g," ").trim()}return!t.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim()}function v(e=document){if(!e||typeof e.querySelector!="function")return!1;let t=C(e);return t?!le(t.innerHTML||""):!1}function C(e=document){if(!e||typeof e.getElementById!="function")return null;let t=e.getElementById("motdwrap");if(!t)return e.getElementById("motd");let n=t.querySelector(":scope > #motd");return n||t.querySelector("#motd")||e.getElementById("motd")}let B=[{id:"motd-group",title:"Message of the Day",selectors:["#motdwrap","#motdrow","#motd","#announcements"],priority:1},{id:"playlist-group",title:"Playlist",selectors:["#playlistrow","#playlistwrap","#queuecontainer","#queue"],priority:2},{id:"poll-group",title:"Polls & Voting",selectors:["#pollwrap","#btfw-poll-parking","#btfw-poll-history"],priority:3}],z=["#main","#mainpage","#mainpane"],ne=[{id:"addfromurl",title:"From URL",default:!0},{id:"searchcontrol",title:"Library & YouTube"}];function re(e,t,n){if(!e||!t||!n)return null;let r=ne.map(H=>{let V=document.getElementById(H.id);return V?{...H,el:V}:null}).filter(Boolean);if(!r.length){let H=document.getElementById("btfw-addmedia-panel");return H&&H.remove(),null}let o=document.getElementById("btfw-addmedia-panel");if(o||(o=document.createElement("section"),o.id="btfw-addmedia-panel",o.className="btfw-addmedia-panel",o.dataset.open="false",o.setAttribute("role","region"),o.setAttribute("aria-label","Add media controls"),o.setAttribute("aria-hidden","true"),o.setAttribute("hidden","hidden"),o.innerHTML=T.addMediaPanelHtml()),o.parentElement!==e){let H=t.parentElement===e?t.nextSibling:null;e.insertBefore(o,H)}let d=o.querySelector(".btfw-addmedia-tabs"),w=o.querySelector(".btfw-addmedia-views"),y=o.querySelector(".btfw-addmedia-close");if(!d||!w)return null;for(;d.firstChild;)d.removeChild(d.firstChild);for(;w.firstChild;)w.removeChild(w.firstChild);r.forEach(({id:H,title:V,el:O})=>{O.classList.remove("collapse","in","plcontrol-collapse"),O.style.removeProperty("display"),O.style.removeProperty("height"),O.removeAttribute("aria-expanded"),O.setAttribute("role","tabpanel"),O.setAttribute("data-btfw-addmedia","panel");let me=document.createElement("button");me.type="button",me.className="btfw-addmedia-tab",me.dataset.target=H,me.textContent=V,me.setAttribute("role","tab"),d.appendChild(me);let de=document.createElement("div");de.className="btfw-addmedia-view",de.dataset.target=H,de.setAttribute("role","tabpanel"),de.setAttribute("aria-hidden","true"),de.appendChild(O),w.appendChild(de)});let x=r.find(H=>H.default)||r[0],E=H=>{let V=H||o.dataset.active||x.id;o.dataset.active=V,d.querySelectorAll(".btfw-addmedia-tab").forEach(O=>{let me=O.dataset.target===V;O.classList.toggle("is-active",me),O.setAttribute("aria-selected",me?"true":"false"),O.setAttribute("tabindex",me?"0":"-1")}),w.querySelectorAll(".btfw-addmedia-view").forEach(O=>{let me=O.dataset.target===V;O.classList.toggle("is-active",me),O.setAttribute("aria-hidden",me?"false":"true")})},$=H=>{let V=H!=null?!!H:o.dataset.open!=="true";return o.dataset.open=V?"true":"false",o.classList.toggle("is-open",V),o.setAttribute("aria-hidden",V?"false":"true"),V?(o.removeAttribute("hidden"),E(o.dataset.active||x.id)):o.setAttribute("hidden","hidden"),o.dispatchEvent(new CustomEvent("btfw:addmedia:state",{detail:{open:V}})),V};return o._btfwWired||(d.addEventListener("click",H=>{let V=H.target.closest(".btfw-addmedia-tab");V&&(H.preventDefault(),E(V.dataset.target))}),y&&y.addEventListener("click",()=>$(!1)),o._btfwWired=!0),E(o.dataset.active||x.id),o._btfwToggle=$,o._btfwSetActive=E,(()=>{[{id:"showsearch",target:"searchcontrol"}].forEach(({id:V,target:O})=>{let me=document.getElementById(V);me&&me.dataset.btfwAddmedia!==O&&(me.dataset.btfwAddmedia=O,me.setAttribute("aria-controls","btfw-addmedia-panel"),me.addEventListener("click",de=>{de.preventDefault(),de.stopPropagation(),E(O),$(!0),me.blur()}))})})(),{panel:o,toggle:$,setActive:E}}function ae(){let e=document.getElementById("btfw-leftpad");if(!e)return null;let t=document.getElementById("btfw-stack");if(!t){t=document.createElement("div"),t.id="btfw-stack",t.className="btfw-stack";let n=document.getElementById("videowrap"),r=document.getElementById("btfw-video-overlay"),o=r&&n&&r.parentElement===n.parentElement?r:n;o&&o.parentElement?o.nextSibling?o.parentNode.insertBefore(t,o.nextSibling):o.parentNode.appendChild(t):e.appendChild(t);let d=document.createElement("div");d.className="btfw-stack-list",t.appendChild(d);let w=document.createElement("div");w.id="btfw-stack-footer",w.className="btfw-stack-footer",t.appendChild(w)}return{list:t.querySelector(".btfw-stack-list"),footer:t.querySelector("#btfw-stack-footer")}}function ce(e=!1){let t=document.getElementById("motdwrap");if(!t)return null;if(!e&&t.dataset.btfwMotdNormalized==="1"){let d=t.querySelector(":scope > #motd");return d?{motdwrap:t,motd:d}:null}let n=document.getElementById("togglemotd");n&&n.closest("#motd")&&t.insertBefore(n,t.firstChild);let r=[];t.querySelectorAll(".btfw-motd-editrow").forEach(d=>{let w=(d.textContent||"").trim();w&&r.push(`<p>${w}</p>`),d.remove()}),t.querySelectorAll(".col-lg-12, .col-md-12, .clear").forEach(d=>{d.contains(t)||d===t||((d.querySelector("#motd")||d.classList.contains("btfw-motd-editrow"))&&d.querySelectorAll("#motd").forEach(w=>{(w.innerHTML||"").trim()&&r.push(w.innerHTML)}),d.remove())});let o=t.querySelector(":scope > #motd");if(o||(o=document.createElement("div"),o.id="motd",t.appendChild(o)),t.querySelectorAll("#motd").forEach(d=>{d!==o&&((d.innerHTML||"").trim()&&r.push(d.innerHTML),d.remove())}),o.querySelectorAll("#togglemotd, .clear, .col-lg-12, .col-md-12, .btfw-motd-editrow").forEach(d=>{d.remove()}),o.querySelectorAll("#motd").forEach(d=>{(d.innerHTML||"").trim()&&r.push(d.innerHTML),d.remove()}),document.querySelectorAll("#togglemotd").forEach((d,w)=>{w!==0&&d.remove()}),r.length){let d=r.join("").trim();d&&le(o.innerHTML)?o.innerHTML=d:d&&(o.innerHTML+=d)}return t.dataset.btfwMotdNormalized="1",{motdwrap:t,motd:o}}function l(){let e=document.getElementById("btfw-plbar");if((e==null?void 0:e.dataset.btfwMerged)==="1")return;let t=document.getElementById("controlsrow"),n=document.getElementById("rightcontrols"),r=document.getElementById("playlistwrap"),o=document.getElementById("queuecontainer"),d=document.getElementById("playlistrow"),w=document.querySelector('#btfw-stack .btfw-stack-item[data-bind="playlist-group"] .btfw-stack-item__body'),y=document.querySelectorAll(".btfw-controls-row"),x=d||r||o||w;if(!x)return;let E=e;E?E.classList.add("btfw-plbar"):(E=document.createElement("div"),E.id="btfw-plbar",E.className="btfw-plbar");let $=E.querySelector(".btfw-plbar__layout"),ie,H;if($)ie=$.querySelector(".btfw-plbar__primary")||$,H=$.querySelector(".btfw-plbar__aside")||$;else{for($=document.createElement("div"),$.className="btfw-plbar__layout",ie=document.createElement("div"),ie.className="btfw-plbar__primary",H=document.createElement("div"),H.className="btfw-plbar__aside",$.append(ie,H);E.firstChild;)ie.appendChild(E.firstChild);E.appendChild($);let ee=ie.querySelector(".field.has-addons");ee&&ee.classList.add("btfw-plbar__search");let ve=ie.querySelector("#btfw-pl-count");ve&&(ve.classList.add("btfw-plbar__count"),H.appendChild(ve))}E.querySelectorAll("#showmediaurl, #btfw-pl-poll").forEach(ee=>ee.remove());let V=E.querySelector(".btfw-plbar__actions");V||(V=document.createElement("div"),V.className="btfw-plbar__actions",(H||E).appendChild(V));let O=document.getElementById("btfw-addmedia-btn"),me=ee=>{if(ee){if(ee.classList.add("btfw-plbar__action-btn"),ee.tagName==="BUTTON"||ee.tagName==="A")ee.classList.add("button","is-dark","is-small");else if(ee.tagName==="INPUT"){let ve=(ee.type||"").toLowerCase();ve==="button"||ve==="submit"||ve==="reset"?ee.classList.add("button","is-dark","is-small"):ee.classList.remove("button","is-dark","is-small")}}};E.parentElement!==x&&x.insertBefore(E,x.firstChild);let de=re(x,E,V);de?!O||!document.body.contains(O)?(O=document.createElement("button"),O.id="btfw-addmedia-btn",O.type="button",O.className="button is-small",O.innerHTML=T.addMediaButtonHtml(),V.prepend(O)):V.contains(O)||V.prepend(O):O&&(O.parentElement&&O.parentElement.removeChild(O),O=null);let Ae=ee=>{if(!ee)return;Array.from(ee.children||[]).forEach(Te=>{Te&&(Te.classList.add("btfw-plbar__control"),V.appendChild(Te))})};if(n&&(Ae(n),n.remove()),t&&(Ae(t),t.remove()),V.querySelectorAll("button, a.btn, input[type=button], input[type=submit], input[type=reset], select").forEach(me),de&&O){O.classList.remove("is-dark"),O.classList.add("is-primary"),O.dataset.iconified||(O.innerHTML=T.addMediaButtonHtml(),O.dataset.iconified="1"),O.setAttribute("aria-controls","btfw-addmedia-panel");let ee=Te=>{O.setAttribute("aria-expanded",Te?"true":"false")};O.dataset.btfwBound||(O.dataset.btfwBound="1",O.addEventListener("click",Te=>{Te.preventDefault();let ot=document.getElementById("btfw-addmedia-panel"),it=ot&&ot._btfwToggle,wt=typeof it=="function"?it():!1;ee(wt)}));let ve=de.panel||document.getElementById("btfw-addmedia-panel");ve&&(ee(ve.dataset.open==="true"),ve._btfwButtonSync||(ve.addEventListener("btfw:addmedia:state",Te=>{ee(!!(Te.detail&&Te.detail.open))}),ve._btfwButtonSync=!0))}y.forEach(ee=>{ee&&!x.contains(ee)&&(ee.style.cssText+=`
          margin-top: 8px;
          position: relative !important;
          bottom: auto !important;
          left: auto !important;
          right: auto !important;
          width: auto !important;
        `,ee.remove(),x.appendChild(ee),console.log("[stack] Moved floating controls row into playlist container"))}),x.contains(E)||x.insertBefore(E,x.firstChild),E.dataset.btfwMerged="1"}function P(e,t){if(e.id==="motd-group"&&(ce(),t=[document.getElementById("motdwrap")].filter(Boolean)),e.id==="playlist-group"&&(Ie(),l(),t=t.filter(y=>y&&y.id!=="rightcontrols"&&y.id!=="pollwrap").filter(y=>!y.querySelector||!y.querySelector("#pollwrap"))),e.id==="poll-group"&&(Ie(),Ue(),t=[document.getElementById("pollwrap"),document.getElementById("btfw-poll-history")].filter(Boolean)),t.length===0)return null;let n=document.querySelector("#btfw-stack .btfw-stack-list");n&&(t=t.filter(y=>y&&!n.contains(y)&&!y.contains(n)));let r=document.createElement("section");r.className="btfw-stack-item btfw-group-item",r.dataset.bind=e.id,r.dataset.group="true";let o=document.createElement("header");o.className="btfw-stack-item__header",o.innerHTML=T.stackGroupHeaderHtml(e.title);let d=document.createElement("div");d.className="btfw-stack-item__body btfw-group-body",t.forEach(y=>{if(y&&y.parentElement!==d&&!d.contains(y)&&!y.contains(d))try{d.appendChild(y)}catch(x){console.warn("[stack] Failed to move element:",y.id||y.className,x)}}),r.appendChild(o),r.appendChild(d);let w=I[e.id];return w&&ut(r,w),Ke(r,e.id),r.querySelector(".btfw-up").onclick=function(){let y=r.parentElement,x=r.previousElementSibling;x&&y.insertBefore(r,x),N(y)},r.querySelector(".btfw-down").onclick=function(){let y=r.parentElement,x=r.nextElementSibling;x?y.insertBefore(x,r):y.appendChild(r),N(y)},r}function N(e){try{let t=Array.from(e.children).map(n=>({id:n.dataset.bind,isGroup:n.dataset.group==="true"}));localStorage.setItem(h,JSON.stringify(t))}catch(t){}}function D(){try{return JSON.parse(localStorage.getItem(h)||"[]")}catch(e){return[]}}function f(e){try{let t=localStorage.getItem(e);return t===null?null:t==="true"}catch(t){return null}}function g(e,t){try{localStorage.setItem(e,t?"true":"false")}catch(n){}}function i(e){try{let t=localStorage.getItem(e);if(t!==null)return t==="true";let n=e.replace("-docked","-hidden"),r=localStorage.getItem(n);return r!==null?r==="true":!1}catch(t){return!1}}function m(e,t){try{localStorage.setItem(e,t?"true":"false")}catch(n){}}function S(){let e=document.querySelectorAll("#btfw-stack .btfw-stack-item[data-group='true']");return e.length?Array.from(e).every(t=>t.dataset.docked==="true"):!0}function R(e){return!!(e!=null&&e.closest(".btfw-panel-container__host"))}function se(e){if(!e)return;if(e.classList.add("btfw-stack-item--in-drawer"),e.dataset.btfwInDrawer="true",e.dataset.bind==="poll-group"){let n=e.querySelector("#pollwrap");n&&Me()&&(n.classList.remove("btfw-poll-idle"),n.removeAttribute("hidden"),n.setAttribute("aria-hidden","false"))}}function W(e){e&&(e.classList.remove("btfw-stack-item--in-drawer"),delete e.dataset.btfwInDrawer,e.classList.toggle("is-open",e.dataset.open!=="false"),Be())}function ge(e){W(e);let t=document.querySelector("#btfw-stack .btfw-stack-list");!t||!e||e.parentElement!==t&&t.appendChild(e)}function be(e,t,n){if(!e||R(e))return;let r=f(t),o=typeof n=="function"?n(r):r!==null?!!r:!0;e._btfwSetOpenState?e._btfwSetOpenState(o,{persist:!1}):(e.dataset.open=o?"true":"false",e.classList.toggle("is-open",o))}function Le(){let e=Array.from(document.querySelectorAll("#btfw-stack .btfw-stack-item[data-group='true']")),t=e.filter(w=>w.dataset.docked!=="true"),n=e.length>0&&t.length===0,r=document.getElementById("btfw-stack"),o=document.getElementById("btfw-leftpad"),d=document.getElementById("btfw-grid");r&&(r.classList.toggle("btfw-stack--all-hidden",n),r.classList.toggle("btfw-stack--all-docked",n)),o&&o.classList.toggle("btfw-leftpad--stack-hidden",n),d&&d.classList.toggle("btfw-grid--stack-hidden",n),document.dispatchEvent(new CustomEvent("btfw:layout:stackVisibility",{detail:{allHidden:n,allDocked:n,visibleCount:t.length,totalCount:e.length}}))}function ke(){var r;let e=document.getElementById("btfw-chat-actions");if(!e)return null;let t=document.getElementById("btfw-panels-menu-shell");if(!t){t=document.createElement("div"),t.id="btfw-panels-menu-shell",t.className="btfw-panels-menu-shell",t.setAttribute("aria-label","Docked channel panels");let o=document.createElement("div");o.id="btfw-panel-bar",o.className="btfw-panel-bar",o.setAttribute("role","toolbar"),o.setAttribute("aria-label","Docked panel shortcuts"),t.appendChild(o)}let n=t.querySelector("#btfw-panel-bar");return ye(n),t.parentElement!==e&&e.insertBefore(t,e.firstChild),ue||(ct(),ue=!0),(r=document.getElementById("btfw-stack-drawer"))==null||r.remove(),t}function s(e){e.preventDefault(),e.stopPropagation(),lt()}function c(){let e=ke();if(!e)return null;let t=document.getElementById("btfw-panels-menu-btn");t?t.parentElement!==e&&e.appendChild(t):(t=document.createElement("button"),t.type="button",t.id="btfw-panels-menu-btn",t.className="button btfw-chatbtn btfw-panels-menu-btn",t.innerHTML=T.panelsMenuButtonHtml(),t.title="Docked Panels",t.setAttribute("aria-expanded","false"),t.hidden=!0,e.appendChild(t)),t.title="Docked Panels";let n=t.querySelector(".btfw-panels-menu-btn__label");return n&&(n.textContent="Panels"),t.classList.remove("is-wide"),t.dataset.btfwPanelsWired||(t.addEventListener("click",s),t.dataset.btfwPanelsWired="1"),t}function _(e){if(!e)return null;let t=Array.from(e.classList).find(r=>r.startsWith("pluid-"));if(t)return t.slice(6);let n=window.jQuery||window.$;if(n){let r=n(e).data("uid");if(r!=null&&r!=="")return r}return e.dataset.uid||null}function L(e){if(e==null||e==="")return!1;let t=window.socket;if(t&&typeof t.emit=="function")return t.emit("jumpTo",e),!0;let n=document.querySelector(`#queue > .queue_entry.pluid-${e}`),r=n==null?void 0:n.querySelector(".qbtn-play");return r?(r.click(),!0):!1}function X(e){let t=(e||"").trim();if(!t)return!1;let n=document.getElementById("mediaurl"),r=document.getElementById("queue_next");if(n&&r&&(n.value=t,!r.disabled))return r.click(),!0;if(typeof window.queue=="function"&&n)return n.value=t,window.queue("next","url"),!0;let o=window.socket;if(o&&typeof parseMediaLink=="function")try{let d=parseMediaLink(t);if((d==null?void 0:d.id)!=null&&(d!=null&&d.type))return o.emit("queue",{id:d.id,type:d.type,pos:"next",temp:!1}),!0}catch(d){}return!1}function oe(e){ae();let t=document.querySelector(`#btfw-stack .btfw-stack-item[data-bind="${e}"]`);t&&(U&&(clearTimeout(U),U=null),Y=null,document.querySelectorAll(".btfw-panel-btn.is-active").forEach(n=>{n.classList.remove("is-active"),delete n.dataset.btfwFlyoutLocked}),document.documentElement.classList.remove("btfw-panels-flyout-open"),_e(),He(t,!1),requestAnimationFrame(()=>{try{t.scrollIntoView({block:"nearest",behavior:"smooth"})}catch(n){}}))}function ye(e){!e||e.dataset.btfwActionsWired||(e.dataset.btfwActionsWired="1",e.addEventListener("click",t=>{var d,w,y;let n=t.target.closest(".btfw-panel-undock");if(n){t.preventDefault(),t.stopPropagation();let x=n.dataset.panelGroup||((d=n.closest(".btfw-panel-btn"))==null?void 0:d.dataset.group);x&&oe(x);return}let r=t.target.closest(".btfw-panel-playlist__play");if(r){t.preventDefault(),t.stopPropagation(),L(r.dataset.queueUid);return}let o=t.target.closest(".btfw-panel-playlist__add");if(o){t.preventDefault(),t.stopPropagation();let x=(w=o.closest(".btfw-panel-container"))==null?void 0:w.querySelector(".btfw-panel-playlist__add-form");if(!x)return;let E=x.hidden;x.hidden=!E,o.setAttribute("aria-expanded",E?"true":"false"),E&&((y=x.querySelector(".btfw-panel-playlist__link-input"))==null||y.focus())}}),e.addEventListener("submit",t=>{var w,y,x,E;let n=t.target.closest(".btfw-panel-playlist__add-form");if(!n)return;t.preventDefault(),t.stopPropagation();let r=n.querySelector(".btfw-panel-playlist__link-input"),o=(w=r==null?void 0:r.value)==null?void 0:w.trim();if(!o||!X(o))return;r.value="",n.hidden=!0,(x=(y=n.closest(".btfw-panel-container"))==null?void 0:y.querySelector(".btfw-panel-playlist__add"))==null||x.setAttribute("aria-expanded","false");let d=(E=n.closest(".btfw-panel-container"))==null?void 0:E.querySelector(".btfw-panel-playlist__queue");d&&qe(d)}))}function _e(){if(G){try{G.disconnect()}catch(e){}G=null}q=null}function xe(e){if(!e||q===e)return;_e();let t=document.getElementById("queue");t&&(q=e,G=new MutationObserver(()=>{e.isConnected&&Y==="playlist-group"&&qe(e)}),G.observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]}))}function Pe(e=5){let t=document.getElementById("queue");if(!t)return[];let n=Array.from(t.querySelectorAll(":scope > .queue_entry")),r=n.findIndex(d=>d.classList.contains("queue_active")||d.classList.contains("playing")),o=r>=0?r+1:0;return n.slice(o,o+e)}function qe(e){if(!e)return;let t=Pe(5);if(e.replaceChildren(),!t.length){let n=document.createElement("p");n.className="btfw-panel-playlist__empty",n.textContent="No upcoming videos",e.appendChild(n);return}t.forEach(n=>{var x,E;let r=document.createElement("div");r.className="btfw-panel-playlist__item";let o=document.createElement("span");o.className="btfw-panel-playlist__title",o.textContent=(((x=n.querySelector(".qe_title"))==null?void 0:x.textContent)||"Untitled").trim();let d=document.createElement("span");d.className="btfw-panel-playlist__meta",d.textContent=(((E=n.querySelector(".qe_time"))==null?void 0:E.textContent)||"").trim();let w=document.createElement("div");w.className="btfw-panel-playlist__actions";let y=_(n);if(y!=null&&y!==""){let $=document.createElement("button");$.type="button",$.className="btfw-panel-playlist__play",$.textContent="Play",$.dataset.queueUid=String(y),!(n==null?void 0:n.querySelector(".qbtn-play"))&&!(window.socket&&typeof window.socket.emit=="function")&&($.disabled=!0),w.appendChild($)}r.append(o,d,w),e.appendChild(r)})}function Ye(e,t){let n=document.createElement("button");return n.type="button",n.className="btfw-panel-undock",n.dataset.panelGroup=e,n.setAttribute("aria-label",`Pin ${t.title} below video`),n.title="Pin below video",n.innerHTML=T.panelUndockIconHtml(),n}function rt(){let e=document.createElement("form");return e.className="btfw-panel-playlist__add-form",e.hidden=!0,e.innerHTML=T.playlistAddFormHtml(),e}function at(e,t,n){let r=document.createElement("div");if(r.className="btfw-panel-container",n>0&&(r.style.bottom=`${-n*50}px`),e==="playlist-group"){r.classList.add("btfw-panel-container--playlist");let d=document.createElement("div");d.className="btfw-panel-playlist__toolbar";let w=document.createElement("button");w.type="button",w.className="btfw-panel-playlist__add",w.textContent="+Add",w.setAttribute("aria-expanded","false");let y=Ye(e,t);d.append(w,y);let x=rt(),E=document.createElement("div");return E.className="btfw-panel-container__host btfw-panel-playlist__queue",r.append(d,x,E),r}r.classList.add("btfw-panel-container--dock-only");let o=document.createElement("div");return o.className="btfw-panel-container__dock-only",o.appendChild(Ye(e,t)),r.appendChild(o),r}function Re(){U&&(clearTimeout(U),U=null),document.querySelectorAll(".btfw-panel-btn.is-active").forEach(e=>{e.classList.remove("is-active"),delete e.dataset.btfwFlyoutLocked}),document.querySelectorAll(".btfw-panel-container__host .btfw-stack-item").forEach(e=>{ge(e)}),_e(),Y=null,document.documentElement.classList.remove("btfw-panels-flyout-open")}function Fe(e){let t=document.getElementById("btfw-panel-bar"),n=document.getElementById("btfw-panels-menu-btn");t&&t.classList.toggle("open",e),document.documentElement.classList.toggle("btfw-panels-bar-open",e),n&&(n.classList.toggle("is-expanded",e),n.setAttribute("aria-expanded",e?"true":"false")),e||Re()}function st(){Fe(!1)}function lt(){ke();let e=document.getElementById("btfw-panel-bar"),t=document.getElementById("btfw-panels-menu-btn");!e||!t||t.hidden||Fe(!e.classList.contains("open"))}function Ve(e){U&&clearTimeout(U),U=setTimeout(()=>{U=null;let t=document.querySelector(`.btfw-panel-btn[data-group="${e}"]`);t&&(t.matches(":hover")||t.querySelector(".btfw-panel-container:hover")||(t.classList.remove("is-active"),Y===e&&(Y=null,_e()),document.querySelector(".btfw-panel-btn.is-active")||document.documentElement.classList.remove("btfw-panels-flyout-open")))},140)}function De(e,t){if(t&&(U&&(clearTimeout(U),U=null),document.querySelectorAll(".btfw-panel-btn.is-active").forEach(n=>{n!==t&&n.classList.remove("is-active")}),Y=e,t.classList.add("is-active"),document.documentElement.classList.add("btfw-panels-flyout-open"),e==="playlist-group")){let n=t.querySelector(".btfw-panel-playlist__queue");n&&(qe(n),xe(n))}}function ct(){document.documentElement.dataset.btfwPanelDismissWired||(document.documentElement.dataset.btfwPanelDismissWired="1",document.addEventListener("click",e=>{Y&&(e.target.closest(".btfw-panel-btn, .btfw-panel-container, #btfw-panels-menu-btn, #btfw-panels-menu-shell")||(document.querySelectorAll(".btfw-panel-btn[data-btfw-flyout-locked]").forEach(t=>{delete t.dataset.btfwFlyoutLocked}),Re()))}))}function Ge(e,t){var r;if(!((r=document.getElementById("btfw-panel-bar"))!=null&&r.classList.contains("open")))return;if(U&&(clearTimeout(U),U=null),t.dataset.btfwFlyoutLocked==="true"&&t.classList.contains("is-active")){delete t.dataset.btfwFlyoutLocked,t.classList.remove("is-active"),Y===e&&(Y=null,_e()),document.querySelector(".btfw-panel-btn.is-active")||document.documentElement.classList.remove("btfw-panels-flyout-open");return}document.querySelectorAll(".btfw-panel-btn[data-btfw-flyout-locked]").forEach(o=>{o!==t&&delete o.dataset.btfwFlyoutLocked}),t.dataset.btfwFlyoutLocked="true",De(e,t)}function dt(e,t){let n=e.querySelector(".btfw-panel-container"),r=()=>{var o;(o=document.getElementById("btfw-panel-bar"))!=null&&o.classList.contains("open")&&(U&&(clearTimeout(U),U=null),De(t,e))};e.addEventListener("mouseenter",r),e.addEventListener("focusin",r),e.addEventListener("click",o=>{o.target.closest(".btfw-panel-container")||(o.preventDefault(),o.stopPropagation(),Ge(t,e))}),e.addEventListener("keydown",o=>{o.key!=="Enter"&&o.key!==" "||(o.preventDefault(),Ge(t,e))}),e.addEventListener("mouseleave",o=>{e.dataset.btfwFlyoutLocked!=="true"&&(n!=null&&n.contains(o.relatedTarget)||Ve(t))}),n==null||n.addEventListener("mouseenter",()=>{U&&(clearTimeout(U),U=null)}),n==null||n.addEventListener("mouseleave",o=>{e.dataset.btfwFlyoutLocked!=="true"&&(e.contains(o.relatedTarget)||Ve(t))})}function $e(){let e=ke();c();let t=e==null?void 0:e.querySelector("#btfw-panel-bar");if(!t)return;let n=Array.from(document.querySelectorAll('#btfw-stack .btfw-stack-item[data-docked="true"]')).sort((y,x)=>(Z[y.dataset.bind]||99)-(Z[x.dataset.bind]||99)),r=n.map(y=>y.dataset.bind).join("|"),o=document.getElementById("btfw-panels-menu-btn");if(o&&(o.hidden=n.length===0,n.length===0)){fe="",st();return}if(r===fe&&t.childElementCount===n.length)return;fe=r;let d=t.classList.contains("open"),w=Y;if(Re(),t.replaceChildren(),t.style.setProperty("--btfw-panel-bar-count",String(Math.max(n.length,1))),n.forEach((y,x)=>{let E=y.dataset.bind,$=p[E]||{short:"?",title:E},ie=document.createElement("div");ie.className="btfw-panel-btn",ie.dataset.group=E,ie.title=$.title,ie.setAttribute("role","button"),ie.setAttribute("aria-label",$.title),ie.tabIndex=0;let H=document.createElement("span");H.className="btfw-panel-btn__label",H.textContent=M[E]||$.short,ie.appendChild(H),ie.appendChild(at(E,$,x)),t.appendChild(ie),dt(ie,E)}),d&&(Fe(!0),w&&n.some(x=>x.dataset.bind===w))){let x=t.querySelector(`.btfw-panel-btn[data-group="${w}"]`);x&&De(w,x)}}function He(e,t,n={}){if(!e)return;let r=!!t,o=n.persist===!1,d=e.dataset.bind,w=b[d];e.dataset.docked=r?"true":"false",e.classList.toggle("btfw-stack-item--docked",r);let y=e.querySelector(".btfw-stack-dock-btn");y&&(y.setAttribute("aria-pressed",r?"true":"false"),y.title=r?"Pinned to panels menu":"Dock to panels menu"),r?R(e)?ge(e):Y===d&&(Y=null):(ge(e),e._btfwSetOpenState?e._btfwSetOpenState(!0):(e.dataset.open="true",e.classList.add("is-open"))),!o&&w&&m(w,r),$e(),Le()}function Ke(e,t){var x;let n=b[t];if(!n)return;let r=e.querySelector(".btfw-stack-item__header"),o=r==null?void 0:r.querySelector(".btfw-stack-header-toolbar"),d=o==null?void 0:o.querySelector(".btfw-stack-arrows");if(!d||d.querySelector(".btfw-stack-dock-btn"))return;let w=i(n);e.dataset.docked=w?"true":"false",e.classList.toggle("btfw-stack-item--docked",w);let y=document.createElement("button");y.type="button",y.className="btfw-arrow btfw-stack-dock-btn",y.textContent="\u2AF7",y.setAttribute("aria-label",`Dock ${((x=p[t])==null?void 0:x.title)||t} to panels menu`),y.setAttribute("aria-pressed",w?"true":"false"),y.title=w?"Pinned to panels menu":"Dock to panels menu",y.addEventListener("click",E=>{E.preventDefault(),E.stopPropagation(),e.dataset.docked!=="true"&&He(e,!0)}),d.insertBefore(y,d.firstChild)}function gt(){return f(u)}function vt(e){g(u,e)}function Et(){return f(a)}function xt(e){g(a,e)}function ut(e,t={}){let{storageKey:n,getDefaultOpen:r,toggleClass:o,ariaLabel:d="Toggle panel visibility",openTitle:w="Hide panel",closeTitle:y="Show panel"}=t,x=f(n),E=typeof r=="function"?r(x):x!==null?x:!0;e.hasAttribute("data-open")||(e.dataset.open=E?"true":"false"),e.classList.toggle("is-open",e.dataset.open!=="false");let $=e.querySelector(".btfw-stack-item__header"),ie=$&&$.querySelector(".btfw-stack-arrows");if(!ie||ie.querySelector(`.${o}`))return;let H=document.createElement("button");H.type="button",H.className=`btfw-arrow ${o}`,H.setAttribute("aria-label",d),H.style.display="flex",H.style.alignItems="center",H.style.justifyContent="center";let V=()=>{let de=e.dataset.open!=="false";H.textContent=de?"\u{1F441}\uFE0F":"\u{1F441}\uFE0F\u200D\u{1F5E8}\uFE0F",H.title=de?w:y,H.setAttribute("aria-expanded",de?"true":"false"),e.classList.toggle("is-open",de)},O=(de,Ae={})=>{let ee=!!de,ve=Ae.persist===!1;ve&&(e._btfwSuppressPersist=!0),e.dataset.open=ee?"true":"false",V(),ve||g(n,ee),ve&&queueMicrotask(()=>{e._btfwSuppressPersist=!1})};H.addEventListener("click",de=>{de.preventDefault(),de.stopPropagation(),O(e.dataset.open==="false")}),V(),new MutationObserver(de=>{for(let Ae of de)Ae.type==="attributes"&&(V(),e._btfwSuppressPersist||g(n,e.dataset.open!=="false"))}).observe(e,{attributes:!0,attributeFilter:["data-open"]}),ie.insertBefore(H,ie.firstChild),e._btfwSetOpenState=O,Ke(e,e.dataset.bind)}function Ie(){let e=document.getElementById("pollwrap");if(!e)return null;if(!e.closest('#playlistrow, #playlistwrap, #queuecontainer, [data-bind="playlist-group"]'))return e;let n=document.getElementById("btfw-poll-parking");return n||(n=document.createElement("div"),n.id="btfw-poll-parking",n.hidden=!0,n.setAttribute("aria-hidden","true"),document.body.appendChild(n)),n.appendChild(e),e}function ze(e){ce();let t=document.getElementById("motdwrap");if(!t)return;let n=e&&e.list;if(!n)return;let r=document.querySelector('.btfw-stack-item[data-bind="motd-group"]');if(r){let o=r.querySelector(".btfw-group-body");o&&!o.contains(t)&&o.appendChild(t)}else{let o=B.find(d=>d.id==="motd-group");if(!o)return;r=P(o,[t]),r&&(n.appendChild(r),N(n))}ft(r)}function ft(e){let t=document.getElementById("motdwrap");if(!t)return;let n=v();if(t.classList.toggle("btfw-motd-empty",!n),t.toggleAttribute("hidden",!n),t.setAttribute("aria-hidden",n?"false":"true"),n){t.style.removeProperty("display");let r=C();r&&r.style.removeProperty("display")}if(e||(e=document.querySelector('.btfw-stack-item[data-bind="motd-group"]')),e&&n){let r=f(j),o=Ce(r,!0);e._btfwSetOpenState?e._btfwSetOpenState(o,{persist:!1}):(e.dataset.open=o?"true":"false",e.classList.toggle("is-open",o))}}function je(e){he&&clearTimeout(he),he=setTimeout(()=>{he=null,ze(e)},50)}function mt(e){let t=C();t&&(te||(te=!0,new MutationObserver(()=>{je(e)}).observe(t,{childList:!0,subtree:!0,characterData:!0})))}function pt(e){Ee||!window.socket||!window.socket.on||(Ee=!0,window.socket.on("setMotd",()=>{je(e)}))}function Xe(e){let t=ae(),n=document.getElementById("motdwrap");n&&delete n.dataset.btfwMotdNormalized;let r=ce(!0),o=(r==null?void 0:r.motd)||C();o&&typeof e=="string"&&(o.innerHTML=e);let d=document.getElementById("cs-motdtext");d&&typeof e=="string"&&(d.value=e),t&&je(t)}function We(e){let t=document.getElementById("pollwrap");if(!t)return;let n=t.dataset&&t.dataset.btfwPollOverlay,r=t.getAttribute&&t.getAttribute("data-btfw-poll-overlay");if(n==="video"||r==="video")return;Ie(),Ue();let o=e&&e.list;if(!o)return;let d=document.querySelector('.btfw-stack-item[data-bind="poll-group"]');if(!d){let x=B.find(E=>E.id==="poll-group");if(!x)return;d=P(x,[t]),d&&(o.appendChild(d),N(o));return}let w=d.querySelector(".btfw-group-body");w&&!w.contains(t)&&w.appendChild(t);let y=document.querySelector('.btfw-stack-item[data-bind="playlist-group"]');y&&y.contains(t)&&w&&w.appendChild(t)}function Qe(e,t={}){We(e),Be();let n=document.querySelector('.btfw-stack-item[data-bind="poll-group"]');n&&(n.hidden=!1,n.removeAttribute("hidden"),t.forceOpen&&n._btfwSetOpenState?n._btfwSetOpenState(!0,{persist:!1}):t.forceOpen&&(n.dataset.open="true",n.classList.add("is-open")))}function Ne(e,t={}){K&&clearTimeout(K),K=setTimeout(()=>{K=null,Qe(e,t)},50)}function bt(e){if(Q)return;let t=document.getElementById("pollwrap");if(!t)return;Q=!0,new MutationObserver(()=>{Ne(e,{forceOpen:Me()})}).observe(t,{childList:!0,subtree:!0,attributes:!0,attributeFilter:["class"]});let r=document.getElementById("newpollbtn");r&&!r.dataset.btfwPollSync&&(r.dataset.btfwPollSync="1",r.addEventListener("click",()=>{Ne(e,{forceOpen:!0})}))}function ht(e){J||!window.socket||!window.socket.on||(J=!0,window.socket.on("newPoll",()=>Ne(e,{forceOpen:!0})),window.socket.on("closePoll",()=>Ne(e)))}function Je(e){if(!e||e.querySelector("#btfw-footer"))return;let t=document.getElementById("btfw-footer");if(t&&t!==e&&!e.contains(t)){e.innerHTML="",e.appendChild(t);return}let n=document.getElementById("footer")||document.querySelector("footer");n&&!e.contains(n)&&(n.classList.add("btfw-footer"),e.innerHTML="",e.appendChild(n))}function Ze(e){let t=document.querySelector(`.btfw-stack-item[data-bind="${e}"]`),n=t==null?void 0:t.querySelector(".btfw-stack-item__header");if(!n)return null;let r=n.querySelector(".btfw-stack-header-actions");if(!r){r=document.createElement("span"),r.className="btfw-stack-header-actions";let o=n.querySelector(".btfw-stack-header-toolbar"),d=(o==null?void 0:o.querySelector(".btfw-stack-arrows"))||n.querySelector(".btfw-stack-arrows");o&&d?o.insertBefore(r,d):d?n.insertBefore(r,d):n.appendChild(r)}return r}function et(e,t){e&&(e.classList.remove("btn","btn-sm","btn-default","button","is-small","is-link"),e.classList.add("btfw-stack-header-btn"),e.innerHTML!==t&&(e.innerHTML=t))}function Be(){let e=document.getElementById("pollwrap");if(!e)return;let t=!!e.closest(".btfw-panel-container__host"),n=!Me();if(t&&!n){e.classList.remove("btfw-poll-idle"),e.removeAttribute("hidden"),e.setAttribute("aria-hidden","false");return}e.classList.toggle("btfw-poll-idle",n),e.toggleAttribute("hidden",n),e.setAttribute("aria-hidden",n?"true":"false")}function tt(){let e=Ze("poll-group"),t=document.getElementById("newpollbtn");if(e&&t){et(t,'<span data-btfw-icon-slot="stack-new-poll" aria-hidden="true"><i class="fa fa-plus"></i></span> New Poll'),t.parentElement!==e&&e.appendChild(t);let o=document.querySelector("#pollwrap > .poll-controls");o&&o.children.length===0&&o.remove()}let n=Ze("motd-group"),r=document.getElementById("btfw-motd-editbtn");if(n&&r){et(r,'<span data-btfw-icon-slot="stack-edit-motd" aria-hidden="true"><i class="fa fa-plus"></i></span> Edit MOTD'),r.parentElement!==n&&n.appendChild(r);let o=r.closest(".btfw-motd-editrow");o&&o.parentElement&&o.remove()}}function Ue(){let e=document.getElementById("leftcontrols"),t=document.getElementById("pollwrap");e&&t&&(e.querySelectorAll('button[onclick*="poll"], button[title*="poll"], .poll-btn, #newpollbtn').forEach(r=>{let o=t.querySelector(".poll-controls");o||(o=document.createElement("div"),o.className="poll-controls",t.insertBefore(o,t.firstChild)),r.parentElement!==o&&o.appendChild(r)}),e.children.length===0&&e.remove())}function yt(e){return B.every(t=>t.selectors.some(r=>{var d,w;if(z.includes(r))return!1;let o=document.querySelector(r);if(!o||e.contains(o)||o.contains(e))return!1;if(r==="#pollwrap"){let y=(d=o.dataset)==null?void 0:d.btfwPollOverlay,x=(w=o.getAttribute)==null?void 0:w.call(o,"data-btfw-poll-overlay");if(y==="video"||x==="video")return!1}return!0})?!!e.querySelector(`[data-bind="${t.id}"]`):!0)}function Oe(e){if(!pe){pe=!0;try{let t=e.list,n=e.footer;if(yt(t)&&t.children.length>0){ze(e),We(e),Be(),tt(),Je(n);return}Ue(),Ie();let r=new Map;B.forEach(w=>{let y=[];w.selectors.forEach(x=>{let E=document.querySelector(x);if(E&&!(t.contains(E)||E.contains(t))&&!z.includes(x)){if(x==="#pollwrap"){let $=E.dataset&&E.dataset.btfwPollOverlay,ie=E.getAttribute&&E.getAttribute("data-btfw-poll-overlay");if($==="video"||ie==="video")return}y.push(E)}}),y.length>0&&r.set(w.id,{group:w,elements:y})});let o=D(),d=[];r.forEach(({group:w,elements:y},x)=>{if(!Array.from(t.children).find($=>$.dataset.bind===x))try{let $=P(w,y);$&&d.push({item:$,id:x,priority:w.priority,isGroup:!0})}catch($){console.warn("[stack] Failed to create group item:",x,$)}}),o.length>0?d.sort((w,y)=>{let x=o.findIndex($=>$.id===w.id),E=o.findIndex($=>$.id===y.id);return x>=0&&E>=0?x-E:x>=0?-1:E>=0?1:w.priority-y.priority}):d.sort((w,y)=>w.priority-y.priority),d.forEach(({item:w})=>{try{w&&!t.contains(w)&&!w.contains(t)&&t.appendChild(w)}catch(y){console.warn("[stack] Failed to add item to list:",y)}}),N(t),ze(e),We(e),Be(),tt(),Je(n)}finally{pe=!1}}}function nt(){let e=ae();if(!e||(Oe(e),mt(e),pt(e),bt(e),ht(e),Se))return;Se=!0;let t=new MutationObserver(()=>{we||(we=requestAnimationFrame(()=>{we=null,Oe(e)}))}),n=document.getElementById("btfw-leftpad"),r=document.getElementById("main");n&&t.observe(n,{childList:!0,subtree:!1}),r&&t.observe(r,{childList:!0,subtree:!1}),setTimeout(()=>{let w=document.querySelector('.btfw-stack-item[data-bind="motd-group"]');w&&be(w,j,E=>Ce(E,v()));let y=document.querySelector('.btfw-stack-item[data-bind="playlist-group"]');y&&be(y,u,E=>E!==null?!!E:!0);let x=document.querySelector('.btfw-stack-item[data-bind="poll-group"]');x&&be(x,a,E=>Ce(E,Me())),document.querySelectorAll('#btfw-stack .btfw-stack-item[data-group="true"]').forEach(E=>{let $=b[E.dataset.bind];$&&He(E,i($),{persist:!1})}),ke(),c(),$e(),Qe(e),Le()},1e3);let o=0,d=setInterval(()=>{Oe(e),++o>2&&clearInterval(d)},700)}return document.addEventListener("btfw:layoutReady",nt),document.addEventListener("btfw:chat:barsReady",()=>{ke(),c(),$e()}),setTimeout(nt,1200),document.addEventListener("btfw:channelThemeTint",()=>{let e=ae();e&&setTimeout(()=>Oe(e),100)}),document.addEventListener("btfw:motd:updated",e=>{var n;let t=(n=e==null?void 0:e.detail)==null?void 0:n.html;typeof t=="string"&&Xe(t)}),{name:"feature:stack",hasMotdContent:v,resolveMotdHost:C,normalizeMotdStructure:ce,applyMotdUpdate:Xe}});BTFW.define("feature:videoOverlay",[],async()=>{let F=(s,c=document)=>c.querySelector(s),A=["#mediarefresh","#voteskip","#fullscreenbtn"],T={localSubs:"btfw:video:localsubs"},h=5,j={owner:["chanowner","owner","founder","admin","administrator"]};function u(){var s;try{return((s=window.PLAYER)==null?void 0:s.mediaType)||null}catch(c){return null}}function a(){let s=(u()||"").toLowerCase();return s==="fi"||s==="gd"}function b(){try{return window.CLIENT||window.client||null}catch(s){return null}}function k(){try{return window.CHANNEL||window.channel||null}catch(s){return null}}function p(){let s=k();if(s&&typeof s.perms=="object"&&s.perms)return s.perms;try{return window.CHANNEL_PERMS||window.channelPermissions||{}}catch(c){return{}}}function M(s=[]){let c=p();for(let _ of s){let L=c==null?void 0:c[_];if(typeof L=="number")return L}}function Z(){let s=M(j.owner);return typeof s=="number"?s:h}function ue(s){if(!s)return!1;try{if(typeof s.hasPermission=="function"&&s.hasPermission("chanowner"))return!0}catch(c){}try{if(typeof window.hasPermission=="function"&&window.hasPermission("chanowner"))return!0}catch(c){}return!1}function Y(){let s=b();if(!s)return!1;let c=Number(s.rank);return Number.isFinite(c)?!!(c>=Z()||ue(s)):!1}let fe=()=>{try{return localStorage.getItem(T.localSubs)!=="0"}catch(s){return!0}},U=s=>{try{localStorage.setItem(T.localSubs,s?"1":"0")}catch(c){}document.dispatchEvent(new CustomEvent("btfw:video:localsubs:changed",{detail:{enabled:!!s}}))},G=0,q=0,I=0,K=2e3,Q=8e3,J=45e3,he=12e4,te=Q,Ee=!1,pe=null;function we(){if(F("#btfw-vo-css"))return;let s=document.createElement("style");s.id="btfw-vo-css",s.textContent=`
      #btfw-video-overlay{
        position: static;
        display: block;
        width: 100%;
        pointer-events: auto;
        opacity: 1;
        margin: 8px 0 4px;
      }

      #btfw-video-overlay .btfw-vo-bar{
        position: static;
        display: flex;
        gap: 8px;
        pointer-events: auto;
        background: transparent;
      }

      #btfw-video-overlay .btfw-vo-section {
        display:flex;
        align-items:center;
        gap:8px;
        pointer-events:auto;
      }

      #btfw-video-overlay .btfw-vo-section--right {
        margin-left:auto;
      }

      #btfw-video-overlay .btfw-vo-btn,
      #btfw-video-overlay .btfw-vo-adopted{
        all: unset;
        box-sizing: border-box;
        display:inline-grid;
        place-items:center;
        min-width:44px;
        height:44px;
        padding:0;
        border-radius:22px;
        border:0;
        background:rgba(0, 0, 0, 0.42);
        color:#fff;
        cursor:pointer;
        font:600 14px/1.05 "Inter", "Segoe UI", system-ui, -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif;
        letter-spacing: 0.01em;
        backdrop-filter: blur(12px) saturate(120%);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.18);
        transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        text-decoration:none;
      }

      #btfw-video-overlay .btfw-vo-btn i,
      #btfw-video-overlay .btfw-vo-adopted i {
        transition: transform 0.2s ease;
        font-size: 16px;
      }

      #btfw-video-overlay .btfw-vo-btn:hover,
      #btfw-video-overlay .btfw-vo-adopted:hover{
        background: rgba(109, 77, 246, 0.82);
        transform: translateY(-1px);
        box-shadow: 0 4px 16px rgba(109, 77, 246, 0.36);
      }

      #btfw-video-overlay .btfw-vo-btn:hover i,
      #btfw-video-overlay .btfw-vo-adopted:hover i {
        transform: scale(1.08);
      }

      #btfw-video-overlay .btfw-vo-btn:active,
      #btfw-video-overlay .btfw-vo-adopted:active {
        transform: translateY(0);
      }

      #btfw-video-overlay .btfw-vo-btn:focus-visible,
      #btfw-video-overlay .btfw-vo-adopted:focus-visible {
        outline: 2px solid rgba(109, 77, 246, 0.95);
        outline-offset: 2px;
      }

      .btfw-notification {
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 12px 20px;
        border-radius: 12px;
        color: #ffffff;
        font-size: 14px;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        opacity: 0;
        transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        backdrop-filter: blur(12px) saturate(120%);
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
        max-width: 300px;
      }

      .btfw-notification--show {
        transform: translateX(0);
        opacity: 1;
      }

      .btfw-notification--success {
        background: rgba(34, 197, 94, 0.9);
        border: 1px solid rgba(34, 197, 94, 0.3);
      }

      .btfw-notification--error {
        background: rgba(239, 68, 68, 0.9);
        border: 1px solid rgba(239, 68, 68, 0.3);
      }

      .btfw-notification--warning {
        background: rgba(245, 158, 11, 0.9);
        border: 1px solid rgba(245, 158, 11, 0.3);
      }

      .btfw-notification--info {
        background: rgba(59, 130, 246, 0.9);
        border: 1px solid rgba(59, 130, 246, 0.3);
      }

      #btfw-mini-toast{position:fixed;right:12px;bottom:12px;background:#111a;color:#fff;padding:8px 12px;border-radius:8px;font:12px/1.2 system-ui,Segoe UI,Arial;z-index:99999;pointer-events:none;opacity:0;transition:opacity .2s}

      @media (max-width: 768px) {
        #btfw-video-overlay .btfw-vo-bar {
          gap: 6px;
        }

        #btfw-video-overlay .btfw-vo-section {
          gap: 6px;
          flex-wrap: wrap;
        }

        #btfw-video-overlay .btfw-vo-btn,
        #btfw-video-overlay .btfw-vo-adopted {
          min-width: 40px;
          height: 40px;
          border-radius: 20px;
          font-size: 12px;
        }
      }
    `,document.head.appendChild(s)}function Se(s){let c=F("#videowrap");!c||!s||((s.parentElement!==c.parentElement||s.previousElementSibling!==c)&&c.insertAdjacentElement("afterend",s),s.classList.add("btfw-vo-visible"))}function le(){if(!F("#videowrap"))return null;let c=F("#btfw-video-overlay");c||(c=document.createElement("div"),c.id="btfw-video-overlay"),c.classList.add("btfw-video-overlay"),Se(c);let _=c.querySelector("#btfw-vo-bar");_||(_=document.createElement("div"),_.className="btfw-vo-bar",_.id="btfw-vo-bar",c.appendChild(_));let L=C(c,_);return Le(L.left),l(L),P(L),v(c),c}function v(s){s&&s.querySelectorAll("button").forEach(c=>{c.classList.contains("btfw-vo-btn")||c.classList.add("btfw-vo-btn")})}function C(s,c){let _="btfw-vo-left",L="btfw-vo-right",X=c.querySelector(`#${_}`);X||(X=document.createElement("div"),X.id=_,X.className="btfw-vo-section btfw-vo-section--left",c.insertBefore(X,c.firstChild));let oe=c.querySelector(`#${L}`);return oe||(oe=document.createElement("div"),oe.id=L,oe.className="btfw-vo-section btfw-vo-section--right",c.appendChild(oe)),Array.from(c.children).forEach(ye=>{ye===X||ye===oe||oe.appendChild(ye)}),s.dataset.leftSection=`#${_}`,s.dataset.rightSection=`#${L}`,c.dataset.leftSection=`#${_}`,c.dataset.rightSection=`#${L}`,{left:X,right:oe}}function B(){return document.querySelector("#ytapiplayer video, video")}function z(s=B()){return s?typeof window.WebKitPlaybackTargetAvailabilityEvent!="undefined"||typeof s.webkitShowPlaybackTargetPicker=="function":!1}function ne(){if(!pe)return;let s=pe._btfwAirplayHandler;if(s){try{pe.removeEventListener("webkitplaybacktargetavailabilitychanged",s)}catch(c){}delete pe._btfwAirplayHandler}pe=null}function re(s){if(!s||typeof s.addEventListener!="function"){ne();return}if(pe===s)return;ne();let c=_=>{let L=!_||_.availability==="available",X=F("#btfw-airplay");X&&(X.style.display=L?"":"none")};try{s.addEventListener("webkitplaybacktargetavailabilitychanged",c),s._btfwAirplayHandler=c,pe=s}catch(_){}}function ae(){let s=F("#btfw-airplay");if(!s)return;let c=B();if(!z(c)){s.style.display="none",ne();return}s.style.display="",re(c)}function ce(s,c){c&&c.classList.add("btfw-vo-visible")}function l(s){if(!(s!=null&&s.right)||!(s!=null&&s.left))return;let c=[];document.querySelector("#fullscreenbtn")||c.push({id:"btfw-fullscreen",icon:"fas fa-expand",tooltip:"Fullscreen",action:f,section:"right"}),c.push({id:"btfw-airplay",icon:"fas fa-cast",tooltip:"AirPlay",action:m,section:"right"}),c.forEach(_=>{let L=document.querySelector(`#${_.id}`),X=_.section==="left"?s.left:s.right;L?X&&L.parentElement!==X&&X.appendChild(L):(L=document.createElement("button"),L.id=_.id,L.className="btfw-vo-btn",L.innerHTML=`<i class="${_.icon}"></i>`,L.title=_.tooltip,L.addEventListener("click",_.action),(X||s.right).appendChild(L))}),ae()}function P(s){let c=s==null?void 0:s.right;c&&A.forEach(_=>{let L=document.querySelector(_);if(!L)return;if(L.dataset.btfwOverlay==="1"){L.parentElement!==c&&c.appendChild(L);return}let X=document.createElement("span");X.hidden=!0,X.setAttribute("data-btfw-ph",_);try{L.insertAdjacentElement("afterend",X)}catch(oe){}if(L.classList.add("btfw-vo-adopted"),L.dataset.btfwOverlay="1",L.id==="mediarefresh"){let oe=L.onclick;L.onclick=ye=>{ye.preventDefault();let _e=!!(ye&&ye.isTrusted);D(()=>{if(typeof oe=="function")try{return oe.call(L,ye),!0}catch(xe){console.warn("[video-overlay] native refresh handler failed:",xe)}return!1},{isUserAction:_e})}}c.appendChild(L)})}function N(){try{if(window.socket)return socket.emit("playerReady"),!0}catch(s){console.warn("[video-overlay] Media refresh failed:",s)}return!1}function D(s,c={}){let{isUserAction:_=!1}=c,L=Date.now();if(I&&L-I>he&&(te=Q,G=0),L<q){let xe=Math.ceil((q-L)/1e3);return S(_?`Refresh available in ${xe}s`:`Auto refresh paused. Next attempt in ${xe}s`,"warning"),!1}let X=_?K:te;if(I&&L-I<X){let xe=X-(L-I),Pe=Math.ceil(xe/1e3);return q=L+xe,S(_?`Refresh available in ${Pe}s`:`Auto refresh paused. Next attempt in ${Pe}s`,"warning"),!1}if(G++,G>=10)return q=L+3e4,G=0,S("Refresh limit reached. 30s cooldown active.","error"),!1;let oe=_?6e3:Math.max(12e3,te+2e3);setTimeout(()=>{G>0&&G--},oe);let ye=!1;if(typeof s=="function")try{ye=s()===!0}catch(xe){console.warn("[video-overlay] Refresh handler error:",xe)}return ye||(ye=N()),I=Date.now(),_?te=Q:te=Math.min(J,Math.max(Q,Math.round(te*(ye?1.25:1.5)))),q=Math.max(q,I+(_?K:te)),!_&&ye?S(`Auto refresh sent. Next attempt in ${Math.ceil(te/1e3)}s`,"info"):S(ye?"Media refreshed":"Unable to refresh media",ye?"success":"error"),ye}function f(){let s=F("#videowrap");s&&(document.fullscreenElement?document.exitFullscreen?document.exitFullscreen():document.webkitExitFullscreen?document.webkitExitFullscreen():document.mozCancelFullScreen&&document.mozCancelFullScreen():s.requestFullscreen?s.requestFullscreen():s.webkitRequestFullscreen?s.webkitRequestFullscreen():s.mozRequestFullScreen&&s.mozRequestFullScreen())}function g(s,c=!0){if(!s||!z(s))return!1;if(s.setAttribute("airplay","allow"),s.setAttribute("x-webkit-airplay","allow"),c&&typeof s.webkitShowPlaybackTargetPicker=="function")try{s.webkitShowPlaybackTargetPicker()}catch(_){console.warn("[video-overlay] AirPlay picker failed:",_)}return ae(),!0}function i(){if(!(Ee||!window.socket)){Ee=!0;try{socket.on("changeMedia",()=>{setTimeout(()=>{let s=B();s&&(g(s,!1),re(s)),ae()},1e3)})}catch(s){console.warn("[video-overlay] Failed to attach AirPlay listener:",s)}}}function m(){let s=B();return z(s)?g(s)?(S("AirPlay enabled","success"),i(),!0):(S("AirPlay not available","warning"),!1):(ae(),S("AirPlay not available","warning"),!1)}function S(s,c="info"){let _=document.getElementById("btfw-notification");_||(_=document.createElement("div"),_.id="btfw-notification",_.className="btfw-notification",document.body.appendChild(_)),_.textContent=s,_.className=`btfw-notification btfw-notification--${c} btfw-notification--show`,clearTimeout(_._hideTimer),_._hideTimer=setTimeout(()=>{_.classList.remove("btfw-notification--show")},3e3)}function R(){return F("video")}function se(s){let c=(s||"").replace(/\r\n/g,`
`).trim()+`
`;return c=c.replace(/^\d+\s*$\n/gm,""),c=c.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g,"$1.$2"),c=c.replace(/(\d{2}:\d{2}:\d{2}\.\d{3})\s*-->\s*(\d{2}:\d{2}:\d{2}\.\d{3})/g,"$1 --> $2"),`WEBVTT

`+c}async function W(){let s=R();if(!s){be("Local subs only for HTML5 sources.");return}let c=document.createElement("input");c.type="file",c.accept=".vtt,.srt,text/vtt,text/plain",c.style.display="none",document.body.appendChild(c);let _=new Promise(L=>{c.addEventListener("change",async()=>{let X=c.files&&c.files[0];if(document.body.removeChild(c),!X)return L(!1);try{let oe=await X.text(),_e=(X.name.split(".").pop()||"").toLowerCase()==="srt"?se(oe):oe.startsWith("WEBVTT")?oe:`WEBVTT

`+oe,xe=URL.createObjectURL(new Blob([_e],{type:"text/vtt"}));ge(s,xe,X.name.replace(/\.[^.]+$/,"")||"Local"),be("Subtitles loaded."),L(!0)}catch(oe){console.error(oe),be("Failed to load subtitles."),L(!1)}},{once:!0})});c.click(),await _}function ge(s,c,_){var X;(X=F('track[data-btfw="1"]',s))==null||X.remove();let L=document.createElement("track");L.kind="subtitles",L.label=_||"Local",L.srclang="en",L.src=c,L.default=!0,L.setAttribute("data-btfw","1"),s.appendChild(L);try{for(let oe of s.textTracks)oe.mode=oe.label===L.label?"showing":"disabled"}catch(oe){}}function be(s){let c=F("#btfw-mini-toast");c||(c=document.createElement("div"),c.id="btfw-mini-toast",document.body.appendChild(c)),c.textContent=s,c.style.opacity="1",clearTimeout(c._hid),c._hid=setTimeout(()=>c.style.opacity="0",1400)}function Le(s){if(!s)return;let c=document.querySelector("#btfw-vo-subs");c||(c=document.createElement("button"),c.id="btfw-vo-subs",c.className="btfw-vo-btn",c.title="Load local subtitles (.vtt/.srt)",c.innerHTML='<i class="fa fa-closed-captioning"></i>',c.addEventListener("click",L=>{L.preventDefault(),W()}),s.insertBefore(c,s.firstChild||null));let _=fe()&&a();c.style.display=_?"":"none"}function ke(){we(),le();let s=[F("#videowrap"),F("#rightcontrols"),F("#leftcontrols"),document.body].filter(Boolean),c=new MutationObserver(()=>le());s.forEach(_=>c.observe(_,{childList:!0,subtree:!0})),document.addEventListener("btfw:video:localsubs:changed",()=>le());try{window.socket&&typeof socket.on=="function"&&socket.on("changeMedia",()=>{setTimeout(()=>le(),0)})}catch(_){}}return document.readyState==="loading"?document.addEventListener("DOMContentLoaded",ke):ke(),{name:"feature:videoOverlay",setLocalSubsEnabled:U,toggleFullscreen:f,enableAirplay:m}});(function(){"use strict";let h="https://vidprox.billtube.workers.dev/?url=";function j(){return window.__btfwMediaSourceNodes||(window.__btfwMediaSourceNodes=new WeakMap),window.__btfwMediaSourceNodes}function u(){return Date.now()}window.BTFW_AUDIO={audioContext:null,sourceNode:null,_sourceMediaElement:null,compressorNode:null,gainNode:null,splitterNode:null,monoMixGain:null,mergerNode:null,player:null,originalSrc:null,proxiedSrc:null,isProxied:!1,boostEnabled:!1,normalizationEnabled:!1,monoEnabled:!1,get CORS_PROXY(){var b,k,p;let a=typeof window!="undefined"&&(((b=window.BTFW_CONFIG)==null?void 0:b.corsVideoProxy)||((p=(k=window.BTFW_CONFIG)==null?void 0:k.integrations)==null?void 0:p.corsVideoProxy));if(typeof a=="string"&&a.trim()){let M=a.trim();if(M.includes("?"))return M;let Z=M.endsWith("/")?"":"/";return`${M}${Z}?url=`}return h},BOOST_MULTIPLIER:2.5,currentNormPreset:"youtube",_watchdogInterval:null,_mutationObserver:null,_watchdogPlayerHandlers:null,_lastKnownSrc:null,_lastInternalSrcSetAt:0,_lastAutoReapplyAt:0,_rebuildInFlight:null,NORM_PRESETS:{gentle:{threshold:-12,knee:20,ratio:6,attack:.01,release:.5,label:"Gentle"},youtube:{threshold:-24,knee:30,ratio:12,attack:.003,release:.25,label:"YouTube"},aggressive:{threshold:-50,knee:40,ratio:12,attack:.001,release:.25,label:"Aggressive"}},_isTrusted(a){try{return new URL(a).hostname.toLowerCase().endsWith(".workers.dev")}catch(b){return!1}},_markInternalSrcSet(){this._lastInternalSrcSetAt=u()},_isInsideInternalWindow(){return u()-this._lastInternalSrcSetAt<=2e3},_shouldForceProxy(){return this.boostEnabled||this.normalizationEnabled||this.monoEnabled},_hasAnonymousCrossOrigin(){let a=this._getMediaElement();return a?a.crossOrigin==="anonymous"||a.getAttribute("crossorigin")==="anonymous":!1},_ensureAnonymousCrossOrigin(){var a;if(this._hasAnonymousCrossOrigin())return!1;try{return(a=this.player)==null||a.crossOrigin("anonymous"),!0}catch(b){return!1}},_same(a,b){return String(a||"")===String(b||"")},_getMediaElement(){var k;let a=(k=this.player)==null?void 0:k.tech_;if(a){try{let p=typeof a.el=="function"?a.el():null;if(p instanceof HTMLMediaElement&&p.isConnected)return p}catch(p){}if(a.el_ instanceof HTMLMediaElement&&a.el_.isConnected)return a.el_}let b=document.querySelector("#ytapiplayer video, #videowrap .video-js .vjs-tech");return b instanceof HTMLMediaElement&&b.isConnected?b:null},_hasIframeOnlyMedia(){return this._getMediaElement()?!1:!!document.querySelector("#ytapiplayer iframe")},disconnectChain(){if(this.sourceNode)try{this.sourceNode.disconnect()}catch(a){}if(this.compressorNode){try{this.compressorNode.disconnect()}catch(a){}this.compressorNode=null}if(this.gainNode){try{this.gainNode.disconnect()}catch(a){}this.gainNode=null}if(this.splitterNode){try{this.splitterNode.disconnect()}catch(a){}this.splitterNode=null}if(this.monoMixGain){try{this.monoMixGain.disconnect()}catch(a){}this.monoMixGain=null}if(this.mergerNode){try{this.mergerNode.disconnect()}catch(a){}this.mergerNode=null}},resetMediaBinding(){var b,k;this.disconnectChain();let a=this._getMediaElement();if(a&&this._syncFromRegistry(a)){((b=this.audioContext)==null?void 0:b.state)==="running"&&this.audioContext.suspend().catch(()=>{});return}this.sourceNode=null,this._sourceMediaElement=null,((k=this.audioContext)==null?void 0:k.state)==="running"&&this.audioContext.suspend().catch(()=>{})},_swapVideoTechElement(a){var ue;let b=(ue=this.player)==null?void 0:ue.tech_;if(!(b!=null&&b.el_)||b.el_!==a)return null;let k=a.parentNode;if(!k)return null;let p=a.tagName.toLowerCase()==="audio"?"audio":"video",M=document.createElement(p);M.className=a.className,a.id&&(M.id=a.id),M.setAttribute("playsinline",""),M.setAttribute("webkit-playsinline",""),M.classList.contains("vjs-tech")||M.classList.add("vjs-tech");let Z=a.crossOrigin||a.getAttribute("crossorigin");return Z&&(M.crossOrigin=Z,M.setAttribute("crossorigin",Z)),k.replaceChild(M,a),b.el_=M,delete a.__btfwSourceNode,M},_syncFromRegistry(a){let b=j().get(a)||a.__btfwSourceNode||null;return b?(j().set(a,b),this.sourceNode=b,this._sourceMediaElement=a,b.context&&b.context.state!=="closed"&&(this.audioContext=b.context),b):null},_getOrCreateSourceNode(a){var M;let b=j(),k=b.get(a)||a.__btfwSourceNode||null;if(k)return b.set(a,k),this.sourceNode=k,this._sourceMediaElement=a,k.context&&k.context.state!=="closed"&&(this.audioContext=k.context),k;if(this.sourceNode&&this._sourceMediaElement===a)return b.set(a,this.sourceNode),a.__btfwSourceNode=this.sourceNode,this.sourceNode;(!this.audioContext||this.audioContext.state==="closed")&&(this.audioContext=new(window.AudioContext||window.webkitAudioContext));let p;try{p=this.audioContext.createMediaElementSource(a)}catch(Z){if((Z==null?void 0:Z.name)!=="InvalidStateError")throw Z;let ue=this._syncFromRegistry(a);if(ue)return ue;let Y=this._swapVideoTechElement(a);if(!Y)throw Z;let fe=(M=this.player)==null?void 0:M.currentSrc();if(fe&&this.player){this._markInternalSrcSet(),this.player.src({src:fe,type:"video/mp4"});try{this.player.load()}catch(U){}}return this._getOrCreateSourceNode(Y)}return b.set(a,p),a.__btfwSourceNode=p,this.sourceNode=p,this._sourceMediaElement=a,p},cleanup(){this.disconnectChain(),this.audioContext&&this.audioContext.state==="running"&&this.audioContext.suspend().catch(()=>{});let a=this._getMediaElement();a&&(a.disableRemotePlayback=!1),this.stopWatchdog()},startWatchdog(){if(!this.player)return;this.stopWatchdog();let a=this._getMediaElement();if(a&&typeof MutationObserver!="undefined"){this._mutationObserver=new MutationObserver(()=>{this._checkAndReapply("mutation")}),this._mutationObserver.observe(a,{attributes:!0,attributeFilter:["src","crossorigin"]});let b=new MutationObserver(()=>{this._checkAndReapply("sources")});b.observe(a,{childList:!0,subtree:!0}),this._mutationObserver._sourceObserver=b}if(!this._watchdogPlayerHandlers){this._watchdogPlayerHandlers={sourceset:()=>this._checkAndReapply("sourceset"),loadstart:()=>this._checkAndReapply("loadstart"),loadedmetadata:()=>this._checkAndReapply("loadedmetadata"),stalled:()=>this._checkAndReapply("stalled"),error:()=>this._checkAndReapply("error")};try{Object.entries(this._watchdogPlayerHandlers).forEach(([b,k])=>{this.player.on(b,k)})}catch(b){}}this._watchdogInterval=setInterval(()=>this._checkAndReapply("interval"),800),this._lastKnownSrc=this.player.currentSrc()},stopWatchdog(){var a;if(this._watchdogInterval&&(clearInterval(this._watchdogInterval),this._watchdogInterval=null),this._mutationObserver){try{this._mutationObserver.disconnect()}catch(b){}try{(a=this._mutationObserver._sourceObserver)==null||a.disconnect()}catch(b){}this._mutationObserver=null}if(this.player&&this._watchdogPlayerHandlers){try{Object.entries(this._watchdogPlayerHandlers).forEach(([b,k])=>{this.player.off(b,k)})}catch(b){}this._watchdogPlayerHandlers=null}},_checkAndReapply(a){if(!this.player)return;let b=this.player.currentSrc();if(!b||(this._lastKnownSrc=b,this._isInsideInternalWindow()))return;if(b.includes(this.CORS_PROXY)){this.isProxied=!0,this.proxiedSrc=b;return}if(this._isTrusted(b)){this._shouldForceProxy()&&this._ensureAnonymousCrossOrigin(),this.isProxied=!1,this.originalSrc=b;return}if(this._shouldForceProxy()){if(u()-this._lastAutoReapplyAt<800)return;this._lastAutoReapplyAt=u(),this._forceProxyPreservingState(b)}},async _forceProxyPreservingState(a){if(!this.player)return;let b=this.player.currentTime(),k=!this.player.paused();this.originalSrc=a,this.proxiedSrc=this.CORS_PROXY+encodeURIComponent(a);try{this.player.pause()}catch(M){}try{this.player.crossOrigin("anonymous")}catch(M){}this._markInternalSrcSet(),this.player.src({src:this.proxiedSrc,type:"video/mp4"});try{this.player.load()}catch(M){}let p=()=>{try{this.player.currentTime(b)}catch(M){}this.isProxied=!0,k&&this.player.play().catch(()=>{})};typeof this.player.ready=="function"?this.player.ready(p):setTimeout(p,300)},async ensureProxy(){if(!this.player)return!1;let a=this.player.currentSrc();if(!a)return!1;if(a.includes(this.CORS_PROXY))return this.isProxied=!0,this.proxiedSrc=a,!0;try{let b=new URL(a);if(this._isTrusted(a)){if(this.originalSrc=a,this.isProxied=!1,this._hasAnonymousCrossOrigin())return!0;let k=this.player.currentTime(),p=!this.player.paused();try{this.player.pause()}catch(M){}this._ensureAnonymousCrossOrigin(),this._markInternalSrcSet(),this.player.src({src:a,type:"video/mp4"});try{this.player.load()}catch(M){}return new Promise(M=>{this.player.ready(()=>{try{this.player.currentTime(k)}catch(Z){}p&&this.player.play().catch(()=>{}),M(!0)})})}}catch(b){console.warn("[BTFW_AUDIO] Invalid URL:",b)}return this._forceProxyPreservingState(a),!0},async rebuildAudioChain(){if(this._rebuildInFlight)return this._rebuildInFlight;this._rebuildInFlight=this._rebuildAudioChainImpl();try{return await this._rebuildInFlight}finally{this._rebuildInFlight=null}},async _rebuildAudioChainImpl(){var b;if(!this.player)return console.error("[BTFW_AUDIO] Player not ready"),!1;if((this.boostEnabled||this.normalizationEnabled||this.monoEnabled)&&(!this.isProxied&&!this._isTrusted(this.player.currentSrc())?await this.ensureProxy():this._shouldForceProxy()&&this._ensureAnonymousCrossOrigin()),!this.boostEnabled&&!this.normalizationEnabled&&!this.monoEnabled)return!0;this.disconnectChain();let a=this._getMediaElement();if(!a)return console.error("[BTFW_AUDIO] No HTMLMediaElement for Web Audio"),!1;try{((b=this.audioContext)==null?void 0:b.state)==="suspended"&&await this.audioContext.resume().catch(()=>{}),a.disableRemotePlayback=!0;let p=this._getOrCreateSourceNode(a);if(this.normalizationEnabled){this.compressorNode=this.audioContext.createDynamicsCompressor();let M=this.NORM_PRESETS[this.currentNormPreset];this.compressorNode.threshold.setValueAtTime(M.threshold,this.audioContext.currentTime),this.compressorNode.knee.setValueAtTime(M.knee,this.audioContext.currentTime),this.compressorNode.ratio.setValueAtTime(M.ratio,this.audioContext.currentTime),this.compressorNode.attack.setValueAtTime(M.attack,this.audioContext.currentTime),this.compressorNode.release.setValueAtTime(M.release,this.audioContext.currentTime),p.connect(this.compressorNode),p=this.compressorNode}return this.monoEnabled&&(this.splitterNode=this.audioContext.createChannelSplitter(2),this.monoMixGain=this.audioContext.createGain(),this.monoMixGain.gain.value=.5,this.mergerNode=this.audioContext.createChannelMerger(2),p.connect(this.splitterNode),this.splitterNode.connect(this.monoMixGain,0),this.splitterNode.connect(this.monoMixGain,1),this.monoMixGain.connect(this.mergerNode,0,0),this.monoMixGain.connect(this.mergerNode,0,1),p=this.mergerNode),this.boostEnabled&&(this.gainNode=this.audioContext.createGain(),this.gainNode.gain.value=this.BOOST_MULTIPLIER,p.connect(this.gainNode),p=this.gainNode),p.connect(this.audioContext.destination),this.startWatchdog(),console.log("[BTFW_AUDIO] Chain rebuilt:",{normalization:this.normalizationEnabled,boost:this.boostEnabled,mono:this.monoEnabled,proxied:this.isProxied}),!0}catch(k){return console.error("[BTFW_AUDIO] Error building audio chain:",k),this.disconnectChain(),!1}},async enableBoost(){return this.boostEnabled=!0,await this.rebuildAudioChain()},async disableBoost(){if(this.boostEnabled=!1,this.normalizationEnabled||this.monoEnabled){let a=await this.rebuildAudioChain();return this._shouldForceProxy()||this.stopWatchdog(),a}else{if(this.cleanup(),this.originalSrc&&this.isProxied){let a=this.player.currentTime(),b=!this.player.paused();try{this.player.pause()}catch(k){}try{this.player.crossOrigin(null)}catch(k){}this._markInternalSrcSet(),this.player.src({src:this.originalSrc,type:"video/mp4"});try{this.player.load()}catch(k){}this.player.ready(()=>{try{this.player.currentTime(a)}catch(k){}this.isProxied=!1,b&&this.player.play().catch(()=>{})})}return!0}},async enableNormalization(){return this.normalizationEnabled=!0,await this.rebuildAudioChain()},async setNormPreset(a){return this.NORM_PRESETS[a]?(this.currentNormPreset=a,this.normalizationEnabled?await this.rebuildAudioChain():!0):!1},async setBoostMultiplier(a){return this.BOOST_MULTIPLIER=a,this.boostEnabled?await this.rebuildAudioChain():!0},async disableNormalization(){if(this.normalizationEnabled=!1,this.boostEnabled||this.monoEnabled){let a=await this.rebuildAudioChain();return this._shouldForceProxy()||this.stopWatchdog(),a}else{if(this.cleanup(),this.originalSrc&&this.isProxied){let a=this.player.currentTime(),b=!this.player.paused();try{this.player.pause()}catch(k){}try{this.player.crossOrigin(null)}catch(k){}this._markInternalSrcSet(),this.player.src({src:this.originalSrc,type:"video/mp4"});try{this.player.load()}catch(k){}this.player.ready(()=>{try{this.player.currentTime(a)}catch(k){}this.isProxied=!1,b&&this.player.play().catch(()=>{})})}return!0}},async enableMono(){return this.monoEnabled=!0,await this.rebuildAudioChain()},async disableMono(){if(this.monoEnabled=!1,this.boostEnabled||this.normalizationEnabled){let a=await this.rebuildAudioChain();return this._shouldForceProxy()||this.stopWatchdog(),a}else{if(this.cleanup(),this.originalSrc&&this.isProxied){let a=this.player.currentTime(),b=!this.player.paused();try{this.player.pause()}catch(k){}try{this.player.crossOrigin(null)}catch(k){}this._markInternalSrcSet(),this.player.src({src:this.originalSrc,type:"video/mp4"});try{this.player.load()}catch(k){}this.player.ready(()=>{try{this.player.currentTime(a)}catch(k){}this.isProxied=!1,b&&this.player.play().catch(()=>{})})}return!0}}}})();(function(){"use strict";function F(A){window.BTFW&&typeof BTFW.define=="function"?A():setTimeout(()=>F(A),0)}F(function(){BTFW.define("feature:audio",[],async()=>{let A=(f,g=document)=>g.querySelector(f),T=window.BTFW_AUDIO,h=null,j=null,u=null,a=!1,b=!1,k=!1,p=null,M=null,Z=[{multiplier:1.5,label:"150%"},{multiplier:2.5,label:"250%"},{multiplier:3.5,label:"350%"}];function ue(f){h&&(f?(h.classList.add("active"),h.style.background="rgba(46, 213, 115, 0.3)",h.style.borderColor="#2ed573",h.style.color="#2ed573",h.style.boxShadow="0 0 12px rgba(46, 213, 115, 0.6)"):(h.classList.remove("active"),h.style.background="",h.style.borderColor="",h.style.color="",h.style.boxShadow=""))}function Y(f,g="info"){let i=A("#btfw-audioboost-toast");i||(i=document.createElement("div"),i.id="btfw-audioboost-toast",i.style.cssText=`
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${g==="success"?"rgba(46, 213, 115, 0.9)":"rgba(235, 77, 75, 0.9)"};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-family: system-ui, -apple-system, sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          `,document.body.appendChild(i)),i.textContent=f,i.style.background=g==="success"?"rgba(46, 213, 115, 0.9)":"rgba(235, 77, 75, 0.9)",i.style.opacity="1",setTimeout(()=>{i.style.opacity="0"},2e3)}async function fe(){if(await T.enableBoost()){a=!0;let g=Math.round(T.BOOST_MULTIPLIER*100);Y(`Boosted by ${g}%`,"success"),ue(!0)}else{let g=T._hasIframeOnlyMedia()?"Audio boost requires direct video playback":"Failed to activate boost";Y(g,"error")}}async function U(){await T.disableBoost(),a=!1,ue(!1)}function G(f){j&&(f?(j.classList.add("active"),j.style.background="rgba(52, 152, 219, 0.3)",j.style.borderColor="#3498db",j.style.color="#3498db",j.style.boxShadow="0 0 12px rgba(52, 152, 219, 0.6)"):(j.classList.remove("active"),j.style.background="",j.style.borderColor="",j.style.color="",j.style.boxShadow=""))}function q(f,g="info"){let i=A("#btfw-audionorm-toast");i||(i=document.createElement("div"),i.id="btfw-audionorm-toast",i.style.cssText=`
            position: fixed;
            top: 70px;
            right: 20px;
            background: ${g==="success"?"rgba(52, 152, 219, 0.9)":"rgba(235, 77, 75, 0.9)"};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-family: system-ui, -apple-system, sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          `,document.body.appendChild(i)),i.textContent=f,i.style.background=g==="success"?"rgba(52, 152, 219, 0.9)":"rgba(235, 77, 75, 0.9)",i.style.opacity="1",setTimeout(()=>{i.style.opacity="0"},2e3)}async function I(){if(await T.enableNormalization())b=!0,q("Normalization enabled","success"),G(!0);else{let g=T._hasIframeOnlyMedia()?"Audio normalization requires direct video playback":"Failed to activate";q(g,"error")}}async function K(){await T.disableNormalization(),b=!1,G(!1)}function Q(f){u&&(f?(u.classList.add("active"),u.style.background="rgba(155, 89, 182, 0.3)",u.style.borderColor="#9b59b6",u.style.color="#9b59b6",u.style.boxShadow="0 0 12px rgba(155, 89, 182, 0.6)"):(u.classList.remove("active"),u.style.background="",u.style.borderColor="",u.style.color="",u.style.boxShadow=""))}function J(f,g="info"){let i=A("#btfw-mono-toast");i||(i=document.createElement("div"),i.id="btfw-mono-toast",i.style.cssText=`
            position: fixed;
            top: 120px;
            right: 20px;
            background: ${g==="success"?"rgba(155, 89, 182, 0.9)":"rgba(235, 77, 75, 0.9)"};
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            font-size: 14px;
            font-family: system-ui, -apple-system, sans-serif;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
            pointer-events: none;
          `,document.body.appendChild(i)),i.textContent=f,i.style.background=g==="success"?"rgba(155, 89, 182, 0.9)":"rgba(235, 77, 75, 0.9)",i.style.opacity="1",setTimeout(()=>{i.style.opacity="0"},2e3)}async function he(){if(await T.enableMono())k=!0,J("Stereo audio enabled","success"),Q(!0);else{let g=T._hasIframeOnlyMedia()?"Mono audio requires direct video playback":"Failed to activate";J(g,"error")}}async function te(){await T.disableMono(),k=!1,Q(!1)}function Ee(){let f=document.createElement("button");f.id="btfw-vo-audioboost",f.className="btn btn-sm btn-default btfw-vo-adopted";let g=Math.round(T.BOOST_MULTIPLIER*100);return f.title=`Toggle Audio Boost (${g}%)`,f.setAttribute("data-btfw-overlay","1"),f.innerHTML='<i class="fa-solid fa-megaphone"></i>',f.addEventListener("click",()=>{T.boostEnabled?U():fe()}),f.addEventListener("mouseenter",()=>le()),f.addEventListener("mouseleave",()=>{setTimeout(()=>{!(p!=null&&p.matches(":hover"))&&!f.matches(":hover")&&v()},100)}),f}function pe(){let f=document.createElement("button");f.id="btfw-vo-audionorm",f.className="btn btn-sm btn-default btfw-vo-adopted";let g=T.NORM_PRESETS[T.currentNormPreset].label;return f.title=`Toggle Audio Normalization (${g})`,f.setAttribute("data-btfw-overlay","1"),f.innerHTML='<i class="fa-solid fa-waveform-lines"></i>',f.addEventListener("click",()=>{T.normalizationEnabled?K():I()}),f.addEventListener("mouseenter",()=>z()),f.addEventListener("mouseleave",()=>{setTimeout(()=>{!(M!=null&&M.matches(":hover"))&&!f.matches(":hover")&&ne()},100)}),f}function we(){let f=document.createElement("button");return f.id="btfw-vo-mono",f.className="btn btn-sm btn-default btfw-vo-adopted",f.title="Toggle Mono Audio (mix both channels to stereo)",f.setAttribute("data-btfw-overlay","1"),f.innerHTML='<i class="fa-solid fa-headphones"></i>',f.addEventListener("click",()=>{T.monoEnabled?te():he()}),f}function Se(){if(p)return p;let f=document.createElement("div");return f.id="btfw-boost-context-menu",f.style.cssText=`
          position: absolute;
          background: rgba(20, 31, 54, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(109, 77, 246, 0.3);
          border-radius: 8px;
          padding: 6px;
          display: none;
          z-index: 10000;
          min-width: 100px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        `,Z.forEach(g=>{let i=document.createElement("button");i.className="btfw-context-item",i.textContent=g.label,i.style.cssText=`
            display: block;
            width: 100%;
            padding: 6px 12px;
            background: transparent;
            border: none;
            color: #e0e0e0;
            text-align: left;
            cursor: pointer;
            border-radius: 4px;
            font-size: 13px;
            transition: all 0.2s ease;
          `,T.BOOST_MULTIPLIER===g.multiplier&&(i.style.background="rgba(46, 213, 115, 0.2)",i.style.color="#2ed573"),i.addEventListener("mouseenter",()=>{T.BOOST_MULTIPLIER!==g.multiplier&&(i.style.background="rgba(109, 77, 246, 0.2)")}),i.addEventListener("mouseleave",()=>{T.BOOST_MULTIPLIER!==g.multiplier&&(i.style.background="transparent")}),i.addEventListener("click",async()=>{if(await T.setBoostMultiplier(g.multiplier),C(),h){let m=Math.round(g.multiplier*100);h.title=`Toggle Audio Boost (${m}%)`}T.boostEnabled&&Y(`Boost set to ${g.label}`,"success")}),f.appendChild(i)}),f.addEventListener("mouseleave",()=>{setTimeout(()=>{h!=null&&h.matches(":hover")||v()},100)}),document.body.appendChild(f),p=f,f}function le(){if(!h)return;let f=Se(),g=h.getBoundingClientRect();f.style.left=g.left+"px",f.style.top=g.bottom+5+"px",f.style.display="block"}function v(){p&&(p.style.display="none")}function C(){if(!p)return;p.querySelectorAll(".btfw-context-item").forEach((g,i)=>{let m=Z[i];T.BOOST_MULTIPLIER===m.multiplier?(g.style.background="rgba(46, 213, 115, 0.2)",g.style.color="#2ed573"):(g.style.background="transparent",g.style.color="#e0e0e0")})}function B(){if(M)return M;let f=document.createElement("div");return f.id="btfw-norm-context-menu",f.style.cssText=`
          position: absolute;
          background: rgba(20, 31, 54, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(52, 152, 219, 0.3);
          border-radius: 8px;
          padding: 6px;
          display: none;
          z-index: 10000;
          min-width: 110px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.4);
        `,Object.keys(T.NORM_PRESETS).forEach(g=>{let i=T.NORM_PRESETS[g],m=document.createElement("button");m.className="btfw-context-item",m.textContent=i.label,m.style.cssText=`
            display: block;
            width: 100%;
            padding: 6px 12px;
            background: transparent;
            border: none;
            color: #e0e0e0;
            text-align: left;
            cursor: pointer;
            border-radius: 4px;
            font-size: 13px;
            transition: all 0.2s ease;
          `,T.currentNormPreset===g&&(m.style.background="rgba(52, 152, 219, 0.2)",m.style.color="#3498db"),m.addEventListener("mouseenter",()=>{T.currentNormPreset!==g&&(m.style.background="rgba(109, 77, 246, 0.2)")}),m.addEventListener("mouseleave",()=>{T.currentNormPreset!==g&&(m.style.background="transparent")}),m.addEventListener("click",async()=>{await T.setNormPreset(g),re(),j&&(j.title=`Toggle Audio Normalization (${i.label})`),T.normalizationEnabled&&q(`Preset: ${i.label}`,"success")}),f.appendChild(m)}),f.addEventListener("mouseleave",()=>{setTimeout(()=>{j!=null&&j.matches(":hover")||ne()},100)}),document.body.appendChild(f),M=f,f}function z(){if(!j)return;let f=B(),g=j.getBoundingClientRect();f.style.left=g.left+"px",f.style.top=g.bottom+5+"px",f.style.display="block"}function ne(){M&&(M.style.display="none")}function re(){if(!M)return;let f=M.querySelectorAll(".btfw-context-item");Object.keys(T.NORM_PRESETS).forEach((g,i)=>{let m=f[i];T.currentNormPreset===g?(m.style.background="rgba(52, 152, 219, 0.2)",m.style.color="#3498db"):(m.style.background="transparent",m.style.color="#e0e0e0")})}function ae(){let f=A("#btfw-vo-left");if(!f)return!1;let g=A("#btfw-vo-audioboost");g&&g.remove();let i=A("#btfw-vo-audionorm");i&&i.remove();let m=A("#btfw-vo-mono");return m&&m.remove(),h=Ee(),j=pe(),u=we(),f.appendChild(h),f.appendChild(j),f.appendChild(u),!0}function ce(f,g=20){let i=0,m=setInterval(()=>{i++,ae()?(clearInterval(m),f()):i>=g&&clearInterval(m)},500)}function l(){if(typeof videojs=="undefined"){setTimeout(l,500);return}if(!A("#ytapiplayer")){setTimeout(l,500);return}T.player=videojs("ytapiplayer"),T.originalSrc=T.player.currentSrc(),T.startWatchdog()}function P(){setTimeout(()=>{T.resetMediaBinding(),T.boostEnabled=!1,T.normalizationEnabled=!1,T.monoEnabled=!1,T.isProxied=!1,ue(!1),G(!1),Q(!1),l(),a&&setTimeout(()=>{fe()},1200),b&&setTimeout(()=>{I()},1200),k&&setTimeout(()=>{he()},1200)},600)}function N(){typeof socket=="undefined"||!socket.on||(socket.on("disconnect",()=>{}),socket.on("connect",()=>{setTimeout(()=>T._checkAndReapply("socket-connect"),500)}),socket.on("reconnect",()=>{setTimeout(()=>T._checkAndReapply("socket-reconnect"),500)}),socket.on("changeMedia",P))}function D(){ce(()=>{l()}),N()}return document.readyState==="loading"?document.addEventListener("DOMContentLoaded",D):D(),{name:"feature:audio",activate:fe,deactivate:U,isActive:()=>T.boostEnabled,activateNormalization:I,deactivateNormalization:K,isNormalizationActive:()=>T.normalizationEnabled,activateMono:he,deactivateMono:te,isMonoActive:()=>T.monoEnabled}}),BTFW.define("feature:audioboost",["feature:audio"],async A=>A.init("feature:audio")),BTFW.define("feature:audio-boost",["feature:audio"],async A=>A.init("feature:audio")),BTFW.define("feature:audionorm",["feature:audio"],async A=>A.init("feature:audio")),BTFW.define("feature:monoaudio",["feature:audio"],async A=>A.init("feature:audio"))})})();BTFW.define("feature:movie-info",["util:tmdb-proxy"],async({init:F})=>{let A=await F("util:tmdb-proxy"),T="movie-info",h={CONTAINER_ID:"btfw-movie-header",TITLE_SELECTOR:"#currenttitle",TOPBAR_SELECTOR:".btfw-chat-topbar",ENABLE_BACKDROP:!0,ENABLE_RATING:!0,SHOW_SUMMARY:!0},j="btfw-movie-info-style",u={isInitialized:!1,header:null,currentTitle:"",hideTimer:null,initTimer:null,socketRetryTimer:null,cleanup:[]},a=0,b=!1,k=null;function p(i){typeof i=="function"&&u.cleanup.push(i)}function M(){for(;u.cleanup.length;){let i=u.cleanup.pop();try{i()}catch(m){}}u.header&&(u.header.remove(),u.header=null)}function Z(){u.hideTimer&&(clearTimeout(u.hideTimer),u.hideTimer=null),u.initTimer&&(clearTimeout(u.initTimer),u.initTimer=null),u.socketRetryTimer&&(clearTimeout(u.socketRetryTimer),u.socketRetryTimer=null),a=0,u.currentTitle="",u.isInitialized=!1,M()}function ue(i){if(typeof i=="boolean")return i;if(typeof i=="number")return Number.isFinite(i)?i>0:!1;if(typeof i=="string"){let m=i.trim().toLowerCase();return m?m==="1"||m==="true"||m==="yes"||m==="on":!1}return!1}function Y(){let i=[()=>{var m,S,R;return(R=(S=(m=window.BTFW_THEME_ADMIN)==null?void 0:m.integrations)==null?void 0:S.movieInfo)==null?void 0:R.enabled},()=>{var m,S,R;return(R=(S=(m=window.BTFW_CONFIG)==null?void 0:m.integrations)==null?void 0:S.movieInfo)==null?void 0:R.enabled},()=>{var m,S;return(S=(m=window.BTFW_CONFIG)==null?void 0:m.movieInfo)==null?void 0:S.enabled},()=>{var m;return(m=window.BTFW_CONFIG)==null?void 0:m.movieInfoEnabled},()=>{var m,S;return(S=(m=document==null?void 0:document.body)==null?void 0:m.dataset)==null?void 0:S.btfwMovieInfoEnabled}];for(let m of i)try{let S=typeof m=="function"?m():m;if(ue(S))return!0}catch(S){}return!1}function fe(){if(k||typeof MutationObserver!="function")return;let i=document.body;i&&(k=new MutationObserver(()=>I()),k.observe(i,{attributes:!0,attributeFilter:["data-btfw-movie-info-enabled"]}))}function U(){if(b)return;b=!0;let i=()=>I();document.addEventListener("btfw:channelIntegrationsChanged",i),document.addEventListener("btfw:ready",i)}function G(i=0){u.initTimer&&(clearTimeout(u.initTimer),u.initTimer=null),u.initTimer=window.setTimeout(()=>{u.initTimer=null,Y()&&q()},Math.max(0,i))}function q(){if(u.isInitialized)return;let i=document.querySelector(h.TOPBAR_SELECTOR);if(!i){G(500);return}try{K(i),f(),J(),u.isInitialized=!0,setTimeout(()=>{v(),C()},120)}catch(m){G(800)}}function I(){Y()?u.isInitialized?(v(),setTimeout(C,80)):G(0):Z()}function K(i){if(!i&&(i=document.querySelector(h.TOPBAR_SELECTOR),!i))throw new Error("Chat topbar not found");let m=document.getElementById(h.CONTAINER_ID);m&&m.remove();let S=document.createElement("div");S.id=h.CONTAINER_ID,S.className="btfw-movie-header hide",S.dataset.module=T,i.insertAdjacentElement("afterend",S),u.header=S}function Q(){try{return window.socket||window.SOCKET||null}catch(i){return null}}function J(){he(),pe();let i=D(v,250);window.addEventListener("resize",i),p(()=>window.removeEventListener("resize",i))}function he(){te(),Ee()}function te(){let i=document.querySelector(h.TITLE_SELECTOR);if(i){let m=()=>Se(),S=()=>le();i.addEventListener("mouseenter",m),i.addEventListener("mouseleave",S),p(()=>{i.removeEventListener("mouseenter",m),i.removeEventListener("mouseleave",S)})}else if(typeof MutationObserver=="function"){let m=new MutationObserver(()=>{document.querySelector(h.TITLE_SELECTOR)&&(m.disconnect(),te())});m.observe(document.body||document.documentElement,{childList:!0,subtree:!0}),p(()=>{try{m.disconnect()}catch(S){}})}}function Ee(){let i=u.header;if(!i)return;let m=()=>we(),S=()=>le();i.addEventListener("mouseenter",m),i.addEventListener("mouseleave",S),p(()=>{i.removeEventListener("mouseenter",m),i.removeEventListener("mouseleave",S)})}function pe(){let i=Q();if(i&&typeof i.on=="function"){i.on("changeMedia",C),p(()=>{var R,se;try{(R=i.off)==null||R.call(i,"changeMedia",C)}catch(W){try{(se=i.removeListener)==null||se.call(i,"changeMedia",C)}catch(ge){}}});return}let m=0,S=()=>{if(!Y()){u.socketRetryTimer=null;return}let R=Q();if(R&&typeof R.on=="function"){R.on("changeMedia",C),p(()=>{var se,W;try{(se=R.off)==null||se.call(R,"changeMedia",C)}catch(ge){try{(W=R.removeListener)==null||W.call(R,"changeMedia",C)}catch(be){}}}),u.socketRetryTimer=null;return}if(m+=1,m>10){u.socketRetryTimer=null;return}u.socketRetryTimer=window.setTimeout(S,1e3)};u.socketRetryTimer=window.setTimeout(S,1200),p(()=>{u.socketRetryTimer&&(clearTimeout(u.socketRetryTimer),u.socketRetryTimer=null)})}function we(){u.hideTimer&&(clearTimeout(u.hideTimer),u.hideTimer=null)}function Se(){we(),u.header&&(u.header.classList.remove("hide"),u.header.classList.add("show"))}function le(){we(),u.hideTimer=window.setTimeout(()=>{u.header&&(u.header.classList.remove("show"),u.header.classList.add("hide"),setTimeout(()=>{u.header&&u.header.classList.contains("hide")&&u.header.classList.remove("hide")},320))},300)}function v(){if(!u.header)return;let i=window.innerWidth<=768;u.header.classList.toggle("btfw-mobile",i)}async function C(){var se;if(!u.isInitialized)return;let i=document.querySelector(h.TITLE_SELECTOR),m=u.header;if(!i||!m)return;let S=((se=i.textContent)==null?void 0:se.trim())||"";if(!S){u.currentTitle="",ae();return}if(S===u.currentTitle)return;u.currentTitle=S;let R=++a;ne();try{let W=await z(S);if(R!==a)return;l(W)}catch(W){if(R!==a)return;A.isAvailable()||console.warn("[movie-info] TMDB proxy unavailable. Deploy movies-storage worker with TMDB_API_KEY."),re()}}function B(i){let m=["Extended","Director's Cut","Directors Cut","Unrated","Theatrical Cut"],S=i;return m.forEach(R=>{let se=new RegExp(`\\b${R}\\b`,"gi");S=S.replace(se,"")}),S.replace(/\s{2,}/g," ").trim()}async function z(i){var ge;if(!A.isAvailable())throw new Error(A.MISSING_PROXY_MSG);let m=i.match(/(.+)\s*\((\d{4})\)/),S=m?m[1].trim():i,R=m?m[2]:"";R||(m=i.match(/(.+?)\s+(\d{4})\s*$/),m&&(S=m[1].trim(),R=m[2]));let se=B(S),W=await A.tmdbFetch("search/movie",{query:se,year:R});if(((ge=W==null?void 0:W.results)==null?void 0:ge.length)>0){let be=W.results[0];return{title:i,backdrop:be.backdrop_path?`https://image.tmdb.org/t/p/w1280${be.backdrop_path}`:null,poster:be.poster_path?`https://image.tmdb.org/t/p/w500${be.poster_path}`:null,summary:be.overview||"",rating:be.vote_average||0,releaseDate:be.release_date||"",voteCount:be.vote_count||0}}return{title:i,backdrop:null,poster:null,summary:"",rating:0,releaseDate:"",voteCount:0}}function ne(){u.header&&(ce(),u.header.innerHTML=`
      <div class="btfw-movie-content">
        <div class="btfw-movie-loading">
          <i class="fa fa-spinner fa-spin"></i>
          <p>Loading movie information...</p>
        </div>
      </div>
    `)}function re(){u.header&&(ce(),u.header.innerHTML=`
      <div class="btfw-movie-content">
        <div class="btfw-movie-error">
          <i class="fa fa-exclamation-triangle"></i>
          <p>Unable to fetch movie information</p>
          <small>Check TMDB API key in Theme Settings</small>
        </div>
      </div>
    `)}function ae(){u.header&&(ce(),u.header.innerHTML=`
      <div class="btfw-movie-content">
        <p>No movie information available</p>
      </div>
    `)}function ce(){u.header&&(u.header.style.backgroundImage="",u.header.style.backgroundColor="")}function l(i){if(!u.header)return;u.header.innerHTML="",h.ENABLE_BACKDROP&&i.backdrop?(u.header.style.backgroundImage=`url(${i.backdrop})`,u.header.style.backgroundSize="cover",u.header.style.backgroundPosition="center"):ce();let m=document.createElement("div");m.className="btfw-movie-overlay",u.header.appendChild(m);let S=document.createElement("div");if(S.className="btfw-movie-content",u.header.appendChild(S),i.poster){let W=document.createElement("img");W.src=i.poster,W.alt=`${i.title} Poster`,W.className="btfw-movie-poster",S.appendChild(W)}let R=document.createElement("div");R.className="btfw-movie-details",S.appendChild(R);let se=document.createElement("h2");if(se.textContent=i.title,se.className="btfw-movie-title",R.appendChild(se),h.SHOW_SUMMARY&&i.summary){let W=document.createElement("p");W.textContent=i.summary,W.className="btfw-movie-summary",R.appendChild(W)}if(h.ENABLE_RATING&&i.rating>0){let W=P(i.rating,i.voteCount);S.appendChild(W)}}function P(i,m){let S=document.createElement("div");S.className="btfw-movie-rating";let R=Math.round(i*10),se=N(R),W="http://www.w3.org/2000/svg",ge=document.createElementNS(W,"svg");ge.setAttribute("width","60"),ge.setAttribute("height","60"),ge.setAttribute("viewBox","0 0 60 60");let be=25,Le=2*Math.PI*be,ke=Le-i/10*Le,s=document.createElementNS(W,"circle");s.setAttribute("cx","30"),s.setAttribute("cy","30"),s.setAttribute("r",be.toString()),s.setAttribute("stroke","#2a2a2a"),s.setAttribute("stroke-width","4"),s.setAttribute("fill","#1a1a1a"),ge.appendChild(s);let c=document.createElementNS(W,"circle");c.setAttribute("cx","30"),c.setAttribute("cy","30"),c.setAttribute("r",be.toString()),c.setAttribute("stroke",se),c.setAttribute("stroke-width","3"),c.setAttribute("fill","none"),c.setAttribute("stroke-dasharray",Le.toString()),c.setAttribute("stroke-dashoffset",ke.toString()),c.setAttribute("transform","rotate(-90 30 30)"),c.setAttribute("stroke-linecap","round"),ge.appendChild(c);let _=document.createElementNS(W,"text");if(_.setAttribute("x","50%"),_.setAttribute("y","50%"),_.setAttribute("text-anchor","middle"),_.setAttribute("dominant-baseline","central"),_.setAttribute("fill","#fff"),_.setAttribute("font-size","10"),_.setAttribute("font-weight","bold"),_.textContent=`${R}%`,ge.appendChild(_),S.appendChild(ge),m>0){let L=document.createElement("div");L.className="btfw-movie-votes",L.textContent=`${m.toLocaleString()} votes`,S.appendChild(L)}return S}function N(i){let m=Math.max(0,Math.min(i,100));return m>=70?"#4caf50":m>=50?"#ff9800":"#f44336"}function D(i,m){let S=null;return function(...se){S&&clearTimeout(S),S=setTimeout(()=>{S=null,i(...se)},m)}}function f(){if(document.getElementById(j))return;let i=`
      .btfw-movie-header {
        position: absolute;
        top: 44px;
        right: 0;
        height: auto;
        width: 100%;
        max-width: 90vw;
        background: rgba(20, 20, 20, 0.95);
        border-radius: 0 0 12px 12px;
        border: 1px solid rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        z-index: 1000;
        overflow: hidden;
        box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4);
        opacity: 0;
        transform: translateY(-20px) scale(0.95);
        pointer-events: none;
      }
      .btfw-movie-header.show {
        opacity: 1;
        transform: translateY(0) scale(1);
        pointer-events: auto;
        animation: slideInDown 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
      }
      .btfw-movie-header.hide {
        animation: slideOutUp 0.3s cubic-bezier(0.55, 0.055, 0.675, 0.19) forwards;
      }
      @keyframes slideInDown {
        0% {
          opacity: 0;
          transform: translateY(-30px) scale(0.9);
        }
        60% {
          opacity: 0.8;
          transform: translateY(5px) scale(1.02);
        }
        100% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
      }
      @keyframes slideOutUp {
        0% {
          opacity: 1;
          transform: translateY(0) scale(1);
        }
        100% {
          opacity: 0;
          transform: translateY(-25px) scale(0.95);
        }
      }
      .btfw-movie-overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(135deg, rgba(0, 0, 0, 0.7) 0%, rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 0.8) 100%);
        z-index: 1;
      }
      .btfw-movie-content {
        position: relative;
        z-index: 2;
        padding: 10px;
        display: flex;
        gap: 15px;
        min-height: 160px;
      }
      .btfw-movie-poster {
        width: 100px;
        height: auto;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
        flex-shrink: 0;
      }
      .btfw-movie-details {
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 12px;
      }
      .btfw-movie-title {
        color: #fff;
        font-size: 1.2em;
        font-weight: 600;
        margin: 0;
        text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
        line-height: 1.3;
      }
      .btfw-movie-summary {
        color: #e0e0e0;
        font-size: 0.85em;
        line-height: 1.5;
        margin: 0;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
        display: -webkit-box;
        -webkit-line-clamp: 4;
        -webkit-box-orient: vertical;
        overflow: hidden;
      }
      .btfw-movie-rating {
        position: sticky;
        bottom: 16px;
        right: 16px;
        display: flex;
        flex-direction: column;
        align-items: stretch;
        gap: 4px;
        justify-content: flex-end;
      }
      .btfw-movie-votes {
        color: #ccc;
        font-size: 0.7em;
        text-align: center;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
      }
      .btfw-movie-loading,
      .btfw-movie-error {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 12px;
        color: #ccc;
        text-align: center;
        min-height: 120px;
      }
      .btfw-movie-loading i,
      .btfw-movie-error i {
        font-size: 2em;
        opacity: 0.7;
      }
      .btfw-movie-error i {
        color: #ff6b6b;
      }
      .btfw-movie-error small {
        font-size: 0.8em;
        color: #aaa;
      }
      @media (max-width: 768px) {
        .btfw-movie-header {
          width: 100%;
          right: 0;
          left: 0;
          border-radius: 0;
        }
        .btfw-movie-content {
          padding: 16px;
          flex-direction: column;
          min-height: auto;
        }
        .btfw-movie-poster {
          width: 80px;
          align-self: center;
        }
        .btfw-movie-rating {
          position: static;
          align-self: center;
          margin-top: 12px;
        }
        .btfw-movie-summary {
          -webkit-line-clamp: 3;
        }
      }
      ${h.TITLE_SELECTOR}:hover {
        color: #4fc3f7 !important;
        transition: color 0.2s ease;
      }
    `,m=document.createElement("style");m.id=j,m.textContent=i,document.head.appendChild(m)}function g(){fe(),U(),I()}return document.readyState==="loading"?document.addEventListener("DOMContentLoaded",g,{once:!0}):g(),{name:"feature:movie-info",refresh:I,cleanup:Z}});BTFW.define("feature:monkeyPaw",[],async()=>{let F="btfw-monkey-paw-styles",A="btfw-monkey-paw-overlay",T="/assets/monkey-paw/paw.svg",h={"f-pinky":{root:"rotate(85deg)",tip:"rotate(70deg)"},"f-ring":{root:"rotate(88deg)",tip:"rotate(75deg)"},"f-index":{root:"rotate(87deg)",tip:"rotate(74deg)"},"f-thumb":{root:"rotate(62deg)",tip:"rotate(38deg)"}},j={"f-pinky":0,"f-ring":90,"f-index":190,"f-thumb":300},u={"f-pinky":{root:"rotate(0deg)",tip:"rotate(0deg)"},"f-ring":{root:"rotate(0deg)",tip:"rotate(0deg)"},"f-index":{root:"rotate(0deg)",tip:"rotate(0deg)"},"f-thumb":{root:"rotate(-18deg)",tip:"rotate(0deg)"}},a=null,b=null;function k(q){return new Promise(I=>setTimeout(I,q))}function p(){try{let q=typeof window!="undefined"?window.BTFW:null;return q&&(q.BASE||q.DEV_CDN)||""}catch(q){return""}}function M(){try{return window.matchMedia("(prefers-reduced-motion: reduce)").matches}catch(q){return!1}}function Z(){if(typeof document=="undefined"||document.getElementById(F))return;let q=document.createElement("style");q.id=F,q.textContent=`
      #${A} {
        position: fixed;
        inset: 0;
        z-index: 6200;
        display: flex;
        align-items: center;
        justify-content: center;
        background: rgba(10, 8, 6, 0.92);
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.35s ease;
        font-family: Georgia, "Times New Roman", serif;
        overflow: hidden;
      }

      #${A}.is-active {
        opacity: 1;
        pointer-events: auto;
      }

      #${A}::before {
        content: "";
        position: absolute;
        inset: 0;
        background: radial-gradient(ellipse at 50% 60%, rgba(60, 28, 8, 0.45) 0%, transparent 70%);
        pointer-events: none;
        transition: background 1.4s ease;
      }

      #${A}.is-cursed::before {
        background: radial-gradient(ellipse at 50% 60%, rgba(120, 15, 15, 0.55) 0%, transparent 70%);
      }

      #${A} .btfw-monkey-paw-scene {
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 28px;
        padding: 24px 20px;
        max-width: min(92vw, 420px);
      }

      #${A} .btfw-monkey-paw-title {
        color: #7a4c22;
        font-size: 0.95rem;
        font-weight: normal;
        letter-spacing: 0.3em;
        text-transform: uppercase;
        margin: 0;
        opacity: 0;
        animation: btfwMonkeyPawFadeIn 1.2s 0.15s forwards;
      }

      @keyframes btfwMonkeyPawFadeIn {
        to { opacity: 1; }
      }

      #${A} .btfw-monkey-paw-stage {
        position: relative;
        width: min(72vw, 300px);
        height: min(78vw, 380px);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      #${A} #paw {
        width: 100%;
        height: 100%;
        overflow: visible;
        filter: drop-shadow(0 16px 48px rgba(0, 0, 0, 0.9)) drop-shadow(0 4px 12px rgba(80, 30, 0, 0.6));
      }

      #${A} .f-root {
        transition: transform 0.65s cubic-bezier(0.4, 0, 0.15, 1);
      }

      #${A} .f-tip {
        transition: transform 0.55s 0.12s cubic-bezier(0.4, 0, 0.15, 1);
      }

      @keyframes btfwMonkeyPawShake {
        0%, 100% { transform: rotate(0deg) translateY(0); }
        15% { transform: rotate(-4deg) translateY(-4px); }
        30% { transform: rotate(5deg) translateY(-6px); }
        45% { transform: rotate(-4deg) translateY(-3px); }
        60% { transform: rotate(4deg) translateY(-5px); }
        75% { transform: rotate(-3deg) translateY(-2px); }
        90% { transform: rotate(2deg) translateY(-1px); }
      }

      #${A} #paw.btfw-monkey-paw-shaking {
        animation: btfwMonkeyPawShake 0.7s cubic-bezier(0.36, 0.07, 0.19, 0.97);
      }

      #${A} .btfw-monkey-paw-msg {
        font-size: 0.78rem;
        letter-spacing: 0.15em;
        color: #c0392b;
        opacity: 0;
        transition: opacity 0.8s;
        text-transform: uppercase;
        text-align: center;
        margin: 0;
      }

      #${A} .btfw-monkey-paw-msg.is-visible {
        opacity: 1;
      }

      @media (prefers-reduced-motion: reduce) {
        #${A} .f-root,
        #${A} .f-tip,
        #${A} #paw.btfw-monkey-paw-shaking {
          transition: none;
          animation: none;
        }
      }
    `,document.head.appendChild(q)}async function ue(){if(a)return a;let I=`${p()}${T}`,K=await fetch(I,{credentials:"omit"});if(!K.ok)throw new Error(`Monkey paw SVG failed to load (${K.status})`);return a=await K.text(),a}function Y(q){Object.entries(u).forEach(([I,K])=>{let Q=q.querySelector(`#${I}`),J=q.querySelector(`#${I}-tip`);Q&&(Q.style.transform=K.root),J&&(J.style.transform=K.tip)})}function fe(q){Object.entries(h).forEach(([I,K])=>{window.setTimeout(()=>{let Q=q.querySelector(`#${I}`),J=q.querySelector(`#${I}-tip`);Q&&(Q.style.transform=K.root),J&&window.setTimeout(()=>{J.style.transform=K.tip},120)},j[I])})}function U(q){return`
      <div class="btfw-monkey-paw-scene" role="dialog" aria-modal="true" aria-labelledby="btfw-monkey-paw-title">
        <h2 class="btfw-monkey-paw-title" id="btfw-monkey-paw-title">The Monkey Paw</h2>
        <div class="btfw-monkey-paw-stage">${q}</div>
        <p class="btfw-monkey-paw-msg" id="btfw-monkey-paw-msg">Your wish is granted.</p>
      </div>
    `}async function G(q={}){if(b)return b;if(typeof document!="undefined")return b=(async()=>{var he,te;if(Z(),M()){await k((he=q.reducedMotionMs)!=null?he:450);return}let I=document.getElementById(A);I||(I=document.createElement("div"),I.id=A,document.body.appendChild(I));let K;try{K=await ue()}catch(Ee){console.warn("[monkey-paw] SVG load failed:",Ee),await k(300);return}I.innerHTML=U(K),Y(I);let Q=I.querySelector("#paw"),J=I.querySelector("#btfw-monkey-paw-msg");I.classList.remove("is-cursed"),J==null||J.classList.remove("is-visible"),requestAnimationFrame(()=>I.classList.add("is-active")),fe(I),await k(980),Q==null||Q.classList.add("btfw-monkey-paw-shaking"),await k(720),Q==null||Q.classList.remove("btfw-monkey-paw-shaking"),I.classList.add("is-cursed"),J==null||J.classList.add("is-visible"),await k((te=q.holdMs)!=null?te:1100),I.classList.remove("is-active"),await k(320),I.remove()})().finally(()=>{b=null}),b}return{name:"feature:monkeyPaw",play:G}});BTFW.define("ext:movie-suggestion",["util:tmdb-proxy","feature:monkeyPaw"],async({init:F})=>{let A=await F("util:tmdb-proxy"),T=await F("feature:monkeyPaw"),h=(l,P=document)=>P.querySelector(l),j=(l,P=document)=>Array.from(P.querySelectorAll(l)),u=null,a=null,b=null,k=null,p={query:"",page:1,totalPages:1,sortBy:"popularity.desc",genreId:"",year:"",minRating:"",loading:!1},M=null,Z=null,ue="[movie-suggestion]";function Y(...l){console.log(ue,...l)}function fe(...l){console.error(ue,...l)}function U(l){var P;try{if((P=window.socket)!=null&&P.emit)return window.socket.emit("chatMsg",{msg:l}),!0}catch(N){}return!1}async function G(l,P={}){return A.workerFetch(l,P)}function q(){if(document.getElementById("btfw-movie-suggest-styles"))return;let l=document.createElement("style");l.id="btfw-movie-suggest-styles",l.textContent=`
      #btfw-movie-suggest-modal.is-active,
      #btfw-movie-confirm-modal.is-active {
        display: flex !important;
        align-items: center;
        justify-content: center;
        padding: 12px;
        box-sizing: border-box;
      }

      #btfw-movie-suggest-modal .modal-card,
      #btfw-movie-confirm-modal .modal-card {
        width: min(720px, calc(100vw - 24px));
        max-width: calc(100vw - 24px);
        max-height: calc(100dvh - 24px);
        margin: 0;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      #btfw-movie-suggest-modal .modal-card-head,
      #btfw-movie-suggest-modal .modal-card-foot {
        flex-shrink: 0;
      }

      #btfw-movie-suggest-modal .modal-card-title {
        font-size: clamp(0.95rem, 2.8vw, 1.15rem);
        line-height: 1.25;
      }

      #btfw-movie-confirm-modal.is-active {
        z-index: 6100 !important;
      }

      #btfw-movie-suggest-modal.btfw-movie-suggest-pending .modal-card {
        pointer-events: none;
        opacity: 0.4;
      }

      #btfw-movie-suggest-modal .modal-card-body {
        flex: 1 1 auto;
        min-height: 0;
        max-height: calc(100dvh - 148px);
        overflow-y: auto;
        scrollbar-gutter: stable;
      }

      #btfw-movie-suggest-modal .btfw-movie-filters {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        gap: 10px;
        margin-top: 12px;
      }

      @media (max-width: 768px) {
        #btfw-movie-suggest-modal .btfw-movie-filters {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }
      }

      #btfw-movie-suggest-modal .btfw-movie-filters .label {
        font-size: 0.75rem;
        margin-bottom: 4px;
        opacity: 0.8;
      }

      #btfw-movie-suggest-modal .btfw-movie-results {
        display: flex;
        flex-wrap: nowrap;
        gap: 12px;
        overflow-x: auto;
        overflow-y: hidden;
        scrollbar-gutter: stable;
        margin-top: 16px;
        padding-bottom: 4px;
        min-height: min(230px, 32dvh);
      }

      @media (max-width: 900px) {
        #btfw-movie-suggest-modal .btfw-movie-results {
          min-height: min(200px, 28dvh);
        }

        #btfw-movie-suggest-modal .movie-result {
          flex: 0 0 120px;
          width: 120px;
        }

        #btfw-movie-suggest-modal .btfw-movie-history {
          margin-top: 16px;
        }
      }

      #btfw-movie-suggest-modal .movie-result {
        flex: 0 0 150px;
        width: 150px;
        cursor: pointer;
        border: 1px solid rgba(255,255,255,0.1);
        border-radius: 8px;
        overflow: hidden;
        transition: border-color 0.15s ease, background-color 0.15s ease;
      }

      #btfw-movie-suggest-modal .movie-result:hover {
        border-color: var(--btfw-color-accent, #6d4df6);
      }

      #btfw-movie-suggest-modal .movie-result__poster {
        aspect-ratio: 2 / 3;
        background: rgba(255,255,255,0.06);
        overflow: hidden;
      }

      #btfw-movie-suggest-modal .movie-result img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
      }

      #btfw-movie-suggest-modal .movie-result__info {
        padding: 8px;
      }

      #btfw-movie-suggest-modal .movie-result__title {
        font-weight: 600;
        font-size: 0.85rem;
      }

      #btfw-movie-suggest-modal .btfw-movie-pager {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        margin-top: 12px;
      }

      #btfw-movie-suggest-modal .btfw-movie-history {
        margin-top: 24px;
      }

      #btfw-movie-suggest-modal .btfw-movie-history__title {
        font-weight: 600;
        margin-bottom: 12px;
      }

      #btfw-movie-suggest-modal .history-item {
        display: flex;
        align-items: center;
        gap: 12px;
        margin-bottom: 10px;
        padding: 8px;
        border-radius: 8px;
        background: rgba(255,255,255,0.03);
      }

      #btfw-movie-suggest-modal .history-item img {
        width: 46px;
        height: 69px;
        border-radius: 4px;
        object-fit: cover;
        flex-shrink: 0;
      }

      #btfw-movie-suggest-modal .history-item__title {
        font-weight: 600;
      }

      #btfw-movie-suggest-modal .history-item__meta {
        opacity: 0.7;
        font-size: 0.85rem;
      }

      .button.btfw-nav-pill#btfw-movie-suggest-btn:hover {
        background-color: var(--btfw-color-accent, #6d4df6);
      }

      #btfw-movie-confirm-modal .modal-card {
        display: flex;
        flex-direction: column;
        overflow: visible;
      }

      #btfw-movie-confirm-modal .btfw-movie-confirm-actions {
        display: flex;
        justify-content: flex-end;
        gap: 10px;
        margin-top: 20px;
        padding-top: 16px;
        border-top: 1px solid var(--btfw-surface-divider, rgba(255,255,255,0.12));
      }

      #btfw-movie-confirm-modal .btfw-movie-confirm-actions .button {
        min-width: 4.5rem;
      }
    `,document.head.appendChild(l)}let I=(CLIENT==null?void 0:CLIENT.rank)||0;function K(){let l=h("a[href*='donate'], #donate-btn, .donate-btn");if(l){let N=l.closest("ul");if(N)return{ul:N,insertAfter:l.parentElement}}let P=h("#btfw-theme-btn-nav");if(P){let N=P.closest("ul");if(N)return{ul:N,insertAfter:null}}return{ul:h(".navbar .nav.navbar-nav")||h(".navbar-nav")||h(".btfw-navbar ul")||h(".navbar ul"),insertAfter:null}}function Q(){if(h("#btfw-movie-suggest-btn"))return!0;let l=K();if(!l.ul)return!1;let P=document.createElement("li"),N=document.createElement("a");return N.href="javascript:void(0)",N.className="btfw-nav-pill",N.id="btfw-movie-suggest-btn",N.innerHTML=`
      <span class="btfw-nav-pill__icon" data-btfw-icon-slot="nav-movie-request" aria-hidden="true"><i class="fa fa-film"></i></span>
      <span class="btfw-nav-pill__label">Request</span>
    `,P.appendChild(N),l.insertAfter?l.insertAfter.after(P):l.ul.insertBefore(P,l.ul.firstChild),N.addEventListener("click",z),!0}function J(){var D,f,g,i,m,S;if(h("#btfw-movie-suggest-modal"))return;let l=document.createElement("div");l.id="btfw-movie-suggest-modal",l.className="modal",l.innerHTML=`
      <div class="modal-background"></div>
      <div class="modal-card btfw-modal">
        <header class="modal-card-head">
          <p class="modal-card-title">Suggest a movie for the playlist</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <div class="control">
              <input type="text" id="btfw-movie-search" class="input"
                     placeholder="${I===0?"Please register to search and suggest movies":"Search for a movie..."}"
                     ${I===0?"disabled":""}>
            </div>
          </div>
          <div class="btfw-movie-filters">
            <div class="field">
              <label class="label" for="btfw-movie-sort">Sort</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select id="btfw-movie-sort" class="input"></select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="btfw-movie-genre">Genre</label>
              <div class="control">
                <div class="select is-fullwidth">
                  <select id="btfw-movie-genre" class="input">
                    <option value="">Any genre</option>
                  </select>
                </div>
              </div>
            </div>
            <div class="field">
              <label class="label" for="btfw-movie-year">Year</label>
              <div class="control">
                <input type="number" id="btfw-movie-year" class="input" min="1900" max="2100" placeholder="Any">
              </div>
            </div>
            <div class="field">
              <label class="label" for="btfw-movie-rating">Min rating</label>
              <div class="control">
                <input type="number" id="btfw-movie-rating" class="input" min="0" max="10" step="0.5" placeholder="Any">
              </div>
            </div>
          </div>
          <div class="btfw-movie-results" aria-live="polite"></div>
          <nav class="btfw-movie-pager" aria-label="Search pages">
            <button type="button" class="button is-small" id="btfw-movie-prev" disabled>Prev</button>
            <span id="btfw-movie-page-label">Page 1</span>
            <button type="button" class="button is-small" id="btfw-movie-next" disabled>Next</button>
          </nav>
          <div class="btfw-movie-history">
            <h6 class="btfw-movie-history__title">Recent requests</h6>
            <div id="btfw-movie-history"></div>
          </div>
        </section>
      </div>
    `,document.body.appendChild(l);let P=h(".modal-background",l),N=h(".delete",l);if(P.addEventListener("click",ne),N.addEventListener("click",ne),(D=h("#btfw-movie-prev",l))==null||D.addEventListener("click",()=>{p.page>1&&(p.page-=1,le())}),(f=h("#btfw-movie-next",l))==null||f.addEventListener("click",()=>{p.page<p.totalPages&&(p.page+=1,le())}),I===0){let R=h("#btfw-movie-search",l);R.addEventListener("focus",()=>{alert("You need to be registered to search and suggest movies."),R.blur()})}else{let R,se=h("#btfw-movie-search",l);se.addEventListener("input",()=>{clearTimeout(R),p.query=se.value.trim(),p.page=1,R=setTimeout(()=>le(),400)}),(g=h("#btfw-movie-sort",l))==null||g.addEventListener("change",W=>{p.sortBy=W.target.value,p.page=1,le()}),(i=h("#btfw-movie-genre",l))==null||i.addEventListener("change",W=>{p.genreId=W.target.value,p.page=1,le()}),(m=h("#btfw-movie-year",l))==null||m.addEventListener("change",W=>{p.year=W.target.value.trim(),p.page=1,le()}),(S=h("#btfw-movie-rating",l))==null||S.addEventListener("change",W=>{p.minRating=W.target.value.trim(),p.page=1,le()})}}function he(){if(h("#btfw-movie-confirm-modal"))return;let l=document.createElement("div");l.id="btfw-movie-confirm-modal",l.className="modal",l.innerHTML=`
      <div class="modal-background"></div>
      <div class="modal-card btfw-modal">
        <header class="modal-card-head">
          <p class="modal-card-title">Confirm Suggestion</p>
          <button class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <p>Are you sure you want to suggest <strong id="btfw-confirm-movie-title"></strong>?</p>
          <div class="btfw-movie-confirm-actions">
            <button type="button" class="button" id="btfw-movie-cancel">No</button>
            <button type="button" class="button is-link" id="btfw-movie-confirm">Yes</button>
          </div>
        </section>
      </div>
    `,document.body.appendChild(l);let P=h(".modal-background",l),N=h(".delete",l),D=h("#btfw-movie-cancel",l),f=h("#btfw-movie-confirm",l),g=()=>B();P.addEventListener("click",g),N.addEventListener("click",g),D.addEventListener("click",g),f.addEventListener("click",ae)}async function te(){if(M&&Z)return;let[l,P]=await Promise.all([G("/api/meta"),G("/api/genres")]);M=l,Z=P;let N=h("#btfw-movie-suggest-modal");if(!N)return;let D=h("#btfw-movie-sort",N);if(D&&D.options.length===0){for(let g of l.sortOptions||[]){let i=document.createElement("option");i.value=g.value,i.textContent=g.label,D.appendChild(i)}D.value=p.sortBy}let f=h("#btfw-movie-genre",N);if(f&&f.options.length<=1)for(let g of P.genres||[]){let i=document.createElement("option");i.value=String(g.id),i.textContent=g.name,f.appendChild(i)}}function Ee(){let l={page:p.page,sort_by:p.sortBy};return p.query?(l.query=p.query,p.year&&(l.primary_release_year=p.year,l.year=p.year)):(p.genreId&&(l.with_genres=p.genreId),p.year&&(l.primary_release_year=p.year),p.minRating&&(l["vote_average.gte"]=p.minRating)),l}function pe(l){return!l||l==="null"?"https://via.placeholder.com/154x231?text=No+Image":`https://image.tmdb.org/t/p/w154${l}`}function we(){let l=h("#btfw-movie-suggest-modal");if(!l)return;let P=h("#btfw-movie-prev",l),N=h("#btfw-movie-next",l),D=h("#btfw-movie-page-label",l);D&&(D.textContent=`Page ${p.page} of ${p.totalPages}`),P&&(P.disabled=p.page<=1||p.loading),N&&(N.disabled=p.page>=p.totalPages||p.loading)}function Se(l){let P=h("#btfw-movie-suggest-modal");if(!P)return;let N=h(".btfw-movie-results",P);if(!l.length){N.innerHTML='<p style="opacity:0.75;padding:8px 0;">No movies found. Try another search or filter.</p>';return}N.innerHTML=l.map(D=>`
      <div class="movie-result"
           data-id="${D.id}"
           data-title="${D.title}"
           data-poster="${D.posterPath||""}"
           data-year="${D.releaseYear||""}">
        <div class="movie-result__poster">
          <img src="${pe(D.posterPath)}" alt="${D.title}" loading="lazy"
               onerror="this.src='https://via.placeholder.com/154x231?text=No+Image'">
        </div>
        <div class="movie-result__info">
          <div class="movie-result__title">${D.title}</div>
          <small style="opacity:0.7;">${D.releaseYear||"N/A"}</small>
        </div>
      </div>
    `).join(""),j(".movie-result",N).forEach(D=>{D.addEventListener("click",()=>{u=D.dataset.id,a=D.dataset.title,b=D.dataset.poster,k=D.dataset.year||null;let f=h("#btfw-movie-confirm-modal");if(!f)return;let g=k?` (${k})`:"";h("#btfw-confirm-movie-title",f).textContent=`${a}${g}`,C()})})}async function le(){let l=h("#btfw-movie-suggest-modal");if(!l||p.loading)return;p.loading=!0,we();let P=h(".btfw-movie-results",l);P.innerHTML='<p style="opacity:0.75;padding:8px 0;">Searching\u2026</p>';try{await te();let N=await G("/api/search",{params:Ee()});p.totalPages=Math.max(1,N.totalPages||1),Se(N.results||[]),Y("runSearch",{page:p.page,totalPages:p.totalPages,count:(N.results||[]).length})}catch(N){fe("runSearch failed:",N),P.innerHTML='<p style="opacity:0.75;padding:8px 0;">Search failed. Try again in a moment.</p>'}finally{p.loading=!1,we()}}async function v(){let l=h("#btfw-movie-history");if(l){l.innerHTML='<p style="opacity:0.75;">Loading\u2026</p>';try{let N=(await G("/api/history",{params:{page:1,limit:10}})).results||[];if(!N.length){l.innerHTML='<p style="opacity:0.75;">No requests yet.</p>';return}l.innerHTML=N.map(D=>{let f=D.releaseYear?` (${D.releaseYear})`:"";return`
          <div class="history-item">
            <img src="${pe(D.posterPath).replace("w154","w92")}" alt="${D.movieTitle}" loading="lazy"
                 onerror="this.src='https://via.placeholder.com/92x138?text=No+Image'">
            <div>
              <div class="history-item__title">${D.movieTitle}${f}</div>
              <div class="history-item__meta">Requested by ${D.username}</div>
            </div>
          </div>
        `}).join("")}catch(P){fe("loadHistory failed:",P),l.innerHTML='<p style="opacity:0.75;">Could not load recent requests.</p>'}}}function C(){let l=h("#btfw-movie-suggest-modal"),P=h("#btfw-movie-confirm-modal");P&&(l&&l.classList.add("btfw-movie-suggest-pending"),P.classList.add("is-active"))}function B(){let l=h("#btfw-movie-suggest-modal"),P=h("#btfw-movie-confirm-modal");l&&l.classList.remove("btfw-movie-suggest-pending"),P&&P.classList.remove("is-active")}async function z(){let l=h("#btfw-movie-suggest-modal");if(l){Y("openModal",{userRank:I}),l.classList.remove("btfw-movie-suggest-pending"),l.classList.add("is-active");try{await te(),await Promise.all([le(),v()])}catch(P){fe("openModal bootstrap failed:",P)}}}function ne(){let l=h("#btfw-movie-suggest-modal");l&&(B(),Y("closeModal"),l.classList.remove("is-active"),h("#btfw-movie-search",l).value="",h(".btfw-movie-results",l).innerHTML="",p.query="",p.page=1,p.totalPages=1,u=null,a=null,b=null,k=null)}function re(l,P,N){let D=N?` (${N})`:"";return`\u{1F3AC} Movie request: ${P}${D} \u2014 suggested by ${l}`}async function ae(){if(!u||!a)return;let l=(CLIENT==null?void 0:CLIENT.name)||"Anonymous";Y("confirmSuggestion",{movieId:u,movieTitle:a}),B();try{await T.play(),await G("/api/suggestions",{method:"POST",body:{movieId:Number(u),movieTitle:a,username:l,posterPath:b||null,releaseYear:k||null}}),U(re(l,a,k)),await v(),ne()}catch(P){fe("confirmSuggestion failed:",P),alert("Could not save your movie request. Please try again.")}}function ce(){Y("boot: start",{workerBase:A.getWorkerBase()}),q(),J(),he();let l=0,P=50,N=()=>{if(Q()){Y("Button added successfully");return}l+=1,l<P?setTimeout(N,100):console.warn(ue,"Failed to add button after retries",{retryCount:l})};N()}return document.addEventListener("btfw:layoutReady",()=>{setTimeout(ce,100)}),document.readyState==="loading"?document.addEventListener("DOMContentLoaded",()=>{setTimeout(ce,200)}):setTimeout(ce,200),{name:"ext:movie-suggestion",open:z,close:ne,getWorkerBase:A.getWorkerBase}});BTFW.define("feature:movie-suggestions",["ext:movie-suggestion"],async F=>F.init("ext:movie-suggestion"));})();
