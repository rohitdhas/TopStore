import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecommendationPage from "../Styles/recommendedStyles";
import { startSpinner, closeSpinner } from "./spinner";

export default function Recommendations() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    startSpinner();
    fetch("http://localhost:8080/products/random")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        closeSpinner();
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <RecommendationPage id="recommended_page">
      <header>TopStore Recommendations!</header>
      <div className="grid_box">
        {products.length === 0
          ? null
          : products.map((item) => {
              return (
                <div key={item._id} className="grid_item">
                  <img src={item.image} alt="product_img" />
                  <p className="item_name">{item.name}</p>
                  <p className="item_price">Price - ${item.price}</p>
                  <Link to={`/product/${item._id}`}>
                    <button>View Product</button>
                  </Link>
                </div>
              );
            })}
      </div>
    </RecommendationPage>
  );
}
