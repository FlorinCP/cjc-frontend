const BASE_URL = "http://localhost:8080/cjc/api/v1";

export async function makeAppointment(
  startHour,
  endHour,
  userEmail,
  questionId,
  dayNumber,
  monthNumber,
  year,
  appointmentStatus,
) {
  const requestData = {
    startHour: startHour,
    endHour: endHour,
    userEmail: userEmail,
    questionId: questionId,
    dayNumber: dayNumber,
    monthNumber: monthNumber,
    year: year,
    appointmentStatus: appointmentStatus,
  };

  fetch(`${BASE_URL}/appointment/set`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestData),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      // Handle the response from the backend if needed
      console.log(data);
    })
    .catch((error) => {
      // Handle errors
      console.error("There was a problem with the fetch operation:", error);
    });
}

export async function getAppointmentByDay(day) {
  const monthNumber = day.monthNumber;
  const year = day.fullYear;
  const dayNumber = day.dayNumber;

  const queryString = `monthNumber=${encodeURIComponent(
    monthNumber,
  )}&dayNumber=${encodeURIComponent(dayNumber)}&year=${encodeURIComponent(
    year,
  )}`;

  fetch(`${BASE_URL}/appointment/get-by-day?${queryString}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    // body: JSON.stringify(shortDay),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error("There was a problem with the fetch operation:", error);
    });
}
