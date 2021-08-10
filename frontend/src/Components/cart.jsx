import { useEffect, useState } from "react";

export default function Cart() {
  // __________________________HOOKS START___________________________________

  let cartTotal = 0;
  const [cartItems, setCartItems] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/cart-items", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ message, data }) => {
        if (!data) console.log(message);
        else {
          setCartItems(data);
          console.log(data);
        }
      });
  }, []);

  // __________________________END OF HOOKS___________________________________

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
              cartTotal += item.price;
              return (
                <div className="cart_item" key={item._id}>
                  <div className="cart_item_img">
                    <img src={item.image} alt="product_img" />
                  </div>
                  <div className="cart_item_main">
                    <span>{item.name}</span>
                    <span>Price - ${item.price}</span>
                    <div className="cart_item_modifier">
                      <div>
                        <button>+</button>
                        <span className="cart_item_count">{item.count}</span>
                        <button>-</button>
                      </div>
                      <button>Remove from Cart❌</button>
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
