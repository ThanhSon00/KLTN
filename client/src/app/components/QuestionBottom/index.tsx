/**
 *
 * QuestionBottom
 *
 */
import * as React from 'react';
import { User } from '../SignInPanel/slice/types';
import { useAppSelector } from 'store/hooks';
import { getAuth } from '../SignInPanel/slice/selectors';
import { useNavigate, useParams } from 'react-router-dom';

interface Props {
  author: User;
}

export function QuestionBottom(props: Props) {
  const { user } = useAppSelector(getAuth);
  const { id } = useParams();
  const navigate = useNavigate();

  const editQuestionClick = (e) => {
    e.preventDefault();
    navigate(`/home/edit-question/${id}`);
  }

  return (
    <div className="question-bottom">
      <div className="post-share">
        <span>
          <i className="icon-share" />
          <span>Share</span>
        </span>
        <ul className="social-icons list-unstyled mb-0 d-flex align-items-center">
          <li className="share-facebook">
            <a
              target="_blank"
              href="http://www.facebook.com/sharer.php?u=https://2code.info/demo/themes/Discy/Main/question/testing-title/&t=Testing+title"
              rel="noreferrer"
            >
              <i className="icon-facebook" />
              <span>
                <span>Facebook</span>
              </span>
            </a>
          </li>
          <li className="share-twitter">
            <a
              target="_blank"
              href="http://twitter.com/share?text=Testing+title&url=https://2code.info/demo/themes/Discy/Main/question/testing-title/"
              rel="noreferrer"
            >
              <i className="icon-twitter" />
              <span />
            </a>
          </li>
          <li className="share-linkedin">
            <a
              target="_blank"
              href="http://www.linkedin.com/shareArticle?mini=true&url=https://2code.info/demo/themes/Discy/Main/question/testing-title/&title=Testing+title"
              rel="noreferrer"
            >
              <i className="icon-linkedin" />
              <span />
            </a>
          </li>
          <li className="share-whatsapp">
            <a
              target="_blank"
              href="https://api.whatsapp.com/send?text=Testing+title - https://2code.info/demo/themes/Discy/Main/question/testing-title/"
              rel="noreferrer"
            >
              <i className="fab fa-whatsapp" />
              <span />
            </a>
          </li>
        </ul>
      </div>
      <ul className="question-link-list">
        {user && user.id === props.author.id && 
          <>
            <li>
              <a
                className="dropdown-item"
                href="/"
                onClick={editQuestionClick}
              >
                <i className="icon-pencil" />
                Edit
              </a>
            </li>
            <li>
              <a
                className="dropdown-item question-delete"
                href="/"
              >
                <i className="icon-trash" />
                Delete
              </a>
            </li>
            <li>
              <a
                className="dropdown-item question-close"
                href="/"
                data-nonce="343b890e13"
                title="Close the question"
              >
                <i className="icon-lock" />
                Close
              </a>
            </li>
          </>
        }
        <li className="report_activated">
          <a className="dropdown-item report_q" href="/">
            <i className="icon-attention" />
            Report
          </a>
        </li>
      </ul>
      <div className="clearfix" />
    </div>
  );
}
