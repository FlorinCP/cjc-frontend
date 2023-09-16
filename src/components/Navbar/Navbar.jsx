import React from "react";
import "./Navbar.css";

function Navbar() {

    return (
        <div>
        <div id="navbar">
            <p id="logo">PEANA TEST</p>
            <div id="menu-icons">
                <span className="material-symbols-outlined">mail</span>
                <span className="material-symbols-outlined">account_circle</span>
                <span className="material-symbols-outlined" id="menu"> menu </span>
            </div>
        </div>
            <div id="navigation">
                <p className="nav-item">HOME</p>
                {/*<b className="spacer">|</b>*/}
                <p className="nav-item" style={{color : "rgba(52, 64, 85, 0.73)" }}>SESSIONS</p>
                {/*<b className="spacer">|</b>*/}
                <p className="nav-item" style={{color : "rgba(52, 64, 85, 0.73)" }} >CALL</p>
            </div>
        </div>
    );
}

export default Navbar;
