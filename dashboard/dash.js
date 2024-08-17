
document.addEventListener("DOMContentLoaded", function() {
    const body = document.querySelector('body'); // Get the body element using querySelector
    const toggleButton = document.querySelector('#toggleButton'); // Get the button element using querySelector
    const lightFontColor = document.querySelector('#dark-mode-color'); // Get the button element using querySelector

    toggleButton.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        lightFontColor.classList.toggle('light-font-color');
        mainHeadingDiv.classList.toggle('dark-header-main-heading');
    });
});