import toggleAddressForm from "../helper_functions/toggleAddressForm";

export const CheckoutCard = ({ cartItemsLength, cartTotal }) => {
  return (
    <>
      <h3>Pack everything Up</h3>
      <div>
        <p>Total ({cartItemsLength} items)</p>
        <p>
          <strong>(${cartTotal})</strong>
        </p>
      </div>
      <button
        id="checkout-btn"
        onClick={cartItemsLength > 0 ? toggleAddressForm : null}
      >
        Proceed to Checkout
      </button>
    </>
  );
};

export const MobileCheckoutBtn = ({ cartItemsLength }) => {
  return (
    <button onClick={cartItemsLength > 0 ? toggleAddressForm : null}>
      Proceed to Buy ({cartItemsLength} Items)
    </button>
  );
};
