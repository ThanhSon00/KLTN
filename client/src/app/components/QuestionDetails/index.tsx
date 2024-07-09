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
import Answers from '../Answers';
import { QuestionBottom } from '../QuestionBottom';
import BreadCrumb from '../BreadCrumbs';
import { AlertMessage } from '../AlertMessage';

interface Props {
  highlight?: boolean;
}

export default function QuestionDetails(props: Props) {
  const { id, answerId } = useParams();
  const [question, setQuestion] = useState<Question>();
  const { user } = useAppSelector(getAuth);
  const loadDetails = async () => {
    const question = await getQuestion(id);
    setQuestion(question);
  };

  useEffect(() => {
    loadDetails();
  }, [id, user]);

  return (
    <>
      <AlertMessage />
      <BreadCrumb question={question}/>
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
                    <QuestionInner question={question} author={question.author} highlight={props.highlight}  />
                    <QuestionBottom author={question.author}/>
                  </>
                )}
              </div>
              <div className={"question-adv-comments question-comments-before question-" + (user ? "has" : "has" ) +"-comments question-has-tabs"}>
                {question && 
                  <>
                    <LeaveAnswerForm question={question} setQuestion={setQuestion}/>
                    <Answers answers={question.answers} question={question} highlightAnswerDetailsId={answerId} updateQuestion={setQuestion}/>
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
