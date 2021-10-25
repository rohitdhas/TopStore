import { useParams } from "react-router";
import { useEffect, useState } from "react";
import Details from "../Styles/productDetailStyles";
import { useCart } from "../helpers/cartHandler";

export default function ProductDetails() {
  const { productID } = useParams();
  const [productData, setProductData] = useState({});
  const server_url = process.env.REACT_APP_SERVER_URL;

  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`${server_url}/product-detail/${productID}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setProductData(data);
        document.title = data.name;
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
            <p className="price">Price - {productData.price}/-</p>
            <p className="product_description">
              <strong>Product Description</strong>
              <br />
              {!productData.description
                ? "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laboriosam deleniti rerum beatae nihil nam harum. Debitis ratione nostrum ipsa, tempora a commodi saepe recusandae amet voluptate fuga similique asperiores itaque."
                : productData.description}
            </p>
            <button onClick={() => addToCart(productData)}>
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
