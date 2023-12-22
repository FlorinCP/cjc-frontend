import style from "./MakeAppointment.module.css";
import React from "react";

function Cell({ slot, index, isToday, sendSelectedSlot, isSelected , isWorkingDay , isDateSelected }) {
  const basicStyle = {
    border: "1px solid",
    borderColor: "rgb(238, 238, 238)",
  };

  const selectedStyle = {
    // border: "1px solid",
    // borderColor: "#1c79b8",
    backgroundColor: "white",
  };

  const todayStyle = {
    ...basicStyle,
    backgroundColor: "white",
  };

  const closedStyle = {
    backgroundColor: "transparent",
    pointerEvents: "none",
    cursor: "not-allowed",
  };

  const closedExteriorStyle = {
    ...basicStyle,
    background:"#ffffff" +
        "    repeating-linear-gradient(" +
        "      -45deg," +
        "      #f7f7f7," +
        "      #f7f7f7 5px," +
        "      #ffffff 5px," +
        "      #ffffff 10px" +
        "    )",
    pointerEvents: "none",
    cursor: "not-allowed",
  };

  function getInteriorStyle() {
    if (!isWorkingDay) {
      return closedStyle;
    }
  }

  function getExteriorStyle() {
    if (!isWorkingDay) {
      return closedExteriorStyle;
    } else if (isToday || isDateSelected) {
      return todayStyle;
    } else if (isSelected) {
      return selectedStyle;
    } else {
      return basicStyle;
    }
  }

  return (
    <div
      className={style.cell}
      onClick={() => sendSelectedSlot(slot)}
      style={getExteriorStyle()}
    >
      <div className={style.cellInterior}
        style={getInteriorStyle()}
      >
        <p>{slot}</p>
      </div>
    </div>
  );
}

export default Cell;
