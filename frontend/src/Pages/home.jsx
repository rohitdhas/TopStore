import box from "../Images/box.png";
import smartphone from "../Images/smartphone.jpeg";
import electronics from "../Images/electronics.jpg";
import watch from "../Images/watch.jpg";
import cloths from "../Images/cloths.jpg";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { HomePage, HotDealsSection, Category } from "../Styles/homeStyles";
import { useCart } from "../helpers/cartHandler";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    document.title = "Home 🏠";
  }, []);

  return (
    <>
      <HomePage>
        <div className="home">
          <div className="home_info">
            <div className="title">
              <p>Discover the gretest</p>
              <p>Product Deals with Us</p>
            </div>
            <div className="home_text">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Blanditiis culpa, ipsam non alias aspernatur corporis
                voluptatibus voluptate veritatis dicta ipsum maxime.
              </p>
              <Link to="/recommended">
                <button>Explore Products</button>
              </Link>
            </div>
          </div>
          <div className="home_img">
            <img src={box} alt="box" />
          </div>
        </div>
        <Categories />
        <HotDeals />
      </HomePage>
    </>
  );
}

function Categories() {
  const history = useHistory();

  function getByCategory(category) {
    history.replace("/");
    history.push(`search/${category}`);
  }

  return (
    <Category className="category_section">
      <h1>Shop by Category</h1>
      <div className="categories">
        <div
          onClick={() => getByCategory("cloths")}
          className="category"
          data-title="Clothing"
        >
          <img src={cloths} alt="product" />
        </div>
        <div
          onClick={() => getByCategory("accessories")}
          className="category"
          data-title="Accessories"
        >
          <img src={watch} alt="product" />
        </div>
        <div
          onClick={() => getByCategory("electronics")}
          className="category"
          data-title="Electronics"
        >
          <img src={electronics} alt="product" />
        </div>
        <div
          onClick={() => getByCategory("smartphone")}
          className="category"
          data-title="Smartphones"
        >
          <img src={smartphone} alt="product" />
        </div>
      </div>
    </Category>
  );
}

function HotDeals() {
  const { addToCart } = useCart();

  return (
    <HotDealsSection className="hot_deals_section">
      <p className="hd_title">Todays Hot Deals🔥</p>
      <div className="hot_products">
        <div className="product">
          <div className="main">
            <img
              src="https://i5.walmartimages.com/asr/88fb66e0-0e9a-4454-a4c7-9a1e09e0f806_1.3b136386a3dd8092e69966dc05548fe7.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff"
              alt="product"
            />
            <div>
              <p>iPhone X - 128GB</p>
              <p>
                89,999/-{" "}
                <span>
                  <strike>1,00,000/-</strike>
                </span>
              </p>
              <p>
                <strong>(10% discount)</strong>
              </p>
              <button
                onClick={() =>
                  addToCart({
                    _id: "61272bbf93c6bb244848a960",
                    image:
                      "https://i5.walmartimages.com/asr/88fb66e0-0e9a-4454-a4c7-9a1e09e0f806_1.3b136386a3dd8092e69966dc05548fe7.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff",
                    price: 89999,
                    name: "iPhone X - 128GB",
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="product_info">
            <p>
              <strong>
                <u>About Product:-</u>
              </strong>
            </p>
            There's the Super Retina display, offering the highest pixel density
            ever on an iPhone; the 5.8-inch, edge-to-edge OLED screen, with its
            incredible detail; Face ID, which uses 3D mapping for secure
            unlocking.
          </div>
        </div>
        <div className="product">
          <div className="main">
            <img
              src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX8C2_VW_PF+watch-40-alum-silver-nc-nikese_VW_PF_WF_SI?wid=2000&hei=2000&fmt=png-alpha&.v=1566450081246,1618527243000"
              alt="product"
            />
            <div>
              <p>iWatch 3</p>
              <p>
                14,999/-{" "}
                <span>
                  <strike>20,000/-</strike>
                </span>
              </p>
              <p>
                <strong>(25% discount)</strong>
              </p>
              <button
                onClick={() =>
                  addToCart({
                    _id: "61273db393c6bb244848a982",
                    image:
                      "https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/MX8C2_VW_PF+watch-40-alum-silver-nc-nikese_VW_PF_WF_SI?wid=2000&hei=2000&fmt=png-alpha&.v=1566450081246,1618527243000",
                    price: 14999,
                    name: "iWatch 3 - Nike SE",
                  })
                }
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div className="product_info">
            <p>
              <strong>
                <u>About Product:-</u>
              </strong>
            </p>
            The most advanced Apple Watch yet, with a blood oxygen sensor and
            app, the ECG app, and the Always-On Retina display. Features the
            same larger display size as Series 6, fall detection, a compass, and
            an always-on altimeter.
          </div>
        </div>
      </div>
    </HotDealsSection>
  );
}
