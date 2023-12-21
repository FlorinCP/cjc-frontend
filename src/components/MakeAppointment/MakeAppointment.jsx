import style from "./MakeAppointment.module.css";
import ResponsiveDatePicker from "../ResponsiveDatePicker/ResponsiveDatePicker";
import React, { useEffect, useState } from "react";
import { getDatesForMonth } from "../../services/day_api";
import useDatePicker from "../../hooks/useDatePicker";

function MakeAppointment(props) {
  const [currentMonth, setCurrentMonth] = useState();
  const [monthAvailability, setMonthAvailability] = useState();
  const { prevMonth, nextMonth, monthName, fullYear, finalDays, today,decimalHoursToTime,getMonthName ,getWeekdayName} =
    useDatePicker();

  useEffect(() => {
    if (currentMonth) {
      const fetchData = async () => {
        return await getDatesForMonth(currentMonth);
      };

      fetchData().then((r) => setMonthAvailability(r));
    }
  }, [currentMonth]);

  const [currentSelectionDate, setCurrentSelectionDate] = useState();
  const [currentWeek, setCurrentWeek] = useState({
    days: null,
    startTime: null,
    endTime: null,
  });

  const handleSelectedDay = (date) => {
    setCurrentSelectionDate(date);
  };

  useEffect(() => {
    if (currentSelectionDate && finalDays) {
      finalDays.forEach((row) => {
        return row.forEach((day) => {
          if (
            monthAvailability.some(
              (receivedDay) => receivedDay.dayNumber === day.dayNumber,
            )
          ) {
            const receivedDay = monthAvailability.find(
              (receivedDay) => receivedDay.dayNumber === day.dayNumber,
            );
            day.workingStatus = receivedDay?.workingStatus;
            day.workingHours = receivedDay?.workingHours;
            day.startHour = receivedDay?.startHour;
            day.endHour = receivedDay?.endHour;
          }
        });
      });

      const week = finalDays.find((week) => {
        return week.find((day) => {
          return day.dayNumber === currentSelectionDate.dayNumber;
        });
      });

      const startTime = Math.min(
        ...week
          .map((day) => day.startHour)
          .filter((hour) => hour !== null && hour !== undefined),
      );
      const endTime = Math.max(
        ...week
          .map((day) => day.endHour)
          .filter((hour) => hour !== null && hour !== undefined),
      );

      const slots = [];
      for (let i = startTime; i < endTime; i += 0.5) {
        slots.push(i);
      }

      week.forEach((day) => {
        day.slots = slots;
      });

      console.log(week);

      setCurrentWeek({
        days: week,
        startTime: startTime,
        endTime: endTime,
      });
    }
  }, [currentSelectionDate]);

  function capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className={style.mainContainer}>
      <div className={style.datePickerWrapper}>
        <ResponsiveDatePicker
          sendSelectedDate={(date) => handleSelectedDay(date)}
          sendCurrentMonth={(month) => setCurrentMonth(month)}
          sendMultipleSelectionDates={() => {}}
          monthData={monthAvailability}
          contextMenuProps={false}
        />
      </div>

      {currentWeek.days && (
        <div className={style.calendarWrapper}>
          <div className={style.column}>
            <div className={style.headerCell}></div>
            {currentWeek.days[0].slots.map((slot) => {
              return (
                <div className={style.leftcell}>
                  <p>{decimalHoursToTime(slot)}</p>
                </div>
              );
            })}
          </div>
          {currentWeek.days.map((day,index) => {
            return (
              <div className={style.column}>
                <div className={style.headerCell}>
                  <p>{day.dayNumber}</p>
                  <p>{capitalizeFirstLetter(getMonthName(day.monthNumber,'ro-RO','long'))}</p>
                  <p>{capitalizeFirstLetter(getWeekdayName(index,'ro-RO','long'))}</p>
                </div>
                {day.slots.map((slot) => {
                  return (
                    <div className={style.cell}>
                      <p>{slot}</p>
                    </div>
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default MakeAppointment;
