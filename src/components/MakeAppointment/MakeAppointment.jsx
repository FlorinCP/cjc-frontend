import style from "./MakeAppointment.module.css";
import ResponsiveDatePicker from "../ResponsiveDatePicker/ResponsiveDatePicker";
import React, { useEffect, useState } from "react";
import { getDatesForMonth } from "../../services/day_api";
import useDatePicker from "../../hooks/useDatePicker";
import TimeCollumn from "./TimeCollumn";
import Column from "./Column";
import ActionButton from "../ActionButton/ActionButton";
import ContextMenu from "../ContextMenu/ContextMenu";
import { makeAppointment } from "../../services/appointment_api";
import { useSelector } from "react-redux";
import AddApointmentCard from "./AddApointmentCard";
import DetailedCalendar from "../DetailedCalendar/DetailedCalendar";

function MakeAppointment({ question }) {
  const [currentMonth, setCurrentMonth] = useState();
  const [monthAvailability, setMonthAvailability] = useState([]);
  const { finalDays, today } = useDatePicker();

  useEffect(() => {
    if (currentMonth) {
      const fetchData = async () => {
        return await getDatesForMonth(currentMonth);
      };

      fetchData().then((r) => setMonthAvailability(r));
    }
  }, [currentMonth]);

  const [currentSelectionDate, setCurrentSelectionDate] = useState({});
  const [currentWeek, setCurrentWeek] = useState({
    days: null,
    startTime: null,
    endTime: null,
  });

  const handleSelectedDay = (date) => {
    setCurrentSelectionDate(date);
  };

  useEffect(() => {
    if (currentSelectionDate && finalDays.length > 0) {
      finalDays.forEach((row) => {
        return row.forEach((day) => {
          if (
            monthAvailability.some(
              (receivedDay) => receivedDay.dayNumber === day.dayNumber,
            )
          ) {
            const receivedDay = monthAvailability.find(
              (receivedDay) => receivedDay.dayNumber === day.dayNumber,
            );
            day.workingStatus = receivedDay?.workingStatus;
            day.workingHours = receivedDay?.workingHours;
            day.startHour = receivedDay?.startHour;
            day.endHour = receivedDay?.endHour;
          }
        });
      });

      const week = finalDays.find((week) => {
        return week.find((day) => {
          return day.dayNumber === currentSelectionDate.dayNumber;
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

      setCurrentWeek({
        days: week,
        startTime: startTime,
        endTime: endTime,
      });
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

  return (
    <div className={style.mainContainer}>
      <div className={style.datePickerWrapper}>
        <ResponsiveDatePicker
          sendSelectedDate={(date) => handleSelectedDay(date)}
          sendCurrentMonth={(month) => setCurrentMonth(month)}
          sendMultipleSelectionDates={() => {}}
          monthData={monthAvailability.length > 0 ? monthAvailability : []}
          contextMenuProps={false}
        />
      </div>

      {currentSelectionDate && (
        <AddApointmentCard
          globalSelectedSlot={globalSelectedSlot}
          question={question}
        />
      )}

      {currentWeek.days && (
        <DetailedCalendar
          currentWeek={currentWeek}
          sendGlobalSelectedSlot={(slot) => handleGlobalSelectedSlot(slot)}
          currentSelectionDate={currentSelectionDate}
          today={today}
          globalSelectedSlot={globalSelectedSlot}
        />
      )}
    </div>
  );
}

export default MakeAppointment;
