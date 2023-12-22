import style from "./MakeAppointment.module.css";
import React, { useState } from "react";
import HeaderCell from "./HeaderCell";
import Cell from "./Cell";

function Column({ day, index, today ,currentSelectionDate}) {
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [selectedDayWorkStatus, setSelectedDayWorkStatus] = useState(day.workingStatus);

  console.log(selectedDayWorkStatus)

  console.log(currentSelectionDate)

  const handleSelectedSlot = (slot) => {
    if (selectedSlot === slot) {
      setSelectedSlot(null);
    } else {
      setSelectedSlot(slot);
    }
  };

  function isToday(day) {
    return (
      day.dayNumber === today.getDate() && day.monthNumber === today.getMonth()
    );
  }

  function isDateSelected(day) {
    return currentSelectionDate && currentSelectionDate.dayNumber === day.dayNumber && currentSelectionDate.monthNumber === day.monthNumber
  }

  console.log(day)

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
      {day.slots.map((slot) => {
        return (
          <Cell
            isToday={isToday(day)}
            slot={slot}
            index={index}
            isSelected={selectedSlot === slot}
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
