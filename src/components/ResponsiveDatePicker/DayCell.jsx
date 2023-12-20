import PropTypes from "prop-types";
import ActionButton from "../ActionButton/ActionButton";
import { useState } from "react";

function DayCell({ style, value , onClick}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled,setIsDisabled] = useState(style === "pastDay");

  const pastDayStyle = {
    fontSize: "16px",
    height: "100%",
    borderRadius: "5px",
    display: "grid",
    placeItems: "center",
    color: "white",
    backgroundColor: "rgb(207, 206, 206)",
    transition: "0.15s all ease",
    border: "none"
  };

  const dayStyle = {
    height: "100%",
    border: "1px solid rgb(213, 213, 213)",
    fontSize: "16px",
    color: "rgba(15, 63, 101, 0.8)",
    backgroundColor: isHovered ? "#1888ff" : "white",
    borderRadius: "5px",
    display: "grid",
    placeItems: "center",
    cursor: "pointer",
    transition: "0.15s all ease",
    fontWeight: "bold",
  };

  function getStyle(style) {
    switch (style) {
      case "pastDay":
        return pastDayStyle;
      default:
        return dayStyle;
    }
  }

  return (
    <button
      style={getStyle(style)}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={ onClick}
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
};
