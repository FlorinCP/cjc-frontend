import { useState} from "react";

export function useFillTime() {
  const createInitialState = () => {
    const intermediateTimeList = [];
    const intermediateIntegerTimeList = [];
    let firstHour = 7;

    for (let i = 0; i < 16 * 2; i++) {
      const isEven = i % 2 === 0;
      const formattedHour = isEven ? `${firstHour}:00` : `${firstHour}:30`;
      const hour = isEven ? firstHour : firstHour + 0.5;

      intermediateTimeList.push(formattedHour);
      intermediateIntegerTimeList.push(hour);

      if (!isEven) {
        firstHour++;
      }
    }
    return { timeList: intermediateTimeList, integerTimeList: intermediateIntegerTimeList };
  };

  const [timeState, setTimeState] = useState(createInitialState);

  const { timeList, integerTimeList } = timeState;

  return { timeList, integerTimeList };
}



