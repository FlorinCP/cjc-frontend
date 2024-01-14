import React, { useEffect, useState } from "react";
import style from "./SideBar.module.css";
import { Link } from "react-router-dom";
import ExpandableSidebarItem from "./ExpandableSidebarItem";
import NonExpandableSidebarItem from "./NonExpandableSidebarItem";
import { useDispatch, useSelector } from "react-redux";
import { setSidebarStatus, setSidebarValue } from "../../features/sidebarSlice";
import useScreenSize from "../../hooks/useScreenSize";
import { useLogout } from "../../hooks/useLogout";
function SideBar(props) {
  const { width, height } = useScreenSize();
  const logout = useLogout();

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

  const transactionItems = [
    {
      url: "/strype/generate-payment-link",
      iconStringClass: "add_card",
      title: "Link Plata",
    },
    {
      url: "/strype/payment-links",
      iconStringClass: "monitoring",
      title: "Raport Tranzactii",
    },
  ];

  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(true);
  const email = useSelector((state) => state.token.email);

  function changeSidebarState() {
    setIsExpanded((prevState) => !prevState);
  }

  useEffect(() => {
    dispatch(setSidebarStatus(isExpanded));
  }, [isExpanded]);

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarItems}>
        <div className={style.sidebarHeader}>
          {width > 768 && (
            <div
              className={style.hamburger}
              onClick={() => {
                changeSidebarState();
              }}
            >
              <span className="material-symbols-outlined">menu_open</span>
            </div>
          )}
        </div>

        <NonExpandableSidebarItem
          url={"/"}
          // iconStringClass={"home"}
          title={"Pagina Principala"}
        />

        <div className={style.line}></div>

        <ExpandableSidebarItem
          mainUrl={"/questions"}
          name={"Cereri"}
          sidebarItems={requestItems}
        />

        <div className={style.line}></div>

        <ExpandableSidebarItem
          mainUrl={"/schedule"}
          name={"Program"}
          sidebarItems={scheduleItems}
        />
        <div className={style.line}></div>

        <ExpandableSidebarItem
          mainUrl={"/schedule"}
          name={"Tranzactii"}
          sidebarItems={transactionItems}
        />

        <div className={style.line}></div>

        <NonExpandableSidebarItem
          url={"/videocall"}
          // iconStringClass={"videocam"}
          title={"VideoCall"}
        />

        <div className={style.line}></div>
        <div className={style.userInfo}>
          <div className={style.line}></div>
          <div
            style={{ display: "flex", marginTop: "10px", alignItems: "center" }}
          >
            <span className="material-symbols-outlined">account_circle</span>
            <p className={style.userEmail}>{email}</p>
            <span
              className="material-symbols-outlined"
              onClick={() => logout()}
            >
              logout
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
