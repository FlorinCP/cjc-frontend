import style from "./Test.module.css";
import ResponsiveDatePicker from "../../components/ResponsiveDatePicker/ResponsiveDatePicker";
function Test() {
  return (
    <div className={style.wrapper}>
      <div className={style.calendar}>
        <ResponsiveDatePicker />
      </div>
    </div>
  );
}

export default Test;
