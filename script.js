/* ===================================
   DOM LOADED
=================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* ==========================
       MOBILE HAMBURGER MENU
    ========================== */
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");
    const navLinksList = document.querySelectorAll("nav a");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            menuToggle.classList.toggle("open");
            navMenu.classList.toggle("open");
        });

        // Close menu when a link is clicked
        navLinksList.forEach(link => {
            link.addEventListener("click", () => {
                menuToggle.classList.remove("open");
                navMenu.classList.remove("open");
            });
        });
    }

    /* ==========================
       STICKY HEADER
    ========================== */

    const header = document.querySelector("header");

    window.addEventListener("scroll", () => {

        if (window.scrollY > 50) {
            header.style.background = "rgba(5,15,30,.98)";
            header.style.boxShadow = "0 10px 30px rgba(0,0,0,.15)";
        } else {
            header.style.background = "rgba(5,15,30,.95)";
            header.style.boxShadow = "none";
        }

    });

    /* ==========================
       SMOOTH SCROLL
    ========================== */

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {

        anchor.addEventListener("click", function(e) {

            const target = document.querySelector(this.getAttribute("href"));

            if (!target) return;

            e.preventDefault();

            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: "smooth"
            });

        });

    });

    /* ==========================
       SCROLL ANIMATION
    ========================== */

    const observer = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {
                entry.target.classList.add("active");
            }

        });

    }, {
        threshold: 0.15
    });

    document.querySelectorAll(`
        .service-card,
        .vehicle-card,
        .stat,
        .gallery-grid img,
        .why-content,
        .why-image,
        .cta
    `).forEach(item => {

        item.classList.add("fade-up");

        observer.observe(item);

    });

    /* ==========================
       COUNTER ANIMATION
    ========================== */

    const stats = document.querySelectorAll(".stat h3");

    const counterObserver = new IntersectionObserver((entries) => {

        entries.forEach(entry => {

            if (!entry.isIntersecting) return;

            const counter = entry.target;

            const original = counter.textContent;

            let target = parseInt(
                original.replace(/[^0-9]/g, "")
            );

            let current = 0;

            const increment = Math.ceil(target / 80);

            const updateCounter = () => {

                current += increment;

                if (current >= target) {

                    current = target;

                    if (original.includes("%")) {
                        counter.textContent = "%" + target;
                    }
                    else if (original.includes("+")) {
                        counter.textContent =
                            target.toLocaleString() + "+";
                    }
                    else {
                        counter.textContent =
                            target.toLocaleString();
                    }

                    return;
                }

                if (original.includes("+")) {
                    counter.textContent =
                        current.toLocaleString() + "+";
                }
                else {
                    counter.textContent =
                        current.toLocaleString();
                }

                requestAnimationFrame(updateCounter);

            };

            updateCounter();

            counterObserver.unobserve(counter);

        });

    }, {
        threshold: 0.5
    });

    stats.forEach(stat => {

        counterObserver.observe(stat);

    });

    /* ==========================
       ACTIVE NAVIGATION
    ========================== */

    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");

    window.addEventListener("scroll", () => {

        let current = "";

        sections.forEach(section => {

            const top = section.offsetTop - 120;
            const height = section.offsetHeight;

            if (window.scrollY >= top &&
                window.scrollY < top + height) {

                current = section.getAttribute("id");

            }

        });

        navLinks.forEach(link => {

            link.classList.remove("active");

            if (
                link.getAttribute("href") === "#" + current
            ) {
                link.classList.add("active");
            }

        });

    });

    /* ==========================
       SERVICE CARD HOVER EFFECT
    ========================== */

    document.querySelectorAll(".service-card")
    .forEach(card => {

        card.addEventListener("mouseenter", () => {

            card.style.transform =
                "translateY(-10px)";

        });

        card.addEventListener("mouseleave", () => {

            card.style.transform =
                "translateY(0px)";

        });

    });

    /* ==========================
       CTA BUTTON EFFECT
    ========================== */

    document.querySelectorAll(
        ".btn-primary,.btn-secondary"
    ).forEach(btn => {

        btn.addEventListener("mouseenter", () => {

            btn.style.transform =
                "translateY(-4px)";

        });

        btn.addEventListener("mouseleave", () => {

            btn.style.transform =
                "translateY(0)";
        });

    });

});

/* ===================================
   BACK TO TOP BUTTON
=================================== */

const backToTop = document.createElement("button");

backToTop.innerHTML = "↑";

backToTop.id = "backToTop";

document.body.appendChild(backToTop);

Object.assign(backToTop.style, {

    position: "fixed",
    right: "25px",
    bottom: "25px",
    width: "50px",
    height: "50px",
    border: "none",
    borderRadius: "50%",
    background: "#ff7a00",
    color: "#fff",
    fontSize: "22px",
    cursor: "pointer",
    display: "none",
    zIndex: "9999",
    transition: ".3s"

});

window.addEventListener("scroll", () => {

    if (window.scrollY > 500) {
        backToTop.style.display = "block";
    } else {
        backToTop.style.display = "none";
    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* ===================================
   SIMPLE HERO IMAGE FLOAT
=================================== */

const heroImage =
    document.querySelector(".hero-right img");

if (heroImage) {

    let position = 0;

    setInterval(() => {

        position = position === 0 ? -10 : 0;

        heroImage.style.transform =
            `translateY(${position}px)`;

        heroImage.style.transition =
            "2s ease-in-out";

    }, 2000);

}
