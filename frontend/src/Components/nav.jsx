import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import styled from "styled-components";

export default function Navbar({ notify }) {
  const userInput = useRef("");
  const history = useHistory();
  const [userData, setUserData] = useState({});

  const herokuDeploy = "https://still-earth-12280.herokuapp.com/";
  const localhost = "http://localhost:8080/";

  useEffect(() => {
    fetch(localhost + "data", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ message, data }) => {
        if (!data) {
          console.log(message);
        } else {
          setUserData(data);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function fireLogout() {
    let loader = document.getElementById("loader_overlay");
    loader.classList.add("active");

    fetch("http://localhost:8080/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ message }) => {
        setUserData({});
        notify(message);
        history.push("/");
        loader.classList.remove("active");
      });
  }

  function searchProducts(e) {
    const { value } = userInput.current;
    e.preventDefault();
    if (!value) return;

    history.replace("/");
    history.push(`search/${value}`);
  }

  function displayProfileOptions() {
    const dropdown = document.querySelector("#profile_dropdown ul");
    dropdown.classList.toggle("active");
  }

  return (
    <Nav>
      <div className="logo">
        <Link to="/">TopStore</Link>
      </div>
      <div className="nav_items">
        <form onSubmit={searchProducts}>
          <input
            type="text"
            placeholder="Search for Products"
            id="product_search_bar"
            ref={userInput}
            autoComplete="off"
          />
          <button type="submit">
            <i className="fas fa-search"></i>
          </button>
        </form>
      </div>
      <div className="navlinks">
        <span className="user_avatar">
          {!userData.full_name ? (
            <a href="/login">Login/SignUp</a>
          ) : (
            <span id="profile_dropdown">
              <i
                onClick={displayProfileOptions}
                className="fas fa-user-circle"
              ></i>
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
                  <i class="fas fa-sign-out-alt"></i>
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
      </div>
    </Nav>
  );
}

const Nav = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: black;
  padding: 7px 40px;

  .logo a {
    padding: 0;
    font-size: 2rem;
    font-weight: bold;
    text-decoration: none;
    color: black;
  }

  span {
    margin: 0 10px;
  }

  form {
    display: flex;
    justify-content: center;
    align-items: center;

    input {
      font-size: 1.03rem;
      border: 1px solid gray;
      border-radius: 7px 0 0 7px;
      display: inline-block;
      padding: 5px 10px;
      font-size: 17px;
      transition: all 0.2s;
    }
    button {
      display: inline-block;
      padding: 6px 10px;
      font-size: 17px;
      outline: none;
      cursor: pointer;
      border: none;
      border-radius: 0 7px 7px 0;
      background-color: #1f1e1e;
      color: white;

      &:hover {
        background-color: blueviolet;
      }
    }
  }

  .navlinks {
    display: flex;
    align-items: center;
    position: relative;

    a {
      text-decoration: none;
      color: black;

      &:hover {
        color: blueviolet;
        text-decoration: underline;
      }
    }

    i {
      font-size: 2rem;
      cursor: pointer;
      color: #3b3b3b;

      &:hover {
        color: blueviolet;
      }
    }

    #profile_dropdown {
      ul.active {
        display: block;
      }

      ul {
        z-index: 10000;
        display: none;
        list-style: none;
        border: 2px solid blueviolet;
        border-radius: 7px;
        position: absolute;
        right: 40%;
        margin-top: 15px;

        &::after {
          content: "";
          position: absolute;
          top: 0;
          right: 20px;
          background-color: blueviolet;
          height: 30px;
          width: 30px;
          transform: translateY(-15px);
          clip-path: polygon(50% 0, 100% 50%, 50% 50%, 0 50%);
        }

        img {
          height: 40px;
          width: 40px;
          margin: 0 5px;
          border-radius: 50%;
        }
        li {
          display: flex;
          align-items: center;
          border-bottom: 2px solid blueviolet;
          padding: 7px;
          background-color: #892be281;
          &:hover {
            background-color: #5f12a7a3;
            cursor: pointer;
            color: white;
          }
        }

        li:last-child {
          border-bottom: none;
          i:hover {
            color: white;
          }
        }
      }
    }
  }

  @media (max-width: 850px) {
    .navlinks {
      display: none;
    }
  }
`;
