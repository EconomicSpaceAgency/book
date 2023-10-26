function displayError(errorMessage) {
    const mintingError = document.getElementById('tiersErrorMessage');
    mintingError.innerHTML = errorMessage;
    mintingError.style.display = "block";
}
export {displayError}