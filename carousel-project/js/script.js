// This file contains the JavaScript code that implements the carousel functionality.

let colors = ['#FF5733', '#33FF57', '#3357FF', '#F3FF33', '#FF33A1'];
let currentIndex = 0;

function changeColor() {
    const carousel = document.querySelector('.carousel');
    carousel.style.backgroundColor = colors[currentIndex];
    currentIndex = (currentIndex + 1) % colors.length;
}

setInterval(changeColor, 1500);