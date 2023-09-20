import React, { useEffect, useState } from "react";
import style from "./Form.module.css";

function Form(props) {
  const [isLoggedOrRegistered, setIsLoggedOrRegistered] = useState(false);
  const [nextPage, setNextPage] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [isChecked, setIsChecked] = useState(false);

  const [userRegisterData, setUserRegisterData] = useState({
    nume: "",
    prenume: "",
    email: "",
    phone: "",
    password: "",
  });
  const handleRegisterChange = (e) => {
    const { name, value } = e.target;
    setUserRegisterData({ ...userRegisterData, [name]: value });
  };

  const [userLoginData, setUserLoginData] = useState({
    email: "",
    phone: "",
    password: "",
  });

  const [questionData, setQuestionData] = useState({
    email: "",
    phone: "",
    questionText: "",
  });

  // used for Register / Auth toggle

  const handleCheckboxChange = (event) => {
    setIsChecked(event.target.checked);
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setQuestionData({ ...questionData, [name]: value });
  };

  // useEffect used for changing the uploaded files into obj to better display

  useEffect(() => {
    if (selectedFiles) {
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
            img.src = "/word-img.svg";
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

      console.log(obj);
      setSelectedFilesObj(obj);
    }
  }, [selectedFiles]);

  const handleUpload = () => {
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`files`, file);
    });

    console.log(formData);

    fetch("http://localhost:8080/cjc/api/v1/file/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        // Handle the response from the Spring Boot backend
        console.log(data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  async function loginRegisterUSer() {
    if (isChecked) {
      try {
        const response = await fetch(
          "http://localhost:8080/cjc/api/v1/user/auth",
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
          setIsLoggedOrRegistered(true);
          console.log("Authentication successfully:", responseData);
        } else {
          console.error("Error authenticating:", response.statusText);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    } else {
      console.log(userRegisterData);
      try {
        const response = await fetch(
          "http://localhost:8080/cjc/api/v1/user/register",
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
          setIsLoggedOrRegistered(true);
          console.log("Registered successfully:", responseData);
        } else {
          console.error("Error registering:", response.statusText);
        }
      } catch (error) {
        console.error("Something went wrong:", error);
      }
    }
  }

  function moveForward(e) {
    e.preventDefault();
    setNextPage((prevState) => !prevState);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    handleUpload();

    try {
      const response = await fetch(
        "http://localhost:8080/cjc/api/v1/question/question",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(questionData),
        },
      );

      if (response.ok) {
        const responseData = await response.json();
        console.log("Data sent successfully:", responseData);
      } else {
        console.error("Error sending data:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending data:", error);
    }
  };

  return (
    <div>
      <form id={style["questions"]} onSubmit={handleSubmit}>
        <div id={style["questionTitle"]}>
          <p className={style.title}>Formular intrebari</p>
        </div>

        <div className={style.formPage}>
          <div className={style.pageIndex}>
            <div id={nextPage ? style["line"] : style["lineDisabled"]}></div>
            <div className={style.holly}>
              <button className={style.indexButton}>1</button>
              Creeare Cont
            </div>
            <div div className={nextPage ? style.holly : style.hollyDisabled}>
              <button className={style.indexButton}>2</button>
              Fisiere si Descriere
            </div>
          </div>

          {nextPage ? (
            <>
              <h2>Textul intrebarii</h2>

              <textarea
                name="questionText"
                value={questionData.questionText}
                onChange={handleChange}
                className={style.enterQuestion}
                cols="20"
                rows="7"
              ></textarea>

              <h2>Incarcarea Fisierelor</h2>
              <div className={style.fileUpload}>
                <div id={style["fileHeader"]}>
                  <label
                    htmlFor="file-upload"
                    className={style.customFileUpload}
                  >
                    <span className="material-symbols-outlined">
                      upload_file
                    </span>{" "}
                    <span>Alegeti fisierele</span>
                  </label>
                  <input
                    type="file"
                    id="file-upload"
                    onChange={handleFileChange}
                    multiple
                  />
                  {/*<button onClick={handleUpload}>Incarcati</button>*/}
                </div>

                <div id={style["uploadedFiles"]}>
                  {selectedFilesObj ? (
                    selectedFilesObj.map((file, index) => (
                      <div className={style.fileRepresentation} key={index}>
                        <img src={file.image.src} alt="" />
                        <p>{file.name}</p>
                        <h4>{file.size} MB</h4>
                      </div>
                    ))
                  ) : (
                    <></>
                  )}
                </div>
              </div>

              <button className={style.actionBtn} onClick={moveForward}>
                Urmatorul Pas
                <span className="material-symbols-outlined">chevron_right</span>
              </button>
            </>
          ) : (
            <>
              <div id={style["inputs"]}>
                <div id={style["swichDiv"]}>
                  <p className={!isChecked ? style.choiceP : style.choiceD}>
                    Cont nou
                  </p>
                  <label className={style.switch}>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={handleCheckboxChange}
                    ></input>
                    <span className={`${style.slider} ${style.round}`}></span>
                  </label>
                  <p className={isChecked ? style.choiceP : style.choiceD}>
                    Autentificare
                  </p>
                </div>

                {isChecked ? (
                  <>
                    <h3>Email / Numar de telefon</h3>
                    <input
                      type="text"
                      name="email"
                      value={questionData.email}
                      onChange={handleChange}
                      className={style.inputField}
                    />

                    <h3>Parola</h3>
                    <input
                      type="password"
                      name="password"
                      value={questionData.password}
                      onChange={handleChange}
                      className={style.inputField}
                    />
                  </>
                ) : (
                  <>
                    <h3>Nume</h3>
                    <input
                      type="text"
                      name="nume"
                      value={userRegisterData.nume}
                      onChange={handleRegisterChange}
                      className={style.inputField}
                    />
                    <h3>Prenume</h3>
                    <input
                      type="text"
                      name="prenume"
                      value={userRegisterData.prenume}
                      onChange={handleRegisterChange}
                      className={style.inputField}
                    />
                    <h3>Numar de telefon</h3>
                    <input
                      type="text"
                      name="phone"
                      value={userRegisterData.phone}
                      onChange={handleRegisterChange}
                      className={style.inputField}
                    />

                    <h3>Email</h3>
                    <input
                      type="text"
                      name="email"
                      value={userRegisterData.email}
                      onChange={handleRegisterChange}
                      className={style.inputField}
                    />

                    <h3>Parola</h3>
                    <input
                      type="password"
                      name="password"
                      value={userRegisterData.password}
                      onChange={handleRegisterChange}
                      className={style.inputField}
                    />
                  </>
                )}
              </div>

              <div className={style.buttons}>
                <button
                  className={style.loginRegisterBtn}
                  onClick={loginRegisterUSer}
                >
                  {isChecked ? <>Autentificare</> : <>Inregistrare</>}
                </button>
                <button
                  className={style.actionBtn}
                  onClick={moveForward}
                  disabled={!isLoggedOrRegistered}
                >
                  Urmatorul Pas
                  <span className="material-symbols-outlined">
                    chevron_right
                  </span>
                </button>
              </div>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default Form;
