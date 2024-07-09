import mongoose, { Types, Schema } from 'mongoose';
import { toJSON, /*paginate*/ } from '../../plugins';
import { ObjectId } from 'mongodb';
import config from '../../../config/config';

const { cloudinary } = config;
/**
 * @type {SchemaDefinitionProperty}
 */
export enum NotiType {
  // newQuestion = 'newQuestion',
  // newComment = 'newComment',
  newMessageFromAdmin = 'newMessageFromAdmin',
  newAnswer = 'newAnswer',
  bestAnswer = 'bestAnswer',
  newComment = 'newComment',
}

export interface INotification {
  id?: string;
  receiver: ObjectId;
  details: string;
  enableTimestamps?: boolean;
  type: NotiType;
  isSeen?: boolean;
  unread?: boolean;
  report?: ObjectId;
  bestAnswer?: boolean;
  answer?: ObjectId;
  comment?: ObjectId;
}

export type NotiInput = Pick<INotification, 'id' | 'details'> & { receiver: string } & Partial<Pick<INotification,  'report' | 'bestAnswer' | 'comment' | 'answer'>>;

export type NotiUpdate = Pick<INotification, 'isSeen' | 'unread'>

export interface INotiMethods {
  // methods
}

export interface NotiModel extends mongoose.Model<INotification, {}, INotiMethods> {
  // static methods
  markAllSeen: (notifications: INotification[]) => Promise<void>;
  countUnSeen: (userId: string) => Promise<number>;
  markRead: (notifications: INotification[]) => Promise<void>;
}

export type NotiDocument = mongoose.Document<unknown, {}, INotification> & Omit<INotification & {
  _id: Types.ObjectId;
}, ""> & INotiMethods;

export const NotiSchema = new mongoose.Schema<INotification, NotiModel>(
  {
    receiver: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    details: {
      type: Schema.Types.String,
      required: true,
    },
    enableTimestamps: {
      type: Schema.Types.Boolean,
      default: true,
    },
    type: {
      type: Schema.Types.String,
      enum: Object.values(NotiType),
    },
    isSeen: {
      type: Schema.Types.Boolean,
      default: false,
    },
    unread: {
      type: Schema.Types.Boolean,
      default: true,
    },
    report: {
      type: Schema.Types.ObjectId,
      ref: 'Report',
      required: false,
      autopopulate: { maxDepth: 1 },
    },
    bestAnswer: {
      type: Schema.Types.Boolean,
    },
    answer: {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
      required: false,
      autopopulate: { maxDepth: 1 },
    },
    comment: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
      required: false,
      autopopulate: { maxDepth: 1 },
    }
  },
  {  
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
//@ts-expect-error
NotiSchema.plugin(toJSON);
NotiSchema.plugin(require('mongoose-autopopulate'));
// userSchema.plugin(paginate);

NotiSchema.statics.countUnSeen = async function (userId: string): Promise<number> {
  return await this.countDocuments({ receiver: userId, isSeen: false });
}

NotiSchema.statics.markAllSeen = async function (notifications: INotification[]): Promise<void> {
  await this.updateMany({ _id: { $in: notifications.map(noti => noti.id) } }, { isSeen: true });
}

NotiSchema.statics.markRead = async function (notifications: INotification[]): Promise<void> {
  await this.updateMany({ _id: { $in: notifications.map(noti => noti.id) } }, { isSeen: true, unread: false });
}

NotiSchema.pre('save', async function (next) {
  const noti = this as NotiDocument;
  if (noti.report) {
    noti.type = NotiType.newMessageFromAdmin;
  } else if (noti.bestAnswer !== undefined) {
    noti.type = NotiType.bestAnswer;
  } else if (noti.answer) {
    noti.type = NotiType.newAnswer;
  } else if (noti.comment) {
    noti.type = NotiType.newComment;
  } 
  next();
})
/**
 * @typedef User
 */
export const Notification = mongoose.model<INotification, NotiModel>('Notification', NotiSchema);


