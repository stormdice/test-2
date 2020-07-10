import 'svgxuse';
import './modules/utils';
import showModalCart from './modules/cart-modal';
import {
  renderShoppingCartItems,
  getCartItemsFromLocalStorage,
} from './modules/cart-product';

(() => {
  const cartButton = document.querySelector('.js-cart');

  if (!cartButton) {
    return;
  }

  cartButton.addEventListener('click', (evt) => {
    evt.preventDefault();
    showModalCart();
  });
})();

renderShoppingCartItems(getCartItemsFromLocalStorage());
