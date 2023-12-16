import style from "./SideBar.module.css";
import { NavLink, useLocation } from "react-router-dom";
import React, { useState } from "react";

function ExpandableSidebarItem({name,mainUrl,sidebarItems}) {
  const currentUrl = useLocation().pathname;

  const [expand, setExpand] = useState(
    currentUrl.includes(mainUrl),
  );

  const displayRequests = () => {
    setExpand((prevState) => !prevState);
  };

  return (
    <div className={expand ? style.sidebarItemSelected : style.sidebarItem}>
      <div className={style.clickableSidebarItem} onClick={displayRequests}>
        <span className="material-symbols-outlined">dynamic_form</span>
        {name}
        <div className={style.absoluteRight}>
          {expand ? (
            <span className="material-symbols-outlined">expand_less</span>
          ) : (
            <span className="material-symbols-outlined">expand_more</span>
          )}
        </div>
      </div>

      {expand && (
        <div className={style.insideSideBarItem}>
          {sidebarItems.map((url, index) => {
            return (
              <NavLink
                key={index}
                to={url.url}
                className={({ isActive }) =>
                  isActive ? style.loadBtnSelected : style.loadBtn
                }
              >
                <span className="material-symbols-outlined">
                  {url.iconStringClass}
                </span>{" "}
                {url.title}{" "}
              </NavLink>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default ExpandableSidebarItem;
