import React from 'react';
import style from './AddQuestion.module.css'
import QuestionForm from "../../components/QuestionForm/QuestionForm";
import Footer from "../../components/Footer/Footer";
function AddQuestion(props) {
    return (
        <div className={style.wrapper}>
            <div className={style.questionWrapper}>
            <QuestionForm/>
            </div>
                <Footer/>
        </div>
    );
}

export default AddQuestion;