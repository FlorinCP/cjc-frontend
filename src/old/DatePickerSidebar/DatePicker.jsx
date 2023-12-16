import React, {useEffect, useState} from 'react';
import style from './DatePicker.module.css'


function DatePicker({sendSelectedDate}) {

    const [today, setToday] = useState(new Date())
    const lang = "default";
    const weekdays = ["Sun", "Mon", "Tue", "Wen", "Thu", "Fri", "Sat"];
    const monthSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    const [fullYear, setFullYear] = useState(today.getFullYear());

    const [dayList, setDayList] = useState([]);
    const [pastDaysList, setPastDaysList] = useState([]);
    const [firstDaysOfNextMonthList, setFirstDaysOfNextMonthList] = useState([]);

    const [monthNumber, setMonthNumber] = useState(Number(today.toLocaleString(lang, {month: "2-digit"}) - 1))
    const [monthNumberOfDays, setMonthNumberOfDays] = useState(getMonthNumberOfDays(monthNumber, fullYear));
    const [monthName, setMonthName] = useState(today.toLocaleString(lang, {month: "long"}))
    const [firstDayOfTheMonth, setFirstDayOfTheMonth] = useState(
        getDay(fullYear, monthNumber , 1)
    );
    const [totalLastMonthFinalDays, setTotalLastMonthFinalDays] = useState(
        firstDayOfTheMonth.getDay()
    );


    const [selectedDate,setSelectedDate] = useState()

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
        setDayList([])
        for (let i = 0; i < monthNumberOfDays; i++) {
            setDayList((oldArray) => [
                ...oldArray,
                getDay(fullYear, monthNumber, i + 1),
            ]);
        }
    }

    function fillPrev() {
        setPastDaysList([])
        for (let i = 0; i < totalLastMonthFinalDays; i++) {
            const inverted = totalLastMonthFinalDays - (i + 1);
            if( monthNumber === 0) {

            setPastDaysList((oldArray) => [
                ...oldArray,
                getDay(
                    fullYear - 1,
                    11,
                    getMonthNumberOfDays(11, fullYear - 1) - inverted
                ),
            ]);
            } else {
                setPastDaysList((oldArray) => [
                    ...oldArray,
                    getDay(
                        fullYear,
                        monthNumber - 1,
                        getMonthNumberOfDays(monthNumber -1, fullYear) - inverted
                    ),
                ]);
            }
        }
    }

    function fillNext(){
        setFirstDaysOfNextMonthList([])
        const remaining = 7 - ((monthNumberOfDays + totalLastMonthFinalDays) % 7);
        if (remaining < 7) {
            for (let i = 0; i < remaining; i++) {
                setFirstDaysOfNextMonthList((oldArray) => [...oldArray, getDay(fullYear, monthNumber, i + 1)])
            }
        }
    }

    useEffect(() => {
        setMonthNumberOfDays(getMonthNumberOfDays(monthNumber, fullYear))
        setMonthName(firstDayOfTheMonth.toLocaleString(lang, {month: "long"}))
        setTotalLastMonthFinalDays(firstDayOfTheMonth.getDay())
    }, [monthNumber]);

    useEffect(() => {
        fillPrev()
        fillMonth()
        fillNext()
    }, [monthName]);

    function nextMonth() {
        if (monthNumber > 10) {
            const nextMonth = 0;
            setMonthNumber(nextMonth)
            const nextYear = fullYear + 1
            setFullYear(nextYear)
            setFirstDayOfTheMonth(getDay(nextYear,nextMonth,1))
        } else {
            const nextMonth = monthNumber + 1;
            setMonthNumber(nextMonth)
            setFirstDayOfTheMonth(getDay(fullYear,nextMonth,1))
        }
    }

    function prevMonth() {
        if (monthNumber < 1) {
            const prevMonth = 11;
            setMonthNumber(prevMonth)
            const prevYear = fullYear -1
            setFullYear(prevYear)
            setFirstDayOfTheMonth(getDay(prevYear,prevMonth,1))
        } else {
            const prevMonth = monthNumber - 1;
            setMonthNumber(prevMonth)
            setFirstDayOfTheMonth(getDay(fullYear,prevMonth,1))
        }
    }

    async function selectDate(value) {
        const selection = {
            dayNumber: value.getDate(),
            monthNumber: value.getMonth() + 1,
            year: value.getFullYear()
        }
        setSelectedDate(selection)
    }

    useEffect(() => {
        if (selectedDate !== undefined){
            console.log(selectedDate)
            sendSelectedDate(selectedDate)
        }
    }, [selectedDate]);

    return (
      <div className={style.datePicker}>
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
          {pastDaysList.map((value, index) => {
            return (
              <div className={style.pastDay} key={index}>
                {value.getDate()}
              </div>
            );
          })}

          {dayList.map((value, index) => (
            <div className={style.day} key={index} onClick={() => selectDate(value)}>
              {value.getDate()}
            </div>
          ))}

          {firstDaysOfNextMonthList.map((value, index) => {
            return (
              <div className={style.pastDay} key={index}>
                {value.getDate()}
              </div>
            );
          })}
        </div>
      </div>
    );
}

export default DatePicker;