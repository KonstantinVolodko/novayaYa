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

})



