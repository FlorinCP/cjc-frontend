import { useLocation, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import CircularLoadingAnimation from "../../components/LoadingAnimations/CircularLoadingAnimation";
import QuestionList from "../../components/QuestionList/QuestionList";
import style from "./ViewQuestions.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getQuestionsByStatus } from "../../features/questionsSlice";

function ViewQuestions(props) {
  const { questionStatus } = useParams();
  const currentUrl = useLocation().pathname;

  const [title, setTitle] = useState("Intrebari in Asteptare");
  const isValidStatus = ["waiting", "accepted", "rejected"].includes(questionStatus);
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);

  useEffect(() => {
      getTitle(questionStatus)
    if (isValidStatus) {
      dispatch(getQuestionsByStatus(questionStatus.toUpperCase()));
    }
  }, [questionStatus, currentUrl]);


  function getTitle(questionStatus){
      switch (questionStatus){
          case 'accepted' : setTitle("Intrebari Acceptate");
          break
          case 'rejected' : setTitle("Intrebari Respinse")
              break
          default : setTitle("Intrebari in Asteptare")
      }
  }

  function Header() {
    return (
      <div className={style.header}>
        <p>{title}</p>
      </div>
    );
  }

  if (loading)
    return (
      <div className={style.mainContainer}>
        <Header />
        <CircularLoadingAnimation />
      </div>
    );

  if (error || !isValidStatus || questions.length === 0)
    return (
      <div className={style.mainContainer}>
        <Header />
        <div className={style.notFound}>
          <img src="/eroare.svg" alt="" />
          <h2>Nu s-au gasit rezultate</h2>
        </div>
      </div>
    );

  return (
    <div className={style.mainContainer}>
      <Header />
      <QuestionList questions={questions} />
    </div>
  );
}

export default ViewQuestions;
