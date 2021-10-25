import styled from "styled-components";
import { useHistory } from "react-router";
import { closeAutocompleteBar } from "../helpers/togglers";

export default function AutocompleteBar({ tagsArray }) {
  const history = useHistory();

  function searchProducts(tag) {
    history.replace("/");
    history.push(`search/${tag}`);
    closeAutocompleteBar();
  }

  return (
    <>
      <div
        onClick={closeAutocompleteBar}
        className="autocomplete_bar_overlay"
      ></div>
      <Bar className="autocomplete_bar">
        {tagsArray.length !== 0
          ? tagsArray.map((tag, index) => {
              return (
                <li key={index} onClick={() => searchProducts(tag)}>
                  <i className="fas fa-external-link-alt"></i>
                  {tag}
                </li>
              );
            })
          : null}
      </Bar>
    </>
  );
}

const Bar = styled.ul`
  display: none;
  position: fixed;
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
  width: 50%;
  padding: 0 10px;
  border-radius: 7px;
  background-color: white;
  box-shadow: 1px 2px 5px -3px black;
  z-index: 50;

  li {
    list-style: none;
    border-radius: 7px;
    padding: 5px;

    i {
      margin-right: 10px;
      color: grey;
    }

    &:hover {
      background-color: #923de2;
      cursor: pointer;
      color: white;
    }
  }

  @media (max-width: 750px) {
    width: 100%;
    position: absolute;
    left: 50%;
    top: 10%;
    padding: 0 10px;
    box-shadow: none;

    li {
      padding: 7px 0;
      border-radius: 0;
      border-bottom: 1px solid grey;
    }
  }

  &.active {
    display: block;
  }
`;
