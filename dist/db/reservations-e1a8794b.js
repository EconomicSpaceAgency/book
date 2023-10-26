import{i}from"./supabase-bcc39e3c.js";const a=i();async function s(t){try{const{data:r,error:e}=await a.from("reservations").select("*").eq("value",t).eq("used_by_wallet","0x").limit(1);if(e)throw e;return r&&r.length>0}catch(r){return console.error("Error checking invitation validity:",r),!1}}async function l(t,r){try{const{data:e,error:o}=await a.from("reservations").select("*").eq("value",t).eq("token_id",r).eq("used_by_wallet","0x").limit(1);if(o)throw o;return e&&e.length>0}catch(e){return console.error("Error checking invitation validity:",e),!1}}async function c(t,r){try{const{error:e}=await a.from("reservations").update({used_by_wallet:r}).eq("value",t);if(e)throw e;console.log("reservation marked as used.")}catch(e){console.error("Error marking invitation as used:",e)}}async function u(t){try{const{data:r,error:e}=await a.from("reservations").select("*").eq("value",t).limit(1);if(e)throw e;return console.log("getReservationByReservationValue data response: ",r),r}catch(r){return console.error("Error checking invitation validity:",r),null}}export{l as a,u as g,s as i,c as s};
