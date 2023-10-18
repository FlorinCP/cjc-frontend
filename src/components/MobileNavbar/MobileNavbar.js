import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./MobileNavbar.css";
import Dropdown from "../Dropdown/Dropdown";
import style from "./MobileNavbar.css";

function MobileNavbar() {
  const [click, setClick] = useState(false);
  const [dropdown, setDropdown] = useState(false);

  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);

  const logout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    window.location.reload();
  };

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos && window.scrollY > 80 && click === false) {
      setVisible(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  });

  const onMouseEnter = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(true);
    }
  };

  const onMouseLeave = () => {
    if (window.innerWidth < 960) {
      setDropdown(false);
    } else {
      setDropdown(false);
    }
  };

  const navbar = useRef(null);

  return (
      <>
        <nav
            className={!visible ? "navbarScrollTop" : "navbarScrollDown"}
            ref={navbar}
        >
          <Link to="/" onClick={closeMobileMenu} className="navbar-logo">
            <span className="material-symbols-outlined">balance</span>{" "}
            <div className="logo-wrapper">
              <span className="logo1">Consultanta</span>
              <span className="logo1">Juridica</span>
              <span className="logo1">Online.com</span>
            </div>
          </Link>

          <div className="menu-icon" onClick={handleClick}>
            <i className={click ? "fas fa-times" : "fas fa-bars"} />
          </div>

          <ul className={click ? "nav-menu active" : "nav-menu"}>

            <li
                className="web-item"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
              <Link to="/services" className="nav-links">
                Servicii <i className="fas fa-caret-down" />
              </Link>
              {dropdown && <Dropdown />}
            </li>

            <li className="web-item">
              <Link to="/test" className="nav-links">
                Cont
              </Link>
            </li>

            {/*<li className="web-item">*/}
            {/*  <Link to="/test" className="nav-links">*/}
            {/*    Video call*/}
            {/*  </Link>*/}
            {/*</li>*/}

            <li className="web-item">
              <Link to="/login" className="nav-linksPermanent">
                Inregistrare
              </Link>
            </li>

            <li className="nav-item">
              <Link to="/" className="nav-link-mobile" onClick={closeMobileMenu}>
                <p className="icon">
                  <span className="material-symbols-rounded"> home </span>
                </p>
                Home
              </Link>
            </li>

            <li
                className="nav-item"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
            >
              <Link
                  // to='/services'
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
              >
                <p className="icon">
                  <span className="material-symbols-rounded"> gavel </span>
                </p>
                Services <i className="fas fa-caret-down" />
              </Link>
              {dropdown && <Dropdown />}
            </li>

            <li className="nav-item">
              <Link
                  // to='/products'
                  className="nav-link-mobile"
                  onClick={closeMobileMenu}
              >
                <p className="icon">
                  <span className="material-symbols-rounded">account_circle</span>
                </p>
                Account
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link-mobile" onClick={closeMobileMenu}>
                <p className="icon">
                  <span className="material-symbols-rounded"> mail </span>
                </p>{" "}
                Inbox
              </Link>
            </li>
          </ul>
        </nav>
        <div className="sub-navbar">
          <ul className="sub-navbar-menu">
            <li className="sub-navbar-link">Drept Civil</li>
            <li className="sub-navbar-link">Dreptul Muncii</li>
            <li className="sub-navbar-link">Drept Penal</li>
            <li className="sub-navbar-link">Drept Comercial</li>
            <li className="sub-navbar-link">Dreptul Proprietății Intelectuale</li>
            <li className="sub-navbar-link">Drept Administrativ</li>
          </ul>
        </div>
      </>
  );
}

export default MobileNavbar;
