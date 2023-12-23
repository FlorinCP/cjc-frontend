import style from "../../pages/ViewQuestions/ViewQuestions.module.css";
import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useSelector } from "react-redux";

function Header({ title }) {
  const logut = useLogout();

  const currentUser = useSelector((state) => state.token);

  const logout = () => {
    logut();
  };

  return (
    <div className={style.header}>
      <div></div>
      <p className={style.title}>{title}</p>

      <div className={style.userInfo}>
        <div>
          <span className="material-symbols-outlined">account_circle</span>{" "}
          {currentUser.email}
          {"   "}
        </div>
        <div className={style.logout}>
          <span className="material-symbols-outlined" onClick={logout}>
            logout
          </span>
        </div>
      </div>
    </div>
  );
}

export default Header;
