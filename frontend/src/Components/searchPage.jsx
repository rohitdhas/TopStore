import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchPage() {
  // Hooks Start
  const { product } = useParams();
  const [dbProducts, setDBProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8080/product/${product}`)
      .then((data) => data.json())
      .then((res) => setDBProducts(res))
      .catch((err) => console.log(err));
  }, [product]);
  // _______________________END OF HOOKS_______________________

  function addToCart(productData) {
    fetch("http://localhost:8080/cart/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ type: "ADD", data: productData }),
    })
      .then((res) => res.json())
      .then(({ message }) => console.log(message))
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
            quantity: 1,
          };
          return (
            <div className="product_card" key={_id}>
              <img className="card_img" src={image} alt="product-img" />
              <span>
                <h3>
                  <a href={`/product/${_id}`}>Product Name - {name}</a>
                </h3>
                <h4>Price - ${price}/-</h4>
              </span>
              <button onClick={() => addToCart(productData)}>
                Add to Cart🛒
              </button>
            </div>
          );
        })
      ) : (
        <h1>Waiting for Data...🚀</h1>
      )}
    </div>
  );
}
