import style from "./QuestionCard.module.css";
import React from "react";

function QuestionCardBody({ question }) {
  return (
    <div className={style.titleAndText}>
      <div className={style.questionTitle}>
        <div className={style.title}>{question.questionTitle}</div>
      </div>

      <div className={style.questionText}>
        <p>{question.questionText}</p>
      </div>
    </div>
  );
}

export default QuestionCardBody;
