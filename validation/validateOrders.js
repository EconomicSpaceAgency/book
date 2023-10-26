function validateOrders() {
    let deliveryName = document.getElementById("name");
    let deliveryMailing = document.getElementById("mailingAddress");
    let deliveryPhoneNumber = document.getElementById("phoneNumber");

    let deliveryError = document.getElementById("detailsError");

    if (!deliveryName.value.trim()) {
        deliveryError.style.display = "block";
    }
    
    if (!deliveryMailing.value.trim()) {
        deliveryError.style.display = "block";
    }
    
    if (!deliveryPhoneNumber.value.trim()) {
        deliveryError.style.display = "block";
    }
}
export {validateOrders}