const track = document.querySelector('.slideshow-track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.slideshow-button-right');
const prevButton = document.querySelector('.slideshow-button-left');
const dotsNav = document.querySelector('.slideshow-nav'); 
const dots = Array.from(dotsNav.children);

const slideWidht = slides[0].getBoundingClientRect().width; //details fron the selected object(img), in this case the width

// arrange the slides next to each other
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidht * index + 'px';
};
slides.forEach(setSlidePosition);

const moveToSlide = (track, currentSlide, targetSlide) =>{
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide'); //erase the class from the actual element
    targetSlide.classList.add('current-slide');   // adds a new class to next next element
}

const updateDots =(currentDots, targetDot) => {
    currentDots.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
};
const hideShowArrows = (slides,prevButton, nextButton, targetIndex) =>{
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    } else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    } else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

// when i click right, move slides to the right

nextButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;

    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;

    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    //move to the next slide
   moveToSlide(track, currentSlide, nextSlide)
   updateDots(currentDot, nextDot);
   hideShowArrows(slides, prevButton, nextButton, nextIndex);
})

// when i click left, move slides to the left
prevButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;

    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide);
    updateDots(currentDot, prevDot);
    hideShowArrows(slides, prevButton, nextButton, prevIndex);
    //move to the prev slide
  
})

// when i click the indicators, move to that slides
dotsNav.addEventListener('click', e => {
    //what indicator was clicked on?
    const targetDot = e.target.closest('button'); //just works when we click on a botton and not when we click the <div>

    if (!targetDot) return; //if not a button then stop
    
    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide'); 
    const targetIndex = dots.findIndex(dot => dot === targetDot); //get the seleted dot index
    const targetSlide = slides[targetIndex];
    
    moveToSlide(track, currentSlide, targetSlide);

    updateDots(currentDot, targetDot);
    hideShowArrows(slides, prevButton, nextButton, targetIndex);

})

