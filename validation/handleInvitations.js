import { isInvitationValid } from "../db/invitations";
import { isTokenReserved } from '../web3/isTokenReserved.js';
import { mintByInvitation } from "../web3/mintByInvitation.js";
import { hasMinted } from "../web3/hasMinted";
import { enoughFunds } from "./enoughFunds.js";
async function handleInvitations(address, invitationId, tokenId, physicalBookIncluded, chosenPrice, provider, reservationsActive) {
    let hasMintedR = await hasMinted(address);
    if(hasMintedR){
        return "You have already minted an NFT from this collection.";
    }
    if (invitationId) {
        let validInvitation = await isInvitationValid(invitationId);
        if (validInvitation) {
            const tokenReserved = await isTokenReserved(tokenId);
            if (tokenReserved && reservationsActive) {
                return "Token is still reserved. Invitation is not enough!";
            } else {
                let walletHasEnoughFunds = await enoughFunds(address, chosenPrice);
                if(!walletHasEnoughFunds){
                    return `It seems that you don't have enough funds in your wallet. <a href="https://economic-space-agency.gitbook.io/about-co-publishing-units-of-discourse/faq#where-can-i-get-matic" target="_blank"> Consider getting some MATIC </a>`;
                }
                localStorage.setItem('pbi', physicalBookIncluded);
                mintByInvitation(parseInt(tokenId, 10), invitationId, physicalBookIncluded, chosenPrice, provider);
                return true;
            }
        } else {
            return `Sorry, you need valid invitation to co-publish! <a href="https://economic-space-agency.gitbook.io/about-co-publishing-units-of-discourse/faq#invites" target="_blank">How to get an invitation?</a>`;
        }
    } else {
        return `Sorry, you need an invitation to co-publish! <a href="https://economic-space-agency.gitbook.io/about-co-publishing-units-of-discourse/faq#invites" target="_blank">How to get an invitation?</a>`;
    }
}
export { handleInvitations };