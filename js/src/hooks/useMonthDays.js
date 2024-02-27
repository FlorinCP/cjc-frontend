import React, { useEffect, useMemo, useState } from "react";
import { getClosedDays, getDayData } from "../services/day_api";
import { useDispatch } from "react-redux";
import { setDisplayedWeekValue } from "../features/old/sharedDisplayedWeekSlice";
import { setWeekData } from "../features/old/sharedWeekSlice";

export function useMonthDays() {


  /**
   * the object used to store all the days
   */
  const [navigationArray, setNavigationArray] = useState([]);

  /**
   * current day, used for setting the displayed week in component and computing the navigationArray
   */
  const [today, setToday] = useState(new Date());
  const [todayObject,setTodayObject] = useState({
    monthNumber: today.getMonth() + 1,
    dayNumber: today.getDate(),
    year: today.getFullYear(),
  })

  /**
   * Static arrays
   *
   * @type {string[]}
   */
  const weekdays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
  const monthSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  /**
   * current index of navigationArray
   */
  const [currentWeekIndex, setCurrentWeekIndex] = useState(null);

  /**
   * changes the week index from navigationArray
   *
   * @param value
   */
  const changeIndex = (value) => {
    setCurrentWeekIndex(value);
  };

  /**
   * creates a date object from specific params , is redundant , to be removed later
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






  /**
   * starting from the current day it computes 3 small arrays
   * one for the past month
   * one for the current month
   * one for the next month
   *
   * this approach was chosen in order to ensure better user experience by implementing sliding window protocol
   *
   * @param today
   */
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

    for (let i = 0; i < navigationArray.length; i += 7) {
      const intermediateArray = updatedArray.splice(0, 7);
      if (
        intermediateArray.find(
          (day) =>
            day.monthNumber === todayObject.monthNumber &&
            day.dayNumber === todayObject.dayNumber &&
            day.year === todayObject.year,
        )
      ) {
        setCurrentWeekIndex(weeksArray.length);
      }
      weeksArray.push(intermediateArray);
    }

    setNavigationArray(weeksArray);
  }


  /**
   * When today is changed we call the function that gives us the object array with the desired days
   */
  useEffect(() => {
    if (today) {
      computeNavigationArray(today);
    }
  }, [today]);

  /**
   * State object representing each day's data
   */
  const [week, setWeek] = useState({
    monday: [],
    tuesday: [],
    wenesday: [],
    thursday: [],
    friday: [],
    saturnday: [],
    sunday: [],
  });

  /**
   * when changing the week index, we assign data for each day
   */
  useEffect(() => {
    if (navigationArray && currentWeekIndex) {
      navigationArray[currentWeekIndex].map((value, index) => {
        getDayData(value).then((r) => {
          setWeekDay(index, r);
        });
      });
    }
  }, [navigationArray, currentWeekIndex]);

  /**
   * this function assigns the received r param to the right weekDay
   *
   * @param index
   * @param data
   */
  function setWeekDay(index, data) {
    switch (index) {
      case 0:
        setWeek((prevWeek) => ({
          ...prevWeek,
          monday: data,
        }));
        break;
      case 1:
        setWeek((prevWeek) => ({
          ...prevWeek,
          tuesday: data,
        }));
        break;
      case 2:
        setWeek((prevWeek) => ({
          ...prevWeek,
          wenesday: data,
        }));
        break;
      case 3:
        setWeek((prevWeek) => ({
          ...prevWeek,
          thursday: data,
        }));
        break;
      case 4:
        setWeek((prevWeek) => ({
          ...prevWeek,
          friday: data,
        }));
        break;
      case 5:
        setWeek((prevWeek) => ({
          ...prevWeek,
          saturnday: data,
        }));
        break;
      case 6:
        setWeek((prevWeek) => ({
          ...prevWeek,
          sunday: data,
        }));
        break;
    }
  }

  const dispatch = useDispatch();

  /**
   * Updates current week Days
   */
  useEffect(() => {
    if (navigationArray && currentWeekIndex) {
      dispatch(setDisplayedWeekValue(navigationArray[currentWeekIndex]));
    }
  }, [navigationArray, currentWeekIndex]);

  /**
   * Updates current Week Days Data (the schedule for each day)
   */
  useEffect(() => {
    if (week) {
      dispatch(setWeekData(week));
    }
  }, [week]);

  return {
    weekdays,
    navigationArray,
    week,
    currentWeekIndex,
    changeIndex,
  };
}
