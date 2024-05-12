import { useEffect, useState } from "react";
import { AlertMessage } from "../AlertMessage";
import { PanelSubmitButton } from "../PanelSubmitButton";
import { useAppDispatch } from "store/hooks";
import { getQuestions } from "services/question.service";
import { Question } from "../QuestionDetails/slice/types";
import { Article } from "../Article";

export default function InitialSection() {
    const [questions, setQuestions] = useState<Question[]>([])
    const dispatch = useAppDispatch();
    
    const loadQuestions = async (amount: number) => {
        const result = await dispatch(getQuestions({ amount }));

        if (result.meta.requestStatus == "fulfilled") {
            if (result.payload && typeof result.payload !== "string")
            setQuestions([...questions,...result.payload]);    
        }
    }

    const loadMoreQuestionClick = async e => {
        e.preventDefault();
        await loadQuestions(5)
    }

    useEffect(() => {
        loadQuestions(5);
    }, []);

    return (
        <>
            <AlertMessage />
            <div className="clearfix" />
            <div id="row-tabs-home" className="row row-boot row-tabs">
            <div className="col col12 col-boot-sm-12">
                <div className="wrap-tabs">
                <div className="menu-tabs active-menu">
                    <ul className="menu flex menu-tabs-desktop navbar-nav navbar-secondary">
                    <li className="menu-item active-tab">
                        <a href="index5cfe.html?show=recent-questions">
                        Recent Questions
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="index11ec.html?show=most-answered">
                        Most Answered
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="index4c8e.html?show=question-bump">
                        Bump Question
                        </a>
                    </li>
                    <li className="menu-item">
                        <a href="index836b.html?show=answers">Answers</a>
                    </li>
                    <li className="menu-item">
                        <a href="indexe6b0.html?show=most-visited">
                        Most Visited
                        </a>
                    </li>
                    <li className="flexMenu-viewMore">
                        <a href="#">
                        <i className="icon-dot-3" />
                        </a>
                        <ul
                        className="flexMenu-popup"
                        style={{
                            display: 'none',
                            position: 'absolute',
                        }}
                        >
                        <li className="menu-item">
                            <a href="indexdaa9.html?show=most-voted">
                            Most Voted
                            </a>
                        </li>
                        <li className="menu-item">
                            <a href="indexc0b3.html?show=no-answers">
                            No Answers
                            </a>
                        </li>
                        </ul>
                    </li>
                    </ul>
                    <div className="wpqa_hide mobile-tabs">
                    <span className="styled-select">
                        <select className="form-control home_categories">
                        <option value="index5cfe.html?show=recent-questions">
                            Recent Recent Recent Questions
                        </option>
                        <option value="index11ec.html?show=most-answered">
                            Most Answered
                        </option>
                        <option value="index4c8e.html?show=question-bump">
                            Bump Question
                        </option>
                        <option value="index836b.html?show=answers">
                            Answers
                        </option>
                        <option value="indexe6b0.html?show=most-visited">
                            Most Visited
                        </option>
                        <option value="indexdaa9.html?show=most-voted">
                            Most Voted
                        </option>
                        <option value="indexc0b3.html?show=no-answers">
                            No Answers
                        </option>
                        </select>
                    </span>
                    </div>
                </div>
                </div>
            </div>
            <section className="loop-section">
                <h2 className="screen-reader-text">
                Discy Latest Questions
                </h2>
                <div className="post-articles question-articles">
                {
                    questions.map((question) => <Article question={question} key={question.id}/> 
                )}
                </div>
                <div className="clearfix" />
                <form onSubmit={loadMoreQuestionClick}>
                <PanelSubmitButton name="Hiển thị thêm câu hỏi" style={{ width: '100%', height: '40px'}}/>
                </form>
            </section>
            </div>
        </>
    )
}