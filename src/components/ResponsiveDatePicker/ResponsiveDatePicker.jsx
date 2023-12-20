import style from "./ResponsiveDatePicker.module.css";
import React, { useEffect, useState } from "react";
import DayCell from "./DayCell";
import useDatePicker from "../../hooks/useDatePicker";

function ResponsiveDatePicker({
  sendSelectedDate,
  sendCurrentMonth,
  monthData,
}) {
  const sendSelectedDateToParent = (date) => {
    sendSelectedDate(date);
  };

  const weekdays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];

  const { prevMonth, nextMonth, monthName, fullYear, finalDays, today } =
    useDatePicker();
  const [weekDays, setWeekDays] = useState([]);

  function setStatus(monthData,finalDays){
    finalDays.forEach((row) => {
      return row.forEach((day) => {
        if (monthData.some((receivedDay) => receivedDay.dayNumber === day.dayNumber)) {
          day.workingStatus = monthData.find((receivedDay) => receivedDay.dayNumber === day.dayNumber).workingStatus;
        }
      })
    })
  }

  if (monthData && finalDays) {
    console.log("am intrat in functie")
    setStatus(monthData,finalDays);
  }

  console.log(finalDays,monthData);

  useEffect(() => {
    sendCurrentMonth(today.getMonth());
  }, [today]);

  useEffect(() => {
    if (monthData) {
      let mappedWeekDays = monthData.map((day) => {
        return { day: day.dayNumber, status: day.workingStatus };
      });
      setWeekDays(mappedWeekDays);
      console.log(mappedWeekDays);
    }
  }, [monthData]);

  function getStyle(day) {
    if (day.monthNumber !== today.getMonth()) {
      return "pastDay";
    } else if (day.dayNumber === today.getDate()) {
      return "today";
    } else if (day.dayNumber === selectedDay?.dayNumber) {
      return "selectedDay";
    }
  }

  function getBackground(workingStatus) {
    if(workingStatus){
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

  const [selectedDay, setSelectedDay] = useState(null);
  function onClickHandler(day){
    sendSelectedDateToParent(day)
    setSelectedDay((prevState) => prevState === day ? null : day)
  }


  return (
    <div className={style.datePicker}>
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
        {finalDays.map((row, r) => {
          return row.map((day, c) => {
            return (
              <DayCell
                value={day.dayNumber}
                key={`${r}-${c}`}
                style={getStyle(day)}
                backgroundColor={getBackground(day.workingStatus)}
                onClick={() => onClickHandler(day)}
              />
            );
          });
        })}
      </div>
    </div>
  );
}

export default ResponsiveDatePicker;
