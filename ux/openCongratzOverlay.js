import {modifyBenefits} from './modifyBenefits';
import { blurAndPreventScroll } from "./blurAndPreventScrolling.js";

const openCongratzOverlay = async function(physicalBookIncluded) {
    if (physicalBookIncluded == false || localStorage.getItem('pbi') == 'false'){
        console.log('physicalBookIncluded: ', physicalBookIncluded);
        console.log('pbi: ', localStorage.getItem('pbi'));
        modifyBenefits(); 
    }
    else{
        console.log("physicalBook is included! : ", physicalBookIncluded);
    }
    const congratzOverlay = document.getElementById('congratzOverlay');
    if(congratzOverlay){
        congratzOverlay.style.display = "block";
        blurAndPreventScroll();
    }
    const congratzOverlayClose = document.getElementById('congratzOverlayClose');
    if(congratzOverlayClose){
        congratzOverlayClose.style.display = "block";
    }
    const congratzOverlayContent = document.getElementById('congratzContent');
    if(congratzOverlayContent){
        congratzOverlayContent.style.display = "flex";
    }
    const congratzMessage = document.getElementById('congratzMessage');
    if(congratzMessage){
        // enable message to be seen
        congratzMessage.style.display = "block";   
    }
    let enterTheDiscourseButton = document.getElementById('enterTheDiscourseButton');
    if(enterTheDiscourseButton){
        enterTheDiscourseButton.addEventListener('click', function(){
            console.log('Last step was clicked!');
            window.open('https://discord.gg/phazawkuSq', '_blank').focus();
        });
    }
}
export {openCongratzOverlay} 