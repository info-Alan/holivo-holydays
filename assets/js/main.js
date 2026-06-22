document.addEventListener('DOMContentLoaded', () => {
    /* === CUSTOM CURSOR === */
    const cursorDot = document.querySelector('.cursor-dot');
    const cursorOutline = document.querySelector('.cursor-outline');
    
    if (cursorDot && cursorOutline) {
        window.addEventListener('mousemove', (e) => {
            const posX = e.clientX;
            const posY = e.clientY;
            
            cursorDot.style.left = `${posX}px`;
            cursorDot.style.top = `${posY}px`;
            
            // Add slight delay to outline
            setTimeout(() => {
                cursorOutline.style.left = `${posX}px`;
                cursorOutline.style.top = `${posY}px`;
            }, 50);
        });

        // Hover effect for interactables
        const interactables = document.querySelectorAll('.interactable, a, button, .accordion-header');
        interactables.forEach(el => {
            el.addEventListener('mouseenter', () => document.body.classList.add('cursor-hover'));
            el.addEventListener('mouseleave', () => document.body.classList.remove('cursor-hover'));
        });
    }

    /* === PRELOADER & INITIAL ANIMATION === */
    window.addEventListener('load', () => {
        setTimeout(() => {
            const preloader = document.querySelector('.preloader');
            if (preloader) {
                preloader.classList.add('hidden');
            }
            setTimeout(() => {
                const hero = document.querySelector('.hero');
                if(hero) hero.classList.add('loaded');
            }, 800);
        }, 1000);
    });

    /* === NAVBAR SCROLL === */
    const nav = document.querySelector('nav');
    if (nav) {
        window.addEventListener('scroll', () => {
            if(window.scrollY > 50) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    /* === PARALLAX EFFECTS === */
    const heroBg = document.querySelector('.hero-bg');
    const bannerBg = document.querySelector('.banner-bg');
    
    window.addEventListener('scroll', () => {
        const scroll = window.scrollY;
        if(heroBg) heroBg.style.transform = `translateY(${scroll * 0.4}px)`;
        
        if(bannerBg) {
            const bannerRect = document.querySelector('.banner').getBoundingClientRect();
            if(bannerRect.top < window.innerHeight && bannerRect.bottom > 0) {
                bannerBg.style.transform = `translateY(${(bannerRect.top) * 0.3}px)`;
            }
        }
    });

    /* === MAGNETIC BUTTON === */
    const magWrap = document.querySelector('.magnetic-wrap');
    const magBtn = document.querySelector('.btn-large');
    
    if(magWrap && magBtn) {
        magWrap.addEventListener('mousemove', (e) => {
            const rect = magWrap.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            
            magBtn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        
        magWrap.addEventListener('mouseleave', () => {
            magBtn.style.transform = `translate(0px, 0px)`;
        });
    }

    /* === ACCORDIONS (Services & FAQ) === */
    const accordions = document.querySelectorAll('.accordion-header');
    
    accordions.forEach(acc => {
        acc.addEventListener('click', function() {
            const item = this.parentElement;
            const content = this.nextElementSibling;
            
            // Close other items in the same accordion group
            const parentGroup = item.parentElement;
            const allItems = parentGroup.querySelectorAll('.accordion-item');
            
            allItems.forEach(i => {
                if(i !== item) {
                    i.classList.remove('active');
                    i.querySelector('.accordion-content').style.maxHeight = null;
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            if (item.classList.contains('active')) {
                content.style.maxHeight = content.scrollHeight + "px";
            } else {
                content.style.maxHeight = null;
            }
        });
    });

    /* === INTERSECTION OBSERVER FOR REVEALS === */
    const observerOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-up, .g-item').forEach(el => {
        observer.observe(el);
    });
});

/* === LIGHTBOX === */
function openLightbox(imgSrc) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if(lightbox && lightboxImg) {
        lightboxImg.src = imgSrc;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    if(lightbox && lightboxImg) {
        lightbox.classList.remove('active');
        setTimeout(() => {
            lightboxImg.src = '';
            document.body.style.overflow = 'auto'; // Restore scrolling
        }, 400); // Wait for transition
    }
}

// Close on escape key
document.addEventListener('keydown', (e) => {
    const lightbox = document.getElementById('lightbox');
    if (e.key === 'Escape' && lightbox && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});
