import React, { useEffect, useMemo, useRef, useState } from "react";
import style from "./Calendar.module.css";
import { useFillTime } from "../../hooks/useFillTime";

function WeekDayColumn({ weekDay, dayIndex, onDataReceived, selectedCard }) {
  const { integerTimeList } = useFillTime();

  const selectCard = (index, weekDay) => {
    onDataReceived({ index: index, weekDay: weekDay });
  };

  const selectAppointment = () => {

    
  };

  /**
   * important function
   *
   * @param data
   * @param index
   * @return {*}
   */
  function fillAppointment(data, index) {
    const endHour = data.endHour;
    const startingHours = data.appointments
      ? getAppointmentsDetails(data)
      : null;
    const appointments = data.appointments;
    let result;

    if (
      endHour > integerTimeList[index] &&
      startingHours.includes(integerTimeList[index])
    ) {
      appointments.forEach((appointment) => {
        if (
          convertFromStringHourToIntegerHour(appointment.startHour) ===
          integerTimeList[index]
        ) {
          result = appointment;
        }
      });
    }

    return result;
  }

  /**
   * function for getting classname
   *
   * @param index
   * @param valueStyle
   * @param weekDay
   * @return {*}
   */
  function getClassName(index, valueStyle, weekDay) {
    if (
      selectedCard &&
      selectedCard.index === index &&
      selectedCard.weekDay === weekDay
    ) {
      return style.selectedSlot;
    } else {
      return valueStyle;
    }
  }

  /**
   * Renders a card for a half hour appointment
   *
   * TODO more for 1h and 1:5h appointments
   *
   * @param value
   * @param index
   * @return {Element}
   */
  function halfHourAppointmentCard(value, index) {
    const startHour = value.appointment.startHour;
    const fullName =
      `${value.appointment.nume}` + " " + `${value.appointment.prenume}`;
    return (
      <div className={style.appointment} onClick={selectAppointment}>
        <div className={style.bar}></div>
        <div className={style.content}>
          <p className={style.userName}>{fullName}</p>
          <p className={style.contentDetails}>{value.appointment.duration} h</p>
          <p className={style.contentDetails}>
            q.no. {value.appointment.questionId}
          </p>
        </div>
      </div>
    );
  }

  function fillSlotsWithParam(data) {
    const newSlotList = [];
    let firstHour = 7;

    for (let index = 0; index < 16 * 2; index++) {
      newSlotList.push({
        style: getClassForSlot(data, index),
        appointment: fillAppointment(data, index),
      });

      firstHour++;
    }
    return newSlotList;
  }

  /**
   * assigns each appointment to its starting hour
   *
   * @param data
   * @return {*[]}
   */
  function getAppointmentsDetails(data) {
    const appointments = data.appointments;
    const startingHourArray = [];
    appointments.forEach((appointment) => {
      startingHourArray.push(
        convertFromStringHourToIntegerHour(appointment.startHour),
      );
    });

    return startingHourArray;
  }

  /**
   * used in some computations
   *
   * @param timeString
   * @return {*}
   */
  function convertFromStringHourToIntegerHour(timeString) {
    const [hours, minutes] = timeString.split(":").map(Number);
    const fractionOfHour = minutes / 60;
    return hours + fractionOfHour;
  }

  /**
   * function used to determine what class should a slot have based on its state
   *
   * @param data
   * @param index
   * @return {*}
   */
  function getClassForSlot(data, index) {
    const startHour = data.startHour;
    const endHour = data.endHour;
    const status = data.workingStatus;
    const workingHours = data.workingHours;
    const startingHours = data.appointments
      ? getAppointmentsDetails(data)
      : null;

    if (data && status === "CLOSED") {
      return style.closedDay;
    }

    // daca noi avem program de la 8 si incepe calendarul la 7
    if (startHour > integerTimeList[index]) {
      return style.unsetSlot;
    }

    // orele de munca propriu zise
    if (
      endHour > integerTimeList[index] &&
      startingHours.includes(integerTimeList[index])
    ) {
      return style.occupiedSlot;
    } else if (endHour > integerTimeList[index]) {
      return style.freeSlot;
    }

    if (endHour <= integerTimeList[index]) {
      return style.unsetSlot;
    }
  }

  /**
   *
   * function to render a column with its properties
   *
   * @param data
   * @param weekDay
   * @return {Element}
   */
  function fillColumn(data, weekDay) {
    return (
      <div>
        {data &&
          fillSlotsWithParam(data).map((value, index) => (
            <React.Fragment key={index}>
              {value.style === style.occupiedSlot ? (
                <div
                  className={style.freeSlot}
                  onClick={() => selectCard(index, weekDay)}
                >
                  {halfHourAppointmentCard(value, index)}
                </div>
              ) : (
                <div
                  onClick={() => selectCard(index, weekDay)}
                  className={getClassName(index, value.style, weekDay)}
                ></div>
              )}
            </React.Fragment>
          ))}
      </div>
    );
  }

  /**
   *
   * memorised column
   */
  const weekDayColumn = useMemo(() => {
    return fillColumn(weekDay, dayIndex);
  }, [weekDay, selectedCard]);

  return <div>{weekDayColumn}</div>;
}

export default WeekDayColumn;
