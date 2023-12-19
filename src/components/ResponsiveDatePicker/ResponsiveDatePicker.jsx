import style from "./ResponsiveDatePicker.module.css";
import React, { useEffect, useState } from "react";
import DayCell from "./DayCell";

function ResponsiveDatePicker(props) {
  const [today, setToday] = useState(new Date());
  const weekdays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
  const monthSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const lang = "default";
  const [finalDays, setFinalDays] = useState([]);
  const [monthNumber, setMonthNumber] = useState(today.getMonth());
  const [fullYear, setFullYear] = useState(today.getFullYear());
  const [monthName,setMonthname] = useState(today.toLocaleString(lang, { month: "long" }));


  function getDay(year, monthIndex, day) {
    return new Date(year, monthIndex, day);
  }

  function isLeapYear(year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  }
  function mapToTwoDimensional(array, n) {
    let result = [];
    for (let i = 0; i < array.length; i += n) {
      result.push(array.slice(i, i + n));
    }
    return result;
  }
  function getMonthNumberOfDays(monthNumber, year) {
    if (isLeapYear(year) && monthNumber === 1) {
      return 29;
    }
    return monthSize[monthNumber];
  }

  function fillCurrentMonthSchema() {
    const monthNumberOfDays = getMonthNumberOfDays(
      today.getMonth(),
      today.getFullYear(),
    );
    const firstDayOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const weekIndexOfFIrstDayOfTheMonth = firstDayOfTheMonth.getDay();
    const lastDayOfTheMonth = getDay(
      today.getFullYear(),
      today.getMonth(),
      monthNumberOfDays,
    );
    const dayList = [];


    for (let i = 1; i <= monthNumberOfDays; i++) {
      dayList.push({ day: i, monthNumber: today.getMonth() });
    }

    if (weekIndexOfFIrstDayOfTheMonth !== 0) {
      const neededDays = weekIndexOfFIrstDayOfTheMonth - 1;
      const lastDayOfThePreviousMonth = getMonthNumberOfDays(
        today.getMonth() - 1,
        today.getFullYear(),
      );
      for (
        let i = lastDayOfThePreviousMonth;
        i > lastDayOfThePreviousMonth - neededDays;
        i--
      ) {
        dayList.unshift({ day: i, monthNumber: today.getMonth() - 1 });
      }
    }

    if (lastDayOfTheMonth.getDay() !== 0) {
      const neededDays = 7 - lastDayOfTheMonth.getDay();
      for (let i = 1; i <= neededDays; i++) {
        dayList.push({ day: i, monthNumber: today.getMonth() + 1 });
      }
    }

    if (dayList.length % 7 !== 0) {
      dayList.pop()
    }

    return mapToTwoDimensional(dayList, 7);
  }

  useEffect(() => {
    setMonthNumber(today.getMonth());
    setFullYear(today.getFullYear());
    setMonthname(today.toLocaleString(lang, { month: "long" }));
    setFinalDays(fillCurrentMonthSchema());
  }, [today]);


  function nextMonth() {
      if (monthNumber === 11) {
        const newDate = new Date(today.getFullYear() + 1, 0, today.getDate());
        setToday(newDate)
      } else {
        const newDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
        setToday(newDate)
      }
    }

    function prevMonth() {
      if (monthNumber === 0) {
        const newDate = new Date(today.getFullYear() - 1, 11, 1);
        setToday(newDate);
      } else {
        const newDate = new Date(today.getFullYear(), today.getMonth() - 1, 1);
        setToday(newDate);
      }
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
                value={day.day}
                key={`${r}-${c}`}
                style={day.monthNumber !== today.getMonth() ? "pastDay" : ""}
              />
            );
          });
        })}

      </div>
    </div>
  );
}

export default ResponsiveDatePicker;
