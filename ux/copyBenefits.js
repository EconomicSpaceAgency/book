function copyBenefits() {
    let asciText = document.getElementById('asciProtocols').textContent;
    // Get the contents of the three elements
    let text1 = document.getElementById('discourse-unit-on-open-sea-text').textContent;
    var link1 = document.getElementById('openSeaLink').textContent;
    let text2 = document.getElementById('discourse-node').textContent;
    let link2 = document.getElementById('discourse-node-link').textContent;
    let text3 = document.getElementById('invitation-link-text').textContent;
    var link3 = document.getElementById('invitation-link1').textContent;
    let text4 = document.getElementById('unique-pdf-link-text').textContent;
    var link4 = document.getElementById('ipfsBookDownloadLink').textContent;

    // Combine the links
    var combinedLinks = asciText + "\n" + text1 + "\n" + link1 + "\n" + text2 + "\n" + link2 + "\n" + text3 + "\n" + link3 + "\n" + text4 + "\n" + link4;
    // var combinedLinks = link1 + "\n";


    // Use the Clipboard API to copy the combined text
    navigator.clipboard.writeText(combinedLinks);

    let copyButton = document.getElementById('copyButton');

    // Store the current innerHTML so we can revert it later
    let originalHtml = copyButton.innerHTML;

    // Change the innerHTML
    copyButton.innerHTML = "Coppied";

    // Set a timeout to revert the innerHTML after 3 seconds
    setTimeout(() => {
        copyButton.innerHTML = originalHtml;
    }, 5000);  // 5000 milliseconds = 5 seconds

}
export {copyBenefits}