document.addEventListener('DOMContentLoaded', function() {
    // Навигация
    const menuToggle = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    if (menuToggle && mainNav) {
        menuToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !isExpanded);
            mainNav.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Закрытие меню при клике на ссылку
    const navLinks = document.querySelectorAll('.nav-link');
    if (navLinks.length > 0) {
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                if (window.innerWidth < 768 && menuToggle && mainNav) {
                    menuToggle.setAttribute('aria-expanded', 'false');
                    mainNav.classList.remove('active');
                    document.body.style.overflow = '';
                }
            });
        });
    }

    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (window.innerWidth < 768 && menuToggle && mainNav &&
            !e.target.closest('.main-nav') &&
            !e.target.closest('.menu-toggle') &&
            mainNav.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Адаптивное поведение при ресайзе
    window.addEventListener('resize', function() {
        if (window.innerWidth >= 768 && menuToggle && mainNav) {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Закрытие меню по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && mainNav && mainNav.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            mainNav.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Обновление даты
    const updateDateElement = document.getElementById('update-date');
    if (updateDateElement) {
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        updateDateElement.textContent = `обновлено ${day}.${month}.${year}`;
    }

    // Диаграмма (только для главной страницы)
    if (document.getElementById('pollChart')) {
        const ctx = document.getElementById('pollChart').getContext('2d');
        new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: [
                    'С какого возраста можно трудоустраиваться',
                    'Знают как трудоустроиться',
                    'Знают кто помогает с трудоустройством',
                    'Знают куда обратиться',
                    'Хотят трудоустроиться'
                ],
                datasets: [{
                    data: [35, 10, 25, 5, 25],
                    backgroundColor: [
                        '#ff6b6b',
                        '#4ecdc4',
                        '#45b7d1',
                        '#96ceb4',
                        '#feca57'
                    ],
                    borderWidth: 0
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        display: false
                    }
                }
            }
        });
    }

    // Toggle для карточек (только для страницы "Где взять документы")
    const sectionCards = document.querySelectorAll('.section-card');
    if (sectionCards.length > 0) {
        sectionCards.forEach(card => {
            const header = card.querySelector('h3');
            if (header) {
                header.addEventListener('click', function() {
                    card.classList.toggle('active');
                });
            }
        });
    }
});
