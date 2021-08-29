import { useEffect, useState } from "react";
import styled from "styled-components";
import CartItem from "./cartItem";

export default function Cart({ notify }) {
  let cartTotal = 0;
  // __________________________HOOKS START___________________________________
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
  // __________________________END OF HOOKS___________________________________

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
    // __________________________JSX___________________________________
    <CartSections>
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
                  notify={notify}
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

const CartSections = styled.div`
  height: 90vh;
  margin: 0 40px;
  text-align: center;

  h1 {
    margin: 10px 0;
    text-decoration: underline;
  }

  .cart_page_sections {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkout_card {
    position: fixed;
    top: 20%;
    right: 40px;
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;

    * {
      margin: 7px 0;
    }
  }

  .cart_item {
    width: 600px;
    max-width: auto;
    margin: 10px;
    padding: 10px 15px;
    /* border-radius: 5px; */
    border-bottom: 2px solid grey;
  }

  .cart_total {
    text-align: end;
  }

  #checkout-btn {
    padding: 7px 14px;
    margin: 5px 0;
    background-color: #2ab408;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #50df2c;
    }
  }
`;
