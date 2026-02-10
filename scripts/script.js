let toastTimer;

// --- КОПІЮВАННЯ В БУФЕР ---
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Скопійовано: " + text);
    }).catch(err => {
        console.error('Помилка: ', err);
    });
}

// --- ПОВІДОМЛЕННЯ (TOAST) ---
function showToast(message) {
    const toast = document.getElementById("toast");
    clearTimeout(toastTimer);
    toast.innerText = message;
    toast.classList.add("show");
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}

// --- МОБІЛЬНЕ МЕНЮ (БУРГЕР) ---
function toggleMenu() {
    const burger = document.getElementById('burgerBtn');
    const menu = document.getElementById('mobileMenu');
    
    if (!burger || !menu) return; // Захист від помилок, якщо елементів немає

    document.body.classList.toggle('no-scroll');
    burger.classList.toggle('active');
    menu.classList.toggle('active');
}

// --- СКРОЛ ТА ІНШІ ПОДІЇ ПРИ ЗАВАНТАЖЕННІ ---
document.addEventListener("DOMContentLoaded", function() {
    
    // Скидання скролу при перезавантаженні сторінки
    if ('scrollRestoration' in history) {
        history.scrollRestoration = 'manual';
    }
    window.scrollTo(0, 0);

    // ПЛАВНИЙ СКРОЛ ДЛЯ ВСІХ ПОСИЛАНЬ НАВІГАЦІЇ
    document.querySelectorAll('nav a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Якщо це внутрішнє посилання (починається з #)
            if (href.startsWith('#')) {
                e.preventDefault();
                const targetSection = document.querySelector(href);

                if (targetSection) {
                    // Якщо меню відкрите (на мобілках) — закриваємо його перед скролом
                    if (document.getElementById('mobileMenu').classList.contains('active')) {
                        toggleMenu();
                    }

                    const offsetTop = targetSection.offsetTop;
                    const elementHeight = targetSection.offsetHeight;
                    const windowHeight = window.innerHeight;

                    // Центруємо розділ на екрані
                    const scrollPoint = offsetTop + (elementHeight / 2) - (windowHeight / 2);

                    window.scrollTo({
                        top: scrollPoint,
                        behavior: "smooth"
                    });

                    history.pushState(null, null, href);
                }
            }
        });
    });

    // АНІМАЦІЯ ПОВЯВИ ТАРИФІВ
    const observerOptions = {
        threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach(card => card.classList.add('show'));
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const target = document.querySelector('.tariffs-grid');
    if (target) {
        observer.observe(target);
    }
});