let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let sliderDom = carouselDom.querySelector('.carousel .list');
let listItemDom = document.querySelectorAll('.carousel .list .item');
let thumbnailDom = document.querySelector('.carousel .thumbnail');
let thumbnailItems = thumbnailDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

let timeRunning = 3000;
let timeAutoNext = 7000;
let runTimeout;

thumbnailDom.appendChild(thumbnailItems[0]);

console.log(timeDom, thumbnailItems, thumbnailDom, listItemDom, sliderDom, carouselDom, nextDom, prevDom);

nextDom.onclick = function() {
    showSlider('next'); // function we make
}

prevDom.onclick = function() {
    showSlider('prev');
}

let runAutoRun = setTimeout(() => {
    nextDom.click();
}, timeAutoNext);

function showSlider(type) {
    let sliderItems = document.querySelectorAll('.carousel .list .item');
    let thumbnailItems = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        sliderDom.appendChild(sliderItems[0]);
        thumbnailDom.appendChild(thumbnailItems[0]);
        carouselDom.classList.add('next');
    } else {
        let positionLastItem = sliderItems.length - 1;
        sliderDom.prepend(sliderItems[positionLastItem]);
        thumbnailDom.prepend(thumbnailItems[positionLastItem]);
        carouselDom.classList.add('prev');
    }


    clearTimeout(runTimeout)
    runTimeout = setTimeout(() => {
        carouselDom.classList.remove('next');
    }, timeRunning);

    clearTimeout(runAutoRun);
    runAutoRun = setTimeout(() => {
        nextDom.click();
    }, timeAutoNext)
}