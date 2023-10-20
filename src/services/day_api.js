const BASE_URL = "http://localhost:8080/cjc/api/v1";

export async function getDayData(selectedDate) {
  try {
    const queryParams = {
      monthNumber: `${selectedDate.monthNumber}`,
      dayNumber: `${selectedDate.dayNumber}`,
      year: `${selectedDate.year}`,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${BASE_URL}/day/day?${queryString}`);

    if (response.ok) {
      // console.log("day loaded successfully:", responseData);
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {}
}

export async function getClosedDays(monthNumber) {
  try {
    const queryParams = {
      monthNumber: `${monthNumber}`}

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${BASE_URL}/day/closed-days?${queryString}`);

    if (response.ok) {
      const responseData = await response.json();
      return responseData;
    } else {
      return null;
    }
  } catch (error) {}
}

export async function postDayData(selectedDate) {
  try {
    const queryParams = {
      monthNumber: `${selectedDate.monthNumber}`,
      dayNumber: `${selectedDate.dayNumber}`,
      year: `${selectedDate.year}`,
      status: "WORKING",
      workingHours: 8,
      startHour: 8,
      endHour: 16,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${BASE_URL}/day/day?${queryString}`, {
      method: "POST",
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("day posted successfully:", responseData);
      return responseData;
    } else {
      return null;
    }
  } catch (error) {}
}

export async function updateDayData(
  id,
  workingHours,
  startHour,
  endHour,
  status,
) {
  try {
    const queryParams = {
      id: `${id}`,
      workingHours: `${workingHours}`,
      startHour: `${startHour}`,
      endHour: `${endHour}`,
      status: `${status}`,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${BASE_URL}/day/set-day?${queryString}`, {
      method: "POST",
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("day updated successfully:", responseData);
      return responseData;
    } else {
      return null;
    }
  } catch (error) {}
}
