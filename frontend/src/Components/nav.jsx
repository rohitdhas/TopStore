import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Nav, NavLinks } from "../Styles/navStyles";
import AutocompleteBar, {
  openAutocompleteBar,
  closeAutocompleteBar,
  filterTags,
} from "./autocompleteBar";
import { startSpinner, closeSpinner } from "./spinner";
import NavItemsForMobile from "./mobileNav";

export default function Navbar({ notify }) {
  const [userInput, setUserInput] = useState("");
  const history = useHistory();
  const [userData, setUserData] = useState({});
  const [autoCompleteTags, setAutoCTags] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/data", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ data }) => {
        if (data) {
          setUserData(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    if (!userInput) {
      closeAutocompleteBar();
      return;
    }
    fetch(`http://localhost:8080/search?term=${userInput}`)
      .then((res) => res.json())
      .then(({ data, message }) => {
        if (message) {
          console.log(message);
          return;
        }
        setAutoCTags(filterTags(data));
        openAutocompleteBar();
      })
      .catch((err) => console.log(err));
  }, [userInput]);

  function fireLogout() {
    startSpinner();
    fetch("http://localhost:8080/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ message }) => {
        setUserData({});
        history.push("/");
        closeSpinner();
        notify(message);
      });
  }

  function searchProducts(e) {
    e.preventDefault();

    if (!userInput) return;
    history.replace("/");
    history.push(`search/${userInput}`);
    closeAutocompleteBar();
  }

  return (
    <Nav>
      <div className="logo">
        <Link to="/">
          <span>top</span>Store
        </Link>
      </div>
      <div>
        <form onSubmit={searchProducts}>
          <input
            type="text"
            placeholder="Search for Products"
            id="product_search_bar"
            onChange={(e) => setUserInput(e.target.value)}
            autoComplete="off"
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
        <AutocompleteBar tagsArray={autoCompleteTags} />
      </div>
      <NavLinks className="navlinks">
        <span className="user_avatar">
          {!userData.full_name ? (
            <Link to="/login">
              <button id="login_btn">Login/Sign Up</button>
            </Link>
          ) : (
            <span id="profile_dropdown">
              <i
                onClick={displayProfileOptions}
                className="fas fa-user-circle"
              ></i>
              <div className="overlay" onClick={displayProfileOptions}></div>
              <ul>
                <li>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAPFBMVEXm5uampqajo6Pa2trp6emhoaHl5eXg4OCoqKjc3Nzf39/W1tatra2wsLDIyMi8vLy2trbExMTOzs61tbXhv6YVAAAEl0lEQVR4nO2d27aqMAxFpYSbioL+/79uEPEGW4WmSepY8+287Tlikza0OZsNAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAKUMcmL4ptUeTDP36JTqc6ted9mTiXOZeU+3N7qja/YtnZHZqyF3ukUy2bQ2ep/ed5Q9tD7V7s7pauPmzjdqS0SebtbpZJk8brSOn5n+g9R/IcqSNVdfZRbyCrq/gcKW+/iN89jm0emSPt9t/7XRz3u6gUqV3md3Fs41Gk/LxcsFM8x/JLpapcI9gplnEkHNqt0huIYTHSbl0Ar2G0r0ipj2CnaL36U+Un2CkaX4tF6SmYJGWhLfGW2jeEXRBrbYk30NFfsFM8mv2d0u7brfZ7MrMJNWfx68m1Vebh+Y32GP2d+pX6F0Wbv9OaTTBJLOZTOvGkmYHsZDCIe0bBJNlr60zgqhQj9ioGca7CntqaYcUbwi6IlbbSM3y1cMRaTcz9zxSvlLY2NozVfsTttKUeWdM9/Ghoq7vInUl7TO1rtgEEk2SrrXWHc9N9x9L2mw5BDA+GDNmr4cXQUkUMkWhMpZoA9b7HUM0vgggmiZ3OqXejex5nZ/Pt+a3iX8NUW+xGyn10Gsjs7EyZz/cwVOD31+Hv59IwRwtLh4vf39PkvN3gkb0dQ2qCnC0aO2eLEG0aW40aOgUxtPR1Jki5MFQsAqUaQ4kmTBvDVBMjyEI0tQzDnPLtnPB7qGEXNFQNL7AfoAwdnQaIe2taGgshe9vbUsP7Ct+VrwFLxXCAd29qaU96g+Hy7B2T12g5V6LBVXiBb3Nq70bUBWJrDGdWL+xzJRuTaeYKw0V241fZedqKdpqIUziuLFi6oDCD/z1ak3dnH6HWTzEznGWu+CVUy2n0hk8UI4hgDx3WKmZGN2sTaPdhkMI8LooXpANUrCj9ri6iEexZnG9cq/0nL2ThyIHYBg700JJPbq6JbhoPbdtFj/Jd2UY1qIbS44KxH1dHd7R6KpxAabPYb3CMYxgPFev8ro7mKwblbea1L82MD6pZPJZmxtFy3aCc6bW61TBSunJqy0SxtJlxfr4jnB9Z3wE31r7MUOGdYp5xe1t1g20JPiiaWoyUMusN2FEM87DLUOc0lKAZxXCCRhSpCubXY2BqFOvH7Sn6n7tzlg9q/+Nq5dIf5m3lk6LuFcX17e3vUW2E+8+f+wbNGXWBXiG8ondZOMwV/Sl6n9wCPeiaUdR64iXzG+3RuUEUZszAPDpn/kJOsFNU2NqEr/VPhgp1X6QUPiiKP6CRDaFGEIVDKB9E6RDKBzHUJIx3iKZTyVo4IlsT2d+PfIPoG5NAgzDekwnuTuXzTI9krgn0/v4Tgu/zA3ZI3yE3Z1DnRyr5MxVqXkwRa2eI79hGpHZuYeYLfGUodMtdaxkKLkStZSjWr9HYdY/I7L7FmohTZNqKeolGKtVIdbpnDUW633qpVCqZss+XX4LILHqV0++IyCmYe7TAMiR2pqLd/FdEuvu/b7jV6NGMZBJvhH/fkP3/6lhkKHFC3GZOD5EY5qkm1i5HAwAAAAAAAAAAAAAAAAAAAACAJf4AKkJE8O36wbkAAAAASUVORK5CYII="
                    alt="profile"
                  />
                  <div>
                    <p>{userData.full_name}</p>
                    <p>{userData.email}</p>
                  </div>
                </li>
                <li onClick={fireLogout}>
                  <span>Sign Out</span>
                  <i className="fas fa-sign-out-alt"></i>
                </li>
              </ul>
            </span>
          )}
        </span>
        <span className="cart">
          <Link to="/cart">
            <i className="fas fa-shopping-cart"></i>
          </Link>
        </span>
      </NavLinks>
      <NavItemsForMobile />
    </Nav>
  );
}

function displayProfileOptions() {
  const dropdown = document.querySelector("#profile_dropdown ul");
  const overlay = document.querySelector("#profile_dropdown .overlay");
  dropdown.classList.toggle("active");
  overlay.classList.toggle("active");
}
