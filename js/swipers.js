// свайпер в блоке "О нас"
const aboutSwiper = new Swiper('.about__swiper', {
    loop: true,
    autoplay: {
        delay: 3000,
    },

    navigation: {
        nextEl: '.about__swiper-btn-next',
        prevEl: '.about__swiper-btn-prev',
    },
})
