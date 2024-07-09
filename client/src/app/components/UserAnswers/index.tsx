import { useEffect, useState } from "react";
import { AlertMessage } from "../AlertMessage";
import { Answer, Answer as AnswerType, getUserAnswers } from "services/answer.service";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { AlertActions } from "../AlertMessage/slice";
import UserAnswer from "../UserAnswer";
import { User } from "../SignInPanel/slice/types";

interface Props {
    user: User;
}

export default function UserAnswers({ user }: Props) {
    const [answers, setAnswers] = useState<AnswerType[]>([]);
    const dispatch = useAppDispatch();
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const loadAnswers = async () => {
        const result = await dispatch(getUserAnswers({ userId: user?.id, page, pagination: true }))
        
        if (typeof result.payload === "object") {
            const { hasMore } = result.payload.pop() as { hasMore: boolean };
            console.log(result.payload);
            setAnswers(result.payload as AnswerType[]);
            setHasMore(hasMore);
        }

        if (result.payload?.length === 0) {
            dispatch(AlertActions.setAlertMessage({ warning: "Bạn hiện chưa có câu trả lời nào." }));
            setTimeout(() => {
                dispatch(AlertActions.setAlertMessage({ warning: '' }));
            }, 5000)
        }
    }

    const handleNextPageClick = (e) => {
        e.preventDefault();
        setPage(page + 1);
    }

    const handlePrevPageClick = (e) => {
        e.preventDefault();
        setPage(page - 1);
    }

    const handlePageClick = (e, pageNumber) => {
        e.preventDefault();
        setPage(pageNumber);
    }

    useEffect(() => {
        loadAnswers();
        window.scrollTo(0, 0);
    }, [user, page])

    return (
        <>
            {
                answers.length !== 0 && 
                    <>
                        <div id="section-answers" className="page-content commentslist section-page-div">
                            <ol className="commentlist clearfix">
                                {answers.map((answer) => 
                                    <UserAnswer key={answer.id} questionId={answer.questionId} answer={answer} />
                                )}
                            </ol>
                        </div>
                        <div className="main-pagination">
                            <div className="pagination">
                                {page > 1 && 
                                    <a className="next page-numbers" href="/" onClick={handlePrevPageClick}>
                                        <i className="icon-left-open"></i>
                                    </a>
                                }
                                {!hasMore && 
                                    <a className="page-numbers" href="/" onClick={e => handlePageClick(e, page - 1)}>{page - 1}</a>
                                }
                                <span aria-current="page" className="page-numbers current">{page}</span>
                                {hasMore && 
                                    <>
                                        <a className="page-numbers" href="/" onClick={e => handlePageClick(e, page + 1)}>{page + 1}</a>
                                        <a className="next page-numbers" href="/" onClick={handleNextPageClick}>
                                            <i className="icon-right-open"></i>
                                        </a>
                                    </>
                                }
                            </div>
                        </div>
                    </>
            }
        </>
    )
}