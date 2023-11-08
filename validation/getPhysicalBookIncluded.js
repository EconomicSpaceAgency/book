function getPhysicalBookIncluded() {
    const checkbox = document.querySelector('#physicalBookCheckbox:checked');
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
export {getPhysicalBookIncluded}