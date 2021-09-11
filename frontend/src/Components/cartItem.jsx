import { MobileItem, Item } from "../Styles/cartItemStyles";
import { closeSpinner, startSpinner } from "../Components/spinner";

export default function CartItem({ ItemData, setCartItems }) {
  const { price, image, name, quantity, _id } = ItemData;

  function removeFromCart(productID) {
    startSpinner();
    const letestCartData = fetch("http://localhost:8080/cart/modify", {
      credentials: "include",
      body: JSON.stringify({ type: "REMOVE", data: { _id: productID } }),
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then(() => {
        return fetch("http://localhost:8080/cart-items", {
          credentials: "include",
        }).then((res) => res.json());
      });

    letestCartData
      .then((data) => {
        closeSpinner();
        setCartItems(data);
      })
      .catch((err) => console.log(err));
  }

  function modifyQuantity(data) {
    startSpinner();
    const letestCartData = fetch("http://localhost:8080/cart/item/modify", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        return fetch("http://localhost:8080/cart-items", {
          credentials: "include",
        });
      })
      .then((res) => res.json())
      .catch((err) => console.log(err));

    letestCartData.then((data) => {
      closeSpinner();
      setCartItems(data);
    });
  }

  return (
    <>
      <Item className="cart_item">
        <div className="cart_item_img">
          <img src={image} alt="product_img" />
        </div>
        <div className="cart_item_main">
          <span>{name}</span>
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
            <button className="rmv-btn" onClick={() => removeFromCart(_id)}>
              Remove from Cart
            </button>
          </div>
        </div>
        <span>Price - ${price}</span>
      </Item>

      <MobileItem className="cart_item">
        <div className="mobile_cart_item_detail">
          <img src={image} alt="product_img" />
          <span>
            <p>
              <strong>{name}</strong>
            </p>
            <p>Price - ${price}</p>
          </span>
        </div>
        <div className="mobile_cart_item_modifier">
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
          <button className="rmv-btn" onClick={() => removeFromCart(_id)}>
            Delete
          </button>
        </div>
      </MobileItem>
    </>
  );
}
