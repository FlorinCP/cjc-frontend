import style from "./QuestionDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectQuestionById } from "../../selectors/questionSelectors";
import { useParams } from "react-router-dom";
import ActionButton from "../ActionButton/ActionButton";
import PDFViewer from "../PDFViewer/PDFViewer";
import React, { useEffect, useState } from "react";
import { mapToObject, updateStatus } from "../../services/question_api";
import { fetchPdfData } from "../../services/file_api";
import {
  getRepliesByQuestionId,
  updateQuestionReplies,
  updateQuestionStatus,
} from "../../features/questionsSlice";
import { sendReply } from "../../services/reply_api";
import Reply from "../Reply/Reply";
import FilesWrapper from "../FilesWrapper/FilesWrapper";
import ResponsiveDatePicker from "../ResponsiveDatePicker/ResponsiveDatePicker";
import MakeAppointment from "../MakeAppointment/MakeAppointment";

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

  const expand = () => {
    if (question.fileNumber > 0) {
      setIsExpanded((prevState) => !prevState);
    }
  };

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

  function Header() {
    return (
      <div className={style.header}>
        <span className="material-symbols-outlined">pageview</span>
        <p>Vizualizare Detaliata</p>
      </div>
    );
  }

  function getICon(status) {
    if (status === "ACCEPTED") {
      return <span className="material-symbols-outlined">check</span>;
    } else if (status === "REJECTED") {
      return <span className="material-symbols-outlined">close</span>;
    } else {
      return <span className="material-symbols-outlined">hourglass_top</span>;
    }
  }

  function getColor(status) {
    switch (status) {
    }
    if (status === "ACCEPTED") {
      return "#18c52f";
    } else if (status === "REJECTED") {
      return "rgb(238, 49, 88)";
    } else {
      return "black";
    }
  }

  function openScheduleModal() {
    setWasClicked((prevState) => !prevState);
  }

  return (
    <div className={style.mainContainer}>
      <Header />
      <div className={style.questionWrapper}>
        <div className={style.author}>
          <div className={style.name}>
            <span className="material-symbols-outlined">person</span>
            <h4>
              {question.nume} {question.prenume}{" "}
            </h4>
          </div>
          <div className={style.name}>
            <span className="material-symbols-outlined">call</span>
            <h4>{question.phone}</h4>
          </div>

          <div className={style.name}>
            <span className="material-symbols-outlined">mail</span>
            <h4>{question.email}</h4>
          </div>

          <div className={style.name}>
            <span className="material-symbols-outlined">schedule</span>
            <h4>{question.elapsedTime} in urma</h4>
          </div>

          <div
            className={style.name}
            style={{
              color: getColor(updatedStatus ? updatedStatus : question.status),
            }}
          >
            {getICon(updatedStatus ? updatedStatus : question.status)}
            <h4>{updatedStatus ? updatedStatus : question.status}</h4>
          </div>
        </div>

        <div className={style.titleAndText}>
          <div className={style.questionTitle}>
            <div className={style.title}>{question.questionTitle}</div>
          </div>

          <div className={style.questionText}>{question.questionText}</div>
        </div>

        <div className={style.filesInfoAndButtons}>
          <div className={style.name} onClick={expand}>
            <span className="material-symbols-outlined">draft</span>
            <h4>{question.fileNumber} fisiere</h4>
          </div>

          <div className={style.expand} onClick={expand}>
            {isExpanded ? (
              <span className="material-symbols-outlined">expand_less</span>
            ) : (
              <span className="material-symbols-outlined">expand_more</span>
            )}
          </div>

          {question.status === "ACCEPTED" && role === "REGISTERED" && (
            <div>
              <ActionButton
                text={"Programeaza-te"}
                color={"white"}
                backgroundColor={"#1c79b8"}
                active={wasClicked}
                onClick={() => {
                  openScheduleModal();
                }}
              >
                <span className="material-symbols-outlined">event</span>
              </ActionButton>
            </div>
          )}

          {question.status === "WAITING" && role === "ADMIN" && (
            <div>
              <ActionButton
                text={"Refuza"}
                color={"white"}
                active={updatedStatus !== "ACCEPTED"}
                backgroundColor={"rgb(238, 49, 88)"}
                onClick={() => {
                  setUpdatedStatus("REJECTED");
                }}
              />
              <ActionButton
                text={" Accepta"}
                color={"white"}
                active={true}
                backgroundColor={"#18c52f"}
                onClick={() => {
                  setUpdatedStatus("ACCEPTED");
                }}
              />
            </div>
          )}

          {(question.status === "ACCEPTED" || question.status === "REJECTED") &&
            role === "ADMIN" && (
              <div>
                <ActionButton
                  text={"Termina"}
                  color={"white"}
                  active={true}
                  backgroundColor={"#1c79b8"}
                  onClick={() => {
                    setUpdatedStatus("DONE");
                  }}
                >
                  <span className="material-symbols-outlined">verified</span>
                </ActionButton>
              </div>
            )}

          {question.status === "REJECTED" && role === "ADMIN" && (
            <div>
              <ActionButton
                text={" Accepta"}
                color={"white"}
                backgroundColor={"#18c52f"}
                onClick={() => {
                  setUpdatedStatus("ACCEPTED");
                }}
              />
            </div>
          )}
        </div>

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

        {!wasClicked && (
          <div className={style.datePickerWrapper}>
            <MakeAppointment />
          </div>
        )}

        {wasClicked && (
          <>
            {/* Render replies */}
            {question.replyNumber > 0 && (
              <div className={style.repliesWrapper}>
                {question.replies &&
                  question.replies.map((reply, index) => (
                    <Reply reply={reply} />
                  ))}
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
                    <label
                      htmlFor="file-upload"
                      className={style.customFileUpload}
                    >
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
                    <span className="material-symbols-outlined">
                      outgoing_mail
                    </span>
                  </ActionButton>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default QuestionDetails;
