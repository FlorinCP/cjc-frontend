import React, { useContext, useEffect, useState } from "react";
import style from "./Schedule.module.css";
import { getDayData, postDayData, updateDayData } from "../../services/day_api";
import { useDispatch, useSelector } from "react-redux";
import { useFillTime } from "../../hooks/useFillTime";
import { setDayData } from "../../features/sharedWeekSlice";
import ResponsiveDatePicker from "../../components/ResponsiveDatePicker/ResponsiveDatePicker";
import ActionButton from "../../components/ActionButton/ActionButton";

function Schedule(props) {
  const [currentSelectionDate, setCurrentSelectionDate] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [selectedStatus, setSelectedStatus] = useState("WORKING");
  const [workingHoursSelect, setWorkingHoursSelect] = useState(8);
  const [startHourSelect, setStartHourSelect] = useState(8);
  const [endHourSelect, setEndHourSelect] = useState(16);
  const [modificationsPending, setModificationsPending] = useState(false);

  const { timeList } = useFillTime();

  const selectedDayRedux = useSelector(
    (state) => state.sharedSelectedDay.value,
  );

  /**
   *
   * Aici verificam daca exista sau nu un program pentru ziua respectiva
   */
  useEffect(() => {
    if (selectedDayRedux.day) {
      getDayData(selectedDayRedux.day).then((r) => {
        if (r.id === null) {
          setSelectedDay(null);
          setCurrentSelectionDate(selectedDayRedux.day);
        } else {
          setSelectedDay(r);
        }
      });
    }
  }, [selectedDayRedux]);

  /**
   * submits changes from an unset day
   *
   * @return {Promise<void>}
   */
  const submitChanges = async () => {
    await updateDayData(
      selectedDay.id,
      workingHoursSelect,
      startHourSelect,
      endHourSelect,
      selectedStatus,
    );
    await getDayData(selectedDayRedux.day).then((r) => {
      dispatch(
        setDayData({ dayName: getDayName(selectedDayRedux.weekday), data: r }),
      );
    });
    setSelectedDay(await getDayData(currentSelectionDate));
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
   * info about the selected day
   *
   * @return {Element}
   */
  function selectionInfo() {
    return (
      <div className={style.selection}>
        <h2>{selectedDayRedux.day.dayNumber} -</h2>
        <h2>{selectedDayRedux.day.monthNumber} -</h2>
        <h2>{selectedDayRedux.day.year}</h2>
      </div>
    );
  }

  /**
   * start hour selection
   *
   * @return {Element}
   */
  function startHours() {
    return (
      <select value={startHourSelect} onChange={handleStartHourChange}>
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
  function endHours() {
    return (
      <select value={endHourSelect} onChange={handleEndHourChange}>
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

  function startEndHours() {
    return (
      <div>
        <h3>Program : </h3>
        {startHours()} {endHours()}
      </div>
    );
  }

  const weekData = useSelector((state) => state.sharedWeek);

  const dispatch = useDispatch();

  /**
   *
   * Sets a default schedule for a day
   *
   * @return {Promise<void>}
   */
  const setScheduleForDay = async () => {
    await postDayData(
      currentSelectionDate,
      workingHoursSelect,
      startHourSelect,
      endHourSelect,
      selectedStatus,
    );
    getDayData(selectedDayRedux.day).then((r) => {
      dispatch(
        setDayData({ dayName: getDayName(selectedDayRedux.weekday), data: r }),
      );
    });
  };

  /**
   * function used for getting day name
   *
   * @param index
   * @return {string}
   */
  function getDayName(index) {
    switch (index) {
      case 0:
        return "monday";
      case 1:
        return "tuesday";
      case 2:
        return "wenesday";
      case 3:
        return "thursday";
      case 4:
        return "friday";
      case 5:
        return "saturday";
      case 6:
        return "sunday";
    }
  }

  const handleSelectedDays = (date) => {
    setCurrentSelectionDate(date);
  };

  return (
    <div className={style.mainContainer}>
      <div className={style.header}>
        <p>Modifica programul</p>
      </div>

      <div className={style.body}>
        <div className={style.datePickerWrapper}>
          <ResponsiveDatePicker
            sendSelectedDate={(date) => handleSelectedDays(date)}
          />
        </div>

        {currentSelectionDate && (
          <div className={style.dateInfo}>
            <div className={style.buttons}>
              <p className={style.selectedDay}>
                <span className="material-symbols-outlined">
                  calendar_today
                </span>
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
                <span className="material-symbols-outlined">
                  event_available
                </span>
              </ActionButton>
            </div>

            <div className={style.settings}>
              <div>
                <h3>Disponibilitatea :</h3>

                <select
                  value={selectedStatus}
                  onChange={handleStatusDropdownChange}
                >
                  <option value="CLOSED">Inchis</option>
                  <option value="VACATION">Concediu</option>
                  <option value="HOLIDAY">Sarbatoare Legala</option>
                  <option value="WORKING">Disponibil</option>
                </select>
              </div>

              <div className={style.flex}>
                <h4> Ore de munca : </h4>
                <select
                  value={workingHoursSelect}
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
              {startEndHours()}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Schedule;
