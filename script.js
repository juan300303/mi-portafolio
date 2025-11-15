document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for navigation links
    document.querySelectorAll('nav a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - document.querySelector('.header').offsetHeight, // Ajustar por la altura del header fijo
                    behavior: 'smooth'
                });
            }
        });
    });

    // Highlight active nav link on scroll
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav a');
    const headerHeight = document.querySelector('.header').offsetHeight;

    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 10; // Ajuste adicional
            if (scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(current)) {
                link.classList.add('active');
            }
        });
    });

    // Optional: Add a subtle animation on scroll for elements
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1 // Porcentaje del elemento visible para activar
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target); // Dejar de observar después de la animación
            }
        });
    }, observerOptions);

    // Selecciona los elementos que quieres animar (puedes añadir más selectores)
    document.querySelectorAll('.hero-content, .hero-image, .project-card, .about-text, .about-skills, .contact-form').forEach(element => {
        element.classList.add('fade-in-on-scroll'); // Clase para estilos iniciales ocultos
        observer.observe(element);
    });
});