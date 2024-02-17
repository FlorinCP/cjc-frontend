import React, { useContext, useEffect, useState } from "react";
import style from "../Schedule/Schedule.module.css";
import ResponsiveDatePicker from "../../components/ResponsiveDatePicker/ResponsiveDatePicker";
import DayStatusCard from "../../components/DayStatusCard/DayStatusCard";
import MultipleDaysStatusCard from "../../components/DayStatusCard/MultipleDaysStatusCard";
import {
  resetCurrentWeek,
  setCurrentWeek,
} from "../../features/currentWeekSlice";
import useDatePicker from "../../hooks/useDatePicker";
import { useDispatch, useSelector } from "react-redux";
import useScreenSize from "../../hooks/useScreenSize";
import DetailedCalendarMobile from "../../components/DetailedCalendarMobile/DetailedCalendarMobile";
import DetailedCalendar from "../../components/DetailedCalendar/DetailedCalendar";

function DetailedSchedule(props) {
  const { finalDays } = useDatePicker();
  const dispatch = useDispatch();

  const monthDays = useSelector((state) => state.monthDays.monthDays);
  const { width } = useScreenSize();
  const [currentSelectionDate, setCurrentSelectionDate] = useState({});

  const handleSelectedDay = (date) => {
    if (date === currentSelectionDate) {
      dispatch(resetCurrentWeek());
      setCurrentSelectionDate(null);
    } else {
      setCurrentSelectionDate(date);
    }
  };

  useEffect(() => {
    if (currentSelectionDate && finalDays.length > 0) {
      const deepCopy = JSON.parse(JSON.stringify(monthDays));

      const week = deepCopy.find((week) => {
        return week.find((day) => {
          return (
            day.dayNumber === currentSelectionDate.dayNumber &&
            day.monthNumber === currentSelectionDate.monthNumber
          );
        });
      });

      const startTime = Math.min(
        ...week
          .map((day) => day.startHour)
          .filter((hour) => hour !== null && hour !== undefined),
      );
      const endTime = Math.max(
        ...week
          .map((day) => day.endHour)
          .filter((hour) => hour !== null && hour !== undefined),
      );

      const slots = [];
      for (let i = startTime; i < endTime; i += 0.5) {
        slots.push(i);
      }

      week.forEach((day) => {
        day.slots = slots;
      });

      dispatch(
        setCurrentWeek({
          days: week,
          startTime: startTime,
          endTime: endTime,
        }),
      );
    }
  }, [currentSelectionDate]);

  const [globalSelectedSlot, setGlobalSelectedSlot] = useState({
    slot: null,
    day: null,
  });

  function handleGlobalSelectedSlot(slot) {
    if (globalSelectedSlot.slot === slot.slot) {
      setGlobalSelectedSlot({ slot: null, day: null });
    } else {
      setGlobalSelectedSlot({ slot: slot.slot, day: slot.day });
    }
  }

  const currentWeek = useSelector((state) => state.currentWeek.currentWeek);

  useEffect(() => {
    if (width) {
      console.log(width);
    }
  }, [width]);

  return (
    <div className={style.mainContainer}>
      <div className={style.header}>
        <p className={style.title}>Vizualizare detaliata a programului</p>
        <div className={style.line}></div>
        <p className={style.info}>
          Selectati programul dumneavoastra pentru fiecare zi dorita.
        </p>
      </div>

      <div className={style.body2}>
        <div className={style.datePickerWrapper2}>
          <ResponsiveDatePicker
            sendSelectedDate={(date) => handleSelectedDay(date)}
            sendMultipleSelectionDates={() => {}}
            contextMenuProps={false}
            receivedSelectionDate={currentSelectionDate}
          />
        </div>
        {currentSelectionDate && currentWeek.days.length > 0 && (
          <>
            {width < 500 ? (
              <DetailedCalendarMobile
                sendGlobalSelectedSlot={(slot) =>
                  handleGlobalSelectedSlot(slot)
                }
                currentSelectionDate={currentSelectionDate}
                globalSelectedSlot={globalSelectedSlot}
                sendNewSelectedDate={(day) => handleSelectedDay(day)}
              />
            ) : (
              <DetailedCalendar
                sendGlobalSelectedSlot={(slot) =>
                  handleGlobalSelectedSlot(slot)
                }
                currentSelectionDate={currentSelectionDate}
                globalSelectedSlot={globalSelectedSlot}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default DetailedSchedule;
