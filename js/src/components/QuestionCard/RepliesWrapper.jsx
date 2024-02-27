import style from "../QuestionDetails/QuestionDetails.module.css";
import Reply from "../Reply/Reply";
import React from "react";

function RepliesWrapper({question}){

    return(
        <div className={style.repliesWrapper}>
            {question.replies &&
                question.replies.map((reply, index) => <Reply key={index} reply={reply} />)}
        </div>
    )
}


export default RepliesWrapper;
