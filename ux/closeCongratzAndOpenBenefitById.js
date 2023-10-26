import { getBenefitBasedOnId } from "../util/getBenefitBasedOnId.js";
import { insertBenefitByIdAndOpenBenefitsOverlay } from "./insertBenefitByIdAndOpenBenefitsOverlay";
import { blurAndPreventScroll, disableBlurAndEnableScroll } from "./blurAndPreventScrolling.js";

function closeCongratzAndOpenBenefitById(id) {
    
    let congratzOverlayClose = document.getElementById("congratzOverlayClose");
    if(congratzOverlayClose){
        congratzOverlayClose.click();
        disableBlurAndEnableScroll();
    }
    if(id){
        insertBenefitByIdAndOpenBenefitsOverlay(getBenefitBasedOnId(id-1));
    }

}
export {closeCongratzAndOpenBenefitById}