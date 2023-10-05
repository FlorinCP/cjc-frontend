import React, { useEffect, useMemo, useState } from "react";
import { getClosedDays, getDayData } from "../../services/day_api";
import style from "./Calendar.module.css";

function Calendar(props) {
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

  useEffect(() => {
    fillPrev();
    fillMonth();
    fillNext();
  }, [monthName]);

  function nextMonth() {
    if (monthNumber > 10) {
      const nextMonth = 0;
      setMonthNumber(nextMonth);
      const nextYear = fullYear + 1;
      setFullYear(nextYear);
      setFirstDayOfTheMonth(getDay(nextYear, nextMonth, 1));
    } else {
      const nextMonth = monthNumber + 1;
      setMonthNumber(nextMonth);
      setFirstDayOfTheMonth(getDay(fullYear, nextMonth, 1));
    }
  }

  function prevMonth() {
    if (monthNumber < 1) {
      const prevMonth = 11;
      setMonthNumber(prevMonth);
      const prevYear = fullYear - 1;
      setFullYear(prevYear);
      setFirstDayOfTheMonth(getDay(prevYear, prevMonth, 1));
    } else {
      const prevMonth = monthNumber - 1;
      setMonthNumber(prevMonth);
      setFirstDayOfTheMonth(getDay(fullYear, prevMonth, 1));
    }
  }

  async function selectDate(value) {
    const selection = {
      dayNumber: value.getDate(),
      monthNumber: value.getMonth() + 1,
      year: value.getFullYear(),
    };
    setSelectedDate(selection);
  }

  useEffect(() => {
    if (selectedDate !== undefined) {
      props.sendSelectedDate(selectedDate);
    }
  }, [selectedDate]);

  function header() {
    return (
      <div className={style.header}>
        <div id={style["previous"]} onClick={prevMonth}>
          <span className="material-symbols-outlined"> navigate_before </span>
        </div>
        <div id={style["monthYear"]}>
          <span>{monthName}</span>
          <span>{fullYear}</span>
        </div>
        <div id={style["next"]} onClick={nextMonth}>
          <span className="material-symbols-outlined">navigate_next</span>
        </div>
      </div>
    );
  }

  function weekNameBar() {
    return (
      <div className={style.weekNameBar}>
        {weekdays.map((value, index) => {
          return (
            <div className={style.weekDayName} key={index}>
              {value}
            </div>
          );
        })}
      </div>
    );
  }

  function pastDays() {
    return (
      <>
        {pastDaysList.map((value, index) => {
          return (
            <div className={style.pastDay} key={index}>
              {value.getDate()}
            </div>
          );
        })}
      </>
    );
  }

  function currentDays() {
    return (
      <>
        {dayList.map((value, index) => (
          <div
            className={
              closedDays.includes(value.getDate()) ? style.closedDay : style.day
            }
            key={index}
            onClick={() => selectDate(value)}
          >
            {value.getDate()}
          </div>
        ))}
      </>
    );
  }
  function futureDays() {
    return (
      <>
        {firstDaysOfNextMonthList.map((value, index) => {
          return (
            <div className={style.pastDay} key={index}>
              {value.getDate()}
            </div>
          );
        })}
      </>
    );
  }

  function currentWeek() {
    return (
      <>
        {displayedWeek.map((value, index) => (
          <div
            className={
              closedDays.includes(value.getDate()) ? style.closedDay : style.day
            }
            key={index}
            onClick={() => selectDate(value)}
          >
            {value.getDate()}
          </div>
        ))}
      </>
    );
  }

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

  function firstWeek() {
    const length = 7;
    let firstWeek;
    firstWeek = [...dayList.slice(0, length)];
    firstWeek.map((day, index) => {
      if (day.getDay() === 0 && index === 0) {
        firstWeek.shift();
        firstWeek.push(...dayList.slice(length, length + 1));
      }
    });
    setDisplayedWeek(firstWeek);
  }

  // function daysGrid() {
  //   return (
  //     <div className={style.daysGrid}>
  //       {pastDays()}
  //
  //       {currentDays()}
  //
  //       {futureDays()}
  //     </div>
  //   );
  // }

  const [timeList, setTimeList] = useState([]);
    const [integerTimeList,setIntegerTimeList] = useState([])

  function fillTime() {
    let firstHour = 7;
    const newTimeList = [];
    const newIntegerTimeList =[]

    for (let i = 0; i < 16 * 2; i++) {
      const isEven = i % 2 === 0;
      const formattedHour = isEven ? `${firstHour}:00` : `${firstHour}:30`;
      const hour = isEven ? firstHour : firstHour + 0.5

      newTimeList.push(formattedHour);
      newIntegerTimeList.push(hour)

      if (!isEven) {
        firstHour++;
      }
    }

    setIntegerTimeList(newIntegerTimeList)
    setTimeList(newTimeList);
  }

  // dupa ce avem lista cu zilele din luna curenta , extragem prima saptamana si calculam orele
  useEffect(() => {
    if (dayList) {
      firstWeek();
      fillTime();
    }
  }, [dayList]);



  function fillSlots() {
    let firstHour = 7;
    const newSlotList = [];

    for (let index = 0; index < 16 * 2; index++) {
      newSlotList.push({});

      firstHour++;
    }

    return newSlotList;
  }

  // --------------------------------------------------------------------------------------

  const [monday, setMonday] = useState([]);
  const [tuesday, setTuesday] = useState([]);
  const [wenesday, setWenesday] = useState([]);
  const [thursday, setThursday] = useState([]);
  const [friday, setFriday] = useState([]);
  const [saturnday, setSaturnday] = useState([]);
  const [sunday, setSunday] = useState([]);

    // here we set de dayArray by the days in a week
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
          console.log(r,"monday")
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

    useEffect(() => {
        if (integerTimeList){
            console.log(integerTimeList)
        }
    }, [integerTimeList]);

  function getClassForSlot(data,index) {

      const startHour = data.startHour
      const endHour = data.endHour
      const status = data.workingStatus
      const workingHours = data.workingHours


      if (data && status === "CLOSED") {
          return style.closedDay;
      }

      // daca noi avem program de la 8 si incepe calendarul la 7
      if (startHour > integerTimeList[index] ){
          return  style.unsetSlot
      }

      // orele de munca propriu zise
      if (endHour > integerTimeList[index]){
          return style.freeSlot
      }

      if (endHour <= integerTimeList[index]){
          return style.unsetSlot
      }

  }

  function fillSlotsWithParam(data) {
    const newSlotList = [];
    let firstHour = 7;

    for (let index = 0; index < 16 * 2; index++) {
      newSlotList.push({
        style: getClassForSlot(data,index),
      });

      firstHour++;
    }
    return newSlotList;
  }

  function fillColumn(data) {
    return (
      <div>
        {fillSlotsWithParam(data).map((value, index) => (
          <div className={value.style} key={index}></div>
        ))}
      </div>
    );
  }

    function fillTimeColumn() {
        return (
            <div>
                {timeList.map((value, index) => (
                    <div className={style.timeSlot} key={index}>
                        {value}
                    </div>
                ))}
            </div>
        );
    }

    const timeColumn = useMemo(()=>{
        return fillTimeColumn()
    },[timeList])

  const mondayColumn = useMemo(() => {
    return fillColumn(monday);
  }, [monday]);

  const tuesdayColumn = useMemo(() => {
    return fillColumn(tuesday);
  }, [tuesday]);

  const wensesdayColumn = useMemo(() => {
    return fillColumn(wenesday);
  }, [wenesday]);

  const thursdayColumn = useMemo(() => {
    return fillColumn(thursday);
  }, [thursday]);

  const fridayColumn = useMemo(() => {
    return fillColumn(friday);
  }, [friday]);

  const saturndayColumn = useMemo(() => {
    return fillColumn(saturnday);
  }, [saturnday]);

  const sundayColumn = useMemo(() => {
    return fillColumn(sunday);
  }, [sunday]);

  function populateColumns() {
    return (
      <div className={style.calendarBody}>
        {timeColumn}
        {mondayColumn}
        {tuesdayColumn}
        {wensesdayColumn}
        {thursdayColumn}
        {fridayColumn}
        {saturndayColumn}
        {sundayColumn}
      </div>
    );
  }
  function populateHeader() {
    return (
      <div className={style.dayNames}>
        <div className={style.dayDetails}></div>
        {displayedWeek.map((item, index) => (
          <div key={index} className={style.dayDetails}>
            <h1>{item.getDate()}</h1>
            <p>{weekdays[index]}</p>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className={style.datePicker}>
      {header()}
      {populateHeader()}
      {populateColumns()}
    </div>
  );
}

export default Calendar;
