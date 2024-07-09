import { useEffect, useState } from "react";
import { useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { countUserAnswers } from "services/answer.service";
import { countUserQuestions } from "services/question.service";

export default function UserStatics() {
    const { user } = useAppSelector(getAuth);
    const [questionsCount, setQuestionsCount] = useState(0);
    const [answersCount, setAnswersCount] = useState(0);
    const loadStatics = async (userId: string) => {
        setAnswersCount(await countUserAnswers(userId));
        setQuestionsCount(await countUserQuestions(userId));
    }
  
    useEffect(() => {
        if (user) loadStatics(user.id);
    }, [user]);
    return (
        <section
            id="stats-widget-2"
            className="widget-no-divider widget stats-widget">
            <h3 className="screen-reader-text">Stats</h3>
            <div className="widget-wrap stats-card">
                <ul className="stats-inner list-unstyled mb-0">
                <li className="stats-card__item stats-questions">
                    <div className="d-flex justify-content-between stats-card__item_div">
                    <span className="stats-text">Câu hỏi</span>
                    <span className="stats-value">{questionsCount}</span>
                    </div>
                </li>
                <li className="stats-card__item stats-answers">
                    <div className="d-flex justify-content-between stats-card__item_div">
                    <span className="stats-text"> Câu trả lời </span>
                    <span className="stats-value">{answersCount}</span>
                    </div>
                </li>
                <li className="stats-card__item stats-best_answers">
                    <div className="d-flex justify-content-between stats-card__item_div">
                    <span className="stats-text">Trả lời tốt nhất</span>
                    <span className="stats-value"> 0 </span>
                    </div>
                </li>
                <li className="stats-card__item stats-users">
                    <div className="d-flex justify-content-between stats-card__item_div">
                    <span className="stats-text"> Người dùng </span>
                    <span className="stats-value"> 0 </span>
                    </div>
                </li>
                </ul>
            </div>
        </section>
    )
}