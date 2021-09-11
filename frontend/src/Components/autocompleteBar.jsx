import styled from "styled-components";
import { useHistory } from "react-router";

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

export function openAutocompleteBar() {
  const bar = document.querySelector(".autocomplete_bar");
  const overlay = document.querySelector(".autocomplete_bar_overlay");
  bar.classList.add("active");
  overlay.classList.add("active");
}

export function closeAutocompleteBar() {
  const bar = document.querySelector(".autocomplete_bar");
  const overlay = document.querySelector(".autocomplete_bar_overlay");
  bar.classList.remove("active");
  overlay.classList.remove("active");
}

export function filterTags(tagsArr) {
  let arr = [];
  if (tagsArr.length > 2) {
    let firstFew = tagsArr.slice(0, 6);
    firstFew.map((obj) => {
      arr.push(...obj.tags.slice(0, 2));
    });
  } else {
    arr.push(...tagsArr[0].tags.slice(0, 6));
  }
  return arr;
}

const Bar = styled.ul`
  display: none;
  position: fixed;
  top: 8%;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  padding: 0 40px;
  border-radius: 0 0 5px 5px;
  background-color: white;
  box-shadow: 1px 4px 7px -3px black;
  z-index: 100;

  li {
    list-style: none;
    padding: 5px;

    i {
      margin-right: 10px;
      color: royalblue;
    }

    &:hover {
      background-color: #923de2;
      cursor: pointer;
      color: white;
    }
  }

  @media (max-width: 750px) {
    width: 100%;
    left: 50%;
    top: 10%;
    padding: 0 10px;
    box-shadow: none;

    li {
      padding: 7px;
      border-top: 1px solid grey;
      border-bottom: 1px solid grey;
    }
  }

  &.active {
    display: block;
  }
`;
