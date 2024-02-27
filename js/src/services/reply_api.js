const URL = process.env.REACT_APP_URL;

export async function sendReply(formData,bearerToken){
    try{
        const response = await  fetch(`${URL}/reply/`, {
            method: "POST",
            body: formData,
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
            },
        })

        if (response.ok){
            const responseData = await response.json()
            console.log("Reply was sent successfully:", responseData);
            return responseData;
        } else {
            console.error("Error adding reply:", response.statusText);
        }
    }catch(error) {
        console.error("Error uploading file:", error);
    }
}
