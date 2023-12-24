import style from "../MakeAppointment/MakeAppointment.module.css";
import TimeCollumn from "../MakeAppointment/TimeCollumn";
import Column from "../MakeAppointment/Column";
import React, { useState } from "react";
import ContextMenu from "../ContextMenu/ContextMenu";

function DetailedCalendar({
  currentWeek,
  sendGlobalSelectedSlot,
  today,
  currentSelectionDate,
  globalSelectedSlot,
}) {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  /**
   * contextMenu actions
   *
   */
  const menuItems = [
    {
      label: "Programeaza-te",
      icon: "schedule",
      onClick: () => alert("First action clicked"),
    },
    {
      label: "Selectie multipla",
      icon: "playlist_add",
      onClick: () => {
        console.log("Second action clicked");
      },
    },
  ];
  return (
    <div
      className={style.calendarWrapper}
      onContextMenu={handleRightClick}
      onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
    >
      <TimeCollumn day={currentWeek.days[0]} />

      {currentWeek.days.map((day, index) => {
        return (
          <Column
            key={index}
            day={day}
            index={index}
            today={today}
            globalSelectedSlot={globalSelectedSlot}
            currentSelectionDate={currentSelectionDate}
            sendSelectedSlot={(slot) => {
              sendGlobalSelectedSlot(slot);
            }}
          />
        );
      })}

      {globalSelectedSlot && contextMenu.visible && (
        <ContextMenu
          items={menuItems}
          top={contextMenu.y}
          left={contextMenu.x}
        />
      )}
    </div>
  );
}

export default DetailedCalendar;
