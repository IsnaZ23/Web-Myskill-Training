const navMenu = document.getElementById("nav_menu");
const toggleBtn = document.getElementById("toggle_btn");
const closeBtn = document.getElementById("close_btn");
const menuOverlay = document.getElementById("menu_overlay");
const header = document.getElementById("header");
const navLinks = document.querySelectorAll(".nav_menu_link");

toggleBtn.addEventListener("click", () => {
    navMenu.classList.add("show");
    menuOverlay.classList.add("show");
    document.body.style.overflow = "hidden";
});

const closeMenu = () => {
    navMenu.classList.remove("show");
    menuOverlay.classList.remove("show");
    document.body.style.overflow = "";
};

closeBtn.addEventListener("click", closeMenu);
menuOverlay.addEventListener("click", closeMenu);

navLinks.forEach(link => {
    link.addEventListener("click", closeMenu);
});

let lastScroll = 0;

window.addEventListener("scroll", () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.classList.add("scrolled");
    } else {
        header.classList.remove("scrolled");
    }

    lastScroll = currentScroll;
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            const headerHeight = header.offsetHeight;
            const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });
        }
    });
});

const animateCounter = (element) => {
    const target = parseInt(element.getAttribute("data-count"));
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;

    const updateCounter = () => {
        current += step;
        if (current < target) {
            element.textContent = Math.floor(current) + (element.textContent.includes("%") ? "%" : "+");
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + (element.textContent.includes("%") ? "%" : "+");
        }
    };

    updateCounter();
};

const observerOptions = {
    threshold: 0.5,
    rootMargin: "0px"
};

const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const counters = entry.target.querySelectorAll("[data-count]");
            counters.forEach(counter => {
                animateCounter(counter);
            });
            counterObserver.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector(".hero-stats");
if (statsSection) {
    counterObserver.observe(statsSection);
}

const sections = document.querySelectorAll("section[id]");

const highlightNavLink = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 150;
        const sectionId = section.getAttribute("id");
        const navLink = document.querySelector(`.nav_menu_link[href="#${sectionId}"]`);

        if (navLink) {
            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                document.querySelectorAll(".nav_menu_link").forEach(link => {
                    link.classList.remove("menu_active");
                });
                navLink.classList.add("menu_active");
            }
        }
    });
};

window.addEventListener("scroll", highlightNavLink);

document.addEventListener("DOMContentLoaded", () => {
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 800,
            easing: "ease-out-cubic",
            once: true,
            offset: 50
        });
    }

    const images = document.querySelectorAll("img");
    images.forEach(img => {
        if (img.complete) {
            img.classList.add("loaded");
        } else {
            img.addEventListener("load", () => {
                img.classList.add("loaded");
            });
        }
    });
});

window.addEventListener("scroll", () => {
    const scrolled = window.pageYOffset;
    const heroImage = document.querySelector(".hero-image img");

    if (heroImage && scrolled < 800) {
        heroImage.style.transform = `translateY(${scrolled * 0.1}px)`;
    }
});