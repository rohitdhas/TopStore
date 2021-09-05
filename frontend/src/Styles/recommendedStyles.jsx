import styled from "styled-components";

const RecommendationPage = styled.div`
  margin: 0 40px 25px 40px;

  header {
    font-size: 1.4rem;
    font-weight: bold;
    text-align: center;
    border: 2px solid;
    border-radius: 5px;
    padding: 5px;
    color: blueviolet;
  }

  .grid_box {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    align-items: center;
    justify-items: center;
    grid-template-rows: 50vh;

    .grid_item {
      padding: 10px;
      margin: 10px 0;
      border-radius: 5px;

      .item_name {
        font-size: 1.1rem;
        font-weight: bold;
        margin: 5px 0;
      }

      button {
        width: 100%;
        border: none;
        border-radius: 5px;
        background-color: blueviolet;
        color: white;
        padding: 7px;
        margin: 5px 0;
        cursor: pointer;

        &:hover {
          background-color: #6316ac;
        }
      }

      img {
        height: 200px;
        width: 200px;
      }
    }
  }
  @media (max-width: 750px) {
    margin: 0 20px 10px 20px;

    .grid_box {
      grid-template-columns: repeat(1, 1fr);
    }
  }
`;

export default RecommendationPage;
