import { useParams } from "react-router";
import { useEffect, useState } from "react";
import styled from "styled-components";

export default function ProductDetails({ notify }) {
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

  function addToCart() {
    const { _id, description, image, price, name } = productData;

    const data = {
      _id,
      description,
      image,
      price,
      name,
      quantity: 1,
    };

    fetch("http://localhost:8080/cart/modify", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ type: "ADD", data }),
    })
      .then((res) => res.json())
      .then(({ message }) => {
        notify(message);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Details className="product_detail_page">
      {"_id" in productData ? (
        <>
          <div className="product_img">
            <img src={productData.image} alt="productImg" />
          </div>
          <div className="product_info">
            <h1>{productData.name}</h1>
            <p className="price">Price - ${productData.price}</p>
            <p className="product_description">
              <strong>Product Description</strong>
              <br />
              {productData.description}
            </p>
            <button onClick={addToCart}>Add to Cart🛒</button>
          </div>
        </>
      ) : (
        <h1>Getting Data from Server...🚀</h1>
      )}
    </Details>
  );
}

const Details = styled.div`
  height: 90vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 40px;

  .product_img img {
    height: 400px;
    width: 390px;
  }

  .product_info {
    * {
      margin: 15px 0;
    }
    .price {
      font-size: 1.3rem;
      font-weight: bold;
      color: blueviolet;
      text-decoration: underline;
    }
    .product_description {
      width: 500px;
    }
  }

  button {
    padding: 7px 14px;
    margin: 5px 0;
    background-color: blueviolet;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;

    &:hover {
      background-color: #7515ce;
    }
  }
`;
