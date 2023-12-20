import React, { useContext, useEffect, useState } from "react";
import style from "./QuestionCard.module.css";
import UserContext from "../../context/UserContext";
import { mapToObject, updateStatus } from "../../services/question_api";
import { fetchPdfData } from "../../services/file_api";
import PDFViewer from "../PDFViewer/PDFViewer";
import { useSelector } from "react-redux";
import ActionButton from "../ActionButton/ActionButton";
import {useNavigate} from "react-router-dom";
import FilesWrapper from "../FilesWrapper/FilesWrapper";
// import {useHistory} from "react-router-dom";

function QuestionCard(props) {
  const { email, role } = useSelector((state) => state.token);

  const navigate = useNavigate();
  const [isExpanded, setIsExpanded] = useState(false);

  const expand = () => {
    setIsExpanded((prevState) => !prevState);
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
              active={true}
              onClick={() => navigate(`/questions/id/${props.id}`)}
            />
          </div>
        </div>

        {isExpanded && (
         <FilesWrapper fileInfo={props.fileInfo} fileNumber={props.fileNumber}/>
        )}
      </div>


    </>
  );
}

export default QuestionCard;
