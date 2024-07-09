import { createVote, deleteVote, updateVote, Vote, VoteType } from "services/vote.service";
import { useAppSelector, useAppDispatch } from "store/hooks";
import { getAuth } from "../SignInPanel/slice/selectors";
import { useState } from "react";
import { selectLoadingIndicator } from "../PanelSubmitButton/slice/selectors";
import { Question } from "../QuestionDetails/slice/types";

export enum VoteSectionType {
    question = "question",
    answer = "answer",
    comment = "comment",
}

interface Props {
    voteStatus?: Vote;
    votes: number;
    contentId: string;
    type: VoteSectionType;
}

const voteValue = {
    upvote: 1,
    downvote: -1,
}

const contentIdName = {
    question: "questionId",
    answer: "answerId",
    comment: "commentId",
}

export default function VoteSection(props: Props) {
    const [loading, setLoading] = useState<boolean>(false);
    const [voteStatus, setVoteStatus] = useState<Vote | undefined>(props.voteStatus);
    const [votes, setVotes] = useState<number>(props.votes);
    const { user } = useAppSelector(getAuth);
    const dispatch = useAppDispatch();
  
    const isVotedClassName = (type: string) => {
        if (voteStatus) {
            return (voteStatus.type === type) ? " checked" : " unchecked";
        } return "";
    }   

    const isVotedTitle = (type: string) => {
        if (voteStatus) {
            return (voteStatus.type === VoteType.upvote) ? "Bạn đã upvote nội dung này" : "Bạn đã downvote nội dung này";
        } return type;
    }
    
    const handleVoteClick = async (e, type: VoteType) => {
        e.preventDefault();
        if (!user) return;

        setLoading(true);
        if (!voteStatus) {
            const result = await dispatch(createVote({ [contentIdName[props.type]]: props.contentId, type }));
            if (result.meta.requestStatus === "fulfilled") {
                setVoteStatus(result.payload as Vote);
                setVotes(votes + voteValue[type]);
            }
        }  
        else if (voteStatus.type === type) {
            const result = await dispatch(deleteVote({ id: voteStatus.id }));
            if (result.meta.requestStatus === "fulfilled") {
                setVoteStatus(undefined);
                setVotes(votes - voteValue[type]);
            }
        } else {
            const result = await dispatch(updateVote({ id: voteStatus.id, type }));
            if (result.meta.requestStatus === "fulfilled") {
                setVoteStatus(result.payload as Vote);
                setVotes(votes + voteValue[type] * 2);
            }
        }
        setLoading(false);
    }
    
    if (props.type === VoteSectionType.question) {
        return (
            <div className="question-not-mobile question-image-vote question-vote-sticky">
                <div className="question-sticky-stop">
                    <ul className="question-vote">
                        <li className="question-vote-up">
                        <a
                            href="/"
                            className="wpqa_vote question_vote_up vote_not_allow"
                            title={isVotedTitle(VoteType.upvote)}
                            onClick={(e) => { handleVoteClick(e, VoteType.upvote) }}
                        >
                            <i className={"icon-up-dir" + isVotedClassName(VoteType.upvote)} />
                        </a>
                        </li>
                        {!loading && <>
                            <li className="vote_result" itemProp="upvoteCount">
                                {votes}
                            </li>
                        </>}
                        <li className="li_loader" style={{ display: loading ? 'block' : ''}}>
                            <span className="loader_3 fa-spin" />
                        </li>
                        <li className="question-vote-down">
                        <a
                            href="/"
                            className="wpqa_vote question_vote_down vote_not_allow"
                            title={isVotedTitle(VoteType.downvote)}
                            onClick={(e) => { handleVoteClick(e, VoteType.downvote) }}
                        >
                            <i className={"icon-down-dir" + isVotedClassName(VoteType.downvote)} />
                        </a>
                        </li>
                    </ul>
                </div>
            </div>
        )
    } else if (props.type === VoteSectionType.answer) {
        return (
            <ul className="question-vote answer-vote answer-vote-dislike">
                <li>
                    <a 
                        href="#" 
                        className="wpqa_vote comment_vote_up vote_allow" 
                        title={isVotedTitle(VoteType.upvote)}
                        onClick={(e) => { handleVoteClick(e, VoteType.upvote) }}
                    >
                    <i className={"icon-up-dir" + isVotedClassName(VoteType.upvote)} />
                    </a>
                </li>
                {!loading && <>
                    <li className="vote_result" itemProp="upvoteCount">{votes}</li>
                </>}

                <li className="li_loader" style={{ display: loading ? 'block' : ''}}>
                    <span className="loader_3 fa-spin" />
                </li>
                <li className="dislike_answers">
                    <a 
                        href="#" 
                        className="wpqa_vote comment_vote_down vote_allow" 
                        title={isVotedTitle(VoteType.downvote)}
                        onClick={(e) => { handleVoteClick(e, VoteType.downvote) }}
                    >
                    <i className={"icon-down-dir" + isVotedClassName(VoteType.downvote)} />
                    </a>
                </li>
            </ul>            
        )
    } else if (props.type === VoteSectionType.comment) {
        return (
        <ul className="question-vote answer-vote answer-vote-dislike">
            
            <li>
                <a
                    href="#"
                    className="wpqa_vote comment_vote_up vote_allow"
                    title={isVotedTitle(VoteType.upvote)}
                    onClick={(e) => { handleVoteClick(e, VoteType.upvote) }}
                >
                    <i className={"icon-up-dir" + isVotedClassName(VoteType.upvote)} style={{ marginRight: "0px", borderRight: 'none' }}/>
                </a>
            </li>
            <li className="vote_result" itemProp="upvoteCount">
                {votes}
            </li>
            <li className="li_loader" style={{ display: loading ? 'block' : ''}}>
                <span className="loader_3 fa-spin" />
            </li>
            <li className="dislike_answers">
                <a
                    href="#"
                    className="wpqa_vote comment_vote_down vote_allow"
                    title={isVotedTitle(VoteType.downvote)}
                    onClick={(e) => { handleVoteClick(e, VoteType.downvote) }}
                >
                <i className={"icon-down-dir" + isVotedClassName(VoteType.downvote)} style={{ marginRight: "0px", borderRight: 'none' }}/>
                </a>
            </li>
        </ul>)
    }
}