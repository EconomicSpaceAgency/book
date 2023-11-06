import { ethers } from 'ethers';

const VITE_RPC_URL_SEPOLIA = import.meta.env.VITE_RPC_URL_SEPOLIA;
const VITE_RPC_URL_POLYGON = import.meta.env.VITE_RPC_URL_POLYGON;
const VITE_NETWORK = import.meta.env.VITE_NETWORK;

async function isBalanceLessThan(walletAddress, amountToCompare) {
  try {
    const RPC_URL = VITE_NETWORK == "sepolia" ? VITE_RPC_URL_SEPOLIA : VITE_RPC_URL_POLYGON;
    const provider = new ethers.AlchemyProvider(VITE_NETWORK, RPC_URL);

    // Get the balance of the wallet
    const balance = await provider.getBalance(walletAddress);
    
    // Convert the balance to a more readable number (Ether)
    const balanceInEther = ethers.formatEther(balance);
     // Compare the balance to the specified amount
    const isLessThan = parseFloat(balanceInEther) < parseFloat(amountToCompare);

    return isLessThan;
  } catch (error) {
    console.error("Error checking balance:", error);
    throw error; // Or handle the error as appropriate for your application
  }
}


export { isBalanceLessThan }