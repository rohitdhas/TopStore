import { useParams } from "react-router";
import { useEffect, useState } from "react";

export default function ProductDetails() {
  const { productID } = useParams();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    fetch(`http://localhost:8080/product-detail/${productID}`, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => setProductData(data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="product_detail_page">
      {"_id" in productData ? (
        <>
          <div className="product_img">
            <img src={productData.image} alt="productImg" />
          </div>
          <div className="product_info">
            <h2>{productData.name}</h2>
            <h5>Price - ${productData.price}</h5>
            <div className="product_options">
              <span>Select Size - </span>
              S<input type="radio" name="size" />
              M<input type="radio" name="size" />
              L<input type="radio" name="size" />
            </div>
            <p className="product_description">{productData.description}</p>
            <button>Add to Cart🛒</button>
            <button>Buy Now</button>
          </div>
        </>
      ) : (
        <h1>Getting Data from Server...🚀</h1>
      )}
    </div>
  );
}
