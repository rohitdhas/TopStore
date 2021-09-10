import { useEffect, useState } from "react";
import { useHistory } from "react-router";
import styled from "styled-components";
import AutocompleteBar, {
  openAutocompleteBar,
  closeAutocompleteBar,
  filterTags,
} from "./autocompleteBar";

export default function MobileSearchPage() {
  const [userInput, setUserInput] = useState("");
  const history = useHistory();
  const [autoCompleteTags, setAutoCTags] = useState([]);

  useEffect(() => {
    if (!userInput) {
      closeAutocompleteBar();
      return;
    }
    fetch(`http://localhost:8080/search?term=${userInput}`)
      .then((res) => res.json())
      .then(({ data, message }) => {
        if (message) return;
        setAutoCTags(filterTags(data));
        openAutocompleteBar();
      })
      .catch((err) => console.log(err));
  }, [userInput]);

  function searchProducts(e) {
    e.preventDefault();

    const { value } = userInput.current;
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
        <input
          type="text"
          placeholder="Search for Products"
          onChange={(e) => setUserInput(e.target.value)}
        />
      </form>
      <AutocompleteBar tagsArray={autoCompleteTags} />
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
