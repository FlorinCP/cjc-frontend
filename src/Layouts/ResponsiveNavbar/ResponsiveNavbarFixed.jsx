import styles from "./ResponsiveNavbar.module.css";
import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import useScreenSize from "../../hooks/useScreenSize";


export default function ResponsiveNavbarFixed() {

    const { width,height } = useScreenSize();

    const [size, setSize] = useState({ width: width, height: height });


    useEffect(() => {
        setSize({ width: width, height: height })
    }, [width,height]);

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
          className={ styles.navbarScrollVisibleFixed }
      >
          {size && size.width < 768 ? mobileNavbar() : <WebNavbar />}
      </nav>
  );
}
