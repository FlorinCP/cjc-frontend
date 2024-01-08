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
      <p className={style.title}>{title}</p>
      <div className={style.line}></div>
      <p className={style.info}>
        Selectati programul dumneavoastra pentru fiecare zi dorita.
      </p>
    </div>
  );
}

export default Header;
