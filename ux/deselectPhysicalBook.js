function deselectPhysicalBook(){

    const checkbox = document.querySelector('#priceTiers input[type="checkbox"]:checked');

    if (checkbox) {
        checkbox.checked = false;
    }

}
export { deselectPhysicalBook };