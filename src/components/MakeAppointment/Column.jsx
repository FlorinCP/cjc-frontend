import style from "./MakeAppointment.module.css";
import React, { useState } from "react";
import HeaderCell from "./HeaderCell";
import Cell from "./Cell";

function Column({ day, index }) {
  const [selectedSlot, setSelectedSlot] = useState(null);

  return (
    <div className={style.column}>
      <HeaderCell day={day} index={index} />
      {day.slots.map((slot) => {
        return (
          <Cell
            slot={slot}
            index={index}
            isSelected={selectedSlot === slot}
            sendSelectedSlot={() => setSelectedSlot(slot)}
          />
        );
      })}
    </div>
  );
}

export default Column;
