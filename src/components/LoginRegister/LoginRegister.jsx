import React, { useContext, useEffect, useState } from 'react';
import style from './LoginRegister.module.css';
import RegisterForm from './RegisterForm';
import LoginForm from './LoginForm';
import {useSelector} from "react-redux";

function LoginRegister(props) {
  const [isChecked, setIsChecked] = useState(true);
  const islogged = useSelector((state) => state.token.token)

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={style.formPage}>
      {isChecked ? (
        <>
          {islogged === false ? (
            <h1 className={style.title}>Autentificare</h1>
          ) : (
            <></>
          )}
        </>
      ) : (
        <h1 className={style.title}>Inregistrare</h1>
      )}

      <div
        id={
          islogged !== false ? style['swichDivNone'] : style['swichDiv']
        }
      >
        <p className={!isChecked ? style.choiceP : style.choiceD}>Cont nou</p>
        <label className={style.switch}>
          <input
            type="checkbox"
            checked={isChecked}
            onChange={handleCheckboxChange}
          ></input>
          <span className={`${style.slider} ${style.round}`}></span>
        </label>
        <p className={isChecked ? style.choiceP : style.choiceD}>
          Autentificare
        </p>
      </div>

      {!isChecked ? <RegisterForm /> : <LoginForm />}
    </div>
  );
}

export default LoginRegister;
