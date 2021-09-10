import { useRef, useState } from "react";
import styled from "styled-components";

export default function AddProduct() {
  const [serverRes, setServerRes] = useState("");

  const nameRef = useRef("");
  const priceRef = useRef(0);
  const urlRef = useRef("");
  const descriptionRef = useRef("");
  const categoryRef = useRef("");
  const tagsRef = useRef("");

  function handleAddProduct(e) {
    e.preventDefault();
    const refs = [nameRef, priceRef, urlRef, categoryRef, tagsRef];
    // Cheking for empty values
    refs.forEach((ref) => {
      if (!ref.current.value) return;
    });
    // ________________________________________
    // Sending data to Server
    const productData = {
      name: nameRef.current.value,
      price: priceRef.current.value,
      image: urlRef.current.value,
      description: descriptionRef.current.value,
      category: categoryRef.current.value,
      tags: [...tagsRef.current.value.split(", ")],
    };

    fetch("http://localhost:8080/product/add", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    })
      .then((res) => res.text())
      .then((msg) => {
        // Emptying input values
        refs.forEach((ref) => {
          ref.current.value = "";
        });
        setServerRes(msg);
        setTimeout(() => setServerRes(""), 5000);
      })
      .catch((err) => console.log(err));
  }

  return (
    <Form>
      <h2>Add Product to TopStore🛒🚀</h2>
      <form onSubmit={handleAddProduct}>
        <div>
          <input
            type="text"
            name="name"
            id="productName"
            ref={nameRef}
            placeholder="Product Name"
          />
        </div>
        <div>
          <input
            type="number"
            name="price"
            id="price"
            ref={priceRef}
            placeholder="price"
          />
        </div>
        <div>
          <input
            type="text"
            name="image"
            id="imgURL"
            ref={urlRef}
            placeholder="image url"
          />
        </div>
        <div>
          <input
            type="text"
            name="description"
            id="description"
            placeholder="description"
            ref={descriptionRef}
          />
        </div>
        <div>
          <input
            type="text"
            name="tags"
            id="tags"
            ref={tagsRef}
            placeholder="tags: (, ) seprated"
          />
        </div>
        <div>
          <select ref={categoryRef} name="category" id="category">
            <option value="electronics">Electronics</option>
            <option value="smartphone">Smartphone</option>
            <option value="clothings">Clothings</option>
            <option value="accessories">Accessories</option>
            <option value="groceries">Groceries</option>
            <option value="books">Book</option>
            <option value="other">Others</option>
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
      <div>{!serverRes ? null : <h2>{serverRes}</h2>}</div>
    </Form>
  );
}

const Form = styled.div`
  margin-top: 60px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  height: 90vh;

  form {
    border: 1px solid;
    padding: 10px;
    border-radius: 5px;
    width: 350px;

    input {
      font-size: 1.03rem;
      border: 1px solid gray;
      border-radius: 7px;
      display: inline-block;
      padding: 6px 10px;
      font-size: 17px;
      width: 100%;
      margin: 5px 0;
    }

    select {
      width: 100%;
      padding: 5px;
      margin: 5px 0;
    }

    button {
      display: inline-block;
      padding: 6px 10px;
      font-size: 17px;
      outline: none;
      cursor: pointer;
      border: none;
      border-radius: 7px;
      background-color: #1f1e1e;
      color: white;
      width: 100%;
      margin-top: 10px;

      &:hover {
        background-color: blueviolet;
      }
    }
  }
`;
