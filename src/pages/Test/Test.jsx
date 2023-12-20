import style from "./Test.module.css";
import ResponsiveDatePicker from "../../components/ResponsiveDatePicker/ResponsiveDatePicker";
import DetailedCalendar from "../../components/DetailedCalendar/DetailedCalendar";

function handleSelectedDays(date) {
    
}

function Test() {
  return (
    <div className={style.wrapper}>
      <div className={style.calendar}>
        <ResponsiveDatePicker 
            sendSelectedDate={(date) => handleSelectedDays(date)}
        />
          <DetailedCalendar />
      </div>
    </div>
  );
}

export default Test;
