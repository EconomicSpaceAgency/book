import { isReservationValid, isReservationValidForTokenId } from "../db/reservations";
import { isTokenReserved } from "../web3/isTokenReserved";
import { mintByReservation} from "../web3/mintByReservation";
import { hasMinted } from "../web3/hasMinted";
import { enoughFunds } from "./enoughFunds.js";
async function handleReservations(address, reservationsActive, reservationId, tokenId, physicalBookIncluded, choosenPrice){

    let hasMintedR = await hasMinted(address);
    if(hasMintedR){
        return "You have already minted an NFT from this collection.";
    }
    let tokenReserved = await isTokenReserved(tokenId);

    if(tokenReserved){
        if(reservationsActive){
            if(reservationId){
                let validReservation = await isReservationValid(reservationId);
                if(validReservation){
                    let validReservationForTokenId = await isReservationValidForTokenId(reservationId, parseInt(tokenId, 10));
                    if(validReservationForTokenId){
                        let walletHasEnoughFunds = await enoughFunds(address, choosenPrice);
                        if(!walletHasEnoughFunds){
                            return `It seems that you don't have enough funds in your wallet. <a href="https://economic-space-agency.gitbook.io/about-co-publishing-units-of-discourse/faq#where-can-i-get-matic" target="_blank"> Consider getting some MATIC </a>`;
                        }
                        localStorage.setItem('pbi', physicalBookIncluded);
                        await mintByReservation(parseInt(tokenId, 10), reservationId, physicalBookIncluded, choosenPrice);
                        return true;
                    }
                    else{
                        return "Reservation is not for this unit!";
                    }
                }
                else{
                    return "Invalid reservation!";
                }
            }
            else{
                return "Reservation not provided!";
            }
        }
        else{
            return "Reservations are not active anymore!";
        }
    }
    else{
        return "Reservation is not for this unit!";
    }
}

export {handleReservations}