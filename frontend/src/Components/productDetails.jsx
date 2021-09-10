import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Details from "../Styles/productDetailStyles";
import { addToCart } from "../helper_functions/cartHandler";

export default function ProductDetails({ notify }) {
  const { productID } = useParams();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/product-detail/${productID}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <Details className="product_detail_page">
      {"_id" in productData ? (
        <>
          <img src={productData.image} alt="productImg" />
          <div className="product_info">
            <p className="product_d_p_name">{productData.name}</p>
            <p className="price">Price - ${productData.price}</p>
            <p className="product_description">
              <strong>Product Description</strong>
              <br />
              {!productData.description
                ? "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti rerum beatae nihil nam harum. Debitis ratione nostrum ipsa, tempora a commodi saepe recusandae amet voluptate fuga similique asperiores itaque."
                : productData.description}
            </p>
            <button onClick={() => addToCart(productData, notify)}>
              Add to Cart🛒
            </button>
          </div>
        </>
      ) : (
        <p id="product_detail_loader">Getting Data from Server...🚀</p>
      )}
    </Details>
  );
}
