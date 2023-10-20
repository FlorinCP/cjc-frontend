import React, { useEffect } from "react";
import style from "./Calendar.module.css";
import { useCalendar } from "../../hooks/useCalendar";
import { useSelector } from "react-redux";
import { useMonthDays } from "../../hooks/useMonthDays";

function Header(props) {
  const { weekIndex, changeIndex } = useCalendar();
  const { weekdays } = useMonthDays();
  const currentWeek = useSelector((state) => state.sharedDisplayedWeek.value);

  function weekNavigation() {
    return (
      <div className={style.weekNavigation}>
        <div onClick={() => changeIndex(weekIndex - 1)}>
          <span className="material-symbols-outlined"> navigate_before </span>
        </div>
        <div onClick={() => changeIndex(weekIndex + 1)}>
          <span className="material-symbols-outlined">navigate_next</span>
        </div>
      </div>
    );
  }

  function populateHeader() {
    return (
      <div className={style.dayNames}>
        {weekNavigation()}
        {currentWeek.map((item, index) => (
          <div key={index} className={style.dayDetails}>
            <h1>{item.dayNumber}</h1>
            <p>{weekdays[index]}</p>
            <p>{item.fullYear}</p>
          </div>
        ))}
      </div>
    );
  }

  return <div>{currentWeek && populateHeader()}</div>;
}

export default Header;
