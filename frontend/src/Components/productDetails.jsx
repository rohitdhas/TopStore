export default function ProductDetails() {
  return (
    <div className="product_detail_page">
      <div className="product_img">
        <span>👕</span>
      </div>
      <div className="product_info">
        <h2>Nike T-shirt</h2>
        <h5>Price - $39</h5>
        <div className="product_options">
          <span>Select Size - </span>
          S<input type="radio" name="size" />
          M<input type="radio" name="size" />
          L<input type="radio" name="size" />
        </div>
        <p className="product_description">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis
          dignissimos tempora, saepe laboriosam mollitia illo, porro vel
          delectus placeat deserunt quos ipsam vero vitae inventore quia enim
          dolorum! Est, inventore!
        </p>
        <button>Add to Cart🛒</button>
        <button>Buy Now</button>
      </div>
    </div>
  );
}
