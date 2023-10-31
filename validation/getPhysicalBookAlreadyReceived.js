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
        console.warn('Checkbox is not selected.');
        return false;
    }
}
export {getPhysicalBookAlreadyReceived}