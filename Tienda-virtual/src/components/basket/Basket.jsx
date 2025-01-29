/* eslint-disable max-len */
import { BasketItem as BasketItemComponent, BasketToggle } from '@/components/basket';
import { Boundary, Modal } from '@/components/common';
import { CHECKOUT_STEP_1 } from '@/constants/routes';
import firebase from 'firebase/firebase';
import { calculateTotal, displayMoney } from '@/helpers/utils';
import { useDidMount, useModal } from '@/hooks';
import React, { useEffect } from 'react'; // This import is already present
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { clearBasket } from '@/redux/actions/basketActions';

// Import React and BasketItem are already present, so we adapt the existing Basket component instead.
// Assuming BasketItem is in the same directory, adjust the import path if necessary.
import BasketItem from './BasketItem'; // Adjusted to use the local BasketItem for the transformation logic

const Basket = () => {
  const { isOpenModal, onOpenModal, onCloseModal } = useModal();
  const { basket, user } = useSelector((state) => ({
    basket: state.basket,
    user: state.auth
  }));
  const history = useHistory();
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const didMount = useDidMount();

  useEffect(() => {
    if (didMount && firebase.auth.currentUser && basket.length !== 0) {
      firebase.saveBasketItems(basket, firebase.auth.currentUser.uid)
        .then(() => {
          console.log('Producto guardado en la cesta');
        })
        .catch((e) => {
          console.log(e);
        });
    }
  }, [basket.length]);

  const onCheckOut = () => {
    if ((basket.length !== 0 && user)) {
      document.body.classList.remove('is-basket-open');
      history.push(CHECKOUT_STEP_1);
    } else {
      onOpenModal();
    }
  };

  const onSignInClick = () => {
    onCloseModal();
    document.body.classList.remove('basket-open');
    history.push(CHECKOUT_STEP_1);
  };

  const onClearBasket = () => {
    if (basket.length !== 0) {
      dispatch(clearBasket());
    }
  };

  return user && user.role === 'ADMIN' ? null : (
    <Boundary>
      <Modal
        isOpen={isOpenModal}
        onRequestClose={onCloseModal}
      >
        <p className="text-center">Debes de Iniciar Sesion para continuar con la compra</p>
        <br />
        <div className="d-flex-center">
          <button
            className="button button-border button-border-gray button-small"
            onClick={onCloseModal}
            type="button"
          >
            Continuar Comprando
          </button>
          &nbsp;
          <button
            className="button button-small"
            onClick={onSignInClick}
            type="button"
          >
            Inicia Sesion para el check-out
          </button>
        </div>
      </Modal>
      <div className="basket">
        <div className="basket-list">
          <div className="basket-header">
            <h3 className="basket-header-title">
              Mi Cesta &nbsp;
              <span>
                (
                {` ${basket.length} ${basket.length > 1 ? 'items' : 'item'}`}
                )
              </span>
            </h3>
            <BasketToggle>
              {({ onClickToggle }) => (
                <span
                  className="basket-toggle button button-border button-border-gray button-small"
                  onClick={onClickToggle}
                  role="presentation"
                >
                  Cerrar
                </span>
              )}
            </BasketToggle>
            <button
              className="basket-clear button button-border button-border-gray button-small"
              disabled={basket.length === 0}
              onClick={onClearBasket}
              type="button"
            >
              <span>Limpiar Cesta</span>
            </button>
          </div>
          {basket.length <= 0 && (
            <div className="basket-empty">
              <h5 className="basket-empty-msg">Tu Cesta esta vacia</h5>
            </div>
          )}
          {basket.map((product, i) => {
            // Transform the product before passing it to BasketItem
            const transformedProduct = {
              ...product,
              imageCollection: product.imageCollection.map(image => image.url)
            };

            return (
              <BasketItem
                key={`${product.id}_${i}`}
                product={transformedProduct}
                basket={basket}
                dispatch={dispatch}
              />
            );
          })}
        </div>
        <div className="basket-checkout">
          <div className="basket-total">
            <p className="basket-total-title">Monto Subtotal:</p>
            <h2 className="basket-total-amount">
              {displayMoney(calculateTotal(basket.map((product) => product.price * product.quantity)))}
            </h2>
          </div>
          <button
            className="basket-checkout-button button"
            disabled={basket.length === 0 || pathname === '/checkout'}
            onClick={onCheckOut}
            type="button"
          >
            Check-Out
          </button>
        </div>
      </div>
    </Boundary>
  );
};

export default Basket;
