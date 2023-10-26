import{i as s}from"./supabase-bcc39e3c.js";const l=s();async function u(o,r,e,n,a){console.log("wallet:",a);try{if(!o||typeof o!="string")throw new Error("Invalid name value");if(!r||typeof r!="string")throw new Error("Invalid mailing address value");if(!e||typeof e!="string")throw new Error("Invalid phone number value");if(!n||typeof n!="string")throw new Error("Invalid contact value");if(!a||typeof a!="string")throw new Error("Invalid wallet value");const{data:t,error:i}=await l.from("orders").insert([{name:o,mailing_address:r,phone_number:e,contact:n,wallet:a}]);if(i)throw i;return t}catch(t){return console.error("Error inserting order:",t),!1}}async function c(o){try{const{data:r,error:e}=await l.from("orders").select("*").eq("wallet",o).single();if(e)throw e;return r}catch(r){return console.error("Error getting order by wallet:",r),null}}async function f(o,r,e,n,a){try{const{data:t,error:i}=await l.from("orders").update([{name:o,mailing_address:r,phone_number:e,contact:n,wallet:a}]).eq("wallet",a);if(i)throw i;return console.log("updateOrderByWallet: ",t),t}catch(t){return console.error("Error updating order by wallet:",t),!1}}export{c as g,u as i,f as u};
