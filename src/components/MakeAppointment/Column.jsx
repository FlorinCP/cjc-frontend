import style from "./MakeAppointment.module.css";
import React, { useEffect, useState } from "react";
import HeaderCell from "./HeaderCell";
import Cell from "./Cell";

function Column({
  globalSelectedSlot,
  day,
  index,
  today,
  currentSelectionDate,
  sendSelectedSlot,
}) {
  const [selectedSlot, setSelectedSlot] = useState({ slot: null, day: day });
  const [selectedDayWorkStatus, setSelectedDayWorkStatus] = useState(
    day.workingStatus,
  );

  const handleSelectedSlot = (slot) => {
    if (selectedSlot.slot === slot) {
      setSelectedSlot({ slot: null, day: day });
    } else {
      setSelectedSlot({ slot: slot, day: day });
    }
  };

  useEffect(() => {
    sendSelectedSlot(selectedSlot);
  }, [selectedSlot]);

  function isToday(day) {
    return (
      day.dayNumber === today.getDate() && day.monthNumber === today.getMonth()
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
