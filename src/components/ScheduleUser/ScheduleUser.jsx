import React, { useContext, useEffect, useState } from "react";
import style from "./ScheduleUser.module.css";
import DatePicker from "../../components/DatePicker/DatePicker";
import { getDayData, postDayData, updateDayData } from "../../services/day_api";
import { makeAppointment } from "../../services/appointment_api";
import UserContext from "../../context/UserContext";

function ScheduleUser(props) {
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
    console.log(newTimeList);
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
    } else {
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
      props.id,
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
      props.id,
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
      props.id,
      selectedDay.dayNumber,
      selectedDay.monthNumber,
      selectedDay.year,
      "BREAK",
    );
  };

  function mockTime() {
    const time = [];
    for (let i = 0; i < 16; i++) {
      time.push(<div className={style.timeStamp} key={i}></div>);
    }
    return time;
  }

  function mockSlots() {
    const slots = [];
    for (let i = 0; i < 16; i++) {
      slots.push(<div className={style.freeSlot}></div>);
    }
    return slots;
  }

  function timeRepresentation(){
    return(
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
                    className={getClassForSlot(index)}
                    key={index}
                    onClick={() => selectSlot(index)}
                >
                  {getContentForSlot(index)}
                </div>
            ))}
          </div>
        </div>
    )
  }

  function mockTimeRepresentation(){
    return(
        <div className={style.timeRepresentation}>
          <div className={style.timeStamps}>
            {mockTime()}
          </div>
          <div className={style.slots}>
            {mockSlots()}
          </div>

        </div>
    )
  }

  function slotInfo(){
    return(
        <div className={style.slotInfo}>
          {appointmentDetails ? (
              <>
                {currentUser.role === "ADMIN" ? (
                    <>
                      <div className={style.infoHeader}>
                        <h3>{appointmentDetails.startHour}</h3>
                      </div>
                      <div className={style.infoBody}>
                        <button
                            onClick={freeAppointment}
                            className={style.selectBtn}
                        >
                          Marcheaza ca si liber
                        </button>
                        <button
                            onClick={breakAppointment}
                            className={style.selectBtn}
                        >
                          Marcheaza ca si ocupat
                        </button>
                        <button
                            onClick={setAppointment}
                            className={style.selectBtn}
                        >
                          Programeaza-te
                        </button>
                      </div>
                    </>
                ) : (
                    <>
                      <div className={style.infoHeader}>
                        <h3>{appointmentDetails.startHour}</h3>
                      </div>
                      <div className={style.infoBody}>
                        <button
                            onClick={setAppointment}
                            className={style.selectBtn}
                        >
                          Programeaza-te
                        </button>
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
    )
  }

  function mockSlotInfo(){
    return(
        <div className={style.slotInfo}>
          <h2>Zi libera </h2>
        </div>
    )
  }

  function expandedSchedule() {
    return (
      <>
        {selectedDay && !closedDays.includes(selectedDay.dayNumber) ? (
          <div className={style.dateDetails}>

            {timeRepresentation()}

            {slotInfo()}
          </div>
        ) : (

            <div className={style.dateDetails}>

              {mockTimeRepresentation()}

              {mockSlotInfo()}
            </div>
        )}
      </>
    );
  }

  const sendCloseModal = () => {
    props.sendDataToParent();
  };

  const [closedDays, setClosedDays] = useState([]);

  const handleClosedDays = (receivedClosedDays) => {
    setClosedDays(receivedClosedDays);
  };

  return (
    <div className={style.wrapper}>
      <div>
        <button className={style.closeModal} onClick={sendCloseModal}>
          <span className="material-symbols-outlined">close</span>
        </button>
        <h2 className={style.h2info}>Programare Consultatie</h2>
        <h3 className={style.h2info}>
          Pentru a efectua o programare , selectati o data si verificati
          disponibilitatea acesteia
        </h3>
        <h3 className={style.h2info}>
          Dupa selectia zilei dorite in partea drepta puteti verifica
          disponibilitatea intervalului orar favorabil dumneavoastra
        </h3>
        <div className={style.datePickerWrapper}>
          <DatePicker
            sendSelectedDate={handleSelectedDate}
            sendClosedDays={handleClosedDays}
          />
        </div>
      </div>
      {expandedSchedule()}
    </div>
  );
}

export default ScheduleUser;
