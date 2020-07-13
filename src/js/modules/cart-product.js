import { Cart, PRODUCTS } from './data';
import calculateHeaderPrice from './header-price';

/**
 * Возвращает разметку карточки товара корзины
 * @param {Object} cartItem - данные карточки товара
 * @param {number} cartItem.id - id
 * @param {string} cartItem.title - Наименование товара
 * @param {number} cartItem.price - Цена товара
 */
const cartItemTemplate = ({ id, title, price }) => {
  return `<article class="cart-item" id="cart-item-${id}">
      <div class="cart-item__img">
        <picture>
          <source srcset="/img/content/item@1x.webp, /img/content/item@2x.webp 2x" type="image/webp" />
          <img alt="alchemy of crystals sticker pack" src="/img/content/item@1x.png" srcset="/img/content/item@2x.png 2x" width="134" height="75" />
        </picture>
      </div>
      <div class="cart-item__content">
        <h3 class="cart-item__title">${title}</h3>
        <span class="cart-item__price" lang="ru">${price.toLocaleString(
          'ru-RU'
        )} руб.</span>
        <button class="btn btn--gray cart-item__delete js-delete-item" type="button">Delete</button>
      </div>
    </article>`;
};

/**
 * Получает данные из LocalStorage
 * @return {Array} - массив id карточек
 */
const getCartItemsFromLocalStorage = () => {
  if (!localStorage.getItem(Cart.KEY)) {
    localStorage.setItem(Cart.KEY, JSON.stringify(Cart.DATA));
  }

  return JSON.parse(localStorage.getItem(Cart.KEY));
};

/**
 * Добавляет состояние для пустой корзины
 */
const addEmtpyCartState = () => {
  const items = getCartItemsFromLocalStorage();

  if (items.length !== 0) {
    return;
  }

  const modalCart = document.querySelector('.cart-modal__content');
  const priceElement = document.querySelector('.js-header-price');

  modalCart.innerHTML = 'Your cart is empty';
  priceElement.innerHTML = '';
};

/**
 * удаляет все товары из корзины
 */
const deleteAllItems = () => {
  localStorage.setItem(Cart.KEY, '[]');
  addEmtpyCartState();
};

/**
 * добавляет обработчик удаления всех товаров из корзины
 */
const addDeleteAllItemsHandler = () => {
  const deleteButton = document.querySelector('.js-delete-all');

  if (!deleteButton) {
    return;
  }

  deleteButton.addEventListener('click', () => {
    deleteAllItems();
  });
};

/**
 * Рендерит товары в корзине
 * @param {Array} items - массив id карточек
 */
const renderShoppingCartItems = (items) => {
  const modalCart = document.querySelector('.cart-modal__content');

  if (!modalCart) {
    return;
  }

  const addedProducts = PRODUCTS.filter((product) =>
    items.includes(product.id)
  );

  const cartItems = addedProducts
    .map((product) => cartItemTemplate(product))
    .join('\n');

  modalCart.innerHTML = '';
  modalCart.insertAdjacentHTML('beforeend', cartItems);
  addDeleteItemHandlers();
  calculateHeaderPrice(addedProducts);
  addDeleteAllItemsHandler();
  addEmtpyCartState();
};

/**
 * Удаляет товар из корзины
 * @param {number} id - id
 */
const deleteItemFromCart = (id) => {
  const oldData = getCartItemsFromLocalStorage();
  const newData = oldData.filter((item) => item !== id);

  localStorage.setItem(Cart.KEY, JSON.stringify(newData));
  renderShoppingCartItems(getCartItemsFromLocalStorage());
  addEmtpyCartState();
};

/**
 * добавляет обработчики удаления товара
 */
const addDeleteItemHandlers = () => {
  const deleteButtons = document.querySelectorAll('.js-delete-item');

  if (deleteButtons.length === 0) {
    return;
  }

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (evt) => {
      evt.preventDefault();

      const idx = parseInt(
        button.closest('.cart-item').id.match(/[\d]/)[0],
        10
      );
      deleteItemFromCart(idx);
    });
  });
};

/**
 * Добавляет товар в корзину
 * @param {number} id - id
 */
const addItemToCart = (id) => {
  const oldData = getCartItemsFromLocalStorage();
  const newData = [...new Set([id, ...oldData])];

  localStorage.setItem(Cart.KEY, JSON.stringify(newData));
  renderShoppingCartItems(getCartItemsFromLocalStorage());
};

export { addItemToCart, renderShoppingCartItems, getCartItemsFromLocalStorage };
