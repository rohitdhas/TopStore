import { SideBarBox, NavItemsMobile } from "../Styles/navStyles";
import { toggleSidebar } from "../helpers/togglers";
import { Link } from "react-router-dom";
import { useUserAuth, useUserData } from "../helpers/userHandler";

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
  const { full_name: username } = useUserData();
  const { fireLogout } = useUserAuth();

  function logout() {
    fireLogout();
    toggleSidebar();
  }

  return (
    <SideBarBox className="sidebar">
      <div onClick={toggleSidebar} id="sidebar_overlay"></div>
      <ul>
        <li>Hello, {username || "User"}!</li>
        {username ? (
          <li onClick={logout}>
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
