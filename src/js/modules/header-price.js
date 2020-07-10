import numeral from 'numeral';

/**
 * Рассчитывает общую цену товаров хедера
 * @param {Array} products - данные из массива карточек товаров
 */
const calculateHeaderPrice = (products = '') => {
  const price = products.reduce((acc, product) => acc + product.price, 0);
  const priceElement = document.querySelector('.js-header-price');

  if (products.length === 0) {
    priceElement.innerHTML = '';
  } else {
    priceElement.textContent = products ? numeral(price).format('0.0.0') : '';
  }
};

export default calculateHeaderPrice;
