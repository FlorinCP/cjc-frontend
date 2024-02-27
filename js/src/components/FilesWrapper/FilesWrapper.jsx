import style from "./FilesWrapper.module.css";
import React, {useEffect, useState} from "react";
import {mapToObject} from "../../services/question_api";
import {fetchPdfData} from "../../services/file_api";
import PDFViewer from "../PDFViewer/PDFViewer";
import {useSelector} from "react-redux";

function FileRepresentation({ fileInfo ,fileNumber}) {
  const [selectedFiles, setSelectedFiles] = useState(fileInfo);
  const [selectedFilesObj, setSelectedFilesObj] = useState(null);
  const [currentFile, setCurrentFile] = useState(null);
  const [currentFileName, setCurrentFileName] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  const [currentFilePages, setCurrentFilePages] = useState(null);
  const token = useSelector((state) => state.token.token);


  useEffect(() => {
    if (selectedFiles) {
      const obj = mapToObject(selectedFiles);
      console.log(obj);
      setSelectedFilesObj(obj);
    }
  }, [selectedFiles]);

  const showFile = (index) => {
    if (currentIndex !== index) {
      setCurrentFileName(fileInfo[index].name);
      setCurrentFilePages(fileInfo[index].pages);
      fetchPdfData(fileInfo[index].id,token).then((r) => {
        setCurrentIndex(index);
        console.log(r);
        setCurrentFile(r);
      });
    } else {
      setCurrentIndex(null);
    }
  };

  const goNext = () => {
    if (currentIndex + 1 < fileNumber) {
      showFile(currentIndex + 1);
    }
  };

  const goBack = () => {
    if (currentIndex - 1 >= 0) {
      showFile(currentIndex - 1);
    }
  };

  const closeModal = () => {
    setCurrentFile(null);
  };

  return (
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

      {currentFile && (
        <div className={style.pdfView}>
          <PDFViewer
            pdfData={currentFile}
            title={currentFileName}
            pages={currentFilePages}
            closeModalEmit={closeModal}
            moveForward={goNext}
            moveBack={goBack}
          />
        </div>
      )}
    </div>
  );
}

export default FileRepresentation;
