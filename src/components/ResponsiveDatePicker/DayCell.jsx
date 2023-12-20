import PropTypes from "prop-types";
import ActionButton from "../ActionButton/ActionButton";
import { useState } from "react";

function DayCell({
  style,
  value,
  onClick,
  backgroundColor,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(style === "pastDay");

  const pastDayStyle = {
    fontSize: "16px",
    height: "100%",
    borderRadius: "5px",
    display: "grid",
    placeItems: "center",
    color: "white",
    backgroundColor: "rgb(207, 206, 206)",
    transition: "0.25s all ease in-out",
    border: "none",
  };

  const dayStyle = {
    height: "100%",
    border: "3px solid rgb(234,234,234)",
    borderColor:
      backgroundColor === "white" ? "rgb(234,234,234)" : backgroundColor,
    fontSize: "16px",
    color: isHovered ? "white" : "rgba(15, 63, 101, 0.8)",
    backgroundColor: isHovered ? "#1888ff" : backgroundColor,
    borderRadius: "7px",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    transition: "0.25s all ease in-out",
    fontWeight: "bold",
  };

  const selectedDayStyle = {
    height: "100%",
    border: "1px solid rgb(213, 213, 213)",
    fontSize: "16px",
    color: isHovered ? "white" : "white",
    backgroundColor: isHovered ? "#1888ff" : "#1888ff",
    borderRadius: "5px",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    transition: "0.25s all ease in-out",
    fontWeight: "bold",
  };

  const todayStyle = {
    height: "100%",
    fontSize: "16px",
    border: "3px solid #1888ff",
    borderRadius: "7px",
    // outline: "5px solid purple",
    // outlineOffset: "-5px",
    color: isHovered ? "white" : "rgba(15, 63, 101, 0.8)",
    backgroundColor: isHovered ? "#1888ff" : backgroundColor,
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    transition: "0.25s all ease in-out",
    fontWeight: "bold",
  };

  function getStyle(style) {
    switch (style) {
      case "pastDay":
        return pastDayStyle;
      case "selectedDay":
        return selectedDayStyle;
      case "today":
        return todayStyle;
      default:
        return dayStyle;
    }
  }

  return (
    <button
      style={getStyle(style)}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onMouseEnter={() => {
        setIsHovered(true);

      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={onClick}
    >
      {value}
    </button>
  );
}

export default DayCell;

ActionButton.propTypes = {
  text: PropTypes.string.isRequired,
  style: PropTypes.string.isRequired,
};

ActionButton.defaultProps = {
  style: "day",
  backgroundColor: "white",
};
