import style from "./Test.module.css";
import ResponsiveDatePicker from "../../components/ResponsiveDatePicker/ResponsiveDatePicker";
import DetailedCalendar from "../../components/DetailedCalendar/DetailedCalendar";
import MakeAppointment from "../../components/MakeAppointment/MakeAppointment";

function handleSelectedDays(date) {
    
}

function Test() {
  return (
    <div className={style.wrapper}>
      <MakeAppointment></MakeAppointment>
    </div>
  );
}

export default Test;
