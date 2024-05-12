import { useState } from "react";
import { Answer, AnswerDetails } from "services/answer.service";
import Comment from "../Comment";
import { Question } from "../QuestionDetails/slice/types";

interface Props {
    comments: AnswerDetails[];
    question: Question;
}

export default function Comments(props: Props) {
    return (
        <div
        id="comments"
        className="post-section answers-section-tabs comments-popup-share"
        >
        
        <div className="post-inner">
            
            <div className="answers-tabs">
            
            <h3 className="section-title">
                <span>{props.comments.length} Answers</span>
            </h3>
            <div className="answers-tabs-inner">
                
                <ul>
                
                <li className="active-tab">
                    <a href="/">
                    Voted
                    </a>
                </li>
                <li>
                    <a href="/">
                    Oldest
                    </a>
                </li>
                <li>
                    <a href="/">
                    Recent
                    </a>
                </li>
                <li>
                    <a href="/">
                    Random
                    </a>
                </li>
                </ul>
            </div>
            <div className="clearfix" />
            </div>
            <ol className="commentlist clearfix">
                {
                    props.comments.map(comment => <Comment comment={comment} key={comment.id} question={props.question} />)
                }
            </ol>
            <div className="clearfix" />
        </div>
        </div>

    )
}