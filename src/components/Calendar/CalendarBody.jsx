import React, { useEffect, useRef, useState } from "react";
import style from "./Calendar.module.css";
import TimeColumn from "./TimeColumn";
import WeekDayColumn from "./WeekDayColumn";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedDayValue } from "../../features/old/sharedSelectedDay";
import { useFillTime } from "../../hooks/useFillTime";
import { makeAppointment } from "../../services/appointment_api";
import { getDayData } from "../../services/day_api";
import { setDayData } from "../../features/old/sharedWeekSlice";
import ContextMenu from "../ContextMenu/ContextMenu";

function CalendarBody(props) {
  const [selectedCard, setSelectedCard] = useState({
    index: undefined,
    weekday: undefined,
  });

  const dispatch = useDispatch();

    /**
     * Sets the state of current selected day
     *
     * @param data
     */
  const handleSelectCard = (data) => {
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
      dispatch(
        setSelectedDayValue({
          day: currentWeek[data.weekDay],
          weekday: data.weekDay,
          time: timeList[data.index],
        }),
      );
    }
  };


  const weekData = useSelector((state) => state.sharedWeek);
  const { timeList } = useFillTime();

    /**
     * function to populate each column by the week state
     *
     * @return {Element}
     */
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



    /**
     * list of actions for context menu
     *
     * @type {[{onClick: (function(): Promise<void>), label: string},{onClick: (function(): void), label: string}]}
     */
  const menuItems = [
    { label: "Programeaza-te", onClick: () => setAppointment() },
    { label: "Second action", onClick: () => alert("Second action clicked") },
  ];


    /**
     * closing contextMenu
     */
  useEffect(() => {
    const handleOutsideClick = (e) => {
      setContextMenu(null);
    };

    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);

    /**
     * contextMenu state
     */
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

    /**
     * enables the context menu
     *
     * @param event
     */
  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const selectedDay = useSelector((state) => state.sharedSelectedDay.value);
  const currentWeek = useSelector((state) => state.sharedDisplayedWeek.value);

    /**
     * function to make an appointment
     *
     * @return {Promise<void>}
     */
  const setAppointment = async () => {
    await makeAppointment(
      selectedDay.time,
      timeList[selectedCard.index + 1],
      "peanaflorincosmin@gmail.com",
      3,
      selectedDay.day.dayNumber,
      selectedDay.day.monthNumber,
      selectedDay.day.year,
      "OCCUPIED",
    );
    await sleep(1000)
    await getDayData(selectedDay.day).then((r) => {
        dispatch(
          setDayData({ dayName: getDayName(selectedDay.weekday), data: r }),
        );
    });
  };

    /**
     * sleep function used to wait until the entries have been written into db
     *
     * @param ms
     * @return {Promise<unknown>}
     */
    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }


    /**
     * function to get the dayName used to change elements from week state
     *
     * @param index
     * @return {string}
     */
    function getDayName(index) {
    switch (index) {
      case 0:
        return "monday";
      case 1:
        return "tuesday";
      case 2:
        return "wenesday";
      case 3:
        return "thursday";
      case 4:
        return "friday";
      case 5:
        return "saturday";
      case 6:
        return "sunday";
    }
  }

  return (
    <div onContextMenu={handleRightClick}>
      {populateColumns()}
      {selectedCard.index && contextMenu && contextMenu.visible && (
        <ContextMenu
          items={menuItems}
          top={contextMenu.y}
          left={contextMenu.x}
        />
      )}
    </div>
  );
}

export default CalendarBody;
