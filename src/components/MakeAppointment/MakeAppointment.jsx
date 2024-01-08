import style from "./MakeAppointment.module.css";
import ResponsiveDatePicker from "../ResponsiveDatePicker/ResponsiveDatePicker";
import React, { useEffect, useState } from "react";
import { getDatesForMonth } from "../../services/day_api";
import useDatePicker from "../../hooks/useDatePicker";
import TimeCollumn from "./TimeCollumn";
import Column from "./Column";
import ActionButton from "../ActionButton/ActionButton";
import ContextMenu from "../ContextMenu/ContextMenu";
import {
  getAppointmentByDay,
  makeAppointment,
} from "../../services/appointment_api";
import { useDispatch, useSelector } from "react-redux";
import AddApointmentCard from "./AddApointmentCard";
import DetailedCalendar from "../DetailedCalendar/DetailedCalendar";
import { store } from "../../app/store";
import currentWeekSlice, {
  resetCurrentWeek,
  setCurrentWeek,
} from "../../features/currentWeekSlice";

function MakeAppointment({ question }) {
  const { finalDays } = useDatePicker();
  const dispatch = useDispatch();

  const monthDays = useSelector((state) => state.monthDays.monthDays);

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
        />
      </div>

      {/*{currentSelectionDate && (*/}
      {/*  */}
      {/*)}*/}

      {currentSelectionDate && currentWeek.days.length > 0 && (
        <DetailedCalendar
          sendGlobalSelectedSlot={(slot) => handleGlobalSelectedSlot(slot)}
          currentSelectionDate={currentSelectionDate}
          globalSelectedSlot={globalSelectedSlot}
        />
      )}
    </div>
  );
}

export default MakeAppointment;
