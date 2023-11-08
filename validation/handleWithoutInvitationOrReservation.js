

import { isTokenReserved } from "../web3/isTokenReserved";
import { mintById } from "../web3/mintById";
import { hasMinted } from "../web3/hasMinted";
import { enoughFunds } from "./enoughFunds.js";
async function handleWithoutInvitationOrReservation(address, reservationsActive, invitationsActive, tokenId, physicalBookIncluded, choosenPrice) {
    let hasMintedR = await hasMinted(address);
    if(hasMintedR){
        return "You have already minted an NFT from this collection.";
    }
    let tokenReserved = await isTokenReserved(tokenId);
    if(tokenReserved){
        if(reservationsActive){
            return "Unit is reserved, and reservations are still active!";
        }
        else{
            let walletHasEnoughFunds = await enoughFunds(address, choosenPrice);
            if(!walletHasEnoughFunds){
                return `It seems that you don't have enough funds in your wallet. <a href="https://economic-space-agency.gitbook.io/about-co-publishing-units-of-discourse/faq#where-can-i-get-matic" target="_blank"> Consider getting some MATIC </a>`;
            }
            localStorage.setItem('pbi', physicalBookIncluded);
            mintById(tokenId, choosenPrice);
            return true;
        }
    }
    if(invitationsActive){
        return "Invitations are still active!";
    }
    else{
        let walletHasEnoughFunds = await enoughFunds(address, choosenPrice);
        if(!walletHasEnoughFunds){
            return `It seems that you don't have enough funds in your wallet. <a href="https://economic-space-agency.gitbook.io/about-co-publishing-units-of-discourse/faq#where-can-i-get-matic" target="_blank"> Consider getting some MATIC </a>`;
        }
        mintById(tokenId, physicalBookIncluded, choosenPrice);
        return true;
    }
}
export { handleWithoutInvitationOrReservation };