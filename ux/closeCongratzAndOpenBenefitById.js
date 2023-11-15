import { getBenefitBasedOnId } from "../util/getBenefitBasedOnId.js";
import { insertBenefitByIdAndOpenBenefitsOverlay } from "./insertBenefitByIdAndOpenBenefitsOverlay";
import { blurAndPreventScroll, disableBlurAndEnableScroll } from "./blurAndPreventScrolling.js";
import { getDetailsByWallet } from '../db/details.js'

async function closeCongratzAndOpenBenefitById(id) {

    let wallet = localStorage.getItem("wallet");
    let details = await getDetailsByWallet(wallet);
    
    let congratzOverlayClose = document.getElementById("congratzOverlayClose");
    if(congratzOverlayClose){
        congratzOverlayClose.click();
        disableBlurAndEnableScroll();
    }
    if(id){
        insertBenefitByIdAndOpenBenefitsOverlay(getBenefitBasedOnId(id-1), details);
    }

}
export {closeCongratzAndOpenBenefitById}