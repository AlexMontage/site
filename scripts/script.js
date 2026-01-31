let toastTimer; // Змінна для зберігання таймера

function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast("Скопійовано: " + text);
    }).catch(err => {
        console.error('Помилка: ', err);
    });
}



function showToast(message) {
    const toast = document.getElementById("toast");
    // 1. Очищуємо попередній таймер, якщо він був
    clearTimeout(toastTimer);
    // 2. Оновлюємо текст і показуємо
    toast.innerText = message;
    toast.classList.add("show");
    // 3. Створюємо новий таймер
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3000);
}



if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);



document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        
        const href = this.getAttribute('href'); // Отримуємо назву розділу, наприклад #tariffs
        const targetSection = document.querySelector(href);

        if (targetSection) {
            const offsetTop = targetSection.offsetTop;
            const elementHeight = targetSection.offsetHeight;
            const windowHeight = window.innerHeight;

            const scrollPoint = offsetTop + (elementHeight / 2) - (windowHeight / 2);

            window.scrollTo({
                top: scrollPoint,
                behavior: "smooth"
            });

            // ЦЕЙ РЯДОК ДОДАСТЬ #НАЗВУ В ПОСИЛАННЯ:
            history.pushState(null, null, href);
        }
    });
});



document.addEventListener("DOMContentLoaded", function() { /*Анімація появи тарифів*/
    const observerOptions = {
        threshold: 0.2 // Анімація почнеться, коли 20% блоку буде видно
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Знаходимо всі картки всередині контейнера і додаємо їм клас
                const cards = entry.target.querySelectorAll('.card');
                cards.forEach(card => card.classList.add('show'));
                
                // Після того як анімація спрацювала, можна припинити спостереження
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const target = document.querySelector('.tariffs-grid');
    if (target) {
        observer.observe(target);
    }
});