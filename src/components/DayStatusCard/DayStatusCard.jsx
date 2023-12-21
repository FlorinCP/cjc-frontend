import style from "./DayStatusCard.module.css";
import ActionButton from "../ActionButton/ActionButton";
import React, { useState, useEffect } from "react";
import { postDayData } from "../../services/day_api";

function DayStatusCard({ currentSelectionDate }) {
  const [selectedDay, setSelectedDay] = useState();
  const [selectedStatus, setSelectedStatus] = useState("WORKING");
  const [workingHoursSelect, setWorkingHoursSelect] = useState(8);
  const [endHourSelect, setEndHourSelect] = useState(16);
  const [modificationsPending, setModificationsPending] = useState(false);
  const [startHourSelect, setStartHourSelect] = useState(8);

  useEffect(() => {
    console.log(currentSelectionDate);
  }, [currentSelectionDate]);

  /**
   * status change
   *
   * @param event
   */
  const handleStatusDropdownChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  /**
   * ensures concordance between working hours and so on
   *
   * @param event
   */
  const handleWorkingHoursChange = (event) => {
    setWorkingHoursSelect(event.target.value);
    setEndHourSelect(Number(event.target.value) + Number(startHourSelect));
  };

  /**
   * ensures concordance between working hours and so on
   *
   * @param event
   */
  const handleStartHourChange = (event) => {
    setStartHourSelect(event.target.value);
    setWorkingHoursSelect(Number(endHourSelect) - Number(event.target.value));
  };

  /**
   * ensures concordance between working hours and so on
   *
   * @param event
   */
  const handleEndHourChange = (event) => {
    setEndHourSelect(event.target.value);
    setWorkingHoursSelect(Number(event.target.value) - Number(startHourSelect));
  };

  /**
   *
   * verifica daca s-au facut sau nu modificari statusului curent al zilei
   */
  function changeModificationStatus() {
    if (
      selectedStatus !== selectedDay.workingStatus ||
      workingHoursSelect !== selectedDay.workingHours ||
      startHourSelect !== selectedDay.startHour ||
      endHourSelect !== selectedDay.endHour
    ) {
      setModificationsPending(true);
    }
  }

  /**
   * checks if some modifications were made
   */
  useEffect(() => {
    if (selectedDay) {
      changeModificationStatus();
    }
  }, [selectedStatus, workingHoursSelect, startHourSelect, endHourSelect]);

  /**
   * start hour selection
   *
   * @return {Element}
   */
  function StartHours() {
    return (
      <select
        value={currentSelectionDate.startHour || startHourSelect}
        onChange={handleStartHourChange}
      >
        <option value={7}>7:00</option>
        <option value={8}>8:00</option>
        <option value={9}>9:00</option>
        <option value={10}>10:00</option>
        <option value={11}>11:00</option>
        <option value={12}>12:00</option>
        <option value={13}>13:00</option>
        <option value={14}>14:00</option>
        <option value={15}>15:00</option>
        <option value={16}>16:00</option>
        <option value={17}>17:00</option>
        <option value={18}>18:00</option>
      </select>
    );
  }

  /**
   * end hours selection
   *
   * @return {Element}
   */
  function EndHours() {
    return (
      <select
        value={currentSelectionDate.endHour || endHourSelect}
        onChange={handleEndHourChange}
      >
        <option value={7}>7:00</option>
        <option value={8}>8:00</option>
        <option value={9}>9:00</option>
        <option value={10}>10:00</option>
        <option value={11}>11:00</option>
        <option value={12}>12:00</option>
        <option value={13}>13:00</option>
        <option value={14}>14:00</option>
        <option value={15}>15:00</option>
        <option value={16}>16:00</option>
        <option value={17}>17:00</option>
        <option value={18}>18:00</option>
      </select>
    );
  }

  function WorkingHours() {
    return (
      <div className={style.flex}>
        <h4> Ore de munca : </h4>
        <select
          value={currentSelectionDate.workingHours || workingHoursSelect}
          onChange={handleWorkingHoursChange}
        >
          <option value={1}>1</option>
          <option value={2}>2</option>
          <option value={3}>3</option>
          <option value={4}>4</option>
          <option value={5}>5</option>
          <option value={6}>6</option>
          <option value={7}>7</option>
          <option value={8}>8</option>
          <option value={9}>9 </option>
          <option value={10}>10</option>
          <option value={11}>11</option>
          <option value={12}>12</option>
          <option value={13}>13</option>
          <option value={14}>14</option>
          <option value={15}>15</option>
        </select>
      </div>
    );
  }
  function StartEndHours() {
    return (
      <div>
        <h3>Program : </h3>
        <StartHours /> : <EndHours />
      </div>
    );
  }

  function StatusDropDown() {
    return (
      <div>
        <h3>Disponibilitatea :</h3>

        <select
          value={currentSelectionDate.workingStatus || selectedStatus}
          onChange={handleStatusDropdownChange}
        >
          <option value="CLOSED">Inchis</option>
          <option value="VACATION">Concediu</option>
          <option value="HOLIDAY">Sarbatoare Legala</option>
          <option value="WORKING">Disponibil</option>
        </select>
      </div>
    );
  }

  const setScheduleForDay = async () => {
    await postDayData(
      currentSelectionDate,
      workingHoursSelect,
      startHourSelect,
      endHourSelect,
      selectedStatus,
    );
  };

  return (
    <div className={style.dateInfo}>
      <div className={style.buttons}>
        <p className={style.selectedDay}>
          <span className="material-symbols-outlined">calendar_today</span>
          {currentSelectionDate.dayNumber} -{" "}
          {currentSelectionDate.monthNumber + 1} -{" "}
          {currentSelectionDate.fullYear}
        </p>
        <div className={style.navigation}>
          <span className="material-symbols-outlined">chevron_left</span>
          <span className="material-symbols-outlined">chevron_right</span>
        </div>
        <ActionButton
          text={"Salveaza"}
          onClick={setScheduleForDay}
          color={"white"}
          backgroundColor={"#1c79b8"}
          active={true}
        >
          <span className="material-symbols-outlined">event_available</span>
        </ActionButton>
      </div>

      <div className={style.settings}>
        <StatusDropDown />
        <WorkingHours />
        <StartEndHours />
      </div>
    </div>
  );
}

export default DayStatusCard;
