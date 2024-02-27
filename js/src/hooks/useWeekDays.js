import {useEffect, useState} from "react";
import {getDayData} from "../services/day_api";
import {useMonthDays} from "./useMonthDays";
import {useDispatch} from "react-redux";
import {setDisplayedWeekValue} from "../features/old/sharedDisplayedWeekSlice";
import {setWeekData} from "../features/old/sharedWeekSlice";

export function useWeekDays(){

    const {navigationArray} = useMonthDays()

    console.log(navigationArray)

    const [week, setWeek] = useState({
        monday: [],
        tuesday: [],
        wenesday: [],
        thursday: [],
        friday: [],
        saturnday: [],
        sunday: [],
    });

    useEffect(() => {
        if (navigationArray) {
            navigationArray.map((value, index) => {
                getDayData(value).then((r) => {
                    setWeekDay(index, r);
                });
            });
        }
    }, [navigationArray]);

    /**
     * this function assigns the received r param to the right weekDay
     *
     * @param index
     * @param r
     */
    function setWeekDay(index, r) {
        switch (index) {
            case 0:
                setWeek((prevWeek) => ({
                    ...prevWeek,
                    monday: r,
                }));
                break;
            case 1:
                setWeek((prevWeek) => ({
                    ...prevWeek,
                    tuesday: r,
                }));
                break;
            case 2:
                setWeek((prevWeek) => ({
                    ...prevWeek,
                    wenesday: r,
                }));
                break;
            case 3:
                setWeek((prevWeek) => ({
                    ...prevWeek,
                    thursday: r,
                }));
                break;
            case 4:
                setWeek((prevWeek) => ({
                    ...prevWeek,
                    friday: r,
                }));
                break;
            case 5:
                setWeek((prevWeek) => ({
                    ...prevWeek,
                    saturnday: r,
                }));
                break;
            case 6:
                setWeek((prevWeek) => ({
                    ...prevWeek,
                    sunday: r,
                }));
                break;
        }
    }

    /**
     * This section updates the state based on the actions
     *
     * @type {Dispatch<AnyAction>}
     */

    const dispatch = useDispatch();

    useEffect(() => {
        if (navigationArray) {
            dispatch(setDisplayedWeekValue(navigationArray));
        }
    }, [navigationArray]);

    useEffect(() => {
        if (week) {
            dispatch(setWeekData(week));
        }
    }, [week]);

    return {
        week,
    };

}
