import styled from "styled-components";

export const SearchPageBox = styled.div`
  margin: 0 40px;

  & > p {
    font-size: 1.2rem;
    font-weight: bold;
    border: 1px solid gray;
    padding: 5px;
    margin: 10px 0;
    border-radius: 5px;
  }

  @media (max-width: 500px) {
    margin: 0 20px;

    & > p {
      font-size: 0.9rem;
      margin: 6px 0;
    }
  }
`;

export const ProductCard = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 10px 0;
  margin: 10px 0;
  border-bottom: 2px solid gray;

  span {
    display: flex;
    justify-content: space-around;
    align-items: center;

    div * {
      margin: 8px 0;
    }

    & * {
      margin: 0 10px;
    }

    .search_p_p_name {
      font-size: 1.3rem;
      font-weight: bold;
    }
    .search_p_p_price {
      font-weight: 0.8rem;
    }

    button {
      background-color: #202020;
    }
  }

  .card_img {
    width: 200px;
    height: 200px;
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

  @media (max-width: 500px) {
    & > button {
      display: none;
    }
    .card_img {
      width: 150px;
      height: 150px;
    }
    span {
      justify-content: space-between;
      .search_p_p_name {
        font-size: 0.9rem;
      }
      button {
        font-size: 0.7rem;
      }
    }
  }
`;
