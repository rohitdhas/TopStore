import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import RecommendationPage from "../Styles/recommendedStyles";

export default function Recommendations() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    fetch("http://localhost:8080/products/random")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        loader.classList.remove("active");
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <RecommendationPage>
      <header>TopStore Recommendations!</header>
      <div className="grid_box">
        {products.length === 0
          ? null
          : products.map((item) => {
              return (
                <div className="grid_item">
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
