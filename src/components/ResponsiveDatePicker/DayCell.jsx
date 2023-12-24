import PropTypes from "prop-types";
import ActionButton from "../ActionButton/ActionButton";
import { useState } from "react";

function DayCell({
  style,
  value,
  onClick,
  backgroundColor,
  isSelected,
  onMouseDown,
  onMouseUp,
  onMouseEnter,
}) {
  const [isHovered, setIsHovered] = useState(false);
  const [isDisabled, setIsDisabled] = useState(style === "pastDay");

  const divGeneralStyle = {
    height: "100%",
    width: "100%",
    borderRadius: "14px",
    border: "7px solid ",
  }

  const divStyle = {
    ...divGeneralStyle,
    borderColor: isHovered && !isDisabled ? "#1888ff" : "rgb(241,241,241)",
  };

  const workingStyle = {
     ...divGeneralStyle,
    borderColor: isHovered ? "#1888ff" : "rgb(187,255,189)",
  };

  const closedStyle = {
    ...divGeneralStyle,
    borderColor: isHovered ? "#1888ff" : "rgb(255,205,205)",
  };

  const todayStyle = {
    ...divGeneralStyle,
    borderColor: isHovered ? "#1888ff" : "#b700ff",
  };

  const selectedDayStyle = {
    ...divGeneralStyle,
    borderColor: "#1888ff",
  };

  const buttonGeneralStyle = {
    borderRadius: isHovered ? "2px" : "7px",
    height: "100%",
    width: "100%",
    border: "none",
    fontSize: "18px",
    cursor: !isDisabled && "pointer",
    fontWeight: "bold",
  };


  const buttonStyle = {
    ...buttonGeneralStyle,
    backgroundColor:
        style === "pastDay"
            ? isHovered && !isDisabled
                ? "#1888ff"
                : "rgb(241,241,241)"
            : isHovered
                ? "#1888ff"
                : "white",
    color: isHovered && !isDisabled ? "white" : "#333",
  };

  const selectedButtonStyle = {
    ...buttonGeneralStyle,
    borderRadius: "2px",
    backgroundColor: "#1888ff",
    color:  "white",
  };

  const closedButtonStyle = {
    ...buttonGeneralStyle,
    backgroundColor: isHovered ? "#1888ff" : "rgb(255,205,205)",
    color: isHovered && !isDisabled ? "white" : "#333",
  };

  const workingButtonStyle = {
    ...buttonGeneralStyle,
    backgroundColor: isHovered ? "#1888ff" : "rgb(187,255,189)",
    color: isHovered && !isDisabled ? "white" : "#333",
  };

  function getDivStyle(style) {
    switch (style) {
      case "selectedDay":
        return selectedDayStyle;
      case "today":
        return todayStyle;
      case "working":
        return workingStyle;
      case "closed":
        return closedStyle;
      default:
        return divStyle;
    }
  }

  function getButtonStyle(style) {
    switch (style) {
      case "closed":
        return closedButtonStyle;
      case "working":
        return workingButtonStyle;
      default:
        return buttonStyle;
    }
  }

  return (
    <div
      style={isSelected ? selectedDayStyle : getDivStyle(style)}
      onMouseEnter={() => {
        setIsHovered(true);
        onMouseEnter();
      }}
      onMouseLeave={() => {
        setIsHovered(false);
      }}
      onClick={onClick}
    >
      <button style={isSelected ? selectedButtonStyle : getButtonStyle(style)} disabled={isDisabled}>
        {value}
      </button>
    </div>
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
