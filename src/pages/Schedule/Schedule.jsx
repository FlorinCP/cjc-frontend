import React, { useContext, useEffect, useState } from "react";
import style from "./Schedule.module.css";
import {
  getDatesForMonth,
} from "../../services/day_api";
import ResponsiveDatePicker from "../../components/ResponsiveDatePicker/ResponsiveDatePicker";
import DayStatusCard from "../../components/DayStatusCard/DayStatusCard";
import MultipleDaysStatusCard from "../../components/DayStatusCard/MultipleDaysStatusCard";

function Schedule(props) {

  const [currentSelectionDate, setCurrentSelectionDate] = useState();

  const handleSelectedDay = (date) => {
    setCurrentSelectionDate(date);
  };

  const [multipleSelectionDates, setMultipleSelectionDates] = useState([]);

  function handelMultipleDays(dates) {
    setMultipleSelectionDates(dates);
  }

  useEffect(() => {
    if (multipleSelectionDates) {
      console.log(multipleSelectionDates);
    }
  }, [multipleSelectionDates]);

  return (
    <div className={style.mainContainer}>
      <div className={style.header}>
        <p>Modifica programul</p>
      </div>

      <div className={style.body}>
        <div className={style.datePickerWrapper}>
          <ResponsiveDatePicker
            sendSelectedDate={(date) => handleSelectedDay(date)}
            sendMultipleSelectionDates={(dates) => handelMultipleDays(dates)}
          />
        </div>

        {currentSelectionDate && (
          <DayStatusCard currentSelectionDate={currentSelectionDate} />
        )}

        {multipleSelectionDates.length > 0 && (
          <MultipleDaysStatusCard multipleSelectionDates={multipleSelectionDates} />
        )}
      </div>
    </div>
  );
}

export default Schedule;
