import { useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import AutocompleteBar from "../Components/autocompleteBar";
import { useAutocomplete, searchProducts } from "../helpers/searchHandler";

export default function MobileSearchPage() {
  const [userInput, setUserInput] = useState("");
  const history = useHistory();
  const { tags } = useAutocomplete(userInput);

  return (
    <Search>
      <form onSubmit={(e) => searchProducts(e, userInput, history)}>
        <i
          onClick={() => history.goBack()}
          className="fas fa-arrow-circle-left"
        ></i>
        <input
          type="text"
          placeholder="Search for Products"
          onChange={(e) => setUserInput(e.target.value)}
        />
      </form>
      <AutocompleteBar tagsArray={tags} />
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
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 100;

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
