import React, {useContext, useEffect, useState} from 'react';
import style from "./QuestionCard.module.css"
import UserContext from "../../context/UserContext";
import {mapToObject, updateStatus} from "../../services/question_api";
import {fetchPdfData} from "../../services/file_api";
import PDFViewer from "../PDFViewer/PDFViewer";
// import {useHistory} from "react-router-dom";

function QuestionCard(props) {

    const [selectedFilesObj, setSelectedFilesObj] = useState(null);
    const { currentUser, updateCurrentUser, updateViewMode, viewModeON } =
        useContext(UserContext);
    const [isExpanded, setIsExpanded] = useState(false);
    const [selectedFiles, setSelectedFiles] = useState(
        props.fileInfo,
    );
    const [currentFile, setCurrentFile] = useState(null);
    const [currentFileName, setCurrentFileName] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(null);
    const [currentFilePages, setCurrentFilePages] = useState(null);

    useEffect(() => {
        if (selectedFiles) {
            const obj = mapToObject(selectedFiles);
            console.log(obj);
            setSelectedFilesObj(obj);
        }
    }, [selectedFiles]);

    // useEffect(() => {
    //
    // }, []);

    const expand = () => {
        setIsExpanded((prevState) => !prevState);
    };

    const rejectQuestion = () => {
        updateStatus(props.id, "reject").then(() => {
            props.updateList();
        });
    };

    const approveQuestion = () => {
        updateStatus(props.id, "accepted").then(() => {
            props.updateList();
        });
    };
    // const history = useHistory();

    const viewQuestion = () => {
        updateViewMode({
            status: true,
            id: props.inStorePosition,
            question: props
        })
        // history.push("/view-question")
    };

    const showFile = (index) => {
        if (currentIndex !== index) {
            setCurrentFileName(props.fileInfo[index].name);
            setCurrentFilePages(props.fileInfo[index].pages);
            fetchPdfData(props.fileInfo[index].id).then((r) => {
                setCurrentIndex(index);
                console.log(r);
                setCurrentFile(r);
            });
        } else {
            setCurrentIndex(null);
        }
    };

    const goNext = () => {
        if (currentIndex + 1 < props.fileNumber ) {
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
        <>
            <div className={style.questionWrapper}>
                <div className={style.status}>
                    {viewModeON.question.status === "WAITING" &&
                        currentUser.role === "USER" && (
                            <div>
                                <h2>Intrebarea dumneavoastra se afla in asteptare</h2>
                            </div>
                        )}
                    {viewModeON.question.status === "APPROVED" &&
                        currentUser.role === "USER" && (
                            <div>
                                <h2>Intrebarea a fost apropbata</h2>
                                <h2>Apasati aici pentru a realiza o programare</h2>
                            </div>
                        )}
                    {viewModeON.question.status === "REJECTED" &&
                        currentUser.role === "USER" && (
                            <div>
                                <h2>Intrebarea a fost respinsa</h2>
                                <h2>Apasati aici pentru a afla de ce</h2>
                            </div>
                        )}
                </div>

                <div className={style.author}>
                    <div className={style.name}>
                        <span className="material-symbols-outlined">person</span>
                        <h4>{props.nume}</h4>
                        <h4>{props.prenume}</h4>
                    </div>
                    <div className={style.name}>
                        <span className="material-symbols-outlined">call</span>
                        {props.phone}
                    </div>

                    <div className={style.name}>
                        <span className="material-symbols-outlined">mail</span>
                        {props.email}
                    </div>

                    <div className={style.name}>
                        <span className="material-symbols-outlined">schedule</span>
                        {props.elapsedTime} in urma
                    </div>
                </div>

                <div className={style.titleAndText}>
                    <div className={style.questionTitle}>
                        <div className={style.title}>
                            {props.questionTitle}
                        </div>
                    </div>

                    <div className={style.questionText}>
                        {props.questionText}
                    </div>
                </div>

                <div className={style.filesInfoAndButtons}>
                    <div className={style.filesNumber} onClick={expand}>
                        <p>{props.fileNumber}</p>
                        <p>fisiere </p>
                        <span className="material-symbols-outlined">attach_file</span>
                    </div>

                    {currentUser.role === "ADMIN" && viewModeON.status === false && (
                        <div className={style.holly}>
                            <div className={style.subholly2}>
                                <button className={style.approveBtn} onClick={viewQuestion}>
                                    Vizualizeaza
                                </button>
                            </div>
                        </div>
                    )}

                    {currentUser.role === "ADMIN" && viewModeON.status === true  && (
                        <div className={style.buttonsWrapper}>
                            <button className={style.rejectBtn} onClick={rejectQuestion}>
                                Refuza
                            </button>
                            <button className={style.approveBtn} onClick={approveQuestion}>
                                Accepta
                            </button>
                        </div>
                    )}
                </div>

                {isExpanded ? (
                    <div id={style["uploadedFiles"]}>
                        {selectedFilesObj ? (
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
                            ))
                        ) : (
                            <></>
                        )}
                    </div>
                ) : (
                    <></>
                )}

                <div id={style["expand"]} onClick={expand}>
                    {isExpanded ? (
                        <span className="material-symbols-outlined">expand_less</span>
                    ) : (
                        <span className="material-symbols-outlined">expand_more</span>
                    )}
                </div>
            </div>

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
        </>
    );
}

export default QuestionCard;
