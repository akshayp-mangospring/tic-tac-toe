const P=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const r of document.querySelectorAll('link[rel="modulepreload"]'))o(r);new MutationObserver(r=>{for(const n of r)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function a(r){const n={};return r.integrity&&(n.integrity=r.integrity),r.referrerpolicy&&(n.referrerPolicy=r.referrerpolicy),r.crossorigin==="use-credentials"?n.credentials="include":r.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function o(r){if(r.ep)return;r.ep=!0;const n=a(r);fetch(r.href,n)}};P();const b=Object.freeze({marker:"o",struct:'<div class="marker o-marker"></div>',name:"Pink"}),d=Object.freeze({marker:"x",struct:'<div class="marker x-marker"></div>',name:"Blue"}),x=Object.freeze({ONLINE_PLAYER:"online_player",OFFLINE_COMPUTER:"offline_computer",OFFLINE_PLAYERS:"offline_players"}),L=Object.freeze({EASY:"easy",HARD:"hard"}),M="It's a tie! Play again!!",N=`<h1 class="game-status-text">${M}</h1>`,k=e=>new DOMParser().parseFromString(e,"text/html").body.firstElementChild,h=()=>window.location.reload(),O=e=>{setTimeout(()=>{h()},e)},I=(e,t)=>{const a=[];for(let o=0;o<e.length;o+=1)e[o]===t&&a.push(o);return a},S=(e,t)=>{const a=Math.ceil(e),o=Math.floor(t);return Math.floor(Math.random()*(o-a+1))+a},F=e=>{switch(e){case 1:return"won-horizontal";case 2:return"won-clock-diagonal";case 3:return"won-vertical";case 4:return"won-anticlock-diagonal";default:return""}},A=e=>{const t=document.getElementsByClassName("cell"),a=e[1]-e[0],o=F(a);e.forEach(r=>{t[r].classList.add(o)})},v=e=>e.classList.contains("filled-in")||!e.classList.contains("cell"),w=()=>{const e=document.getElementById("success-pop");e.classList.add("game-tied"),e.appendChild(k(N)),O(2e3)},m=(e,{struct:t})=>{e.appendChild(k(t)),e.classList.add("filled-in")},B=(e,{name:t})=>{const a=document.getElementById("success-pop");A(e),a.style.display="flex",a.appendChild(k(`<h1 class="game-status-text">${t} has Won the Game!</h1>`)),O(5e3)},R=()=>Object.freeze([[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]),W=(e,{marker:t})=>{const a=R();let o={hasWon:!1,winCombo:null};for(let r=0;r<a.length;r+=1){const n=a[r];if(n.every(s=>e[s]===t)){o={hasWon:!0,winCombo:n};break}}return o},y=()=>{const a=Array(9).fill(null);let o=0;return Object.freeze({getCells:()=>a,setCell:(r,n)=>{a[r]=n,o+=1},shouldComputeWinner:()=>o>=3*2-1,isBoardFilled:()=>o===9})},u=(e,t)=>{if(e.shouldComputeWinner()){const{hasWon:a,winCombo:o}=W(e.getCells(),t);if(a)return B(o,t),!0}return!1},f=(e,t,a)=>{e.setCell(Array.prototype.indexOf.call(t.parentNode.children,t),a)},D=()=>{const e=y(),t=document.getElementById("game-board"),a=document.getElementById("success-pop"),o=d,r=b;a.addEventListener("click",()=>{h()}),t.addEventListener("click",n=>{const s=n.target,{marker:c}=o,{marker:i}=r;if(v(s)||(f(e,s,c),m(s,o),u(e,o)))return;if(e.isBoardFilled()){w();return}const g=I(e.getCells(),null),p=g[S(0,g.length-1)];f(e,s,i),m(s.parentNode.children[p],r),u(e,r)})},T=()=>{const e=y(),t=document.getElementById("game-board"),a=document.getElementById("success-pop"),o=d,r=b,n=s=>{console.log(s);for(let c=0;c<s.length;c+=1){const i=s[c];console.log(i)}return s[0]};a.addEventListener("click",()=>{h()}),t.addEventListener("click",s=>{const c=s.target,{marker:i}=o,{marker:g}=r;if(v(c)||(f(e,c,i),m(c,o),u(e,o)))return;if(e.isBoardFilled()){w();return}const p=I(e.getCells(),null),C=p[n(p)];f(e,c,g),m(c.parentNode.children[C],r),u(e,r)})},_=()=>{const e=y(),t=document.getElementById("game-board"),a=document.getElementById("success-pop");let o=d;a.addEventListener("click",()=>{h()}),t.addEventListener("click",r=>{const n=r.target,{marker:s}=o;v(n)||(f(e,n,s),m(n,o),!u(e,o)&&(o=o===d?b:d,e.isBoardFilled()&&w()))})},{ONLINE_PLAYER:Y,OFFLINE_COMPUTER:j,OFFLINE_PLAYERS:E}=x,{EASY:z,HARD:$}=L,l=({mode:e=E,level:t=z})=>{switch(e){case Y:break;case j:t===z?D():t===$&&T();break;case E:_();break;default:console.info("NEED A MODE TO PLAY.");break}};document.addEventListener("DOMContentLoaded",()=>{const{ONLINE_PLAYER:e,OFFLINE_COMPUTER:t,OFFLINE_PLAYERS:a}=x,{EASY:o,HARD:r}=L;switch(window.location.search){case`${e}=true`:l({mode:e});break;case`${t}=true`:l({mode:t,level:o});break;case`${t}=true&level=${r}`:l({mode:t,level:r});break;case`${a}=true`:l({mode:a});break;default:l({mode:t,level:o});break}});
