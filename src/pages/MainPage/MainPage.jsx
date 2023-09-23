import React, { useEffect, useState } from "react";
import style from "./MainPage.module.css";
import Question from "../../components/Question/Question";
import { getQuestionsForUser, mapToObject } from "../../services/question_api";
import question from "../../components/Question/Question";

function MainPage(props) {
  useEffect(() => {
    const user = localStorage.getItem("user");
    getQuestionsForUser(user).then((r) => {
      setQuestions(r);
    });
  }, []);

  const [questions, setQuestions] = useState([]);
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [rejectedQuestions, setRejectedQuestions] = useState([]);
  const [waitingQuestions, setWaitingQuestions] = useState([]);

  useEffect(() => {
    if (questions) {
      const newApprovedQuestions = [];
      const newRejectedQuestions = [];
      const newWaitingQuestions = [];

      questions.forEach((question) => {
        switch (question.status) {
          case "APPROVED":
            newApprovedQuestions.push(question);
            break;
          case "REJECTED":
            newRejectedQuestions.push(question);
            break;
          default:
            newWaitingQuestions.push(question);
            break;
        }
      });

      setApprovedQuestions(newApprovedQuestions);
      setRejectedQuestions(newRejectedQuestions);
      setWaitingQuestions(newWaitingQuestions);
    }
  }, [questions]);



  return (
    <div className={style.wrapper}>

      <p className={style.title}>Intrebari in asteptare</p>
      {waitingQuestions &&
        waitingQuestions.map((question, index) => (
          <Question
            id={question.id}
            email={question.email}
            phone={question.phone}
            questionText={question.questionText}
            elapsedTime={question.elapsedTime}
            hasResponse={question.hasResponse}
            nume={question.nume}
            prenume={question.prenume}
            fileNumber={question.fileNumber}
            fileInfo={question.fileInfo}
            key={index}
          />
        ))}

      <p className={style.title}>Intrebari Aprobate</p>
      {approvedQuestions &&
          approvedQuestions.map((question, index) => (
              <Question
                  id={question.id}
                  email={question.email}
                  phone={question.phone}
                  questionText={question.questionText}
                  elapsedTime={question.elapsedTime}
                  hasResponse={question.hasResponse}
                  nume={question.nume}
                  prenume={question.prenume}
                  fileNumber={question.fileNumber}
                  fileInfo={question.fileInfo}
                  key={index}
              />
          ))}

      <p className={style.title}>Intrebari Respinse</p>
      {rejectedQuestions &&
          rejectedQuestions.map((question, index) => (
              <Question
                  id={question.id}
                  email={question.email}
                  phone={question.phone}
                  questionText={question.questionText}
                  elapsedTime={question.elapsedTime}
                  hasResponse={question.hasResponse}
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

export default MainPage;
