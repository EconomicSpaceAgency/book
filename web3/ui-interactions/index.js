import {revertTransactionInitiatedAnimation} from "../../ux/revertTransactionInitiatedAnimation";

const clearMintingError = () => {
    const mintingError = document.getElementById('tiersErrorMessage');
    if(mintingError){
        mintingError.innerHTML = "";
    }
    else{
        console.warn("Could not find element with id 'tiersErrorMessage'");
    }
    
};

const closePriceTierOverlay = () => {
    document.getElementById('priceTierOverlayClose').click();
};

const removePublishButton = (tokenId) =>{
    const buttons = document.querySelectorAll(`#publishUnit${tokenId}`);
    buttons.forEach(function(button) {
      // Apply changes to each element
      if(button) {
        button.remove();
    } else {
        console.warn(`Button with ID ${button} not found.`);
    }
  });
}
const removeBlurFilter = (tokenId) => {
    const unit = document.getElementById(`u${tokenId}`);
    if(unit){
        const pElements = unit.querySelectorAll('p');
        const h5Elements = unit.querySelectorAll('h5');
        
        if(pElements){
            pElements.forEach(pElement => {
                pElement.style.filter = 'none';  
            });
        }
        if(h5Elements){
            h5Elements.forEach(h5Element => {
                h5Element.style.filter = 'none';
            });
        }
    }
}
const setOrbBorderToSignalThatUnitIsPublished = (tokenId) => {
    const unit = document.getElementById(`orb_${tokenId}`);
    if(unit){
        unit.style.filter = 'blur(4px)';
        unit.style.opacity = '0.75';
    }
}

const handleTransactionError = (tokenId) => {
    // 1. revert minting animation
    revertTransactionInitiatedAnimation(tokenId);
    // 2. reopen tierSubmitSelectionOverlay, and set it's error message. 
    document.getElementById('priceTierOverlay').style.display = 'block';
    document.getElementById('priceTierOverlayClose').style.display = 'block';
    document.getElementById('priceTierContent').style.display = 'block';
    const mintingError = document.getElementById('tiersErrorMessage');
    const tiersSubmitButton = document.getElementById('tiersSubmitButton');
    if(mintingError){
        mintingError.innerHTML = "It happens that transactions fail sometimes. Would you retry?"
        mintingError.style.display = "block";
    }
    if(tiersSubmitButton){
        const tiersSubmitButton = document.getElementById('tiersSubmitButton');
        tiersSubmitButton.innerHTML = "Retry";
    }
    // save tier so we don't have to present it again:
    const selectedTier = document.querySelector('#priceTiers input[type="radio"]:checked');
    if (selectedTier) {
        console.log('selectedTier, minting again: ', selectedTier.value);
        localStorage.setItem('chosenPrice', selectedTier.value);
    }
};
export {clearMintingError, closePriceTierOverlay, removePublishButton, removeBlurFilter, setOrbBorderToSignalThatUnitIsPublished, handleTransactionError}
