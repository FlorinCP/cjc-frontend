import React, { useContext, useEffect, useState } from "react";
import style from "./ViewQuestions.module.css";
import { getQuestionsByStatus } from "../../services/question_api";
import UserContext from "../../context/UserContext";
import Question from "../../components/QuestionShort/Question";
function AcceptedQuestions(props) {
  const [loaded, setLoaded] = useState(false);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [title, setTitle] = useState("Intrebari Acceptate");
  const { currentUser, updateCurrentUser, viewModeON, updateViewMode } =
    useContext(UserContext);

  useEffect(() => {
    console.log(currentUser.email);
    console.log(currentUser.role);

    getQuestionsByStatus("APPROVED").then((r) => {
      setDisplayedQuestions(r);
      setLoaded(true);
    });
  }, []);

  function loader() {
    return <div className={style.loader}></div>;
  }

  const handleUpdateList = () => {
    getQuestionsByStatus("APPROVED").then((r) => {
      setDisplayedQuestions(r);
    });
    setTitle("Intrebari Acceptate");
  };

  function questionList() {
    return (
      <>
        {displayedQuestions.length > 0 ? (
          displayedQuestions.map((question, index) => (
            <Question
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
              inStorePosition={index}
              updateList={handleUpdateList}
            />
          ))
        ) : (
          <>
            <h2 className={style.error}>Nu s-au gasit rezultate</h2>
            <img src="/eroare.svg" alt="" />
          </>
        )}
      </>
    );
  }

  function header() {
    return (
      <div className={style.header}>
        <p className={style.title}>{title}</p>
      </div>
    );
  }

  return (
    <>
      <div className={style.wrapper}>
        <div className={style.mainContainer}>
          {!loaded ? (
            loader()
          ) : (
            <React.Fragment>
              {header()}

              {questionList()}
            </React.Fragment>
          )}
        </div>
      </div>
    </>
  );
}

export default AcceptedQuestions;
