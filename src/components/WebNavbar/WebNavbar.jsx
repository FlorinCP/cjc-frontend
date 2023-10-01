import React, {useContext, useEffect, useRef, useState} from 'react';
import { Link } from 'react-router-dom';
import './WebNavbar.css';
import Dropdown from "../Dropdown/Dropdown";
import UserContext from "../../context/UserContext";

function Navbar() {
    const [dropdown, setDropdown] = useState(false);
    const { currentUser ,updateCurrentUser} = useContext(UserContext);

    const logout = () =>{
        updateCurrentUser({})
        localStorage.removeItem("email")
        localStorage.removeItem("role")
        window.location.reload()
    }

    const [prevScrollPos, setPrevScrollPos] = useState(0);
    const [visible, setVisible] = useState(true)

    const handleScroll = () => {
        const currentScrollPos = window.scrollY

        if(currentScrollPos > prevScrollPos && window.scrollY > 80 ){
            setVisible(false)
        }else{
            setVisible(true)
        }

        setPrevScrollPos(currentScrollPos)
    }

    useEffect( () => {
        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll)
    })


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
            <nav className={ !visible ?  'navbarScrollTop' : 'navbarScrollDown' }
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

                    <li className='nav-item'>
                        <Link to='/test' className='nav-links' >
                            Test
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
