import React, { useEffect, useMemo, useState } from "react";
import { getClosedDays, getDayData } from "../services/day_api";
import { useDispatch } from "react-redux";
import { setDisplayedWeekValue } from "../features/sharedDisplayedWeekSlice";
import { setWeekData } from "../features/sharedWeekSlice";

export function useCalendar() {
  const [today, setToday] = useState(new Date());
  const lang = "default";
  const weekdays = ["Mon", "Tue", "Wen", "Thu", "Fri", "Sat", "Sun"];
  const monthSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  const [fullYear, setFullYear] = useState(today.getFullYear());

  const [dayList, setDayList] = useState([]);
  const [pastDaysList, setPastDaysList] = useState([]);
  const [firstDaysOfNextMonthList, setFirstDaysOfNextMonthList] = useState([]);

  const [monthNumber, setMonthNumber] = useState(
    Number(today.toLocaleString(lang, { month: "2-digit" }) - 1),
  );
  const [monthNumberOfDays, setMonthNumberOfDays] = useState(
    getMonthNumberOfDays(monthNumber, fullYear),
  );
  const [monthName, setMonthName] = useState(
    today.toLocaleString(lang, { month: "long" }),
  );
  const [firstDayOfTheMonth, setFirstDayOfTheMonth] = useState(
    getDay(fullYear, monthNumber, 1),
  );
  const [totalLastMonthFinalDays, setTotalLastMonthFinalDays] = useState(
    firstDayOfTheMonth.getDay(),
  );
  const [closedDays, setCloseDays] = useState([]);
  const [selectedDate, setSelectedDate] = useState();
  const [displayedWeek, setDisplayedWeek] = useState([]);
  const [weekIndex, setWeekIndex] = useState(1);

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

  /**
   * fills the current month days
   */
  function fillMonth() {
    setDayList([]);
    for (let i = 0; i < monthNumberOfDays; i++) {
      setDayList((oldArray) => [
        ...oldArray,
        getDay(fullYear, monthNumber, i + 1),
      ]);
    }
  }

  /**
   * a more reusable function for getting the last days from the last month without depending on state
   *
   * @param monthNumber
   * @param fullYear
   * @return {*[]}
   */
  function getPrevDays(monthNumber, fullYear) {
    const firstDayOfTheMonth = getDay(fullYear, monthNumber, 1);
    const totalLastMonthFinalDays = firstDayOfTheMonth.getDay();
    let intermediateArray = [];

    for (let i = 0; i < totalLastMonthFinalDays; i++) {
      const inverted = totalLastMonthFinalDays - (i + 1);
      if (monthNumber === 0) {
        intermediateArray.push(
          getDay(
            fullYear - 1,
            11,
            getMonthNumberOfDays(11, fullYear - 1) - inverted,
          ),
        );
      } else {
        intermediateArray.push(
          getDay(
            fullYear,
            monthNumber - 1,
            getMonthNumberOfDays(monthNumber - 1, fullYear) - inverted,
          ),
        );
      }
    }
    return intermediateArray;
  }

  /**
   * fills the previous days in a week in order to occupy 35 days
   */
  function fillPrev() {
    setPastDaysList([]);
    for (let i = 0; i < totalLastMonthFinalDays; i++) {
      const inverted = totalLastMonthFinalDays - (i + 1);
      if (monthNumber === 0) {
        setPastDaysList((oldArray) => [
          ...oldArray,
          getDay(
            fullYear - 1,
            11,
            getMonthNumberOfDays(11, fullYear - 1) - inverted,
          ),
        ]);
      } else {
        setPastDaysList((oldArray) => [
          ...oldArray,
          getDay(
            fullYear,
            monthNumber - 1,
            getMonthNumberOfDays(monthNumber - 1, fullYear) - inverted,
          ),
        ]);
      }
    }
  }

  /**
   * a more reusable function for getting the first days from the next month without depending on state
   *
   * @param monthNumber
   * @param fullYear
   * @return {*[]}
   */
  function getNextDays(monthNumber, fullYear) {
    let intermediateArray = [];
    const monthNumberOfDays = getMonthNumberOfDays(monthNumber, fullYear);
    const firstDayOfTheMonth = getDay(fullYear, monthNumber, 1);
    const totalLastMonthFinalDays = firstDayOfTheMonth.getDay();
    const remaining = 7 - ((monthNumberOfDays + totalLastMonthFinalDays) % 7);
    if (remaining < 7) {
      for (let i = 0; i < remaining; i++) {
        intermediateArray.push(getDay(fullYear, monthNumber + 1, i + 1));
      }
    }
    return intermediateArray;
  }

  /**
   * fills the remaining days until 35 days
   */
  function fillNext() {
    setFirstDaysOfNextMonthList([]);
    const remaining = 7 - ((monthNumberOfDays + totalLastMonthFinalDays) % 7);
    if (remaining < 7) {
      for (let i = 0; i < remaining; i++) {
        setFirstDaysOfNextMonthList((oldArray) => [
          ...oldArray,
          getDay(fullYear, monthNumber + 1, i + 1),
        ]);
      }
    }
  }

  /**
   * when changing monthNumber we update the month details
   *
   * @TODO encapsulate all in a single object for better code
   */

  useEffect(() => {
    setMonthNumberOfDays(getMonthNumberOfDays(monthNumber, fullYear));
    setTotalLastMonthFinalDays(firstDayOfTheMonth.getDay());
    getClosedDays(monthNumber + 1).then((r) => setCloseDays(r));
  }, [monthNumber]);

  function updateMonthDays() {
    fillPrev();
    fillMonth();
    fillNext();
  }

  /**
   * when changing monthName we update the daylists
   */
  useEffect(() => {
    // console.log("month number", monthNumber);
    updateMonthDays();
  }, [monthNumber]);

  /**
   * not used yet , to be used to display past current and future days
   */
  const [fullDays, setFullDays] = useState([]);

  function getFullDays() {
    const allDays = pastDaysList
      .concat(dayList)
      .concat(firstDaysOfNextMonthList);
    setFullDays(allDays);
  }

  useEffect(() => {
    if (pastDaysList && dayList && firstDaysOfNextMonthList) {
      getFullDays();
      computeNavigationArray(monthNumber, fullYear);
    }
  }, [pastDaysList, dayList, firstDaysOfNextMonthList]);

  const [navigationArray, setNavigationArray] = useState([]);
  function computeNavigationArray(monthNumber, fullYear) {
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

    const updatedArray = navigationArray.map(day => {
      const monthNumber = day.getMonth() + 1;
      const dayNumber = day.getDate();
      const year = day.getFullYear();

      return {
        monthNumber,
        dayNumber,
        year
      };
    });

    const weeksArray = [];

    updatedArray.splice(0, index);
    const length = navigationArray.length;

    const todayObject = {
      monthNumber : today.getMonth() + 1,
      dayNumber : today.getDate(),
      year : today.getFullYear()
    }

    // console.log(todayObject)
    let currentWeekIndex = null
    do {
      const intermediateArray = updatedArray.splice(0, 7);
      if (intermediateArray.find(day =>
          day.monthNumber === todayObject.monthNumber &&
          day.dayNumber === todayObject.dayNumber &&
          day.year === todayObject.year
      )) {
        currentWeekIndex =  weeksArray.length
      }
      weeksArray.push(intermediateArray);
    } while (updatedArray.length >= 7);

    // console.log(weeksArray);
    // console.log(updatedArray);

    setNavigationArray(navigationArray);
  }

  // const [displayedWeekUpgraded, setDisplayedWeekUpgraded] = useState(null);
  // function generalWeekUpgraded(weekIndex) {
  //   const length = 7 * weekIndex;
  //   let generalWeek;
  //   console.log(fullDays);
  //   generalWeek = [
  //     ...fullDays.slice(weekIndex === 1 ? 0 : 7 * weekIndex - 7, length),
  //   ];
  //   generalWeek.map((day, index) => {
  //     if (day.getDay() === 0 && index === 0) {
  //       generalWeek.shift();
  //       generalWeek.push(...dayList.slice(length, length + 1));
  //     }
  //   });
  //   console.log(generalWeek.length);
  //   if (generalWeek.length < 7 && generalWeek.length > 0) {
  //     console.log("previous month number", monthNumber);
  //     setMonthNumber((prevState) => prevState + 1);
  //     setWeekIndex(1);
  //   }
  //   console.log(generalWeek);
  //   setDisplayedWeekUpgraded(generalWeek);
  // }
  //
  //
  //
  // useEffect(() => {
  //   if (fullDays) {
  //     generalWeekUpgraded(weekIndex);
  //   }
  // }, [fullDays, weekIndex]);
  //
  // useEffect(() => {
  //   if (weekIndex) {
  //     console.log(weekIndex);
  //   }
  // }, [weekIndex]);

  /**
   * This function returns a week based on a given index and rearanges it in order to place sunday on the last index
   * @param weekIndex the current week index in the month
   * @return displayedWeek object with the days
   */
  function generalWeek(weekIndex) {
    const length = 7 * weekIndex;
    let generalWeek;
    generalWeek = [
      ...dayList.slice(weekIndex === 1 ? 0 : 7 * weekIndex - 7, length),
    ];
    generalWeek.map((day, index) => {
      if (day.getDay() === 0 && index === 0) {
        generalWeek.shift();
        generalWeek.push(...dayList.slice(length, length + 1));
      }
    });
    setDisplayedWeek(generalWeek);
  }

  // dupa ce avem lista cu zilele din luna curenta , extragem prima saptamana si calculam orele
  useEffect(() => {
    if (dayList) {
      generalWeek(weekIndex);
    }
  }, [dayList]);

  // daca schimbam indexul actualizam luna curenta
  useEffect(() => {
    if (weekIndex) {
      generalWeek(weekIndex);
    }
  }, [weekIndex]);

  const changeIndex = (value) => {
    setWeekIndex(value);
  };

  /**
   * Each const represents a day of the week that will be updated accordingly to the fetch data
   *  format : id , dayNumber , year , workingStatus , workingHours , startHour , endHour , appointments
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
   * if displayedWeek was populated this function builds a new date object and based on the index it updates the weekState
   *  @param displayedWeek
   */
  useEffect(() => {
    if (displayedWeek) {
      displayedWeek.map((value, index) => {
        const currentDate = {
          monthNumber: value.getMonth() + 1,
          dayNumber: value.getDate(),
          year: value.getFullYear(),
        };
        getDayData(currentDate).then((r) => {
          setWeekDay(index, r);
        });
      });
    }
  }, [displayedWeek]);

  /**
   * this function assigns the received r param to the right weekDay
   *
   * @param index
   * @param r
   */
  function setWeekDay(index, r) {
    switch (index) {
      case 0:
        setWeek((prevWeek) => ({
          ...prevWeek,
          monday: r,
        }));
        break;
      case 1:
        setWeek((prevWeek) => ({
          ...prevWeek,
          tuesday: r,
        }));
        break;
      case 2:
        setWeek((prevWeek) => ({
          ...prevWeek,
          wenesday: r,
        }));
        break;
      case 3:
        setWeek((prevWeek) => ({
          ...prevWeek,
          thursday: r,
        }));
        break;
      case 4:
        setWeek((prevWeek) => ({
          ...prevWeek,
          friday: r,
        }));
        break;
      case 5:
        setWeek((prevWeek) => ({
          ...prevWeek,
          saturnday: r,
        }));
        break;
      case 6:
        setWeek((prevWeek) => ({
          ...prevWeek,
          sunday: r,
        }));
        break;
    }
  }

  /**
   * This section updates the state based on the actions
   *
   * @type {Dispatch<AnyAction>}
   */

  // const dispatch = useDispatch();
  //
  // useEffect(() => {
  //   if (displayedWeek) {
  //     const serializableArray = [];
  //     displayedWeek.map((day) => {
  //       let monthNumber = day.getMonth() + 1;
  //       let dayNumber = day.getDate();
  //       let year = day.getFullYear();
  //       serializableArray.push({
  //         monthNumber: monthNumber,
  //         dayNumber: dayNumber,
  //         year: year,
  //       });
  //     });
  //     dispatch(setDisplayedWeekValue(serializableArray));
  //   }
  // }, [displayedWeek]);
  //
  // useEffect(() => {
  //   if (week) {
  //     dispatch(setWeekData(week));
  //   }
  // }, [week]);

  return {
    weekdays,
    weekIndex,
    displayedWeek,
    changeIndex,
    week,
  };
}
