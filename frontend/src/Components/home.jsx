import box from "../Images/box.png";
import smartphone from "../Images/smartphone.jpeg";
import headphone from "../Images/headphone.jpeg";
import watch from "../Images/watch.jpg";
import cloths from "../Images/cloths.jpg";
// import appleWatch from "../Images/hot-deals-iwatch.jpg";
// import iphone from "../Images/hot-deals-iphone.jpg";
import styled from "styled-components";
import { useHistory } from "react-router";

export default function Home() {
  return (
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
              Blanditiis culpa enim adipisci dolore, quis, quidem deserunt
              temporibus, ipsam non alias repellat placeat aspernatur corporis
              voluptatibus voluptate veritatis dicta ipsum maxime.
            </p>
            <button>Explore Products</button>
          </div>
        </div>
        <div className="home_img">
          <img src={box} alt="box" />
        </div>
      </div>
      <Categories />
      <HotDeals />
    </HomePage>
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
          data-title="Clothings"
        >
          <img src={cloths} alt="product" />
          {/* <p>Clothings</p> */}
        </div>
        <div
          onClick={() => getByCategory("accessories")}
          className="category"
          data-title="Accessories"
        >
          <img src={watch} alt="product" />
          {/* <p>Accessories</p> */}
        </div>
        <div
          onClick={() => getByCategory("electronics")}
          className="category"
          data-title="Electronics"
        >
          <img src={headphone} alt="product" />
          {/* <p>Electronics</p> */}
        </div>
        <div
          onClick={() => getByCategory("smartphone")}
          className="category"
          data-title="Smartphones"
        >
          <img src={smartphone} alt="product" />
          {/* <p>Smartphones</p> */}
        </div>
      </div>
    </Category>
  );
}

function HotDeals() {
  return (
    <HotDealsSection className="hot_deals_section">
      <h1>Todays Hot Deals🔥</h1>
      <div className="hot_products">
        <div className="product">
          <div className="main">
            <img
              src="https://i5.walmartimages.com/asr/88fb66e0-0e9a-4454-a4c7-9a1e09e0f806_1.3b136386a3dd8092e69966dc05548fe7.jpeg?odnWidth=612&odnHeight=612&odnBg=ffffff"
              alt="product"
            />
            <div>
              <p>iPhone X</p>
              <p>
                $899/-{" "}
                <span>
                  <strike>$999/-</strike>
                </span>
              </p>
              <p>
                <strong>(10% discount)</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
          <div className="product_info">
            <p>
              <strong>
                <u>About Product:-</u>
              </strong>
            </p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            ipsum, quos optio dolorem debitis possimus id. Porro delectus error,
            debitis esse, quibusdam eligendi perspiciatis, enim molestiae rerum
            pariatur cum odit.
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
                $199/-{" "}
                <span>
                  <strike>$249/-</strike>
                </span>
              </p>
              <p>
                <strong>(20% discount)</strong>
              </p>
              <button>Add to Cart</button>
            </div>
          </div>
          <div className="product_info">
            <p>
              <strong>
                <u>About Product:-</u>
              </strong>
            </p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Laboriosam
            ipsum, quos optio dolorem debitis possimus id. Porro delectus error,
            debitis esse, quibusdam eligendi perspiciatis, enim molestiae rerum
            pariatur cum odit.
          </div>
        </div>
      </div>
    </HotDealsSection>
  );
}

const HomePage = styled.div`
  margin: 0 40px;

  .home {
    display: flex;
    justify-content: space-between;
    height: 100vh;

    .home_info {
      display: flex;
      justify-content: center;
      align-items: flex-start;
      flex-direction: column;

      .title {
        color: #201e1e;
        font-size: 3.5vw;
        font-weight: bold;
        margin: 30px 0;
      }
    }

    .home_text {
      max-width: 600px;
      color: #413b3b;
      line-height: 23px;

      button {
        margin: 20px 0;
        padding: 14px;
        border: none;
        border-radius: 20px;
        cursor: pointer;
        background-color: blueviolet;
        color: white;
        font-weight: bold;

        &:hover {
          background-color: #551492;
        }
      }
    }

    .home_img {
      display: flex;
      align-items: center;
      justify-content: center;
      img {
        max-width: 80%;
        display: block;
        height: auto;
      }
    }

    @media (max-width: 850px) {
      .home_img {
        display: none;
      }
    }
  }
`;

const Category = styled.div`
  height: 90vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-direction: column;

  .categories {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    font-size: 1.4rem;
    text-align: center;

    .category {
      cursor: pointer;
      position: relative;

      &:hover {
        &::after {
          opacity: 1;
        }
        &::before {
          bottom: 50%;
          transform: translateX(-50%) translateY(50%);
        }
      }

      &::after {
        content: "";
        opacity: 0;
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: linear-gradient(90deg, #892be2d1, #2c51ccc5);
        border-radius: 7px;
        transition: all 0.3s;
      }

      &::before {
        content: attr(data-title);
        position: absolute;
        font-size: 1.7rem;
        z-index: 20;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%) translateY(30px);
        color: white;
        transition: all 0.4s;
      }
      img {
        height: 200px;
        width: 200px;
      }
    }
  }

  @media (max-width: 700px) {
    .categories {
      flex-direction: column;
    }
  }
`;

const HotDealsSection = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  .product {
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: 10px 0;
    padding: 5px 0;
    line-height: 20px;
    border-bottom: 2px solid gray;

    .main {
      display: flex;
      align-items: center;
      margin-right: 20px;
      img {
        height: 200px;
        width: 200px;
      }

      div button {
        padding: 7px 14px;
        margin: 5px 0;
        background-color: blueviolet;
        color: white;
        border: none;
        cursor: pointer;
        border-radius: 5px;

        &:hover {
          background-color: #591797;
        }
      }
    }
    .product_info {
      max-width: 50%;
      line-height: 20px;
    }
  }
`;
