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

export const AddressForm = styled.div`
  #address_form_overlay {
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    background-color: #0a0a0ab5;
    z-index: 100;

    &.active {
      display: block;
    }
  }

  form {
    position: fixed;
    left: 50%;
    top: 22%;
    transform: translateX(-50%);
    background-color: white;
    padding: 10px;
    width: 300px;
    border-radius: 10px;
    z-index: 200;

    display: none;
    flex-direction: column;
    align-items: center;

    .form_title {
      color: black;
      font-size: 1.1rem;
      text-align: center;
      font-weight: bold;
    }

    textarea,
    input {
      font-size: 1.03rem;
      border: 1px solid gray;
      border-radius: 7px;
      display: inline-block;
      padding: 6px 10px;
      font-size: 17px;
      max-width: 100%;
      margin: 5px 0;
    }
    input {
      width: 100%;
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

    p {
      color: tomato;
      text-align: start;
      font-size: 0.8rem;
    }

    &.active {
      display: flex;
      transform: translateX(-50%);
    }
  }
`;

export default CartSections;
