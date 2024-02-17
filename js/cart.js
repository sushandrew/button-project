// модальное окно для корзины
const cartBtn = document.querySelector('.nav__cart-btn');
const cart = document.querySelector('.cart');
const cartClose = document.querySelector('.cart__close');

cartBtn.addEventListener('click', function() {
    cart.classList.add('modal--active');
    html.classList.add('html-lock');
})

cartClose.addEventListener('click', function() {
    cart.classList.remove('modal--active');
    html.classList.remove('html-lock');
})


const cartList = cart.querySelector('.cart__list');

window.addEventListener('click', function(event) {
    const target = event.target;

    // реагирование на кнопки "Добавить в корзину"
    if (target.hasAttribute('data-buy-btn')) {
        target.innerText = "В корзине";
        target.removeAttribute('data-buy-btn');

        const item = target.closest('[data-id]');
        item.setAttribute('data-buy-active', null)

        // проверка была ли нажата кнопка в модальном окне
        if (item.classList.contains('modal-product')) {
            const catalogItems = this.document.querySelectorAll('.catalog__item');
            const id = item.dataset.id;
            catalogItems.forEach(function(catalogItem) {
                if (catalogItem.dataset.id === id) {
                    const catalogItemBtn = catalogItem.querySelector('[data-buy-btn]');

                    catalogItemBtn.removeAttribute('data-buy-btn');
                    catalogItemBtn.innerText = "В корзине";
                }
            })
        }
        
        const flowerInfo = {
            id: item.dataset.id,
            title: item.querySelector('[data-title-flower]').innerText,
            price: item.querySelector('[data-price-flower]').innerText,
        }

        const itemHTML = `
        <div class="cart__item" data-id="${flowerInfo.id}">
            <picture class="cart__picture">
                <source srcset="images/flower/flower-1-small.avif" type="image/avif">
                <source srcset="images/flower/flower-1-small.webp" type="image/webp">
                <img class="cart__img" src="images/flower/flower-1-small.jpg" alt="">
            </picture>
            <p class="cart__item-title">${flowerInfo.title}</p>
            <p class="cart__item-price">${flowerInfo.price}</p>
            <div class="cart__counter-wrapper">
                <button class="cart__counter-btn" data-counter-minus>-</button>
                <input class="cart__counter" value="1" data-counter>
                <button class="cart__counter-btn" data-counter-plus>+</button>
            </div>
        </div>
        `;

        cartList.insertAdjacentHTML('beforeend', itemHTML);

        const cartItemCounter = cartList.querySelector(`[data-id="${flowerInfo.id}"]`).querySelector('[data-counter]');

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

        updateCartStatus();
        updateTotalPrice();
        saveCart();
    }

    // +/- и counter
    if (target.closest('.cart__counter-wrapper')) {
        const counterWrapper = target.closest('.cart__counter-wrapper');
        const counter = counterWrapper.querySelector('[data-counter]');

        if (target.hasAttribute('data-counter-minus')) {
            if (counter.value > 0) {
                counter.value = parseInt(counter.value) - 1;
            }
            if (counter.value <= 0) {
                const id = target.closest('.cart__item').dataset.id;

                const catalogItems = this.document.querySelectorAll('.catalog__item');
                catalogItems.forEach(function(catalogItem) {
                    if (catalogItem.dataset.id === id) {
                        catalogItem.removeAttribute('data-buy-active');
    
                        const catalogItemBtn = catalogItem.querySelector('.catalog__btn-buy');
                        catalogItemBtn.setAttribute('data-buy-btn', null);
                        catalogItemBtn.innerText = 'Добавить в корзину';
                    }
                })

                target.closest('.cart__item').remove();

                updateCartStatus();
            }

            updateTotalPrice();
            saveCart();
        }
        else if (target.hasAttribute('data-counter-plus')) {
            counter.value = parseInt(counter.value) + 1;

            updateTotalPrice();
            saveCart();
        }
    }
})


const cartCounter = document.querySelector('[data-cart-counter]');

// обновление счетчика корзины
function updateCartStatus() {
    cartCounter.innerText = cartList.children.length;
    if (parseInt(cartCounter.innerText) == 0) {
        cartCounter.classList.remove('nav__cart-counter--active');
    } else {
        cartCounter.classList.add('nav__cart-counter--active');
    }
}

const totalPrice = document.querySelector('.cart__price-total');
const oldTotalPrice = document.querySelector('.cart__price-old');
const cartDiscount = document.querySelector('.cart__discount');

// обновление итоговых сумм
function updateTotalPrice() {
    let oldTotalPriceValue = 0;
    const cartItems = cartList.querySelectorAll('.cart__item');

    cartItems.forEach(function(cartItem) {
        const price = parseInt(cartItem.querySelector('.cart__item-price').innerText);
        const count = parseInt(cartItem.querySelector('.cart__counter').value);

        oldTotalPriceValue += count * price;
    })

    oldTotalPrice.innerText = oldTotalPriceValue.toFixed(2);

    let totalPriceValue = 0;
    cartDiscount.classList.remove('cart__discount--hidden');

    if (parseInt(oldTotalPrice.innerText) >= 20000 && parseInt(oldTotalPrice.innerText) < 100000) {
        totalPriceValue = (oldTotalPriceValue * 0.9).toFixed(2);
        cartDiscount.innerText = 'Ваша скидка 10%';
    }
    else if(parseInt(oldTotalPrice.innerText) >= 100000 && parseInt(oldTotalPrice.innerText) < 500000) {
        totalPriceValue = (oldTotalPriceValue * 0.8).toFixed(2);
        cartDiscount.innerText = 'Ваша скидка 20%';
    }
    else if(parseInt(oldTotalPrice.innerText) >= 500000) {
        totalPriceValue = (oldTotalPriceValue * 0.7).toFixed(2);
        cartDiscount.innerText = 'Ваша скидка 30%';
    } else {
        totalPriceValue = oldTotalPriceValue.toFixed(2);
        cartDiscount.classList.add('cart__discount--hidden');
    }

    totalPrice.innerText = totalPriceValue;

    if (parseInt(oldTotalPrice.innerText) >= 20000) {
        oldTotalPrice.classList.remove('cart__price-old--hidden');
    } else {
        oldTotalPrice.classList.add('cart__price-old--hidden');
    }
}

function saveCart() {
    const cartItems = cartList.querySelectorAll('.cart__item');
    let cartJson = []

    cartItems.forEach(function(cartItem) {
        cartJson.push({
            'id': cartItem.dataset.id,
            'img': cartItem.querySelector('.cart__img').getAttribute('src'),
            'title': cartItem.querySelector('.cart__item-title').innerText,
            'price': cartItem.querySelector('.cart__item-price').innerText,
            'count': cartItem.querySelector('.cart__counter').value,
        });
    })

    localStorage.setItem('cart', JSON.stringify(cartJson));
}

function loadCart() {
    const cartListJson = JSON.parse(localStorage.getItem('cart'));
    
    cartListJson.forEach(function(cartItem) {
        const cartItemHTML = `
        <div class="cart__item" data-id="${cartItem.id}">
            <picture class="cart__picture">
                <img class="cart__img" src="${cartItem.img}" alt="">
            </picture>
            <p class="cart__item-title">${cartItem.title}</p>
            <p class="cart__item-price">${cartItem.price}</p>
            <div class="cart__counter-wrapper">
                <button class="cart__counter-btn" data-counter-minus>-</button>
                <input class="cart__counter" value="${cartItem.count}" data-counter>
                <button class="cart__counter-btn" data-counter-plus>+</button>
            </div>
        </div>
        `

        cartList.insertAdjacentHTML('beforeend', cartItemHTML);
    })

}