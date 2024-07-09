import parse from 'html-react-parser';
import { useEffect, useState } from "react"
 import { countUserQuestions } from "services/question.service";
import { countUserAnswers } from "services/answer.service";
import { User } from '../SignInPanel/slice/types';

interface Props {
  user: User;
}
export default function UserAbout(props: Props) {
  const [questionsCount, setQuestionsCount] = useState(0);
  const [answersCount, setAnswersCount] = useState(0);
  const loadStatics = async (userId: string) => {
    setAnswersCount(await countUserAnswers(userId));
    setQuestionsCount(await countUserQuestions(userId));
  }
  useEffect(() => {
    if (props.user) loadStatics(props.user.id);
  }, [props.user])

    return (
          <div className="user-area-content page-has-following">
            <div className="post-section user-area user-area-advanced user-advanced user-area-head block-section-div widget-not-icon-user">
              <div className="post-inner member__info community__info">
                <div className="user-content">
                <div className="user-inner">
                  <div className="bio_editor member__bio mb-0">
                    {parse(props.user.description || "")}
                  </div>
                  <div className="user-data">
                    <ul className="info__list list-unstyled mb-0 mt-3 d-flex justify-content-center align-items-center">
                      {props.user.city && 
                        <li className="city-country info__item">
                          <i className="info__icon icon-location" />
                          <span className="info__text">{props.user.city}</span>
                        </li>
                      }
                      {props.user.phoneNumber && 
                        <li className="user-phone info__item">
                          
                          <i className="info__icon icon-phone" />
                          <span className="info__text">{props.user.phoneNumber}</span>
                        </li>
                      }
                      {props.user.gender &&
                        <li className="user-gender info__item">
                          
                          <i className="info__icon icon-heart" />
                          <span className="info__text">{props.user.gender === 'Female' ? 'Nữ' : 'Nam' }</span>
                        </li>
                      }
                      {props.user.age && 
                        <li className="user-age info__item">
                          
                          <i className="info__icon icon-globe" />
                          <span className="info__text">{props.user.age} Tuổi</span>
                        </li>
                      }
                    </ul>
                  </div>
                </div>
                  <div className="social-ul">
                    <ul className="social-icons list-unstyled mb-0 mt-4 d-flex align-items-center justify-content-center">
                      <li className="social-email">
                        <a
                          className="tooltip-n"
                          href={`mailto:${props.user.email}`}
                          target="_blank"
                          rel="nofollow"
                          original-title="Email"
                        >
                          <i className="icon-mail" />
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="clearfix" />
              </div>
            </div>
            <div className="user-stats block-section-div stats-card">
              <ul className="row row-warp row-boot list-unstyled mb-0 d-flex justify-content-between">
                <li className="col col-boot-sm-6 stats-card__item col3 user-questions">
                  <div className="d-flex justify-content-between stats-card__item_div">
                    <a
                      className="stats-card__item_a"
                      href="questions/index.html"
                    />
                    <i className="icon-book-open" />
                    <div className="stats-card__item__text w-100">
                      <span>{questionsCount}</span> <h4>Câu hỏi</h4>
                    </div>
                  </div>
                </li>
                <li className="col col-boot-sm-6 stats-card__item col3 user-answers">
                  <div className="d-flex justify-content-between stats-card__item_div">
                    <a className="stats-card__item_a" href="answers/index.html" />
                    <i className="icon-comment" />
                    <div className="stats-card__item__text w-100">
                      <span>{answersCount}</span> <h4>Trả lời</h4>
                    </div>
                  </div>
                </li>
                <li className="col col-boot-sm-6 stats-card__item col3 user-best-answers">
                  <div className="d-flex justify-content-between stats-card__item_div">
                    <a
                      className="stats-card__item_a"
                      href="best-answers/index.html"
                    />
                    <i className="icon-graduation-cap" />
                    <div className="stats-card__item__text w-100">
                      <span>0</span> <h4>Trả lời tốt nhất</h4>
                    </div>
                  </div>
                </li>
                <li className="col col-boot-sm-6 stats-card__item col3 user-points">
                  <div className="d-flex justify-content-between stats-card__item_div">
                    <a className="stats-card__item_a" href="points/index.html" />
                    <i className="icon-bucket" />
                    <div className="stats-card__item__text w-100">
                      <span>0</span> <h4>Điểm</h4>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
    )
}