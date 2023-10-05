import React, { useContext, useEffect, useState } from "react";
import style from "./SideBar.module.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import DatePicker from "../DatePickerSidebar/DatePicker";
import UserContext from "../../context/UserContext";
import { getQuestionsByStatus } from "../../services/question_api";

function SideBar(props) {
  const { currentUser, updateCurrentUser, viewModeON, updateViewMode } =
    useContext(UserContext);
  const [loaded, setLoaded] = useState(false);
  const [currentQuestionStatus, setCurrentQuestionStatus] = useState("WAITING");
  const [displayedQuestions, setDisplayedQuestions] = useState([]);
  const [currentDisplayedComponent, setCurrentDisplayedComponent] =
    useState("QuestionList");
  const history = useHistory();

  const showAcceptedQuestions = () => {
    history.push("/accepted-questions");
    setShowSchedule(false);
  };

  const showRejectedQuestions = () => {
    history.push("/rejected-questions");
    setShowSchedule(false);
  };

  const showWaitingQuestions = () => {
    history.push("/waiting-questions");
    setShowSchedule(false);
  };

  const showWorkingQuestions = () => {
    history.push("/working-questions");
    setShowSchedule(false);
  };

  const showWeekSchedule = () => {
    history.push("/week-schedule");
    setShowRequests(false);
  };

  const showEditSchedule = () => {
    history.push("edit-schedule");
    setShowRequests(false);
  };

  const [showCalendar, setShowCalendar] = useState(false);
  const [showRequests, setShowRequests] = useState(true);
  const [showSchedule, setShowSchedule] = useState(false);

  const displaySchedule = () => {
    setShowSchedule((prevState) => !prevState);
  };

  const displayCalendar = () => {
    setShowCalendar((prevState) => !prevState);
  };

  const displayRequests = () => {
    setShowRequests((prevState) => !prevState);
  };

  const logout = () => {
    updateCurrentUser({});
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    history.push("/");
    window.location.reload();
  };

  function waitingQBtn() {
    return (
      <button
        className={
          props.currentUrl.includes("waiting-questions")
            ? style.loadBtnSelected
            : style.loadBtn
        }
        onClick={showWaitingQuestions}
      >
        <span className="material-symbols-outlined">hourglass_top</span> Cereri
        in Asteptare{" "}
      </button>
    );
  }

  function acceptedQBtn() {
    return (
      <button
        className={
          props.currentUrl.includes("accepted-questions")
            ? style.loadBtnSelected
            : style.loadBtn
        }
        onClick={showAcceptedQuestions}
      >
        <span className="material-symbols-outlined">done</span> Cereri Acceptate{" "}
      </button>
    );
  }

  function rejectedQBtn() {
    return (
      <button
        className={
          props.currentUrl.includes("rejected-questions")
            ? style.loadBtnSelected
            : style.loadBtn
        }
        onClick={showRejectedQuestions}
      >
        <span className="material-symbols-outlined">block</span> Cereri Respinse{" "}
      </button>
    );
  }

  function workingQBtn() {
    return (
      <button
        className={
          props.currentUrl.includes("working-questions")
            ? style.loadBtnSelected
            : style.loadBtn
        }
        onClick={showWorkingQuestions}
      >
        <span className="material-symbols-outlined">recent_patient</span>
        Cereri in Lucru
      </button>
    );
  }

  function requests() {
    return (
      <div
        className={
          props.currentUrl.includes("questions") || showRequests
            ? style.sidebarItemSelected
            : style.sidebarItem
        }
      >
        <div className={style.clickableSidebarItem} onClick={displayRequests}>
          <span className="material-symbols-outlined">dynamic_form</span>
          Cereri
          <div className={style.absoluteRight}>
            {showRequests ? (
              <span className="material-symbols-outlined">expand_less</span>
            ) : (
              <span className="material-symbols-outlined">expand_more</span>
            )}
          </div>
        </div>

        {showRequests && (
          <div className={style.insideSideBarItem}>
            {waitingQBtn()}

            {acceptedQBtn()}

            {rejectedQBtn()}

            {workingQBtn()}
          </div>
        )}
      </div>
    );
  }

  function detailedScheduleBtn() {
    return (
      <button
        className={
          props.currentUrl.includes("week")
            ? style.loadBtnSelected
            : style.loadBtn
        }
        onClick={showWeekSchedule}
      >
        <span className="material-symbols-outlined">date_range</span> Program
        Detaliat{" "}
      </button>
    );
  }

  function editScheduleBtn() {
    return (
      <button
        className={
          props.currentUrl.includes("edit")
            ? style.loadBtnSelected
            : style.loadBtn
        }
        onClick={showEditSchedule}
      >
        <span className="material-symbols-outlined">edit_calendar</span>{" "}
        Modifica Program{" "}
      </button>
    );
  }

  function schedule() {
    return (
      <div
        className={
          props.currentUrl.includes("schedule") || showSchedule
            ? style.sidebarItemSelected
            : style.sidebarItem
        }
      >
        <div className={style.clickableSidebarItem} onClick={displaySchedule}>
          <span className="material-symbols-outlined">calendar_month</span>
          Program
          <div className={style.absoluteRight}>
            {showSchedule ? (
              <span className="material-symbols-outlined">expand_less</span>
            ) : (
              <span className="material-symbols-outlined">expand_more</span>
            )}
          </div>
        </div>
        {showSchedule && (
          <div className={style.insideSideBarItem}>
            {detailedScheduleBtn()}

            {editScheduleBtn()}
          </div>
        )}
      </div>
    );
  }

  function calendar() {
    return (
      <div
        className={showCalendar ? style.sidebarItemSelected : style.sidebarItem}
      >
        <div className={style.clickableSidebarItem} onClick={displayCalendar}>
          <span className="material-symbols-outlined">calendar_today</span>
          Calendar
        </div>

        {showCalendar && (
          <div className={style.calendar}>
            <DatePicker />
          </div>
        )}
      </div>
    );
  }

  function videocall() {
    return (
      <div className={style.sidebarItem}>
        <div className={style.clickableSidebarItem}>
          <span className="material-symbols-outlined">videocam</span>
          <Link to="/videocall" className={style.link}>
            VideoCall
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={style.sidebar}>
      <div className={style.sidebarItems}>
        <Link to="/" className={style.link}>
          <img
            src="/whitelogo.png"
            alt="check-email"
            id="logo-img"
            className={style.logo}
          />
        </Link>

        <div className={style.sidebarItem}>
          <div className={style.clickableSidebarItem}>
            <span className="material-symbols-outlined">home</span>
            <Link to="/" className={style.link}>
              Pagina Principala
            </Link>
          </div>
        </div>

        {requests()}

        {schedule()}

        {videocall()}

        {calendar()}
      </div>

      <div className={style.bottom}>
        <div className={style.holly}>
          <span className="material-symbols-outlined">account_circle</span>{" "}
          {currentUser.email}
        </div>
        <span className="material-symbols-outlined" onClick={logout}>
          logout
        </span>
      </div>
    </div>
  );
}

export default SideBar;
