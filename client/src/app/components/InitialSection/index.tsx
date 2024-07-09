import { useEffect, useState } from "react";
import { AlertMessage } from "../AlertMessage";
import { PanelSubmitButton } from "../PanelSubmitButton";
import { useAppDispatch } from "store/hooks";
import { getQuestions } from "services/question.service";
import { Question } from "../QuestionDetails/slice/types";
import { Article } from "../Article";
import { Link, useLocation, useParams } from "react-router-dom";
import queryString from "query-string";

export enum SortCategory {
    answers = 'answersCount',
    votes = 'totalVotes',
    views = 'views',
    activities = 'updatedAt',
    newest = 'createdAt'
  }
  
export default function InitialSection() {
    const location = useLocation();
    const tab = queryString.parse(location.search)?.tab;
    const [section, setSection] = useState<SortCategory>(tab as SortCategory);
    const [questions, setQuestions] = useState<Question[]>([])
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(false);
    const dispatch = useAppDispatch();
    
    const loadQuestions = async (amount: number, sortDesc?: SortCategory, page = 1 ) => {
        const result = await dispatch(getQuestions({ amount, sortDesc, page, pagination: true }));

        if (result.meta.requestStatus == "fulfilled") {
            if (result.payload && typeof result.payload !== "string")
                return result.payload;    
        }
    }

    const loadNew = async (tab: SortCategory) => {
        setPage(1);
        const result = await loadQuestions(10, tab)
        if (result) {
            const { hasMore } = result.pop() as { hasMore: boolean };
            setQuestions(result as Question[]);
            setHasMore(hasMore);
        } 
    }

    const loadMoreClick = async e => {
        e.preventDefault();
        const questionsData = await loadQuestions(10, section, page + 1);
        if (questionsData) {
            const { hasMore } = questionsData.pop() as { hasMore: boolean };
            setQuestions([...questions,...questionsData as Question[]]);
            setHasMore(hasMore);
        }
    }

    const isActiveTab = (category: SortCategory) => {
        return section === category ? 'menu-item active-tab' : 'menu-item';
    }

    useEffect(() => {
        const tab = queryString.parse(location.search)?.tab;
        setSection(tab as SortCategory);
        loadNew(tab as SortCategory);
    }, [location]);

    useEffect(() => {
        setPage(Math.ceil(questions.length / 10));
    }, [questions.length])

    return (
        <>
            <AlertMessage />
            <div className="clearfix" />
            <div id="row-tabs-home" className="row row-boot row-tabs">
            <div className="col col12 col-boot-sm-12">
                <div className="wrap-tabs">
                <div className="menu-tabs active-menu">
                    <ul className="menu flex menu-tabs-desktop navbar-nav navbar-secondary">
                    <li className={isActiveTab(SortCategory.newest)}>
                        <Link to="/home?tab=createdAt">
                            Câu hỏi mới nhất
                        </Link>
                        {/* <a href="/" onClick={(e) => openSection(e, sortCategory.newest)}>
                        </a> */}
                    </li>
                    <li className={isActiveTab(SortCategory.answers)}>
                        <Link to="/home?tab=answersCount">
                            Trả lời nhiều 
                        </Link>
                    </li>
                    <li className={isActiveTab(SortCategory.activities)}>
                        <Link to="/home?tab=updatedAt">
                            Hoạt động gần đây
                        </Link>
                    </li>
                    <li className={isActiveTab(SortCategory.votes)}>
                        <Link to="/home?tab=totalVotes">
                            Bình chọn cao
                        </Link>
                    </li>
                    <li className={isActiveTab(SortCategory.views)}>
                        <Link to="/home?tab=views">
                            Nhiều người xem
                        </Link>
                    </li>
                    </ul>
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
                <form onSubmit={loadMoreClick}>
                    {hasMore ? 
                        <PanelSubmitButton name={"Hiển thị thêm câu hỏi"} style={{ width: '100%', height: '40px'}}/> : 
                        <PanelSubmitButton name={"Không còn câu hỏi để hiển thị"} style={{ width: '100%', height: '40px', background: 'gray' }} disabled={true} /> 
                    }
                </form>
            </section>
        </>
    )
}