import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./ResponsiveNavbar.module.css";

function ResponsiveNavbar() {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > prevScrollPos && window.scrollY > 80) {
        setVisible(false);
      } else {
        setVisible(true);
      }

      setPrevScrollPos(currentScrollPos);
    };

    window.addEventListener('scroll', handleScroll);
    setSize({ width: window.innerWidth, height: window.innerHeight });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [prevScrollPos]);

  function WebNavbar() {
    return (
        <>
          <a href="https://www.consultantajuridicaonline.com" className={styles.navLink}>
            consultantajuridicaonline.com
          </a>
          <div className={styles.rightNavbar}>
            <Link to="/" className={styles.navLink}>
              Servicii
            </Link>
            <Link to="/" className={styles.navLink}>
              Expertiza
            </Link>
            <Link to="/login" className={styles.navLink}>
              Login
            </Link>
          </div>
        </>
    );
  }

  function mobileNavbar() {
    return (
        <>
            <a href="https://www.consultantajuridicaonline.com" className={styles.navLink}>
                consultantajuridicaonline.com
            </a>
          <div className={styles.rightNavbar}>
            <Link to="/" className={styles.navLink}>
            </Link>
          </div>
        </>
    );
  }

  return (
      <nav
          className={
            visible ? styles.navbarScrollVisible : styles.navbarScrollHidden
          }
      >
        {size && size.width < 768 ? mobileNavbar() : <WebNavbar />}
      </nav>
  );
}

export default ResponsiveNavbar;
