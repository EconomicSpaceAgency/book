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
        console.warn('Checkbox is not selected.');
        return false;
    }
}
export {getPhysicalBookIncluded}