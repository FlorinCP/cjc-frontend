import style from "./QuestionDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestionById } from "../../selectors/questionSelectors";
import { useParams } from "react-router-dom";
import ActionButton from "../ActionButton/ActionButton";
import React, { useEffect, useState } from "react";
import { mapToObject, updateStatus } from "../../services/question_api";
import {
  getRepliesByQuestionId,
  updateQuestionReplies,
  updateQuestionStatus,
} from "../../features/questionsSlice";
import { sendReply } from "../../services/reply_api";
import Reply from "../Reply/Reply";
import FilesWrapper from "../FilesWrapper/FilesWrapper";
import ResponsiveDatePicker from "../ResponsiveDatePicker/ResponsiveDatePicker";
import Header from "../../Layouts/SideBar/Header";
import QuestionCardHeaderDetailed from "../QuestionCard/QuestionCardHeaderDetailed";
import QuestionCardBody from "../QuestionCard/QuestionCardBody";
import QuestionCardFooter from "../QuestionCard/QuestionCardFooter";

function QuestionDetails() {
  const questionId = parseInt(useParams().questionId, 10);
  const question = useSelector((state) =>
    selectQuestionById(state, questionId),
  );
  const { email, role } = useSelector((state) => state.token);
  const dispatch = useDispatch();
  const [updatedStatus, setUpdatedStatus] = useState(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [replyText, setReplyText] = useState("");
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [replyFiles, setReplyFiles] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const [wasClicked, setWasClicked] = useState(true);

  useEffect(() => {
    dispatch(getRepliesByQuestionId(questionId));
  }, []);



  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    const obj = mapToObject(filesArray);
    console.log(obj);
    setSelectedFilesObj(obj);
    setReplyFiles(filesArray);
  };

  function addReply() {
    const formData = new FormData();
    formData.append("text", replyText);
    formData.append("questionId", question.id);
    formData.append("email", email);
    if (replyFiles) {
      replyFiles.forEach((file) => {
        formData.append(`replyFiles`, file);
      });
    } else {
      formData.append(`replyFiles`, null);
    }

    sendReply(formData).then((r) => {
      dispatch(getRepliesByQuestionId(questionId));
    });

    setReplyText("");
    setReplyFiles(null);
  }

  const updateQuestion = () => {
    updateStatus(question.id, updatedStatus).then(() => {
      dispatch(
        updateQuestionStatus({ questionId: questionId, status: updatedStatus }),
      );
    });

    const formData = new FormData();
    formData.append("replyText", replyText);
    formData.append("questionId", question.id);
    formData.append("email", email);
    if (replyFiles) {
      replyFiles.forEach((file) => {
        formData.append(`replyFiles`, file);
      });
    } else {
      formData.append(`replyFiles`, null);
    }

    sendReply(formData).then((r) => {
      console.log(r);
    });

    setReplyText("");
    setReplyFiles(null);
  };

  function handleSelectedDays(date) {
    
  }

  return (
    <div className={style.mainContainer}>
      <Header title={"Vizualizare Detaliata"} />
      <div className={style.questionWrapper}>

        <QuestionCardHeaderDetailed question={question}  updatedStatus={updatedStatus}/>

        <QuestionCardBody question={question} />

        <QuestionCardFooter
            question={question}
            sendIsExpanded={(value) => setIsExpanded(value)}
            wasClicked={wasClicked}
            sendWasCliked={()=>setWasClicked(prevState => !prevState)}
            sendUpdatedStatus={(value) => setUpdatedStatus(value)}
            isDetailed={true}
        />

        {isExpanded && (
          <FilesWrapper
            fileInfo={question.fileInfo}
            fileNumber={question.fileNumber}
          />
        )}

        {/* If waiting change status and optionaly add reply */}

        {updatedStatus && question.status === "WAITING" && (
          <div className={style.updateStatus}>
            <i>
              * Inainte de a trimite raspunsul final referitor la acceptarea sau
              refuzarea cererii va rugam sa adaugati mentiuni
            </i>
            <textarea
              name="questionText"
              className={style.enterQuestion}
              value={replyText}
              onChange={(e) => {
                setReplyText(e.target.value);
              }}
            ></textarea>

            <div>
              <div>
                <label htmlFor="file-upload" className={style.customFileUpload}>
                  <span className="material-symbols-outlined">draft</span>
                  <span>Alegeti fisierele</span>
                </label>

                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className={style.myFileInput}
                  multiple
                />
              </div>

              <ActionButton
                text={"Trimite"}
                color={"white"}
                active={true}
                backgroundColor={"#1c79b8"}
                onClick={updateQuestion}
              />
            </div>
          </div>
        )}


        {!wasClicked && <div className={style.datePickerWrapper}>
          <ResponsiveDatePicker
            sendSelectedDate={(date) => handleSelectedDays(date)}
          />
        </div>}


        {/* Render replies */}
        {question.replyNumber > 0 && (
          <div className={style.repliesWrapper}>
            {question.replies &&
              question.replies.map((reply, index) => <Reply reply={reply} />)}
          </div>
        )}

        {/* add reply */}

        {question.status !== "WAITING" && (
          <div className={style.updateStatus}>
            <i>* Adaugati un raspuns</i>
            <textarea
              name="questionText"
              className={style.enterQuestion}
              value={replyText}
              onChange={(e) => {
                setReplyText(e.target.value);
              }}
            ></textarea>

            <div>
              <div>
                <label htmlFor="file-upload" className={style.customFileUpload}>
                  <span className="material-symbols-outlined">draft</span>
                  <span>Alegeti fisierele</span>
                </label>

                {/*{*/}
                {/*  replyFiles && <FilesWrapper fileInfo={selectedFilesObj} fileNumber={selectedFilesObj.length}/>*/}
                {/*}*/}

                <input
                  type="file"
                  id="file-upload"
                  onChange={handleFileChange}
                  className={style.myFileInput}
                  multiple
                />
              </div>

              <ActionButton
                text={"Trimite"}
                color={"white"}
                active={true}
                backgroundColor={"purple"}
                onClick={addReply}
              >
                <span className="material-symbols-outlined">outgoing_mail</span>
              </ActionButton>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionDetails;
