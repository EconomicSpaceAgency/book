import { getFinalPrice } from '../ux/revealPrice';
function initiateListenersForSliderAndBookIncluded (){
    let slider = document.getElementById('colonizationSlider');
    let includePhysicalBookCheckbox = document.getElementById('physicalBookCheckbox');
    let includeAlreadyReceivedPhysicalBookCheckbox = document.getElementById('alreadyReceivedPhysicalBookCheckbox');

    slider.addEventListener('input', function(){
        let finalPrice = getFinalPrice();
        let revealPriceButton = document.getElementById('revealPriceButton');
        if(revealPriceButton){
            if(localStorage.getItem('priceRevealed') == 'true'){
                revealPriceButton.innerHTML = `Price: ${finalPrice} Matic`;
            }
            else{
                console.log('could not find reveal price');
            }
        }
    });
    includePhysicalBookCheckbox.addEventListener('change', function(){
        let finalPrice = getFinalPrice();
        let revealPriceButton = document.getElementById('revealPriceButton');
        if(revealPriceButton){
            if(localStorage.getItem('priceRevealed') == 'true'){
                revealPriceButton.innerHTML = `Price: ${finalPrice} Matic`;
            }
            else{
                console.log('could not find reveal price');
            }
        }
    });
    includeAlreadyReceivedPhysicalBookCheckbox.addEventListener('change', function(){
        let finalPrice = getFinalPrice();
        let revealPriceButton = document.getElementById('revealPriceButton');
        if(revealPriceButton){
            if(localStorage.getItem('priceRevealed') == 'true'){
                revealPriceButton.innerHTML = `Price: ${finalPrice} Matic`;
            }
            else{
                console.log('could not find reveal price');
            }
        }
    });

}
export {initiateListenersForSliderAndBookIncluded}