import { useEffect, useRef } from "react";
import CartItem from "../Components/cartItem";
import CartSections, { AddressForm } from "../Styles/cartStyles";
import { CheckoutCard, MobileCheckoutBtn } from "../Components/checkoutCard";
import { useCart } from "../helpers/cartHandler";
import { toggleAddressForm } from "../helpers/togglers";
import checkout from "../helpers/checkoutHandler";

export default function Cart() {
  let cartTotal = 0;
  const userAddress = useRef("");
  const userMobile = useRef(0);

  const { cart: cartItems } = useCart();

  useEffect(() => {
    document.title = "Your Cart!π";
  }, []);

  return (
    <CartSections className="cart">
      <h1>Your Cartπ</h1>
      <div className="cart_page_sections">
        <div className="cart_items_section">
          {cartItems.length === 0 ? (
            <h2>Cart is Empty!</h2>
          ) : (
            cartItems.map((item) => {
              const { _id, quantity, price } = item;

              cartTotal += price * quantity;
              return <CartItem key={_id} ItemData={item} />;
            })
          )}
          <div className="cart_item cart_total">
            <p>
              <strong>
                Total ({cartItems.length} items): {cartTotal}/-
              </strong>
            </p>
          </div>
        </div>
        <div className="checkout_card">
          <CheckoutCard
            cartItemsLength={cartItems.length}
            cartTotal={cartTotal}
          />
        </div>
      </div>
      <div className="mobile-checkout">
        <MobileCheckoutBtn cartItemsLength={cartItems.length} />
      </div>
      <AddressForm className="address_form">
        <div id="address_form_overlay" onClick={toggleAddressForm}></div>
        <form onSubmit={(e) => checkout(e, userAddress, userMobile)}>
          <p className="form_title">Enter your Address before proceeding!π</p>
          <textarea
            name="address"
            id="delivery_address"
            cols="30"
            rows="10"
            placeholder="Your Full Address"
            ref={userAddress}
            required
          ></textarea>
          <input
            type="number"
            id="phone_number"
            placeholder="Your Mobile Number"
            maxLength={10}
            minLength={10}
            required
            ref={userMobile}
          />
          <p>
            <b>NOTEππ»</b> - Enter your correct address with Pin Code. Your order
            will not be processed if address isn't valid!
          </p>
          <button type="submit">Deliver to this Address</button>
        </form>
      </AddressForm>
    </CartSections>
  );
}
