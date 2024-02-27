import React, { useEffect, useState } from "react";
import style from "./QuestionForm.module.css";
import { mapToObject, sendQuestion } from "../../services/question_api";
function QuestionForm(props) {
  const [selectedFiles, setSelectedFiles] = useState(null);
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [questionText, setQuestionText] = useState("");
  const [questionTitle, setQuestionTitle] = useState("");
  const [currentLoggedUser, setCurrentLoggedUser] = useState(null);
  const [isQuestionSent, setIsQuestionSent] = useState(false);

  const handleQuestionTextChange = (event) => {
    setQuestionText(event.target.value);
  };

  const handleQuestionTitleChange = (event) => {
    setQuestionTitle(event.target.value);
  };

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    setSelectedFiles(filesArray);
  };

  useEffect(() => {
    if (selectedFiles) {
      const obj = mapToObject(selectedFiles);
      console.log(obj);
      setSelectedFilesObj(obj);
    }
  }, [selectedFiles]);

  const handleUpload = async (e) => {
    e.preventDefault();
    const formData = new FormData();

    selectedFiles.forEach((file, index) => {
      formData.append(`questionFiles`, file);
    });
    formData.append("questionText", questionText);
    formData.append("questionTitle", questionTitle);
    formData.append("user", localStorage.getItem("email"));

    console.log(formData);

    const data = await sendQuestion(formData);
    if (data) {
      setIsQuestionSent(true);
    }
  };

  return (
    <div>
      {!isQuestionSent ? (
        <>
          <h2>Titlul intrebarii</h2>

          <input
            type="text"
            className={style.inputField}
            onChange={handleQuestionTitleChange}
            value={questionTitle}
          />

          <h2>Textul intrebarii</h2>

          <textarea
            name="questionText"
            value={questionText}
            onChange={handleQuestionTextChange}
            className={style.enterQuestion}
            cols="20"
            rows="7"
          ></textarea>

          <h2>Incarcarea Fisierelor</h2>
          <div className={style.fileUpload}>
            <div id={style["fileHeader"]}>
              <label htmlFor="file-upload" className={style.customFileUpload}>
                <span className="material-symbols-outlined">upload_file</span>{" "}
                <span>Alegeti fisierele</span>
              </label>
              <input
                type="file"
                id="file-upload"
                onChange={handleFileChange}
                multiple
              />
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

          <button onClick={handleUpload} className={style.actionBtn2}>
            Trimite !
          </button>
        </>
      ) : (
        <>
          <div className={style.succesfullRegister}>
            <h2>Intrebare trimisa cu succes !</h2>
            <img src="/questionSent.svg" alt="" />
            <p>Contul dumneavoasta : ceva link </p>
            <p>
              Veti fi notificat in cel mai scurt timp referitor la raspunsul
              intrebarii dumneavoastra
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default QuestionForm;
