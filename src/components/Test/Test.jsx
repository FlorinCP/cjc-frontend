import React, {useContext, useState} from 'react';
import style from "./Test.module.css"
import ImageCarousel from "../ImageCarousel/ImageCarousel";
import Calendar from "../Calendar/Calendar";
import {getDayData} from "../../services/day_api";
import UserContext from "../../context/UserContext";
import ContextMenu from "../ContextMenu/ContextMenu";

function Test() {

    const [currentSelectionDate, setCurrentSelectionDate] = useState();
    const [selectedDay, setSelectedDay] = useState();
    const [dayAppointments, setDayAppointments] = useState(null);
    const { currentUser, updateCurrentUser } = useContext(UserContext);
    const [closedDays,setClosedDays] = useState([])

    const menuItems = ["Liber", "Ocupat", "Pauza"];
    const [itemClicked, setItemClicked] = useState("");
    const [count, setCount] = useState(0);
    function onMenuClicked(menuItemClicked) {
        setItemClicked(menuItemClicked);
    }


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
            <ContextMenu menuItems={menuItems} clickedMenu={onMenuClicked} />
        <Calendar
            sendSelectedDate={handleSelectedDate}
            sendClosedDays={handleClosedDays}
        />
        </div>
    );
}

export default Test;