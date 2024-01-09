import style from "../MakeAppointment/MakeAppointment.module.css";
import Column from "../MakeAppointment/Column";
import React, {useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import MobileTimeColumn from "../MakeAppointment/MobileTimeColumn";

export default function DetailedCalendarMobile({
  sendGlobalSelectedSlot,
  currentSelectionDate,
  globalSelectedSlot,
}) {

  const currentWeek = useSelector((state) => state.currentWeek.currentWeek);

  const weekContainerRef = useRef(null);
  const dayRefs = useRef(new Map());

  const scrollToSelectedDay = (dayId) => {
    // Logic to scroll to the item
    const itemRef = dayRefs.current.get(dayId);
    if (itemRef && weekContainerRef.current) {
      const scrollContainerRect = weekContainerRef.current.getBoundingClientRect();
      const itemRect = itemRef.getBoundingClientRect();

      const scrollLeft = itemRef.offsetLeft - scrollContainerRect.width / 2 + itemRect.width / 2;
      weekContainerRef.current.scroll({
        left: scrollLeft,
        behavior: 'smooth'
      });
    }
  };


  useEffect(() => {
    if (currentSelectionDate && currentWeek){
      // const index = currentWeek.findIndex( day => day.dayNumber === currentSelectionDate.dayNumber)

          console.log(currentWeek)
    }
  }, [currentSelectionDate,currentWeek]);

  return (
    <div
      className={style.mobileCalendarWrapper}
    >
      <MobileTimeColumn day={currentWeek.days[0]} />

      <div className={style.weekDaysSelection} ref={weekContainerRef}>
        {currentWeek.days.map((day, index) => {
          return (
              <Column
                  ref={el => dayRefs.current.set(index,el)}
                  key={index}
                  day={day}
                  index={index}
                  globalSelectedSlot={globalSelectedSlot}
                  currentSelectionDate={currentSelectionDate}
                  sendSelectedSlot={(slot) => {
                    sendGlobalSelectedSlot(slot);
                  }}
              />
          );
        })}
      </div>

    </div>
  );
}
