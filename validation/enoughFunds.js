import { isBalanceLessThan } from '../web3/isBalanceLessThan';
async function enoughFunds(address, choosenPrice){
    const notEnoughFunds = await isBalanceLessThan(address, choosenPrice);
    // if user have enough funds
    if(notEnoughFunds){
        return false;
        let error = `It seems that you don't have enough funds in your wallet. <a href="https://economic-space-agency.gitbook.io/about-co-publishing-units-of-discourse/faq#where-can-i-get-matic" target="_blank"> Consider getting some MATIC </a>`;
        // revertWaitingForTransactionToInitiate();
        // displayError(error);
        // return;
    }
    else return true;
}
export {enoughFunds}