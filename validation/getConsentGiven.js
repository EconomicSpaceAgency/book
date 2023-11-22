function getConsentGiven() {
    const checkbox = document.querySelector('#gdprAgreement:checked');
    if (checkbox) {
        if(checkbox.checked){
            return true;
        }
        else{
            return false;
        }
    } else {
        return false;
    }
}
export {getConsentGiven}