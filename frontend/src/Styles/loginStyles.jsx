import styled from "styled-components";

const Box = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  height: 100vh;

  #login_title {
    margin-bottom: 20px;
  }

  form {
    border-radius: 7px;
    padding: 20px;
    background-color: #892be2a0;
    border: 2px solid blueviolet;
    color: white;

    input {
      color: white;
      border: none;
      background: transparent;
      border-bottom: 1px solid white;
      outline: none;
      height: 30px;
      width: 100%;
      margin: 5px 0;
      font-size: 1.03rem;
      transition: all 0.2s;

      ::placeholder {
        color: white;
      }

      &:focus {
        border-bottom: 2px solid blueviolet;
      }
    }

    button {
      padding: 5px 10px;
      margin: 10px 0;
      outline: none;
      border: none;
      cursor: pointer;
      background-color: white;
      font-size: 1.1rem;
      border-radius: 5px;
      transition: all 0.3s;
      &:hover {
        background-color: blueviolet;
        color: white;
      }
    }
    a:hover {
      color: blue;
    }
  }
`;

export default Box;
