import style from "./QuestionCard.module.css";
import ActionButton from "../ActionButton/ActionButton";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function QuestionCardFooter({
  question,
  sendIsExpanded,
  wasClicked,
  sendWasCliked,
  isDetailed,
  sendUpdatedStatus,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const navigate = useNavigate();

  const { email, role } = useSelector((state) => state.token);

  const [updatedStatus, setUpdatedStatus] = useState(null);

  useEffect(() => {
    if (updatedStatus) {
      sendUpdatedStatus(updatedStatus);
    }
  }, [updatedStatus]);

  const expand = () => {
    if (question.fileNumber > 0) {
      setIsExpanded((prevState) => !prevState);
    }
  };
  function openScheduleModal() {
    sendWasCliked((prevState) => !prevState);
  }

  useEffect(() => {
    sendIsExpanded(isExpanded);
  }, [isExpanded]);

  return (
    <div className={style.filesInfoAndButtons}>
      <div className={style.files} onClick={expand}>
        <div className={style.flex}>
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
      </div>

      {isDetailed === false && (
        <div className={style.singleButtonWrapper}>
          <ActionButton
            text={"Vizualizare"}
            color={"white"}
            backgroundColor={"#1888ff"}
            active={true}
            onClick={() => navigate(`/questions/id/${question.id}`)}
          />
        </div>
      )}

      {question.status === "ACCEPTED" &&
        role === "REGISTERED" &&
        isDetailed && (
          <div className={style.singleButtonWrapper}>
            <ActionButton
              text={"Programeaza-te"}
              color={"white"}
              backgroundColor={"#1888ff"}
              active={wasClicked}
              onClick={() => {
                openScheduleModal();
              }}
            >
              <span className="material-symbols-outlined">event</span>
            </ActionButton>
          </div>
        )}

      {isDetailed === true &&
        question.status === "WAITING" &&
        role === "ADMIN" && (
          <div className={style.buttonsWrapper}>
            <ActionButton
              text={"Refuza"}
              color={"white"}
              active={true}
              width={"100%"}
              backgroundColor={"rgb(238, 49, 88)"}
              onClick={() => {
                setUpdatedStatus("REJECTED");
              }}
            />
            <ActionButton
              text={" Accepta"}
              color={"white"}
              active={true}
              width={"100%"}
              backgroundColor={"#18c52f"}
              onClick={() => {
                setUpdatedStatus("ACCEPTED");
              }}
            />
          </div>
        )}

      {(question.status === "ACCEPTED" ) &&
        role === "ADMIN" &&
        isDetailed && (
          <div className={style.singleButtonWrapper}>
            <ActionButton
              text={"Termina"}
              color={"white"}
              active={true}
              width={"100%"}
              backgroundColor={"#3ca2ec"}
              onClick={() => {
                setUpdatedStatus("DONE");
              }}
            >
              <span className="material-symbols-outlined">verified</span>
            </ActionButton>
          </div>
        )}

      {isDetailed &&  question.status === "REJECTED" && role === "ADMIN" && (
        <div className={style.singleButtonWrapper}>
          <ActionButton
            text={" Accepta"}
            color={"white"}
            active={true}
            backgroundColor={"#18c52f"}
            onClick={() => {
              setUpdatedStatus("ACCEPTED");
            }}
          />
        </div>
      )}
    </div>
  );
}

export default QuestionCardFooter;
