import React, { useContext, useEffect, useState } from "react";
import style from "./Schedule.module.css";
import DatePicker from "../../components/DatePicker/DatePicker";
import { getDayData, postDayData, updateDayData } from "../../services/day_api";
import { makeAppointment } from "../../services/appointment_api";
import UserContext from "../../context/UserContext";
import { useDispatch, useSelector } from "react-redux";
import { useFillTime } from "../../hooks/useFillTime";
import { setDayData, setWeekData } from "../../features/sharedWeekSlice";

function Schedule(props) {
  const [currentSelectionDate, setCurrentSelectionDate] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [dayAppointments, setDayAppointments] = useState(null);
  const { currentUser, updateCurrentUser } = useContext(UserContext);
  const [closedDays, setClosedDays] = useState([]);
  const { timeList } = useFillTime();

  const selectedDayRedux = useSelector(
    (state) => state.sharedSelectedDay.value,
  );

  /**
   *
   * Aici verificam daca exista sau nu un program pentru ziua respectiva
   *
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

  const handleClosedDays = (receivedClosedDays) => {
    setClosedDays(receivedClosedDays);
  };

  useEffect(() => {
    if (selectedDay) {
      setDayAppointments(selectedDay.appointments);
      console.log(selectedDay.appointments);
    }
  }, [selectedDay]);

  const submitChanges = async () => {
    await updateDayData(
      selectedDay.id,
      workingHoursSelect,
      startHourSelect,
      endHourSelect,
      selectedStatus,
    );
    await getDayData(selectedDayRedux.day).then((r) => {
      dispatch(setDayData({ dayName: getDayName(selectedDayRedux.weekday), data: r }));
    });
    setSelectedDay(await getDayData(currentSelectionDate));
  };

  const [selectedStatus, setSelectedStatus] = useState("WORKING");
  const [workingHoursSelect, setWorkingHoursSelect] = useState(8);
  const [startHourSelect, setStartHourSelect] = useState(8);
  const [endHourSelect, setEndHourSelect] = useState(16);
  const [modificationsPending, setModificationsPending] = useState(false);

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

  useEffect(() => {
    if (selectedDay) {
      changeModificationStatus();
    }
  }, [selectedStatus, workingHoursSelect, startHourSelect, endHourSelect]);

  const handleDropdownChange = (event) => {
    setSelectedStatus(event.target.value);
  };

  const handleWorkingHoursChange = (event) => {
    setWorkingHoursSelect(event.target.value);
    setEndHourSelect(Number(event.target.value) + Number(startHourSelect));
  };

  const handleStartHourChange = (event) => {
    setStartHourSelect(event.target.value);
    setWorkingHoursSelect(Number(endHourSelect) - Number(event.target.value));
  };

  const handleEndHourChange = (event) => {
    setEndHourSelect(event.target.value);
    setWorkingHoursSelect(Number(event.target.value) - Number(startHourSelect));
  };

  // const setAppointment = async () => {
  //   await makeAppointment(
  //     appointmentDetails.startHour,
  //     timeList[selectedSlot + 1].formattedHour,
  //     localStorage.getItem("email"),
  //     3,
  //     selectedDay.dayNumber,
  //     selectedDay.monthNumber,
  //     selectedDay.year,
  //     "OCCUPIED",
  //   );
  // };
  //
  // const freeAppointment = async () => {
  //   await makeAppointment(
  //     appointmentDetails.startHour,
  //     timeList[selectedSlot + 1].formattedHour,
  //     localStorage.getItem("email"),
  //     3,
  //     selectedDay.dayNumber,
  //     selectedDay.monthNumber,
  //     selectedDay.year,
  //     "FREE",
  //   );
  // };
  //
  // const breakAppointment = async () => {
  //   await makeAppointment(
  //     appointmentDetails.startHour,
  //     timeList[selectedSlot + 1].formattedHour,
  //     localStorage.getItem("email"),
  //     3,
  //     selectedDay.dayNumber,
  //     selectedDay.monthNumber,
  //     selectedDay.year,
  //     "BREAK",
  //   );
  // };

  function selectionInfo() {
    return (
      <div className={style.selection}>
        <h2>{selectedDayRedux.day.dayNumber} -</h2>
        <h2>{selectedDayRedux.day.monthNumber} -</h2>
        <h2>{selectedDayRedux.day.year}</h2>
      </div>
    );
  }

  function workingHours() {
    return (
      <div className={style.flex}>
        <h4> Cate ore alocam zilei ? </h4>
        <select value={workingHoursSelect} onChange={handleWorkingHoursChange}>
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

  function startHours() {
    return (
      <div className={style.flex}>
        <h4> Inceputul programului</h4>
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
      </div>
    );
  }

  function endHours() {
    return (
      <div className={style.flex}>
        <h4> Finalul programului</h4>
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
      </div>
    );
  }

  function dayDispo() {
    return (
      <select value={selectedStatus} onChange={handleDropdownChange}>
        <option value="CLOSED">Inchis</option>
        <option value="VACATION">Concediu</option>
        <option value="HOLIDAY">Sarbatoare Legala</option>
        <option value="WORKING">Disponibil</option>
      </select>
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
      dispatch(setDayData({ dayName: getDayName(selectedDayRedux.weekday), data: r }));
    });
  };

  function getDayName(index){
    switch (index){
      case 0:
        return "monday"
      case 1:
        return "tuesday"
      case 2:
        return "wenesday"
      case 3:
        return "thursday"
      case 4:
        return "friday"
      case 5:
        return "saturday"
      case 6:
        return "sunday"
    }
  }

  function infoPanel() {
    return (
      <div>
        {selectedDayRedux.day && selectedDay ? (
          <div className={style.dateProperties}>
            {selectionInfo()}

            {workingHours()}

            {startHours()}

            {endHours()}

            <h3>Disponibilitatea zilei :</h3>
            {dayDispo()}

            {modificationsPending ? (
              <button onClick={submitChanges} className={style.selectBtn}>
                Salveaza Modificarile
              </button>
            ) : (
              <></>
            )}
          </div>
        ) : (
          <>
            {currentSelectionDate ? (
              <div className={style.dateInfo}>
                <div className={style.selection}>
                  <h2>{currentSelectionDate.dayNumber} -</h2>
                  <h2>{currentSelectionDate.monthNumber} -</h2>
                  <h2>{currentSelectionDate.year}</h2>
                </div>
                <h3>Nu am gasit nici un program pentru ziua selectata</h3>
                <div className={style.workingArea}>
                  <div className={style.flex}>
                    <h4> Cate ore alocam zilei ? </h4>
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
                    </select>
                  </div>

                  <div className={style.startend}>
                    <div className={style.flex}>
                      <h4> Inceputul programului</h4>
                      <select
                        value={startHourSelect}
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
                    </div>

                    <div className={style.flex}>
                      <h4> Finalul programului</h4>
                      <select
                        value={endHourSelect}
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
                    </div>
                  </div>

                  <h3>Disponibilitatea zilei :</h3>
                  <select
                    value={selectedStatus}
                    onChange={handleDropdownChange}
                  >
                    <option value="CLOSED">Inchis</option>
                    <option value="VACATION">Concediu</option>
                    <option value="HOLIDAY">Sarbatoare Legala</option>
                    <option value="WORKING">Disponibil</option>
                  </select>
                </div>
                <button onClick={setScheduleForDay} className={style.selectBtn}>
                  {" "}
                  Adauga program{" "}
                </button>
              </div>
            ) : (
              <div className={style.dateInfo}>
                <h3>Pentru detalii, selecteaza o zi</h3>
              </div>
            )}
          </>
        )}
      </div>
    );
  }

  return <div>{infoPanel()}</div>;
}

export default Schedule;
