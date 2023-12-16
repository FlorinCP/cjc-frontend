import { useLocation, useParams } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import CircularLoadingAnimation from "../../components/LoadingAnimations/CircularLoadingAnimation";
import { getQuestionsByStatus } from "../../services/question_api";
import QuestionList from "../../components/QuestionList/QuestionList";
import style from "./ViewQuestions.module.css";

function ViewQuestions(props) {
  const { questionStatus } = useParams();

  const currentUrl = useLocation().pathname;

  const [loaded, setLoaded] = useState(false);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [title, setTitle] = useState("Intrebari in Asteptare");

  useEffect(() => {
    if (
      questionStatus === "waiting" ||
      questionStatus === "accepted" ||
      questionStatus === "rejected"
    ) {
      getQuestionsByStatus(questionStatus.toUpperCase()).then((r) => {
        setDisplayedQuestions(r);
        setLoaded(true);
      });
    }
  }, [questionStatus, currentUrl]);

  function Header() {
    return (
      <div className={style.header}>
        <p>{title}</p>
      </div>
    );
  }

  return (
    <div className={style.mainContainer}>
      {!loaded ? (
        <>
          <Header />
          <CircularLoadingAnimation />
        </>
      ) : (
        <>
          <Header />

          {displayedQuestions.length > 0 ? (
            <div>
              <QuestionList questions={displayedQuestions} />
            </div>
          ) : (
            <div className={style.notFound}>
              <img src="/eroare.svg" alt="" />
              <h2>Nu s-au gasit rezultate</h2>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ViewQuestions;
