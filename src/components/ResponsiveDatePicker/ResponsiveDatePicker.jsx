import style from "./ResponsiveDatePicker.module.css";
import React, { useEffect, useState } from "react";
import DayCell from "./DayCell";
import useDatePicker from "../../hooks/useDatePicker";
import ContextMenu from "../ContextMenu/ContextMenu";

function ResponsiveDatePicker({
  sendSelectedDate,
  sendCurrentMonth,
  sendMultipleSelectionDates,
  monthData,
}) {
  //  Props

  /**
   * This function is used to send the selected date to the parent component
   * @param date
   */
  const sendSelectedDateToParent = (date) => {
    sendSelectedDate(date);
  };

  /**
   *  This function is used to send the selected dates to the parent component
   * @param dates
   */
  const sendMultipleSelectionDatesToParent = (dates) => {
    sendMultipleSelectionDates(dates);
  };

  //  State

  /**
   * This state is used to store the selected day
   */
  const [selectedDay, setSelectedDay] = useState(null);

  /**
   * This state allows or disallows multiple selection of dates
   * Used when hovering over days
   */
  const [allowMultipleSelection, setAllowMultipleSelection] = useState(false);

  /**
   * This state is used to store the selected days when multiple selection is allowed
   */
  const [multipleSelectionDates, setMultipleSelectionDates] = useState([]);

  /**
   * This array is used to display the name of the days in the header of the calendar
   * @type {string[]}
   */
  const weekdays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

  /**
   * contextMenu state
   */
  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  /**
   * This state is used to display the name of the month and the year in the header of the calendar
   * as well for retrieving dates for the current month and navigate across months
   */
  const { prevMonth, nextMonth, monthName, fullYear, finalDays, today } =
    useDatePicker();

  /**
   * This state is used to display the days in the calendar
   * It is an array of arrays of objects
   * Each array of objects represents a row of days
   * Each object represents a day
   * Each object has the following properties:
   * - dayNumber: the number of the day
   * - monthNumber: the number of the month
   * - year: the year
   *
   */
  const [displayDays, setDisplayDays] = useState([]);

  // Functions

  /**
   * This function is used to set the status of the days in the calendar
   * It works by comparing the days from the monthData array with the days from the finalDays array
   *
   * @param monthData  it is an array of objects that contains the days that have a status obtened after fetching the data from the server
   * @param finalDays it is an array of objects that contains the days of the current month and the status of each day is null , obtained after the useDatePicker hook
   */
  function transferData(monthData, finalDays) {
    finalDays.forEach((row) => {
      return row.forEach((day) => {
        if (
          monthData.some(
            (receivedDay) => receivedDay.dayNumber === day.dayNumber,
          )
        ) {
          const receivedDay = monthData.find(
              (receivedDay) => receivedDay.dayNumber === day.dayNumber,
          )
          day.workingStatus = receivedDay?.workingStatus;
          day.workingHours = receivedDay?.workingHours;
          day.startHour = receivedDay?.startHour;
          day.endHour = receivedDay?.endHour;
        }
      });
    });

    setDisplayDays(finalDays);
  }

  //  useEffects

  /**
   *  This useEffect is used to set the status of the days in the calendar
   *   It works by comparing the days from the monthData array with the days from the finalDays array
   */
  useEffect(() => {
    if (monthData && finalDays) {
      transferData(monthData, finalDays);
    }
  }, [monthData, finalDays]);

  /**
   * This useEffect is used to send the current month to the parent component
   * because it is needed in order to fetch the data for this month
   *
   * @param {number} monthNumber
   */
  useEffect(() => {
    sendCurrentMonth(today.getMonth());
  }, [today]);


  /**
   *  This useEffect is used to send the selected day to the parent component at every selectedDay change
   *
   */
  useEffect(() => {
    sendSelectedDateToParent(selectedDay);
  }, [selectedDay]);


  /**
   *  This useEffect is used to send the selected days to the parent component at every multipleSelectionDates change
   *
   */
  useEffect(() => {
    sendMultipleSelectionDatesToParent(multipleSelectionDates);
  }, [multipleSelectionDates]);


  //  Style functions

  /**
   *  This function is used to set the style of the days in the calendar
   *
   * @param day
   * @return {string}
   */
  function getStyle(day) {
    if (day.monthNumber !== today.getMonth()) {
      return "pastDay";
    } else if (day.dayNumber === today.getDate()) {
      return "today";
    } else {
      return "day";
    }
  }

  /**
   *  This function is used to set the background color of the days in the calendar based of their working status
   *
   * @param workingStatus
   * @return {string}
   */
  function getBackground(workingStatus) {
    if (workingStatus) {
      switch (workingStatus) {
        case "WORKING":
          return "lime";
        case "CLOSED":
          return "red";
        default:
          return "white";
      }
    } else {
      return "white";
    }
  }

  /**
   *  This function is used to check if a day is selected or not
   *
   * @param day
   * @return {boolean}
   */
  function checkSelection(day) {
    if (multipleSelectionDates.some((date) => date === day)) {
      return true;
    } else return selectedDay === day;
  }

  // Handlers

  /**
   * This function is used to select a day
   * If the day is already selected it will be deselected
   * it also sends the selected day to the parent component
   * and sets the allowMultipleSelection state to false
   *
   * @param day
   */
  function onClickHandler(day) {
    if (allowMultipleSelection) {
      setAllowMultipleSelection(false);
    } else {
      setSelectedDay((prevState) => (prevState === day ? null : day));
      setMultipleSelectionDates([]);
    }
  }

  /**
   *  IF multipleSelection is allowed this function is used to set the selected days by hovering over them
   *
   * @param day
   */
  function onMouseEnterHandler(day) {
    if (allowMultipleSelection) {
      if (!multipleSelectionDates.includes(day)) {
        setMultipleSelectionDates((prevState) => [...prevState, day])
      } else {
        setMultipleSelectionDates((prevState) => prevState.slice(0, prevState.indexOf(day) + 1))
      }
    }
  }

  /**
   *  This function is used to open the contextMenu
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
        setAllowMultipleSelection(true);
        setMultipleSelectionDates([selectedDay]);
        setSelectedDay(null)
      },
    },
  ];

  return (
    <div
      className={style.datePicker}
      onContextMenu={handleRightClick}
      onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
    >
      <div className={style.header}>
        <div className={style.previous} onClick={prevMonth}>
          <span className="material-symbols-outlined"> navigate_before </span>
        </div>
        <div className={style.monthYear}>
          <span>{monthName}</span>
          <span>{fullYear}</span>
        </div>
        <div className={style.next} onClick={nextMonth}>
          <span className="material-symbols-outlined">navigate_next</span>
        </div>
      </div>

      <div className={style.weekNameBar}>
        {weekdays.map((value, index) => {
          return (
            <div className={style.weekDayName} key={index}>
              {value}
            </div>
          );
        })}
      </div>

      <div className={style.daysGrid}>
        {displayDays &&
          displayDays.map((row, r) => {
            return row.map((day, c) => {
              return (
                <DayCell
                  value={day.dayNumber}
                  key={`${r}-${c}`}
                  isSelected={checkSelection(day)}
                  style={getStyle(day)}
                  backgroundColor={getBackground(day.workingStatus)}
                  onClick={() => onClickHandler(day)}
                  onMouseEnter={() => onMouseEnterHandler(day)}
                />
              );
            });
          })}
      </div>

      {selectedDay && contextMenu && contextMenu.visible && (
        <ContextMenu
          items={menuItems}
          top={contextMenu.y}
          left={contextMenu.x}
        />
      )}
    </div>
  );
}

export default ResponsiveDatePicker;
