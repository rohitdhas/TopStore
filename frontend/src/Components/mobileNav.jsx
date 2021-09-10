import { startSpinner, closeSpinner } from "./spinner";
import { SideBarBox, NavItemsMobile } from "../Styles/navStyles";
import toggleSidebar from "../helper_functions/sidebar";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useHistory } from "react-router";

export default function NavItemsForMobile() {
  return (
    <NavItemsMobile>
      <Link to="/mobile/search">
        <i className="fas fa-search"></i>
      </Link>
      <Link to="/cart">
        <i className="fas fa-shopping-cart"></i>
      </Link>
      <i onClick={toggleSidebar} className="fas fa-bars"></i>
      <SideBar />
    </NavItemsMobile>
  );
}

function SideBar() {
  const [username, setUsername] = useState("");
  const history = useHistory();

  useEffect(() => {
    fetch("http://localhost:8080/data", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(({ message, data }) => {
        if (!data) {
          console.log(message);
        } else {
          setUsername(data.full_name);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  function fireLogout() {
    startSpinner();
    fetch("http://localhost:8080/logout", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then(() => {
        setUsername("");
        history.push("/");
        toggleSidebar();
        closeSpinner();
      });
  }

  return (
    <SideBarBox className="sidebar">
      <div onClick={toggleSidebar} id="sidebar_overlay"></div>
      <ul>
        <li>Hello, {username || "User"}!</li>
        {username ? (
          <li onClick={fireLogout}>
            <span>Logout</span>
            <i className="fas fa-sign-out-alt"></i>
          </li>
        ) : (
          <li>
            <a href="/login">Login/Signup</a>
          </li>
        )}
      </ul>
    </SideBarBox>
  );
}
