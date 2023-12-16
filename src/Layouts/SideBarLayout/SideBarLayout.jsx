import React from "react";
import SideBar from "../SideBar/SideBar";
import style from "./SideBarLayout.module.css";
import {Outlet} from "react-router-dom";
function SideBarLayout() {
  return (
    <div className={style.wrapper}>
      <SideBar />
      <Outlet className={style.mainContainer}/>
    </div>
  );
}

export default SideBarLayout;
