import style from "./MakeAppointment.module.css";
import React, { forwardRef, useEffect, useState } from "react";
import HeaderCell from "./HeaderCell";
import Cell from "./Cell";
import { useSelector } from "react-redux";

const Column = forwardRef(
  (
    { globalSelectedSlot, day, index, currentSelectionDate, sendSelectedSlot },
    ref,
  ) => {
    const today = useSelector((state) => state.today.today);

    const handleSelectedSlot = (slot) => {
      sendSelectedSlot({ slot: slot, day: day });
    };

    function isToday(day) {
      return (
        day.dayNumber === today.dayNumber &&
        day.monthNumber === today.monthNumber
      );
    }

    function isDateSelected(day) {
      return (
        currentSelectionDate &&
        currentSelectionDate.dayNumber === day.dayNumber &&
        currentSelectionDate.monthNumber === day.monthNumber
      );
    }

    function isWorkingSlot(slot) {
      return slot >= day.startHour && slot < day.endHour;
    }

    function getAppointment(slot) {
      return (
        day.appointments &&
        day.appointments.find((appointment) => {
          return appointment.startHour === slot;
        })
      );
    }

    return (
      <div className={style.column} ref={ref}>
        <HeaderCell
          day={day}
          index={index}
          isToday={isToday(day)}
          isDateSelected={isDateSelected(day)}
          isWorkingDay={day.workingStatus === "WORKING"}
        />
        {day.slots.map((slot, index) => {
          return (
            <Cell
              isToday={isToday(day)}
              slot={slot}
              key={index}
              appointment={getAppointment(slot)}
              isSelected={
                globalSelectedSlot.slot === slot &&
                globalSelectedSlot.day === day
              }
              isDateSelected={isDateSelected(day)}
              isWorkingDay={day.workingStatus === "WORKING"}
              sendSelectedSlot={() => handleSelectedSlot(slot)}
              isWorkingSlot={isWorkingSlot(slot)}
            />
          );
        })}
      </div>
    );
  },
);

export default Column;
