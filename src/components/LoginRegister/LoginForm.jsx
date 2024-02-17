import React, { useContext, useState } from "react";
import style from "./LoginRegister.module.css";
import { loginUser, singin } from "../../services/user_api";
import UserContext from "../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { setToken } from "../../features/tokenSlice";
import useTokenParser from "../../hooks/useTokenParser";
import useLogin from "../../hooks/useLogin";
import ActionButton from "../ActionButton/ActionButton";
import { useNavigate } from "react-router-dom";

function LoginForm(props) {
  const islogged = useSelector((state) => state.token.token);
  const login = useLogin();
  const navigate = useNavigate();

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    password: "",
  });

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setUserLoginData({ ...userLoginData, [name]: value });
  };

  const loginUserFunction = async (e) => {
    e.preventDefault();
    await login(userLoginData);
  };

  return (
    <div className={style.wrapper}>
      {islogged === false ? (
        <>
          <h3 className={style.fieldTitle}>Email</h3>
          <input
            type="text"
            name="email"
            value={userLoginData.email}
            onChange={handleLoginChange}
            className={style.inputField}
          />
          <h3 className={style.fieldTitle}>Parola</h3>
          <input
            type="password"
            name="password"
            value={userLoginData.password}
            onChange={handleLoginChange}
            className={style.inputField}
          />

          <div className={style.buttons}>
            <ActionButton
              text={"Autentificare"}
              onClick={loginUserFunction}
              color={"white"}
              backgroundColor={"rgb(238,49,88)"}
              active={true}
            />
          </div>
        </>
      ) : (
        <div className={style.succesfullRegister}>
          <img src="/succes.svg" alt="" />
          <h2>Autentificare Reusita !</h2>
          <ActionButton
            active={true}
            color={"white"}
            backgroundColor={"rgb(238,49,88)"}
            text={"Inainte"}
            onClick={() => {
              navigate("/questions/status/accepted");
            }}
          >
            <span class="material-symbols-outlined">check_circle</span>
          </ActionButton>
        </div>
      )}
    </div>
  );
}

export default LoginForm;
