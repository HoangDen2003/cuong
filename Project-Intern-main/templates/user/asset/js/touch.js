const touchOn = document.getElementById('touch-on');
const touchOut = document.getElementById('touch-out');
const sticker = document.getElementById('sticker');
const overlaySticker = document.querySelector(".overlay-sticker");

touchOn.addEventListener('click', function () {
    sticker.classList.toggle('active');
});

touchOut.addEventListener('click', function () {
    sticker.classList.remove('active');
});

overlaySticker.addEventListener('click', function () {
sticker.classList.remove('active');
});