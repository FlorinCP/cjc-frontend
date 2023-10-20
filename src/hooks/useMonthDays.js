import React, { useEffect, useMemo, useState } from "react";
import { getClosedDays, getDayData } from "../services/day_api";
import { useDispatch } from "react-redux";
import { setDisplayedWeekValue } from "../features/sharedDisplayedWeekSlice";
import { setWeekData } from "../features/sharedWeekSlice";

export function useMonthDays() {
  const [today, setToday] = useState(new Date());
  const lang = "default";
  const weekdays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
  const monthSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  const [monthNumber, setMonthNumber] = useState(
    Number(today.toLocaleString(lang, { month: "2-digit" }) - 1),
  );

  /**
   * creates a date object from speciffic params , is redundant , to be removed later
   *
   * @param year
   * @param monthIndex
   * @param day
   * @return {Date}
   */
  function getDay(year, monthIndex, day) {
    return new Date(year, monthIndex, day);
  }

  /**
   * checks if the year has 366 days or not
   *
   * @param year
   * @return {boolean}
   */
  function isLeapYear(year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  }

  /**
   * returns the number of days in a month
   *
   * @param monthNumber
   * @param year
   * @return {number}
   */
  function getMonthNumberOfDays(monthNumber, year) {
    if (isLeapYear(year) && monthNumber === 1) {
      return 29;
    }
    return monthSize[monthNumber];
  }

  /**
   * a more reusable function for getting the days inside a month without depending on state
   *
   * @param monthNumber
   * @param fullYear
   * @return {*[]}
   */
  function getMonthDays(monthNumber, fullYear) {
    const monthNumberOfDays = getMonthNumberOfDays(monthNumber, fullYear);
    let intermediateArray = [];
    for (let i = 0; i < monthNumberOfDays; i++) {
      intermediateArray.push(getDay(fullYear, monthNumber, i + 1));
    }
    return intermediateArray;
  }

  const [navigationArray, setNavigationArray] = useState([]);
  function computeNavigationArray(today) {
    const monthNumber = today.getMonth();
    const fullYear = today.getFullYear();

    const prevMonth = getMonthDays(monthNumber - 1, fullYear);
    const currentMonth = getMonthDays(monthNumber, fullYear);
    const nextMonth = getMonthDays(monthNumber + 1, fullYear);

    const navigationArray = prevMonth.concat(currentMonth).concat(nextMonth);

    let index = 0;

    for (let i = 0; i < 10; i++) {
      if (navigationArray[i].getDay() === 0) {
        index = i + 1;
        break;
      }
    }

    const updatedArray = navigationArray.map((day) => {
      const monthNumber = day.getMonth() + 1;
      const dayNumber = day.getDate();
      const year = day.getFullYear();

      return {
        monthNumber,
        dayNumber,
        year,
      };
    });

    const weeksArray = [];

    updatedArray.splice(0, index);
    const length = navigationArray.length;

    const todayObject = {
      monthNumber: today.getMonth() + 1,
      dayNumber: today.getDate(),
      year: today.getFullYear(),
    };

    console.log(todayObject);

    let currentWeekIndex = null;

    for (let i = 0;i < navigationArray.length ; i += 7){
      const intermediateArray = updatedArray.splice(0, 7);
      if (
          intermediateArray.find(
              (day) =>
                  day.monthNumber === todayObject.monthNumber &&
                  day.dayNumber === todayObject.dayNumber &&
                  day.year === todayObject.year,
          )
      ) {
        currentWeekIndex = weeksArray.length;
      }
      weeksArray.push(intermediateArray);
    }

    console.log(weeksArray);

    setNavigationArray(weeksArray);
  }

    useEffect(() => {
        if (today){
            computeNavigationArray(today)
        }
    }, [today]);

  return {
    weekdays,
    navigationArray
  };
}
