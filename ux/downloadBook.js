// import {ipfsClient} from 'ipfs-http-client';
// const ipfs = ipfsClient('https://ipfs.infura.io:5001/2WDYbyIBujCeVOFBkXngmlJOAge');
// const ipfsHash = import.meta.env.VITE_DOWNLOAD_BOOK_IPFS_HASH;

// async function downloadBook() {
//     let tokenIdFromLocalStorage = localStorage.getItem('tokenId');
//     try {
//         const fileBuffer = await ipfs.cat(ipfsHash);

//         const blob = new Blob([fileBuffer.buffer], { type: 'application/pdf' }); // Assuming it's a PDF. Adjust the MIME type accordingly.
//         const downloadUrl = URL.createObjectURL(blob);

//         let a = document.getElementById('dl');

//         if(a && tokenIdFromLocalStorage){
//             a.href = downloadUrl;
//             a.download = 'book.pdf'; // Provide a default name. Could be dynamic based on the book.

//             document.body.appendChild(a);
//             a.click();
//         }

//         window.URL.revokeObjectURL(downloadUrl);
//     } catch (error) {
//         console.error("Error fetching file from IPFS:", error);
//     }
// }
// export {downloadBook}
