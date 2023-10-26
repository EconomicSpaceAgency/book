function r(){let e=document.getElementById("asciProtocols").textContent,n=document.getElementById("discourse-unit-on-open-sea-text").textContent;var o=document.getElementById("openSeaLink").textContent;let d=document.getElementById("discourse-node").textContent,i=document.getElementById("discourse-node-link").textContent,l=document.getElementById("invitation-link-text").textContent;var c=document.getElementById("invitation-link1").textContent;let m=document.getElementById("unique-pdf-link-text").textContent;var a=document.getElementById("ipfsBookDownloadLink").textContent,u=e+`
`+n+`
`+o+`
`+d+`
`+i+`
`+l+`
`+c+`
`+m+`
`+a,x=new Blob([u],{type:"text/plain;charset=utf-8"}),t=document.createElement("a");t.href=URL.createObjectURL(x),t.download="benefits.txt",document.body.appendChild(t),t.click(),document.body.removeChild(t)}export{r as d};
