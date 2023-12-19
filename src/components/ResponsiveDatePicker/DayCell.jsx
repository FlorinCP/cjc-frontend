import PropTypes from "prop-types";
import ActionButton from "../ActionButton/ActionButton";
import {useState} from "react";

function DayCell({style,value}) {

  const [isHovered, setIsHovered] = useState(false);


  const pastDayStyle = {
    fontSize: "16px",
    height: "40px",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    color: "white",
    backgroundColor: "rgb(207, 206, 206)",
    transition: "0.15s all ease"
  };

  const dayStyle = {
    height: "40px",
    fontSize: "16px",
    color: "rgba(15, 63, 101, 0.8)",
    backgroundColor: isHovered ? "#1888ff" : "#f7f7f7",
    borderRadius: "5px",
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    flexDirection: "column",
    cursor: "pointer",
    transition: "0.15s all ease"
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

    <div style={getStyle(style)}
         onMouseEnter={() => setIsHovered(true)}
         onMouseLeave={() => setIsHovered(false)}
    >
      {value}
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
};
