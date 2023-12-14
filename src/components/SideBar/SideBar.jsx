import React, { useContext, useEffect, useState } from "react";
import style from "./SideBar.module.css";
import { Link, NavLink, useLocation, useParams } from "react-router-dom";
import DatePicker from "../DatePickerSidebar/DatePicker";
import UserContext from "../../context/UserContext";
import Schedule from "../../pages/Schedule/Schedule";
function SideBar(props) {
  const { currentUser, updateCurrentUser, viewModeON, updateViewMode } =
    useContext(UserContext);
  const [questionsStatus, setQuestionsStatus] = useState();

  const { questionStatus } = useParams();


  const currentUrl = useLocation().pathname;

  useEffect(() => {
    console.log(currentUrl);
    console.log(questionStatus);
  });

  useEffect(() => {
    setShowSchedule(false);
  }, [questionsStatus]);

  const showWeekSchedule = () => {
    setShowRequests(false);
  };

  const showEditSchedule = () => {
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
    window.location.reload();
  };

  function requests() {
    return (
      <div
        className={
          currentUrl.includes("questions") || showRequests
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
            <NavLink
              to="/questions/waiting"
              className={({ isActive }) =>
                isActive ? style.loadBtnSelected : style.loadBtn
              }
            >
              <span className="material-symbols-outlined">hourglass_top</span>{" "}
              Cereri in Asteptare{" "}
            </NavLink>

            <NavLink
              to="/questions/accepted"
              className={({ isActive }) =>
                isActive ? style.loadBtnSelected : style.loadBtn
              }
            >
              <span className="material-symbols-outlined">done</span> Cereri
              Acceptate{" "}
            </NavLink>

            <NavLink
              to="/questions/rejected"
              className={({ isActive }) =>
                isActive ? style.loadBtnSelected : style.loadBtn
              }
            >
              <span className="material-symbols-outlined">block</span> Cereri
              Respinse{" "}
            </NavLink>

            <NavLink
                to="/questions/working"
                className={({ isActive }) =>
                    isActive ? style.loadBtnSelected : style.loadBtn
                }
            >
              <span className="material-symbols-outlined">recent_patient</span>
              Cereri in Lucru
            </NavLink>
          </div>
        )}
      </div>
    );
  }

  function detailedScheduleBtn() {
    return (
      <button
        className={
          currentUrl.includes("week") ? style.loadBtnSelected : style.loadBtn
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
          currentUrl.includes("edit") ? style.loadBtnSelected : style.loadBtn
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
          currentUrl.includes("schedule") || showSchedule
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

        <Schedule />
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
