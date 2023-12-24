import style from "./MakeAppointment.module.css";
import ActionButton from "../ActionButton/ActionButton";
import React from "react";
import {makeAppointment} from "../../services/appointment_api";
import useDatePicker from "../../hooks/useDatePicker";

function AddApointmentCard({globalSelectedSlot, question}){


    function getNextSlot(globalSelectedSlot) {
        const slots = globalSelectedSlot.day.slots;
        const currentSlotIndex = slots.findIndex(
            (slot) => slot === globalSelectedSlot.slot,
        );

        if (currentSlotIndex >= 0 && currentSlotIndex < slots.length - 1) {
            return slots[currentSlotIndex + 1];
        } else {
            return null;
        }
    }

    const { getMonthName, getWeekdayName ,decimalHoursToTime} = useDatePicker();


    async function sendAppointment() {

        await makeAppointment(globalSelectedSlot.slot, getNextSlot(globalSelectedSlot), question.email, question.id, globalSelectedSlot.day.dayNumber, globalSelectedSlot.day.monthNumber, globalSelectedSlot.day.fullYear, "OCCUPIED");
    }

    return(
        <div className={style.makeAppointment}>
            <h2 className={style.titlu}>Adauga o programare</h2>
            {globalSelectedSlot.slot ? (
                <div className={style.dayInfo}>
                    <p className={style.info}>
                        <span className="material-symbols-outlined">event</span>{" "}
                        {globalSelectedSlot.day.dayNumber}{" "}
                        {getMonthName(
                            globalSelectedSlot.day.monthNumber,
                            "ro-RO",
                            "long",
                        )}{" "}
                        {globalSelectedSlot.day.fullYear}{" "}
                    </p>
                    <p className={style.info}>
                        <span className="material-symbols-outlined">schedule</span>
                        {decimalHoursToTime(globalSelectedSlot.slot)} :{" "}
                        {decimalHoursToTime(getNextSlot(globalSelectedSlot))}
                    </p>
                </div>
            ) : (
                <p className={style.info}>
                    {" "}
                    Selecteaza un spatiu disponibil din calendar.
                </p>
            )}
            <div>
                <ActionButton
                    text={"Confirma"}
                    color={"white"}
                    active={!!globalSelectedSlot.slot}
                    backgroundColor={"#1888ff"}
                    onClick={() => {
                        sendAppointment();
                    }}
                >
                    <span className="material-symbols-outlined">task_alt</span>
                </ActionButton>
            </div>
        </div>
    )
}

export default AddApointmentCard;
