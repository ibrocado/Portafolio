var slideIndex = 0;
var isAutoSlideEnabled = true;
var touchStartX = 0; // Variable para almacenar la posición de inicio del toque

showSlide(slideIndex);

function changeSlide(n) {
   showSlide(slideIndex += n);
   if (isAutoSlideEnabled) {
      restartAutoSlide();
   }
}

function showSlide(n) {
   var slides = document.getElementsByClassName("slide");

   if (n >= slides.length) {
      slideIndex = 0;
   }

   if (n < 0) {
      slideIndex = slides.length - 1;
   }

   for (var i = 0; i < slides.length; i++) {
      slides[i].style.display = "none";
   }

   slides[slideIndex].style.display = "block";
}

function autoSlide() {
   changeSlide(1);
}

var interval = setInterval(autoSlide, 5000);

function restartAutoSlide() {
   clearInterval(interval);
   interval = setInterval(autoSlide, 5000);
}

var slideshowContainer = document.querySelector(".slideshow-container");
slideshowContainer.addEventListener("mouseenter", function () {
   isAutoSlideEnabled = false;
   clearInterval(interval);
});

slideshowContainer.addEventListener("mouseleave", function () {
   isAutoSlideEnabled = true;
   restartAutoSlide();
});

document.onkeydown = function (event) {
   event = event || window.event;
   if (event.keyCode == 37) {
      changeSlide(-1);
   } else if (event.keyCode == 39) {
      changeSlide(1);
   }
};

var slideImage = document.querySelector(".slide img"); // Selecciona la imagen de la diapositiva
slideImage.addEventListener("touchstart", function (event) {
   touchStartX = event.touches[0].clientX;
});

slideImage.addEventListener("touchend", function (event) {
   var touchEndX = event.changedTouches[0].clientX;
   var touchDiff = touchEndX - touchStartX;

   if (touchDiff > 20) {
      changeSlide(-1);
   } else if (touchDiff < -20) {
      changeSlide(1);
   }
});
