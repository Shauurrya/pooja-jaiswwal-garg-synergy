document.addEventListener("DOMContentLoaded", function () {
    
    // --- Typing Effect ---
    const typingElement = document.getElementById("typing-text");
    if (typingElement) {
        const text = "Pooja Jaiswwal Garg - Synergy";
        let i = 0;
        const speed = 120;
        const pause = 3000;

        function typeWriter() {
            if (i < text.length) {
                typingElement.innerHTML += text.charAt(i);
                i++;
                setTimeout(typeWriter, speed);
            } else {
                setTimeout(() => {
                    typingElement.innerHTML = "";
                    i = 0;
                    typeWriter();
                }, pause);
            }
        }
        typeWriter();
    }

    // --- Image Carousel ---
    const images = document.querySelectorAll(".carousel img");
    const prevBtn = document.querySelector("#prevBtn");
    const nextBtn = document.querySelector("#nextBtn");
    let index = 0;

    function showImage(i) {
        images.forEach((img, idx) => {
            img.classList.remove("active");
            if (idx === i) {
                img.classList.add("active");
            }
        });
    }

    function nextImage() {
        index = (index + 1) % images.length;
        showImage(index);
    }

    function prevImage() {
        index = (index - 1 + images.length) % images.length;
        showImage(index);
    }

    nextBtn.addEventListener("click", nextImage);
    prevBtn.addEventListener("click", prevImage);

    showImage(index); // Show the first image initially

    setInterval(nextImage, 5000); // Auto-rotate every 5 seconds


    // --- Scroll Animations ---
    const animatedElements = document.querySelectorAll('.animate-on-scroll');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });
    animatedElements.forEach(el => observer.observe(el));

    // --- Smooth Accordion Animation ---
    const detailsElements = document.querySelectorAll('.details-item');
    detailsElements.forEach(el => {
        el.addEventListener('summary', (event) => {
            const summary = el.querySelector('summary');
            if (el.hasAttribute('open')) {
                event.preventDefault();
                const content = el.querySelector('.details-content');
                const animation = content.animate({ height: [content.offsetHeight + 'px', '0px'] }, {
                    duration: 300,
                    easing: 'ease-out'
                });
                animation.onfinish = () => el.removeAttribute('open');
            }
        });
    });
});
