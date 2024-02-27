import React from "react";
import SideBar from "../SideBar/SideBar";
import style from "./SideBarLayout.module.css";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import CollapsedSidebar from "../SideBar/CollapsedSidebar";
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
    <div style={ isExpaned ? expanedStyle : collapsedStyle}>
      {isExpaned ? <SideBar /> : <CollapsedSidebar />}
      <Outlet />
    </div>
  );
}

export default SideBarLayout;
