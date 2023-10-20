import React, { useEffect, useState } from "react";
import style from "./Calendar.module.css";
import TimeColumn from "./TimeColumn";
import WeekDayColumn from "./WeekDayColumn";
import { useSelector } from "react-redux";

function CalendarBody(props) {
  const [selectedCard, setSelectedCard] = useState({
    index: undefined,
    weekday: undefined,
  });
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
    } else {
      setSelectedCard(data);
    }
  };

  const weekData = useSelector((state) => state.sharedWeek);

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

  return <div>{populateColumns()}</div>;
}

export default CalendarBody;
