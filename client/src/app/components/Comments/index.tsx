import { Answer } from "services/answer.service";
import Comment from "../Comment";

interface Props {
  display: Boolean;
  answer: Answer;
  setAnswer: Function;
}

export default function Comments(props: Props) {
  return (
    <ul className="children" style={{ display: props.display ? "block" : "none" }}>
        {props.answer.comments.map((comment) => <Comment key={comment.id} comment={comment} />)}
    </ul>
  )
}