const URL = process.env.REACT_APP_URL;

export default async function getSessionLink(
  email,
  servicePrice,
  serviceName,
  currency,
  bearerToken
) {

    const validateInputs =()=>{
        if (typeof email !== 'string' || typeof serviceName !== 'string' || typeof currency !== 'string') {
            return "Invalid input types";
        }

        const normalizedServicePrice = servicePrice.replace(",", "") || "0";
        const servicePriceAsNumber = parseInt(normalizedServicePrice, 10);

        if (serviceName.length <= 4 || servicePriceAsNumber < 200) {
            return "Service name must be more than 4 characters and price must be at least 100";
        }

        return null; // Valid input
    }

    try {
        const inputError = validateInputs();
        if (inputError) {
            console.error("Validation error:", inputError);
            return { error: inputError };
        }

        const apiUrl = `${URL}/payment/create-payment-link`;
        const queryParams = new URLSearchParams({
            serviceName: serviceName,
            servicePrice: servicePrice,
            currency: currency,
            email: email,
        }).toString();

        const response = await fetch(`${apiUrl}?${queryParams}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (!response.ok) {
            const errorMessage = `HTTP error! status: ${response.status}`;
            console.error(errorMessage);
            return { error: errorMessage };
        }

        try {
            return await response.json();
        } catch (jsonParseError) {
            console.error("Error parsing server response", jsonParseError);
            return { error: "Error parsing server response" };
        }
    } catch (error) {
        console.error("Error creating session", error);
        return { error: error.message };
    }

}

export async function getAllSessions(bearerToken) {
    try{

        const response = await fetch(`${URL}/payment/get-all-sessions`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

        if (!response.ok) {
            const errorMessage = `HTTP error! status: ${response.status}`;
            console.error(errorMessage);
            return { error: errorMessage };
        }

        try {
            return await response.json();
        } catch (jsonParseError) {
            console.error("Error parsing server response", jsonParseError);
            return { error: "Error parsing server response" };
        }
    } catch (error) {
        console.error("Error fetching sessions", error);
        return { error: error.message}
    }


}
