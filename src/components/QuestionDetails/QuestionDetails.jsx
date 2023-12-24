import style from "./QuestionDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestionById } from "../../selectors/questionSelectors";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getRepliesByQuestionId } from "../../features/questionsSlice";
import FilesWrapper from "../FilesWrapper/FilesWrapper";
import ResponsiveDatePicker from "../ResponsiveDatePicker/ResponsiveDatePicker";
import MakeAppointment from "../MakeAppointment/MakeAppointment";
import Header from "../../Layouts/SideBar/Header";
import QuestionCardHeaderDetailed from "../QuestionCard/QuestionCardHeaderDetailed";
import QuestionCardBody from "../QuestionCard/QuestionCardBody";
import QuestionCardFooter from "../QuestionCard/QuestionCardFooter";
import UpdateStatus from "../QuestionCard/UpdateStatus";
import AddReply from "../QuestionCard/AddReply";
import RepliesWrapper from "../QuestionCard/RepliesWrapper";

function QuestionDetails() {
  const questionId = parseInt(useParams().questionId, 10);
  const question = useSelector((state) =>
    selectQuestionById(state, questionId),
  );
  const dispatch = useDispatch();
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [wasClicked, setWasClicked] = useState(true);

  useEffect(() => {
    dispatch(getRepliesByQuestionId(questionId));
  }, []);

  function handleSelectedDays(date) {}


  return (
    <div className={style.mainContainer}>
      <Header title={"Vizualizare Detaliata"} />
      <div className={style.questionWrapper}>
        <QuestionCardHeaderDetailed
          question={question}
          updatedStatus={updatedStatus}
        />

        <QuestionCardBody question={question} />

        <QuestionCardFooter
          question={question}
          sendIsExpanded={(value) => setIsExpanded(value)}
          wasClicked={wasClicked}
          sendWasCliked={() => setWasClicked((prevState) => !prevState)}
          sendUpdatedStatus={(value) => setUpdatedStatus(value)}
          isDetailed={true}
        />

        {isExpanded && (
          <FilesWrapper
            fileInfo={question.fileInfo}
            fileNumber={question.fileNumber}
          />
        )}

        {updatedStatus && question.status === "WAITING" && (
          <UpdateStatus question={question} updatedStatus={updatedStatus} />
        )}

        {!wasClicked && (
          <div className={style.datePickerWrapper}>
            <MakeAppointment
                question={question}
            />
          </div>
        )}

        {(question.replyNumber > 0 || (question.replies && question.replies.length > 0)) && (
          <RepliesWrapper question={question} />
        )}

        {question.status !== "WAITING" && <AddReply question={question} />}

      </div>
    </div>
  );
}

export default QuestionDetails;
