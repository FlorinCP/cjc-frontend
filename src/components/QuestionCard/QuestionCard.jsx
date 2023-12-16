import React, { useContext, useEffect, useState } from "react";
import style from "./QuestionCard.module.css";
import UserContext from "../../context/UserContext";
import { mapToObject, updateStatus } from "../../services/question_api";
import { fetchPdfData } from "../../services/file_api";
import PDFViewer from "../PDFViewer/PDFViewer";
import { useSelector } from "react-redux";
import ActionButton from "../ActionButton/ActionButton";
// import {useHistory} from "react-router-dom";

function QuestionCard(props) {
  const { email, role } = useSelector((state) => state.token);

  console.log(email, role);

  const [selectedFilesObj, setSelectedFilesObj] = useState(null);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState(props.fileInfo);
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
    updateStatus(props.id, "reject").then(() => {
      props.updateList();
    });
  };

  const approveQuestion = () => {
    updateStatus(props.id, "accepted").then(() => {
      props.updateList();
    });
  };

  const showFile = (index) => {
    if (currentIndex !== index) {
      setCurrentFileName(props.fileInfo[index].name);
      setCurrentFilePages(props.fileInfo[index].pages);
      fetchPdfData(props.fileInfo[index].id).then((r) => {
        setCurrentIndex(index);
        console.log(r);
        setCurrentFile(r);
      });
    } else {
      setCurrentIndex(null);
    }
  };

  const goNext = () => {
    if (currentIndex + 1 < props.fileNumber) {
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

  return (
    <>
      <div className={style.questionWrapper}>
        <div className={style.author}>
          <div className={style.name}>
            <span className="material-symbols-outlined">person</span>
            <h4>
              {props.nume} {props.prenume}{" "}
            </h4>
          </div>
          <div className={style.name}>
            <span className="material-symbols-outlined">call</span>
            <h4>{props.phone}</h4>
          </div>

          <div className={style.name}>
            <span className="material-symbols-outlined">mail</span>
            <h4>{props.email}</h4>
          </div>

          <div className={style.name}>
            <span className="material-symbols-outlined">schedule</span>
            <h4>{props.elapsedTime} in urma</h4>
          </div>

        </div>

        <div className={style.titleAndText}>
          <div className={style.questionTitle}>
            <div className={style.title}>{props.questionTitle}</div>
          </div>

          <div className={style.questionText}>{props.questionText}</div>
        </div>

        <div className={style.filesInfoAndButtons}>
          <div className={style.name} onClick={expand}>
            <span className="material-symbols-outlined">draft</span>
            <h4>{props.fileNumber} fisiere</h4>
          </div>

          {/*{role === "ADMIN" && (*/}
          {/*  <div className={style.buttonsWrapper}>*/}
          {/*    <button className={style.rejectBtn} onClick={rejectQuestion}>*/}
          {/*      Refuza*/}
          {/*    </button>*/}
          {/*    <button className={style.approveBtn} onClick={approveQuestion}>*/}
          {/*      Accepta*/}
          {/*    </button>*/}
          {/*  </div>*/}
          {/*)}*/}

          <div className={style.expand} onClick={expand}>
            {isExpanded ? (
              <span className="material-symbols-outlined">expand_less</span>
            ) : (
              <span className="material-symbols-outlined">expand_more</span>
            )}
          </div>
          <div>
            <ActionButton
              text={"Vizualizare"}
              color={"white"}
              backgroundColor={"#1c79b8"}
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
    </>
  );
}

export default QuestionCard;
