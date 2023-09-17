import React, {useState} from 'react';
import {Button} from '../Button/Button';
import {Link} from 'react-router-dom';
import './MobileNavbar.css';
import Dropdown from '../Dropdown/Dropdown';

function MobileNavbar() {
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
                    <i className={click ? 'fas fa-times' : 'fas fa-bars'}/>
                </div>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <div id="items">
                        <li className='nav-item'>
                            <Link to='/' className='nav-links' onClick={closeMobileMenu}>
                                <p className="icon">
                                    <span className="material-symbols-rounded"> home </span>
                                </p>Home
                            </Link>
                        </li>
                        <li
                            className='nav-item'
                            onMouseEnter={onMouseEnter}
                            onMouseLeave={onMouseLeave}
                        >
                            <Link
                                // to='/services'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                <p className="icon">
                                    <span className="material-symbols-rounded"> gavel </span>
                                </p>
                                Services <i className='fas fa-caret-down'/>
                            </Link>
                            {dropdown && <Dropdown/>}
                        </li>
                        <li className='nav-item'>
                            <Link
                                // to='/products'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                <p className="icon">
                                    <span className="material-symbols-rounded">account_circle</span>
                                </p>
                                Account
                            </Link>

                        </li>
                        <li className='nav-item'>
                            <Link
                                // to='/products'
                                className='nav-links'
                                onClick={closeMobileMenu}
                            >
                                <p className="icon">

                                <span className="material-symbols-rounded"> mail </span>
                                </p> Inbox
                            </Link>

                        </li>
                    </div>


                    <li className='nav-item'>
                        <Link
                            to='/contact-us'
                            className='nav-links'
                            id="contact"
                            onClick={closeMobileMenu}
                        >
                            <img src="/logo1.png" alt="check-email" id="logo-img-2"/>
                            <p id="phone">+00 40 752 919 073</p>
                        </Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default MobileNavbar;
