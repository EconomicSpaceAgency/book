
import { initiateAboutOverlayLogic } from '../ux/aboutOverlaySwitchingLogic';
import { closeCongratzAndOpenBenefitById } from "../ux/closeCongratzAndOpenBenefitById";
import { getAllYourAssets } from "../util/getAllYourAssets";
import { blurAndPreventScroll, disableBlurAndEnableScroll } from "../ux/blurAndPreventScrolling.js";
import { displayCopublishers } from '../ux/displayCopublishers';
import { closeSubmenus } from '../ux/closeSubmenus.js';


function initiateListeners(){
    document.addEventListener("DOMContentLoaded", function () {
        initiateAboutOverlayLogic();
        displayCopublishers();
        closeSubmenus();
        // here it should be display block flex for about overlay
        let aboutButton = document.getElementById("aboutButton");
        let aboutOverlay = document.getElementById("aboutOverlay");
        let aboutOverlayClose = document.getElementById("aboutOverlayClose");
        let bookIndex = document.getElementById("bookIndex");
        let bookContent = document.getElementById("bookContent");
        let footNotesAndAudiobook = document.getElementById("footNotesAndAudiobook");
        let priceTierOverlay = document.getElementById("priceTierOverlay");
        let priceTierOverlayClose = document.getElementById("priceTierOverlayClose");
        let priceTierContent = document.getElementById("priceTierContent");
        let tiersErrorMessage = document.getElementById("tiersErrorMessage");
        let congratzOverlay = document.getElementById("congratzOverlay");
        let congratzOverlayClose = document.getElementById("congratzOverlayClose");
        let congratzOverlayContent = document.getElementById("congratzOverlayContent");
        let benefitOverlayClose = document.getElementById("benefitOverlayClose");
        let benefitsPackage = document.getElementById("benefitsPackage");
    
        aboutButton.addEventListener("click", function () {
            if(aboutOverlay){
                aboutOverlay.style.display = "flex";
            }
            blurAndPreventScroll();
            let activeMenu = document.getElementById('navAbout');
            if(activeMenu){
                activeMenu.classList.remove('activeSecondaryMenu');
            }
            // Add blur class to each element
            bookIndex.classList.add('blur-background'); 
            bookContent.classList.add('blur-background');
            footNotesAndAudiobook.classList.add('blur-background');
        });
    
        aboutOverlayClose.addEventListener("click", function () {
            aboutOverlay.style.display = "none";
            disableBlurAndEnableScroll();

            // Remove blur class from each element
            bookIndex.classList.remove('blur-background'); 
            bookContent.classList.remove('blur-background');
            footNotesAndAudiobook.classList.remove('blur-background');
        });
    
        document.addEventListener("click", function (event) {
            if(aboutOverlay.style.display == "block"){
                if (!aboutOverlay.contains(event.target) && event.target !== aboutButton) {
                    aboutOverlay.style.display = "none";
                    // Remove blur class from each element
                    bookIndex.classList.remove('blur-background'); 
                    bookContent.classList.remove('blur-background');
                    footNotesAndAudiobook.classList.remove('blur-background');
                    disableBlurAndEnableScroll();
                }
            }
        });

        // Add blur class to each element immediately when page loads
        blurAndPreventScroll();
        bookIndex.classList.add('blur-background'); 
        bookContent.classList.add('blur-background');
        footNotesAndAudiobook.classList.add('blur-background'); 

        // web3 related
        priceTierOverlayClose.addEventListener("click", function () {
            disableBlurAndEnableScroll();
            priceTierOverlay.style.display = "none";
            priceTierContent.style.display = "none";
            tiersErrorMessage.innerHtml = "";
            tiersErrorMessage.style.display = "none";
        });
        // congratz closed
        congratzOverlayClose.addEventListener("click", function () {
            disableBlurAndEnableScroll();
            congratzOverlay.style.display = "none";
            congratzOverlayClose.style.display = "none";
            if(congratzOverlayContent){
                congratzOverlayContent.style.display = "none";
            }
        });

        // adding eventListeners for `benefit{$id}`
        for (let i = 1; i <= 7; i++) {
            let element = document.getElementById(`benefit${i}`);

            if (element) {
                element.addEventListener("click", function (event) {
                    let clickedBenefitElement = event.target.id;
                    if(clickedBenefitElement){
                        const clickedBenefitId = parseInt(clickedBenefitElement.replace(/\D/g, ''), 10);
                        closeCongratzAndOpenBenefitById(clickedBenefitId);
                    }
                });
            }
        }
        // adding eventListener for `benefisPackage`
        if(benefitsPackage){
            benefitsPackage.addEventListener("click", function (event) {
                getAllYourAssets();
            })
        }
    });    
}
initiateListeners();

//secondaryNav functions
const mainNavButtons = document.querySelectorAll('#mainNav button[data-target]');
const secondaryNavMenus = document.querySelectorAll('.secondaryNavMenu');

function activateNav(targetNav) {
    for (let i = 0; i < secondaryNavMenus.length; i++) {
        if (secondaryNavMenus[i].id === targetNav) {
            secondaryNavMenus[i].classList.add('activeSecondaryMenu');
        } else {
            secondaryNavMenus[i].classList.remove('activeSecondaryMenu');
        }
    }
}

for (let i = 0; i < mainNavButtons.length; i++) {
    const button = mainNavButtons[i];
    const targetNav = button.dataset.target;
    const navMenu = document.getElementById(targetNav);

    button.addEventListener('mouseenter', function () {
        activateNav(targetNav);
        for (let j = 0; j < mainNavButtons.length; j++) {
            mainNavButtons[j].classList.remove('activeButton');
        }
        button.classList.add('activeButton');
        // if it's mobile, open submenu
        const mobileView = window.matchMedia('(max-width: 680px)');
        if(mobileView.matches){
            activateNav();
        }
    });

    button.addEventListener('click', function () {
        if (navMenu.classList.contains('activeSecondaryMenu')) {
            navMenu.classList.remove('activeSecondaryMenu');
            button.classList.remove('activeButton');
        } else {
            activateNav(targetNav);
            for (let j = 0; j < mainNavButtons.length; j++) {
                mainNavButtons[j].classList.remove('activeButton');
            }
            button.classList.add('activeButton');
        }
    });
}

for (let i = 0; i < secondaryNavMenus.length; i++) {
    const menu = secondaryNavMenus[i];
    menu.addEventListener('mouseleave', function () {
        for (let j = 0; j < mainNavButtons.length; j++) {
            mainNavButtons[j].classList.remove('activeButton');
        }
        menu.classList.remove('activeSecondaryMenu');
    });
}

//hide mainNav
const mainNav = document.getElementById('mainNav');
const showToolButton = document.getElementById('showToolButton');

showToolButton.onclick = function () {
    mainNav.classList.toggle('hideMainNav');
    this.classList.toggle('activeButton');
    toggleFullScreen();
}

//on enter, de-activate menu options and hide submenus
showToolButton.onmouseenter = function () {
    for (let b = 0; b < mainNavButtons.length; b++) {
        mainNavButtons[b].classList.remove('activeButton');
    }
    for (let n = 0; n < secondaryNavMenus.length; n++) {
        secondaryNavMenus[n].classList.remove('activeSecondaryMenu');
    }
}

//Fullscreen

function toggleFullScreen() {
    const elementsToToggle = ['mainBookText', 'footNotesAndAudiobook', 'bookIndex'];

    bookContent.classList.toggle('fullscreen-margin');
    
    elementsToToggle.forEach(id => {
        const element = document.getElementById(id);
        if (element) {
            element.classList.toggle('fullscreen-padding');
        }
    });

    if (!document.fullscreenElement) {
        if (document.documentElement.requestFullscreen) {
            document.documentElement.requestFullscreen();
        } else if (document.documentElement.mozRequestFullScreen) {
            /* Firefox */
            document.documentElement.mozRequestFullScreen();
        } else if (document.documentElement.webkitRequestFullscreen) {
            /* Chrome, Safari & Opera */
            document.documentElement.webkitRequestFullscreen();
        } else if (document.documentElement.msRequestFullscreen) {
            /* IE/Edge */
            document.documentElement.msRequestFullscreen();
        }
    } else {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.mozCancelFullScreen) {
            /* Firefox */
            document.mozCancelFullScreen();
        } else if (document.webkitExitFullscreen) {
            /* Chrome, Safari & Opera */
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            /* IE/Edge */
            document.msExitFullscreen();
        }
    }
}

  