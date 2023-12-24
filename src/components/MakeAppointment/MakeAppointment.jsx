import style from "./MakeAppointment.module.css";
import ResponsiveDatePicker from "../ResponsiveDatePicker/ResponsiveDatePicker";
import React, { useEffect, useState } from "react";
import { getDatesForMonth } from "../../services/day_api";
import useDatePicker from "../../hooks/useDatePicker";
import TimeCollumn from "./TimeCollumn";
import Column from "./Column";
import ActionButton from "../ActionButton/ActionButton";
import ContextMenu from "../ContextMenu/ContextMenu";
import { makeAppointment } from "../../services/appointment_api";
import { useSelector } from "react-redux";

function MakeAppointment({ question }) {
  const [currentMonth, setCurrentMonth] = useState();
  const [monthAvailability, setMonthAvailability] = useState([]);
  const { finalDays, today, decimalHoursToTime } = useDatePicker();

  useEffect(() => {
    if (currentMonth) {
      const fetchData = async () => {
        return await getDatesForMonth(currentMonth);
      };

      fetchData().then((r) => setMonthAvailability(r));
    }
  }, [currentMonth]);

  const [currentSelectionDate, setCurrentSelectionDate] = useState({});
  const [currentWeek, setCurrentWeek] = useState({
    days: null,
    startTime: null,
    endTime: null,
  });

  const handleSelectedDay = (date) => {
    setCurrentSelectionDate(date);
  };

  useEffect(() => {
    if (currentSelectionDate && finalDays.length > 0) {
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

      setCurrentWeek({
        days: week,
        startTime: startTime,
        endTime: endTime,
      });
    }
  }, [currentSelectionDate]);

  const [globalSelectedSlot, setGlobalSelectedSlot] = useState({
    slot: null,
    day: null,
  });

  function handleGlobalSelectedSlot(slot) {
    if (globalSelectedSlot.slot === slot.slot) {
      setGlobalSelectedSlot({ slot: null, day: null });
    } else {
      setGlobalSelectedSlot({ slot: slot.slot, day: slot.day });
    }
  }

  const { getMonthName, getWeekdayName } = useDatePicker();

  const [contextMenu, setContextMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });

  const handleRightClick = (event) => {
    event.preventDefault();
    setContextMenu({
      visible: true,
      x: event.clientX,
      y: event.clientY,
    });
  };

  /**
   * contextMenu actions
   *
   */
  const menuItems = [
    {
      label: "Programeaza-te",
      icon: "schedule",
      onClick: () => alert("First action clicked"),
    },
    {
      label: "Selectie multipla",
      icon: "playlist_add",
      onClick: () => {
        console.log("Second action clicked");
      },
    },
  ];

  function getNextSlot(globalSelectedSlot) {
    const slots = globalSelectedSlot.day.slots;
    const currentSlotIndex = slots.findIndex(
      (slot) => slot === globalSelectedSlot.slot,
    );

    if (currentSlotIndex >= 0 && currentSlotIndex < slots.length - 1) {
      return slots[currentSlotIndex + 1];
    } else {
      return null;
    }
  }

  async function sendAppointment() {

    await makeAppointment(globalSelectedSlot.slot, getNextSlot(globalSelectedSlot), question.email, question.id, globalSelectedSlot.day.dayNumber, globalSelectedSlot.day.monthNumber, globalSelectedSlot.day.fullYear, "OCCUPIED");
  }

  return (
    <div
      className={style.mainContainer}
      onContextMenu={handleRightClick}
      onClick={() => setContextMenu({ visible: false, x: 0, y: 0 })}
    >
      <div className={style.datePickerWrapper}>
        <ResponsiveDatePicker
          sendSelectedDate={(date) => handleSelectedDay(date)}
          sendCurrentMonth={(month) => setCurrentMonth(month)}
          sendMultipleSelectionDates={() => {}}
          monthData={monthAvailability.length > 0 ? monthAvailability : []}
          contextMenuProps={false}
        />
      </div>

      {currentSelectionDate && (
        <div className={style.makeAppointment}>
          <h2 className={style.titlu}>Adauga o programare</h2>
          {globalSelectedSlot.slot ? (
            <div className={style.dayInfo}>
              <p className={style.info}>
                <span className="material-symbols-outlined">event</span>{" "}
                {globalSelectedSlot.day.dayNumber}{" "}
                {getMonthName(
                  globalSelectedSlot.day.monthNumber,
                  "ro-RO",
                  "long",
                )}{" "}
                {globalSelectedSlot.day.fullYear}{" "}
              </p>
              <p className={style.info}>
                <span className="material-symbols-outlined">schedule</span>
                {decimalHoursToTime(globalSelectedSlot.slot)} :{" "}
                {decimalHoursToTime(getNextSlot(globalSelectedSlot))}
              </p>
            </div>
          ) : (
            <p className={style.info}>
              {" "}
              Selecteaza un spatiu disponibil din calendar.
            </p>
          )}
          <div>
            <ActionButton
              text={"Confirma"}
              color={"white"}
              active={!!globalSelectedSlot.slot}
              backgroundColor={"#1888ff"}
              onClick={() => {
                sendAppointment();
              }}
            >
              <span className="material-symbols-outlined">task_alt</span>
            </ActionButton>
          </div>
        </div>
      )}

      {currentWeek.days && (
        <div className={style.calendarWrapper}>
          <TimeCollumn day={currentWeek.days[0]} />

          {currentWeek.days.map((day, index) => {
            return (
              <Column
                key={index}
                day={day}
                index={index}
                today={today}
                globalSelectedSlot={globalSelectedSlot}
                currentSelectionDate={currentSelectionDate}
                sendSelectedSlot={(slot) => {
                  handleGlobalSelectedSlot(slot);
                }}
              />
            );
          })}
        </div>
      )}

      {globalSelectedSlot && contextMenu.visible && (
        <ContextMenu
          items={menuItems}
          top={contextMenu.y}
          left={contextMenu.x}
        />
      )}
    </div>
  );
}

export default MakeAppointment;
