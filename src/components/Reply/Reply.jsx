import style from "./Reply.module.css";
import React, { useState } from "react";
import { fetchPdfData } from "../../services/file_api";
import { useSelector } from "react-redux";
import ActionButton from "../ActionButton/ActionButton";
import FilesWrapper from "../FilesWrapper/FilesWrapper";

function Reply({ reply }) {
  const { email, role } = useSelector((state) => state.token);
  const isAuthor = email === reply.author.email;
  const [isExpanded, setIsExpanded] = useState(false);


  return (
    <div
      className={style.replyWrapper}
      style={isAuthor ? { marginLeft: "auto" } : { marginRight: "auto" }}
    >
      <div className={style.author}>
        <div>
          <div className={style.name}>
            <span className="material-symbols-outlined">person</span>
            <h4>
              {reply.author.nume} {reply.author.prenume}{" "}
            </h4>
          </div>

          <div className={style.name}>
            <span className="material-symbols-outlined">mail</span>
            <h4> {reply.author.email}</h4>
          </div>
        </div>

        <div className={style.name}>
          <span className="material-symbols-outlined">schedule</span>
          <h4>{reply.elapsedTime} in urma</h4>
        </div>
      </div>

      <div className={style.titleAndText}>{reply.messageText}</div>

      <div className={style.filesInfoAndButtons}>

        <div className={style.name} onClick={()=>setIsExpanded((prevState) => !prevState)}>
          <span className="material-symbols-outlined">draft</span>
          <h4>{reply.fileInfo.length} fisiere</h4>
        </div>

        <div className={style.expand} onClick={()=>setIsExpanded((prevState) => !prevState)}>
          {isExpanded ? (
            <span className="material-symbols-outlined">expand_less</span>
          ) : (
            <span className="material-symbols-outlined">expand_more</span>
          )}
        </div>

        <></>
      </div>

      {isExpanded && reply.fileInfo.length > 0 && <FilesWrapper fileInfo={reply.fileInfo} fileNumber={reply.fileNumber}/>}
    </div>
  );
}

export default Reply;
