import style from "./MakeAppointment.module.css";
import React, { useEffect, useState } from "react";
import HeaderCell from "./HeaderCell";
import Cell from "./Cell";
import {useSelector} from "react-redux";

function Column({
  globalSelectedSlot,
  day,
  index,
  currentSelectionDate,
  sendSelectedSlot,
}) {

  const today = useSelector((state) => state.today.today);
  const [selectedDayWorkStatus, setSelectedDayWorkStatus] = useState(
    day.workingStatus,
  );

  const handleSelectedSlot = (slot) => {
    sendSelectedSlot({ slot: slot, day: day });
  };

  function isToday(day) {
    return (
      day.dayNumber === today.dayNumber && day.monthNumber === today.monthNumber
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
    return slot > day.startHour && slot < day.endHour;
  }

  return (
    <div className={style.column}>
      <HeaderCell
        day={day}
        index={index}
        isToday={isToday(day)}
        isDateSelected={isDateSelected(day)}
        isWorkingDay={selectedDayWorkStatus === "WORKING"}
      />
      {day.slots.map((slot, index) => {
        return (
          <Cell
            isToday={isToday(day)}
            slot={slot}
            key={index}
            isSelected={globalSelectedSlot.slot === slot && globalSelectedSlot.day === day}
            isDateSelected={isDateSelected(day)}
            isWorkingDay={selectedDayWorkStatus === "WORKING"}
            sendSelectedSlot={() => handleSelectedSlot(slot)}
            isWorkingSlot={isWorkingSlot(slot)}
          />
        );
      })}
    </div>
  );
}

export default Column;
