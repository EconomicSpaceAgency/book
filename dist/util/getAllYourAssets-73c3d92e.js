import{c as b}from"../ux/copyBenefits-da108742.js";import{d as E}from"../ux/downloadBenefits-25b06183.js";import{c as m}from"../ux/closeOpenBenefitAndOpenCongratz-0d87c353.js";import"../ux/openCongratzOverlay-6dc84a1c.js";import"../ux/modifyBenefits-6de5ee72.js";import"../ux/blurAndPreventScrolling-0822e332.js";function C(){let a=document.getElementById("congratzOverlay");a&&(a.style.display="none");let y=`
    <div class="invitation-container">
    <pre class="asci" id="asciProtocols">
░█▀█░█▀▄░█▀█░▀█▀░█▀█░█▀▀░█▀█░█░░░█▀▀░░                    
░█▀▀░█▀▄░█░█░░█░░█░█░█░░░█░█░█░░░▀▀█░░                    
░▀░░░▀░▀░▀▀▀░░▀░░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░░                    
░█▀▀░█▀█░█▀▄░░                                            
░█▀▀░█░█░█▀▄░░                                            
░▀░░░▀▀▀░▀░▀░░                                            
░█▀█░█▀█░█▀▀░▀█▀░█▀▀░█▀█░█▀█░▀█▀░▀█▀░█▀█░█░░░▀█▀░█▀▀░▀█▀░░
░█▀▀░█░█░▀▀█░░█░░█░░░█▀█░█▀▀░░█░░░█░░█▀█░█░░░░█░░▀▀█░░█░░░
░▀░░░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░░▀░░░
░█▀▀░█░█░█▀█░█▀▄░█▀▀░█▀▀░█▀▀░▀█▀░█▀█░█▀█                  
░█▀▀░▄▀▄░█▀▀░█▀▄░█▀▀░▀▀█░▀▀█░░█░░█░█░█░█                  
░▀▀▀░▀░▀░▀░░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀░▀                     
    </pre>
    <p class="discourse-unit-on-open-sea-text" id="discourse-unit-on-open-sea-text"> Your discourse unit on OpenSea: </p>
    <p class="discourse-unit-on-open-sea-link" id="openSeaLink"> ipfs://QmcHt8YqmA8Vhnfg946kDPRVUfRFo5y7T75nuJPBbXCAMV/token.id </p>
    <p class="discourse-node" id="discourse-node"> Your discourse node invitation link: </p>
    <p class="discourse-node-link" id="discourse-node-link"> https://discord.gg/DpSb58ZqeS </p>
    <p class="invitation-link-text" id="invitation-link-text"> Your invitation link: </p>
    <p class="invitation-link" id="invitation-link1">
    https://ecsa-book.vercel.app/?invitationId=HWjaYEr24AcMLzdhN4ycnKnhPvtRn4QNJKMuzu4BXexBHm6tsKmCQCUxqBudsxmK
    </p>
    <p class="unique-pdf-link-text" id="unique-pdf-link-text"> Your unique pdf: </p>
    <p class="unique-pdf-link" id="ipfsBookDownloadLink"> ipfs://QmcHt8YqmA8Vhnfg946kDPRVUfRFo5y7T75nuJPBbXCAMV/token.id </p>
    <br>
    </div>
    <div class="copyAndInvitationButtons">
    <button class="copy-button" id="copyButton">Copy ❑</button>
    <button class="download-button" id="downloadButton">Download ↓</button>
    </div>
    <br>
    <br>`;const d=document.getElementById("benefit1Overlay");d&&(d.style.display="flex");const o=document.getElementById("benefit1OverlayClose");o&&(o.addEventListener("click",function(){m()}),o.style.display="block");const t=document.getElementById("benefit1OverlayContent");if(t){t.innerHTML=y,t.innerHTML+='<button class="aboutOverlayBack" id="benefitOverlayClose">← back</button>';let s=document.getElementById("benefitOverlayClose");s&&s.addEventListener("click",function(){m()});let n=document.getElementById("copyButton"),f=document.getElementById("downloadButton");n&&n.addEventListener("click",function(B){b()}),f&&f.addEventListener("click",function(B){E()})}let c=document.getElementById("invitation-link1"),i=localStorage.getItem("invitation");console.log("invitation: ",i),i&&c&&(c.innerHTML=i);let e=localStorage.getItem("tokenId"),p=document.getElementById("openSeaLink");if(p&&e){const n=`https://testnets.opensea.io/assets/sepolia/0x3aEa64fD94D8185dF5B0f8da8E313F12951dA848/${e}`;p.innerHTML=n}let u=document.getElementById("ipfsBookDownloadLink"),k="https://ecsa.mypinata.cloud/ipfs/QmZVmHu1gU3nLnoDLLpVPJrXTDBPjeX6opAuTiEZRqrzKz/",v=`book_with_cover_${e}.pdf/`,g="?pinataGatewayToken=P2-9GKFuzl7qRF-jnihYUrTyIgIl5NljE2wygdGPqXEQjupoyLqGiusdhZhfxey2",r=k+v+g;e&&u&&(u.innerHTML=r);let l=document.getElementById("dl");console.log("This happened: ",l),e&&l&&(l.href=r),localStorage.getItem("pbi")==!1&&(console.log("pbi: ",localStorage.getItem("pbi")),modifyBenefits()),t.style.display="flex"}export{C as g};
