import React, {useContext, useEffect, useState} from "react";
import style from "../MainPage/MainPage.module.css";
import Question from "../../components/Question/Question";
import {getAllQuestions, getQuestionsForUser, mapToObject} from "../../services/question_api";
import Footer from "../../components/Footer/Footer";
import UserContext from "../../context/UserContext";
import DatePicker from "../../components/DatePicker/DatePicker";

function MainPage(props) {

  const { currentUser ,updateCurrentUser} = useContext(UserContext);
  const [loaded,setLoaded] = useState(false)

  useEffect(() => {
    console.log(currentUser.email)
    getAllQuestions().then((r) => {
      setQuestions(r);
      setLoaded(true)
    });
  }, []);

  const [questions, setQuestions] = useState([]);
  const [approvedQuestions, setApprovedQuestions] = useState([]);
  const [rejectedQuestions, setRejectedQuestions] = useState([]);
  const [waitingQuestions, setWaitingQuestions] = useState([]);
  const [displayedQuestions,setDisplayedQuestions] = useState([])

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
      setWaitingQuestions(newWaitingQuestions)
    }
  }, [questions]);


  const showAcceptedQuestions = () =>{
    setDisplayedQuestions(approvedQuestions);
    setTitle("Intrebari Acceptate")
  }

  const showRejectedQuestions = () =>{
    setDisplayedQuestions(rejectedQuestions)
    setTitle("Intrebari Respinse")
  }

  const showWaitingQuestions = () => {
    setDisplayedQuestions(waitingQuestions)
    setTitle("Intrebari in asteptare")
  }

  const [title,setTitle] = useState("Intrebari in asteptare")

  return (
      <>
        {
          !loaded ? (
              <div className={style.sidebar}>
                <div className={style.loader}></div>
              </div>
          ) : (
              <div className={style.wrapper}>



                <div className={style.sidebar}>
                  <div className={style.calendar}>

                    <DatePicker/>
                  </div>
                  <button onClick={showWaitingQuestions}> Cereri in Asteptare </button>
                  <button onClick={showAcceptedQuestions}> Cereri Acceptate </button>
                  <button onClick={showRejectedQuestions}> Cereri Respinse </button>


                </div>

                <div className={style.mainContainer}>


                  
                  
                  <p className={style.title}>{title}</p>
                  {displayedQuestions.length > 0 ? (
                      displayedQuestions.map((question, index) => (
                          <Question
                              id={question.id}
                              email={question.email}
                              phone={question.phone}
                              questionText={question.questionText}
                              elapsedTime={question.elapsedTime}
                              status={question.status}
                              nume={question.nume}
                              prenume={question.prenume}
                              fileNumber={question.fileNumber}
                              fileInfo={question.fileInfo}
                              key={index}
                          />
                      ))
                      ) : (<>
                  <h2 className={style.error}>Nu s-au gasit rezultate</h2>
                      <img src="/eroare.svg" alt=""/>
                  </>
                  )}
                  


                </div>




                {/*<Footer/>*/}
              </div>

          )
        }
      </>

  );
}

export default MainPage;
