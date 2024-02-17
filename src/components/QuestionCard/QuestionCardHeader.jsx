import style from "./QuestionCard.module.css";
import React from "react";

function QuestionCardHeader({ question }) {
  return (
    <div className={style.author}>
      <div className={style.name} id={style['name']} >
        <span className="material-symbols-outlined">person</span>
        <h4>
          {question.nume} {question.prenume}{" "}
        </h4>
      </div>
      <div className={style.name} id={style['phone']}>
        <span className="material-symbols-outlined">call</span>
        <h4>{question.phone}</h4>
      </div>

      <div className={style.name}>
        <span className="material-symbols-outlined">mail</span>
        <h4>{question.email}</h4>
      </div>

      <div className={style.name} id={style['ago']}>
        <span className="material-symbols-outlined">schedule</span>
        <h4>{question.elapsedTime} in urma</h4>
      </div>
    </div>
  );
}

export default QuestionCardHeader;
