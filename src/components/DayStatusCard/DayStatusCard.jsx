import style from "./DayStatusCard.module.css";
import ActionButton from "../ActionButton/ActionButton";
import React, { useState, useEffect } from "react";
import { postDayData } from "../../services/day_api";
import CustomDropdown from "../CustomDropdown/CustomDropdown";
import { useDispatch, useSelector } from "react-redux";
import { updateMonthDay } from "../../features/monthDaysSlice";

function DayStatusCard({ currentSelectionDate }) {
  const [selectedDay, setSelectedDay] = useState();
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [workingHoursSelect, setWorkingHoursSelect] = useState(8);
  const [endHourSelect, setEndHourSelect] = useState(16);
  const [modificationsPending, setModificationsPending] = useState(false);
  const [startHourSelect, setStartHourSelect] = useState(8);

  useEffect(() => {
    console.log(currentSelectionDate);
  }, [currentSelectionDate]);

  const dispatch = useDispatch();

  /**
   * ensures concordance between working hours and so on
   *
   * @param data
   */
  const handleWorkingHoursChange = (data) => {
    setWorkingHoursSelect(data);
    setEndHourSelect(Number(data) + Number(startHourSelect));
  };

  /**
   * ensures concordance between working hours and so on
   *
   * @param data
   */
  const handleStartHourChange = (data) => {
    setStartHourSelect(data);
    setWorkingHoursSelect(Number(endHourSelect) - Number(data));
  };

  /**
   * ensures concordance between working hours and so on
   *
   * @param data
   */
  const handleEndHourChange = (data) => {
    setEndHourSelect(data);
    setWorkingHoursSelect(Number(data) - Number(startHourSelect));
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
    const timeOptions = [
      { value: 7, label: "7:00" },
      { value: 8, label: "8:00" },
      { value: 9, label: "9:00" },
      { value: 10, label: "10:00" },
      { value: 11, label: "11:00" },
      { value: 12, label: "12:00" },
      { value: 13, label: "13:00" },
      { value: 14, label: "14:00" },
      { value: 15, label: "15:00" },
      { value: 16, label: "16:00" },
      { value: 17, label: "17:00" },
      { value: 18, label: "18:00" },
    ];

    return (
      <CustomDropdown
        options={timeOptions}
        value={currentSelectionDate.startHour || startHourSelect}
        sendSelectedOption={(option) => handleStartHourChange(option)}
      />
    );
  }

  /**
   * end hours selection
   *
   * @return {Element}
   */
  function EndHours() {
    const timeOptions = [
      { value: 7, label: "7:00" },
      { value: 8, label: "8:00" },
      { value: 9, label: "9:00" },
      { value: 10, label: "10:00" },
      { value: 11, label: "11:00" },
      { value: 12, label: "12:00" },
      { value: 13, label: "13:00" },
      { value: 14, label: "14:00" },
      { value: 15, label: "15:00" },
      { value: 16, label: "16:00" },
      { value: 17, label: "17:00" },
      { value: 18, label: "18:00" },
    ];

    return (
      <CustomDropdown
        options={timeOptions}
        value={currentSelectionDate.endHour || endHourSelect}
        sendSelectedOption={(option) => handleEndHourChange(option)}
      />
    );
  }

  function WorkingHours() {
    const singleDigitOptions = [
      { value: 1, label: "1" },
      { value: 2, label: "2" },
      { value: 3, label: "3" },
      { value: 4, label: "4" },
      { value: 5, label: "5" },
      { value: 6, label: "6" },
      { value: 7, label: "7" },
      { value: 8, label: "8" },
      { value: 9, label: "9" },
      { value: 10, label: "10" },
      { value: 11, label: "11" },
      { value: 12, label: "12" },
      { value: 13, label: "13" },
      { value: 14, label: "14" },
      { value: 15, label: "15" },
    ];

    return (
      <div className={style.flex}>
        <h3> Ore de munca : </h3>
        <CustomDropdown
          options={singleDigitOptions}
          value={currentSelectionDate.workingHours || workingHoursSelect}
          sendSelectedOption={(option) => handleWorkingHoursChange(option)}
        />
      </div>
    );
  }

  function StatusDropDown() {
    const optionsDisponibilitate = [
      { value: "WORKING", label: "Disponibil" },
      { value: "CLOSED", label: "Inchis" },
      { value: "VACATION", label: "Concediu" },
    ];

    return (
      <div>
        <h3>Disponibilitatea :</h3>
        <CustomDropdown
          placeholder="Neselectat"
          options={optionsDisponibilitate}
          value={currentSelectionDate.workingStatus || selectedStatus}
          sendSelectedOption={(option) => setSelectedStatus(option)}
        />
      </div>
    );
  }

  function StartEndHours() {
    return (
      <div>
        <h3>Program : </h3>
        <div className={style.flexRow}>
          <StartHours /> <h4>:</h4> <EndHours />
        </div>
      </div>
    );
  }

  const monthDays = useSelector((state) => state.monthDays.monthDays);

  const setScheduleForDay = async () => {
    await postDayData(
      currentSelectionDate,
      workingHoursSelect,
      startHourSelect,
      endHourSelect,
      selectedStatus,
    ).then(() => {
      setWorkingHoursSelect(8);
      setStartHourSelect(8);
      setEndHourSelect(16);
      const datToBeUpdated = {
        dayNumber: currentSelectionDate.dayNumber,
        monthNumber: currentSelectionDate.monthNumber,
        fullYear: currentSelectionDate.fullYear,
        workingStatus: selectedStatus,
        workingHours: workingHoursSelect,
        startHour: startHourSelect,
        endHour: endHourSelect,
      };

      dispatch(updateMonthDay(datToBeUpdated));
    });
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
          backgroundColor={"#1888ff"}
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
