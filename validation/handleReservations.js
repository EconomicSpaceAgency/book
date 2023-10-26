import { isReservationValid, isReservationValidForTokenId } from "../db/reservations";
import { isTokenReserved } from "../web3/isTokenReserved";
import { mintByReservation} from "../web3/mintByReservation";
import { hasMinted } from "../web3/hasMinted";

async function handleReservations(reservationsActive, reservationId, tokenId, physicalBookIncluded, choosenPrice){

    // let hasMintedR = await hasMinted(address);
    // if(hasMintedR){
    //     return "You have already minted an NFT from this collection.";
    // }
    let tokenReserved = await isTokenReserved(tokenId);

    if(tokenReserved){
        if(reservationsActive){
            if(reservationId){
                let validReservation = await isReservationValid(reservationId);
                if(validReservation){
                    let validReservationForTokenId = await isReservationValidForTokenId(reservationId, parseInt(tokenId, 10));
                    if(validReservationForTokenId){
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