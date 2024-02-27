import style from "./MakeAppointment.module.css";
import Header from "../Calendar/Header";
import HeaderCell from "./HeaderCell";
import React from "react";
import useDatePicker from "../../hooks/useDatePicker";

export default function MobileTimeColumn({ day, index }) {
    const { decimalHoursToTime } = useDatePicker();

    return (
        <div className={style.timeColumn}>
            <div className={style.headerCell}></div>
            {day.slots.map((slot,index) => {
                return (
                    <div className={style.timecell} key={index}>
                        <p>{decimalHoursToTime(slot)}</p>
                    </div>
                );
            })}
        </div>
    );
}

