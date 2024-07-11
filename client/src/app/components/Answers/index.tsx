import { useState } from "react";
import { Answer as AnswerType , AnswerDetails } from "services/answer.service";
import Answer from "../Answer";
import { Question } from "../QuestionDetails/slice/types";

interface Props {
    answers: AnswerType[];
    question: Question;
    updateQuestion: (question: Question) => void;
    highlightAnswerDetailsId?: string;
}

export default function Answers(props: Props) {
    return (
        <div
        id="comments"
        className="post-section answers-section-tabs comments-popup-share"
        >
        
        <div className="post-inner">
            
            <div className="answers-tabs">
            
            <h3 className="section-title">
                <span>{props.answers.length} câu trả lời</span>
            </h3>
            <div className="answers-tabs-inner">
                
                <ul>
                <li className="active-tab">
                    <a>
                    Bình chọn
                    </a>
                </li>
                </ul>
            </div>
            <div className="clearfix" />
            </div>
            <ol className="commentlist clearfix">
                {
                    props.answers.map(answer => 
                        <Answer 
                            answer={answer} 
                            key={answer.id} 
                            question={props.question} 
                            highlight={props.highlightAnswerDetailsId === answer.id}
                            updateQuestion={props.updateQuestion}
                        />)
                }
            </ol>
            <div className="clearfix" />
        </div>
        </div>

    )
}