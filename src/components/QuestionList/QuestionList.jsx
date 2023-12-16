import QuestionCard from "../QuestionCard/QuestionCard";
import React from "react";
import style from "../../pages/ViewQuestions/ViewQuestions.module.css";

function QuestionList(props) {
  return (
    < div className={style.questionsWrapper}>
      {props.questions.map((question, index) => (
          <QuestionCard
            id={question.id}
            email={question.email}
            phone={question.phone}
            questionTitle={question.questionTitle}
            questionText={question.questionText}
            elapsedTime={question.elapsedTime}
            status={question.status}
            nume={question.nume}
            prenume={question.prenume}
            fileNumber={question.fileNumber}
            fileInfo={question.fileInfo}
            key={index}
          />
        ))}
    </div>
  );
}

export default QuestionList;
