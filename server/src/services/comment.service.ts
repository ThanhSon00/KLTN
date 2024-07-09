import { commentRepository } from "../repositories";
import { Comment, CommentInput, IComment } from "../models/mongodb/documents/comment.model";
import { notificationService } from "../services";

export const createComment = async (commentBody: CommentInput) => {
  const { answerId: answerDetailsId, author, content } = commentBody;
  const comment = await commentRepository.create({ 
    answerId: answerDetailsId, 
    author: author as string, 
    content: content as string
  });

  await notificationService.notifyUserNewComment(comment);
  return comment;
}

export const updateComment = async (id: string, content: string) => {
  const comment = await commentRepository.updateById(id, { content });
  return comment;
}

export const getComments = async (commentInput: { answerId: string; }, currentUserId?: string) => {
  const { answerId } = commentInput;
  if (currentUserId) {
    return await Comment.getAnswerCommentsWithVoteStatus(answerId, currentUserId);
  }
  return await commentRepository.getList({ answerId });
}
