import React from "react";
import style from "./SideBar.module.css";
import { Link } from "react-router-dom";
import ExpandableSidebarItem from "./ExpandableSidebarItem";
import NonExpandableSidebarItem from "./NonExpandableSidebarItem";
function SideBar(props) {


  const requestItems = [
    {
      url: "/questions/status/waiting",
      iconStringClass: "hourglass_top",
      title: "Cereri in Asteptare",
    },
    {
      url: "/questions/status/accepted",
      iconStringClass: "done",
      title: "Cereri Acceptate",
    },
    {
      url: "/questions/status/rejected",
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


    </div>
  );
}

export default SideBar;
