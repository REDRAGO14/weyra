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

    // Fixed Navbar (Optimized)
    let ticking = false;
    let navbar = $('.fixed-top');
    let prevScrollTop = 0;

    $(window).scroll(function () {
        prevScrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });

    function updateNavbar() {
        let currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;

        if ($(window).width() < 992) {
            navbar.toggleClass('bg-dark shadow', currentScrollTop > 45);
        } else {
            navbar.toggleClass('bg-dark shadow', currentScrollTop > 45);
            navbar.css('top', currentScrollTop > 45 ? -45 : 0);
        }
        ticking = false;
    }

    // Back to top button (Optimized)
    $(window).scroll(function () {
        if ($(this).scrollTop() > 300) {
            $('.back-to-top').fadeIn('slow');
        } else {
            $('.back-to-top').fadeOut('slow');
        }
    });
    $('.back-to-top').click(function () {
        $('html, body').animate({ scrollTop: 0 }, 1500, 'easeInOutExpo');
        return false;
    });

    // Causes progress (using Intersection Observer)
    const progressBars = document.querySelectorAll('.progress .progress-bar');

    const progressObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.width = entry.target.getAttribute('aria-valuenow') + '%';
                progressObserver.unobserve(entry.target); // Optional: Stop observing once animated
            }
        });
    }, { threshold: 0.8 }); // Adjust threshold as needed (0.8 = 80%)

    progressBars.forEach(progressBar => {
        progressObserver.observe(progressBar);
    });


    // Testimonials carousel
    $(".testimonial-carousel").owlCarousel({
        autoplay: false,
        smartSpeed: 1000,
        center: true,
        dots: false,
        loop: true,
        nav: true,
        navText: [
            '<i class="bi bi-arrow-left"></i>',
            '<i class="bi bi-arrow-right"></i>'
        ],
        responsive: {
            0: {
                items: 1
            },
            768: {
                items: 2
            }
        }
    });


    // Video Popup
    const videoThumbnails = document.querySelectorAll('.video-thumbnail');
    const playButtons = document.querySelectorAll('.play-button');
    const videoPopups = document.querySelectorAll('.video-popup');
    const popupVideos = document.querySelectorAll('#popup-video');
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

    // Swiper
    const swiper = new Swiper('.swiper-container', {
        loop: true,
        slidesPerView: 'auto',
        spaceBetween: 5,
        centeredSlides: true,
        autoplay: {
            delay: 1000,
            disableOnInteraction: false,
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

    // Theme Switch
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;

    themeSwitch.addEventListener('change', () => {
        body.classList.toggle('dark-mode');
    });

    // Form Submission (with Toastr) - WITH CHECK
    toastr.options = {  // Toastr options (customize as needed)
        "closeButton": false,
        "debug": false,
        "newestOnTop": false,
        "progressBar": true,
        "preventDuplicates": false,
        "positionClass": "toast-top-right",
        "onclick": null,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "5000", // Adjust timeout as needed
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "linear",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    };
    
    document.addEventListener('DOMContentLoaded', function() { // Inside DOMContentLoaded

        if (window.location.pathname === '/contact.html' || window.location.pathname.includes('/contact.html')) { // Check if on contact page or a sub directory of contact page
            const form = document.getElementById('myForm');
    
            if (form) { // Check if the form exists (still important!)
                form.addEventListener('submit', function(event) {
                    event.preventDefault(); // Keep this inside the event listener
    
                    const formData = new FormData(form);
    
                    fetch(form.action, {
                        method: form.method,
                        body: formData,
                        headers: {
                            'Accept': 'application/json'
                        }
                    })
                    .then(response => {
                        if (!response.ok) {
                            return response.json().then(err => {throw new Error(err.message)});
                        }
                        return response.json();
                    })
                    .then(data => {
                        toastr.success("Message sent successfully!"); // Toastr success
                        form.reset();
                    })
                    .catch(error => {
                        toastr.error("Error: " + error.message);  // Toastr error
                        console.error('Error:', error); // Keep console error for debugging
                    });
    
                });
            } else {
                console.error("Contact form not found on this page.");
            }
        }
    
        // ... Other code that is common to ALL pages (GLightbox, etc.) can go here ...
    
    });


    $(document).ready(function () { // ONLY ONE $(document).ready()

        // Timeline Animation
        const timelineContainers = document.querySelectorAll('.timeline-container');
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, { threshold: 0.5 });
        timelineContainers.forEach(container => {
            observer.observe(container);
        });

    // "See More" Button Click Handler (Using jQuery Event Delegation)
        $(document).on('click', '.see-more', function (event) {
            const targetURL = $(this).data('target'); // Use jQuery's data()
            console.log("Button clicked!");
            console.log("Target URL:", targetURL);

            document.getElementById('portfolio').style.opacity = 0;

            setTimeout(() => {
                window.location.href = targetURL;
            }, 300);

            event.preventDefault();
        });
        const lightbox = GLightbox({
            selector: '.glightbox',
            touchNavigation: true,
            // loop: true,  // If you want looping
            closeOnOutsideClick: true,
            zoomable: true,
            // draggable: true, // If you want dragging
            slideTransitionSpeed: 300,
            openEffect: 'zoom',
            closeEffect: 'zoom',
            captions: true,  // Enable captions
            
            // ... any other options ...
        });
        // ... (Your other code that needs to run when the DOM is ready) ...
        // ... (Timeline animation code, etc.) ...

    }); // End of $(document).ready()

})(jQuery);
