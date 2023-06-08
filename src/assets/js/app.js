document.addEventListener("DOMContentLoaded", () => {


    //= components/

    let prevScrollPosition = window.pageYOffset;
    let header = document.querySelector('.header');
    let headerHeight = header.offsetHeight;
    let scrollThreshold = 100;

    window.onscroll = function () {
        let currentScrollPosition = window.pageYOffset;
        if (prevScrollPosition > currentScrollPosition) {
            header.style.top = "0";
        } else {
            if (currentScrollPosition > scrollThreshold) {
                header.style.top = `-${headerHeight + 'px'}`;
            }
        }
        prevScrollPosition = currentScrollPosition;
    }

    let mainSwiper = new Swiper(".main-swiper", {
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
    });

    let searchBtn = document.querySelector('.header-content__searchContainer button');
    let searchInput = document.querySelector('.header-content__searchContainer input');
    searchBtn.addEventListener('click', () => {
        searchInput.classList.toggle('inputWidth')
    })


    let headerBurgerBtn = document.querySelector('.header-content__burgerBtn');
    let headerCross = document.querySelector('.header-menu__cross');
    let headerMenu = document.querySelector('.header-menu');

    headerBurgerBtn.addEventListener('click', () => {
        headerMenu.classList.add('header-menu__show')
    })

    headerCross.addEventListener('click', () => {
        headerMenu.classList.remove('header-menu__show')
    })

    if (window.matchMedia("(max-width: 1024px)").matches) {
        let recommendationsSwiper = new Swiper(".main-recommendations__swiper", {
            slidesPerView: 2,
            pagination: {
                el: ".recommendations-swiper-pagination",
                clickable: true,
            },
            breakpoints: {
                650: {
                    slidesPerView: 3,
                }
            }
        });
    }


    if (window.matchMedia("(max-width: 650px)").matches) {
        let acc = document.getElementsByClassName("footer-content__accordion");
        let i;

        for (i = 0; i < acc.length; i++) {
            acc[i].addEventListener("click", function () {
                this.classList.toggle("active");
                let panel = this.nextElementSibling;
                if (panel.style.maxHeight) {
                    panel.style.maxHeight = null;
                } else {
                    panel.style.maxHeight = panel.scrollHeight + "px";
                }
            });
        }
    }



    const selectInput = document.querySelector(".catalog-select__input");
    const selectedOption = document.querySelector(".catalog-selected__option");
    const arrow = document.querySelector(".arrow");
    const optionsContainer = document.querySelector(".catalog-options__container");

    const optionsList = document.querySelectorAll(".catalog-option__item");

    if (selectInput !== null) {
        selectInput.addEventListener("click", () => {
            optionsContainer.classList.toggle("activeArrow");
            arrow.classList.toggle("activeArrow");
        });
    }

    if (optionsList !== null) {
        optionsList.forEach((option) => {
            option.addEventListener("click", () => {
                selectedOption.innerHTML = option.innerHTML;
                optionsContainer.classList.remove("activeArrow");
                arrow.classList.remove("activeArrow");
            });
        });
    }

    // document.addEventListener("click", (event) => {
    //     const isClickInside = selectInput.contains(event.target);
    //     if (!isClickInside) {
    //         optionsContainer.classList.remove("active");
    //         arrow.classList.remove("active");
    //     }
    // });


    let thumbnailSwiper = new Swiper('.thumbnails', {
        direction: 'horizontal',
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
        spaceBetween: 10,

        breakpoints: {
            500: {
                direction: 'vertical',
                spaceBetween: 0,
            },
        },
    });

    let swiperCard = new Swiper('.swiperCard', {
        thumbs: {
            swiper: thumbnailSwiper,
        },
        slidesPerView: 1,
        grabCursor: true,
    });

    let additiveSwiper = new Swiper('.additiveSwiper', {
        slidesPerView: 2,
        // spaceBetween: 16,
        navigation: {
            nextEl: ".additiveSwiper-arrow_right",
            prevEl: ".additiveSwiper-arrow_left",
        },
        breakpoints: {
            1024: {
              slidesPerView: 4,
            },

            650: {
                slidesPerView: 3,
            },
        },
    })

    let productItems = document.querySelectorAll('.catalog-item')

    productItems.forEach(e => {
        let changeColorSwiper = new Swiper(e.querySelector(".changeColorSwiper"), {
            grabCursor: true,
        });

        let silverBtn = e.querySelector('.main-recommendations__silverBtn');
        let goldBtn = e.querySelector('.main-recommendations__goldBtn');

        silverBtn.addEventListener('click', function () {
            changeColorSwiper.slideTo(0);
        });

        goldBtn.addEventListener('click', function () {
            changeColorSwiper.slideTo(1);
        });
    });


    let countContainer = document.querySelectorAll('.productCard-content__coutn');

    countContainer.forEach(e => {
        let numberParagraph = e.querySelector('p');
        let number = 1;
        e.addEventListener('click', function (event) {
            if (event.target.tagName === 'BUTTON') {
                if (event.target.textContent === '-') {
                    if (number > 1) {
                        number--;
                    }
                } else if (event.target.textContent === '+') {
                    number++;
                }
                numberParagraph.textContent = number;
            }
        });
    })
})



