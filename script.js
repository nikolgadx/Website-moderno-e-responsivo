document.addEventListener('DOMContentLoaded', () => {
    let vantaEffect;
    if (document.querySelector('#animated-bg')) {
        vantaEffect = VANTA.HALO({
            el: "#animated-bg",
            mouseControls: true,
            touchControls: true,
            gyroControls: false,
            minHeight: 200.00,
            minWidth: 200.00,
            baseColor: 0x0,
            backgroundColor: 0x0,
            amplitudeFactor: 3.00,
            xOffset: 0.19,
            yOffset: 0.08,
            size: 2.00,
            scale: 1.2,
            scaleMobile: 1.0
        });
    }

    // Controle por rolagem
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        if (vantaEffect) {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const scrollDelta = scrollTop - lastScrollTop;
            
            // Ajuste estes valores para controlar a sensibilidade e direção do efeito
            vantaEffect.options.xOffset += scrollDelta * 0.0001;
            vantaEffect.options.yOffset += scrollDelta * 0.0001;
            
            lastScrollTop = scrollTop;
        }
    });

    // Smooth scrolling para links internos
    const links = document.querySelectorAll('a[href^="#"]');
    
    for (const link of links) {
        link.addEventListener('click', clickHandler);
    }
    
    function clickHandler(e) {
        e.preventDefault();
        const href = this.getAttribute('href');
        const offsetTop = document.querySelector(href).offsetTop;
        
        scroll({
            top: offsetTop,
            behavior: "smooth"
        });
    }

    // Animação de fade-in para elementos ao rolar
    const fadeElems = document.querySelectorAll('.fade-in');
    
    const fadeIn = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const options = {
        threshold: 0.5,
        rootMargin: "0px 0px -100px 0px"
    };

    const observer = new IntersectionObserver(fadeIn, options);

    fadeElems.forEach(elem => {
        observer.observe(elem);
    });

    // Header com fundo ao rolar
    const header = document.querySelector('header');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Menu de navegação móvel
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    // Adicionar botão de fechar ao menu
    const closeButton = document.createElement('span');
    closeButton.innerHTML = '&times;';
    closeButton.classList.add('menu-close');
    navMenu.prepend(closeButton);

    closeButton.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });

    // Fechar o menu ao clicar em um link
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });

    // Efeito de paralaxe
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const parallax = document.querySelector('#hero');
        parallax.style.backgroundPositionY = -(scrolled * 0.5) + 'px';
    });

    // Micro-interações nos botões
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', (e) => {
            const x = e.clientX - btn.getBoundingClientRect().left;
            const y = e.clientY - btn.getBoundingClientRect().top;
            
            const ripple = document.createElement('span');
            ripple.style.left = `${x}px`;
            ripple.style.top = `${y}px`;
            
            btn.appendChild(ripple);
            
            setTimeout(() => ripple.remove(), 600);
        });
    });

    // Otimização de imagens
    const images = document.querySelectorAll('img');
    if ('loading' in HTMLImageElement.prototype) {
        images.forEach(img => {
            img.loading = 'lazy';
        });
    } else {
        // Fallback para navegadores que não suportam lazy loading
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.3.2/lazysizes.min.js';
        document.body.appendChild(script);
    }

    // Animação de conteúdo ao rolar
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-on-scroll');
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animated');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        elements.forEach(element => {
            observer.observe(element);
        });
    };

    animateOnScroll();

    const animatedBg = document.getElementById('animated-bg');
    let lastScrollPosition = window.scrollY;

    window.addEventListener('scroll', () => {
        const currentScrollPosition = window.scrollY;
        const scrollDifference = currentScrollPosition - lastScrollPosition;
        
        // Ajuste o valor 0.05 para controlar a velocidade do efeito
        const translateY = parseFloat(animatedBg.style.transform.replace('translateY(', '').replace('px)', '') || 0) - scrollDifference * 0.05;
        
        animatedBg.style.transform = `translateY(${translateY}px)`;
        
        lastScrollPosition = currentScrollPosition;
    });
});
