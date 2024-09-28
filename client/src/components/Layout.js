import React from "react";
import "../styles/layoutStyles.css";
import logo1 from "../images/logo-white-nobg.png";
import { adminMenu, userMenu } from "../data/data";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { message, Badge } from "antd";

const Layout = ({ children }) => {
  const { user } = useSelector((state) => state.user);
  const location = useLocation();
  const navigate = useNavigate();

  //handle logout
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
    message.success("You have logged out successfully");
    navigate("/login");
  };

  //stylist menu
  const stylistMenu = [
    {
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      name: "Appointments",
      path: "/stylist-appointments",
      icon: "fa-solid fa-calendar-check",
    },
    {
      name: "Profile",
      path: `/stylist/profile/${user?._id}`,
      icon: "fa-regular fa-id-card",
    },
  ];
  //stylist menu

  //rendering menu list
  const sideBarMenu = user?.isAdmin
    ? adminMenu
    : user?.isStylist
    ? stylistMenu
    : userMenu;

  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div>
              <img src={logo1} className="logo" />
            </div>
            <hr />
            <div className="menu">
              {sideBarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <>
                    <div className={`menu-item ${isActive && "active"}`}>
                      <i className={menu.icon}></i>
                      <Link to={menu.path}>{menu.name}</Link>
                    </div>
                  </>
                );
              })}
              <div className={`menu-item`} onClick={handleLogout}>
                <i className="fa-solid fa-right-from-bracket"></i>
                <Link to="/login">Logout</Link>
              </div>
            </div>
          </div>
          <div className="content">
            <div className="header rounded-1">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user && user.notification.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                >
                  <i class="fa-solid fa-bell"></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body rounded-1">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
