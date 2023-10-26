
import { getAllCopublishers, getCopublisherByWalletAndName } from "../db/copublishers.js";
async function displayCopublishers(){
    // get all copublishers
    let copublishers = await getAllCopublishers();
    const coPublishersList = document.getElementById("coPublishersList");
    if(coPublishersList){
        copublishers.forEach(copublisher => {
            const coPublisherDiv = document.createElement("div");
            coPublisherDiv.classList.add("coPublisher");
    
            const coPublisherName = document.createElement("b");
            coPublisherName.classList.add("coPublisherName");
            coPublisherName.textContent = copublisher.name ? copublisher.name : "Anonymous"; // Replace "name" with the actual property from your data
    
            const coPublisherAddress = document.createElement("span");
            coPublisherAddress.classList.add("coPublisherAddress");
            coPublisherAddress.textContent = copublisher.wallet; // Replace "wallet" with the actual property from your data
    
            const coPublisherUnit = document.createElement("a");
            coPublisherUnit.classList.add("coPublisherUnit");
            coPublisherUnit.textContent = "Unit " + copublisher.token_id; // Replace "token_id" with the actual property from your data
            coPublisherUnit.href = "#u" + copublisher.token_id;
    
            coPublisherDiv.appendChild(coPublisherName);
            coPublisherDiv.appendChild(document.createElement("br"));
            coPublisherDiv.appendChild(coPublisherAddress);
            coPublisherDiv.appendChild(document.createElement("br"));
            coPublisherDiv.appendChild(coPublisherUnit);
    
            coPublishersList.appendChild(coPublisherDiv);
        });
    }
}
async function updateCopublishers(wallet, name){

    let latest = await getCopublisherByWalletAndName(wallet, name);
    const coPublishersList = document.getElementById("coPublishersList");
    if(coPublishersList){
            const coPublisherDiv = document.createElement("div");
            coPublisherDiv.classList.add("coPublisher");
    
            const coPublisherName = document.createElement("b");
            coPublisherName.classList.add("coPublisherName");
            coPublisherName.textContent = latest.name ? latest.name : "Anonymous"; // Replace "name" with the actual property from your data
    
            const coPublisherAddress = document.createElement("span");
            coPublisherAddress.classList.add("coPublisherAddress");
            coPublisherAddress.textContent = latest.wallet; // Replace "wallet" with the actual property from your data
    
            const coPublisherUnit = document.createElement("a");
            coPublisherUnit.classList.add("coPublisherUnit");
            coPublisherUnit.textContent = "Unit " + latest.token_id; // Replace "token_id" with the actual property from your data
            coPublisherUnit.href = "#u" + latest.token_id;
    
            coPublisherDiv.appendChild(coPublisherName);
            coPublisherDiv.appendChild(document.createElement("br"));
            coPublisherDiv.appendChild(coPublisherAddress);
            coPublisherDiv.appendChild(document.createElement("br"));
            coPublisherDiv.appendChild(coPublisherUnit);
    
            coPublishersList.appendChild(coPublisherDiv);
    }

}
export {displayCopublishers, updateCopublishers}