import React from 'react';
import style from './Footer.module.css'

function Footer(props) {
    return (
        <div className={style.footer}>
            <img src="/whitelogo.png" alt="check-email" id={style["logo-img"]} />
            <p>2023</p>
        </div>
    );
}

export default Footer;