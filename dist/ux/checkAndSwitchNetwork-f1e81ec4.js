const w=async t=>{const r="0xaa36a7",c="11155111n",o=r,a=c;if(await t.getNetwork().then(e=>e.chainId)!==a)try{await window.ethereum.request({method:"wallet_switchEthereumChain",params:[{chainId:o}]})}catch{throw new Error("Please change your network to sepolia")}};export{w as c};
