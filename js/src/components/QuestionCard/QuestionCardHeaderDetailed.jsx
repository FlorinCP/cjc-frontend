import React from "react";
import style from "./QuestionCard.module.css";

function QuestionCardHeaderDetailed({ question, updatedStatus }) {
  function getColor(status) {
    switch (status) {
    }
    if (status === "ACCEPTED") {
      return "#18c52f";
    } else if (status === "REJECTED") {
      return "rgb(238, 49, 88)";
    } else {
      return "black";
    }
  }
  function getICon(status) {
    if (status === "ACCEPTED") {
      return <span className="material-symbols-outlined">check</span>;
    } else if (status === "REJECTED") {
      return <span className="material-symbols-outlined">close</span>;
    } else {
      return <span className="material-symbols-outlined">hourglass_top</span>;
    }
  }

  return (
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

      <div
        className={style.name}
        style={{
          color: getColor(updatedStatus ? updatedStatus : question.status),
        }}
      >
        {getICon(updatedStatus ? updatedStatus : question.status)}
        <h4>{updatedStatus ? updatedStatus : question.status}</h4>
      </div>
    </div>
  );
}

export default QuestionCardHeaderDetailed;
