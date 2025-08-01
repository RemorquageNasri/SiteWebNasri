document.addEventListener("DOMContentLoaded", () => {
    // Mobile menu toggle
    const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
    const mobileMenu = document.querySelector(".mobile-menu");
    const mobileMenuLinks = document.querySelectorAll(".mobile-nav-link");

    mobileMenuBtn.addEventListener("click", function () {
        this.classList.toggle("active");
        mobileMenu.classList.toggle("active");

        if (this.classList.contains("active")) {
            this.children[0].style.transform = "rotate(45deg) translate(5px, 5px)";
            this.children[1].style.opacity = "0";
            this.children[2].style.transform = "rotate(-45deg) translate(5px, -5px)";
        } else {
            this.children[0].style.transform = "none";
            this.children[1].style.opacity = "1";
            this.children[2].style.transform = "none";
        }
    });

    // Close mobile menu when clicking on a link
    mobileMenuLinks.forEach((link) => {
        link.addEventListener("click", () => {
            mobileMenu.classList.remove("active");
            mobileMenuBtn.classList.remove("active");
            mobileMenuBtn.children[0].style.transform = "none";
            mobileMenuBtn.children[1].style.opacity = "1";
            mobileMenuBtn.children[2].style.transform = "none";
        });
    });

    // Initialize AOS animation library
    if (typeof AOS !== "undefined") {
        AOS.init({
            duration: 1000,
            once: true,
            mirror: false,
        });
    } else {
        console.warn("AOS is not defined. Make sure to include the AOS library.");
    }
});


