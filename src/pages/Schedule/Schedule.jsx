import React, { useContext, useEffect, useState } from "react";
import style from "./Schedule.module.css";
import DatePicker from "../../components/DatePicker/DatePicker";
import { getDayData, postDayData, updateDayData } from "../../services/day_api";
import { makeAppointment } from "../../services/appointment_api";
import Footer from "../../components/Footer/Footer";
import UserContext from "../../context/UserContext";

function Schedule(props) {
  const [currentSelectionDate, setCurrentSelectionDate] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [dayAppointments, setDayAppointments] = useState(null);
  const { currentUser, updateCurrentUser } = useContext(UserContext);

  const handleSelectedDate = async (data) => {
    if (data !== undefined) {
      console.log(data);
      setCurrentSelectionDate(data);
      setSelectedDay(await getDayData(data));
    }
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
    setSelectedDay(await getDayData(currentSelectionDate));
  };

  useEffect(() => {
    if (selectedDay) {
      setWorkingHoursSelect(selectedDay.workingHours);
      setSelectedStatus(selectedDay.workingStatus);
      setStartHourSelect(selectedDay.startHour);
      setEndHourSelect(selectedDay.endHour);
      fillTime();
      fillSlots();
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

  const [timeList, setTimeList] = useState([]);
  const [slotList, setSlotList] = useState([]);

  function fillTime() {
    let firstHour = selectedDay.startHour;
    const newTimeList = [];

    for (let i = 0; i < selectedDay.workingHours * 2; i++) {
      const isEven = i % 2 === 0;
      const formattedHour = isEven ? `${firstHour}:00` : `${firstHour}:30`;

      newTimeList.push({ formattedHour });

      if (!isEven) {
        firstHour++;
      }
    }

    setTimeList(newTimeList);
  }

  function fillSlots() {
    let firstHour = selectedDay.startHour;
    const newSlotList = [];

    for (let index = 0; index < selectedDay.workingHours * 2; index++) {
      newSlotList.push({});

      firstHour++;
    }

    setSlotList(newSlotList);
  }

  const [selectedSlot, setSelectedSlot] = useState(null);

  const selectSlot = (index) => {
    setSelectedSlot(index);
    setAppointmentDetails({
      startHour: timeList[index].formattedHour,
    });
  };

  // const isBooked = (index) =>  dayAppointments.every(slot => slot.startHour.includes(timeList[index].formattedHour))

  const isBooked = (index) => {
    let isFound = false;
    for (let appointment of dayAppointments) {
      if (
        appointment.startHour.includes(timeList[index].formattedHour) &&
        appointment.slotStatus.includes("OCCUPIED")
      ) {
        isFound = true;
      }
    }
    return isFound;
  };

  const isFree = (index) => {
    let isFound = false;
    for (let appointment of dayAppointments) {
      if (
        appointment.startHour.includes(timeList[index].formattedHour) &&
        appointment.slotStatus.includes("FREE")
      ) {
        isFound = true;
      }
    }
    return isFound;
  };

  const isBreak = (index) => {
    let isFound = false;
    for (let appointment of dayAppointments) {
      if (
        appointment.startHour.includes(timeList[index].formattedHour) &&
        appointment.slotStatus.includes("BREAK")
      ) {
        isFound = true;
      }
    }
    return isFound;
  };

  const [followingSlot, setFollowingSlot] = useState(null);
  const selectFollowingSlot = (index) => {
    if (selectedSlot) {
      setFollowingSlot(index);
      console.log(index);
    }
  };

  function getContentForSlot(index) {
    if (isBooked(index)) {
      return `Ocupat`;
    }
    if (isBreak(index)) {
      return `Pauza`;
    } else {
      return `Liber`;
    }
  }

  function getClassForSlot(index) {
    if (selectedSlot === index) {
      return style.selectedSlot;
    } else if (isBooked(index)) {
      return style.occupiedSlot;
    } else if (isBreak(index)) {
      return style.breakSlot;
    }

    // if (isFree(index)){
    //
    // }
    // } else if(followingSlot === index) {
    //   return style.selectedSlot
    // }
    else {
      return style.freeSlot;
    }
  }

  useEffect(() => {
    console.log(selectedSlot);
  }, [selectedSlot]);

  const [appointmentDetails, setAppointmentDetails] = useState(null);

  const setAppointment = async () => {
    await makeAppointment(
      appointmentDetails.startHour,
      timeList[selectedSlot + 1].formattedHour,
      localStorage.getItem("email"),
      3,
      selectedDay.dayNumber,
      selectedDay.monthNumber,
      selectedDay.year,
      "OCCUPIED",
    );
  };

  const freeAppointment = async () => {
    await makeAppointment(
      appointmentDetails.startHour,
      timeList[selectedSlot + 1].formattedHour,
      localStorage.getItem("email"),
      3,
      selectedDay.dayNumber,
      selectedDay.monthNumber,
      selectedDay.year,
      "FREE",
    );
  };

  const breakAppointment = async () => {
    await makeAppointment(
      appointmentDetails.startHour,
      timeList[selectedSlot + 1].formattedHour,
      localStorage.getItem("email"),
      3,
      selectedDay.dayNumber,
      selectedDay.monthNumber,
      selectedDay.year,
      "BREAK",
    );
  };

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

      {selectedDay && (
        <div className={style.dateDetails}>
          <div className={style.timeRepresentation}>
            <div className={style.timeStamps}>
              {timeList.map((item, index) => (
                <div className={style.timeStamp} key={index}>
                  {item.formattedHour}
                </div>
              ))}
            </div>
            <div className={style.slots}>
              {slotList.map((item, index) => (
                <div
                  className={
                    getClassForSlot(index)
                    // selectedSlot === index ? style.selectedSlot : style.slot
                  }
                  key={index}
                  onClick={() => selectSlot(index)}
                  // onMouseEnter={()=> selectFollowingSlot(index)}
                >
                  {getContentForSlot(index)}
                </div>
              ))}
            </div>
          </div>

          <div className={style.slotInfo}>
            {appointmentDetails ? (
              <>
                {currentUser.role === "ADMIN" ? (
                  <>
                    <div className={style.infoHeader}>
                      <h3>{appointmentDetails.startHour}</h3>
                    </div>
                    <div className={style.infoBody}>
                      <button onClick={freeAppointment}>
                        Marcheaza ca si liber
                      </button>
                      <button onClick={breakAppointment}>
                        Marcheaza ca si ocupat
                      </button>
                      <button onClick={setAppointment}>Programeaza-te</button>
                    </div>
                  </>
                ) : (
                  <>
                    <div className={style.infoHeader}>
                      <h3>{appointmentDetails.startHour}</h3>
                    </div>
                    <div className={style.infoBody}>
                      <button onClick={setAppointment}>Programeaza-te</button>
                    </div>
                  </>
                )}
              </>
            ) : (
              <div className={style.flex}>
                <h2>Selectati un interval pentru detalii</h2>
              </div>
            )}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}

export default Schedule;
