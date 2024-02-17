const URL = process.env.REACT_APP_URL;


export async function sendQuestion(formData) {
  try {
    const response = await fetch(`${URL}/question/`, {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Question sent successfully:", responseData);
      return responseData;
    } else {
      console.error("Error sending question:", response.statusText);
    }
  } catch (error) {
    console.error("Error uploading file:", error);
  }
}

export async function getQuestionsForUser(email) {
  try {
    const queryParams = {
      email: `${email}`,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(
      `${URL}/question/allByEmail?${queryString}`,
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log("Question loaded successfully:", responseData);
      return responseData;
    } else {
      console.error("Error loading question:", response.statusText);
    }
  } catch (error) {
    console.error("Error loading files:", error);
  }
}

export async function getAllQuestions() {
  try {
    const response = await fetch(`${URL}/question/all`);

    if (response.ok) {
      const responseData = await response.json();
      console.log("Question loaded successfully:", responseData);
      return responseData;
    } else {
      console.error("Error loading question:", response.statusText);
    }
  } catch (error) {
    console.error("Error loading files:", error);
  }
}

export async function getQuestionsByStatus(status,bearerToken) {
  try {
    const queryParams = {
      status: `${status}`,
    };

    const queryString = new URLSearchParams(queryParams).toString();

    const response = await fetch(
      `${URL}/question/all-by-status?${queryString}`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      },
    );

    if (response.ok) {
      const responseData = await response.json();
      console.log("Questions loaded successfully:", responseData);
      return responseData;
    } else {
      console.error("Error loading questions:", response.statusText);
    }
  } catch (error) {
    console.error("Error loading questions:", error);
  }
}

export function mapToObject(selectedFiles) {
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

    if (file.size) {
      let fileSize = file.size;
      const finalSize = fileSize / 1024 ** 2;

      obj.push({
        image: img,
        type: finalType,
        name: finalName,
        size: finalSize.toFixed(2),
      });
    } else {
      obj.push({
        image: img,
        type: finalType,
        name: finalName,
      });
    }
  });

  return obj;
}

export async function updateStatus(id, status,bearerToken) {
  const queryParams = {
    id: `${id}`,
    status: `${status}`,
  };

  const queryString = new URLSearchParams(queryParams).toString();

  const response = await fetch(`${URL}/question/status?${queryString}`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${bearerToken}`,
    },
  });
}
