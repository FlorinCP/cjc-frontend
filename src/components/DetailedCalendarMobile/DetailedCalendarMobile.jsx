import style from "../MakeAppointment/MakeAppointment.module.css";
import Column from "../MakeAppointment/Column";
import React, {useEffect, useRef, useState} from "react";
import { useSelector } from "react-redux";
import MobileTimeColumn from "../MakeAppointment/MobileTimeColumn";
import useScreenSize from "../../hooks/useScreenSize";

export default function DetailedCalendarMobile({
  sendGlobalSelectedSlot,
  currentSelectionDate,
  globalSelectedSlot,
    sendNewSelectedDate
}) {

  const currentWeek = useSelector((state) => state.currentWeek.currentWeek);

  const weekContainerRef = useRef(null);
  const dayRefs = useRef(new Map());
  const observer = useRef(null);
  const [middleElement, setMiddleElement] = useState(null);
  const {width} = useScreenSize()
  const [searchPadding,setSearchPadding] = useState(-100)

  useEffect(() => {
    if (middleElement){
      sendNewSelectedDate(middleElement)
    }
  }, [middleElement]);

  function getMiddleLine(width){
    return -width*0.45
  }

  useEffect(() => {
    if (width){
      setSearchPadding(getMiddleLine(width))
    }
  }, [width]);

  const scrollToSelectedDay = (dayId) => {

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

  function getDayNumber(textContent){
    const match = textContent.match(/\d+/);
    return match ? parseInt(match[0], 10) : null;
  }


  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {

          const dayNumber = getDayNumber(entry.target.textContent)
          const newSelectedDay = currentWeek.days.find(day => day.dayNumber === dayNumber)
          setMiddleElement(newSelectedDay)
        }
      });
    }, {
      threshold: 0.1,
      //  @TODO to add dynamic value
      rootMargin: '0px -150px 0px -150px'
    });

    dayRefs.current.forEach(el => {
      if (el) observer.current.observe(el);
    });

    return () => {
      dayRefs.current.forEach(el => {
        if (el) observer.current.unobserve(el);
      });
    };
  }, []);

  useEffect(() => {
    if (currentSelectionDate && currentWeek){
      const index = currentWeek.days.findIndex( day => day.dayNumber === currentSelectionDate.dayNumber)

      scrollToSelectedDay(index)
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
