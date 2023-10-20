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

  function getDay(year, monthIndex, day) {
    return new Date(year, monthIndex, day);
  }

  function isLeapYear(year) {
    return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0;
  }

  function getMonthNumberOfDays(monthNumber, year) {
    if (isLeapYear(year) && monthNumber === 1) {
      return 29;
    }
    return monthSize[monthNumber];
  }

  function fillMonth() {
    setDayList([]);
    for (let i = 0; i < monthNumberOfDays; i++) {
      setDayList((oldArray) => [
        ...oldArray,
        getDay(fullYear, monthNumber, i + 1),
      ]);
    }
  }

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

  useEffect(() => {
    setMonthNumberOfDays(getMonthNumberOfDays(monthNumber, fullYear));
    setMonthName(firstDayOfTheMonth.toLocaleString(lang, { month: "long" }));
    setTotalLastMonthFinalDays(firstDayOfTheMonth.getDay());
    getClosedDays(monthNumber + 1).then((r) => setCloseDays(r));
  }, [monthNumber]);

  useEffect(() => {
    if (closedDays) {
      // props.sendClosedDays(closedDays);
    }
  }, [closedDays]);

  // cand schimbam luna , aducem zilele la curent
  useEffect(() => {
    fillPrev();
    fillMonth();
    fillNext();
  }, [monthName]);

  // not used yet , to be used to display past current and future days
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
    }
  }, [pastDaysList, dayList, firstDaysOfNextMonthList]);

  const [weekIndex, setWeekIndex] = useState(1);

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
        setWeek(prevWeek => ({
          ...prevWeek,
          monday: r
        }));
        break;
      case 1:
        setWeek(prevWeek => ({
          ...prevWeek,
          tuesday: r
        }));
        break;
      case 2:
        setWeek(prevWeek => ({
          ...prevWeek,
          wenesday: r
        }));
        break;
      case 3:
        setWeek(prevWeek => ({
          ...prevWeek,
          thursday: r
        }));
        break;
      case 4:
        setWeek(prevWeek => ({
          ...prevWeek,
          friday: r
        }));
        break;
      case 5:
        setWeek(prevWeek => ({
          ...prevWeek,
          saturnday: r
        }));
        break;
      case 6:
        setWeek(prevWeek => ({
          ...prevWeek,
          sunday: r
        }));
        break;
    }
  }

  const dispatch = useDispatch();

  useEffect(() => {
    if (displayedWeek) {
      const serializableArray = [];
      displayedWeek.map((day) => {
        let monthNumber = day.getMonth() + 1;
        let dayNumber = day.getDate();
        let year = day.getFullYear();
        serializableArray.push({
          monthNumber: monthNumber,
          dayNumber: dayNumber,
          year: year,
        });
      });
      dispatch(setDisplayedWeekValue(serializableArray));
    }
  }, [displayedWeek]);

  useEffect(() => {
    if (
      week
    ) {
      dispatch(
        setWeekData(week),
      );
    }
  }, [week]);

  return {
    weekdays,
    weekIndex,
    displayedWeek,
    changeIndex,
    week
  };
}
