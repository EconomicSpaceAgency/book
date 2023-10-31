

import { isTokenReserved } from "../web3/isTokenReserved";
import { mintById } from "../web3/mintById";
import { hasMinted } from "../web3/hasMinted";
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
            localStorage.setItem('pbi', physicalBookIncluded);
            mintById(tokenId, choosenPrice);
            return true;
        }
    }
    if(invitationsActive){
        return "Invitations are still active!";
    }
    else{
        mintById(tokenId, physicalBookIncluded, choosenPrice);
        return true;
    }
}
export { handleWithoutInvitationOrReservation };