const burgerBtn = document.getElementById('burger-btn');
const menu = document.getElementById('menu');

// 1. Обробник кліку на бургер-кнопку
burgerBtn.addEventListener('click', function(event) {
    // Перемикаємо клас 'active' (якщо його немає - додає, якщо є - забирає)
    menu.classList.toggle('active');
    
    // Важливо! Зупиняємо "спливання" події, щоб клік по бургеру 
    // не зарахувався як клік по document (який відразу закриє меню)
    event.stopPropagation();
});

// 2. Обробник кліку по всьому документу (поза межами меню)
document.addEventListener('click', function(event) {
    // Перевіряємо, чи меню зараз відкрите (має клас 'active')
    const isMenuOpen = menu.classList.contains('active');
    
    // Перевіряємо, чи клік був НЕ по самому меню
    const isClickOutsideMenu = !menu.contains(event.target);
    
    // Якщо меню відкрите і клікнули поза ним — закриваємо його
    if (isMenuOpen && isClickOutsideMenu) {
        menu.classList.remove('active');
    }
});