import { useEffect, useState } from "react";
import CartItem from "./cartItem";
import CartSections from "../Styles/cartStyles";

export default function Cart() {
  let cartTotal = 0;
  const [cartItems, setCartItems] = useState([]);

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

  function checkout() {
    if (cartItems.length === 0) return;

    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

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
          <h3>Pack everything Up</h3>
          <div>
            <p>Total ({cartItems.length} items)</p>
            <p>
              <strong>${cartTotal}/-</strong>
            </p>
          </div>
          <button id="checkout-btn" onClick={checkout}>
            Proceed to Checkout
          </button>
        </div>
      </div>
      <div className="mobile-checkout">
        <button onClick={checkout}>
          Proceed to Buy ({cartItems.length} Items)
        </button>
      </div>
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
