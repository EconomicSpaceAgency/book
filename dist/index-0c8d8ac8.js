import{r as i}from"./ux/revertTransactionInitiatedAnimation-630d6393.js";const l=()=>{const t=document.getElementById("tiersErrorMessage");t?t.innerHTML="":console.warn("Could not find element with id 'tiersErrorMessage'")},c=()=>{document.getElementById("priceTierOverlayClose").click()},a=t=>{document.querySelectorAll(`#publishUnit${t}`).forEach(function(n){n?n.remove():console.warn(`Button with ID ${n} not found.`)})},u=t=>{const e=document.getElementById(`u${t}`);if(e){const n=e.querySelectorAll("p"),r=e.querySelectorAll("h5");n&&n.forEach(o=>{o.style.filter="none"}),r&&r.forEach(o=>{o.style.filter="none"})}},m=t=>{const e=document.getElementById(`orb_${t}`);e&&(e.style.filter="blur(4px)",e.style.opacity="0.75")},d=t=>{i(t),document.getElementById("priceTierOverlay").style.display="block",document.getElementById("priceTierOverlayClose").style.display="block",document.getElementById("priceTierContent").style.display="block";const e=document.getElementById("tiersErrorMessage"),n=document.getElementById("tiersSubmitButton");if(e&&(e.innerHTML="It happens that transactions fail sometimes. Would you retry?",e.style.display="block"),n){const o=document.getElementById("tiersSubmitButton");o.innerHTML="Retry"}const r=document.querySelector('#priceTiers input[type="radio"]:checked');r&&(console.log("selectedTier, minting again: ",r.value),localStorage.setItem("chosenPrice",r.value))};export{c as a,a as b,l as c,d as h,u as r,m as s};
