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

  useEffect(() => {
    if (weekIndex) {
      generalWeek(weekIndex);
    }
  }, [weekIndex]);

  // dupa ce avem lista cu zilele din luna curenta , extragem prima saptamana si calculam orele
  useEffect(() => {
    if (dayList) {
      generalWeek(weekIndex);
    }
  }, [dayList]);

  const changeIndex = (value) => {
    setWeekIndex(value); // for example, increment the current state
  };

  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wenesday, setWenesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturnday, setSaturnday] = useState([]);
  const [sunday, setSunday] = useState([]);

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

  function setWeekDay(index, r) {
    switch (index) {
      case 0:
        setMonday(r);
        break;
      case 1:
        setTuesday(r);
        break;
      case 2:
        setWenesday(r);
        break;
      case 3:
        setThursday(r);
        break;
      case 4:
        setFriday(r);
        break;
      case 5:
        setSaturnday(r);
        break;
      case 6:
        setSunday(r);
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
      monday &&
      tuesday &&
      wenesday &&
      thursday &&
      friday &&
      saturnday &&
      sunday
    ) {
      dispatch(
        setWeekData({
          monday,
          tuesday,
          wenesday,
          thursday,
          friday,
          saturnday,
          sunday,
        }),
      );
    }
  }, [monday, tuesday, wenesday, thursday, friday, saturnday, sunday]);

  return {
    weekdays,
    weekIndex,
    displayedWeek,
    changeIndex,
    monday,
    tuesday,
    wenesday,
    thursday,
    friday,
    saturnday,
    sunday,
  };
}
