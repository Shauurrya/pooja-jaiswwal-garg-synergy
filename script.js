/**
 * Synergy Counselling Website
 * Enhanced Interactive JavaScript
 * Author: Pooja Jaiswwal Garg - Synergy
 */

document.addEventListener("DOMContentLoaded", function () {

    // ==========================================
    // Preloader
    // ==========================================
    const preloader = document.getElementById("preloader");

    window.addEventListener("load", () => {
        setTimeout(() => {
            if (preloader) {
                preloader.classList.add("hidden");
            }
            document.body.classList.add("loaded");
        }, 500);
    });

    // ==========================================
    // Typing Effect - Hero Section
    // ==========================================
    const typingElement = document.getElementById("typing-text");
    if (typingElement) {
        const phrases = [
            "Synergy Counselling",
            "Your Wellness Partner",
            "Mental Health Advocate",
            "Here to Help You"
        ];
        let phraseIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 100;
        const deletingSpeed = 50;
        const pauseBetween = 2000;

        function typeWriter() {
            const currentPhrase = phrases[phraseIndex];

            if (isDeleting) {
                typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
                charIndex++;
            }

            let delay = isDeleting ? deletingSpeed : typingSpeed;

            if (!isDeleting && charIndex === currentPhrase.length) {
                delay = pauseBetween;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                phraseIndex = (phraseIndex + 1) % phrases.length;
                delay = 500;
            }

            setTimeout(typeWriter, delay);
        }

        // Start typing effect
        setTimeout(typeWriter, 500);
    }

    // ==========================================
    // Collapsible Sections (Mobile)
    // ==========================================

    // Helper function to setup collapsible toggle
    function setupCollapsibleToggle(toggleId, listId) {
        const toggle = document.getElementById(toggleId);
        const list = document.getElementById(listId);

        if (toggle && list) {
            toggle.addEventListener('click', function () {
                const isExpanded = this.getAttribute('aria-expanded') === 'true';

                this.setAttribute('aria-expanded', !isExpanded);
                list.classList.toggle('expanded');

                // Smooth scroll to keep button in view after collapse
                if (isExpanded) {
                    setTimeout(() => {
                        this.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    }, 300);
                }
            });
        }
    }

    // Setup all collapsible sections
    setupCollapsibleToggle('reach-out-toggle', 'reach-out-items');
    setupCollapsibleToggle('expertise-toggle', 'expertise-items');
    setupCollapsibleToggle('testimonials-toggle', 'testimonials-items');

    // ==========================================
    // Navigation - Scroll Effects
    // ==========================================
    const nav = document.getElementById("main-nav");
    const navToggle = document.getElementById("nav-toggle");
    const navLinks = document.querySelectorAll(".nav-links a");

    // Scroll-based navigation styling
    let lastScroll = 0;
    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (nav) {
            if (currentScroll > 100) {
                nav.classList.add("scrolled");
            } else {
                nav.classList.remove("scrolled");
            }

            // Hide/show nav on scroll direction
            if (currentScroll > lastScroll && currentScroll > 500) {
                nav.classList.add("nav-hidden");
            } else {
                nav.classList.remove("nav-hidden");
            }
        }

        lastScroll = currentScroll;
    });

    // Mobile navigation toggle
    if (navToggle) {
        navToggle.addEventListener("click", () => {
            nav.classList.toggle("nav-open");
            document.body.classList.toggle("nav-active");
        });
    }

    // Close mobile nav on link click
    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            nav.classList.remove("nav-open");
            document.body.classList.remove("nav-active");
        });
    });

    // ==========================================
    // Smooth Scroll for Anchor Links
    // ==========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==========================================
    // Image Carousel - Enhanced
    // ==========================================
    const images = document.querySelectorAll(".carousel-images img");
    const prevBtn = document.querySelector("#prevBtn");
    const nextBtn = document.querySelector("#nextBtn");
    const dotsContainer = document.getElementById("carousel-dots");
    let currentIndex = 0;
    let autoplayInterval;

    // Create dots
    if (dotsContainer && images.length > 0) {
        images.forEach((_, idx) => {
            const dot = document.createElement("button");
            dot.classList.add("carousel-dot");
            dot.setAttribute("aria-label", `Go to slide ${idx + 1}`);
            if (idx === 0) dot.classList.add("active");
            dot.addEventListener("click", () => goToSlide(idx));
            dotsContainer.appendChild(dot);
        });
    }

    const dots = document.querySelectorAll(".carousel-dot");

    function showImage(index) {
        images.forEach((img, idx) => {
            img.classList.remove("active");
            if (dots[idx]) dots[idx].classList.remove("active");
        });

        images[index].classList.add("active");
        if (dots[index]) dots[index].classList.add("active");
    }

    function nextImage() {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }

    function prevImage() {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    }

    function goToSlide(index) {
        currentIndex = index;
        showImage(currentIndex);
        resetAutoplay();
    }

    function startAutoplay() {
        // Auto-scroll every 4 seconds
        autoplayInterval = setInterval(nextImage, 4000);
    }

    function resetAutoplay() {
        clearInterval(autoplayInterval);
        startAutoplay();
    }

    if (nextBtn) nextBtn.addEventListener("click", () => { nextImage(); resetAutoplay(); });
    if (prevBtn) prevBtn.addEventListener("click", () => { prevImage(); resetAutoplay(); });

    // Start autoplay when page loads
    if (images.length > 0) {
        startAutoplay();
    }

    // Touch/swipe support for carousel
    let touchStartX = 0;
    let touchEndX = 0;
    const carouselContainer = document.querySelector(".carousel-images");

    if (carouselContainer) {
        carouselContainer.addEventListener("touchstart", (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        carouselContainer.addEventListener("touchend", (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        const diff = touchStartX - touchEndX;

        if (Math.abs(diff) > swipeThreshold) {
            if (diff > 0) {
                nextImage();
            } else {
                prevImage();
            }
            resetAutoplay();
        }
    }

    // Initialize carousel
    if (images.length > 0) {
        showImage(0);
        startAutoplay();
    }

    // ==========================================
    // Scroll Animations - Intersection Observer
    // ==========================================
    const animatedElements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Add staggered delay for multiple elements
                setTimeout(() => {
                    entry.target.classList.add('is-visible');
                }, index * 100);

                // Optionally unobserve after animation
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animatedElements.forEach(el => observer.observe(el));

    // ==========================================
    // Accordion/Details Animation
    // ==========================================
    const detailsElements = document.querySelectorAll('.details-item');

    detailsElements.forEach(el => {
        const summary = el.querySelector('summary');
        const content = el.querySelector('.details-content');

        summary.addEventListener('click', (e) => {
            e.preventDefault();

            // Close other open details
            detailsElements.forEach(other => {
                if (other !== el && other.hasAttribute('open')) {
                    const otherContent = other.querySelector('.details-content');
                    otherContent.style.maxHeight = '0';
                    setTimeout(() => {
                        other.removeAttribute('open');
                    }, 300);
                }
            });

            if (el.hasAttribute('open')) {
                // Closing
                content.style.maxHeight = '0';
                setTimeout(() => {
                    el.removeAttribute('open');
                }, 300);
            } else {
                // Opening
                el.setAttribute('open', '');
                content.style.maxHeight = content.scrollHeight + 'px';
            }
        });
    });

    // ==========================================
    // Back to Top Button
    // ==========================================
    const backToTopBtn = document.getElementById("back-to-top");

    if (backToTopBtn) {
        window.addEventListener("scroll", () => {
            if (window.pageYOffset > 500) {
                backToTopBtn.classList.add("visible");
            } else {
                backToTopBtn.classList.remove("visible");
            }
        });

        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }

    // ==========================================
    // Parallax Effect for Hero
    // ==========================================
    const hero = document.querySelector(".hero");

    if (hero) {
        window.addEventListener("scroll", () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;

            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = `${rate}px`;
            }
        });
    }

    // ==========================================
    // Number Counter Animation
    // ==========================================
    const statNumbers = document.querySelectorAll('.stat-number');

    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = target.textContent;
                const numericValue = parseInt(finalValue);

                if (!isNaN(numericValue) && numericValue > 0) {
                    animateCounter(target, numericValue, finalValue.includes('+'));
                }

                counterObserver.unobserve(target);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => counterObserver.observe(stat));

    function animateCounter(element, target, hasPlus) {
        let current = 0;
        const increment = target / 50;
        const duration = 2000;
        const stepTime = duration / 50;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                element.textContent = target + (hasPlus ? '+' : '');
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(current) + (hasPlus ? '+' : '');
            }
        }, stepTime);
    }

    // ==========================================
    // Floating Button Visibility
    // ==========================================
    const floatingBtn = document.querySelector(".floating-register-btn");
    const contactSection = document.getElementById("contact");

    if (floatingBtn && contactSection) {
        window.addEventListener("scroll", () => {
            const contactTop = contactSection.getBoundingClientRect().top;

            if (contactTop < window.innerHeight) {
                floatingBtn.classList.add("hidden");
            } else {
                floatingBtn.classList.remove("hidden");
            }
        });
    }

    // ==========================================
    // Hero Particles Animation (Optional)
    // ==========================================
    const particlesContainer = document.getElementById("hero-particles");

    if (particlesContainer) {
        for (let i = 0; i < 20; i++) {
            createParticle();
        }
    }

    function createParticle() {
        const particle = document.createElement("div");
        particle.classList.add("particle");

        const size = Math.random() * 10 + 5;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        particle.style.animationDelay = `${Math.random() * 5}s`;
        particle.style.animationDuration = `${Math.random() * 10 + 10}s`;

        particlesContainer.appendChild(particle);
    }

    // ==========================================
    // Active Navigation Link Highlighting
    // ==========================================
    const sections = document.querySelectorAll("section[id]");

    window.addEventListener("scroll", () => {
        const scrollY = window.pageYOffset;

        sections.forEach(section => {
            const sectionHeight = section.offsetHeight;
            const sectionTop = section.offsetTop - 100;
            const sectionId = section.getAttribute("id");
            const navLink = document.querySelector(`.nav-links a[href="#${sectionId}"]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add("active");
                } else {
                    navLink.classList.remove("active");
                }
            }
        });
    });

    // ==========================================
    // Preloader (Optional)
    // ==========================================
    window.addEventListener("load", () => {
        document.body.classList.add("loaded");

        // Trigger initial animations
        setTimeout(() => {
            document.querySelectorAll('.hero-content > *').forEach((el, i) => {
                el.style.animationDelay = `${0.2 * i}s`;
                el.classList.add('animate-in');
            });
        }, 300);
    });

    // ==========================================
    // Console Welcome Message
    // ==========================================
    console.log(
        '%c🧠 Synergy Counselling Website',
        'color: #1a5276; font-size: 24px; font-weight: bold;'
    );
    console.log(
        '%cYour mental wellness journey begins here.',
        'color: #d68910; font-size: 14px;'
    );
});
