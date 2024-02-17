import style from "../../pages/ViewQuestions/ViewQuestions.module.css";
import React from "react";
import { useLogout } from "../../hooks/useLogout";
import { useSelector } from "react-redux";

function Header({ title,subtitle ,children }) {


  return (
    <div className={style.header}>
      <p className={style.title}>{title}</p>
      <div className={style.line}></div>
      <p className={style.info}>
          {subtitle}
      </p>
        {children}
    </div>
  );
}

export default Header;
