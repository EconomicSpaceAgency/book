
function getColonizationLevel(){
    let slider = document.getElementById('colonizationSlider');
    if(slider){
        return slider.value;
    }
    else{
        console.warn("Could not find slider");
    }
}
export { getColonizationLevel};