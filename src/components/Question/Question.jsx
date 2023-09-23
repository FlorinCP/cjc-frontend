import React, { useEffect, useState } from "react";
import style from "./Question.module.css";
import { mapToObject,updateStatus } from "../../services/question_api";

function Question(props) {
  const [selectedFiles, setSelectedFiles] = useState(props.fileInfo);
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    if (selectedFiles) {
      const obj = mapToObject(selectedFiles);
      console.log(obj);
      setSelectedFilesObj(obj);
    }
  }, [selectedFiles]);

  const expand = () =>{
    setIsExpanded(prevState => !prevState)
  }

  const rejectQuestion =() =>{
    updateStatus(props.id, "reject")
  }

  const  approveQuestion = () =>{
    updateStatus(props.id,"accepted")
  }

  return (
    <div className={style.questionWrapper}>
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

      <div className={style.holly}>
        <h2>Textul intrebarii</h2>
        <div className={style.subholly}>
          <p>{props.fileNumber}</p>
          <p>fisiere </p>
          <span className="material-symbols-outlined">attach_file</span>
        </div>
        <p>{props.elapsedTime} in urma</p>
      </div>

      <textarea
        name="questionText"
        value={props.questionText}
        onChange
        className={style.enterQuestion}
        cols="20"
        rows="7"
        disabled
      ></textarea>

      <div className={style.holly}>
        <div className={style.subholly2}>
          <button className={style.actionBtn} onClick={rejectQuestion}>Respinge</button>
          <button className={style.actionBtn} onClick={approveQuestion}>Aproba</button>
        </div>
      </div>

      <p>{props.hasResponse}</p>

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

        <div id={style["expand"]}  onClick={expand}>
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
