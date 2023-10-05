import React, { useContext, useEffect, useState } from "react";
import style from "./Question.module.css";
import { mapToObject, updateStatus } from "../../services/question_api";
import UserContext from "../../context/UserContext";
import ScheduleUser from "../ScheduleUser/ScheduleUser";

function Question(props) {
  const [selectedFiles, setSelectedFiles] = useState(props.fileInfo);
  const { currentUser, updateCurrentUser , updateViewMode} = useContext(UserContext);
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [status, setStatus] = useState(props.status);
  const [scheduleView,setScheduleView] = useState(false)


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

  const viewQuestion = () => {
      updateViewMode({
        status: true,
        id: props.inStorePosition,
        question: props
      })
  };

  function displayScheduleView(){
      setScheduleView(prevState => !prevState)
  }

  const handleModalClose = () => {
      setScheduleView(false)
  }

  return (
    <div className={style.questionWrapper}>
      <div className={style.status}>
        {props.status === "WAITING" && currentUser.role === "USER" && (
          <div>
            <h2>Intrebarea dumneavoastra se afla in asteptare</h2>
          </div>
        )}
        {props.status === "APPROVED" && currentUser.role === "USER" && (
          <div>
            <h2>Intrebarea a fost apropbata</h2>
            <h2>Apasati aici pentru a realiza o programare</h2>
              <button onClick={displayScheduleView}>
                  Programeaza-te
              </button>
          </div>
        )}
        {props.status === "REJECTED" && currentUser.role === "USER" && (
          <div>
            <h2>Intrebarea a fost respinsa</h2>
            <h2>Apasati aici pentru a afla de ce</h2>

          </div>
        )}
      </div>

      <div className={style.author}>
        <div className={style.name}>
          <span className="material-symbols-outlined">person</span>
          <h4>{props.nume}</h4>
          <h4>{props.prenume}</h4>
        </div>
        <div className={style.name}>
          <span className="material-symbols-outlined">call</span>
          {props.phone}
        </div>

        <div className={style.name}>
          <span className="material-symbols-outlined">mail</span>
          {props.email}
        </div>
      </div>

      <div className={style.titleAndInfo}>
        <div className={style.title}>{props.questionTitle}</div>
        <p>{props.elapsedTime} in urma</p>
      </div>

      <div className={style.questionText}>{props.questionText}</div>

      <div className={style.holly}>
        <div className={style.subholly}>
          <p>{props.fileNumber}</p>
          <p>fisiere </p>
          <span className="material-symbols-outlined">attach_file</span>
        </div>
        <p>{props.elapsedTime} in urma</p>
      </div>

      {currentUser.role === "ADMIN" && (
        <div className={style.holly}>
          <div className={style.subholly2}>
            <button className={style.actionBtn} onClick={viewQuestion}>
              Vizualizeaza
            </button>
          </div>
        </div>
      )}

      {isExpanded ? (
        <div id={style["uploadedFiles"]}>
          {selectedFilesObj ? (
            selectedFilesObj.map((file, index) => (
              <div className={style.fileRepresentation} key={index}>
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

        {
            scheduleView && <div className={style.modal}>
                <ScheduleUser sendDataToParent={handleModalClose}  id={props.id}/>
            </div>
        }


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

export default Question;
