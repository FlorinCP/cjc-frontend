import React, {useContext, useState} from 'react';
import style from './LoginRegister.module.css'
import {loginUser, singin} from "../../services/user_api";
import UserContext from "../../context/UserContext";
import {useDispatch, useSelector} from "react-redux";
import {setToken} from "../../features/tokenSlice";
import useTokenParser from "../../hooks/useTokenParser";
import useLogin from "../../hooks/useLogin";

function LoginForm(props) {

    const islogged = useSelector((state) => state.token.token)
    const login = useLogin()

    const [userLoginData, setUserLoginData] = useState({
        email: "",
        password: "",
    });

    const handleLoginChange = (e) => {
        const {name,value} = e.target;
        setUserLoginData({...userLoginData, [name] : value})
    }

    const loginUserFunction =async (e) => {
        e.preventDefault();
        await login(userLoginData)
    }

    return (
        <div className={style.wrapper}>
            {
                islogged === false ? (
                    <>
                        <h3>Email</h3>
                        <input
                            type="text"
                            name="email"
                            value={userLoginData.email}
                            onChange={handleLoginChange}
                            className={style.inputField}
                        />
                        <h3>Parola</h3>
                        <input
                            type="password"
                            name="password"
                            value={userLoginData.password}
                            onChange={handleLoginChange}
                            className={style.inputField}
                        />

                        <div className={style.buttons}>
                            <button
                                className={style.loginRegisterBtn}
                                onClick={loginUserFunction}>Autentificare
                            </button>
                        </div>
                    </>
                ) : (
                    <div className={style.succesfullRegister}>
                        <h2>AUTENTIFICARE REUSITA !</h2>
                        <img src="/succes.svg" alt=""/>

                    </div>
                )
            }
        </div>
    );
}

export default LoginForm;
