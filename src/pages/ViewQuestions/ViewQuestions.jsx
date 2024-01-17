import { useLocation, useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import CircularLoadingAnimation from "../../components/LoadingAnimations/CircularLoadingAnimation";
import QuestionList from "../../components/QuestionList/QuestionList";
import style from "./ViewQuestions.module.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getQuestionsByStatus,
  getQuestionsByUserAndStatus,
} from "../../features/questionsSlice";
import Header from "../../Layouts/SideBar/Header";

function ViewQuestions(props) {
  const { questionStatus } = useParams();
  const currentUrl = useLocation().pathname;

  const [title, setTitle] = useState("Intrebari in Asteptare");
  const isValidStatus = ["waiting", "accepted", "rejected"].includes(
    questionStatus,
  );
  const dispatch = useDispatch();
  const { questions, loading, error } = useSelector((state) => state.questions);
  const { email, role, token } = useSelector((state) => state.token);

  useEffect(() => {
    getTitle(questionStatus);
    if (isValidStatus && role === "ROLE_ADMIN") {
      dispatch(
        getQuestionsByStatus({
          status: questionStatus.toUpperCase(),
          bearerToken: token,
        }),
      );
    } else {
      dispatch(
        getQuestionsByUserAndStatus({
          email: email,
          status: questionStatus.toUpperCase(),
          bearerToken: token,
        }),
      );
    }
  }, [questionStatus, currentUrl]);

  function getTitle(questionStatus) {
    switch (questionStatus) {
      case "accepted":
        setTitle("Intrebari Acceptate");
        break;
      case "rejected":
        setTitle("Intrebari Respinse");
        break;
      default:
        setTitle("Intrebari in Asteptare");
    }
  }

  function placeholder() {
    if (loading) return <CircularLoadingAnimation />;
    else if (error || !isValidStatus || questions.length === 0)
      return (
        <div className={style.notFound}>
          <img src="/eroare.svg" alt="" />
          <h2>Nu s-au gasit rezultate</h2>
        </div>
      );
  }

  function showError() {
    if (questions.length > 0) return false;
    else if (error || !isValidStatus || questions.length === 0) return true;
  }

  return (
    <div className={style.mainContainer}>
      <Header title={title} subtitle={"Vizualizare sumara cereri."} />
      {loading && (
        <div className={style.notFound}>
          <CircularLoadingAnimation
            height={"70px"}
            color={"rgb(183, 0, 255)"}
            borderWidth={"7px solid"}
          />
        </div>
      )}
      {showError() && !loading && (
        <div className={style.notFound}>
          <img src="/eroare.svg" alt="" />
          <h2>Nu s-au gasit rezultate</h2>
        </div>
      )}

      <QuestionList questions={questions} />
    </div>
  );
}

export default ViewQuestions;
