import { getConsentGiven } from "./getConsentGiven";
function validateOrders() {
    let deliveryName = document.getElementById("name");
    let deliveryMailing = document.getElementById("mailingAddress");
    let deliveryPhoneNumber = document.getElementById("phoneNumber");
    let consentGiven = getConsentGiven();

    let deliveryError = document.getElementById("detailsError");
    let validOrder = true;

    if(!consentGiven){
        deliveryError.style.display = "block";
        validOrder = false;
    }

    if (!deliveryName.value.trim()) {
        deliveryError.style.display = "block";
        validOrder = false;
    }
    
    if (!deliveryMailing.value.trim()) {
        deliveryError.style.display = "block";
        validOrder = false;
    }
    
    if (!deliveryPhoneNumber.value.trim()) {
        deliveryError.style.display = "block";
        validOrder = false;
    }
    return validOrder;
}
export {validateOrders}