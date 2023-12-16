import style from "./SideBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";

function NonExpandableSidebarItem({ url, iconStringClass, title }) {
  return (
    <NavLink to={url} className={style.sidebarItem2}>
      <span className="material-symbols-outlined">{iconStringClass}</span>{" "}
      {title}{" "}
    </NavLink>
  );
}

export default NonExpandableSidebarItem;
