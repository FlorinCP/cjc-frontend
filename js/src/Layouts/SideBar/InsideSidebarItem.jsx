import {NavLink} from "react-router-dom";
import style from "./SideBar.module.css";
import React from "react";

function InsideSidebarItem({url,iconStringClass,title}){

    return (
      <NavLink
        to={url}
        className={({ isActive }) =>
          isActive ? style.loadBtnSelected : style.loadBtn
        }
      >
        <span className="material-symbols-outlined">{iconStringClass}</span>{" "}
          {title}{" "}
      </NavLink>
    );
}

export default InsideSidebarItem;
