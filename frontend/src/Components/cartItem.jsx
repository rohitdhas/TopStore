import { MobileItem, Item } from "../Styles/cartItemStyles";
import { useCart } from "../helpers/cartHandler";

export default function CartItem({ ItemData }) {
  const { price, image, name, quantity, _id } = ItemData;

  const { removeFromCart, modifyQuantity } = useCart();

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
        <span>Price - {price}/-</span>
      </Item>

      <MobileItem className="cart_item">
        <div className="mobile_cart_item_detail">
          <img src={image} alt="product_img" />
          <span>
            <p>
              <strong>{name}</strong>
            </p>
            <p>Price - {price}/-</p>
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
