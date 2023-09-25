import React from 'react';
import style from './Login.module.css'
import Footer from "../../components/Footer/Footer";
import LoginRegisterForm from "../../components/LoginRegisterForm/LoginRegisterForm";
function Login(props) {
    return (
        <div className={style.center}>
            <LoginRegisterForm></LoginRegisterForm>
        <Footer/>
        </div>

    );
}

export default Login;