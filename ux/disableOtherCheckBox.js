function disableOtherCheckBox(){
    const physicalBookCheckbox = document.getElementById('physicalBookCheckbox');
    const alreadyReceivedPhysicalBookCheckbox = document.getElementById('alreadyReceivedPhysicalBookCheckbox');
    
    // Event listener for the physicalBookCheckbox
    physicalBookCheckbox.addEventListener('click', function() {
        if (physicalBookCheckbox.checked) {
            alreadyReceivedPhysicalBookCheckbox.disabled = true;
        } else {
            alreadyReceivedPhysicalBookCheckbox.disabled = false;
        }
    });
    
    // Event listener for the alreadyReceivedPhysicalBookCheckbox
    alreadyReceivedPhysicalBookCheckbox.addEventListener('click', function() {
        if (alreadyReceivedPhysicalBookCheckbox.checked) {
            physicalBookCheckbox.disabled = true;
        } else {
            physicalBookCheckbox.disabled = false;
        }
    });

}
function resetCheckBoxes(){
    physicalBookCheckbox.checked = false;
    alreadyReceivedPhysicalBookCheckbox.checked = false;
}
export {disableOtherCheckBox, resetCheckBoxes}