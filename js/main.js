// изменение навбара при прокрутке вниз
const nav = document.querySelector('.nav');

window.addEventListener('scroll', function() {
    let scrolled = this.scrollY;
    if (scrolled > 50) {
        nav.classList.add('nav--small');
    } else {
        nav.classList.remove('nav--small');
    }
})

// отображение карты Яндекс
function init() {
  let map = new ymaps.Map('contacts-map', {
    center: [54.04155560231545,38.01950267730705],
    zoom: 16,

  })

  let placemark = new ymaps.Placemark([54.04214607053281,38.011734999999916], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../images/marker.svg',
    iconImageSize: [40, 40],

  })

  map.controls.remove('geolocationControl');
  map.controls.remove('searchControl');
  map.controls.remove('trafficControl');
  map.controls.remove('typeSelector');
  map.controls.remove('fullscreenControl');
  map.controls.remove('zoomControl');
  map.controls.remove('rulerControl');
  map.behaviors.disable(['scrollZoom']);

  map.geoObjects.add(placemark);
}

ymaps.ready(init);


loadCart();

// установка кнопок в зависимости от корзины (autoexec)
const cartItems = document.querySelectorAll('.cart__item');
const catalogItems = document.querySelectorAll('.catalog__item');

cartItems.forEach(function(cartItem) {
  const cartId = cartItem.dataset.id;

  catalogItems.forEach(function(catalogItem) {
    if (cartId === catalogItem.dataset.id) {
      catalogItem.setAttribute('data-buy-active', null)

      const catalogItemBtn = catalogItem.querySelector('[data-buy-btn]');
      catalogItemBtn.removeAttribute('data-buy-btn');
      catalogItemBtn.innerText = "В корзине";
    }
  })
})

// обновление значений корзины
const cartItemsCounter = document.querySelectorAll('[data-counter]');

cartItemsCounter.forEach(function(cartItemCounter) {
  cartItemCounter.addEventListener('change', function() {
    updateTotalPrice();
    saveCart();

    if (cartItemCounter.value <= 0) {
      const id = cartItemCounter.closest('.cart__item').dataset.id;

      const catalogItems = document.querySelectorAll('.catalog__item');
      catalogItems.forEach(function(catalogItem) {
          if (catalogItem.dataset.id === id) {
              catalogItem.removeAttribute('data-buy-active');

              const catalogItemBtn = catalogItem.querySelector('.catalog__btn-buy');
              catalogItemBtn.setAttribute('data-buy-btn', null);
              catalogItemBtn.innerText = 'Добавить в корзину';
          }
      })

      cartItemCounter.closest('.cart__item').remove();

      updateCartStatus();
      saveCart();
  }
  })
})

updateCartStatus();
updateTotalPrice();


const hamburger = document.querySelector('.hamburger');
console.log(hamburger);
const navList = document.querySelector('.nav__list');

hamburger.addEventListener('click', function() {
  html.classList.toggle('html-lock');
  navList.classList.toggle('nav__list--active');
  hamburger.classList.toggle('hamburger--active');
})