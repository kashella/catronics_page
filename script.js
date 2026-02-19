document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. MENÚ HAMBURGUESA (MÓVIL) ---
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            // Alternar clases para abrir/cerrar menú y animar el ícono
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Cerrar el menú al hacer clic en un enlace (UX básica)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // --- 2. NAVBAR DINÁMICA AL HACER SCROLL ---
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled'); // Añade fondo oscuro/blur
        } else {
            navbar.classList.remove('scrolled'); // Vuelve a transparente
        }
    });

    // --- 3. INDICADOR DE PÁGINA ACTIVA (AUTOMÁTICO) ---
    // Esto asegura que si estás en "proyectos.html", el link de Proyectos se ilumine
    const currentLocation = location.href;
    const menuItem = document.querySelectorAll('.nav-link');
    const menuLength = menuItem.length;
    
    for (let i = 0; i < menuLength; i++) {
        if (menuItem[i].href === currentLocation) {
            // Elimina 'active' de todos y se lo pone al actual
            menuItem.forEach(c => c.classList.remove('active'));
            menuItem[i].classList.add('active');
        }
    }

    // --- 4. ANIMACIONES AL HACER SCROLL (INTERSECTION OBSERVER) ---
    // Busca todos los elementos que queramos animar (cards, títulos, etc.)
    const hiddenElements = document.querySelectorAll('.card, .project-card, .product-card, .section-title, .hero-text, .hero-visual');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show'); // Añade clase para animar
            }
        });
    }, {
        threshold: 0.1 // Se activa cuando el 10% del elemento es visible
    });

    hiddenElements.forEach((el) => observer.observe(el));

    
    // --- 5. VALIDACIÓN SIMPLE DE FORMULARIO (OPCIONAL) ---
    const contactForm = document.querySelector('.contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Aquí podrías añadir un spinner de carga si quisieras
            // e.preventDefault(); // Descomentar si usas AJAX
            const btn = this.querySelector('button[type="submit"]');
            if(btn) {
                btn.innerHTML = 'Enviando... <i class="fas fa-spinner fa-spin"></i>';
                btn.style.opacity = '0.7';
            }
        });
    }
});

// Espera a que cargue toda la página
document.addEventListener('DOMContentLoaded', () => {
    
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    // Cuando hacen clic en las 3 rayitas
    if (hamburger) {
        hamburger.addEventListener("click", () => {
            // Agrega o quita la clase "active"
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }

    // (Opcional) Cierra el menú si hacen clic en un enlace
    document.querySelectorAll(".nav-link").forEach(n => n.addEventListener("click", () => {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
    }));

});

document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger) {
        hamburger.addEventListener("click", () => {
            console.log("¡Me hiciste clic!"); // Para probar si funciona
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
        });
    }
});