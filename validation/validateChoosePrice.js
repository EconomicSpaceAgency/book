import { ethers } from 'ethers';

let periphery = import.meta.env.VITE_PERIPHERY_PRICE;
let peripheryBookPrice = import.meta.env.VITE_PERIPHERY_BOOK_PRICE;
let imperialCorePrice = import.meta.env.VITE_IMPERIAL_CORE_PRICE;
let imperialCoreBookPrice = import.meta.env.VITE_IMPERIAL_CORE_BOOK_PRICE;

const validateChoosePrice = (choosenPriceWei) => {

    let peripheryPackageBeforeRounding = Number(periphery) + Number(peripheryBookPrice);
    let peripheryPackage = Number(peripheryPackageBeforeRounding.toFixed(4));
    let imperialPackage = Number(imperialCorePrice) + Number(imperialCoreBookPrice);

    if(choosenPriceWei == periphery){
      choosenPriceWei = ethers.parseEther(periphery.toString());
    }
    else if(choosenPriceWei == peripheryPackage){
      choosenPriceWei = ethers.parseEther(peripheryPackage.toString());
    }
    else if(choosenPriceWei == imperialCorePrice){
      choosenPriceWei = ethers.parseEther(imperialCorePrice.toString());
    }
    else if(choosenPriceWei == imperialPackage){
      choosenPriceWei = ethers.parseEther(imperialPackage.toString());
    }
    else{
      choosenPriceWei = ethers.parseEther(imperialCorePrice.toString());
    }
    return choosenPriceWei;
};
export {validateChoosePrice};