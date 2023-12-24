import QuestionCard from "../QuestionCard/QuestionCard";
import React from "react";
import style from "../../pages/ViewQuestions/ViewQuestions.module.css";

function QuestionList(props) {
  return (
    < div className={style.questionsWrapper}>
      {props.questions.map((question, index) => (
          <QuestionCard question={question} key={index}
          />
        ))}
    </div>
  );
}

export default QuestionList;
