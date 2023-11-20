async function insertCopublishingDetails() {
    // Retrieve and parse values from localStorage
    const tokenIdString = localStorage.getItem('tokenId');
    const tokenId = parseInt(tokenIdString, 10);
    const wallet = localStorage.getItem('wallet');
    const pbi = localStorage.getItem('pbi') === 'false' ? false : true;
    const priceString = localStorage.getItem('price');
    const price = parseInt(priceString, 10);
    const invitation = localStorage.getItem('invitation');

    // Perform error checking
    if (isNaN(tokenId) || isNaN(price)) {
        console.error('Invalid data from localStorage');
        return null; // or handle the error as needed
    }

    // Call insertIntoDetails and return its result
    return insertIntoDetails(tokenId, wallet, pbi, price, invitation);
}

// Usage
insertCopublishingDetails()
    .then(copublishingDetails => {
        if (copublishingDetails) {
            console.log('Data inserted successfully:', copublishingDetails);
        }
    })
    .catch(error => {
        console.error('Error during data insertion:', error);
    });
