function getBenefitBasedOnId(id){
    const benefitsHigherTier = [
        `
        <p>
        <b>1. Creditation as a Co-Publisher</b>
        <br>
        <br>
        Co-publishing the unit you have chosen transforms this book-commodity into an open access publication. As a thank you, either your wallet address or your chosen name will be listed as a Co-Publisher of the book on this website and in the next PDF versions of the book.
        <br>
        <br>
        To have your Co-publisher credit appear as a human readable chosen name (and not your wallet address), please write that name here:
        <br>
        <br>
        <input type="text" placeholder="nonlinear economic space agent..." spellcheck="false" id="copublisherName">
        <p class="detailsError" id="copublisherError">Please fill name field</p>
        <br>
        <br>
        <button class="post-publisher-button" id="postPublisherButton">Post ➹</button>
        </p>
        `,
        `
        <p>
        <b>2. Access to the ECSA token multistake whitelist</b>
        <br>
        <br>
        Your unit grants you access to the ECSA token multistake whitelist (2024).
        <details> 
        <summary>Read more</summary>
        A certain number of ECSA tokens – which are the project’s capital market facing governance tokens – will be allocated to an option pool divided among all the unit holders. The unit thus functions as an early access right to the ECSA token multistake. Please follow our messaging at the <a href="https://t.me/economicspaceagency" target="_blank"> ECSA Telegram </a>, <a href="https://twitter.com/ecospaceagency" target="_blank"> ECSA Twitter </a>, and <a href="https://discord.gg/MWApYu2MR8" target="_blank"> Discourse Development Discord. </a>
        </details>
        </p>`,

        `
        <p>
        <b>3. Participation in the discourse development and in-person meetings</b>
        <br>
        <br>
        Your unit grants you access to the <a href="https://discord.gg/MWApYu2MR8" target="_blank"> Discourse Development Discord</a> , a community where unit holders will shape the discourse of the book by exchanging ideas, sharing insights and engaging in dialogue. 
        <details>
        <summary>Read more</summary>
        As part of the activities of the node, the ECSA team will curate public discussions with interesting guests as well as facilitate Q&A with the authors. The community that forms in the discord will shape its own future, with the possibility of becoming a DAO that holds a portion of the sale’s funds, or even becoming a node in the emerging ECSA economic network!<br>
        </p>
        </details>
        `,

        `
        <p>
        <b>4. Network curation </b>
        <br>
        <br>
        Your unit includes a unique code-link that enables up to 5 friends to co-publish themselves a new unit of discourse. We hope you will choose friends who you believe will be interested in the postcapitalist discourse. and whose participation will increase its value. But be quick, there are only 601 units available! 
        <br>
        <details>
        <summary>Read more</summary>
        Those you invite will gain all the rights of the unit holder once the unit is acquired, including their own invite link to share with their friends. The aim is to turn the process of co-publishing this book-object into a network: a living discourse on postcapitalist expression.
        </details>
        <br>
        <br>
        Your shareable invite-link is here, it can be used by max 5 different people to acquire one unit each:
        <br>
        </p>
        <div class="invitation-container-minimal">
        <p class="invitation-link" id="invitation-link1">
        https://postcapitalist.agency/?invitationId=HWjaYEr24AcMLzdhN4ycnKnhPvtRn4QNJKMuzu4BXexBHm6tsKmCQCUxqBudsxmK
        </p>
        </div>
        <div class="copyAndInvitationButtons">
            <button class="copy-button" id="copyButton">Copy ❑</button>
            <button class="download-button" id="downloadButton">Download ↓</button>
        </div>`,

        `<b>5. The book PDF with a unique generative cover </b>
        <br>
        <br>
        The unit gives you the right to download a PDF copy of the book with a unique generative cover.
        <br>
        <br>
        <a id="dl" href="ipfs://QmcHt8YqmA8Vhnfg946kDPRVUfRFo5y7T75nuJPBbXCAMV" target="_blank"><button id="downloadPDF" class="download-button">Download ↓</button></a>
        <br>
        <br>
        `,
        `
        <p>
        <b>6. The print book published by Minor Compositions / Autonomedia (Colchester / New York / Port Watson, 2023)</b>
        <br>
        <br>
        If you have selected it as an option, your unit includes the delivery of a physical special edition copy of the book delivered to your door.
        <br>
        <br>
        <label id="alreadyReceivedPhsyicalBookLabel">
        <input type="checkbox" name="tier" value="0.0001" class="custom-radio2" id="gdprAgreement">
        <span id="alreadyReceivedPhysicalBookChoise"></span> I agree to the collection and use of my mailing address for the purpose of receiving a print copy of the book.
        </label>
        <br>
        <br>
        Please leave your name and preferred delivery address here:
        <br>
        <br>
        Name
        <br>
        <input type="text" placeholder="Walter Gibson..." spellcheck="false" id="name">
        <br>
        Mailing address
        <br>
        <input type="text" placeholder="Rue Saint-Honoré 13/1..." spellcheck="false" id="mailingAddress">
        <br>
        Phone number (required by the delivery service)
        <br>
        <input type="text" placeholder="+386258472..." spellcheck="false" id="phoneNumber">
        <br>
        Contact
        <br>
        <input type="text" placeholder="contact@gmail.com / @telegram" spellcheck="false" id="contact">
        <p class="detailsError" id="detailsError">Please fill all the fields and provide consent about data</p>
        <br>
        <br>
        <button class="postDeliveryDetails" id="postDeliveryDetails">Send ➹</button>
        <br>
        Please notice that depending on your country, you might need to clear the customs before receiving the book.
        </p>
        `,
    ];
    return benefitsHigherTier[id];

}

// const benefitsHigherTier = [
//     `
//     <p>
//     <b>1. Creditation as a Co-Publisher <br> (an acknowledgement that you have played for the commons)</b>
//     <br>
//     <br>
//     Co-publishing the units transforms the book-commodity into an open access publication that everyone can read, listen and circulate. As a thank you, you (your wallet address or your chosen name) will be listed as a Co-Publisher of the book at the book website and in the next PDF version of the book.
//     <br>
//     <br>
//     <input type="text" placeholder="nonlinear economic space agent..." spellcheck="false" id="copublisherName">
//     <p class="detailsError" id="copublisherError">Please fill name field</p>
//     <br>
//     <br>
//     <button class="post-publisher-button" id="postPublisherButton">Post ➹</button>
//     </p>
//     `,
//     `
//     <p>
//     <b>2. Access to the ECSA token multistake whitelist</b>
//     <br>
//     <br>
//     Your unit grants you access to the ECSA token presale whitelist (target date: TBC). A certain number of ECSA tokens – which are the project’s capital market facing governance tokens – will be allocated to an option pool divided among all the unit holders. The unit thus functions as an early access right to ECSA token multistake. Please follow our messaging at the <a href="https://t.me/economicspaceagency" target="_blank"> ECSA Telegram </a>, <a href="https://twitter.com/ecospaceagency" target="_blank"> ECSA Twitter </a>, and <a href="https://discord.gg/MWApYu2MR8" target="_blank"> Discourse Development Discord. </a>
//     </p>`,

//     `
//     <p>
//     <b>3. Participation in the discourse development and IRL meets</b>
//     <br>
//     <br>
//     Your unit gives you the right to access the Discourse Development Discord, i.e., to participate in the development of the discourse by sharing your insights and engaging in the dialogue. This allows you to shape the discourse and contribute to the co-publishing of the book. We have curated public discussions with interesting guests and a Discord channel where we developed the discourse. You can also just hangaround. We also organise IRL meets. The next one is going to be in New York City in early December. Please follow notifications in the <a href="https://t.me/economicspaceagency" target="_blank"> ECSA Telegram </a>, <a href="https://twitter.com/ecospaceagency" target="_blank"> ECSA Twitter </a>, and <a href="https://discord.gg/MWApYu2MR8" target="_blank"> Discourse Development Discord. </a>.<br>
//     </p>
//     `,

//     `
//     <p>
//     <b>4. Network curation </b>
//     <br>
//     <br>
//     Your unit makes you a curator of this project. It offers you a code-link which can be used to invite friends to join the project. The first five people to use your invite-code will have the opportunity to participate in co-publishing the remaining units and become core members of the discourse’s development (i.e. the invite-code can be used by max 5 different people to acquire one unit). Your invitees gain all the unit holder's rights after acquiring their unit. 
//     The aim is to turn the book-object into a network: a living, spoken discourse on postcapitalist expression.
//     <br>
//     We hope you will choose friends who you believe will be interested in the postcapitalist discourse and whose participation will increase its value. But tell them to be decisive, there are only 601 units available!
//     <br>
//     <br>
//     Your sharable invite-link is here, it can be used by max 5 different people to acquire one unit:
//     <br>
//     </p>
//     <div class="invitation-container">
//     <pre class="asci" id="asciProtocols">
// ░█▀█░█▀▄░█▀█░▀█▀░█▀█░█▀▀░█▀█░█░░░█▀▀░░                    
// ░█▀▀░█▀▄░█░█░░█░░█░█░█░░░█░█░█░░░▀▀█░░                    
// ░▀░░░▀░▀░▀▀▀░░▀░░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░░                    
// ░█▀▀░█▀█░█▀▄░░                                            
// ░█▀▀░█░█░█▀▄░░                                            
// ░▀░░░▀▀▀░▀░▀░░                                            
// ░█▀█░█▀█░█▀▀░▀█▀░█▀▀░█▀█░█▀█░▀█▀░▀█▀░█▀█░█░░░▀█▀░█▀▀░▀█▀░░
// ░█▀▀░█░█░▀▀█░░█░░█░░░█▀█░█▀▀░░█░░░█░░█▀█░█░░░░█░░▀▀█░░█░░░
// ░▀░░░▀▀▀░▀▀▀░░▀░░▀▀▀░▀░▀░▀░░░▀▀▀░░▀░░▀░▀░▀▀▀░▀▀▀░▀▀▀░░▀░░░
// ░█▀▀░█░█░█▀█░█▀▄░█▀▀░█▀▀░█▀▀░▀█▀░█▀█░█▀█                  
// ░█▀▀░▄▀▄░█▀▀░█▀▄░█▀▀░▀▀█░▀▀█░░█░░█░█░█░█                  
// ░▀▀▀░▀░▀░▀░░░▀░▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀▀▀░▀░▀                     
//     </pre>
//     <p class="discourse-unit-on-open-sea-text" id="discourse-unit-on-open-sea-text"> Your discourse unit on OpenSea: </p>
//     <p class="discourse-unit-on-open-sea-link" id="openSeaLink"> ipfs://QmcHt8YqmA8Vhnfg946kDPRVUfRFo5y7T75nuJPBbXCAMV/token.id </p>
//     <p class="discourse-node" id="discourse-node"> Your discourse node invitation link: </p>
//     <p class="discourse-node-link" id="discourse-node-link"> https://discord.gg/DpSb58ZqeS </p>
//     <p class="invitation-link-text" id="invitation-link-text"> Your invitation link: </p>
//     <p class="invitation-link" id="invitation-link1">
//     https://postcapitalist.agency/?invitationId=HWjaYEr24AcMLzdhN4ycnKnhPvtRn4QNJKMuzu4BXexBHm6tsKmCQCUxqBudsxmK
//     </p>
//     <p class="unique-pdf-link-text" id="unique-pdf-link-text"> Your unique pdf: </p>
//     <p class="unique-pdf-link" id="ipfsBookDownloadLink"> ipfs://QmcHt8YqmA8Vhnfg946kDPRVUfRFo5y7T75nuJPBbXCAMV/token.id </p>
//     <br>
//     </div>
//     <div class="copyAndInvitationButtons">
//         <button class="copy-button" id="copyButton">Copy ❑</button>
//         <button class="download-button" id="downloadButton">Download ↓</button>
//     </div>
//     <br>
//     <br>`,

//     `<b>5. The book PDF with a unique generative cover </b>
//     The unit gives you the right to download the book PDF with a unique generative cover. It will allow you to understand your unit of discourse’s meaning and relevance as part of the whole book. It assists you in determining the value of the token you hold.
//     <br>
//     <br>
//     Please download it <a id="dl" href="ipfs://QmcHt8YqmA8Vhnfg946kDPRVUfRFo5y7T75nuJPBbXCAMV" target="_blank">here!</a>
//     <br>
//     <br>
//     `,
//     `
//     <p>
//     <b>6. The print book published by Minor Compositions / Autonomedia (Colchester / New York / Port Watson, 2023)</b>
//     <br>
//     <br>
//     If you have so selected, your unit offers you also a special edition physical copy of the book delivered to your door.
//     <br>
//     <br>
//     Please leave here your name and address where you would like it be delivered:
//     <br>
//     <br>
//     Name
//     <br>
//     <input type="text" placeholder="Walter Gibson..." spellcheck="false" id="name">
//     <br>
//     Mailing address
//     <br>
//     <input type="text" placeholder="Rue Saint-Honoré 13/1..." spellcheck="false" id="mailingAddress">
//     <br>
//     Phone number (required by the delivery service)
//     <br>
//     <input type="text" placeholder="+386258472..." spellcheck="false" id="phoneNumber">
//     <br>
//     Contact
//     <br>
//     <input type="text" placeholder="contact@gmail.com / @telegram" spellcheck="false" id="contact">
//     <p class="detailsError" id="detailsError">Please fill all the fields</p>
//     <br>
//     <button class="postDeliveryDetails" id="postDeliveryDetails">Send ➹</button>
//     <br>
//     Please notice that depending on your country, you might need to clear the customs before receiving the book.
//     </p>
//     `,
// ];
export {getBenefitBasedOnId}