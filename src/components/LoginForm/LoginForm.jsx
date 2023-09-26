import React, {useContext, useState} from 'react';
import style from './LoginForm.module.css'
import {loginUser} from "../../services/user_api";
import UserContext from "../../context/UserContext";

function LoginForm(props) {

    const [userLoginData, setUserLoginData] = useState({
        email: "",
        password: "",
    });

    const { currentUser ,updateCurrentUser} = useContext(UserContext);



    const handleLoginChange = (e) => {
        const {name,value} = e.target;
        setUserLoginData({...userLoginData, [name] : value})
    }

    async function loginUserFunction(e){
        e.preventDefault();
        console.log(userLoginData)
        const data = await loginUser(userLoginData)
        updateCurrentUser({
            email : data.email,
            role : data.role
        })
        localStorage.setItem('email', data.email);
        localStorage.setItem('role', data.role);
        console.log(data)
    }

    return (
        <div className={style.wrapper}>
            {
                currentUser.email === null ? (
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