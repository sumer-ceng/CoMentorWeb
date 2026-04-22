/**
 * Panda's Tech Landing Page - Core Interactions
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- Navbar Scroll Effect ---
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- Intersection Observer for Scroll Animations ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                // Opt out of unobserve to allow re-trigger or keep it 
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Select elements to animate
    const hiddenElements = document.querySelectorAll(`
        .service-card, 
        .section-title, 
        .section-subtitle, 
        .mockup-info, 
        .phone-mockup, 
        .why-us-content, 
        .why-us-visual
    `);

    // Add hidden base class dynamically based on new setup
    const style = document.createElement('style');
    style.innerHTML = `
        .scroll-hidden {
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .scroll-hidden.show {
            opacity: 1;
            transform: translateY(0);
        }
        /* Sub-delays for grid items */
        .service-card:nth-child(2) { transition-delay: 150ms; }
        .service-card:nth-child(3) { transition-delay: 300ms; }
    `;
    document.head.appendChild(style);

    hiddenElements.forEach(el => {
        el.classList.add('scroll-hidden');
        observer.observe(el);
    });

    // --- Smooth Scrolling for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                const navHeight = document.querySelector('.navbar').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - navHeight;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Contact Form Submission (Gmail) ---
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Form verilerini al
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Hedef e-posta (sabit)
            const targetEmail = "pandast3ch@gmail.com";
            
            // Gmail URL parametrelerini encode et
            const emailSubject = encodeURIComponent(subject);
            const emailBody = encodeURIComponent(
                "Gönderen: " + name + " (" + email + ")\n\n" +
                "Mesaj:\n" + message
            );
            
            // Gmail oluşturma ekranı bağlantısı
            const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${targetEmail}&su=${emailSubject}&body=${emailBody}`;
            
            // Bağlantıyı yeni sekmede aç
            window.open(gmailLink, '_blank');
            
            // Buton için görsel geri bildirim
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = '<i class="ph-bold ph-check"></i> Gmail Yönlendiriliyor...';
            btn.style.background = '#059669';
            btn.style.color = '#fff';
            
            // 3 saniye sonra formu ve butonu sıfırla
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.color = '';
                contactForm.reset();
            }, 3000);
        });
    }

});
