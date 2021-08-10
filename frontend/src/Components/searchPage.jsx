import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateCart } from "../Redux/profileData";

export default function SearchPage() {
  // Hooks Start
  const { product } = useParams();
  const dispatch = useDispatch();
  const [dbProducts, setDBProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/product/${product}`)
      .then((data) => data.json())
      .then((res) => setDBProducts(res))
      .catch((err) => console.log(err));
  }, [product]);
  // _______________________END OF HOOKS_______________________

  function addToCart(productData) {
    fetch("http://localhost:8080/cart/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ productData }),
    })
      .then((res) => res.json())
      .then(({ cart, message }) => {
        if (!cart) {
          console.log(message);
        } else {
          // dispatch(updateCart(cart));
          console.log(cart);
        }
      })
      .catch((err) => console.log(err));
  }

  return (
    // JSX
    <div className="search_page">
      <h2>Search results for - "{product}"</h2>
      {dbProducts.length !== 0 ? (
        dbProducts.map((item) => {
          const { _id, image, name, price, description } = item;
          const productData = {
            _id,
            image,
            name,
            price,
            description,
            count: 1,
          };
          return (
            <div className="product_card" key={_id}>
              <img className="card_img" src={image} />
              <span>
                <h3>Product Name - {name}</h3>
                <h4>Price - ${price}/-</h4>
              </span>
              <button onClick={() => addToCart(productData)}>
                Add to Cart🛒
              </button>
            </div>
          );
        })
      ) : (
        <h1>Loading...🚀</h1>
      )}
    </div>
  );
}
