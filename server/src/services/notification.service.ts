import { notificationRepository } from "../repositories";
import { ReportDocument, ReportType } from "../models/mongodb/documents/report.model";
import { Notification } from "../models/mongodb/documents/notification.model";
import { questionService, answerService } from "../services";
import { AnswerDocument, IAnswer } from "../models/mongodb/documents/answer.model";
import { IUser } from "../models/mongodb/documents/user.model";
import { CommentDocument } from "../models/mongodb/documents/comment.model";

const vietnamese = {
  question: 'câu hỏi',
  answer: 'câu trả lời',
  user: 'người dùng',
  rejected: 'bị từ chối',
  approved: 'được duyệt',
  pending: 'đang chờ xét duyệt',
}

const pathMap = {
  question: '/#/home/questions/',
  answer: '/#/home/answers/',
  user: '/#/home/profile/'
}

const contentIdMap = {
  question: 'questionId',
  answer: 'answerId',
  user: 'userId',
}

const action = (isBestAnswer: boolean) => {
  return isBestAnswer? 'được chọn là câu trả lời chính xác nhất' : 'bị hủy là câu trả lời chính xác nhất'
}

export const notifyUserReport = async (report: ReportDocument) => {
  const userId = report.reporter as string;
  const { title, response, type } = report;

  await notificationRepository.create({
    receiver: userId,
    //@ts-expect-error
    details: `Báo cảo của bạn về ${vietnamese[type]} <a href="${pathMap[type]}${report[contentIdMap[type]]}">${title}</a> đã ${vietnamese[report.status]} với phản hồi: <strong>${response}</strong> `,
    report: report.id,
  })
}

export const notifyUserBestAnswer = async (answer: IAnswer) => {
  const question = await questionService.getQuestion(answer.questionId.toString());
  await notificationRepository.create({
    receiver: ((answer.details.author as IUser).id as string),
    details: `Câu trả lời của bạn về câu hỏi <a href="/#/home/questions/${question.id}">${question.title}</a> đã <strong>${action(answer.details.isBestAnswer as boolean)}</strong>`,
    bestAnswer: answer.details.isBestAnswer,
  })
}

export const getUserNotifications = async (userId: string, amount: number, page: number) => {
  const notifications = await notificationRepository.getList(
    { receiver: userId }, 
    { limit: amount, skip: (page - 1) * amount, sort: { createdAt: -1 } }
  );
  await Notification.markAllSeen(notifications);
  return notifications;
}

export const countUnSeenNotification = async (userId: string) => {
  const count = await Notification.countUnSeen(userId);
  return count;
}

export const notifyUserNewAnswer = async (answer: AnswerDocument) => {
  const question = await questionService.getQuestion(answer.questionId.toString());
  await notificationRepository.create({
    receiver: ((question.author).id as string),
    details: `${(answer.details.author as IUser).name} đã trả lời câu hỏi của bạn <a href="/#/home/questions/${question.id}">${question.title}</a>`,
    answer: answer.id,
  })
}

export const notifyUserNewComment = async (comment: CommentDocument) => {
  const answer = await answerService.getAnswer(comment.answerId.toString());
  const question = await questionService.getQuestion(answer.questionId.toString());
  await notificationRepository.create({
    receiver: ((answer.details.author as IUser).id as string),
    details: `${(comment.details.author as IUser).name} đã bình luận về câu trả lời của bạn <a href="/#/home/questions/${question.id}">${question.title}</a>`,
    comment: comment.id,
  })
}

export const markNotificationAsRead = async (notificationId: string) => {
  const notification = await notificationRepository.update(notificationId, { unread: false });
  return notification;
}