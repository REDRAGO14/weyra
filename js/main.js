(function ($) {
    "use strict";

    // Spinner
    var spinner = function () {
        setTimeout(function () {
            if ($('#spinner').length > 0) {
                $('#spinner').removeClass('show');
            }
        }, 1);
    };
    spinner();
    
    
    // Initiate the wowjs
    new WOW().init();


    // Fixed Navbar
    $(window).scroll(function () {
        if ($(window).width() < 992) {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow');
            } else {
                $('.fixed-top').removeClass('bg-dark shadow');
            }
        } else {
            if ($(this).scrollTop() > 45) {
                $('.fixed-top').addClass('bg-dark shadow').css('top', -45);
            } else {
                $('.fixed-top').removeClass('bg-dark shadow').css('top', 0);
            }
        }
    });
    
    
    // Back to top button
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');
        return false;
    });


    // Causes progress
    $('.causes-progress').waypoint(function () {
        $('.progress .progress-bar').each(function () {
            $(this).css("width", $(this).attr("aria-valuenow") + '%');
        });
    }, {offset: '80%'});


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav : true,
        navText : [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0:{
                items:1
            },
            768:{
                items:2
            }
        }
    });

    
})(jQuery);

const videoThumbnails = document.querySelectorAll('.video-thumbnail');
const playButtons = document.querySelectorAll('.play-button');
const videoPopups = document.querySelectorAll('.video-popup');
const popupVideos = document.querySelectorAll('#popup-video'); // Use ID selector, but still query all
const closeButtons = document.querySelectorAll('.close-button');


videoThumbnails.forEach((videoThumbnail, index) => {
    videoThumbnail.addEventListener('click', () => {
        const videoUrl = videoThumbnail.dataset.videoUrl;
        popupVideos[index].src = videoUrl;
        videoPopups[index].style.display = 'block';
        popupVideos[index].play();
    });
});

playButtons.forEach((playButton, index) => {
    playButton.addEventListener('click', () => {
        const videoUrl = videoThumbnails[index].dataset.videoUrl;
        popupVideos[index].src = videoUrl;
        videoPopups[index].style.display = 'block';
        popupVideos[index].play();
    });
});

closeButtons.forEach((closeButton, index) => {
    closeButton.addEventListener('click', () => {
        videoPopups[index].style.display = 'none';
        popupVideos[index].pause();
        popupVideos[index].currentTime = 0;
    });
});

videoPopups.forEach((videoPopup, index) => {
  videoPopup.addEventListener('click', (event) => {
    if (event.target === videoPopup) {
      videoPopups[index].style.display = 'none';
      popupVideos[index].pause();
      popupVideos[index].currentTime = 0;
    }
  });
});

const swiper = new Swiper('.swiper-container', {
    loop: true,
    slidesPerView: 'auto',
    spaceBetween: 5,
    centeredSlides: true,
    autoplay: { // Add autoplay settings
        delay: 1000, // Time between slides in milliseconds (3 seconds in this example)
        disableOnInteraction: false, // Set to true to stop autoplay on user interaction (e.g., dragging)
    },
    
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 10 },
        480: { slidesPerView: 2, spaceBetween: 15 },
        768: { slidesPerView: 3, spaceBetween: 20 },
        1024: { slidesPerView: 4, spaceBetween: 25 }
    }
});
const themeSwitch = document.getElementById('theme-switch');
const body = document.body;

themeSwitch.addEventListener('change', () => {
  body.classList.toggle('dark-mode');
  // You might want to store the user's preference in localStorage
});