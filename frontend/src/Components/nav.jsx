import { useRef, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";

export default function Navbar({ notify }) {
  const userInput = useRef("");
  const history = useHistory();
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch("http://localhost:8080/data", {
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

  return (
    <nav>
      <div className="logo">
        <Link to="/">TopStore</Link>
      </div>
      <div className="nav_items">
        <form onSubmit={searchProducts}>
          <input
            type="text"
            placeholder="📦Search for Products"
            id="product_search_bar"
            ref={userInput}
            autoComplete="off"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      <div>
        <span className="user_avatar">
          {!userData.username ? (
            <a href="/login">Login/SignUp</a>
          ) : (
            <span>
              {userData.username} - <button onClick={fireLogout}>Logout</button>
            </span>
          )}
        </span>
        <span className="cart">
          <Link to="/cart">Cart</Link>
        </span>
      </div>
    </nav>
  );
}
