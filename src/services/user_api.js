
const BASE_URL = "http://localhost:8080/cjc/api/v1"

export async function loginUser(userLoginData) {
    try {
        const response = await fetch(
            `${BASE_URL}/user/auth`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userLoginData),
            },
        );

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

export async function registerUser(userRegisterData){
    try {
        const response = await fetch(
            `${BASE_URL}/user/register`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userRegisterData),
            },
        );

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

export async function getUser(email){
    try {

        const queryParams ={
            email : `${email}`
        }

        const queryString = new URLSearchParams(queryParams).toString();

        const response = await fetch(
            `${BASE_URL}/user/get-user?${queryString}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );

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

