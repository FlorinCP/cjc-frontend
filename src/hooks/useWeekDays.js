import {useEffect, useState} from "react";
import {getDayData} from "../services/day_api";
import {useCalendar} from "./useCalendar";

export function useWeekDays(){

    const { displayedWeek} = useCalendar();
    console.log(displayedWeek)
    const [monday, setMonday] = useState([]);
    const [tuesday, setTuesday] = useState([]);
    const [wenesday, setWenesday] = useState([]);
    const [thursday, setThursday] = useState([]);
    const [friday, setFriday] = useState([]);
    const [saturnday, setSaturnday] = useState([]);
    const [sunday, setSunday] = useState([]);

    useEffect(() => {
        console.log(monday)
    }, [monday]);

    useEffect(() => {
        if (displayedWeek) {
            displayedWeek.map((value, index) => {
                const currentDate = {
                    monthNumber: value.getMonth() + 1,
                    dayNumber: value.getDate(),
                    year: value.getFullYear(),
                };
                getDayData(currentDate).then((r) => {
                    setWeekDay(index, r);
                });
            });
        }
    }, [displayedWeek]);

    function setWeekDay(index, r) {
        switch (index) {
            case 0:
                setMonday(r);
                break;
            case 1:
                setTuesday(r);
                break;
            case 2:
                setWenesday(r);
                break;
            case 3:
                setThursday(r);
                break;
            case 4:
                setFriday(r);
                break;
            case 5:
                setSaturnday(r);
                break;
            case 6:
                setSunday(r);
                break;
        }
    }

    return { monday, tuesday , wenesday ,thursday , friday ,saturnday, sunday}

}