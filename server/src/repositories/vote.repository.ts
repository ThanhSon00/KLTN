import ApiError from "../utils/ApiError";
import { Answer, Question } from "../models/mongodb/documents";
import { IVote, Vote, VoteDocument, VoteInput, VoteSearch, VoteType } from "../models/mongodb/documents/vote.model";
import { Comment } from "../models/mongodb/documents/comment.model";
import answerRepository from "./answer.repository";

enum Action {
    create = 'create',
    update = 'update',
    delete = 'delete',
}

const setValue = (action: Action) => {
    if (action === Action.create) return 1;
    if (action === Action.delete) return -1;
    if (action === Action.update) return 2;
    return 0;
}

const updateCommentVote = async (commentId: string, voteType: string, action: Action) => {
    const comment = await Comment.findById(commentId);
    if (!comment) throw new Error("Comment not found");
    
    const value = setValue(action);

    if (voteType === VoteType.upvote) comment.details.votes += value;
    if (voteType === VoteType.downvote) comment.details.votes -= value;

    await comment.save();
}

const updateQuestionVote = async (questionId: string, voteType: string, action: Action) => {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");
    
    const value = setValue(action);

    if (voteType === VoteType.upvote) {
        question.votes += value;
    }

    if (voteType === VoteType.downvote) {
        question.votes -= value;
    }

    await question.save();
}

const updateAnswerVote = async (answerId: string, voteType: string, action: Action) => {
    const answer = await Answer.findById(answerId);
    if (!answer) throw new Error("Answer not found");

    const value = setValue(action);

    if (voteType === VoteType.upvote) {
        await answerRepository.update(answerId, { details: { votes: answer.details.votes + value }});
    }
    if (voteType === VoteType.downvote) {
        await answerRepository.update(answerId, { details: { votes: answer.details.votes - value }});
    }
}

const updateRelatedData = async (vote: VoteDocument, action: Action) => {
    if (vote.answerId) await updateAnswerVote(vote.answerId.toString(), vote.type, action);
    if (vote.questionId) await updateQuestionVote(vote.questionId.toString(), vote.type, action);
    if (vote.commentId) await updateCommentVote(vote.commentId.toString(), vote.type, action);
}

export const createVote = async (voteBody: Partial<VoteInput>) => {
    const vote = await Vote.create({ ...voteBody, _id: voteBody.id });
    await updateRelatedData(vote, Action.create);
    return vote;
}

export const deleteVote = async (id: string) => {
    const vote = await Vote.findByIdAndDelete(id);
    if (!vote) throw new Error("Vote not found");

    await updateRelatedData(vote, Action.delete);
    return vote;
}

export const updateVote = async (id: string, { type }: { type: VoteType }) => {
    const vote = await Vote.findById(id);
    if (!vote) throw new Error("Vote not found");
 
    vote.type = type;

    if (vote.isModified('type')) {
        await updateRelatedData(vote, Action.update);
    }
    await vote.save();
    return vote;
}

export const getVotes = async (voteSearch: VoteSearch) => {
    const votes = await Vote.find(voteSearch);
    return votes;
}