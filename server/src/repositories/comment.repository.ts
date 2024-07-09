import { IAnswerDetail } from "../models/mongodb/subdocuments/answerDetail.model";
import { Answer, Question } from "../models/mongodb/documents";
import { Comment, CommentInput, CommentUpdate, IComment } from "../models/mongodb/documents/comment.model";

const updateCommentAmountInQuestionAnswer = async (answerId: string, value: number) => {
  const answer = await Answer.findById(answerId);
  const question = await Question.findById(answer?.questionId);
  if (!question) throw new Error('Question not found');

  const answerIndex = question.answers.findIndex(answer => answer.id.toString() === answerId);
  if (answerIndex!== -1) {
    const answer = question.answers[answerIndex];
    answer.commentsAmount += value;
  } else throw new Error('Answer not found');

  await question.save();
}

export const create = async (commentBody: CommentInput) => {
  const { answerId, author, content, _id } = commentBody;
  const comment = await Comment.create({
    _id,
    answerId,
    details: {
      author,
      content
    }
  });

  await updateCommentAmountInQuestionAnswer(answerId as string, 1)
  return comment;
}

export const updateById = async (id: string, commentUpdate: CommentUpdate) => {
  const comment = await Comment.findByIdAndUpdate(id, { details: commentUpdate }, { new: true });
  if (!comment) throw new Error('Comment not found');
  return comment;
}

export const getList = async (commentInput: { answerId: string; }) => {
  const comments = await Comment.find({ answerId: commentInput.answerId });
  return comments;
}
