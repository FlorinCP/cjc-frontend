import style from "./MakeAppointment.module.css"
import React from "react";
import useDatePicker from "../../hooks/useDatePicker";

function HeaderCell({day,index}) {

    const { getMonthName, getWeekdayName } = useDatePicker();

    function capitalizeFirstLetter(string) {
        if (!string) return string;
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <div className={style.headerCell}>
            <p>{day.dayNumber}</p>
            <p>{capitalizeFirstLetter(getMonthName(day.monthNumber,'ro-RO','long'))}</p>
            <p>{capitalizeFirstLetter(getWeekdayName(index,'ro-RO','long'))}</p>
        </div>
    )
}

export default HeaderCell
