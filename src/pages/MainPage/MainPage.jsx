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
import DatePicker from "../../components/DatePickerSidebar/DatePicker";
import ViewQuestion from "../../components/viewQuestion/ViewQuestion";
import { Link, useHistory } from "react-router-dom";
import Schedule from "../Schedule/Schedule";
import Calendar from "../../components/Calendar/Calendar";
import { getDayData } from "../../services/day_api";
import SideBar from "../../components/SideBar/SideBar";

function MainPage(props) {
  const { currentUser, updateCurrentUser, viewModeON, updateViewMode } =
    useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState("WAITING");
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [currentDisplayedComponent, setCurrentDisplayedComponent] =
    useState("QuestionList");
  const history = useHistory();

  useEffect(() => {
    console.log(currentUser.email);
    console.log(currentUser.role);

    getQuestionsByStatus("WAITING").then((r) => {
      setDisplayedQuestions(r);
      setLoaded(true);
    });
  }, []);

  const showAcceptedQuestions = () => {
    setCurrentQuestionStatus("APPROVED");
    setLoaded(false);
    getQuestionsByStatus("APPROVED").then((r) => {
      setDisplayedQuestions(r);
      setLoaded(true);
    });
    setTitle("Intrebari Acceptate");
  };

  const showRejectedQuestions = () => {
    setCurrentQuestionStatus("REJECTED");
    setLoaded(false);
    getQuestionsByStatus("REJECTED").then((r) => {
      setDisplayedQuestions(r);
      setLoaded(true);
    });
    setTitle("Intrebari Respinse");
  };

  const showWaitingQuestions = () => {
    setCurrentQuestionStatus("WAITING");
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

  const reloadAllQuestions = () => {
    goBackToQuestions();
    showRejectedQuestions();
    showAcceptedQuestions();
    showAcceptedQuestions();
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [showRequests, setShowRequests] = useState(true);
  const [showWeekSchedule, setShowWeekSchedule] = useState(false);

  const displaySchedule = () => {
    setCurrentDisplayedComponent("DetailedSchedule");
    setShowWeekSchedule((prevState) => !prevState);
    setTitle("Program");
  };

  const displayCalendar = () => {
    setShowCalendar((prevState) => !prevState);
  };

  const displayRequests = () => {
    setCurrentDisplayedComponent("QuestionList");
    setCurrentQuestionStatus("WAITING");
    setShowRequests((prevState) => !prevState);
  };

  const logout = () => {
    updateCurrentUser({});
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    history.push("/");
    window.location.reload();
  };



  function loader() {
    return <div className={style.loader}></div>;
  }

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

  useEffect(() => {
    if (viewModeON.status && currentDisplayedComponent === "QuestionList") {
      setCurrentDisplayedComponent("ViewQuestion");
      setShowRequests(false);
      setTitle("Vizualizare Detaliata");
    } else {
      setCurrentDisplayedComponent("QuestionList");
    }
  }, [viewModeON.status]);

  useEffect(() => {
    if (currentDisplayedComponent !== "QuestionList") {
      setShowRequests(false);
      setCurrentQuestionStatus(null);
    }
  }, [currentDisplayedComponent]);

  function header() {
    return (
      <div className={style.header}>
        {currentUser.role === "ADMIN" && viewModeON.status === true ? (
          <>
            <div className={style.goBack} onClick={goBackToQuestions}>
              <span className="material-symbols-outlined">chevron_left</span>{" "}
              Inapoi
            </div>
          </>
        ) : (
          <div></div>
        )}

        <p className={style.title}>{title}</p>
      </div>
    );
  }

  const handleSelectedDate = async (data) => {
    if (data !== undefined) {
      console.log(data);
      setCurrentSelectionDate(data);
      setSelectedDay(await getDayData(data));
    }
  };

  const handleClosedDays = (receivedClosedDays) => {
    setClosedDays(receivedClosedDays);
  };

  const [currentSelectionDate, setCurrentSelectionDate] = useState();
  const [selectedDay, setSelectedDay] = useState();
  const [dayAppointments, setDayAppointments] = useState(null);
  const [closedDays, setClosedDays] = useState([]);

  return (
    <>
      <div className={style.wrapper}>

        {!loaded ? (
          loader()
        ) : (
          <div className={style.mainContainer}>
            {currentDisplayedComponent !== "DetailedSchedule" && header()}

            {currentDisplayedComponent === "ViewQuestion" && (
              <ViewQuestion updateList={reloadAllQuestions} />
            )}

            {currentDisplayedComponent === "QuestionList" && questionList()}

            {currentDisplayedComponent === "Schedule" && <Schedule />}

            {currentDisplayedComponent === "DetailedSchedule" && (
              <Calendar
                sendSelectedDate={handleSelectedDate}
                sendClosedDays={handleClosedDays}
              />
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default MainPage;
