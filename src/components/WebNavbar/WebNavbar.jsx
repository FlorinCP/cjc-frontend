import React, {useContext, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import './WebNavbar.css';
import Dropdown from "../Dropdown/Dropdown";
import UserContext from "../../context/UserContext";

function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const { currentUser ,updateCurrentUser} = useContext(UserContext);

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

    const logout = () =>{
        updateCurrentUser({})
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        window.location.reload()
    }

    return (
        <>
            <nav className='navbar'
            ref={navbar}
            >
                <Link to='/' className='navbar-logo' >
                    <img src="/whitelogo.png" alt="check-email" id="logo-img"/>
                </Link>


                <ul className={'nav-menu'}>
                    <li className='nav-item'>
                        <Link to='/' className='nav-links' >
                            Acasa
                        </Link>
                    </li>

                    {
                        currentUser.role === "ADMIN" ? (
                            <li className='nav-item'>
                                <Link
                                    to='/admin-dashboard'
                                    className='nav-links'
                                >
                                    Dashboard
                                </Link>
                            </li>
                        ) : (
                            <li className='nav-item'>
                                <Link
                                    to='/user-dashboard'
                                    className='nav-links'
                                >
                                    Profil
                                </Link>
                            </li>
                        )
                    }

                    <li
                        className='nav-item'
                        onMouseEnter={onMouseEnter}
                        onMouseLeave={onMouseLeave}
                    >
                        <Link
                            to='/services'
                            className='nav-links'
                        >
                            Servicii <i className='fas fa-caret-down' />
                        </Link>
                        {dropdown && <Dropdown />}
                    </li>




                    {
                        !currentUser.email === null && (
                            <li className='nav-item'>
                                <Link
                                    to='/test'
                                    className='nav-links'
                                >
                                    Cont
                                </Link>
                            </li>
                        )
                    }
                    <li className='nav-item'>
                        {
                            currentUser.email === null ? (
                                <Link
                                    to='/login'
                                    className='nav-linksPermanent'
                                >
                                    Inregistrare
                                </Link>
                            ) : (
                                <div className='nav-linksPermanent' onClick={logout}> Deconectare </div>
                            )
                        }
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;
