import {initiateSupabase} from './supabase';

const supabase = initiateSupabase();
async function insertIntoDetails(tokenId, wallet, pbi, price, invitation) {
        const { data, error } = await supabase
          .from('copublishing_details')
          .insert([
            { token_id: tokenId, wallet: wallet, pbi: pbi, price: price, invitation: invitation }
          ]);
      
        if (error) {
          console.error('Error inserting data into copublishing details:', error);
          return null;
        }
        return data;
}
async function getDetailsByWallet(wallet) {
  const { data, error } = await supabase
      .from('copublishing_details')
      .select('*')
      .eq('wallet', wallet);

  if (error) {
      console.error('Error fetching data:', error);
      return null; // or handle the error as needed
  }

  return data;
}
export {insertIntoDetails, getDetailsByWallet}