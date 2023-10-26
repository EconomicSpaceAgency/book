const revertTransactionInitiatedAnimation = async function(tokenId) {
const buttons = document.querySelectorAll(`#publishUnit${tokenId}`);
buttons.forEach(function(button) {
        if(button) {
            button.innerHTML = `publish unit #${tokenId}`;
        } else {
            console.warn(`Button with ID ${button} not found.`);
        }
    });
}
export {revertTransactionInitiatedAnimation} 