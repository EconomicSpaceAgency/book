import { ethers } from 'ethers';
import { connect } from '../web3/blocknative/index';
import { areInvitationsActive } from '../web3/areInvitationsActive.js';
import { areReservationsActive } from '../web3/areReservationsActive.js';
import { displayError } from "../validation/displayError.js";
import { getPhysicalBookIncluded } from "../validation/getPhysicalBookIncluded.js";
import { handleInvitations } from '../validation/handleInvitations.js';
import { handleReservations } from '../validation/handleReservations.js';
import { handleWithoutInvitationOrReservation } from '../validation/handleWithoutInvitationOrReservation.js';
import { waitingForTransactionToInitiate, revertWaitingForTransactionToInitiate } from '../ux/waitingForTransactionToInitiate';
import { checkAndSwitchNetwork } from '../ux/checkAndSwitchNetwork.js';
import { clearMintingError } from '../web3/ui-interactions/index';
import { isTokenReserved } from '../web3/isTokenReserved';
import { getFinalPrice } from '../ux/revealPrice.js';
import { getMintedTokens, isTokenMinted } from  '../web3/getMintedTokens';

async function submitSelection() {

    const tokenId = localStorage.getItem('tokenId');
    clearMintingError();

    let wallets = null;
    let provider;
    let connected = false;
    wallets = await connect();
    let address = null;

    if(wallets){
        if(wallets[0]){
            connected = true;
            provider = new ethers.BrowserProvider(wallets[0].provider, 'any');
            address = wallets[0].accounts[0].address;
            try {
                await checkAndSwitchNetwork(provider);
            } catch (error) {
                displayError(error.message);
                return;
            }
        }
        else{
            // wallets = await connect();
            displayError('Please connect with one of the available wallet providers');
            return;
        }
    
    }
    waitingForTransactionToInitiate();
      
    const params = new URLSearchParams(window.location.search);
    const reservationId = params.get('reservationId');
    const invitationId = params.get('invitationId');
    const reservationsActive = await areReservationsActive();
    const invitationsActive = await areInvitationsActive();

    try {
        let chosenPrice = getFinalPrice();
        let physicalBookIncluded = getPhysicalBookIncluded();

        // if (!chosenPrice) {
        //     revertWaitingForTransactionToInitiate();
        //     displayError("Please select a price tier before proceeding.");
        //     return;
        // }
        if(connected){
            const mintedTokens = await getMintedTokens();
            const mintedToken = await isTokenMinted(tokenId, mintedTokens);
            if(mintedToken){
                let tokenAlreadyExistError = "Sorry, it seems that token is already published. Would you be willing to choose another one?";
                revertWaitingForTransactionToInitiate();
                displayError(tokenAlreadyExistError);
            }
            let reserved = await isTokenReserved(tokenId);
            if (reservationsActive && reservationId) {
                const reservationError = await handleReservations(address, reservationsActive, reservationId, tokenId, physicalBookIncluded, chosenPrice);
                if (reservationError !== true){
                    revertWaitingForTransactionToInitiate();
                    displayError(reservationError);
                }
            }
            else if (invitationsActive && invitationId) {
                let invitationError;
                if(reserved && reservationsActive){
                    invitationError = "Token is still reserved";
                }
                else{
                    invitationError = await handleInvitations(address, invitationId, tokenId, physicalBookIncluded, chosenPrice, provider, reservationsActive);
                }
                if (invitationError !== true){
                    revertWaitingForTransactionToInitiate();
                    displayError(invitationError);
                }
            }
            else{
                let withoutReservationAndInvitationError;
                if(reservationsActive && reservationId){
                    withoutReservationAndInvitationError = "Token is still reserved";
                }
                else if(invitationsActive){
                    withoutReservationAndInvitationError = `Sorry, you need an invitation to co-publish! <a href="https://economic-space-agency.gitbook.io/about-co-publishing-units-of-discourse/faq#invites" target="_blank">How to get an invitation?</a>`;
                }
                else{
                    withoutReservationAndInvitationError = await handleWithoutInvitationOrReservation(address, reservationsActive, invitationsActive, tokenId, physicalBookIncluded, chosenPrice);
                }
                if (withoutReservationAndInvitationError !== true){
                    revertWaitingForTransactionToInitiate();
                    displayError(withoutReservationAndInvitationError);
                }
            }
        }
        else{
            displayError('Please connect with one of available wallet providers.');
        }
    
    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

window.submitSelection = submitSelection;
export {submitSelection}
