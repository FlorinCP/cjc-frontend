import React, { useContext, useEffect, useState } from "react";
import style from "./SideBar.module.css";
import { Link } from "react-router-dom";
import ExpandableSidebarItem from "./ExpandableSidebarItem";
import NonExpandableSidebarItem from "./NonExpandableSidebarItem";
import { useLogout } from "../../hooks/useLogout";
import {useSelector} from "react-redux";
function SideBar(props) {
  const logut = useLogout();

  const currentUser = useSelector((state) => state.token)

  const logout = () => {
    logut();
  };

  const requestItems = [
    {
      url: "/questions/waiting",
      iconStringClass: "hourglass_top",
      title: "Cereri in Asteptare",
    },
    {
      url: "/questions/accepted",
      iconStringClass: "done",
      title: "Cereri Acceptate",
    },
    {
      url: "/questions/rejected",
      iconStringClass: "block",
      title: "Cereri Respinse",
    },
  ];

  const scheduleItems = [
    {
      url: "/schedule/view",
      iconStringClass: "date_range",
      title: "Program Detaliat",
    },
    {
      url: "/schedule/edit",
      iconStringClass: "edit_calendar",
      title: "Modifica Program",
    },
  ];

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarItems}>
        <Link to="/" className={style.link}>
          <img
            src="/favicon.ico"
            alt="check-email"
            id="logo-img"
            className={style.logo}
          />
        </Link>

        <NonExpandableSidebarItem
          url={"/"}
          iconStringClass={"home"}
          title={"Pagina Principala"}
        />

        <ExpandableSidebarItem
          mainUrl={"/questions"}
          name={"Cereri"}
          sidebarItems={requestItems}
        />

        <ExpandableSidebarItem
          mainUrl={"/schedule"}
          name={"Program"}
          sidebarItems={scheduleItems}
        />

        <NonExpandableSidebarItem
          url={"/videocall"}
          iconStringClass={"videocam"}
          title={"VideoCall"}
        />
      </div>

      <div className={style.bottom}>
        <div className={style.holly}>
          <span className="material-symbols-outlined">account_circle</span>{" "}
          {currentUser.email}
        </div>
        <span className="material-symbols-outlined" onClick={logout}>
          logout
        </span>
      </div>
    </div>
  );
}

export default SideBar;
