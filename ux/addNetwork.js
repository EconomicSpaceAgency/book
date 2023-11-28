async function addNetwork() {
    // Check if MetaMask is installed
    if (window.ethereum) {
      try {
        // Request to add Polygon chain
        await window.ethereum.request({
          method: 'wallet_addEthereumChain',
          params: [
            {
              chainId: '0x89', // Chain ID must be in hexadecimal numbers
              chainName: 'Polygon Mainnet',
              nativeCurrency: {
                name: 'MATIC',
                symbol: 'MATIC', // 2-6 characters long
                decimals: 18,
              },
              rpcUrls: ['https://polygon-rpc.com/'], // Official RPC URL
              blockExplorerUrls: ['https://polygonscan.com/'], // Block Explorer URL
              iconUrls: ['https://polygon.technology/media-kit/matic-token-icon.svg'], // Icon URL, optional
            },
          ],
        });
      } catch (addError) {
        // Handle the error
        console.error('Error adding Polygon network', addError);
        throw new Error('It seems that you declined to add Polygon network');
      }
    } else {
      console.log('MetaMask is not installed. Please consider installing it: https://metamask.io/download.html');
    }
  }
  
export {addNetwork}  