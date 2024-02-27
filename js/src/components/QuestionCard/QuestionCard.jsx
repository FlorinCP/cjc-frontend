import React, { useContext, useEffect, useState } from "react";
import style from "./QuestionCard.module.css";
import UserContext from "../../context/UserContext";
import { mapToObject, updateStatus } from "../../services/question_api";
import { fetchPdfData } from "../../services/file_api";
import PDFViewer from "../PDFViewer/PDFViewer";
import { useSelector } from "react-redux";
import ActionButton from "../ActionButton/ActionButton";
import { useNavigate } from "react-router-dom";
import FilesWrapper from "../FilesWrapper/FilesWrapper";
import QuestionCardHeader from "./QuestionCardHeader";
import QuestionCardBody from "./QuestionCardBody";
import QuestionCardFooter from "./QuestionCardFooter";
// import {useHistory} from "react-router-dom";

function QuestionCard({ question }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className={style.questionWrapper}>
        <QuestionCardHeader question={question} />

        <QuestionCardBody question={question} />

        <QuestionCardFooter
            question={question}
            sendIsExpanded={(value) => setIsExpanded(value)}
            isDetailed={false}
        />

        {isExpanded && (
          <FilesWrapper
            fileInfo={question.fileInfo}
            fileNumber={question.fileNumber}
          />
        )}
      </div>
    </>
  );
}

export default QuestionCard;
