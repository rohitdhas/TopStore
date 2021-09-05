import styled from "styled-components";

const Details = styled.div`
  height: 90vh;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  margin: 0 40px;

  img {
    height: 400px;
    width: 390px;
  }

  #product_detail_loader {
    font-size: 2rem;
    font-weight: bold;
  }

  .product_info {
    * {
      margin: 15px 0;
    }
    .product_d_p_name {
      font-size: 2.5rem;
      font-weight: bold;
    }

    .price {
      font-size: 1.3rem;
      font-weight: bold;
      color: blueviolet;
      text-decoration: underline;
    }
    .product_description {
      line-height: 22px;
      max-width: 500px;
    }
  }

  button {
    padding: 7px 14px;
    margin: 5px 0;
    background-color: blueviolet;
    color: white;
    border: none;
    cursor: pointer;
    border-radius: 5px;
    font-weight: bold;

    &:hover {
      background-color: #7515ce;
    }
  }

  @media (max-width: 650px) {
    margin: 0 20px;
    flex-direction: column;
    height: 90vh;

    img {
      height: 300px;
      width: 290px;
    }

    .product_info .product_d_p_name {
      font-size: 1.6rem;
    }

    #product_detail_loader {
      font-size: 1.3rem;
    }
  }
`;

export default Details;
