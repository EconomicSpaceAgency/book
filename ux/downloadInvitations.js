function downloadInvitations() {

    var link2 = document.getElementById('invitation-link1').textContent;

    // Combine the links
    var combinedLinks = link2 + "\n";

    // Create a blob from the combined links
    var blob = new Blob([combinedLinks], { type: "text/plain;charset=utf-8" });

    // Create a temporary anchor element
    var tempLink = document.createElement("a");
    tempLink.href = URL.createObjectURL(blob);
    tempLink.download = "invitation.txt"; // suggest a filename for the download

    // Append the anchor to the body, trigger a click, and then remove it
    document.body.appendChild(tempLink);
    tempLink.click();
    document.body.removeChild(tempLink);

    // Assuming you want a similar feedback mechanism as the copy function
    // let downloadButton = document.getElementById('downloadButton');
    // let originalHtml = downloadButton.innerHTML;
    // downloadButton.innerHTML = "Downloaded";
    // setTimeout(() => {
    //     downloadButton.innerHTML = originalHtml;
    // }, 5000);  // 5000 milliseconds = 5 seconds
}

export { downloadInvitations };
