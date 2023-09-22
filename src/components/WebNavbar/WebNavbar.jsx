import React, { useState } from 'react';
import {Button} from "../Button/Button";
import { Link } from 'react-router-dom';
import './WebNavbar.css';
import Dropdown from "../Dropdown/Dropdown";

function Navbar() {
    const [click, setClick] = useState(false);
    const [dropdown, setDropdown] = useState(false);

    const handleClick = () => setClick(!click);
    const closeMobileMenu = () => setClick(false);

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

    return (
        <>
            <nav className='navbar'>
                <Link to='/' className='navbar-logo' onClick={closeMobileMenu}>
                    <img src="/whitelogo.png" alt="check-email" id="logo-img"/>
                </Link>


                <div className='menu-icon' onClick={handleClick}>
                    {
                        click ? (
                            <span className="material-symbols-rounded">close</span>
                        ) : (
                            <span className="material-symbols-rounded">menu</span>
                        )
                    }

                </div>



                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                            Acasa
                        </Link>
                    </li>
                    <li
                        className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <Link
                            to='/services'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Servicii <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && <Dropdown />}
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/test'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Test
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/contact-us'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Contul dumneavoastra
                        </Link>
                    </li>
                    <li className='nav-item'>
                        <Link
                            to='/contact-us'
                            className='nav-links'
                            onClick={closeMobileMenu}
                        >
                            Inregistrare
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
