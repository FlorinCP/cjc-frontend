const URL = process.env.REACT_APP_URL;

export async function fetchPdfData(fileId,bearerToken) {

    try {

        const queryParams ={
            id : `${fileId}`
        }

        const queryString = new URLSearchParams(queryParams).toString();

        const response = await fetch(`${URL}/file/download?${queryString}`,{
            headers: {
                'Authorization': `Bearer ${bearerToken}`,
            },
        });

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
