import style from "./Reply.module.css";
import React, { useState } from "react";
import { fetchPdfData } from "../../services/file_api";
import { useSelector } from "react-redux";
import ActionButton from "../ActionButton/ActionButton";

function Reply({ reply }) {
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentFileName, setCurrentFileName] = useState(null);
  const [currentFilePages, setCurrentFilePages] = useState(null);
  const { email, role } = useSelector((state) => state.token);
  const isAuthor = email === reply.author.email;

  const showFile = (index) => {
    if (currentIndex !== index) {
      setCurrentFileName(reply.fileInfo[index].name);
      setCurrentFilePages(reply.fileInfo[index].pages);
      fetchPdfData(reply.fileInfo[index].id).then((r) => {
        setCurrentIndex(index);
        console.log(r);
        setCurrentFile(r);
      });
    } else {
      setCurrentIndex(null);
    }
  };

  const [isExpanded, setIsExpanded] = useState(false);
  const expand = () => {
    setIsExpanded((prevState) => !prevState);
  };

  const [selectedFilesObj, setSelectedFilesObj] = useState(null);

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

        <div className={style.name} onClick={expand}>
          <span className="material-symbols-outlined">draft</span>
          <h4>{reply.fileInfo.length} fisiere</h4>
        </div>

        <div className={style.expand} onClick={expand}>
          {isExpanded ? (
            <span className="material-symbols-outlined">expand_less</span>
          ) : (
            <span className="material-symbols-outlined">expand_more</span>
          )}
        </div>

        <></>
      </div>

      {isExpanded && reply.fileInfo.length>0 &&(
        <div className={style.uploadedFiles}>
          {selectedFilesObj &&
            selectedFilesObj.map((file, index) => (
              <div
                className={style.fileRepresentation}
                key={index}
                onClick={() => showFile(index)}
              >
                <img src={file.image.src} alt="" />
                <p>{file.name}</p>
                {file.size ? <h4>{file.size} MB</h4> : <></>}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}

export default Reply;
