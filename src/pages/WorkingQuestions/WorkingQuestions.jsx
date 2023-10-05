import React, {useContext, useState} from 'react';
import style from './WorkingQuestions.module.css'
import UserContext from "../../context/UserContext";
import {useHistory} from "react-router-dom";

function WorkingQuestions(props) {

    const { currentUser, updateCurrentUser, viewModeON, updateViewMode } =
        useContext(UserContext);
    const [loaded, setLoaded] = useState(false);
    const [currentQuestionStatus, setCurrentQuestionStatus] = useState("WAITING");
    const [displayedQuestions, setDisplayedQuestions] = useState([]);
    const [currentDisplayedComponent, setCurrentDisplayedComponent] =
        useState("QuestionList");
    const history = useHistory();

    return (
        <div></div>
    );
}

export default WorkingQuestions;