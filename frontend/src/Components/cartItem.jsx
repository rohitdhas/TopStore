import styled from "styled-components";

export default function CartItem({ ItemData, notify, setCartItems }) {
  const { price, image, name, quantity, _id } = ItemData;

  function removeFromCart(productID) {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

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
        notify(message);
        loader.classList.remove("active");
        getCartData().then((data) => setCartItems(data));
        notify(message);
      });
  }

  function modifyQuantity(data) {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    fetch("http://localhost:8080/cart/item/modify", {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then(() => {
        loader.classList.remove("active");
        getCartData().then((data) => setCartItems(data));
      })
      .catch((err) => console.log(err));
  }

  return (
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
  );
}

const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 100px;
    width: 100px;
  }

  .cart_item_main {
    * {
      margin: 5px 0;
    }
    span {
      margin: 0 10px;
    }

    button {
      padding: 7px 14px;
      margin: 5px 0;
      background-color: blueviolet;
      color: white;
      border: none;
      cursor: pointer;
      border-radius: 5px;

      &:hover {
        background-color: #591797;
      }
    }

    .rmv-btn {
      background-color: tomato;

      &:hover {
        background-color: #c7371d;
      }
    }
  }
`;

async function getCartData() {
  let res = await fetch("http://localhost:8080/cart-items", {
    credentials: "include",
  });
  let data = await res.json();
  return data;
}
