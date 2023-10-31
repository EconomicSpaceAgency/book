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

    if (currentNetworkId !== expectedNetworkIdNumber) {
        try {
            await window.ethereum.request({ method: 'wallet_switchEthereumChain', params: [{ chainId: expectedNetworkId }] });
        } catch (switchError) {
            throw new Error(`Please change your network to ${import.meta.env.VITE_NETWORK}`);
        }
    }
}
export {checkAndSwitchNetwork}