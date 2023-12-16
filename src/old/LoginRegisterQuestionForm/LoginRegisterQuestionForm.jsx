import React, {useContext, useEffect, useState} from "react";
import style from "./LoginRegisterQuestionForm.module.css";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../../Layouts/LoginForm/LoginForm";
import UserContext from "../../context/UserContext";
import QuestionForm from "../QuestionForm/QuestionForm";
function LoginRegisterQuestionForm(props) {

  const [isChecked, setIsChecked] = useState(false);
  const { currentUser } = useContext(UserContext);

  useEffect(() => {
    console.log(currentUser)
  }, [currentUser]);

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  return (
    <div className={style.formPage}>

      <div className={style.pageIndex}>
        <div id={currentUser.email !== null ? style["line"] : style["lineDisabled"]}></div>
        <div className={style.holly}>
          <button className={style.indexButton}>1</button>
          Creeare Cont
        </div>
        <div className={currentUser.email !== null ? style.holly : style.hollyDisabled}>
          <button className={style.indexButton}>2</button>
          Fisiere si Descriere
        </div>
      </div>

        <div
          id={currentUser.email !== null ? style["swichDivNone"] : style["swichDiv"]}
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

      {
        currentUser.email !== null ? (
            <QuestionForm/>
        ) : (
            <>
              {!isChecked ? <RegisterForm /> : <LoginForm />}
            </>
        )
      }
    </div>
  );
}

export default LoginRegisterQuestionForm;
