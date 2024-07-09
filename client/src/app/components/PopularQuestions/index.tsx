import { useEffect, useState } from "react";
import { Question } from "../QuestionDetails/slice/types";
import { getQuestions } from "services/question.service";
import { useDispatch } from "react-redux";
import { useAppDispatch } from "store/hooks";
import { Avatar } from "../ReportLine";
import { Link } from "react-router-dom";
import PopularQuestionLine from "../PopularQuestionLine";
import { SortCategory } from "../InitialSection";

interface Props {
    isActive: boolean;
}

export default function PopularQuestions(props: Props) {
    const isActiveTab = props.isActive ? ' active-tab' : '';
    const [questions, setQuestions] = useState<Question[]>([]);
    const dispatch = useAppDispatch();
    const loadData = async () => {
        const result = await dispatch(getQuestions({ amount: 3, page: 1, sortDesc: SortCategory.answers }));
        if (result.meta.requestStatus === 'fulfilled') {
            if (result.payload && typeof result.payload !== 'string') {
                setQuestions(result.payload as Question[]);
            }
        }
    }

    useEffect(() => {
        loadData();
    }, []);
 
    return (
        <div 
            className={"widget-posts tab-inner-wrap tab-inner-wraptabs-widget-2" + isActiveTab}
            style={{ display: props.isActive ? 'block' : 'none' }}
        >
            <div className="user-notifications user-profile-area questions-card">
                <div>
                    <ul>
                        {questions.map((question) => <PopularQuestionLine question={question} key={question.id} />)}
                    </ul>
                </div>
            </div>
        </div>
    )
}