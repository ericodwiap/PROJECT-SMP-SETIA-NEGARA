// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.background = '#08b7fcf2';
        navbar.style.boxShadow = '0 4px 30px rgb(255, 255, 255)';
    } else {
        navbar.style.background = '#08b7fcf2';
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
    
    if (n > slides.length) { currentSlideIndex = 1; }
    if (n < 1) { currentSlideIndex = slides.length; }
    
    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    slides[currentSlideIndex - 1].classList.add('active');
    dots[currentSlideIndex - 1].classList.add('active');
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

function prevSlide() {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
}

function startSlider() {
    slideInterval = setInterval(() => {
        nextSlide();
    }, 5000);
}

// Inisialisasi slider
document.addEventListener('DOMContentLoaded', function() {
    showSlide(currentSlideIndex);
    startSlider();
    
    // Navbar active link on scroll
    window.addEventListener('scroll', () => {
        let current = '';
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-link');
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
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
});

// Modal Functionality
function openModal(type) {
    const modal = document.getElementById(type + 'Modal');
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.style.display = 'none';
    });
    document.body.style.overflow = 'auto';
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
}

// Close modal with Escape key
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeModal();
    }
});

// Animate on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.banner-card, .profil-image img, .sambutan-image img');
    
    elements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            el.classList.add('animate');
        }
    });
}

window.addEventListener('scroll', animateOnScroll);
animateOnScroll();

// Tambahan CSS untuk animasi 
const style = document.createElement('style');
style.textContent = `
    .banner-card, .profil-image img, .sambutan-image img {
        opacity: 0;
        transform: translateY(50px);
        transition: all 0.8s ease-out;
    }
    
    .banner-card.animate,
    .profil-image img.animate,
    .sambutan-image img.animate {
        opacity: 1;
        transform: translateY(0);
    }
    
    .nav-link.active {
        color: #2c5aa0 !important;
        border-bottom: 2px solid #2c5aa0;
        padding-bottom: 5px;
    }
`;
document.head.appendChild(style);

// Loading Animation
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

//AUTO SLIDE ANNOUNCE
document.addEventListener("DOMContentLoaded", function(){

    const popup = document.getElementById("popup-info");
    const closeBtn = document.querySelector(".close-btn");
    const slides = document.querySelectorAll(".popup-slide");

    const nextBtn = document.querySelector(".next");
    const prevBtn = document.querySelector(".prev");

    let slideIndex = 0;

    function showSlide(index){
        slides.forEach(slide=>{
            slide.classList.remove("active");
        });

        slides[index].classList.add("active");
    }

    function nextSlide(){
        slideIndex++;

        if(slideIndex >= slides.length){
            slideIndex = 0;
        }

        showSlide(slideIndex);
    }

    function prevSlide(){
        slideIndex--;

        if(slideIndex < 0){
            slideIndex = slides.length - 1;
        }

        showSlide(slideIndex);
    }

    nextBtn.addEventListener("click", nextSlide);
    prevBtn.addEventListener("click", prevSlide);

    closeBtn.addEventListener("click", function(){
        popup.style.display = "none";
    });

    setInterval(nextSlide, 8000);

});

//burger function
document.addEventListener("DOMContentLoaded", function(){

    const burger = document.getElementById("burger");
    const navMenu = document.getElementById("navMenu");

    burger.addEventListener("click", function(){
        navMenu.classList.toggle("active");
    });

});

//preelouder
window.addEventListener("load", function(){
    const preloader = document.getElementById("preloader");

    setTimeout(() => {
        preloader.classList.add("hide");
    }, 500);
});


// FORM PENDAFTARAN
const pendaftaranForm = document.getElementById("pendaftaranForm");
const successMsg = document.getElementById("successMessage");

if (pendaftaranForm) {
    pendaftaranForm.addEventListener("submit", function(e) {
        e.preventDefault();

        pendaftaranForm.style.display = "none";
        successMsg.style.display = "block";
    });
}


document.addEventListener('DOMContentLoaded', () => {
  const slider = document.getElementById("slider");
  const track = document.getElementById("track");
  if (!slider || !track) return;

  // Duplicate untuk loop
  track.innerHTML += track.innerHTML;

  let isDown = false;
  let isPaused = false;
  let startX = 0;
  let scrollLeft = 0;
  const speed = 0.8;

  function autoSlide() {
    if (!isPaused && !isDown) {
      slider.scrollLeft += speed;

      // Reset tanpa patah
      if (slider.scrollLeft >= track.scrollWidth / 2) {
        slider.scrollLeft = 0;
      }
    }
    requestAnimationFrame(autoSlide);
  }
  autoSlide();

  // Hover pause
  slider.addEventListener("mouseenter", () => isPaused = true);
  slider.addEventListener("mouseleave", () => isPaused = false);

  // Mouse drag
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

  // Touch
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
});