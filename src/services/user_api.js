const URL = process.env.REACT_APP_LOCAL_URL + "/auth";

export async function acceptTransfer(transferToken) {
  const queryParams = {
    transferToken: `${transferToken}`,
  };
  const queryString = new URLSearchParams(queryParams).toString();

    console.log("Query string:", queryString)

  try {
    const response = await fetch(`${URL}/accept-transfer?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Something went wrong:", error);
    throw error;
  }
}

export async function loginUser(userLoginData) {
  try {
    const response = await fetch(`${URL}/user/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoginData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Authentication successfully:", responseData);
      return responseData;
    } else {
      console.error("Error authenticating:", response.statusText);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

export async function singin(userLoginData) {
  try {
    const response = await fetch(`${URL}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoginData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Authentication successfully:", responseData);
      return responseData;
    } else {
      console.error("Error authenticating:", response.statusText);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

export async function singup(userLoginData) {
  try {
    const response = await fetch(`${URL}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoginData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Authentication successfully:", responseData);
      return responseData;
    } else {
      console.error("Error authenticating:", response.statusText);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

export async function registerWithToken(userLoginData) {
  try {
    const response = await fetch(`${URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoginData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Authentication successfully:", responseData);
      return responseData;
    } else {
      console.error("Error authenticating:", response.statusText);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

export async function registerUser(userRegisterData) {
  try {
    const response = await fetch(`${URL}/user/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userRegisterData),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Registered successfully:", responseData);
      return responseData;
    } else {
      console.error("Error registering:", response.statusText);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}

export async function getUser(email) {
  try {
    const queryParams = {
      email: `${email}`,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(`${URL}/user/get-user?${queryString}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Fetched successfully:", responseData);
      return responseData;
    } else {
      console.error("Error fetching:", response.statusText);
    }
  } catch (error) {
    console.error("Something went wrong:", error);
  }
}
