import React, {useContext, useState} from 'react';
import style from './AcceptedQuestions.module.css'
import {getQuestionsByStatus} from "../../services/question_api";
import UserContext from "../../context/UserContext";
import {useHistory} from "react-router-dom";
function AcceptedQuestions(props) {


    const { currentUser, updateCurrentUser, viewModeON, updateViewMode } =
        useContext(UserContext);
    const [loaded, setLoaded] = useState(false);
    const [currentQuestionStatus, setCurrentQuestionStatus] = useState("WAITING");
    const [displayedQuestions, setDisplayedQuestions] = useState([]);
    const [currentDisplayedComponent, setCurrentDisplayedComponent] =
        useState("QuestionList");
    const history = useHistory();

    // const showAcceptedQuestions = () => {
    //     setCurrentQuestionStatus("APPROVED");
    //     setLoaded(false);
    //     getQuestionsByStatus("APPROVED").then((r) => {
    //         setDisplayedQuestions(r);
    //         setLoaded(true);
    //     });
    //     setTitle("Intrebari Acceptate");
    // };


    return (
        <div></div>
    );
}

export default AcceptedQuestions;