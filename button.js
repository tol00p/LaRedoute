const closedFace = document.querySelector('.closed');
const openFace = document.querySelector('.open');

// Add event listener

closedFace.addEventListener("click", function() {
    closedFace.classList.remove('active')
    openFace.classList.add('active')
});

openFace.addEventListener("click", function() {
    closedFace.classList.add('active')
    openFace.classList.remove('active')
});
