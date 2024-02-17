import style from "./QuestionDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestionById } from "../../selectors/questionSelectors";
import { useParams } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { getRepliesByQuestionId } from "../../features/questionsSlice";
import FilesWrapper from "../FilesWrapper/FilesWrapper";
import MakeAppointment from "../MakeAppointment/MakeAppointment";
import Header from "../../Layouts/SideBar/Header";
import QuestionCardBody from "../QuestionCard/QuestionCardBody";
import QuestionCardFooter from "../QuestionCard/QuestionCardFooter";
import UpdateStatus from "../QuestionCard/UpdateStatus";
import AddReply from "../QuestionCard/AddReply";
import RepliesWrapper from "../QuestionCard/RepliesWrapper";
import QuestionCardHeader from "../QuestionCard/QuestionCardHeader";
import Status from "../Status/Status";

function QuestionDetails() {
  const questionId = parseInt(useParams().questionId, 10);
  const question = useSelector((state) =>
    selectQuestionById(state, questionId),
  );
  const dispatch = useDispatch();
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [wasClicked, setWasClicked] = useState(true);
  const [showReplies, setShowReplies] = useState(true);
  const token = useSelector((state) => state.token.token);


  useEffect(() => {
    dispatch(getRepliesByQuestionId({questionId:  questionId, bearerToken: token}));
  }, []);


  return (
    <div className={style.mainContainer}>
      <Header title={"Vizualizare Detaliata"}>
        <Status updatedStatus={updatedStatus} question={question} />
      </Header>
      <div className={style.questionsWrapper}>
        <div className={style.questionCardWrapper}>
          <QuestionCardHeader question={question} />

          <QuestionCardBody question={question} />

          <QuestionCardFooter
            question={question}
            sendIsExpanded={(value) => setIsExpanded(value)}
            wasClicked={wasClicked}
            sendWasCliked={() => {
              setWasClicked((prevState) => !prevState);
              setShowReplies(false);
            }}
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
              <MakeAppointment question={question} />
            </div>
          )}

          <div className={style.line}></div>
          <div className={style.toggleReplies}
          onClick={()=> setShowReplies(prevState => !prevState)}
          >
            <p>Mesaje</p>
            {showReplies ? (
              <span className="material-symbols-outlined">remove</span>
            ) : (
              <span className="material-symbols-outlined">add</span>
            )}
          </div>

          {showReplies && (
            <>
              {(question.replyNumber > 0 ||
                (question.replies && question.replies.length > 0)) && (
                <>
                  <RepliesWrapper question={question} />
                </>
              )}

              {question.status !== "WAITING" && (
                <AddReply question={question} />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default QuestionDetails;
