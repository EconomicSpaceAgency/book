import {initiateSupabase} from './supabase';

const supabase = initiateSupabase();

async function insertOrder(name, mailingAddress, phoneNumber, contact, wallet) {
    console.log("wallet:", wallet);
    try {
        // Validate the input values
        if (!name || typeof name !== 'string') {
            throw new Error('Invalid name value');
        }
        if (!mailingAddress || typeof mailingAddress !== 'string') {
            throw new Error('Invalid mailing address value');
        }
        if (!phoneNumber || typeof phoneNumber !== 'string') {
            throw new Error('Invalid phone number value');
        }
        if (!contact || typeof contact !== 'string') {
            throw new Error('Invalid contact value');
        }
        if (!wallet || typeof wallet !== 'string') {
            throw new Error('Invalid wallet value');
        }

        // Insert a new row into the 'orders' table with the provided values
        const { data, error } = await supabase
            .from('orders')
            .insert([{ name, mailing_address: mailingAddress, phone_number: phoneNumber, contact: contact, wallet: wallet }]);

        // Check for any errors during the insert
        if (error) throw error;

        // Return the inserted data (or true if you do not need the inserted data)
        return data;
    } catch (error) {
        console.error("Error inserting order:", error);
        return false;
    }
}
async function getOrderByWallet(wallet) {
    try {
        // Query the 'orders' table for an order with the provided wallet address
        const { data, error } = await supabase
            .from('orders')
            .select('*')
            .eq('wallet', wallet)
            .single();

        // Check for any errors during the query
        if (error) throw error;

        // Return the found data (or null if no order is found with that wallet address)
        return data;
    } catch (error) {
        console.error("Error getting order by wallet:", error);
        return null;
    }
}
async function updateOrderByWallet(name, mailingAddress, phoneNumber, contact, wallet) {
    try {
        // Update the order in the 'orders' table with the provided wallet address
        const { data, error } = await supabase
            .from('orders')
            .update([{ name, mailing_address: mailingAddress, phone_number: phoneNumber, contact, wallet }])
            .eq('wallet', wallet);

        // Check for any errors during the update
        if (error) throw error;
        // Return the updated data (or true if you do not need the updated data)
        console.log("updateOrderByWallet: ", data);
        return data;
    } catch (error) {
        console.error("Error updating order by wallet:", error);
        return false;
    }
}

export {insertOrder, getOrderByWallet, updateOrderByWallet}
