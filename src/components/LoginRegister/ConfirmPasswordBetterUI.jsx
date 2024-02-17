import style from './ConfirmPassword.module.css';
import {useEffect, useState} from "react";

export default function ConfirmPasswordBetterUI() {


    const [error, setError] = useState({
        server: false,
        email: false,
        password: false,
        message: '',
    });
    const [warningMessage, setWarningMessage] = useState(
        'Campul este obligatoriu !',
    );
    const [userLoginData, setUserLoginData] = useState({
        email: '',
        password: '',
    });
    const [isLoading, setIsLoading] = useState(false);


    return (
        <div className={style.wrapper}>
            <div className={style.inputs}>
                {error.server && <p className={style.error}>{error.message}</p>}

                <div className={style.inputWrapper}>
                    <h3 className={style.inputTitle}>Email</h3>
                    <input
                        type="text"
                        name="email"
                        // placeholder={'youremail@mail.com'}
                        value={ userLoginData.email}
                        className={style.inputField}
                    />
                    {error.email && <p className={style.error}>{warningMessage} </p>}
                </div>

                <div>
                    <h3 className={style.inputTitle}>Parola</h3>
                    <input
                        type="password"
                        name="password"
                        // placeholder={'*********'}
                        value={userLoginData.password}
                        className={style.inputField}
                    />
                    {error.password && <p className={style.error}>{warningMessage} </p>}
                </div>
            </div>

            <div className={style.buttons}>
                <h3 className={style.forgot}>Ai uitat parola?</h3>
                <button className={style.loginRegisterBtn} >
                    {isLoading ? <div className={style.loader}></div> : 'Autentificare'}
                </button>
            </div>
        </div>
    );
}
