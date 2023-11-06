import { ethers } from "ethers";
import { addNetwork } from "./addNetwork";

const containsString = (obj, searchString) => {
    return Object.values(obj).some(value => 
        typeof value === 'string' && value.includes(searchString)
    );
}
const checkAndSwitchNetwork = async (provider) => {
   
    const VITE_NETWORK = import.meta.env.VITE_NETWORK;
    const VITE_EXPECTED_NETWORK_SEPOLIA_ID = import.meta.env.VITE_EXPECTED_NETWORK_SEPOLIA_ID;
    const VITE_EXPECTED_NETWORK_SEPOLIA_ID_NUMBER = import.meta.env.VITE_EXPECTED_NETWORK_SEPOLIA_ID_NUMBER;
    const VITE_EXPECTED_NETWORK_POLYGON = import.meta.env.VITE_EXPECTED_NETWORK_POLYGON;
    const VITE_EXPECTED_NETWORK_POLYGON_NUMBER = import.meta.env.VITE_EXPECTED_NETWORK_POLYGON_NUMBER;

    const expectedNetworkId = VITE_NETWORK == "sepolia" ? VITE_EXPECTED_NETWORK_SEPOLIA_ID: VITE_EXPECTED_NETWORK_POLYGON;
    const expectedNetworkIdNumber = VITE_NETWORK == "sepolia" ? VITE_EXPECTED_NETWORK_SEPOLIA_ID_NUMBER: VITE_EXPECTED_NETWORK_POLYGON_NUMBER;
    
    const currentNetworkId = await provider.getNetwork().then(net => net.chainId);
    console.log('provider.getNetwork, ', currentNetworkId);
    console.log('expectedNetworkIdNumber', expectedNetworkIdNumber);
    console.log('ethers.utils.hexlify(expectedNetworkId)', ethers.hexlify(expectedNetworkId));
    
    if (currentNetworkId !== expectedNetworkIdNumber) {
        if(window.ethereum){
            try {
                await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: ethers.hexlify(expectedNetworkId) }] });
            } catch (switchError) {
                
                if(containsString(switchError, "User rejected the request.")){
                    throw new Error(`Please change your network to ${import.meta.env.VITE_NETWORK}`);    
                }
                else if(containsString(switchError, "Unrecognized chain ID")){
                    try{
                        await addNetwork();
                    }
                    catch(error){
                        console.log('stuff should happen here');
                        throw new Error(`It seems you declined to add network}`);
                    }
                }
                else{
                    throw new Error(`${switchError}`);
                }
            }
        }
    }
}
export {checkAndSwitchNetwork}