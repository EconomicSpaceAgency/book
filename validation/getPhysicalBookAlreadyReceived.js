function getPhysicalBookAlreadyReceived() {
    const checkbox = document.querySelector('#alreadyReceivedPhysicalBookCheckbox:checked');
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
export {getPhysicalBookAlreadyReceived}