/**
 *
 * QuestionDetails
 *
 */
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { QuestionInner } from '../QuestionInner/Loadable';
import { Question } from 'app/components/QuestionDetails/slice/types';
import { getQuestion } from 'services/question.service';
import LeaveAnswerForm from '../LeaveAnswerForm';
import { useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import Comments from '../Comments';
import { QuestionBottom } from '../QuestionBottom';
import BreadCrumb from '../BreadCrumbs';
import { AlertMessage } from '../AlertMessage';

interface Props {}

export default function QuestionDetails(props: Props) {
  const { id } = useParams();
  const [question, setQuestion] = useState<Question>();
  const { user } = useAppSelector(getAuth);

  const loadDetails = async () => {
    const question = await getQuestion(id);
    setQuestion(question);
  };

  useEffect(() => {
    loadDetails();
  }, [id]);

  // const questionIndex = questions.findIndex(
  //   question => question.id === parseInt(id),
  // );

  // if (questionIndex !== -1) {
  //   questionData = questions[questionIndex];
  // }

  return (
    <>
      <AlertMessage />
      <BreadCrumb />
      <div className="clearfix" />
      <div className="post-articles question-articles">
        <div className="activate-post-stats page-visits-post" data-id={41015} />
        <section className="loop-section">
          <h2 className="screen-reader-text">Discy Latest Questions</h2>
          <div className="post-articles question-articles articles-no-pagination">
            <article
              id="post-41015"
              className="article-question article-post question clearfix single-question question-vote-inside question-no-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-41015 type-question status-publish hentry question-category-company"
              itemProp="mainEntity"
              itemScope
              itemType="https://schema.org/Question"
            >
              <div className="single-inner-content">
                {question && (
                  <>
                    <QuestionInner question={question} author={question.author} />
                    <QuestionBottom author={question.author}/>
                  </>
                )}
              </div>
              <div className={"question-adv-comments question-comments-before question-" + (user ? "has" : "has" ) +"-comments question-has-tabs"}>
                {question && 
                  <>
                    <LeaveAnswerForm question={question} setQuestion={setQuestion}/>
                    <Comments comments={question.comments} question={question}/>
                  </>}
              </div>
            </article>
          </div>
          <div className="clearfix" />
          <div className="pagination-wrap pagination-question no-pagination-wrap"></div>
        </section>
      </div>
    </>
  );
}
