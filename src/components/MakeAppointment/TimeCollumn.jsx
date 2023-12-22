import style from "./MakeAppointment.module.css";
import Header from "../Calendar/Header";
import HeaderCell from "./HeaderCell";
import React from "react";
import useDatePicker from "../../hooks/useDatePicker";

function TimeColumn({ day, index }) {
  const { decimalHoursToTime } = useDatePicker();

  return (
    <div className={style.column}>
        <div className={style.headerCell}></div>
      {day.slots.map((slot) => {
        return (
          <div className={style.cell}>
            <p>{decimalHoursToTime(slot)}</p>
          </div>
        );
      })}
    </div>
  );
}

export default TimeColumn;
