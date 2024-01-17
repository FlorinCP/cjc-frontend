const URL = process.env.REACT_APP_URL;

export async function getDayData(selectedDate) {
  try {
    const queryParams = {
      monthNumber: `${selectedDate.monthNumber}`,
      dayNumber: `${selectedDate.dayNumber}`,
      year: `${selectedDate.year}`,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${URL}/day/day?${queryString}`);

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {}
}

export async function getClosedDays(monthNumber) {
  try {
    const queryParams = {
      monthNumber: `${monthNumber}`,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${URL}/day/closed-days?${queryString}`);

    if (response.ok) {
      return await response.json();
    } else {
      return null;
    }
  } catch (error) {}
}

export async function getDatesForMonth(monthNumber) {
  try {
    const queryParams = { monthNumber: `${monthNumber}` };
    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${URL}/day/all-days-in-month?${queryString}`);
    const responseData = await response.json();

    if (response.ok) {
      console.log(responseData);
      return responseData;
    } else {
      console.error("Response not OK:", response.status);
      return null;
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}


export async function postDayData(
  selectedDate,
  workingHours,
  startHour,
  endHour,
  status,
  bearerToken,
) {
  try {
    const day = {
      monthNumber: parseInt(selectedDate.monthNumber),
      dayNumber: parseInt(selectedDate.dayNumber),
      year: parseInt(selectedDate.fullYear),
      startHour: parseInt(startHour),
      workingHours: parseInt(workingHours),
      endHour: parseInt(endHour),
      workingStatus: status.toString(),
    };

    const response = await fetch(`${URL}/day/add-day`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(day),
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

export async function postMultipleDayData(
  multipleSelectionDates,
  workingHours,
  startHour,
  endHour,
  status,
  bearerToken,
) {
  try {
    const days = multipleSelectionDates.map((date) => {
      return {
        monthNumber: parseInt(date.monthNumber),
        dayNumber: parseInt(date.dayNumber),
        year: parseInt(date.fullYear),
        startHour: parseInt(startHour),
        workingHours: parseInt(workingHours),
        endHour: parseInt(endHour),
        workingStatus: status.toString(),
      };
    });

    console.log(days);

    const response = await fetch(`${URL}/day/add-multiple-days`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${bearerToken}`,
      },
      body: JSON.stringify(days),
    });

    console.log(response);

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
  bearerToken,
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

    const response = await fetch(`${URL}/day/set-day?${queryString}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
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
