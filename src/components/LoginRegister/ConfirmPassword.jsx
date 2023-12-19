import style from "./LoginRegister.module.css";
import React, { useEffect, useState } from "react";
import useLogin from "../../hooks/useLogin";
import { useNavigate } from "react-router-dom";
import useRegisterWithToken from "../../hooks/useRegisterWithToken";

function getQueryParams() {
  const queryParams = new URLSearchParams(window.location.search);

  const token = queryParams.get("token");
  const email = queryParams.get("email");

  const decodedToken = token ? decodeURIComponent(token) : null;
  const decodedEmail = email ? atob(email) : null;

  return { decodedToken, decodedEmail };
}

function ConfirmPassword() {
  const registerWithToken = useRegisterWithToken();
  const navigate = useNavigate();
  const [password, setPassword] = useState({
    wantedPassword: "",
    confirmPassword: "",
  });

  const { decodedToken, decodedEmail } = getQueryParams();
  console.log("Token:", decodedToken);
  console.log("Email:", decodedEmail);

  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setPassword({ ...password, [name]: value });
  };

  useEffect(() => {
    if (password.wantedPassword !== password.confirmPassword) {
      setError("Parolele nu coincid");
    } else {
      setUserRegisterData({ password: password.wantedPassword ,email: decodedEmail, token: decodedToken});
      setError(null)
    }
  }, [password]);

  const loginUserFunction = async (e) => {
    e.preventDefault();

    if (!error && (password.wantedPassword !== '' && password.confirmPassword !== '')) {
      console.log(userRegisterData);
      await registerWithToken(userRegisterData);
      navigate("/questions/status/accepted")
    }
  };



  const [error, setError] = useState(null);

  const [userRegisterData, setUserRegisterData] = useState({
    email: decodedEmail,
    password: password.wantedPassword,
    token: decodedToken,
  });

  return (
    <div className={style.formPage}>
      <h1 className={style.title}> Setare Parola </h1>
      <div className={style.wrapper}>
        <h3>Parola</h3>
        <input
          type="password"
          name="wantedPassword"
          value={password.wantedPassword}
          onChange={handleLoginChange}
          className={style.inputField}
        />
        <h3>Confirmare Parola</h3>
        <input
          type="password"
          name="confirmPassword"
          value={password.confirmPassword}
          onChange={handleLoginChange}
          className={style.inputField}
        />

        <p className={style.error}>{error && error}</p>


        <div className={style.buttons}>
          <button
            className={style.loginRegisterBtn}
            onClick={loginUserFunction}
          >
            Inregistrare
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmPassword;
