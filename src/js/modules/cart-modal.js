import { disablePageScroll, enablePageScroll } from 'scroll-lock';

/**
 * Закрывает модальное окно
 * @param {DOM Node} modal - модальное окно
 */
const modalClose = (modal) => {
  modal.classList.remove('modal--show');
  enablePageScroll(modal);
};

/**
 * Показывает модальное окно корзины
 */
const showModalCart = () => {
  const modal = document.querySelector('.js-modal');

  if (!modal) {
    return;
  }

  const closeBtn = modal.querySelector('.js-modal-close');

  closeBtn.addEventListener('click', () => {
    modalClose(modal);
  });

  modal.addEventListener('mouseup', (evt) => {
    if (evt.target === modal) {
      modalClose(modal);
    }
  });

  modal.classList.add('modal--show');
  disablePageScroll(modal);
};

export default showModalCart;
