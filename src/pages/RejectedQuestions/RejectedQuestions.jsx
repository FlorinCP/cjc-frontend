import React, {useContext, useState} from 'react';
import style from './RejectedQuestions.module.css'
import {getQuestionsByStatus} from "../../services/question_api";
import UserContext from "../../context/UserContext";
import {useHistory} from "react-router-dom";
function RejectedQuestions(props) {

    const { currentUser, updateCurrentUser, viewModeON, updateViewMode } =
        useContext(UserContext);
    const [loaded, setLoaded] = useState(false);
    const [currentQuestionStatus, setCurrentQuestionStatus] = useState("WAITING");
    const [displayedQuestions, setDisplayedQuestions] = useState([]);
    const [currentDisplayedComponent, setCurrentDisplayedComponent] =
        useState("QuestionList");
    const history = useHistory();

    // const showRejectedQuestions = () => {
    //     setCurrentQuestionStatus("REJECTED");
    //     setLoaded(false);
    //     getQuestionsByStatus("REJECTED").then((r) => {
    //         setDisplayedQuestions(r);
    //         setLoaded(true);
    //     });
    //     setTitle("Intrebari Respinse");
    // };

    return (
        <div></div>
    );
}

export default RejectedQuestions;