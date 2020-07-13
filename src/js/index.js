import 'svgxuse';
import './modules/closest-polyfill';
import showModalCart from './modules/cart-modal';
import {
  addItemToCart,
  renderShoppingCartItems,
  getCartItemsFromLocalStorage,
  changePricesToOriginal,
} from './modules/cart-product';
import initializeClock from './modules/clock';

/**
 * Добавляет обработчик открытия корзины
 */
const addOpenHeaderCartHandler = () => {
  const cartButton = document.querySelector('.js-cart');

  if (!cartButton) {
    return;
  }

  cartButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    showModalCart();
  });
};

/**
 * добавляет обработчики для покупки товара
 */
const addBuyItemHandlers = () => {
  const buyButtons = document.querySelectorAll('.js-buy');

  if (buyButtons.length === 0) {
    return;
  }

  buyButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();
      const idx = parseInt(button.closest('.product').id, 10);

      addItemToCart(idx);
      showModalCart();
    });
  });
};

addOpenHeaderCartHandler();
addBuyItemHandlers();
renderShoppingCartItems(getCartItemsFromLocalStorage());
initializeClock('clock', changePricesToOriginal);
