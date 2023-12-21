import React, { useContext, useEffect, useState } from "react";
import style from "./Schedule.module.css";
import {
  getDatesForMonth,
  getDayData,
  postDayData,
  updateDayData,
} from "../../services/day_api";
import { useDispatch, useSelector } from "react-redux";
import { useFillTime } from "../../hooks/useFillTime";
import { setDayData } from "../../features/sharedWeekSlice";
import ResponsiveDatePicker from "../../components/ResponsiveDatePicker/ResponsiveDatePicker";
import ActionButton from "../../components/ActionButton/ActionButton";
import ContextMenu from "../../components/ContextMenu/ContextMenu";
import DayStatusCard from "../../components/DayStatusCard/DayStatusCard";

function Schedule(props) {

  const [currentMonth, setCurrentMonth] = useState();
  const [monthAvailability, setMonthAvailability] = useState();

  useEffect(() => {
    if (currentMonth) {
      const fetchData = async () => {
        return await getDatesForMonth(currentMonth);
      };

      fetchData().then((r) => setMonthAvailability(r));
    }
  }, [currentMonth]);

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
        <p>Modifica programul</p>
      </div>

      <div className={style.body}>
        <div className={style.datePickerWrapper}>
          <ResponsiveDatePicker
            sendSelectedDate={(date) => handleSelectedDay(date)}
            sendCurrentMonth={(month) => setCurrentMonth(month)}
            sendMultipleSelectionDates={(dates) => handelMultipleDays(dates)}
            monthData={monthAvailability}
          />
        </div>

        {currentSelectionDate && (
          <DayStatusCard currentSelectionDate={currentSelectionDate} />
        )}
      </div>
    </div>
  );
}

export default Schedule;
