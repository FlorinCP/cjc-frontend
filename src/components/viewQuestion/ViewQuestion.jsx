import React, { useContext, useEffect, useState } from "react";
import UserContext from "../../context/UserContext";
import { mapToObject, updateStatus } from "../../services/question_api";
import style from "./ViewQuestion.module.css";
import PDFViewer from "../PDFViewer/PDFViewer";
import { fetchPdfData } from "../../services/file_api";
// import { useHistory } from "react-router-dom";

function ViewQuestion(props) {
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const { currentUser, updateCurrentUser, updateViewMode, viewModeON } =
    useContext(UserContext);
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(
    viewModeON.question.fileInfo,
  );
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

  // useEffect(() => {
  //
  // }, []);

  const expand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const rejectQuestion = () => {
    updateStatus(viewModeON.question.id, "reject").then(() => {
      props.updateList();
    });
  };

  const approveQuestion = () => {
    updateStatus(viewModeON.question.id, "accepted").then(() => {
      props.updateList();
    });
  };

  const viewQuestion = () => {
    updateViewMode(true);
  };

  const showFile = (index) => {
    if (currentIndex !== index) {
      setCurrentFileName(viewModeON.question.fileInfo[index].name);
      setCurrentFilePages(viewModeON.question.fileInfo[index].pages);
      fetchPdfData(viewModeON.question.fileInfo[index].id).then((r) => {
        setCurrentIndex(index);
        console.log(r);
        setCurrentFile(r);
      });
    } else {
      setCurrentIndex(null);
    }
  };

  const goNext = () => {
    if (currentIndex + 1 < viewModeON.question.fileNumber) {
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
  // const history = useHistory();

  const goBackToQuestions = () => {
    updateViewMode({
      status: false,
      id: null,
      question: {},
    });
    // history.goBack();
  };

  function header() {
    return (
      <div className={style.header}>
        <div className={style.goBack} onClick={goBackToQuestions}>
          <span className="material-symbols-outlined">chevron_left</span> Inapoi
        </div>
        <p className={style.title}>Vizualizare Detaliata</p>
      </div>
    );
  }

  function status() {
    return (
      <div className={style.status}>
        {viewModeON.question.status === "WAITING" &&
          currentUser.role === "USER" && (
            <div>
              <h2>Intrebarea dumneavoastra se afla in asteptare</h2>
            </div>
          )}
        {viewModeON.question.status === "APPROVED" &&
          currentUser.role === "USER" && (
            <div>
              <h2>Intrebarea a fost apropbata</h2>
              <h2>Apasati aici pentru a realiza o programare</h2>
            </div>
          )}
        {viewModeON.question.status === "REJECTED" &&
          currentUser.role === "USER" && (
            <div>
              <h2>Intrebarea a fost respinsa</h2>
              <h2>Apasati aici pentru a afla de ce</h2>
            </div>
          )}
      </div>
    );
  }
  function author() {
    return (
      <div className={style.author}>
        <div className={style.name}>
          <span className="material-symbols-outlined">person</span>
          <h4>{viewModeON.question.nume}</h4>
          <h4>{viewModeON.question.prenume}</h4>
        </div>
        <div className={style.name}>
          <span className="material-symbols-outlined">call</span>
          {viewModeON.question.phone}
        </div>

        <div className={style.name}>
          <span className="material-symbols-outlined">mail</span>
          {viewModeON.question.email}
        </div>

        <div className={style.name}>
          <span className="material-symbols-outlined">schedule</span>
          {viewModeON.question.elapsedTime} in urma
        </div>
      </div>
    );
  }
  function titleAndText() {
    return (
      <div className={style.titleAndText}>
        <div className={style.questionTitle}>
          <div className={style.title}>{viewModeON.question.questionTitle}</div>
        </div>

        <div className={style.questionText}>
          {viewModeON.question.questionText}
        </div>
      </div>
    );
  }
  function filesInfo() {
    return (
      <div className={style.filesInfoAndButtons}>
        <div className={style.filesNumber} onClick={expand}>
          <p>{viewModeON.question.fileNumber}</p>
          <p>fisiere </p>
          <span className="material-symbols-outlined">attach_file</span>
        </div>

        {currentUser.role === "ADMIN" && viewModeON.status === false && (
          <div className={style.holly}>
            <div className={style.subholly2}>
              <button className={style.actionBtn} onClick={viewQuestion}>
                Vizualizeaza
              </button>
            </div>
          </div>
        )}

        {currentUser.role === "ADMIN" && viewModeON.status === true && (
          <div className={style.buttonsWrapper}>
            <button className={style.rejectBtn} onClick={rejectQuestion}>
              Refuza
            </button>
            <button className={style.approveBtn} onClick={approveQuestion}>
              Accepta
            </button>
          </div>
        )}
      </div>
    );
  }
  function questionItself() {
    return (
      <div className={style.questionWrapper}>
        {status()}

        {author()}

        {titleAndText()}

        {filesInfo()}

        {isExpanded ? (
          <div id={style["uploadedFiles"]}>
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

        <div id={style["expand"]} onClick={expand}>
          {isExpanded ? (
            <span className="material-symbols-outlined">expand_less</span>
          ) : (
            <span className="material-symbols-outlined">expand_more</span>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className={style.bigWrapper}>
      {header()}
      {questionItself()}
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

export default ViewQuestion;
