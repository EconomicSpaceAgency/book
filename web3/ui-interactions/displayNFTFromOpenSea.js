import {getAnNFTViaOpenSea } from '../../ux/getAnNFTViaOpenSea';

const displayNFTImageFromOpenSea = async (tokenId) => {
    try {
        // we won't need this anymore
        // await new Promise(resolve => setTimeout(resolve, 2000));
        // we won't need this anymore
        // let nft = await getAnNFTViaOpenSea(tokenId);
        let nftImage = document.getElementById('nft-image');
        let nftOpenSeaUrl = document.getElementById('nft-open-sea');

        if(nftImage){
          nftImage.src = `imgs/${tokenId}.png`;
        }
      
        let url = import.meta.env.VITE_NETWORK == 'sepolia' ? 'testnets.opensea.io' : 'opensea.io'; 
        const final = `https://${url}/assets/${import.meta.env.VITE_NETWORK}/${import.meta.env.VITE_NFT_CONTRACT_ADDRESS}/${tokenId}`;
        
        if(nftOpenSeaUrl){
          nftOpenSeaUrl.href = final;
          nftOpenSeaUrl.target = "_blank";
        }
      } catch (error) {
        console.log('displaying NFT as as an image from OpenSea silently failed. Reason: ', error.message);
      }
};
export {displayNFTImageFromOpenSea};
