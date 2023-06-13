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
        grabCursor: true,
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


    if (document.querySelector('.catalog-filter__dropdownBtn') !== null) {
        document.querySelector('.catalog-filter__dropdownBtn').addEventListener('click', function () {
            let dropdown = this.parentElement;
            dropdown.classList.toggle('show');
            this.querySelector('svg').classList.toggle('rotate')
        });
    }

    window.addEventListener('click', function (event) {
        let dropdowns = document.getElementsByClassName('catalog-filter__dropdown');
        for (let i = 0; i < dropdowns.length; i++) {
            let dropdown = dropdowns[i];
            if (!dropdown.contains(event.target)) {
                dropdown.classList.remove('show');
                dropdown.querySelector('svg').classList.remove('rotate')
            }
        }
    });

    let filterCheckbox = document.querySelectorAll('.catalog-filter__checkbox');
    let closeContainer = document.querySelector('.catalog-filter__closeContainer');
    let clearBtn = document.querySelector('.catalog-filter__clearBtn');

    filterCheckbox.forEach(e => {
        e.addEventListener('change', () => {
            if (e.children[0].checked) {
                let contentItem = document.createElement("div");
                contentItem.classList.add('catalog-filter__closeBtn');
                let contentHTML = `<p>${e.children[1].innerHTML}</p>
                      <svg>
                          <use href="#crossIco"></use>
                      </svg>`;
                contentItem.innerHTML = contentHTML;
                closeContainer.appendChild(contentItem);

                contentItem.classList.add('fadeIn');

                contentItem.addEventListener('click', () => {
                    contentItem.classList.add('fadeOut');
                    setTimeout(() => {
                        closeContainer.removeChild(contentItem);
                        e.children[0].checked = false;
                    }, 500);
                });

                e.addEventListener('change', () => {
                    if (!e.children[0].checked && closeContainer.contains(contentItem)) {
                        contentItem.classList.add('fadeOut');
                        setTimeout(() => {
                            closeContainer.removeChild(contentItem);
                        }, 500);
                    }
                });
            } else {
                let contentItem = e.nextElementSibling;
                if (closeContainer.contains(contentItem)) {
                    closeContainer.removeChild(contentItem);
                }
            }
        });
    });

    if (clearBtn !== null) {
        clearBtn.addEventListener('click', async () => {
            filterCheckbox.forEach(e => {
                e.children[0].checked = false;
            });

            let contentItems = closeContainer.querySelectorAll('.catalog-filter__closeBtn');
            for (let i = 0; i < contentItems.length; i++) {
                contentItems[i].classList.add('fadeOut');
                await new Promise(resolve => setTimeout(resolve, 500));
                closeContainer.removeChild(contentItems[i]);
            }
        });
    }

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
        spaceBetween: 16,
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

    const postOfficeRadioBtn = document.querySelectorAll('.postOffice-items__radio');
    const shippingMethods = document.querySelector('.postOffice-items__shippingMethods');

    const handleShippingMethodClick = (e) => {
        shippingMethods.innerHTML = e.nextElementSibling.innerHTML;
        const shippingMethodsBtns = shippingMethods.querySelectorAll('.postOffice-items__radio_mob');
        const shippingMethodsHelper = shippingMethods.querySelector('.postOffice-items__helperContaiener');

        shippingMethodsBtns.forEach((el) => {
            el.addEventListener('click', () => {
                if (window.matchMedia("(min-width: 650px)").matches) {
                    shippingMethodsBtns.forEach((elem) => {
                        elem.classList.remove('btnTabActive');
                    });
                    el.classList.add('btnTabActive');
                }
                shippingMethodsHelper.innerHTML = el.nextElementSibling.innerHTML;
            });
        });

        shippingMethodsBtns[0].click();

        shippingMethods.classList.remove('tabAnimation');
        setTimeout(() => {
            shippingMethods.classList.add('tabAnimation');
        }, 0);
    };

    postOfficeRadioBtn.forEach((e, index) => {
        const radioInput = e.querySelector('input');
        if (index === 0) {
            radioInput.setAttribute('checked', 'true');
        }

        e.addEventListener('click', () => {
            handleShippingMethodClick(e);
        });
    });

    if (postOfficeRadioBtn[0]) {
        postOfficeRadioBtn[0].click();
    }

    class Modal {
        constructor(modalId, openButtonId) {
            this.modal = document.getElementById(modalId);
            this.openButton = document.getElementById(openButtonId);

            this.openButton.addEventListener('click', () => {
                this.open();
            });

            window.addEventListener('click', (event) => {
                if (event.target === this.modal) {
                    this.close();
                }
            });

            const closeButton = this.modal.querySelector('.close');
            closeButton.addEventListener('click', () => {
                this.close();
            });
        }

        open() {
            this.modal.style.display = 'block';
            setTimeout(() => {
                this.modal.classList.add('open');
            }, 10);
        }

        close() {
            this.modal.classList.remove('open');
            setTimeout(() => {
                this.modal.style.display = 'none';
            }, 300);
        }
    }

    // const registrationModal = new Modal('registrationModal', 'registrationBtn');

})



