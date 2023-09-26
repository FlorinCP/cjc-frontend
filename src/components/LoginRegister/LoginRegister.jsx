import React, {useContext, useEffect, useState} from 'react';
import style from './LoginRegister.module.css'
import UserContext from "../../context/UserContext";
import QuestionForm from "../QuestionForm/QuestionForm";
import RegisterForm from "../RegisterForm/RegisterForm";
import LoginForm from "../LoginForm/LoginForm";
function LoginRegister(props) {

    const [isChecked, setIsChecked] = useState(true);
    const { currentUser } = useContext(UserContext);

    useEffect(() => {
        console.log(currentUser)
    }, [currentUser]);

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };

    return (
        <div className={style.formPage}>

            {
                isChecked ? (
                    <>
                        {
                            currentUser.email === null ? (<h1 className={style.title}>Autentificare</h1>) : (<></>)
                        }
                    </>

                ) : (<h1 className={style.title}>Inregistrare</h1>)
            }


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

            {!isChecked ? <RegisterForm /> : <LoginForm />}

        </div>
    );
}

export default LoginRegister;