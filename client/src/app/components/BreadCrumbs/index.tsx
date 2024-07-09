import { Link } from "react-router-dom";
import { Question } from "../QuestionDetails/slice/types";

interface Props {
  question?: Question;
}
export default function BreadCrumb(props: Props) {
    return (
        <div className="breadcrumbs d-flex align-items-center justify-content-between w-100 mb-4 breadcrumbs_1">
        <div className="breadcrumbs-wrap d-flex align-items-center justify-content-between w-100">
          <div className="breadcrumb-left">
            <span className="crumbs">
              <span
                className="breadcrumb-item"
                itemType="https://schema.org/BreadcrumbList"
              >
                <span
                  itemProp="itemListElement"
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" />
                  <Link to="/home">
                    <span itemProp="name">
                      <i className="icon-home font-xl mr-2" />
                      Trang chủ
                    </span>
                  </Link>
                </span>
                <span className="crumbs-span">/</span>
                <span
                  className="current"
                  itemProp="itemListElement"
                  itemType="https://schema.org/ListItem"
                >
                  <meta itemProp="position" />
                  <Link to="/home">
                    <span itemProp="name">Câu hỏi</span>
                  </Link>
                </span>
                <span className="crumbs-span">/</span>
                <span className="current">Q ???</span>
              </span>
            </span>
          </div>
          <div className="breadcrumb-right d-flex align-items-center">
            <div className="question-navigation breadcrumb-navs d-flex">
              <a
                className="nav-previous breadcrumb-navs__item"
                href='/home/questions/previous'
              >
                <i className="icon-left-open" />
              </a>
            </div>
            {props.question?.answered && <div className="question-stats">
              <span className="question-stats-answered question-answered-done badge-span btn__success">
                <i className="icon-check" />
                Đã có trả lời
              </span>{" "}
            </div>
            }

            <div className="clearfix" />
          </div>
        </div>
      </div>
    )
}