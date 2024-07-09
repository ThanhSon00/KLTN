import { useEffect, useState } from "react";
import { Question } from "../QuestionDetails/slice/types";
import { Article } from "../Article";
import { useAppDispatch, useAppSelector } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { getUserQuestions } from "services/question.service";
import { User } from "../SignInPanel/slice/types";

interface Props {
  user: User;
}
export default function UserQuestions({ user }: Props) {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(false);
    const loadQuestions = async (userId: string) => {
      const result = await getUserQuestions(userId, { amount: 5, page });
      const { hasMore } = result.pop() as { hasMore: boolean };
      setQuestions(result as Question[]);
      setHasMore(hasMore);
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
      if (user) loadQuestions(user.id);
    }, [user, page])
    
    return (
        <section className="loop-section" id="section-questions">
          <h2 className="screen-reader-text">Discy Latest Questions</h2>
          <div className="post-articles question-articles articles-no-pagination">
            {questions.length === 0 
            ? <div className="card">
              <div className="card-body">
                <div className="no-results not-found text-center">
                  <h3 className="error-desc">Không tìm thấy câu hỏi</h3>
                  <p className="mb-2rem">
                    Có vẻ như bạn chưa đặt câu hỏi nào
                  </p>
                </div>
              </div>
            </div> 
            : questions.map((question) => <Article question={question} key={question.id} />)}
          </div>
          <div className="clearfix" />
          <div className="pagination-wrap pagination-question no-pagination-wrap"> 
          <div className="main-pagination">
            <div className="pagination">
                {page > 1 &&
                    <>
                      <a className="next page-numbers" href="/" onClick={handlePrevPageClick}>
                          <i className="icon-left-open"></i>
                      </a>
                      <a className="page-numbers" href="/" onClick={e => handlePageClick(e, page - 1)}>{page - 1}</a>
                    </> 
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
          </div>
        </section>
    )
}