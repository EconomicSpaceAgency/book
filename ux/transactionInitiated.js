const transactionInitiated = async function(tokenId) {
    const buttons = document.querySelectorAll(`#publishUnit${tokenId}`);
    buttons.forEach(function(button) {
        if(button) {
            button.className = 'buttonload';
            button.innerHTML = `<i class="fa fa-circle-o-notch fa-spin"></i>Publishing...`;
            applyStyles(button);
    } else {
        console.warn(`Button with ID ${button} not found.`);
    }
    });
}
function applyStyles(button) {
    if(button) {
        button.style.border = '1px solid var(--c2)';
        button.style.padding = '0.3em 0.8em 0.5em 0.8em';
        button.style.fontFamily = 'var(--bookFontFamily)';
        button.style.fontSize = 'var(--bookFontSize)';
        button.style.marginBottom = '1em';
        button.style.marginLeft = '74%';
        button.style.transition = 'border 250ms, background-color 250ms';
    } else {
        console.warn(`Button with ${button} not found.`);
    }
}
export {transactionInitiated}