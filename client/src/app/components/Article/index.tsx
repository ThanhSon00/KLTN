import { Question } from "../QuestionDetails/slice/types"

interface Props {
    question: Question
    key: string
}

export function Article(props: Props) {

    return (
        <article
        className="article-question article-post question clearfix question-answer-before question-vote-inside question-with-comments answer-question-not-jquery question-vote-image discoura-not-credential question-type-normal post-118 type-question status-publish hentry question-category-language question_tags-english question_tags-language"
      >
        <div className="single-inner-content">
          <div className="question-inner">
            <div className="question-image-vote">
              <div className="author-image author__avatar author-image-42 author_image_mouseover">
                <a href="profile/martin/index.html">
                  <span className="author-image-span">
                    <img
                      className="avatar avatar-42 photo"
                      title={props.question.author.name}
                      width={42}
                      height={42}
                      src={props.question.author.avatar}
                    />
                  </span>
                </a>
                <div
                  className="author-image-pop-2 member-card"
                  data-user={6}
                >
                  <div className="post-section user-area user-area-columns_pop him-user widget-not-icon-user">
                    <div className="post-inner member__info community__info">
                      <div className="author-image author__avatar author-image-70">
                        <a href="/">
                          <span className="author-image-span">
                            <img
                              className="avatar avatar-70 rounded-circle photo"
                              title={props.question.author.name}
                              width={70}
                              height={70}
                              src={props.question.author.avatar}
                            />
                          </span>
                        </a>
                      </div>
                      <div className="user-content">
                        <div className="user-inner">
                          <div className="user-data-columns">
                            <h4 className="member__name mb-1">
                              <a href="/">
                                {props.question.author.name}
                              </a>
                            </h4>
                            <div className="user-data">
                              <ul>
                                <li className="city-country">
                                  <i className="icon-location" />
                                  {/* Damita, Egypt */}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                      {/* End user-content */}
                      <div className="user-columns-data">
                        <ul className="member__stats list-unstyled mb-0 d-flex">
                          <li className="user-columns-questions stats__item">
                            <a href="/">
                              <i className="icon-book-open" />
                              <span className="stats__count">
                                7
                              </span>
                              <span className="stats__text">
                                Questions
                              </span>
                            </a>
                          </li>
                          <li className="user-columns-answers stats__item">
                            <a href="/">
                              <i className="icon-comment" />
                              <span className="stats__count">
                                0
                              </span>
                              <span className="stats__text">
                                Answers
                              </span>
                            </a>
                          </li>
                          <li className="user-columns-best-answers stats__item">
                            <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/best-answers/">
                              <i className="icon-graduation-cap" />
                              <span className="stats__count">
                                0
                              </span>
                              <span className="stats__text">
                                Best Answers
                              </span>
                            </a>
                          </li>
                          <li className="user-columns-points stats__item">
                            <a href="https://2code.info/demo/themes/Discy/Main/profile/martin/points/">
                              <i className="icon-bucket" />
                              <span className="stats__count">
                                0
                              </span>
                              <span className="stats__text">
                                Point
                              </span>
                            </a>
                          </li>
                        </ul>
                      </div>
                      {/* End user-columns-data */}
                      <div className="user-follow-profile">
                        <div className="member__actions d-flex justify-content-between">
                          <a
                            className="btn btn__semi__height btn__primary"
                            href="/"
                          >
                            View Profile
                          </a>
                        </div>
                      </div>
                      {/* End user-follow-profile */}
                      <div className="clearfix" />
                    </div>
                    {/* End post-inner */}
                  </div>
                  {/* End post */}
                </div>
              </div>
              <ul className="question-vote question-mobile">
                <li className="question-vote-up">
                  <a
                    href="#"
                    data-id={118}
                    data-type="question"
                    data-vote-type="up"
                    className="wpqa_vote question_vote_up vote_allow"
                    title="Like"
                  >
                    <i className="icon-up-dir" />
                  </a>
                </li>
                <li className="vote_result">0</li>
                <li className="li_loader">
                  <span className="loader_3 fa-spin" />
                </li>
                <li className="question-vote-down">
                  <a
                    href="#"
                    data-id={118}
                    data-type="question"
                    data-vote-type="down"
                    className="wpqa_vote question_vote_down vote_allow"
                    title="Dislike"
                  >
                    <i className="icon-down-dir" />
                  </a>
                </li>
              </ul>
            </div>
            <div className="question-content question-content-first">
              <header className="article-header">
                <div className="question-header">
                  <a
                    className="post-author"
                    href="profile/martin/index.html"
                  >
                    {props.question.author.name}
                  </a>
                  <span
                    className="badge-span"
                    style={{ backgroundColor: '#d9a34a' }}
                  >
                    {/* Enlightened */}
                  </span>
                  <div className="post-meta">
                    <span className="post-date">
                      Asked:
                      <span className="date-separator" />
                      <a href="/">
                        <span className="entry-date published">
                          April 19, 2023
                        </span>
                      </a>
                    </span>
                    <span className="byline">
                      <span className="post-cat">
                        In:
                        <a
                          href="question-category/language/index.html"
                          rel="tag"
                        > Công nghệ thông tin
                        </a>
                      </span>
                    </span>
                  </div>
                </div>
              </header>
              <div>
                <h2 className="post-title">
                  <a
                    className="post-title"
                    href={`#/home/questions/${props.question.id}`}                    
                    rel="bookmark"
                  >
                    {props.question.title}
                  </a>
                </h2>
              </div>
            </div>
            <div className="question-not-mobile question-image-vote question-vote-sticky">
              <div className="question-sticky-stop">
                <ul className="question-vote">
                  <li className="question-vote-up">
                    <a
                      href="#"
                      data-id={118}
                      data-type="question"
                      data-vote-type="up"
                      className="wpqa_vote question_vote_up vote_allow"
                      title="Like"
                    >
                      <i className="icon-up-dir" />
                    </a>
                  </li>
                  <li className="vote_result">0</li>
                  <li className="li_loader">
                    <span className="loader_3 fa-spin" />
                  </li>
                  <li className="question-vote-down">
                    <a
                      href="#"
                      data-id={118}
                      data-type="question"
                      data-vote-type="down"
                      className="wpqa_vote question_vote_down vote_allow"
                      title="Dislike"
                    >
                      <i className="icon-down-dir" />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className="question-content question-content-second">
              <div className="post-wrap-content">
                <div className="question-content-text">
                  <div className="all_not_single_post_content text-container">
                    <p className="excerpt-question">
                      {props.question.details}
                    </p>
                  </div>
                </div>
                <div className="tagcloud">
                  <div className="question-tags">
                    <i className="icon-tags" />
                    {/* <a href="question-tag/english/index.html">
                      english
                    </a>
                    <a href="question-tag/language/index.html">
                      language
                    </a> */}
                  </div>
                </div>
              </div>
              <div className="wpqa_error" />
              <div className="wpqa_success" />
              <footer className="question-footer">
                <ul className="footer-meta">
                  <li className="best-answer-meta">
                    <a href="/">
                      <i className="icon-comment" />
                      <span className="question-span">
                        {props.question.comments.length} Trả lời
                      </span>
                    </a>
                  </li>
                  <li className="view-stats-meta">
                    <i className="icon-eye" />
                    {props.question.views} <span className="question-span">Lượt xem</span>
                  </li>
                </ul>
                <a
                  className="meta-answer meta-answer-a"
                  href="/"
                >
                  Trả lời
                </a>
              </footer>
            </div>
            <div className="clearfix" />
          </div>
        </div>
      </article>
    )
}