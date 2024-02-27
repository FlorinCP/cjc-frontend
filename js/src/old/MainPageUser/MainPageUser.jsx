import React, { useContext, useEffect, useState } from "react";
import style from "./MainPageUser.module.css";
import Question from "../QuestionShort/Question";
import { getQuestionsForUser, mapToObject } from "../../services/question_api";
import { getUser } from "../../services/user_api";
import Footer from "../../Layouts/Footer/Footer";
import UserContext from "../../context/UserContext";
import { Link } from "react-router-dom";

function MainPageUser(props) {
  const { currentUser, updateCurrentUser } = useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    console.log(currentUser.email);
    getUser(currentUser.email).then((r) => setUserDetails(r));
    getQuestionsForUser(currentUser.email).then((r) => {
      setQuestions(r);
      setLoaded(true);
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
      {!loaded ? (
        <div className={style.loading}>
          <div className={style.loader}></div>
        </div>
      ) : (
        <>
          <div className={style.profileCard}>
            <p>{userDetails.email}</p>
            <p>{userDetails.role}</p>
            <p>{userDetails.phone}</p>
            <p>{userDetails.nume}</p>
            <p>{userDetails.prenume}</p>
          </div>

          <p className={style.title}>Intrebarile Dumneavoastra</p>
          {questions.length > 0 ? (
            <div className={style.questionContainer}>
              {questions.map((question, index) => (
                <Question
                  id={question.id}
                  email={question.email}
                  phone={question.phone}
                  questionText={question.questionText}
                  questionTitle={question.questionTitle}
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
          ) : (
            <>
              <h2 className={style.error}>
                {" "}
                Momentan nu ati adresat nici o intrebare{" "}
              </h2>
              <h2>
                Oricand ne puteti adresa o intrebare{" "}
                <Link to="/add-question">AICI</Link>
              </h2>
              <img src="/refresh.svg" alt="" className={style.errorimg} />
            </>
          )}
        </>
      )}

      <Footer />
    </div>
  );
}

export default MainPageUser;
