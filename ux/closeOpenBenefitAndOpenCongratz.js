import { openCongratzOverlay } from "./openCongratzOverlay";
import { blurAndPreventScroll, disableBlurAndEnableScroll } from "./blurAndPreventScrolling.js";
function closeOpenBenefitAndOpenCongratz() {
    if (localStorage.getItem('pbi') == false){
        console.log('this should not modify benefits!');
        modifyBenefits(); 
    }
    let benefit1Overlay = document.getElementById("benefit1Overlay");
    let benefit1OverlayClose = document.getElementById("benefit1OverlayClose");
    let benefit1OverlayContent = document.getElementById("benefit1OverlayContent");
    if(benefit1Overlay){
        benefit1Overlay.style.display = "none";
        disableBlurAndEnableScroll();
    }
    if(benefit1OverlayClose){
        benefit1OverlayClose.style.display = "none";
        disableBlurAndEnableScroll();
    }
    if(benefit1OverlayContent){
        benefit1OverlayContent.style.display = "none";
        disableBlurAndEnableScroll();
    }
    openCongratzOverlay();

}
export {closeOpenBenefitAndOpenCongratz}