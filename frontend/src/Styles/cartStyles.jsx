import styled from "styled-components";

const CartSections = styled.div`
  height: 90vh;
  margin: 60px 40px 0 40px;
  text-align: center;

  h1 {
    margin: 10px 0;
    text-decoration: underline;
  }

  .cart_page_sections {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .checkout_card {
    position: fixed;
    top: 20%;
    right: 40px;
    border: 2px solid black;
    border-radius: 5px;
    padding: 10px;

    * {
      margin: 7px 0;
    }
  }

  .cart_item {
    width: 600px;
    margin: 10px;
    padding: 10px 15px;
    border-bottom: 2px solid grey;
  }

  .cart_total {
    text-align: end;
  }

  #checkout-btn {
    padding: 7px 14px;
    margin: 5px 0;
    background-color: #2ab408;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
      background-color: #50df2c;
    }
  }

  .mobile-checkout {
    display: none;
  }

  @media (max-width: 1140px) {
    margin: 60px 20px 0 20px;

    .checkout_card {
      display: none;
    }
    .mobile-checkout {
      display: block;
      position: fixed;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);

      button {
        padding: 10px 20px;
        background-color: #2ab408;
        border: none;
        border-radius: 5px;
        color: white;
        cursor: pointer;

        &:hover {
          background-color: #50df2c;
        }
      }
    }

    .cart_item {
      padding: 7px 10px;
      width: auto;
    }
    .cart_total {
      margin-bottom: 50px;
    }
  }

  @media (max-width: 500px) {
    .mobile-checkout {
      background-color: #ebebeb;
      position: fixed;
      left: 0;
      right: 0;
      bottom: 0;
      padding: 7px;
      transform: translateX(0%);
    }
  }
`;

export default CartSections;
