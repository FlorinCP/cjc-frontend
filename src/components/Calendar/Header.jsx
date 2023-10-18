import React from 'react';
import style from "./Calendar.module.css";
import {useCalendar} from "../../hooks/useCalendar";

function Header(props) {
    const { weekdays, weekIndex, displayedWeek, changeIndex } = useCalendar();

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
                {displayedWeek.map((item, index) => (
                    <div key={index} className={style.dayDetails}>
                        <h1>{item.getDate()}</h1>
                        <p>{weekdays[index]}</p>
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div>
            {populateHeader()}
        </div>
    );
}

export default Header;