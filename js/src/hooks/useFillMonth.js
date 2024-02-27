import { setMonthDays } from "../features/monthDaysSlice";
import { useDispatch } from "react-redux";
import useDatePicker from "./useDatePicker";
import { useEffect, useState } from "react";
import { getDatesForMonth } from "../services/day_api";
const dispatch = useDispatch();

function useFillMonth() {
  const { finalDays, today } = useDatePicker();
  const [fetchedData, setFetchedData] = useState(null);

  function transferData(fetchedData, finalDays) {
    finalDays.forEach((row) => {
      return row.forEach((day) => {
        if (
          fetchedData.some(
            (receivedDay) => receivedDay.dayNumber === day.dayNumber,
          )
        ) {
          const receivedDay = fetchedData.find(
            (receivedDay) => receivedDay.dayNumber === day.dayNumber,
          );
          day.workingStatus = receivedDay?.workingStatus;
          day.workingHours = receivedDay?.workingHours;
          day.startHour = receivedDay?.startHour;
          day.endHour = receivedDay?.endHour;
        }
      });
    });

    dispatch(setMonthDays(finalDays));
  }

  useEffect(() => {
    if (today.monthNumber) {
      const fetchData = async () => {
        return await getDatesForMonth(today.monthNumber);
      };

      fetchData().then((r) => setFetchedData(r));
    }
  }, [today]);

  useEffect(() => {
    if (fetchedData && finalDays) {
      transferData(fetchedData, finalDays);
    }
  }, [fetchedData, finalDays]);
}
