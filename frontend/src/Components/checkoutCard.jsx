export const CheckoutCard = ({ cartItemsLength, cartTotal, checkout }) => {
  return (
    <>
      <h3>Pack everything Up</h3>
      <div>
        <p>Total ({cartItemsLength} items)</p>
        <p>
          <strong>(${cartTotal})</strong>
        </p>
      </div>
      <button id="checkout-btn" onClick={checkout}>
        Proceed to Checkout
      </button>
    </>
  );
};

export const MobileCheckoutBtn = ({ checkout, cartItemsLength }) => {
  return (
    <button onClick={checkout}>Proceed to Buy ({cartItemsLength} Items)</button>
  );
};
