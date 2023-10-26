function closeSubmenus(){
    const anchorElements = document.querySelectorAll('#secondaryNav a');

    // Add a click event listener to each anchor element
    anchorElements.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Prevent the default behavior of the anchor element (e.g., navigating to a different page)
            // Get the parent nav element of the clicked anchor
            const parentNav = anchor.closest('.secondaryNavMenu');

            // Remove the 'activeSecondaryMenu' class from the parent nav element
            parentNav.classList.remove('activeSecondaryMenu');
        });
    });
}
export {closeSubmenus}