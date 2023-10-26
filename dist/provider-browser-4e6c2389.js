var h=(r,s,e)=>{if(!s.has(r))throw TypeError("Cannot "+e)};var u=(r,s,e)=>(h(r,s,"read from private field"),e?e.call(r):s.get(r)),g=(r,s,e)=>{if(s.has(r))throw TypeError("Cannot add the same private member more than once");s instanceof WeakSet?s.add(r):s.set(r,e)},p=(r,s,e,t)=>(h(r,s,"write to private field"),t?t.call(r,e):s.set(r,e),e);import{J as w}from"./provider-jsonrpc-62e4dd44.js";import{a as d}from"./contract-1c37cfa4.js";var n;class E extends w{constructor(e,t){super(t,{batchMaxCount:1});g(this,n,void 0);p(this,n,async(a,m)=>{const c={method:a,params:m};this.emit("debug",{action:"sendEip1193Request",payload:c});try{const i=await e.request(c);return this.emit("debug",{action:"receiveEip1193Result",result:i}),i}catch(i){const o=new Error(i.message);throw o.code=i.code,o.data=i.data,o.payload=c,this.emit("debug",{action:"receiveEip1193Error",error:o}),o}})}async send(e,t){return await this._start(),await super.send(e,t)}async _send(e){d(!Array.isArray(e),"EIP-1193 does not support batch request","payload",e);try{const t=await u(this,n).call(this,e.method,e.params||[]);return[{id:e.id,result:t}]}catch(t){return[{id:e.id,error:{code:t.code,data:t.data,message:t.message}}]}}getRpcError(e,t){switch(t=JSON.parse(JSON.stringify(t)),t.error.code||-1){case 4001:t.error.message=`ethers-user-denied: ${t.error.message}`;break;case 4200:t.error.message=`ethers-unsupported: ${t.error.message}`;break}return super.getRpcError(e,t)}async hasSigner(e){e==null&&(e=0);const t=await this.send("eth_accounts",[]);return typeof e=="number"?t.length>e:(e=e.toLowerCase(),t.filter(a=>a.toLowerCase()===e).length!==0)}async getSigner(e){if(e==null&&(e=0),!await this.hasSigner(e))try{await u(this,n).call(this,"eth_requestAccounts",[])}catch(t){const a=t.payload;throw this.getRpcError(a,{id:a.id,error:t})}return await super.getSigner(e)}}n=new WeakMap;export{E as B};
