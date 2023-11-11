function selectOtherCheckBox(){
    const physicalBookCheckbox = document.getElementById('physicalBookCheckbox');
    const alreadyReceivedPhysicalBookCheckbox = document.getElementById('alreadyReceivedPhysicalBookCheckbox');
    
    // Event listener for the physicalBookCheckbox
    physicalBookCheckbox.addEventListener('click', function() {
        if (physicalBookCheckbox.checked) {
            alreadyReceivedPhysicalBookCheckbox.checked = false;
        }
    });
    // Event listener for the alreadyReceivedPhysicalBookCheckbox
    alreadyReceivedPhysicalBookCheckbox.addEventListener('click', function() {
        if (alreadyReceivedPhysicalBookCheckbox.checked) {
            physicalBookCheckbox.checked = false;
        }
    });

}
function resetCheckBoxes(){
    physicalBookCheckbox.checked = false;
    alreadyReceivedPhysicalBookCheckbox.checked = false;
}
export {selectOtherCheckBox, resetCheckBoxes}