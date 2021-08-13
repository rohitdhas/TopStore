import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

export default function Cart() {
  let cartTotal = 0;
  // __________________________HOOKS START___________________________________
  const [cartItems, setCartItems] = useState([]);

  createPortal(<h1>Loading...</h1>, document.getElementById("portal"));

  useEffect(() => {
    getCartData().then((data) => {
      if ("message" in data) return;
      setCartItems(data);
    });
  }, []);
  // __________________________END OF HOOKS___________________________________

  function removeFromCart(productID) {
    fetch("http://localhost:8080/cart/modify", {
      credentials: "include",
      body: JSON.stringify({ type: "REMOVE", data: { _id: productID } }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(({ message }) => {
        console.log(message);
        getCartData().then((data) => setCartItems(data));
      });
  }

  function modifyQuantity(data) {
    fetch("http://localhost:8080/cart/item/modify", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(({ message }) => {
        console.log(message);
        getCartData().then((data) => setCartItems(data));
      })
      .catch((err) => console.log(err));
  }

  return (
    // __________________________JSX___________________________________
    <div className="cart">
      <h1>Your Cart🛒</h1>
      <div className="cart_page_sections">
        <div className="cart_items_section">
          {cartItems.length === 0 ? (
            <h1>Cart is Empty!🛒</h1>
          ) : (
            cartItems.map((item) => {
              const { price, image, name, quantity, _id } = item;
              cartTotal += price * quantity;
              return (
                <div className="cart_item" key={_id}>
                  <div className="cart_item_img">
                    <img src={image} alt="product_img" />
                  </div>
                  <div className="cart_item_main">
                    <span>{name}</span>
                    <span>Price - ${price}</span>
                    <div className="cart_item_modifier">
                      <div>
                        <button
                          onClick={() =>
                            modifyQuantity({
                              type: "INCREMENT",
                              data: { _id, quantity },
                            })
                          }
                        >
                          +
                        </button>
                        <span className="cart_item_count">{quantity}</span>
                        <button
                          onClick={() =>
                            modifyQuantity({
                              type: "DECREMENT",
                              data: { _id, quantity },
                            })
                          }
                        >
                          -
                        </button>
                      </div>
                      <button onClick={() => removeFromCart(_id)}>
                        Remove from Cart❌
                      </button>
                    </div>
                  </div>
                </div>
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
          <h4>Pack everything Up</h4>
          <div>
            <p>Total ({cartItems.length} items)</p>
            <p>
              <strong>${cartTotal}/-</strong>
            </p>
          </div>
          <button>Proceed to Checkout</button>
        </div>
      </div>
    </div>
  );
}

async function getCartData() {
  let res = await fetch("http://localhost:8080/cart-items", {
    credentials: "include",
  });
  let data = await res.json();
  return data;
}
