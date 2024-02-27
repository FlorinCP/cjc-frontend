import style from "../MakeAppointment/MakeAppointment.module.css";
import TimeCollumn from "../MakeAppointment/TimeCollumn";
import Column from "../MakeAppointment/Column";
import React, { useEffect, useState } from "react";
import ContextMenu from "../ContextMenu/ContextMenu";
import { useSelector } from "react-redux";

function DetailedCalendar({
  sendGlobalSelectedSlot,
  currentSelectionDate,
  globalSelectedSlot,
}) {
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const currentWeek = useSelector((state) => state.currentWeek.currentWeek);

  const handleRightClick = (event) => {
    event.preventDefault();

    console.log(event.clientX, event.clientY);

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
            globalSelectedSlot={globalSelectedSlot}
            currentSelectionDate={currentSelectionDate}
            sendSelectedSlot={(slot) => {
              sendGlobalSelectedSlot(slot);
            }}
          />
        );
      })}

      {globalSelectedSlot.slot && contextMenu.visible && (
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
