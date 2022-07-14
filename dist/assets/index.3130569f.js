const P=function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))r(t);new MutationObserver(t=>{for(const n of t)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&r(s)}).observe(document,{childList:!0,subtree:!0});function a(t){const n={};return t.integrity&&(n.integrity=t.integrity),t.referrerpolicy&&(n.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?n.credentials="include":t.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function r(t){if(t.ep)return;t.ep=!0;const n=a(t);fetch(t.href,n)}};P();const b=Object.freeze({marker:"o",struct:'<div class="marker o-marker"></div>',name:"Pink"}),m=Object.freeze({marker:"x",struct:'<div class="marker x-marker"></div>',name:"Blue"}),L=Object.freeze({ONLINE_PLAYER:"online_player",OFFLINE_COMPUTER:"offline_computer",OFFLINE_PLAYERS:"offline_players"}),C=Object.freeze({EASY:"easy",HARD:"hard"}),S="It's a tie! Play again!!",F=`<h1 class="game-status-text">${S}</h1>`,k=e=>new DOMParser().parseFromString(e,"text/html").body.firstElementChild,p=()=>window.location.reload(),O=e=>{setTimeout(()=>{p()},e)},I=(e,o)=>{const a=[];for(let r=0;r<e.length;r+=1)e[r]===o&&a.push(r);return a},M=(e,o)=>Math.floor(Math.random()*(Math.floor(o)-Math.ceil(e)+1))+Math.ceil(e),N=e=>e.parentNode.children,A=e=>e.classList.contains("filled-in"),B=e=>e.classList.contains("cell"),R=e=>{switch(e){case 1:return"won-horizontal";case 2:return"won-clock-diagonal";case 3:return"won-vertical";case 4:return"won-anticlock-diagonal";default:return""}},W=e=>{const o=document.getElementsByClassName("cell"),a=e[1]-e[0],r=R(a);e.forEach(t=>{o[t].classList.add(r)})},v=e=>A(e)||!B(e),w=()=>{const e=document.getElementById("success-pop");e.classList.add("game-tied"),e.appendChild(k(F)),O(2e3)},u=(e,{struct:o})=>{e.appendChild(k(o)),e.classList.add("filled-in")},D=(e,{name:o})=>{const a=document.getElementById("success-pop");W(e),a.style.display="flex",a.appendChild(k(`<h1 class="game-status-text">${o} has Won the Game!</h1>`)),O(5e3)},y=e=>Array.prototype.indexOf.call(N(e),e),T=()=>Object.freeze([[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]),_=(e,{marker:o})=>{const a=T();let r={hasWon:!1,winCombo:null};for(let t=0;t<a.length;t+=1){const n=a[t];if(n.every(s=>e[s]===o)){r={hasWon:!0,winCombo:n};break}}return r},E=()=>{const a=Array(9).fill(null);let r=0;return Object.freeze({getCells:()=>a,setCell:(t,n)=>{a[t]=n,r+=1},shouldComputeWinner:()=>r>=3*2-1,isBoardFilled:()=>r===9})},g=(e,o)=>{if(e.shouldComputeWinner()){const{hasWon:a,winCombo:r}=_(e.getCells(),o);if(a)return D(r,o),!0}return!1},Y=()=>{const e=E(),o=document.getElementById("game-board"),a=document.getElementById("success-pop"),r=m,t=b;a.addEventListener("click",()=>{p()}),o.addEventListener("click",n=>{const s=n.target,{marker:c}=r,{marker:l}=t;if(v(s)||(e.setCell(y(s),c),u(s,r),g(e,r)))return;if(e.isBoardFilled()){w();return}const f=I(e.getCells(),null),h=M(0,f.length-1),i=f[h];e.setCell(i,l),u(s.parentNode.children[i],t),g(e,t)})},j=()=>{const e=E(),o=document.getElementById("game-board"),a=document.getElementById("success-pop"),r=m,t=b,n=s=>{console.log(s);for(let c=0;c<s.length;c+=1){const l=s[c];console.log(l)}return s[0]};a.addEventListener("click",()=>{p()}),o.addEventListener("click",s=>{const c=s.target,{marker:l}=r,{marker:f}=t;if(v(c)||(e.setCell(y(c),l),u(c,r),g(e,r)))return;if(e.isBoardFilled()){w();return}const h=I(e.getCells(),null),i=h[n(h)];e.setCell(i,f),u(c.parentNode.children[i],t),g(e,t)})},$=()=>{const e=E(),o=document.getElementById("game-board"),a=document.getElementById("success-pop");let r=m;a.addEventListener("click",()=>{p()}),o.addEventListener("click",t=>{const n=t.target,{marker:s}=r;v(n)||(e.setCell(y(n),s),u(n,r),!g(e,r)&&(r=r===m?b:m,e.isBoardFilled()&&w()))})},{ONLINE_PLAYER:H,OFFLINE_COMPUTER:G,OFFLINE_PLAYERS:z}=L,{EASY:x,HARD:U}=C,d=({mode:e=z,level:o=x})=>{switch(e){case H:break;case G:o===x?Y():o===U&&j();break;case z:$();break;default:console.info("NEED A MODE TO PLAY.");break}};document.addEventListener("DOMContentLoaded",()=>{const{ONLINE_PLAYER:e,OFFLINE_COMPUTER:o,OFFLINE_PLAYERS:a}=L,{EASY:r,HARD:t}=C;switch(window.location.search){case`${e}=true`:d({mode:e});break;case`${o}=true`:d({mode:o,level:r});break;case`${o}=true&level=${t}`:d({mode:o,level:t});break;case`${a}=true`:d({mode:a});break;default:d({mode:o,level:r});break}});