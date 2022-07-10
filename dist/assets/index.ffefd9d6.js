const P=function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))t(o);new MutationObserver(o=>{for(const n of o)if(n.type==="childList")for(const s of n.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&t(s)}).observe(document,{childList:!0,subtree:!0});function a(o){const n={};return o.integrity&&(n.integrity=o.integrity),o.referrerpolicy&&(n.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?n.credentials="include":o.crossorigin==="anonymous"?n.credentials="omit":n.credentials="same-origin",n}function t(o){if(o.ep)return;o.ep=!0;const n=a(o);fetch(o.href,n)}};P();const p=Object.freeze({marker:"o",struct:'<div class="marker o-marker"></div>',name:"Pink"}),m=Object.freeze({marker:"x",struct:'<div class="marker x-marker"></div>',name:"Blue"}),L=Object.freeze({ONLINE_PLAYER:"online_player",OFFLINE_COMPUTER:"offline_computer",OFFLINE_PLAYERS:"offline_players"}),O=Object.freeze({EASY:"easy",HARD:"hard"}),N="It's a tie! Play again!!",S=`<h1 class="game-status-text">${N}</h1>`,b=e=>new DOMParser().parseFromString(e,"text/html").body.firstElementChild,h=()=>window.location.reload(),C=e=>{setTimeout(()=>{h()},e)},I=(e,r)=>{const a=[];for(let t=0;t<e.length;t+=1)e[t]===r&&a.push(t);return a},F=(e,r)=>{const a=Math.ceil(e),t=Math.floor(r);return Math.floor(Math.random()*(t-a+1))+a},M=e=>{switch(e){case 1:return"won-horizontal";case 2:return"won-clock-diagonal";case 3:return"won-vertical";case 4:return"won-anticlock-diagonal";default:return""}},A=e=>{const r=document.getElementsByClassName("cell"),a=e[1]-e[0],t=M(a);e.forEach(o=>{r[o].classList.add(t)})},k=e=>e.classList.contains("filled-in")||!e.classList.contains("cell"),v=()=>{const e=document.getElementById("success-pop");e.classList.add("game-tied"),e.appendChild(b(S)),C(2e3)},u=(e,{struct:r})=>{e.appendChild(b(r)),e.classList.add("filled-in")},B=(e,{name:r})=>{const a=document.getElementById("success-pop");A(e),a.style.display="flex",a.appendChild(b(`<h1 class="game-status-text">${r} has Won the Game!</h1>`)),C(5e3)},w=e=>Array.prototype.indexOf.call(e.parentNode.children,e),R=()=>Object.freeze([[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]),W=(e,{marker:r})=>{const a=R();let t={hasWon:!1,winCombo:null};for(let o=0;o<a.length;o+=1){const n=a[o];if(n.every(s=>e[s]===r)){t={hasWon:!0,winCombo:n};break}}return t},y=()=>{const a=Array(9).fill(null);let t=0;return Object.freeze({getCells:()=>a,setCell:(o,n)=>{a[o]=n,t+=1},shouldComputeWinner:()=>t>=3*2-1,isBoardFilled:()=>t===9})},f=(e,r)=>{if(e.shouldComputeWinner()){const{hasWon:a,winCombo:t}=W(e.getCells(),r);if(a)return B(t,r),!0}return!1},D=()=>{const e=y(),r=document.getElementById("game-board"),a=document.getElementById("success-pop"),t=m,o=p;a.addEventListener("click",()=>{h()}),r.addEventListener("click",n=>{const s=n.target,{marker:c}=t,{marker:l}=o;if(k(s)||(e.setCell(w(s),c),u(s,t),f(e,t)))return;if(e.isBoardFilled()){v();return}const g=I(e.getCells(),null),i=g[F(0,g.length-1)];e.setCell(i,l),u(s.parentNode.children[i],o),f(e,o)})},T=()=>{const e=y(),r=document.getElementById("game-board"),a=document.getElementById("success-pop"),t=m,o=p,n=s=>{console.log(s);for(let c=0;c<s.length;c+=1){const l=s[c];console.log(l)}return s[0]};a.addEventListener("click",()=>{h()}),r.addEventListener("click",s=>{const c=s.target,{marker:l}=t,{marker:g}=o;if(k(c)||(e.setCell(w(c),l),u(c,t),f(e,t)))return;if(e.isBoardFilled()){v();return}const i=I(e.getCells(),null),E=i[n(i)];e.setCell(E,g),u(c.parentNode.children[E],o),f(e,o)})},_=()=>{const e=y(),r=document.getElementById("game-board"),a=document.getElementById("success-pop");let t=m;a.addEventListener("click",()=>{h()}),r.addEventListener("click",o=>{const n=o.target,{marker:s}=t;k(n)||(e.setCell(w(n),s),u(n,t),!f(e,t)&&(t=t===m?p:m,e.isBoardFilled()&&v()))})},{ONLINE_PLAYER:Y,OFFLINE_COMPUTER:j,OFFLINE_PLAYERS:z}=L,{EASY:x,HARD:$}=O,d=({mode:e=z,level:r=x})=>{switch(e){case Y:break;case j:r===x?D():r===$&&T();break;case z:_();break;default:console.info("NEED A MODE TO PLAY.");break}};document.addEventListener("DOMContentLoaded",()=>{const{ONLINE_PLAYER:e,OFFLINE_COMPUTER:r,OFFLINE_PLAYERS:a}=L,{EASY:t,HARD:o}=O;switch(window.location.search){case`${e}=true`:d({mode:e});break;case`${r}=true`:d({mode:r,level:t});break;case`${r}=true&level=${o}`:d({mode:r,level:o});break;case`${a}=true`:d({mode:a});break;default:d({mode:r,level:t});break}});
