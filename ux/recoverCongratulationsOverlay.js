import { ethers } from 'ethers';
import { connect } from '../web3/blocknative/index';
import { checkAndSwitchNetwork } from './checkAndSwitchNetwork';
import { openCongratzOverlay } from './openCongratzOverlay';
import { getDetailsByWallet } from '../db/details.js'
import { displayNFTImageFromOpenSea } from '../web3/ui-interactions/displayNFTFromOpenSea';
import { displayNonHolderOverlay } from './displayNonHolderOverlay.js';

async function recoverCongratulationsOverlay(){
    let wallets = null;
    let provider;
    let connected = false;
    wallets = await connect();
    let address = null;

    if(wallets){
        if(wallets[0]){
            connected = true;
            provider = new ethers.BrowserProvider(wallets[0].provider, 'any');
            address = wallets[0].accounts[0].address;
            try {
                await checkAndSwitchNetwork(provider);
            } catch (error) {
                displayError(error.message);
                revertWaitingForTransactionToInitiate();
                return;
            }
        }
        else{
            
            // wallets = await connect();
            displayError('Please connect with one of the available wallet providers');
            return;
        }
    
    }

    let woChecksum = wallets[0].accounts[0].address;
    localStorage.setItem('wallet', ethers.getAddress(woChecksum));

    let wallet = localStorage.getItem("wallet");
    let details = await getDetailsByWallet(wallet);

    // if we cannot find the details in database;

    let tokenId = parseInt(localStorage.getItem('tokenId'));
    let pbi = localStorage.getItem('pbi') === 'true';
    let price = localStorage.getItem('price');
    let invitation = localStorage.getItem('invitation');

    if(details[0] == undefined || tokenId == undefined){
        displayNonHolderOverlay();
        // window.open('https://economic-space-agency.gitbook.io/about-co-publishing-units-of-discourse/discourse-generating-rights-benefits', '_blank').focus();
    }else{
        openCongratzOverlay();
        displayNFTImageFromOpenSea(details[0].token_id);
    }

}


window.recoverCongratulationsOverlay = recoverCongratulationsOverlay;
export {recoverCongratulationsOverlay}