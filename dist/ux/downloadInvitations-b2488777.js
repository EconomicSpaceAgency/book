function i(){var e=document.getElementById("invitation-link1").textContent,n=e+`
`,o=new Blob([n],{type:"text/plain;charset=utf-8"}),t=document.createElement("a");t.href=URL.createObjectURL(o),t.download="invitation.txt",document.body.appendChild(t),t.click(),document.body.removeChild(t)}export{i as d};
