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
    if (window.BiayaData) {
        BiayaData.renderBiayaPage();
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

        const originalCardCount = track.children.length;
        if (track.children.length > 0) {
            track.innerHTML += track.innerHTML;
        }

        const firstCard = track.children[0];
        const firstClonedCard = track.children[originalCardCount];
        const loopWidth = firstCard && firstClonedCard
            ? firstClonedCard.offsetLeft - firstCard.offsetLeft
            : track.scrollWidth / 2;

        let isDragging = false;
        let startX = 0;
        let lastPointerX = 0;
        let dragDistance = 0;
        let resumeAt = 0;
        const autoSlideInterval = 20;
        const autoSlideStep = 1;

        track.querySelectorAll("img, a").forEach((element) => {
            element.draggable = false;
        });

        slider.addEventListener("dragstart", (event) => event.preventDefault());

        const autoSlideTimer = window.setInterval(() => {
            if (isDragging || Date.now() < resumeAt) return;

            if (loopWidth <= slider.clientWidth) return;

            slider.scrollLeft += autoSlideStep;
            if (slider.scrollLeft >= loopWidth) {
                slider.scrollLeft = slider.scrollLeft - loopWidth;
            }
        }, autoSlideInterval);

        slider.addEventListener("pointerdown", (event) => {
            if (event.pointerType === "mouse" && event.button !== 0) return;

            isDragging = true;
            dragDistance = 0;
            startX = event.clientX;
            lastPointerX = event.clientX;
            resumeAt = Infinity;
            slider.classList.add("is-dragging");
            slider.setPointerCapture(event.pointerId);
        });

        slider.addEventListener("pointermove", (event) => {
            if (!isDragging) return;

            const pointerDelta = event.clientX - lastPointerX;
            const totalDistance = event.clientX - startX;
            let nextScrollLeft = slider.scrollLeft - pointerDelta;

            if (loopWidth > slider.clientWidth) {
                while (nextScrollLeft >= loopWidth) nextScrollLeft -= loopWidth;
                while (nextScrollLeft < 0) nextScrollLeft += loopWidth;
            }

            dragDistance = Math.max(dragDistance, Math.abs(totalDistance));
            slider.scrollLeft = nextScrollLeft;
            lastPointerX = event.clientX;
        });

        function stopDragging(event) {
            if (!isDragging) return;

            isDragging = false;
            slider.classList.remove("is-dragging");
            resumeAt = Date.now() + 1200;

            if (slider.hasPointerCapture(event.pointerId)) {
                slider.releasePointerCapture(event.pointerId);
            }
        }

        slider.addEventListener("pointerup", stopDragging);
        slider.addEventListener("pointercancel", stopDragging);
        slider.addEventListener("lostpointercapture", () => {
            if (!isDragging) return;
            isDragging = false;
            slider.classList.remove("is-dragging");
            resumeAt = Date.now() + 1200;
        });

        window.addEventListener("pagehide", () => {
            window.clearInterval(autoSlideTimer);
        }, { once: true });

        slider.addEventListener("click", (event) => {
            if (dragDistance > 6) {
                event.preventDefault();
                event.stopPropagation();
            }
            dragDistance = 0;
        }, true);
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
