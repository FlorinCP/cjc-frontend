import React, { useEffect, useMemo, useState } from "react";
import style from "./Calendar.module.css";
import Header from "./Header";
import CalendarBody from "./CalendarBody";

function Calendar(props) {
  return (
    <div className={style.datePicker}>
      <Header />
      <CalendarBody />
    </div>
  );
}

export default Calendar;
