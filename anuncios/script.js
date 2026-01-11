document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. LÓGICA DE VIDEO PARALLAX (Scroll Control) ---
    const heroSection = document.querySelector('.hero-scroll-container');
    const video = document.getElementById('hero-video');
    const heroContent = document.querySelector('.hero-content');
    
    // Bandera para asegurar que la duración del video esté cargada
    let videoDuration = 0;

    video.addEventListener('loadedmetadata', () => {
        videoDuration = video.duration;
        // Pequeño hack para forzar el repintado si es necesario
        requestAnimationFrame(updateVideoOnScroll);
    });

    // Si el metadata ya cargó (cache)
    if (video.readyState >= 1) {
        videoDuration = video.duration;
    }

    function updateVideoOnScroll() {
        if (!videoDuration) return;

        // Calcular posición relativa del scroll
        const scrollTop = window.scrollY;
        const sectionTop = heroSection.offsetTop;
        const sectionHeight = heroSection.offsetHeight;
        const windowHeight = window.innerHeight;

        // Calcular progreso (0 a 1) dentro de la sección Hero
        // Empezamos cuando el top del scroll toca el top de la sección (0)
        // Terminamos cuando la sección ha escroleado su altura menos el viewport (1)
        let scrollProgress = (scrollTop - sectionTop) / (sectionHeight - windowHeight);

        // Limitar valores entre 0 y 1
        scrollProgress = Math.max(0, Math.min(1, scrollProgress));

        // Asignar tiempo al video
        // Nota: Agregamos un pequeño condicional para evitar jittering si el valor es idéntico
        if (Math.abs(video.currentTime - (scrollProgress * videoDuration)) > 0.05) {
             video.currentTime = scrollProgress * videoDuration;
        }

        // Efecto de desvanecimiento del texto (Opacity)
        // Se desvanece más rápido (al 30% del scroll ya casi no se ve)
        const contentOpacity = 1 - (scrollProgress * 3);
        heroContent.style.opacity = Math.max(0, contentOpacity);
        heroContent.style.transform = `translateY(${scrollProgress * 50}px)`; // Efecto parallax suave en texto

        requestAnimationFrame(updateVideoOnScroll);
    }

    // Iniciar el loop de animación
    window.addEventListener('scroll', () => {
        requestAnimationFrame(updateVideoOnScroll);
    });

    // --- 2. HEADER INTERACTIVO (Glassmorphism) ---
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- 3. MENÚ MÓVIL ---
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-menu a');

    mobileToggle.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        // Animación simple del icono hamburguesa (opcional)
        mobileToggle.classList.toggle('open');
    });

    // Cerrar menú al hacer clic en un enlace
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
        });
    });

    // --- 4. ANIMACIONES AL HACER SCROLL (Intersection Observer) ---
    const revealElements = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, {
        root: null,
        threshold: 0.15, // Se activa cuando el 15% del elemento es visible
        rootMargin: "0px"
    });

    revealElements.forEach(el => revealObserver.observe(el));
});

