document.addEventListener("DOMContentLoaded", function () {

    const radioLinks = document.querySelectorAll(".radio-links");
    let isTransitioning = false;

    const main = document.querySelector(".main");
    const mainSliderRadio = document.querySelector(".main-slider-radio");
    const mainTitle = document.querySelector(".main-title");
    const mainBonus = document.querySelector(".main-bonus");
    const leftArrow = document.querySelector(".main-btn-left");
    const rightArrow = document.querySelector(".main-btn-right");
    const imageUrls = [
        {
            url: "url(/img/main/main-bg.jpg)",
            title: "Casino Welcome Bonus",
            bonus: "100% up to €500 +100 Free Spins"
        },
        {
            url: "url(/img/main/main-bg2.jpg)",
            title: "Live Casino Bonus",
            bonus: "Сashback 10% up to €200"
        },
        {
            url: "url(/img/main/main-bg3.jpg)",
            title: "Sports Welcome Bonus",
            bonus: "100% up to €100"
        }
    ];
    let currentImageIndex = 0;
    let isTransitioningBackground = false;

    // автоматическое переключение слайдера главного меню

    function changeBackground(indexChange) {
        if (!isTransitioningBackground) {
            isTransitioningBackground = true;
    
            currentImageIndex = (currentImageIndex + indexChange + imageUrls.length) % imageUrls.length;
    
            main.style.opacity = 0;
    
            setTimeout(() => {
                main.style.backgroundImage = imageUrls[currentImageIndex].url;
                mainTitle.textContent = imageUrls[currentImageIndex].title;
                mainBonus.textContent = imageUrls[currentImageIndex].bonus;
                main.style.opacity = 1;
            }, 150); // Установите здесь длительность перехода в миллисекундах
    
            setTimeout(() => {
                isTransitioningBackground = false;
            }, 150); // Завершение перехода через ту же длительность
        }
    }
    

    // кнопки радио низ главного меню

    radioLinks.forEach((link) => {
        link.addEventListener("click", () => {
            if (!isTransitioning) {
                isTransitioning = true;

                setTimeout(() => {
                    radioLinks.forEach((link) => link.classList.remove("active"));
                    link.classList.add("active");
                    isTransitioning = false;
                }, 200);
            }
        });
    });

    mainSliderRadio.addEventListener("click", changeBackground.bind(null, 1));
    leftArrow.addEventListener("click", () => {
        changeBackground(-1);
    });
    rightArrow.addEventListener("click", () => {
        changeBackground(1);
    });

    // Dropdown menus
    const dropdownBtns = document.querySelectorAll(".dropdown-btn");
    
    dropdownBtns.forEach(function (dropdownBtn) {
        const dropdownContent = dropdownBtn.nextElementSibling;
        
        dropdownBtn.addEventListener("click", function () {
            // Скрыть все открытые выпадающие меню, кроме текущего
            closeOtherDropdowns(dropdownContent);
            
            // Отобразить или скрыть текущее выпадающее меню
            dropdownContent.style.display = dropdownContent.style.display === "block" ? "none" : "block";
        });
    });
    
    function closeOtherDropdowns(currentDropdown) {
        dropdownBtns.forEach(function (dropdownBtn) {
            const dropdownContent = dropdownBtn.nextElementSibling;
            if (dropdownContent !== currentDropdown) {
                dropdownContent.style.display = "none";
            }
        });
    }

    // mobile 1024px
    const burgerBtnLinks = document.querySelectorAll('.burger-btn-link');
    const burgerNavMob = document.querySelector('.burger-nav-mob');

    burgerBtnLinks.forEach(burgerBtnLink => {
        burgerBtnLink.addEventListener('click', () => {
            burgerBtnLink.classList.toggle('active'); // Добавление/удаление класса active для анимации иконки бургера
            burgerNavMob.classList.toggle('active'); // Переключение класса для отображения/скрытия меню
        });
    });

    // Auto background change every 7 seconds
    function nextSlide() {
        changeBackground(1);
    }

    setInterval(nextSlide, 7000); // Переключение каждые 7 секунд
});
