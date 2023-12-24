import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { resetToday, todaySlice } from "../features/todaySlice";

const useDatePicker = () => {
  const [today, setToday] = useState(new Date());
  const monthSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const lang = "default";
  const [finalDays, setFinalDays] = useState([]);
  const [monthNumber, setMonthNumber] = useState(today.getMonth());
  const [fullYear, setFullYear] = useState(today.getFullYear());
  const [monthName, setMonthname] = useState(
    today.toLocaleString(lang, { month: "long" }),
  );

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
    const firstDayOfTheMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );
    const weekIndexOfFIrstDayOfTheMonth = firstDayOfTheMonth.getDay();
    const lastDayOfTheMonth = getDay(
      today.getFullYear(),
      today.getMonth(),
      monthNumberOfDays,
    );
    const dayList = [];

    for (let i = 1; i <= monthNumberOfDays; i++) {
      dayList.push({
        dayNumber: i,
        monthNumber: today.getMonth(),
        fullYear: today.getFullYear(),
      });
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
        dayList.unshift({
          dayNumber: i,
          monthNumber: today.getMonth() - 1,
          fullYear: today.getFullYear(),
        });
      }
    }

    if (lastDayOfTheMonth.getDay() !== 0) {
      const neededDays = 7 - lastDayOfTheMonth.getDay();
      for (let i = 1; i <= neededDays; i++) {
        dayList.push({
          dayNumber: i,
          monthNumber: today.getMonth() + 1,
          fullYear: today.getFullYear(),
        });
      }
    }

    if (dayList.length % 7 !== 0) {
      dayList.pop();
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
      setToday(newDate);
    } else {
      const newDate = new Date(today.getFullYear(), today.getMonth() + 1, 1);
      setToday(newDate);
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

  function decimalHoursToTime(decimalHours) {
    const hours = Math.floor(decimalHours);
    const minutes = Math.round((decimalHours - hours) * 60);
    return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
  }

  function getMonthName(monthIndex, lang, size) {
    const date = new Date(2000, monthIndex, 1);
    return date.toLocaleString(lang, { month: size });
  }

  function getWeekdayName(weekdayIndex, lang, size) {
    const date = new Date(2000, 0, 3 + weekdayIndex);
    return date.toLocaleString(lang, { weekday: size });
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (today instanceof Date) {
      const day = {
        monthNumber: today.getMonth(),
        year: today.getFullYear(),
        dayNumber: today.getDate(),
      };

      console.log(day);

      dispatch(todaySlice.actions.setToday(day));
    }
  }, [today]);

  return {
    nextMonth,
    prevMonth,
    finalDays,
    monthName,
    monthNumber,
    fullYear,
    today,
    decimalHoursToTime,
    getMonthName,
    getWeekdayName,
  };
};

export default useDatePicker;
