import styled from "styled-components";

export const HomePage = styled.div`
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
        font-size: 2.5rem;
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
  }
  @media (max-width: 750px) {
    margin: 0 20px;

    .home .home_img {
      display: none;
    }
    .home .home_info .title {
      font-size: 2rem;
    }
  }
`;

export const Category = styled.div`
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

  @media (max-width: 750px) {
    text-align: center;
    .categories {
      grid-template-columns: repeat(2, 1fr);

      .category {
        margin: 10px;
        img {
          height: 150px;
          width: 150px;
        }

        &::before {
          transform: translateX(-50%) translateY(10px);
          color: black;
          font-size: 1rem;
        }
        &::after {
          content: none;
        }
      }
    }
  }
`;

export const HotDealsSection = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;

  .hd_title {
    font-size: 2rem;
    font-weight: bold;
  }

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
      line-height: 25px;
    }
  }

  @media (max-width: 750px) {
    .hd_title {
      font-size: 1.7rem;
    }
    .product_info {
      display: none;
    }
    .product .main {
      justify-content: space-between;
      margin: 0;
      width: 100%;

      img {
        height: 150px;
        width: 150px;
      }
    }
  }
`;
