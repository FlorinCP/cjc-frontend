import React, {useEffect, useState} from "react";
import style from "./SideBar.module.css";
import { Link } from "react-router-dom";
import ExpandableSidebarItem from "./ExpandableSidebarItem";
import NonExpandableSidebarItem from "./NonExpandableSidebarItem";
import {useDispatch} from "react-redux";
import {setSidebarStatus, setSidebarValue} from "../../features/sidebarSlice";
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


  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);

  function changeSidebarState(){
    setIsExpanded(prevState => !prevState);
  }

  useEffect(() => {
    dispatch(setSidebarStatus(isExpanded));
  }, [isExpanded]);

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarItems}>
        <div className={style.sidebarHeader}>
          <Link to="/" className={style.link}>
            <img
              src="/favicon.ico"
              alt="check-email"
              id="logo-img"
              className={style.logo}
            />
          </Link>

          <div className={style.hamburger}
            onClick={() => {
              changeSidebarState();
            }}
          >
            <span className="material-symbols-outlined">menu_open</span>
          </div>
        </div>

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
