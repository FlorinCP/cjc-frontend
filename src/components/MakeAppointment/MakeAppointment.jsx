import style from "./MakeAppointment.module.css";
import ResponsiveDatePicker from "../ResponsiveDatePicker/ResponsiveDatePicker";
import React, { useEffect, useState } from "react";
import useDatePicker from "../../hooks/useDatePicker";
import { useDispatch, useSelector } from "react-redux";
import AddApointmentCard from "./AddApointmentCard";
import DetailedCalendar from "../DetailedCalendar/DetailedCalendar";
import  {
  resetCurrentWeek,
  setCurrentWeek,
} from "../../features/currentWeekSlice";
import useScreenSize from "../../hooks/useScreenSize";
import DetailedCalendarMobile from "../DetailedCalendarMobile/DetailedCalendarMobile";

function MakeAppointment({ question }) {
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

  return (
    <div className={style.mainContainer}>
      <AddApointmentCard
        globalSelectedSlot={globalSelectedSlot}
        question={question}
      />

      <div className={style.datePickerWrapper}>
        <ResponsiveDatePicker
          sendSelectedDate={(date) => handleSelectedDay(date)}
          sendMultipleSelectionDates={() => {}}
          contextMenuProps={false}
          receivedSelectionDate={currentSelectionDate}
        />
      </div>

      {/*{currentSelectionDate && (*/}
      {/*  */}
      {/*)}*/}

      {currentSelectionDate && currentWeek.days.length > 0 && (
        <>
          {width < 500 ? (
            <DetailedCalendarMobile
              sendGlobalSelectedSlot={(slot) => handleGlobalSelectedSlot(slot)}
              currentSelectionDate={currentSelectionDate}
              globalSelectedSlot={globalSelectedSlot}
              sendNewSelectedDate={(day)=> handleSelectedDay(day) }
            />
          ) : (
            <DetailedCalendar
              sendGlobalSelectedSlot={(slot) => handleGlobalSelectedSlot(slot)}
              currentSelectionDate={currentSelectionDate}
              globalSelectedSlot={globalSelectedSlot}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MakeAppointment;
