import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchPageBox, ProductCard } from "../Styles/searchPageStyles";

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
    <SearchPageBox className="search_page">
      <p>
        Search results for - "{product}" ({dbProducts.length} results found)
      </p>
      {dbProducts.length !== 0
        ? dbProducts.map((item) => {
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
              <ProductCard key={_id}>
                <span>
                  <img className="card_img" src={image} alt="product-img" />
                  <div>
                    <p className="search_p_p_name">{name}</p>
                    <p className="search_p_p_price">Price - ${price}</p>
                    <Link to={`/product/${_id}`}>
                      <button>View Product</button>
                    </Link>
                  </div>
                </span>
                <button onClick={() => addToCart(productData)}>
                  Add to Cart🛒
                </button>
              </ProductCard>
            );
          })
        : null}
    </SearchPageBox>
  );
}
