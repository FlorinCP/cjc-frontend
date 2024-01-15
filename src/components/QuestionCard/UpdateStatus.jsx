import style from "../QuestionDetails/QuestionDetails.module.css";
import ActionButton from "../ActionButton/ActionButton";
import React, { useState } from "react";
import { mapToObject, updateStatus } from "../../services/question_api";
import {
  getRepliesByQuestionId,
  updateQuestionStatus,
} from "../../features/questionsSlice";
import { sendReply } from "../../services/reply_api";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function UpdateStatus({ question, updatedStatus }) {
  const questionId = parseInt(useParams().questionId, 10);
  const dispatch = useDispatch();
  const { email } = useSelector((state) => state.token);
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [replyFiles, setReplyFiles] = useState(null);
  const [replyText, setReplyText] = useState("");

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    const obj = mapToObject(filesArray);
    console.log(obj);
    setSelectedFilesObj(obj);
    setReplyFiles(filesArray);
  };
  const token = useSelector((state) => state.token.token);

  const updateQuestion = () => {
    updateStatus(question.id, updatedStatus).then(() => {
      dispatch(
        updateQuestionStatus({ questionId: questionId, status: updatedStatus }),
      );
    });

    const formData = new FormData();
    formData.append("text", replyText);
    formData.append("questionId", question.id);
    formData.append("email", email);
    if (replyFiles) {
      replyFiles.forEach((file) => {
        formData.append(`replyFiles`, file);
      });
    } else {
      formData.append(`replyFiles`, []);
    }

    if (replyText !== "") {
      sendReply(formData,token).then((r) => {
        dispatch(getRepliesByQuestionId(questionId,token));
      });
    }

    setReplyText("");
    setReplyFiles(null);
  };

  return (
    <div className={style.updateStatus}>
      <i>
        * Inainte de a trimite raspunsul final referitor la statusul cererii va rugam sa adaugati mentiuni
      </i>
      <textarea
        name="questionText"
        className={style.enterQuestion}
        value={replyText}
        onChange={(e) => {
          setReplyText(e.target.value);
        }}
      ></textarea>

      <div className={style.filesInfoAndButtons2}>
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

        <div className={style.singleButtonWrapper}>
          <ActionButton
            text={"Trimite"}
            color={"white"}
            active={true}
            width={"100%"}
            backgroundColor={"#1888ff"}
            onClick={updateQuestion}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateStatus;
