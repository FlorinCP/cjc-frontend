import style from "./QuestionDetails.module.css";
import { useSelector } from "react-redux";
import { selectQuestionById } from "../../selectors/questionSelectors";
import { useNavigate, useParams } from "react-router-dom";
import ActionButton from "../ActionButton/ActionButton";
import PDFViewer from "../PDFViewer/PDFViewer";
import React, { useEffect, useState } from "react";
import { mapToObject, updateStatus } from "../../services/question_api";
import { fetchPdfData } from "../../services/file_api";

function QuestionDetails() {
  const questionId = parseInt(useParams().questionId, 10);
  const question = useSelector((state) =>
    selectQuestionById(state, questionId),
  );
  console.log(question);
  const { email, role } = useSelector((state) => state.token);

  const [updatedStatus, setUpdatedStatus] = useState(null);

  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(question.fileInfo);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentFileName, setCurrentFileName] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentFilePages, setCurrentFilePages] = useState(null);

  useEffect(() => {
    if (selectedFiles) {
      const obj = mapToObject(selectedFiles);
      console.log(obj);
      setSelectedFilesObj(obj);
    }
  }, [selectedFiles]);

  const expand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const rejectQuestion = () => {
    setUpdatedStatus("rejected");
    // updateStatus(question.id, "reject").then(() => {
    //   question.updateList();
    // });
  };

  const approveQuestion = () => {
    setUpdatedStatus("accepted");
    // updateStatus(question.id, "accepted").then(() => {
    //   question.updateList();
    // });
  };

  const showFile = (index) => {
    if (currentIndex !== index) {
      setCurrentFileName(question.fileInfo[index].name);
      setCurrentFilePages(question.fileInfo[index].pages);
      fetchPdfData(question.fileInfo[index].id).then((r) => {
        setCurrentIndex(index);
        console.log(r);
        setCurrentFile(r);
      });
    } else {
      setCurrentIndex(null);
    }
  };

  const goNext = () => {
    if (currentIndex + 1 < question.fileNumber) {
      showFile(currentIndex + 1);
    }
  };

  const goBack = () => {
    if (currentIndex - 1 >= 0) {
      showFile(currentIndex - 1);
    }
  };

  const closeModal = () => {
    setCurrentFile(null);
  };

  function Header() {
    return (
      <div className={style.header}>
        <p>Vizualizare Detaliata</p>
      </div>
    );
  }

  return (
    <div className={style.mainContainer}>
      <Header />
      <div className={style.questionWrapper}>
        <div className={style.author}>
          <div className={style.name}>
            <span className="material-symbols-outlined">person</span>
            <h4>
              {question.nume} {question.prenume}{" "}
            </h4>
          </div>
          <div className={style.name}>
            <span className="material-symbols-outlined">call</span>
            <h4>{question.phone}</h4>
          </div>

          <div className={style.name}>
            <span className="material-symbols-outlined">mail</span>
            <h4>{question.email}</h4>
          </div>

          <div className={style.name}>
            <span className="material-symbols-outlined">schedule</span>
            <h4>{question.elapsedTime} in urma</h4>
          </div>

          <div className={style.name}>
            <span className="material-symbols-outlined">hourglass_top</span>
            <h4>{question.status}</h4>
          </div>
        </div>

        <div className={style.titleAndText}>
          <div className={style.questionTitle}>
            <div className={style.title}>{question.questionTitle}</div>
          </div>

          <div className={style.questionText}>{question.questionText}</div>
        </div>

        <div className={style.filesInfoAndButtons}>
          <div className={style.name} onClick={expand}>
            <span className="material-symbols-outlined">draft</span>
            <h4>{question.fileNumber} fisiere</h4>
          </div>

          <div className={style.expand} onClick={expand}>
            {isExpanded ? (
              <span className="material-symbols-outlined">expand_less</span>
            ) : (
              <span className="material-symbols-outlined">expand_more</span>
            )}
          </div>
          <div>
            <ActionButton
              text={" Refuza"}
              color={"white"}
              backgroundColor={"rgb(238, 49, 88)"}
              onClick={rejectQuestion}
            />
            <ActionButton
              text={" Accepta"}
              color={"white"}
              backgroundColor={"#18c52f"}
              onClick={approveQuestion}
            />
          </div>
        </div>

        {isExpanded ? (
          <div className={style.uploadedFiles}>
            {selectedFilesObj ? (
              selectedFilesObj.map((file, index) => (
                <div
                  className={style.fileRepresentation}
                  key={index}
                  onClick={() => showFile(index)}
                >
                  <img src={file.image.src} alt="" />
                  <p>{file.name}</p>
                  {file.size ? <h4>{file.size} MB</h4> : <></>}
                </div>
              ))
            ) : (
              <></>
            )}
          </div>
        ) : (
          <></>
        )}

        {updatedStatus && question.status === "WAITING" && (
          <div className={style.updateStatus}>
            <i>
              * Inainte de a trimite raspunsul final referitor la acceptarea sau
              refuzarea cererii va rugam sa adaugati mentiuni
            </i>
            <textarea
              name="questionText"
              className={style.enterQuestion}
            ></textarea>
            <ActionButton
              text={"Trimite"}
              color={"white"}
              backgroundColor={"#1c79b8"}
              onClick={approveQuestion}
            />
          </div>
        )}
      </div>

      {currentFile && (
        <div className={style.pdfView}>
          <PDFViewer
            pdfData={currentFile}
            title={currentFileName}
            pages={currentFilePages}
            closeModalEmit={closeModal}
            moveForward={goNext}
            moveBack={goBack}
          />
        </div>
      )}
    </div>
  );
}

export default QuestionDetails;
