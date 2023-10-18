import {useEffect, useState} from "react";

export function useFillTime() {
  // Lazy initializer for state
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

  // Using lazy initial state to avoid recalculating on every render
  const [timeState, setTimeState] = useState(createInitialState);

  // Destructure the state for easy access
  const { timeList, integerTimeList } = timeState;

  // Now, we use an effect to handle side effects.
  // If you need to do something that could cause a re-render, place it here.
  // If you only want it to run once, leave the dependency array empty.
  useEffect(() => {
    // Any side effects are handled here
  }, []);

  return { timeList, integerTimeList };
}



