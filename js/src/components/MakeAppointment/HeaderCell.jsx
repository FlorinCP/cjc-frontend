import style from "./MakeAppointment.module.css";
import React from "react";
import useDatePicker from "../../hooks/useDatePicker";

function HeaderCell({ day, index, isToday, isDateSelected, isWorkingDay }) {
  const { getMonthName, getWeekdayName } = useDatePicker();

  function capitalizeFirstLetter(string) {
    if (!string) return string;
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const todayInterior = {
    backgroundColor: "#b700ff",
    color: "white",
    border: "10px solid #b700ff",
  };

  const selectedInterior = {
    backgroundColor: "#1888FF",
    color: "white",
    border: "10px solid #1888FF",
  };

  const closedInterior = {
    borderRadius: "10px",
  };

  const workingInterior = {
    borderRadius: "10px",
  };

  const workingExterior = {
    backgroundColor: "#BBFFBD",
    border: "10px solid #BBFFBD",
    borderRadius: "15px",
  };

  const closedExterior = {
    backgroundColor: "#FFCDCD",
    border: "10px solid #FFCDCD",
    borderRadius: "15px",
  };

  const todayExterior = {
    backgroundColor: "white",
    color: "white",
  };

  const selectedExterior = {
    backgroundColor: "white",
    color: "white",
  };

  function getIntriorStyle() {
    if (!isWorkingDay) {
      return closedInterior;
    } else if (isToday) {
      return todayInterior;
    } else if (isDateSelected) {
      return selectedInterior;
    } else if (isWorkingDay) {
      return workingInterior;
    }
  }

  function getExteriorStyle() {
    if (!isWorkingDay) {
      return closedExterior;
    } else if (isToday) {
      return todayExterior;
    } else if (isDateSelected) {
      return selectedExterior;
    } else if (isWorkingDay) {
      return workingExterior;
    }
  }

  return (
    <div className={style.headerCell}>
      <div className={style.circle} style={getExteriorStyle()}>
        <div className={style.headerInteriorCell} style={getIntriorStyle()}>
          <p className={style.dayNumber}>{day.dayNumber}</p>

          <p className={style.dayOfTheWeek}>
            {capitalizeFirstLetter(getWeekdayName(index, "ro-RO", "long"))}
          </p>
          <div className={style.monthYear}>
            <p className={style.monthName}>
              {capitalizeFirstLetter(
                getMonthName(day.monthNumber, "ro-RO", "long"),
              )}
            </p>
            <p className={style.year}>{day.fullYear}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderCell;
