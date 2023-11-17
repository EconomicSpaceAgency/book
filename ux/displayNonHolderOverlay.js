let nonHolderOverlay = document.getElementById("nonHolderOverlay");
let nonHolderOverlayClose = document.getElementById("nonHolderOverlayClose");
let nonHolderOverlayContent = document.getElementById("nonHolderOverlayContent");

async function displayNonHolderOverlay(){

    if(nonHolderOverlay){
        nonHolderOverlay.style.display = "block";
    }
    if(nonHolderOverlayClose){
        nonHolderOverlayClose.style.display = "block";
        closeNonHolderOverlayListener();
    }
    if(nonHolderOverlayContent){
        nonHolderOverlayContent.style.display = "block";
    }
}
async function closeNonHolderOverlayListener(){
    nonHolderOverlayClose.addEventListener("click", function () {
        closeNonHolderOverlay();
    });
}
async function closeNonHolderOverlay(){
    if(nonHolderOverlay){
        nonHolderOverlay.style.display = "none";
    }
    if(nonHolderOverlayClose){
        nonHolderOverlayClose.style.display = "none";
    }
    if(nonHolderOverlayContent){
        nonHolderOverlayContent.style.display = "none";
    }
}
export { displayNonHolderOverlay }
