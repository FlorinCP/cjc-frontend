import React, { useEffect, useState } from "react";
import style from "./Schedule.module.css";
import DatePicker from "../../components/DatePicker/DatePicker";
import { getDayData, postDayData, updateDayData } from "../../services/day_api";

function Schedule(props) {
  const [currentSelectionDate, setCurrentSelectionDate] = useState();
  const [selectedDay, setSelectedDay] = useState();

  const handleSelectedDate = async (data) => {
    if (data !== undefined) {
      console.log(data);
      setCurrentSelectionDate(data);
      setSelectedDay(await getDayData(data));
    }
  };

  const submitChanges = async () => {
    await updateDayData(
      selectedDay.id,
      workingHoursSelect,
      startHourSelect,
      endHourSelect,
      selectedStatus,
    );
    setSelectedDay(await getDayData(currentSelectionDate));
  };

  useEffect(() => {
    if (selectedDay) {
      setWorkingHoursSelect(selectedDay.workingHours);
      setSelectedStatus(selectedDay.workingStatus);
      setStartHourSelect(selectedDay.startHour);
      setEndHourSelect(selectedDay.endHour);
    }
  }, [selectedDay]);

  const setScheduleForDay = async () => {
    await postDayData(currentSelectionDate);
    setSelectedDay(await getDayData(currentSelectionDate));
  };

  const [selectedStatus, setSelectedStatus] = useState();
  const [workingHoursSelect, setWorkingHoursSelect] = useState();
  const [startHourSelect, setStartHourSelect] = useState();
  const [endHourSelect, setEndHourSelect] = useState();
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
  };

  const handleStartHourChange = (event) => {
    setStartHourSelect(event.target.value);
  };

  const handleEndHourChange = (event) => {
    setEndHourSelect(event.target.value);
  };

  const timeList = []

  return (
    <div className={style.wrapper}>
      <h2>Program</h2>
      <DatePicker sendSelectedDate={handleSelectedDate} />

      {selectedDay ? (
        <div className={style.dateProperties}>
          <div className={style.selection}>
            <h2>{selectedDay.dayNumber} -</h2>
            <h2>{selectedDay.monthNumber} -</h2>
            <h2>{selectedDay.year}</h2>
          </div>

          <div className={style.workingArea}>

            <div className={style.flex}>
            <h4> Cate ore alocam zilei ?  </h4>
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

         </div>

            <h3>Disponibilitatea zilei :</h3>
            <select value={selectedStatus} onChange={handleDropdownChange}>
              <option value="CLOSED">Inchis</option>
              <option value="VACATION">Concediu</option>
              <option value="HOLIDAY">Sarbatoare Legala</option>
              <option value="WORKING">Disponibil</option>
            </select>

            {modificationsPending ? (
              <button onClick={submitChanges}>Salveaza Modificarile</button>
            ) : (
              <></>
            )}
          </div>
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
              <button onClick={setScheduleForDay}> Adauga program </button>
            </div>
          ) : (
            <div className={style.dateInfo}>
              <h3>Pentru detalii, selecteaza o zi</h3>
            </div>
          )}
        </>
      )}


      <div className={style.dateProperties}>

      </div>


    </div>
  );
}

export default Schedule;
