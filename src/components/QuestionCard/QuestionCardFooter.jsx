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

      {isDetailed === false && (
        <div>
          <ActionButton
            text={"Vizualizare"}
            color={"white"}
            backgroundColor={"#1c79b8"}
            active={true}
            onClick={() => navigate(`/questions/id/${question.id}`)}
          />
        </div>
      )}

      {question.status === "ACCEPTED" && role === "REGISTERED" && (
        <div>
          <ActionButton
            text={"Programeaza-te"}
            color={"white"}
            backgroundColor={"#1c79b8"}
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
          <div>
            <ActionButton
              text={"Refuza"}
              color={"white"}
              active={true}
              backgroundColor={"rgb(238, 49, 88)"}
              onClick={() => {
                setUpdatedStatus("REJECTED");
              }}
            />
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

      {(question.status === "ACCEPTED" || question.status === "REJECTED") &&
        role === "ADMIN" && (
          <div>
            <ActionButton
              text={"Termina"}
              color={"white"}
              active={true}
              backgroundColor={"#1c79b8"}
              onClick={() => {
                setUpdatedStatus("DONE");
              }}
            >
              <span className="material-symbols-outlined">verified</span>
            </ActionButton>
          </div>
        )}

      {question.status === "REJECTED" && role === "ADMIN" && (
        <div>
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
