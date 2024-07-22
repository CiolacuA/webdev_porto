document.addEventListener('DOMContentLoaded', function() {
    const testimonialSlides = Array.from(document.querySelectorAll('.testimonial-slide'));
    const totalSlides = testimonialSlides.length;
    let currentSlideIndex = null;
    let previousSlideIndex = null;
    let currentTimeout = null;
  
    function showRandomSlide() {
      const randomSlideIndex = getRandomSlideIndex();
      const selectedSlide = testimonialSlides[randomSlideIndex];
  
      // Reset previous slide
      if (currentSlideIndex !== null) {
        testimonialSlides[currentSlideIndex].classList.remove('active', 'fadeOut');
      }
  
      // Display new slide
      selectedSlide.classList.add('active', 'fadeIn');
      previousSlideIndex = currentSlideIndex;
      currentSlideIndex = randomSlideIndex;
  
      // Schedule next slide change after 5 seconds
      clearTimeout(currentTimeout);
      currentTimeout = setTimeout(showRandomSlide, 5000);
    }
  
    function getRandomSlideIndex() {
      let randomSlideIndex = Math.floor(Math.random() * totalSlides);
      if (randomSlideIndex === currentSlideIndex || randomSlideIndex === previousSlideIndex || randomSlideIndex === totalSlides - 1) {
        randomSlideIndex = getRandomSlideIndex();
      }
      return randomSlideIndex;
    }
  
    // Initially show a random slide after 2 seconds
    setTimeout(showRandomSlide, 1000);
  });
  