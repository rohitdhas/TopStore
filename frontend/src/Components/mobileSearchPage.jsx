import { useRef, useEffect } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";

export default function MobileSearchPage() {
  const userInput = useRef("");
  const history = useHistory();

  useEffect(() => {
    userInput.current.focus();
  }, []);

  function searchProducts(e) {
    const { value } = userInput.current;
    e.preventDefault();
    if (!value) return;

    history.replace("/");
    history.push(`search/${value}`);
  }

  return (
    <Search>
      <form onSubmit={searchProducts}>
        <i
          onClick={() => history.goBack()}
          className="fas fa-arrow-circle-left"
        ></i>
        <input type="text" ref={userInput} placeholder="Search for Products" />
      </form>
    </Search>
  );
}

const Search = styled.div`
  form {
    background-color: #6f21b8;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;

    input {
      width: 90%;
      font-size: 1.3rem;
      border-radius: 8px;
      border: none;
      padding: 5px;
    }

    i {
      color: white;
      font-size: 1.8rem;
      cursor: pointer;
    }
  }
`;
