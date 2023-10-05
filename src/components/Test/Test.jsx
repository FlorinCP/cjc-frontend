import React, {useContext, useState} from 'react';
import style from "./Test.module.css"
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import Calendar from "../Calendar/Calendar";
import {getDayData} from "../../services/day_api";
import UserContext from "../../context/UserContext";

function Test() {

    const [currentSelectionDate, setCurrentSelectionDate] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [dayAppointments, setDayAppointments] = useState(null);
    const { currentUser, updateCurrentUser } = useContext(UserContext);
    const [closedDays,setClosedDays] = useState([])

    const images = [
        "/how.svg",
        '/how.svg',
        '/eroare.svg',
        // Add more image URLs here
    ];

    const handleSelectedDate = async (data) => {
        if (data !== undefined) {
            console.log(data);
            setCurrentSelectionDate(data);
            setSelectedDay(await getDayData(data));
        }
    };

    const handleClosedDays = (receivedClosedDays) =>{
        setClosedDays(receivedClosedDays)
    }

    return (
        <div className={style.testWrapper}>
        <Calendar
            sendSelectedDate={handleSelectedDate}
            sendClosedDays={handleClosedDays}
        />
        </div>
    );
}

export default Test;