import React, { useContext, useEffect, useState } from "react";
import style from "../MainPage/MainPage.module.css";
import Question from "../../components/QuestionShort/Question";
import {
  getAllQuestions,
  getQuestionsForUser,
  mapToObject,
  getQuestionsByStatus,
} from "../../services/question_api";
import UserContext from "../../context/UserContext";
import DatePicker from "../../components/DatePicker/DatePicker";
import ViewQuestion from "../../components/viewQuestion/ViewQuestion";

function MainPage(props) {
  const { currentUser, updateCurrentUser, viewModeON, updateViewMode } =
    useContext(UserContext);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log(currentUser.email);
    console.log(currentUser.role);

    getQuestionsByStatus("WAITING").then((r) => {
      setDisplayedQuestions(r);
      setLoaded(true);
    });

    // getAllQuestions().then((r) => {
    //   setQuestions(r);
    //   setLoaded(true)
    // });
  }, []);

  const [questions, setQuestions] = useState([]);
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [rejectedQuestions, setRejectedQuestions] = useState([]);
  const [waitingQuestions, setWaitingQuestions] = useState([]);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);

  // useEffect(() => {
  //   if (questions) {
  //     const newApprovedQuestions = [];
  //     const newRejectedQuestions = [];
  //     const newWaitingQuestions = [];
  //
  //     questions.forEach((question) => {
  //       switch (question.status) {
  //         case "APPROVED":
  //           newApprovedQuestions.push(question);
  //           break;
  //         case "REJECTED":
  //           newRejectedQuestions.push(question);
  //           break;
  //         default:
  //           newWaitingQuestions.push(question);
  //           break;
  //       }
  //     });
  //
  //     setApprovedQuestions(newApprovedQuestions);
  //     setRejectedQuestions(newRejectedQuestions);
  //     setWaitingQuestions(newWaitingQuestions);
  //     setWaitingQuestions(newWaitingQuestions)
  //   }
  // }, [questions]);

  const showAcceptedQuestions = () => {
    setLoaded(false);
    getQuestionsByStatus("APPROVED").then((r) => {
      setDisplayedQuestions(r);
      setLoaded(true);
    });
    setTitle("Intrebari Acceptate");
  };

  const showRejectedQuestions = () => {
    setLoaded(false);
    getQuestionsByStatus("REJECTED").then((r) => {
      setDisplayedQuestions(r);
      setLoaded(true);
    });
    setTitle("Intrebari Respinse");
  };

  const showWaitingQuestions = () => {
    setLoaded(false);
    getQuestionsByStatus("WAITING").then((r) => {
      setDisplayedQuestions(r);
      setLoaded(true);
    });
    setTitle("Intrebari in asteptare");
  };

  const handleUpdateList = () => {
    getQuestionsByStatus("WAITING").then((r) => {
      setDisplayedQuestions(r);
    });
    setTitle("Intrebari in asteptare");
  };

  const [title, setTitle] = useState("Intrebari in asteptare");

  const goBackToQuestions = () => {
    updateViewMode({
      status: false,
      id: null,
      question: {},
    });
  };

  return (
    <>
      {!loaded ? (
        <div className={style.sidebar}>
          <div className={style.loader}></div>
        </div>
      ) : (
        <div className={style.wrapper}>
          <div className={style.sidebar}>
            {currentUser.role === "ADMIN" && viewModeON.status === true && (
              <>
                <div className={style.internalNavigation}>
                  <p className={style.title2}>Vizualizare detaliata</p>
                </div>
                <div className={style.goBack} onClick={goBackToQuestions}>
                  <span className="material-symbols-outlined">
                    chevron_left
                  </span>{" "}
                  Inapoi
                </div>
              </>
            )}
            <div className={style.calendar}>
              <DatePicker />
            </div>
            <button className={style.loadBtn} onClick={showWaitingQuestions}>
              {" "}
              Cereri in Asteptare{" "}
            </button>
            <button className={style.loadBtn} onClick={showAcceptedQuestions}>
              {" "}
              Cereri Acceptate{" "}
            </button>
            <button className={style.loadBtn} onClick={showRejectedQuestions}>
              {" "}
              Cereri Respinse{" "}
            </button>
          </div>

          <div className={style.mainContainer}>
            {viewModeON.status ? (
              <>
                <ViewQuestion />
              </>
            ) : (
              <>
                <p className={style.title}>{title}</p>
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
            )}
          </div>

          {/*<Footer/>*/}
        </div>
      )}
    </>
  );
}

export default MainPage;
