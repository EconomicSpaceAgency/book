let glowDurationTimer; // This will store the timer for glow duration
let lastGlowTime = 0; // To store the last time the glow effect occurred

function setEconomicMediaGlowListeners() {
    const containers = document.querySelectorAll('.available');
    const economicMediaButton = document.getElementById('bookOrbsButton');

    if (!economicMediaButton.classList.contains('activeButton')) {
        containers.forEach(container => {
            container.addEventListener('mouseover', function(event) {
                if (event.target.tagName === 'P' && event.target.style.filter !== 'none') {
                    // Check if the last glow was more than 3 seconds ago
                    const currentTime = new Date().getTime();
                    if (currentTime - lastGlowTime < 3000) return; // 3s glow restriction

                    lastGlowTime = currentTime; // Update the last glow time

                    handleMouseOver(economicMediaButton);

                    // Start the glow duration timer
                    glowDurationTimer = setTimeout(() => {
                        handleMouseOut(economicMediaButton);
                    }, 1000); // 1s glow duration
                }
            });

            container.addEventListener('mouseout', function(event) {
                if (event.target.tagName === 'P') {
                    // Clear the glow duration timer
                    clearTimeout(glowDurationTimer);
                    handleMouseOut(economicMediaButton);
                }
            });
        });
    }
}

function handleMouseOver(element) {
    if (!element.classList.contains('activeButton')) {
        element.style.background = 'white';
        element.style.boxShadow = '0 0 100px white';
        element.style.transition = 'background 1s ease, box-shadow 1s ease';
    } else {
        console.log('element is already active', element);
    }
}

function handleMouseOut(element) {
    // Clear the glow duration timer
    clearTimeout(glowDurationTimer);

    if (!element.classList.contains('activeButton')) {
        element.style.background = '';
        element.style.boxShadow = '';
    }
}

function removeEconomicMediaGlowListeners() {
    const containers = document.querySelectorAll('.available');

    containers.forEach(container => {
        container.removeEventListener('mouseover', handleMouseOver);
        container.removeEventListener('mouseout', handleMouseOut);
    });
}

export { setEconomicMediaGlowListeners, removeEconomicMediaGlowListeners }
