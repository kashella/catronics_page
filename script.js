document.addEventListener('DOMContentLoaded', () => {

    // --- 1. MENÚ HAMBURGUESA (MÓVIL) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            // Bloquea el scroll del body cuando el menú está abierto
            document.body.style.overflow = hamburger.classList.contains('active') ? 'hidden' : '';
        });

        // Cierra el menú al hacer clic en cualquier enlace
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });

        // Cierra el menú al hacer clic fuera de él
        document.addEventListener('click', (e) => {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }

    // --- 2. NAVBAR DINÁMICA AL HACER SCROLL ---
    const navbar = document.querySelector('.navbar');

    if (navbar) {
        window.addEventListener('scroll', () => {
            navbar.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    // --- 3. INDICADOR DE PÁGINA ACTIVA (AUTOMÁTICO) ---
    const currentLocation = location.href;
    const menuItems = document.querySelectorAll('.nav-link');

    menuItems.forEach(item => {
        if (item.href === currentLocation) {
            menuItems.forEach(c => c.classList.remove('active'));
            item.classList.add('active');
        }
    });

    // --- 4. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) ---
    const hiddenElements = document.querySelectorAll('.card, .project-card, .product-card, .section-title, .hero-text, .hero-visual');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
            }
        });
    }, { threshold: 0.1 });

    hiddenElements.forEach((el) => observer.observe(el));

    // --- 5. VALIDACIÓN SIMPLE DE FORMULARIO ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function () {
            const btn = this.querySelector('button[type="submit"]');
            if (btn) {
                btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
                btn.style.opacity = '0.7';
            }
        });
    }

});