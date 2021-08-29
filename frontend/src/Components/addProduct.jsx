import { useRef, useState } from "react";

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
      tags: [...tagsRef.current.value.split(" ")],
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
    <div>
      <h1>Add Product to TopStore🛒🚀</h1>
      <form onSubmit={handleAddProduct}>
        <div>
          <label htmlFor="productName">Product Name</label>
          <input type="text" name="name" id="productName" ref={nameRef} />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input type="number" name="price" id="price" ref={priceRef} />
        </div>
        <div>
          <label htmlFor="imgURL">Image URL</label>
          <input type="text" name="image" id="imgURL" ref={urlRef} />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            ref={descriptionRef}
          />
        </div>
        <div>
          <label htmlFor="tags">Tags (space seprated)</label>
          <input type="text" name="tags" id="tags" ref={tagsRef} />
        </div>
        <div>
          <label htmlFor="category">Product Category</label>
          <select ref={categoryRef} name="category" id="category">
            <option value="electronics">Electronics</option>
            <option value="smartphone">Smartphone</option>
            <option value="clothings">Clothings</option>
            <option value="accessories">Accessories</option>
            <option value="groceries">Groceries</option>
          </select>
        </div>
        <button type="submit">Add Product</button>
      </form>
      <div>{!serverRes ? null : <h2>{serverRes}</h2>}</div>
    </div>
  );
}
