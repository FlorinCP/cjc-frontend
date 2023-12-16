import React, { useEffect, useRef, useState } from "react";
import style from "./Calendar.module.css";
import { useSelector } from "react-redux";
import { useMonthDays } from "../../hooks/useMonthDays";
import DatePicker from "../../old/DatePickerSidebar/DatePicker";

function Header(props) {
  const { currentWeekIndex, changeIndex } = useMonthDays();
  const currentWeek = useSelector((state) => state.sharedDisplayedWeek.value);
  const today = useSelector((state) => state.sharedToday.today);

  const daysOfWeek = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  function weekNavigation() {
    return (
      <div className={style.weekNavigation}>
        <div onClick={() => changeIndex(currentWeekIndex - 1)}>
          <span className="material-symbols-outlined"> navigate_before </span>
        </div>
        <div onClick={() => changeIndex(currentWeekIndex + 1)}>
          <span className="material-symbols-outlined">navigate_next</span>
        </div>
      </div>
    );
  }

  const [showCalendar, setShowCalendar] = useState(false);

  const displayCalendar = () => {
    setShowCalendar((prevState) => !prevState);
  };

  function currentMonth(currentMonthIndex) {
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    return monthNames[currentMonthIndex];
  }

  function calendar() {
    return (
      <div
        className={showCalendar ? style.sidebarItemSelected : style.sidebarItem}
      >
        <div className={style.clickableSidebarItem} onClick={displayCalendar}>
          <span className="material-symbols-outlined">calendar_today</span>
          {today.dayNumber} {currentMonth(today.monthNumber - 1)} {today.year}
          <div className={style.absoluteRight}>
            {showCalendar ? (
              <span className="material-symbols-outlined">expand_less</span>
            ) : (
              <span className="material-symbols-outlined">expand_more</span>
            )}
          </div>
        </div>

        {showCalendar && (
          <div className={style.calendar}>
            <DatePicker />
          </div>
        )}
      </div>
    );
  }

  function populateHeader() {
    return (
      <div>
        <div className={style.headerNavigation}>
          {today && calendar()}
          {weekNavigation()}
        </div>
        <div className={style.dayNames}>
          <div className={style.dayDetails}></div>
          {currentWeek.map((item, index) => (
            <div
              key={index}
              className={
                item.dayNumber === today.dayNumber
                  ? style.today
                  : style.dayDetails
              }
            >
              <div>
                <h1>{item.dayNumber}</h1>
              </div>
              <div>
                <p className={style.weekDay}>{daysOfWeek[index]}</p>
                <p className={style.month}>
                  {" "}
                  {currentMonth(item.monthNumber - 1)}
                </p>
                <p className={style.year}>{item.year}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }



  return (
    <div>
      {currentWeek && populateHeader()}
    </div>
  );
}

export default Header;
