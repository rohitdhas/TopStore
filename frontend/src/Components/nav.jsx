import { useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setUserData } from "../Redux/profileData";

export default function Navbar() {
  const userInput = useRef("");
  const history = useHistory();
  const dispatch = useDispatch();

  // User Data from Redux store
  const { username, cart, isLoggedIn } = useSelector(
    (state) => state.profileData
  );

  useEffect(() => {
    if (!isLoggedIn) {
      fetch("http://localhost:8080/data", {
        credentials: "include",
      })
        .then((res) => res.json())
        .then(({ message, data }) => {
          if (!data) {
            console.log(message);
          } else {
            dispatch(setUserData(data));
            console.log(message);
          }
        })
        .catch((err) => console.log(err));
    }
  });

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
          {!username ? <a href="/login">Login/SignUp</a> : username}
        </span>
        <span className="cart">
          <Link to="/cart">Cart</Link> - ( {cart.length} ) items
        </span>
      </div>
    </nav>
  );
}
