import React from "react";
import style from "./Login.module.css";
import Footer from "../../Layouts/Footer/Footer";
import LoginRegister from "../../components/LoginRegister/LoginRegister";

const Login = (props) => {
  return (
    <>
      <div className={style.center}>
        <LoginRegister />
      </div>

      <Footer />
    </>
  );
}

export default Login;
