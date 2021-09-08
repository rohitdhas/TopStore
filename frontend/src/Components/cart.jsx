import { useEffect, useState, useRef } from "react";
import CartItem from "./cartItem";
import CartSections, { AddressForm } from "../Styles/cartStyles";
import { CheckoutCard, MobileCheckoutBtn } from "./checkoutCard";

export default function Cart() {
  let cartTotal = 0;
  const [cartItems, setCartItems] = useState([]);
  const userAddress = useRef("");
  const userMobile = useRef();

  useEffect(() => {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    getCartData().then((data) => {
      if ("message" in data) {
        loader.classList.remove("active");
        return;
      }
      setCartItems(data);
      loader.classList.remove("active");
    });
  }, []);

  function checkout(e) {
    e.preventDefault();
    if (cartItems.length === 0) return;

    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    fetch("http://localhost:8080/place-order", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        address: userAddress.current.value,
        mobile: userMobile.current.value,
      }),
    });

    fetch("http://localhost:8080/create-checkout", {
      credentials: "include",
    })
      .then((res) =>
        res.ok ? res.json() : res.json().then((json) => Promise.reject(json))
      )
      .then(({ url }) => {
        window.location = url;
        loader.classList.remove("active");
      })
      .catch((err) => console.log(err));
  }

  function toggleAddressForm(e) {
    e.preventDefault();
    if (cartItems.length === 0) return;

    const overlay = document.getElementById("address_form_overlay");
    const form = document.querySelector(".address_form form");
    userAddress.current.focus();

    overlay.classList.toggle("active");
    form.classList.toggle("active");
  }

  return (
    <CartSections className="cart">
      <h1>Your Cart🎈</h1>
      <div className="cart_page_sections">
        <div className="cart_items_section">
          {cartItems.length === 0 ? (
            <h2>Cart is Empty!</h2>
          ) : (
            cartItems.map((item) => {
              const { _id, quantity, price } = item;

              cartTotal += price * quantity;
              return (
                <CartItem
                  key={_id}
                  ItemData={item}
                  setCartItems={setCartItems}
                />
              );
            })
          )}
          <div className="cart_item cart_total">
            <p>
              <strong>
                Total ({cartItems.length} items): ${cartTotal}
              </strong>
            </p>
          </div>
        </div>
        <div className="checkout_card">
          <CheckoutCard
            cartItemsLength={cartItems.length}
            cartTotal={cartTotal}
            checkout={toggleAddressForm}
          />
        </div>
      </div>
      <div className="mobile-checkout">
        <MobileCheckoutBtn
          checkout={toggleAddressForm}
          cartItemsLength={cartItems.length}
        />
      </div>
      <AddressForm className="address_form">
        <div id="address_form_overlay" onClick={toggleAddressForm}></div>
        <form onSubmit={checkout}>
          <p className="form_title">Enter your Address before proceeding!🙂</p>
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
            <b>NOTE👉🏻</b> - Enter your correct address with Pin Code. Your order
            will not be processed if address isn't valid!
          </p>
          <button type="submit">Deliver to this Address</button>
        </form>
      </AddressForm>
    </CartSections>
  );
}

async function getCartData() {
  let res = await fetch("http://localhost:8080/cart-items", {
    credentials: "include",
  });
  let data = await res.json();
  return data;
}
