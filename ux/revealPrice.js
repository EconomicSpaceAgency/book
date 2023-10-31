import { getColonizationLevel } from './getColonizationLevel.js';
import { getPhysicalBookIncluded } from '../validation/getPhysicalBookIncluded.js';
import { getPhysicalBookAlreadyReceived } from '../validation/getPhysicalBookAlreadyReceived.js';

let periphery = import.meta.env.VITE_PERIPHERY_PRICE;
let peripheryBookPrice = import.meta.env.VITE_PERIPHERY_BOOK_PRICE;
let imperialCorePrice = import.meta.env.VITE_IMPERIAL_CORE_PRICE;
let imperialCoreBookPrice = import.meta.env.VITE_IMPERIAL_CORE_BOOK_PRICE;

function calculateRevealPrice(){

    let finalPrice;
    let isPhysicalBookAlreadyReceived = getPhysicalBookAlreadyReceived();

    if(isPhysicalBookAlreadyReceived){
        disableSlider();
        disablePhysicalBookCheckbox();
        disableAlreadyReceivedPhysicalBookCheckbox();
        localStorage.setItem('pbi', false);
        let finalPriceBeforeRounding = Number(periphery) + Number(peripheryBookPrice);
        finalPrice = Number(finalPriceBeforeRounding.toFixed(4));
    }
    else{
        let colonisationLevel = getColonizationLevel();
        let bookSelected = getPhysicalBookIncluded();

        if(bookSelected){
            if(colonisationLevel >= 50){
                finalPrice = Number(imperialCorePrice) + Number(imperialCoreBookPrice);
            }
            else{
                let finalPriceBeforeRounding = Number(periphery) + Number(peripheryBookPrice);
                finalPrice = Number(finalPriceBeforeRounding.toFixed(4));
            }
        }
        else{
            if(colonisationLevel >= 50){
                finalPrice = imperialCorePrice;
            }
            else{
                finalPrice = periphery;
            }
        }
    }

    return finalPrice;

}
// technical debt
function getFinalPrice(){
    let colonisationLevel = getColonizationLevel();
    let bookSelected = getPhysicalBookIncluded();
    let finalPrice;

    if(bookSelected){
        if(colonisationLevel >= 50){
            finalPrice = Number(imperialCorePrice) + Number(imperialCoreBookPrice);
        }
        else{
            let finalPriceBeforeRounding = Number(periphery) + Number(peripheryBookPrice);
            finalPrice = Number(finalPriceBeforeRounding.toFixed(4));
        }
    }
    else{
        if(colonisationLevel >= 50){
            finalPrice = imperialCorePrice;
        }
        else{
            finalPrice = periphery;
        }
    }
    return finalPrice;
}
function replaceRevealPriceButtonWithActualPrice(revealedPrice){
    let revealPriceDiv = document.getElementById('revealPriceDiv');
    let revealPriceButton = document.getElementById('revealPriceButton');
    if(revealPriceDiv){
        if(revealPriceButton){
            revealPriceButton.className = 'revealedPrice';
            revealPriceButton.innerHTML = `Price: ${revealedPrice} Matic`;
            localStorage.setItem('priceRevealed', true);
        }
    }
}
function replaceRevealPriceButtonWithActualPriceReverse(){
    let revealPriceButton = '<button class="revealPrice" id="revealPriceButton" onclick="revealPrice()">Reveal price</button>';
    let revealPriceDiv = document.getElementById('revealPriceDiv');
    if(revealPriceDiv){
        revealPriceDiv.innerHTML = revealPriceButton;
    }
}
function disableSlider(){
    let slider = document.getElementById('colonizationSlider');
    if(slider){
        slider.disabled = true;
    }
}
function enableSlider(){
    let slider = document.getElementById('colonizationSlider');
    if(slider){
        slider.disabled = false;
    }
}
function disablePhysicalBookCheckbox(){
    const checkbox = document.getElementById('physicalBookCheckbox');
    if(checkbox){
        checkbox.disabled = true;
    }
}

function enablePhysicalBookCheckbox(){
    const checkbox = document.getElementById('physicalBookCheckbox');
    if(checkbox){
        checkbox.disabled = false;
    }
}

// already received

function disableAlreadyReceivedPhysicalBookCheckbox(){
    const checkbox = document.getElementById('alreadyReceivedPhysicalBookCheckbox');
    if(checkbox){
        checkbox.disabled = true;
    }
}

function enableAlreadyReceivedPhysicalBookCheckbox(){
    const checkbox = document.getElementById('alreadyReceivedPhysicalBookCheckbox');
    if(checkbox){
        checkbox.disabled = false;
    }
}

function revealPrice(){
    let price = calculateRevealPrice();
    replaceRevealPriceButtonWithActualPrice(price);
}

window.revealPrice = revealPrice;
export {revealPrice, getFinalPrice, enableSlider, enablePhysicalBookCheckbox, enableAlreadyReceivedPhysicalBookCheckbox, disableAlreadyReceivedPhysicalBookCheckbox, replaceRevealPriceButtonWithActualPriceReverse};
