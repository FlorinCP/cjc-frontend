import React from 'react';
import style from './Login.module.css'
import Footer from "../../components/Footer/Footer";
import LoginRegisterQuestionForm from "../../components/LoginRegisterQuestionForm/LoginRegisterQuestionForm";
import LoginForm from "../../components/LoginForm/LoginForm";
import LoginRegister from "../../components/LoginRegister/LoginRegister";
function Login(props) {
    return (<>
            <div className={style.center}>

                <LoginRegister/>
                </div>

            <Footer/>
    </>


    );
}

export default Login;