import { useLocation, useParams} from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import CircularLoadingAnimation from "../LoadingAnimations/CircularLoadingAnimation";
import { getQuestionsByStatus } from "../../services/question_api";
import QuestionList from "../QuestionList/QuestionList";
import style from "./ViewQuestions.module.css";

function ViewQuestions(props) {
  const { questionStatus } = useParams();

  const currentUrl = useLocation().pathname;

  const [loaded, setLoaded] = useState(false);
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [title, setTitle] = useState("Intrebari in asteptare");

  useEffect(() => {

    console.log(questionStatus);
    console.log(currentUrl);


    getQuestionsByStatus(questionStatus.toUpperCase()).then((r) => {
      setDisplayedQuestions(r);
      setLoaded(true);
    });
  }, [questionStatus,currentUrl]);

  function Header() {
    return (
      <div>
        <p>{title}</p>
      </div>
    );
  }

  return (
    <div className={style.mainContainer}>
      {!loaded ? (
        <CircularLoadingAnimation />
      ) : (
        <>
          <Header />

          {displayedQuestions.length > 0 ? (
            <QuestionList questions={displayedQuestions} />
          ) : (
            <>
              <h2>Nu s-au gasit rezultate</h2>
              <img src="/eroare.svg" alt="" />
            </>
          )}
        </>
      )}
    </div>
  );
}

export default ViewQuestions;
