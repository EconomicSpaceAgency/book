import {initiateSupabase} from './supabase';

const supabase = initiateSupabase();

async function isTokenReserved(tokenId) {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .eq('token_id', tokenId)
            .eq('used_by_wallet', "0x")
            .limit(1);
        
        if (error) throw error;
        return data && data.length > 0;
    } catch (error) {
        console.error("Error checking `isTokenReserved:", error);
        return false;
    }
}

async function isReservationValid(reservationValue) {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .eq('value', reservationValue)
            .eq('used_by_wallet', "0x")
            .limit(1);
        
        if (error) throw error;
        return data && data.length > 0;
    } catch (error) {
        console.error("Error checking invitation validity:", error);
        return false;
    }
}
async function isReservationValidForTokenId(reservationValue, tokenId) {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .eq('value', reservationValue)
            .eq('token_id', tokenId)
            .eq('used_by_wallet', "0x")
            .limit(1);
        
        if (error) throw error;
        return data && data.length > 0;
    } catch (error) {
        console.error("Error checking invitation validity:", error);
        return false;
    }
}
async function setReservationUsed(reservationValue, usedByWallet) {
    try {
        const { error } = await supabase
            .from('reservations')
            .update({ used_by_wallet: usedByWallet })
            .eq('value', reservationValue);
        
        if (error) throw error;
        console.log('reservation marked as used.');
    } catch (error) {
        console.error("Error marking invitation as used:", error);
    }
}
async function getReservationByReservationValue(reservationValue) {
    try {
        const { data, error } = await supabase
            .from('reservations')
            .select('*')
            .eq('value', reservationValue)
            .limit(1);
        
        if (error) throw error;
        console.log('getReservationByReservationValue data response: ', data);

        // If data is present and has a length greater than 0, return the first invitation. 
        // Otherwise, return null.
        return data;

    } catch (error) {
        console.error("Error checking invitation validity:", error);
        return null;
    }
}
export {isTokenReserved, isReservationValid, isReservationValidForTokenId, setReservationUsed, getReservationByReservationValue}