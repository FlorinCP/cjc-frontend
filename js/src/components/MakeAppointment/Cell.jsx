import style from "./MakeAppointment.module.css";
import React, { useEffect } from "react";

function Cell({
  slot,
  index,
  isToday,
  sendSelectedSlot,
  isSelected,
  isWorkingDay,
  isDateSelected,
  isWorkingSlot,
  appointment,
}) {
  const basicStyle = {
    border: "1px solid",
    borderColor: "rgb(238, 238, 238)",
  };

  const selectedStyle = {
    backgroundColor: "#a1d0ff",
  };

  const selectedBar = {
    backgroundColor: "#1888FF",
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
    background:
      "#ffffff" +
      "    repeating-linear-gradient(" +
      "      -45deg," +
      "      #f0f0f0," +
      "      #f0f0f0 5px," +
      "      #ffffff 5px," +
      "      #ffffff 10px" +
      "    )",
    pointerEvents: "none",
    cursor: "not-allowed",
  };

  function getBarStyle() {
    if (isSelected) {
      return selectedBar;
    }
  }

  function getInteriorStyle() {
    if (!isWorkingDay) {
      return closedStyle;
    } else if (isSelected) {
      return selectedStyle;
    }
  }

  function getExteriorStyle() {
    if (!isWorkingDay) {
      return closedExteriorStyle;
    } else if (isToday || isDateSelected) {
      return todayStyle;
    } else {
      return basicStyle;
    }
  }

  useEffect(() => {
    if (appointment) {
      console.log(appointment);
    }
  }, [appointment]);

  return (
    <div
      className={isWorkingSlot ? style.cell : style.cellClosed}
      onClick={() => sendSelectedSlot(slot)}
      style={getExteriorStyle()}
    >
      {appointment ? (
        <div className={style.appointment}>
          {/*<div className={style.appointmentBar}>*/}

          {/*</div>*/}
          {
            appointment.appointmentStatus
          }
        </div>
      ) : (
        <div className={style.cellInterior} style={getInteriorStyle()}>
          {!appointment && isWorkingSlot && isWorkingDay && (
            <div className={style.bar} style={getBarStyle()}></div>
          )}

          {(!isWorkingSlot && isWorkingDay) ||
            ((!isWorkingSlot || !isWorkingDay) && (
              <p className={style.closed}>Inchis</p>
            ))}
          {!isWorkingSlot && isWorkingDay && (
            <p className={style.closed}>Indisponibil</p>
          )}
        </div>
      )}
    </div>
  );
}

export default Cell;
