import React from "react";
import SideBar from "../SideBar/SideBar";
import style from "../SideBarLayout/SideBarLayout.module.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import CollapsedSidebar from "../SideBar/CollapsedSidebar";
import useScreenSize from "../../hooks/useScreenSize";
import ResponsiveNavbarFixed from "../ResponsiveNavbar/ResponsiveNavbarFixed";
function SideBarLayout() {
  const isExpaned = useSelector((state) => state.sidebar.isExpanded);

  const expanedStyle = {
    display: "grid",
    gridTemplateColumns: "15% 85%",
    width: "100vw",
    transition: "0.5s all",
  };

  const collapsedStyle = {
    display: "grid",
    gridTemplateColumns: "3% 97%",
    width: "100vw",
    transition: "0.5s all",
  };

  return (
    <div className={style.multiWrapper}>
      <ResponsiveNavbarFixed />
      {useScreenSize().width > 450 ? (
        <div className={style.content} style={isExpaned ? expanedStyle : collapsedStyle}>
          {isExpaned ? <SideBar /> : <CollapsedSidebar />}
          {/*<div className={style.outlet}>*/}
          <Outlet />
          {/*</div>*/}
        </div>
      ) : (
        <Outlet />
      )}
    </div>
  );
}

export default SideBarLayout;
