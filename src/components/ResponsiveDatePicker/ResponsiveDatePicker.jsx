import style from "./ResponsiveDatePicker.module.css";
import React, { useEffect, useState } from "react";
import DayCell from "./DayCell";
import useDatePicker from "../../hooks/useDatePicker";
import ContextMenu from "../ContextMenu/ContextMenu";
import {useDispatch, useSelector} from "react-redux";
import {getDatesForMonth} from "../../services/day_api";
import {setMonthDays} from "../../features/monthDaysSlice";
import useScreenSize from "../../hooks/useScreenSize";

function ResponsiveDatePicker({
  sendSelectedDate,
  sendMultipleSelectionDates,
  contextMenuProps = true,
    receivedSelectionDate
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


  const today = useSelector((state) => state.today.today);
  const dispatch = useDispatch();

  /**
   * This redux state is used to display the days in the calendar
   * It is an array of arrays of objects
   * Each array of objects represents a row of days
   * Each object represents a day
   * Each object has the following properties:
   * - dayNumber: the number of the day
   * - monthNumber: the number of the month
   * - year: the year
   *
   */
  const monthDays = useSelector((state) => state.monthDays.monthDays);

  const [fetchedData, setFetchedData] = useState(null);

  /**
   * This state is used to store the selected day
   */
  const [selectedDay, setSelectedDay] = useState(null);


  // useEffect(() => {
  //   if (receivedSelectionDate){
  //     setSelectedDay(receivedSelectionDate)
  //   }
  // }, [receivedSelectionDate]);

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
  const { prevMonth, nextMonth, monthName, fullYear, finalDays } =
    useDatePicker();


  // Functions

  /**
   * This function is used to set the status of the days in the calendar
   * It works by comparing the days from the monthData array with the days from the finalDays array
   *
   * @param fetchedData  it is an array of objects that contains the days that have a status obtened after fetching the data from the server
   * @param finalDays it is an array of objects that contains the days of the current month and the status of each day is null , obtained after the useDatePicker hook
   */
  function transferData(fetchedData, finalDays) {
    finalDays.forEach((row) => {
      return row.forEach((day) => {
        if (
            fetchedData.some(
            (receivedDay) => receivedDay.dayNumber === day.dayNumber && receivedDay.monthNumber === day.monthNumber
          )
        ) {
          const receivedDay = fetchedData.find(
            (receivedDay) => receivedDay.dayNumber === day.dayNumber && receivedDay.monthNumber === day.monthNumber,
          );
          day.workingStatus = receivedDay?.workingStatus;
          day.workingHours = receivedDay?.workingHours;
          day.startHour = receivedDay?.startHour;
          day.endHour = receivedDay?.endHour;
          day.appointments = receivedDay?.appointments;
        }
      });
    });

    dispatch(setMonthDays(finalDays));
  }

  //  useEffects


  useEffect(() => {
    if (today) {
      const fetchData = async () => {
        return await getDatesForMonth(today.monthNumber);
      };

      fetchData().then((r) => setFetchedData(r));
    }
  }, [today]);

  /**
   *  This useEffect is used to set the status of the days in the calendar
   *   It works by comparing the days from the monthData array with the days from the finalDays array
   */
  useEffect(() => {
    if (fetchedData && finalDays) {
      transferData(fetchedData, finalDays);
    }
  }, [fetchedData, finalDays]);

  /**
   * This useEffect is used to send the current month to the parent component
   * because it is needed in order to fetch the data for this month
   *
   * @param {number} monthNumber
   */



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
    if (day.monthNumber !== today.monthNumber) {
      return "pastDay";
    } else if (day.dayNumber === today.dayNumber) {
      return "today";
    } else if (day.workingStatus === "CLOSED") {
      return "closed";
    } else if (day.workingStatus === "VACATION") {
      return "vacation";
    } else if (day.workingStatus === "WORKING") {
      return "working";
    } else {
      return "day";
    }
  }

  /**
   *  This function is used to check if a day is selected or not
   *
   * @param day
   * @return {boolean}
   */
  function checkSelection(day) {
    if (receivedSelectionDate){
      return receivedSelectionDate.dayNumber === day.dayNumber
    }
    else if (multipleSelectionDates.some((date) => date === day)) {
      return true;
    } else if(receivedSelectionDate ?? true){
      return selectedDay === day
    }
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

  const {width} = useScreenSize();

  /**
   *  IF multipleSelection is allowed this function is used to set the selected days by hovering over them
   *
   * @param day
   */
  function onMouseEnterHandler(day) {
    if (allowMultipleSelection && width > 768) {
      if (!multipleSelectionDates.includes(day)) {
        setMultipleSelectionDates((prevState) => [...prevState, day]);
      } else {
        setMultipleSelectionDates((prevState) =>
          prevState.slice(0, prevState.indexOf(day) + 1),
        );
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
        setSelectedDay(null);
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
          <p>{monthName}</p>
          <p>{fullYear}</p>
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
        {monthDays.length > 0 &&
          monthDays.map((row, r) => {
            return row.map((day, c) => {
              return (
                <DayCell
                  value={day.dayNumber}
                  key={`${r}-${c}`}
                  isSelected={ checkSelection(day)}
                  style={getStyle(day)}
                  onClick={() => onClickHandler(day)}
                  onMouseEnter={() => onMouseEnterHandler(day)}
                />
              );
            });
          })}
      </div>

      {selectedDay && contextMenuProps && contextMenu.visible && (
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
