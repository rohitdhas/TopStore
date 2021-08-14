import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function SearchPage({ notify }) {
  // Hooks Start
  const { product } = useParams();
  const [dbProducts, setDBProducts] = useState([]);

  useEffect(() => {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    fetch(`http://localhost:8080/product/${product}`)
      .then((data) => data.json())
      .then((res) => {
        if (!res.length) {
          notify(`Try Searching Something Else!`);
        }
        setDBProducts(res);
        loader.classList.remove("active");
      })
      .catch((err) => console.log(err));
  }, [product]);
  // _______________________END OF HOOKS_______________________

  function addToCart(productData) {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    fetch("http://localhost:8080/cart/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ type: "ADD", data: productData }),
    })
      .then((res) => res.json())
      .then(({ message }) => {
        notify(message);
        loader.classList.remove("active");
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
        <h1>No Data Found!</h1>
      )}
    </div>
  );
}
