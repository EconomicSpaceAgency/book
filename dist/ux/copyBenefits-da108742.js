function r(){let e=document.getElementById("asciProtocols").textContent,n=document.getElementById("discourse-unit-on-open-sea-text").textContent;var o=document.getElementById("openSeaLink").textContent;let i=document.getElementById("discourse-node").textContent,l=document.getElementById("discourse-node-link").textContent,d=document.getElementById("invitation-link-text").textContent;var c=document.getElementById("invitation-link1").textContent;let m=document.getElementById("unique-pdf-link-text").textContent;var u=document.getElementById("ipfsBookDownloadLink").textContent,x=e+`
`+n+`
`+o+`
`+i+`
`+l+`
`+d+`
`+c+`
`+m+`
`+u;navigator.clipboard.writeText(x);let t=document.getElementById("copyButton"),a=t.innerHTML;t.innerHTML="Coppied",setTimeout(()=>{t.innerHTML=a},5e3)}export{r as c};
