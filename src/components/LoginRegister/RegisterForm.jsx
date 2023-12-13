import React, { useState } from "react";
import style from "./LoginRegister.module.css";
import { registerUser } from "../../services/user_api"

function RegisterForm(props) {

  const [isLoggedOrRegistered, setIsLoggedOrRegistered] = useState(false);
  const [currentLoggedUser,setCurrentLoggedUser] = useState(null)

  const [userRegisterData, setUserRegisterData] = useState({
    nume: "",
    prenume: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserRegisterData({ ...userRegisterData, [name]: value });
  };

  async function registerUserFunction(e) {
    e.preventDefault();
    const data = await registerUser(userRegisterData);
    if (data) {
      setIsLoggedOrRegistered(true);
    }
    setCurrentLoggedUser(data.email);
    localStorage.setItem("email", data.email);
    console.log(data);
  }

  return (
    <div className={style.wrapper}>
      {
        !isLoggedOrRegistered ? (
            <>
              <h3>Nume</h3>
              <input
                  type="text"
                  name="nume"
                  value={userRegisterData.nume}
                  onChange={handleRegisterChange}
                  className={style.inputField}
              />
              <h3>Prenume</h3>
              <input
                  type="text"
                  name="prenume"
                  value={userRegisterData.prenume}
                  onChange={handleRegisterChange}
                  className={style.inputField}
              />
              <h3>Numar de telefon</h3>
              <input
                  type="text"
                  name="phone"
                  value={userRegisterData.phone}
                  onChange={handleRegisterChange}
                  className={style.inputField}
              />

              <h3>Email</h3>
              <input
                  type="text"
                  name="email"
                  value={userRegisterData.email}
                  onChange={handleRegisterChange}
                  className={style.inputField}
              />

              <h3>Parola</h3>
              <input
                  type="password"
                  name="password"
                  value={userRegisterData.password}
                  onChange={handleRegisterChange}
                  className={style.inputField}
              />
              <div className={style.buttons}>
                <button
                    className={ style.loginRegisterBtn}
                    onClick={registerUserFunction}>Inregistrare
                </button>
              </div>

            </>
        ) : (
            <div className={style.succesfullRegister}>
              <h2>INREGISTRARE REUSITA !</h2>
              <img src="/succes.svg" alt="" />
            </div>
        )
      }



    </div>
  );
}

export default RegisterForm;
