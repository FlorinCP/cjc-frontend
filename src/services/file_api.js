
const BASE_URL = "http://localhost:8080/cjc/api/v1"
const DIGITAL_OCEAN_URL ="https://peana.live:443/cjc/api/v1/"


export async function fetchPdfData(fileId) {

    try {

        const queryParams ={
            id : `${fileId}`
        }

        const queryString = new URLSearchParams(queryParams).toString();

        const response = await fetch(`${DIGITAL_OCEAN_URL}/file/download?${queryString}`);

        if (response.status === 200) {
            const data = await response.arrayBuffer(); // Convert the response to an ArrayBuffer
            return new Uint8Array(data); // Convert the ArrayBuffer to a Uint8Array
        } else {
            throw new Error('Failed to fetch PDF data');
        }
    } catch (error) {
        console.error('Error fetching PDF data:', error);
        throw error;
    }
}
