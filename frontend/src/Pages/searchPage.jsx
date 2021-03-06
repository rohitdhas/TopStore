import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { SearchPageBox, ProductCard } from "../Styles/searchPageStyles";
import { closeSpinner, startSpinner } from "../helpers/togglers";
import { useCart } from "../helpers/cartHandler";

export default function SearchPage() {
  const { product } = useParams();
  const [dbProducts, setDBProducts] = useState([]);
  const server_url = process.env.REACT_APP_SERVER_URL;

  const { addToCart } = useCart();

  useEffect(() => {
    startSpinner();
    fetch(`${server_url}/product/${product}`)
      .then((data) => data.json())
      .then((res) => {
        closeSpinner();
        document.title = `Search - ${product}`;
        // if (!res.length) {
        //   notify(`Try Searching Something Else!`);
        // }
        setDBProducts(res);
      })
      .catch((err) => console.log(err));
  }, [product]);

  return (
    <SearchPageBox className="search_page">
      <p>
        Search results for - "{product}" ({dbProducts.length} results found)
      </p>
      {dbProducts.length !== 0
        ? dbProducts.map((item) => {
            const { _id, image, name, price } = item;
            const productData = {
              _id,
              image,
              name,
              price,
            };
            return (
              <ProductCard key={_id}>
                <span>
                  <img className="card_img" src={image} alt="product-img" />
                  <div>
                    <p className="search_p_p_name">{name}</p>
                    <p className="search_p_p_price">Price - {price}/-</p>
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
