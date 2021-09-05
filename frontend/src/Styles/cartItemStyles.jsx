import styled from "styled-components";

export const Item = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  img {
    height: 100px;
    width: 100px;
  }

  .cart_item_main {
    * {
      margin: 5px 0;
    }
    span {
      margin: 0 10px;
    }

    button {
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

    .rmv-btn {
      background-color: tomato;

      &:hover {
        background-color: #c7371d;
      }
    }
  }

  @media (max-width: 600px) {
    display: none;
  }
`;

export const MobileItem = styled.div`
  display: none;
  .mobile_cart_item_detail {
    display: flex;
    align-items: center;
    justify-content: space-between;
    img {
      height: 100px;
      width: 100px;
    }
  }
  .mobile_cart_item_modifier {
    button {
      padding: 5px;
      border: none;
      border-radius: 5px;
      background-color: blueviolet;
      margin: 0 5px;
      color: white;
      cursor: pointer;
    }

    .rmv-btn {
      background-color: tomato;
    }
  }
  @media (max-width: 600px) {
    display: block;
  }
`;
