import { disablePageScroll, enablePageScroll } from 'scroll-lock';

const modalClose = (modal) => {
  modal.classList.remove('modal--show');
  enablePageScroll(modal);
};

const showModalCart = () => {
  const modal = document.querySelector('.js-modal');
  const cartButton = document.querySelector('.js-cart');

  if (modal && cartButton) {
    const closeBtn = modal.querySelector('.js-modal-close');

    cartButton.addEventListener('click', () => {
      modal.classList.add('modal--show');
      disablePageScroll(modal);
    });

    closeBtn.addEventListener('click', () => {
      modalClose(modal);
    });

    modal.addEventListener('mouseup', (evt) => {
      if (evt.target === modal) {
        modalClose(modal);
      }
    });
  }
};

export default showModalCart;
