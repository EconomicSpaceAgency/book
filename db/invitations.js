import {initiateSupabase} from './supabase';

const supabase = initiateSupabase();

async function isInvitationValid(invitationValue) {
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')    
            .eq('value', invitationValue)
            .lt('used_times', 5)
            .limit(1);
        
        if (error) throw error;
                console.log('isInvitationValid', data);
        return data && data.length > 0;
    } catch (error) {
        console.error("Error checking invitation validity:", error);
        return false;
    }
}
async function setInvitationUsed(invitationValue, usedByWallet) {
    try {
        // 1. Retrieve the current used_times value
        const { data, error } = await supabase
            .from('invitations')
            .select('used_times')
            .eq('value', invitationValue)
            .limit(1);
        
        if (error) throw error;
        if (data.length === 0) throw new Error("Invitation not found");
        
        const currentUsedTimes = data[0].used_times;
        
        // 2. Increment that value
        const newUsedTimes = currentUsedTimes + 1;

        // 3. Update the table with the incremented value
        const updateResponse = await supabase
            .from('invitations')
            .update({ 
                used_by_wallet: usedByWallet,
                used_times: newUsedTimes
            })
            .eq('value', invitationValue);

        if (updateResponse.error) throw updateResponse.error;

        console.log('Invitation marked as used.');
    } catch (error) {
        console.error("Error marking invitation as used:", error);
    }
}

async function setInvitationInvitedBy(invitedByInvitationId, invitation) {
    try {
        const { error } = await supabase
            .from('invitations')
            .update({ invited_by_invitation_id: invitedByInvitationId })
            .eq('value', invitation);
        
        if (error) throw error;
        console.log('Invitation marked as ivnited by.');
    } catch (error) {
        console.error("Error marking invitation as used:", error);
    }
}
async function setInvitationInvitedByReservation(invitedByReservationId, invitation) {
    try {
        const { error } = await supabase
            .from('invitations')
            .update({ invited_by_reservation_id: invitedByReservationId })
            .eq('value', invitation);
        
        if (error) throw error;
        console.log('Invitation marked as ivnited by.');
    } catch (error) {
        console.error("Error marking invitation as used:", error);
    }
}

async function getNextInvitation() {
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('used_by_wallet', '0x')
            .eq('invited_by_reservation_id', 0)
            .eq('invited_by_invitation_id', 0)
            .limit(1);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching next three invitations:", error);
        return null;
    }
}
async function getNextThreeInvitations() {
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('used_by_wallet', '0x')
            .eq('invited_by_reservation_id', 0)
            .eq('invited_by_invitation_id', 0)
            .limit(3);
        if (error) throw error;
        return data;
    } catch (error) {
        console.error("Error fetching next three invitations:", error);
        return null;
    }
}

async function getInvitationByInvitationValue(invitationValue) {
    try {
        const { data, error } = await supabase
            .from('invitations')
            .select('*')
            .eq('value', invitationValue)
            .limit(1);
        
        if (error) throw error;
        console.log('getInvitationByInvitationValue data response: ', data);

        // If data is present and has a length greater than 0, return the first invitation. 
        // Otherwise, return null.
        return data;

    } catch (error) {
        console.error("Error checking invitation validity:", error);
        return null;
    }
}

async function setInvitationsCreatedWithInvitationId(initialInvitationId, referralInvitations) {
    try {
        for (let invitation of referralInvitations) {
            invitation.invited_by_invitation_id = initialInvitationId;
        }
        
        const { error } = await supabase
            .from('invitations')
            .insert(referralInvitations);
        
        if (error) throw error;

        console.log('Invitations set with the invitation ID.');
    } catch (error) {
        console.error("Error setting invitations with the invitation ID:", error);
    }
}


export {isInvitationValid, getNextInvitation, getNextThreeInvitations, setInvitationUsed, getInvitationByInvitationValue, setInvitationsCreatedWithInvitationId, setInvitationInvitedBy, setInvitationInvitedByReservation}
