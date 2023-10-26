import { copyBenefits } from "../ux/copyBenefits";
import { downloadBenefits } from "../ux/downloadBenefits";
import {closeOpenBenefitAndOpenCongratz} from '../ux/closeOpenBenefitAndOpenCongratz';

function getAllYourAssets(){
    let congratzOvelay = document.getElementById('congratzOverlay');
    if(congratzOvelay){
        congratzOvelay.style.display = 'none';
    }
    let content = 
    `
    <div class="invitation-container">
    <pre class="asci" id="asciProtocols">
░█▀█░█▀▄░█▀█░▀█▀░█▀█░█▀▀░█▀█░█░░░█▀▀░░                    
░█▀▀░█▀▄░█░█░░█░░█░█░█░░░█░█░█░░░▀▀█░░                    
░▀░░░▀░▀░▀▀▀░░▀░░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░░                    
░█▀▀░█▀█░█▀▄░░                                            
░█▀▀░█░█░█▀▄░░                                            
░▀░░░▀▀▀░▀░▀░░                                            
░█▀█░█▀█░█▀▀░▀█▀░█▀▀░█▀█░█▀█░▀█▀░▀█▀░█▀█░█░░░▀█▀░█▀▀░▀█▀░░
░█▀▀░█░█░▀▀█░░█░░█░░░█▀█░█▀▀░░█░░░█░░█▀█░█░░░░█░░▀▀█░░█░░░
░▀░░░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░░▀░░░
░█▀▀░█░█░█▀█░█▀▄░█▀▀░█▀▀░█▀▀░▀█▀░█▀█░█▀█                  
░█▀▀░▄▀▄░█▀▀░█▀▄░█▀▀░▀▀█░▀▀█░░█░░█░█░█░█                  
░▀▀▀░▀░▀░▀░░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀░▀                     
    </pre>
    <p class="discourse-unit-on-open-sea-text" id="discourse-unit-on-open-sea-text"> Your discourse unit on OpenSea: </p>
    <p class="discourse-unit-on-open-sea-link" id="openSeaLink"> ipfs://QmcHt8YqmA8Vhnfg946kDPRVUfRFo5y7T75nuJPBbXCAMV/token.id </p>
    <p class="discourse-node" id="discourse-node"> Your discourse node invitation link: </p>
    <p class="discourse-node-link" id="discourse-node-link"> https://discord.gg/DpSb58ZqeS </p>
    <p class="invitation-link-text" id="invitation-link-text"> Your invitation link: </p>
    <p class="invitation-link" id="invitation-link1">
    https://ecsa-book.vercel.app/?invitationId=HWjaYEr24AcMLzdhN4ycnKnhPvtRn4QNJKMuzu4BXexBHm6tsKmCQCUxqBudsxmK
    </p>
    <p class="unique-pdf-link-text" id="unique-pdf-link-text"> Your unique pdf: </p>
    <p class="unique-pdf-link" id="ipfsBookDownloadLink"> ipfs://QmcHt8YqmA8Vhnfg946kDPRVUfRFo5y7T75nuJPBbXCAMV/token.id </p>
    <br>
    </div>
    <div class="copyAndInvitationButtons">
    <button class="copy-button" id="copyButton">Copy ❑</button>
    <button class="download-button" id="downloadButton">Download ↓</button>
    </div>
    <br>
    <br>`;
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
                copyBenefits();
            });
        }
        if(downloadButton){
            downloadButton.addEventListener("click", function (event) {
                downloadBenefits();
            });
        }
    }
                // invitations related
                let invitationLinkElement = document.getElementById(`invitation-link1`);
                let invitation = localStorage.getItem('invitation');
                console.log("invitation: ", invitation);
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
                let resourceName = `book_with_cover_${tokenId}.pdf/`;
                let accessToken = `?pinataGatewayToken=${import.meta.env.VITE_PINATA_ACCESS_TOKEN}`;
                let downloadURL = pinnataGateway + resourceName + accessToken;
    
                if(tokenId && ipfsBookDownloadLink){
                    ipfsBookDownloadLink.innerHTML = downloadURL;
                }
    
    
                let dl = document.getElementById('dl');
                console.log("This happened: ", dl);
                if(tokenId && dl){
                    dl.href = downloadURL;
                }
    
            if (localStorage.getItem('pbi') == false){
                console.log('pbi: ', localStorage.getItem('pbi'));
                modifyBenefits(); 
            }
            benefitsOverlayContent.style.display = "flex";
    

}
export {getAllYourAssets}