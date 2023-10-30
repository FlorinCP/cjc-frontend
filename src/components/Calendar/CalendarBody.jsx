import React, { useEffect, useRef, useState } from "react";
import style from "./Calendar.module.css";
import TimeColumn from "./TimeColumn";
import WeekDayColumn from "./WeekDayColumn";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDayValue } from "../../features/sharedSelectedDay";
import {useFillTime} from "../../hooks/useFillTime";

function CalendarBody(props) {
  const [selectedCard, setSelectedCard] = useState({
    index: undefined,
    weekday: undefined,
  });

  const dispatch = useDispatch();

  const handleSelectCard = (data) => {
    console.log(data);
    console.log(selectedCard);
    if (
      selectedCard.index === data.index &&
      selectedCard.weekDay === data.weekDay
    ) {
      setSelectedCard({
        index: undefined,
        weekday: undefined,
      });

      dispatch(
        setSelectedDayValue({
          index: undefined,
          weekday: undefined,
        }),
      );
    } else {
      setSelectedCard(data);
      dispatch(setSelectedDayValue({
          day: currentWeek[data.weekDay],
          time: timeList[data.index]
      }));
    }
  };

  const weekData = useSelector((state) => state.sharedWeek);
    const { timeList} = useFillTime();

  function populateColumns() {
    return (
      <div className={style.calendarBody}>
        <TimeColumn />
        <WeekDayColumn
          weekDay={weekData.monday}
          dayIndex={0}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={weekData.tuesday}
          dayIndex={1}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={weekData.wenesday}
          dayIndex={2}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={weekData.thursday}
          dayIndex={3}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={weekData.friday}
          dayIndex={4}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={weekData.saturday}
          dayIndex={5}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={weekData.sunday}
          dayIndex={6}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
      </div>
    );
  }

  function ContextMenu({ items, top, left }) {
    return (
      <div
        style={{
          position: "absolute",
          top: `${top}px`,
          left: `${left}px`,
          border: "1px solid black",
          backgroundColor: "white",
        }}
      >
        {items.map((item, index) => (
          <div key={index} onClick={item.onClick}>
            {item.label}
          </div>
        ))}
      </div>
    );
  }

  const menuItems = [
    { label: "First action", onClick: () => alert("First action clicked") },
    { label: "Second action", onClick: () => alert("Second action clicked") },
  ];

  const menuRef = useRef(null);

  useEffect(() => {
    const handleOutsideClick = (e) => {
      console.log("test");
      setContextMenu(null);
      if (menuRef.current && menuRef.current.contains(e.target)) {
        console.log("e jale");
      }
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

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

  const selectedDay = useSelector((state) => state.sharedSelectedDay);
  const currentWeek = useSelector((state) => state.sharedDisplayedWeek.value);

  return (
    <div onContextMenu={handleRightClick}>
      {populateColumns()}
      {selectedCard.index && contextMenu && contextMenu.visible && (
        <ContextMenu
          ref={menuRef}
          items={menuItems}
          top={contextMenu.y}
          left={contextMenu.x}
        />
      )}
    </div>
  );
}

export default CalendarBody;
