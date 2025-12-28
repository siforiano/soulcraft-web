document.addEventListener('DOMContentLoaded', () => {
    // --- Cursor Glow Effect ---
    const cursorGlow = document.getElementById('cursor-glow');
    document.addEventListener('mousemove', (e) => {
        cursorGlow.style.left = e.clientX + 'px';
        cursorGlow.style.top = e.clientY + 'px';
    });

    // --- Staggered Reveal Initialization ---
    const staggerContainers = document.querySelectorAll('.stagger-container');
    staggerContainers.forEach(container => {
        const children = container.querySelectorAll('.reveal');
        children.forEach((child, index) => {
            child.style.setProperty('--order', index);
        });
    });

    // --- Scroll Animations (Reveal on Scroll) ---
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {
        threshold: 0.15
    });

    reveals.forEach(reveal => {
        revealObserver.observe(reveal);
    });

    // --- Header Scroll Effect ---
    const header = document.getElementById('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // --- Mobile Menu Toggle ---
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuBtn.classList.toggle('open');

            if (navLinks.classList.contains('active')) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'rgba(5, 5, 16, 0.95)';
                navLinks.style.padding = '40px';
                navLinks.style.textAlign = 'center';
            } else {
                navLinks.style.display = '';
            }
        });
    }

    // --- Copy IP Functionality ---
    const ipBtn = document.getElementById('copy-ip');
    if (ipBtn) {
        ipBtn.addEventListener('click', () => {
            const btnSub = ipBtn.querySelector('.btn-sub');
            const originalSub = btnSub.textContent;

            btnSub.textContent = "¡MUY PRONTO!";
            btnSub.style.color = "var(--secondary)";

            setTimeout(() => {
                btnSub.textContent = originalSub;
                btnSub.style.color = "";
            }, 3000);
        });
    }

    // --- Custom Particle System (Soul Essences) ---
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const container = document.getElementById('particles-js');
    container.appendChild(canvas);

    let particles = [];
    const particleCount = 40;

    function resize() {
        canvas.width = container.offsetWidth;
        canvas.height = container.offsetHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() {
            this.init();
        }

        init() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 1 - 0.5;
            this.speedY = Math.random() * -1 - 0.5; // Moving upwards like souls
            this.opacity = Math.random() * 0.5 + 0.2;
            this.color = Math.random() > 0.5 ? '#8e44ad' : '#be2edd';
        }

        update() {
            this.x += this.speedX;
            this.y += this.speedY;

            if (this.y < 0) this.init(); // Reset to bottom
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        }

        draw() {
            ctx.globalAlpha = this.opacity;
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animate);
    }

    animate();
});
