import style from "../../pages/ViewQuestions/ViewQuestions.module.css";
import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useSelector } from "react-redux";

function Header({ title }) {


  return (
    <div className={style.header}>
      <p className={style.title}>{title}</p>
      <div className={style.line}></div>
      <p className={style.info}>
        Vizualizare sumara cereri acceptate.
      </p>
    </div>
  );
}

export default Header;
