import React, { useContext, useEffect, useState } from "react";
import style from "./Schedule.module.css";
import { getDatesForMonth } from "../../services/day_api";
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

  return (
    <div className={style.mainContainer}>
      <div className={style.header}>
        <p className={style.title}>Modifica programul</p>
        <div className={style.line}></div>
        <p className={style.info}>Selectati programul dumneavoastra pentru fiecare zi dorita.</p>
      </div>

      <div className={style.body}>
        <div className={style.datePickerWrapper}>
          <ResponsiveDatePicker
            sendSelectedDate={(date) => handleSelectedDay(date)}
            sendMultipleSelectionDates={(dates) => handelMultipleDays(dates)}
          />
        </div>
        <div className={style.cardWrapper}>
          {currentSelectionDate && (
            <DayStatusCard currentSelectionDate={currentSelectionDate} />
          )}

          {multipleSelectionDates.length > 0 && (
            <MultipleDaysStatusCard
              multipleSelectionDates={multipleSelectionDates}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Schedule;
