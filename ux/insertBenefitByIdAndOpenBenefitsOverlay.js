import { closeOpenBenefitAndOpenCongratz } from "./closeOpenBenefitAndOpenCongratz.js";
import { copyInvitations } from "./copyInvitations.js";
import { downloadInvitations } from "./downloadInvitations";
import { insertOrder, getOrderByWallet, updateOrderByWallet } from "../db/orders.js";
import { validateOrders } from "../validation/validateOrders.js";
import { validateCopublisher } from "../validation/validateCopublisher";
import { modifyBenefits } from "./modifyBenefits.js";
import { insertCoPublisher, getCopublisherByWallet, updateCopublisher } from "../db/copublishers.js";
import { blurAndPreventScroll } from "./blurAndPreventScrolling.js";
import { updateCopublishers } from "./displayCopublishers.js";
// import { downloadBook } from "./downloadBook.js";


// technical debt - code should be modularized!
const insertBenefitByIdAndOpenBenefitsOverlay = async function(content) {
    let wallet = localStorage.getItem("wallet");
    const benefitsOverlay = document.getElementById('benefit1Overlay');
    if(benefitsOverlay){
        benefitsOverlay.style.display = "flex";
    }
    const benefitsOverlayClose = document.getElementById('benefit1OverlayClose');
    if(benefitsOverlayClose){
        benefitsOverlayClose.addEventListener('click', function(){
            closeOpenBenefitAndOpenCongratz();   
        });
        benefitsOverlayClose.style.display = "block";
    }
    const benefitsOverlayContent = document.getElementById('benefit1OverlayContent');
    if(benefitsOverlayContent){
        benefitsOverlayContent.innerHTML = content;
        benefitsOverlayContent.innerHTML += '<button class="aboutOverlayBack" id="benefitOverlayClose">← back</button>';

        let backButton = document.getElementById('benefitOverlayClose');
        if(backButton){
            backButton.addEventListener('click', function(){
                closeOpenBenefitAndOpenCongratz();   
            });
        }
        let copyButton = document.getElementById("copyButton");
        let downloadButton = document.getElementById("downloadButton");
        if(copyButton){
            copyButton.addEventListener("click", function (event) {
                copyInvitations();
            });
        }
        if(downloadButton){
            downloadButton.addEventListener("click", function (event) {
                downloadInvitations();
            });
        }
        benefitsOverlayContent.style.display = "block";
        blurAndPreventScroll();
        

        // downloadBook
        // let downloadBook = document.getElementById('downloadGeneratedPdfsButton')
        // if(downloadBook){
        //     downloadBook.addEventListener("click", function (event) {
        //         downloadBook();
        //     });
        // }

        let sendButton = document.getElementById("postDeliveryDetails");

        let deliveryName = document.getElementById("name");
        let deliveryMailing = document.getElementById("mailingAddress");
        let deliveryPhoneNumber = document.getElementById("phoneNumber");
        let deliveryContact = document.getElementById("contact");
        let deliveryError = document.getElementById("detailsError");
        let orderUpdateOrPost; 

        if(sendButton){

            let wallet = localStorage.getItem("wallet");
            let existingOrder = await getOrderByWallet(wallet);
            let orderUpdateOrPost;
            if(existingOrder){
                console.log("existing order: ", existingOrder);
                sendButton.textContent = "Update ➹";
                
                deliveryName.value = existingOrder.name;
                deliveryMailing.value = existingOrder.mailing_address;
                deliveryPhoneNumber.value = existingOrder.phone_number;
                deliveryContact.value = existingOrder.contact;
                orderUpdateOrPost = "Update";
            }   
            else{
                orderUpdateOrPost = "Post";
            }
            sendButton.addEventListener("click", async function (event) {

                deliveryError.style.display = "none";
                validateOrders();
                if(existingOrder){
                    let updateOrderSuccess = await updateOrderByWallet(deliveryName.value.trim(), deliveryMailing.value.trim(), deliveryPhoneNumber.value.trim(), deliveryContact.value.trim(), localStorage.getItem("wallet"));
                    if(updateOrderSuccess == null){
                        sendButton.textContent = "Thank you!";
                    }
                    else{
                        deliveryError.innerHTML = "It seems there is an issue with the delivery, please contact us!";
                        deliveryError.style.display = "block"
                    }
                }
                else{
                    let insertOrderSuccess = await insertOrder(deliveryName.value.trim(), deliveryMailing.value.trim(), deliveryPhoneNumber.value.trim(), deliveryContact.value.trim(), localStorage.getItem("wallet"));
                    if(insertOrderSuccess == null){
                        sendButton.textContent = "Thank you!";
                    }
                    else{
                        deliveryError.innerHTML = "It seems there is an issue with the delivery, please contact us!";
                        deliveryError.style.display = "block"
                    }
                }
                //disable button `send` function
                //possibly disable deliveryName, deliveryMailing, deliveryPhoneNumber
                // if(deliveryError){
                //     if(deliveryError.style.display !== "block"){
                //         sendButton.textContent = "Thanks!";
                //         isSendClicked = true; // Set the flag to true
                //         return;
                //     }
                // }
            });
        }

        // tehnical debt
        let postPublisherButton = document.getElementById("postPublisherButton");
        if(postPublisherButton){
            let copublisherName = document.getElementById("copublisherName");
            let copublisherUpdateOrPost;

            let existingCopublisher = await getCopublisherByWallet(wallet);
            console.log("Is it existing copublisher?", existingCopublisher);
            
            if(postPublisherButton){
                if(existingCopublisher){
                    postPublisherButton.innerHTML = "Update ➹";
                    copublisherName.value = existingCopublisher.name;
                    copublisherUpdateOrPost = "Update";
                }
                else{
                    postPublisherButton.innerHTML = "Send ➹";
                    copublisherUpdateOrPost = "Send";
                }
            }
            let copublisherError = document.getElementById("copublisherError");
            if(postPublisherButton){
                postPublisherButton.addEventListener("click", async function (event) {
                    copublisherError.style.display = "none";
                    validateCopublisher();
                    let name = copublisherName.value;
                    if(copublisherUpdateOrPost = "Update"){
                        let copublisherUpdateSuccess = await updateCopublisher(wallet, name);
                        if(copublisherUpdateSuccess == null){
                            console.log("copublisherUpdateSuccess", copublisherUpdateSuccess);
                            postPublisherButton.innerHTML = "Updated!";
                            updateCopublishers(wallet, name);
                        }
                        else{
                            deliveryError.innerHTML = "It seems there is an issue with updating copublisher name, please contact us!";
                            deliveryError.style.display = "block"
                        }
                    }
                    else{
                        let copublisherInsertSuccess = await insertCoPublisher(wallet, name);
                        console.log("copublisherInsertSuccess", copublisherInsertSuccess);
                    }
                })
            }
        }

        // invitations related
        let invitationLinkElement = document.getElementById(`invitation-link1`);
        let invitation = localStorage.getItem('invitation');
        // console.log("invitation: ", invitation);
        if(invitation && invitationLinkElement){
            invitationLinkElement.innerHTML = invitation;
        }
        let tokenId = localStorage.getItem('tokenId');
        // fetch element that holds OpenSea link: 
        let elementContainingOpenSeaLink = document.getElementById('openSeaLink');

        if(elementContainingOpenSeaLink && tokenId){
            // get token id from local storage so we can generate opensea link
            let url = import.meta.env.VITE_NETWORK == 'sepolia' ? 'testnets.opensea.io' : 'opensea.io'; 
            const final = `https://${url}/assets/${import.meta.env.VITE_NETWORK}/${import.meta.env.VITE_NFT_CONTRACT_ADDRESS}/${tokenId}`;
            elementContainingOpenSeaLink.innerHTML = final;
        }
        // fetch element that holds Pinnata / IPFS link:
        let ipfsBookDownloadLink = document.getElementById('ipfsBookDownloadLink');
        let pinnataGateway = import.meta.env.VITE_PINATA_GATEWAY;
        let resourceName = `protocols-for-postcapitalist-expression_digital-edition_${tokenId}.pdf/`;
        let accessToken = `?pinataGatewayToken=${import.meta.env.VITE_PINATA_ACCESS_TOKEN}`;
        let downloadURL = pinnataGateway + resourceName + accessToken;

        if(tokenId && ipfsBookDownloadLink){
            ipfsBookDownloadLink.innerHTML = downloadURL;
        }

        let dl = document.getElementById('dl');
        if(tokenId && dl){
            dl.href = downloadURL;
        }

        if (localStorage.getItem('pbi') == false || localStorage.getItem('alreadyReceivedPhysicalBook' == 'true')){
            console.log('pbi: ', localStorage.getItem('pbi'));
            modifyBenefits(); 
        }
        // enter the discourse button
    }
    let enterTheDiscourseButton = document.getElementById('enterTheDiscourseButton');
    if(enterTheDiscourseButton){
        enterTheDiscourseButton.addEventListener('click', function(){
            window.open('https://discord.gg/MWApYu2MR8', '_blank').focus();
        });
    }


    // delivery details related


}
export {insertBenefitByIdAndOpenBenefitsOverlay} 