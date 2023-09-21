
const BASE_URL = "http://localhost:8080/cjc/api/v1"

export async function sendQuestion(formData){
    try{
        const response = await  fetch(`${BASE_URL}/question/`, {
            method: "POST",
            body: formData,
        })

        if (response.ok){
            const responseData = await response.json()
            console.log("Question sent successfully:", responseData);
            return responseData;
        } else {
            console.error("Error sending question:", response.statusText);
        }
    }catch(error) {
        console.error("Error uploading file:", error);
    }
}

export function mapToObject(selectedFiles){

    const obj = [];

    selectedFiles.forEach((file, index) => {
        let type = file.type;
        const indexOfSlash = type.indexOf("/");
        const finalType = type.substring(indexOfSlash + 1);

        const img = new Image();

        switch (finalType) {
            case "pdf":
                img.src = "/pdf-icon.svg";
                break;
            case "jpg":
            case "png":
            case "jpeg":
                img.src = "/img-icon.svg";
                break;
            case "doc":
            case "docx":
            case "vnd.openxmlformats-officedocument.wordprocessingml.document":
                img.src = "/word-icon.svg";
                break;
        }

        let name = file.name;
        const indexOfDot = name.indexOf(".");
        const finalName = name.substring(0, indexOfDot);

        let fileSize = file.size;
        const finalSize = fileSize / 1024 ** 2;

        obj.push({
            image: img,
            type: finalType,
            name: finalName,
            size: finalSize.toFixed(2),
        });
    });

    return obj;

}