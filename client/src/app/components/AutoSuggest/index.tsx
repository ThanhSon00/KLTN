import { Search } from "services/searching.service";
import { Link } from "react-router-dom";

interface Props {
    searches: Search[];
}
export default function AutoSuggest(props: Props) {
    const openNewTab = (e, questionId) => {
        e.preventDefault();
        window.open(`${process.env.PUBLIC_URL}/#/home/questions/${questionId}`, '_blank');
    }
    return (
        <>
            <p className="suggest-title">Các câu hỏi có thể liên quan: </p>
            <div className="question-list">
                {props.searches.map((search, index) => (
                    <div key={index} className="question-item">
                        <div className="question-title">
                            <Link to={`/home/questions/${search.question.id}`} onClick={(e) => { openNewTab(e, search.question.id )}}>
                                {search.question.title}
                            </Link>
                        </div>
                        <div className="question-statics">
                            <span><i className="icon-flag"></i> {search.question.votes}</span>{' '}
                            <span><i className="icon-eye"></i> {search.question.views}</span>{' '}
                            <span><i className="icon-comment"></i> {search.question.answers.length}</span>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}