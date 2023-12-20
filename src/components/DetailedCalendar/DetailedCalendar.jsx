import style from "./DetailedCalendar.module.css";
import useDatePicker from "../../hooks/useDatePicker";

function DetailedCalendar(props) {
  const { prevMonth, nextMonth, monthName, fullYear, finalDays, today } =
    useDatePicker();

  function renderSlots(items) {
    const elements = [];
    for (let i = 0; i < items.length; i++) {
      elements.push(
        <div className={style.slot} key={i}>
          {items[i]}
        </div>,
      );
    }
    return elements;
  }

  return (
    <div className={style.wrapper}>
      {finalDays[0].map((day, index) => {
        return <div className={style.collumn}></div>;
      })}
    </div>
  );
}

export default DetailedCalendar;
