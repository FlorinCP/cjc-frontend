const BASE_URL = "http://localhost:8080/cjc/api/v1"
const DIGITAL_OCEAN_URL ="https://peana.live:443/cjc/api/v1/"



export async function sendReply(formData){
    try{
        const response = await  fetch(`${DIGITAL_OCEAN_URL}/reply/`, {
            method: "POST",
            body: formData,
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
