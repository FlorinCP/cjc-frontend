import style from "../QuestionDetails/QuestionDetails.module.css";
import ActionButton from "../ActionButton/ActionButton";
import React, { useState } from "react";
import { mapToObject } from "../../services/question_api";
import { sendReply } from "../../services/reply_api";
import { getRepliesByQuestionId } from "../../features/questionsSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

function AddReply({ question }) {
  const dispatch = useDispatch();
  const questionId = parseInt(useParams().questionId, 10);
  const { email } = useSelector((state) => state.token);

  const [replyText, setReplyText] = useState("");
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [replyFiles, setReplyFiles] = useState(null);

  const handleFileChange = (e) => {
    const filesArray = Array.from(e.target.files);
    const obj = mapToObject(filesArray);
    console.log(obj);
    setSelectedFilesObj(obj);
    setReplyFiles(filesArray);
  };

  const token = useSelector((state) => state.token.token);

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

    sendReply(formData,token).then((r) => {
      dispatch(getRepliesByQuestionId(questionId,token));
    });

    setReplyText("");
    setReplyFiles(null);
  }

  return (
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

      <div className={style.replyActions}>
        <div className={style.desktop}>
          <label htmlFor="file-upload" className={style.customFileUpload}>
            <span className="material-symbols-outlined">cloud_upload</span>
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
            backgroundColor={"#3ca2ec"}
            onClick={addReply}
          >
            <span className="material-symbols-outlined">outgoing_mail</span>
          </ActionButton>
        </div>
      </div>
    </div>
  );
}

export default AddReply;
