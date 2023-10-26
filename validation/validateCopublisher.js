function validateCopublisher() {
    let copublisherName = document.getElementById("copublisherName");
    let copublisherError = document.getElementById("copublisherError");

    if (!copublisherName.value.trim()) {
        copublisherError.style.display = "block";
    }
}
export {validateCopublisher}