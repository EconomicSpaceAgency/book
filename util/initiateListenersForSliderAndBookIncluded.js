import { getFinalPrice } from '../ux/revealPrice';
function initiateListenersForSliderAndBookIncluded (){
    let slider = document.getElementById('colonizationSlider');
    let checkbox = document.getElementById('physicalBookCheckbox');

    slider.addEventListener('input', function(){
        let finalPrice = getFinalPrice();
        let revealPriceButton = document.getElementById('revealPriceButton');
        if(revealPriceButton){
            if(localStorage.getItem('priceRevealed') == 'true'){
                revealPriceButton.innerHTML = `Price: ${finalPrice} ETH`;
            }
            else{
                console.log('could not find reveal price');
            }
        }
    });
    checkbox.addEventListener('change', function(){
        let finalPrice = getFinalPrice();
        let revealPriceButton = document.getElementById('revealPriceButton');
        if(revealPriceButton){
            if(localStorage.getItem('priceRevealed') == 'true'){
                revealPriceButton.innerHTML = `Price: ${finalPrice} ETH`;
            }
            else{
                console.log('could not find reveal price');
            }
        }
    });

}
export {initiateListenersForSliderAndBookIncluded}