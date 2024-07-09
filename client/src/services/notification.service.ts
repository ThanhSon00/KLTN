import queryString from "query-string"
import { Report } from "./report.service"

export enum NotiType {
  // newQuestion = 'newQuestion',
  // newComment = 'newComment',
  newAnswer = 'newAnswer',
  newMessageFromAdmin = 'newMessageFromAdmin',
  bestAnswer = 'bestAnswer',
  newComment = 'newComment',
}

export type Notify = {
    id: string,
    receiver: string,
    details: string,
    type: NotiType,
    isSeen: boolean,
    unread: boolean,
    createdAt: string,
    updatedAt: string,
    report?: Report,
    bestAnswer?: boolean,
}

export const markNotificationAsRead = async (userId: string, notificationId: string) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${userId}/notifications/${notificationId}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  if (!response.ok) {
    throw new Error('PATCH /v1/users/:id/notifications/:id went wrong');
  }
}

export const getUserNotifications = async (userId: string) => {
  const stringifiedQuery = queryString.stringify({ limit: 5, page: 1})
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${userId}/notifications?${stringifiedQuery}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const notifications = await response.json();
  return notifications as Array<Notify>;
}

export const countUnSeenNotification = async (userId: string) => {
  const response = await fetch(`${process.env.REACT_APP_SERVER_ORIGIN}/v1/users/${userId}/notifications/count-unseen`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  const count = await response.json();
  return count as number;
}