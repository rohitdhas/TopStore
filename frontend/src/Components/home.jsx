import box from "../Images/box.png";

export default function Home() {
  return (
    <>
      <div className="home">
        <div className="home_info">
          <div className="title">
            <h2>Discover the gretest</h2>
            <h2>Product Deals with Us</h2>
          </div>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Blanditiis
            culpa enim adipisci dolore, quis, quidem deserunt temporibus, ipsam
            non alias repellat placeat aspernatur corporis voluptatibus
            voluptate veritatis dicta ipsum maxime.
          </p>
          <button>Explore Products</button>
        </div>
        <div className="home_img">
          <img src={box} alt="box" />
        </div>
      </div>
      <Categories />
      <HotDeals />
    </>
  );
}

function Categories() {
  return (
    <div className="category_section">
      <h1>Shop by Category</h1>
      <div className="categories">
        <div className="category">
          👕
          <p>Clothings</p>
        </div>
        <div className="category">
          ⌚<p>Accessories</p>
        </div>
        <div className="category">
          🎧
          <p>Electronics</p>
        </div>
        <div className="category">
          📱
          <p>Smartphones</p>
        </div>
      </div>
    </div>
  );
}

function HotDeals() {
  return (
    <div className="hot_deals_section">
      <h1>Todays Hot Deals🔥</h1>
      <div className="hot_products">
        <div className="product">
          <div className="main">
            <span>🍎</span>
            <div>
              <p>iPhone X</p>
              <p>$899/-</p>
              <button>Buy Now</button>
            </div>
          </div>
          <div className="product_info">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            ipsum, quos optio dolorem debitis possimus id. Porro delectus error,
            debitis esse, quibusdam eligendi perspiciatis, enim molestiae rerum
            pariatur cum odit.
          </div>
        </div>
        <div className="product">
          <div className="main">
            <span>⌚</span>
            <div>
              <p>Rolex Watch</p>
              <p>$199/-</p>
              <button>Buy Now</button>
            </div>
          </div>
          <div className="product_info">
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            ipsum, quos optio dolorem debitis possimus id. Porro delectus error,
            debitis esse, quibusdam eligendi perspiciatis, enim molestiae rerum
            pariatur cum odit.
          </div>
        </div>
      </div>
    </div>
  );
}
