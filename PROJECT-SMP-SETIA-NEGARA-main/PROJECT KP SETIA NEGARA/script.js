// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#2c5aa0';
        navbar.style.boxShadow = '0 4px 30px rgb(255, 255, 255)';
    } else {
        navbar.style.background = '#2c5aa0';
        navbar.style.boxShadow = '0 2px 20px rgb(255, 255, 255)';
    }
});

// Smooth Scrolling untuk Nav Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Slider Functionality
let currentSlideIndex = 1;
let slideInterval;

function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.nav-dot');

    if (slides.length === 0) return;

    if (n > slides.length) currentSlideIndex = 1;
    if (n < 1) currentSlideIndex = slides.length;

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    slides[currentSlideIndex - 1].classList.add('active');
    if (dots[currentSlideIndex - 1]) {
        dots[currentSlideIndex - 1].classList.add('active');
    }
}

function currentSlide(n) {
    clearInterval(slideInterval);
    currentSlideIndex = n;
    showSlide(n);
    startSlider();
}

function nextSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

function startSlider() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// DOM READY
document.addEventListener('DOMContentLoaded', function() {

    // slider utama
    showSlide(currentSlideIndex);
    startSlider();

    if (window.GuruData) {
        GuruData.renderHomeTeacherSlider();
        GuruData.renderTeacherListPage();
        GuruData.renderTeacherDetailPage();
    }
    if (window.PrestasiData) {
        PrestasiData.renderPrestasiPage();
    }
    if (window.KontenData) {
        KontenData.renderPages();
    }

    // Navbar active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    // ===============================
    // POPUP ANNOUNCEMENT (CUMA SEKALI)
    // ===============================
    const popup = document.getElementById("popup-info");

    if (popup) {

        const closeBtn = document.querySelector(".close-btn");
        const slides = document.querySelectorAll(".popup-slide");
        const nextBtn = document.querySelector(".next");
        const prevBtn = document.querySelector(".prev");

        let slideIndex = 0;

        // tampil hanya sekali per tab
        if (!sessionStorage.getItem("popupShown")) {
            popup.style.display = "flex";
            sessionStorage.setItem("popupShown", "true");
        } else {
            popup.style.display = "none";
        }

        function showPopupSlide(index){
            slides.forEach(slide => slide.classList.remove("active"));
            if (slides[index]) slides[index].classList.add("active");
        }

        function nextPopupSlide(){
            slideIndex++;
            if(slideIndex >= slides.length){
                slideIndex = 0;
            }
            showPopupSlide(slideIndex);
        }

        function prevPopupSlide(){
            slideIndex--;
            if(slideIndex < 0){
                slideIndex = slides.length - 1;
            }
            showPopupSlide(slideIndex);
        }

        showPopupSlide(slideIndex);

        if(nextBtn) nextBtn.addEventListener("click", nextPopupSlide);
        if(prevBtn) prevBtn.addEventListener("click", prevPopupSlide);

        if(closeBtn){
            closeBtn.addEventListener("click", function(){
                popup.style.display = "none";
            });
        }

        // klik luar card = close
        popup.addEventListener("click", function(e){
            if(e.target === popup){
                popup.style.display = "none";
            }
        });

        setInterval(nextPopupSlide, 8000);
    }

    // burger menu
    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("navMenu");

    if (burger && navMenu) {
        burger.addEventListener("click", function(){
            navMenu.classList.toggle("active");
        });
    }

    // galeri guru slider
    const slider = document.getElementById("slider");
    const track = document.getElementById("track");

    if (slider && track) {

        if (track.children.length > 0) {
            track.innerHTML += track.innerHTML;
        }

        let isDown = false;
        let isPaused = false;
        let startX = 0;
        let scrollLeft = 0;
        const speed = 0.8;

        function autoSlide() {
            if (!isPaused && !isDown) {
                slider.scrollLeft += speed;

                if (slider.scrollLeft >= track.scrollWidth / 2) {
                    slider.scrollLeft = 0;
                }
            }
            requestAnimationFrame(autoSlide);
        }

        autoSlide();

        slider.addEventListener("mouseenter", () => isPaused = true);
        slider.addEventListener("mouseleave", () => isPaused = false);

        slider.addEventListener("mousedown", (e) => {
            isDown = true;
            startX = e.pageX;
            scrollLeft = slider.scrollLeft;
            slider.style.cursor = "grabbing";
        });

        window.addEventListener("mouseup", () => {
            isDown = false;
            slider.style.cursor = "grab";
        });

        slider.addEventListener("mousemove", (e) => {
            if (!isDown) return;
            const walk = (e.pageX - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });

        slider.addEventListener("touchstart", (e) => {
            isDown = true;
            startX = e.touches[0].pageX;
            scrollLeft = slider.scrollLeft;
        });

        slider.addEventListener("touchend", () => isDown = false);

        slider.addEventListener("touchmove", (e) => {
            if (!isDown) return;
            const walk = (e.touches[0].pageX - startX) * 2;
            slider.scrollLeft = scrollLeft - walk;
        });
    }
});

// Modal
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    if (modal) {
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    }
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// loading
window.addEventListener("load", function(){
    document.body.classList.add('loaded');

    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        if(preloader) preloader.classList.add("hide");
    }, 500);
});
