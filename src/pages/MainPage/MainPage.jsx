import React, { useEffect, useState } from "react";
import style from "./MainPage.module.css";
import Question from "../../components/Question/Question";
import { getQuestionsForUser, mapToObject } from "../../services/question_api";
import question from "../../components/Question/Question";

function MainPage(props) {


  useEffect( () => {
    const user = localStorage.getItem("user");
     getQuestionsForUser(user).then((r) => {
      setQuestions(r);
    });
  }, []);

  const [questions, setQuestions] = useState([]);


  return (
    <div className={style.wrapper}>
        <p className={style.title}>Intrebari in asteptare</p>
      { questions && questions.map((question, index) => (
        <Question  email={question.email} phone={question.phone} questionText={question.questionText} elapsedTime={question.elapsedTime} hasResponse={question.hasResponse} nume={question.nume} prenume={question.prenume} fileNumber={question.fileNumber} fileInfo={question.fileInfo}   key={index} />
      ))}
    </div>
  );
}

export default MainPage;
