const html = document.querySelector('html');    // <html> для отключения скрола


// модальное окно для заявок
const requestBtns = document.querySelectorAll('.btn-request');
const modalRequest = document.querySelector('.modal-request');
const modalRequestClose = document.querySelector('.modal-request__close');

requestBtns.forEach(function(item) {
  item.addEventListener('click', function() {
    modalRequest.classList.add('modal--active');
    html.classList.add('html-lock');
  })
})

modalRequestClose.addEventListener('click', function() {
  modalRequest.classList.remove('modal--active');
  html.classList.remove('html-lock');
})


// модальное окно для заявок на просмотр теплиц
const viewingBtns = document.querySelectorAll('.btn-viewing');
const modalViewing = document.querySelector('.modal-viewing');
const modalViewingClose = document.querySelector('.modal-viewing__close');

viewingBtns.forEach(function(item) {
  item.addEventListener('click', function() {
    modalViewing.classList.add('modal--active');
    html.classList.add('html-lock');
  })
})

modalViewingClose.addEventListener('click', function() {
  modalViewing.classList.remove('modal--active');
  html.classList.remove('html-lock');
})


// модальное окно карточки товара
const catalogAboutBtns = document.querySelectorAll('.catalog__btn-about');
const modalProduct = document.querySelector('.modal-product')
const modalProductClose = document.querySelector('.modal-product__close');

catalogAboutBtns.forEach(function(itemBtn) {
  itemBtn.addEventListener('click', function() {
    modalProduct.classList.add('modal--active');
    html.classList.add('html-lock');

    modalProduct.removeAttribute('data-buy-active');

    const modalProductBtn = modalProduct.querySelector('.modal-product__btn');
    modalProductBtn.setAttribute('data-buy-btn', null);
    modalProductBtn.innerText = 'Добавить в корзину';

    const id = modalProduct.dataset.id;

    const cartItems = document.querySelectorAll('.cart__item');
    cartItems.forEach(function(cartItem) {
      if (cartItem.dataset.id === id) {
        modalProduct.setAttribute('data-buy-active', null);

        const modalProductBtn = modalProduct.querySelector('[data-buy-btn]');
        modalProductBtn.removeAttribute('data-buy-btn');
        modalProductBtn.innerText = "В корзине";
        return;
      }
    })

  })
})

modalProductClose.addEventListener('click', function() {
  modalProduct.classList.remove('modal--active');
  html.classList.remove('html-lock');
})

// свайпер галереи в карточке товара
const productGallerySwiper = new Swiper('.modal-product__gallery', {
  slidesPerView: 3,
})
// главный свайпер в карточке товара
const productSwiper = new Swiper('.modal-product__swiper', {

  navigation: {
      nextEl: '.modal-product__swiper-btn-next',
      prevEl: '.modal-product__swiper-btn-prev',
  },

  thumbs: {
      swiper: productGallerySwiper,
  },
})
