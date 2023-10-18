import React, { useState } from "react";
import { useWeekDays } from "../../hooks/useCalendar";
import style from "./Calendar.module.css";
import TimeColumn from "./TimeColumn";
import WeekDayColumn from "./WeekDayColumn";

function CalendarBody(props) {
  const { monday, tuesday, wenesday, thursday, friday, saturnday, sunday } =
    useWeekDays();

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

  function populateColumns() {
    return (
      <div className={style.calendarBody}>
        <TimeColumn />
        <WeekDayColumn
          weekDay={monday}
          dayIndex={0}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={tuesday}
          dayIndex={1}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={wenesday}
          dayIndex={2}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={thursday}
          dayIndex={3}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={friday}
          dayIndex={4}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={saturnday}
          dayIndex={5}
          selectedCard={selectedCard}
          onDataReceived={handleSelectCard}
        />
        <WeekDayColumn
          weekDay={sunday}
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
