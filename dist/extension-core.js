!function(e,r){"object"==typeof exports&&"undefined"!=typeof module?r(exports):"function"==typeof define&&define.amd?define(["exports"],r):r((e="undefined"!=typeof globalThis?globalThis:e||self).extension={})}(this,(function(e){"use strict";const r="single-file-response-fetch",t=(e,r)=>window.fetch(e,r);async function a(e,r={}){try{let a=await t(e,{cache:"force-cache",headers:r.headers});return 401!=a.status&&403!=a.status&&404!=a.status||(a=await i(e)),a}catch(t){const a=await n({method:"singlefile.fetch",url:e,headers:r.headers});return{status:a.status,headers:{get:e=>a.headers&&a.headers[e]},arrayBuffer:async()=>new Uint8Array(a.array).buffer}}}async function s(e,r){const t=await n({method:"singlefile.fetchFrame",url:e,frameId:r.frameId,headers:r.headers});return{status:t.status,headers:new Map(t.headers),arrayBuffer:async()=>new Uint8Array(t.array).buffer}}async function n(e){const r=await browser.runtime.sendMessage(e);if(!r||r.error)throw new Error(r&&r.error&&r.error.toString());return r}function i(e){return new Promise(((t,a)=>{var s,n,i,o;s=new CustomEvent("single-file-request-fetch",{detail:e}),window.dispatchEvent(s),n=r,i=function s(n){var i,o,f;n.detail?n.detail.url==e&&(i=r,o=s,f=!1,window.removeEventListener(i,o,f),n.detail.response?t({status:n.detail.status,headers:new Map(n.detail.headers),arrayBuffer:async()=>n.detail.response}):a(n.detail.error)):a()},o=!1,window.addEventListener(n,i,o)}))}browser.runtime.onMessage.addListener((e=>{if("singlefile.fetchFrame"==e.method&&window.frameId&&window.frameId==e.frameId)return async function(e){try{let r=await t(e.url,{cache:"force-cache",headers:e.headers});return 401!=r.status&&403!=r.status&&404!=r.status||(r=await Promise.race([i(e.url),new Promise(((e,r)=>setTimeout((()=>r()),5e3)))])),{status:r.status,headers:[...r.headers],array:Array.from(new Uint8Array(await r.arrayBuffer()))}}catch(e){return{error:e&&e.toString()}}}(e)})),e.getPageData=function(e,r,t,n={fetch:a,frameFetch:s}){return globalThis.singlefile.getPageData(e,n,r,t)},Object.defineProperty(e,"__esModule",{value:!0})}));