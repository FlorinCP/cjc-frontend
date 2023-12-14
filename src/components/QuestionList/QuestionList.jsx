import QuestionCard from "../QuestionCard/QuestionCard";
import React from "react";

function QuestionList(props) {
  return (
    <>
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
    </>
  );
}

export default QuestionList;
