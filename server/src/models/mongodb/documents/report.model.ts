import mongoose, { Schema, Types } from 'mongoose';
import { toJSON, /*paginate*/ } from '../../plugins';
import autoPopulate from 'mongoose-autopopulate';

/**
 * @type {SchemaDefinitionProperty}
 */
export enum ReportType {
  question = 'question',
  answer = 'answer',
  user = 'user'
}

export enum ReportStatus {
  pending = 'pending',
  approved = 'approved',
  rejected = 'rejected'
}

export interface IReport {
  id: Types.ObjectId | string;
  reporter: Types.ObjectId | string;
  type: ReportType;
  questionId: Types.ObjectId | string;
  answerId: Types.ObjectId | string;
  userId: Types.ObjectId | string;
  status: ReportStatus;
  details: string;
  highlightLink: string;
  enableTimestamps?: boolean;
  title: string;
  response?: string;
  createdAt: Date;
  updatedAt: Date;
}

// export type UserInput = Omit<IQuestion, 'avatar' | 'isEmailVerified'>;

export interface IReportMethods {
    //methods
}

export interface ReportModel extends mongoose.Model<IReport, {}, IReportMethods> {
    // static methods
}

export type ReportInput = Pick<IReport, 'details' | 'reporter' | 'type' | 'highlightLink' | 'title'> & { id?: string } &
  Partial<Pick<IReport,'userId' | 'questionId' | 'answerId'>>;

// export type QuestionUpdate = Pick<IReport, 'title' | 'details'>;

export type ReportDocument = mongoose.Document<unknown, {}, IReport> & Omit<IReport & {
  _id: Types.ObjectId;
}, ""> & IReportMethods;

export const ReportSchema = new mongoose.Schema<IReport, ReportModel>(
  {
    details: {
        type: Schema.Types.String,
        required: true,
    },
    reporter: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: { maxDepth: 1 }
    },
    type: {
      type: Schema.Types.String,
      enum: [...Object.values(ReportType)],
      required: true,
    },
    highlightLink: {
      type: Schema.Types.String,
      required: true,
    },
    status: {
      type: Schema.Types.String,
      enum: [...Object.values(ReportStatus)],
      default: ReportStatus.pending,
      required: true,
    },
    enableTimestamps: {
      type: Schema.Types.Boolean,
      default: true,
    },
    title: {
      type: Schema.Types.String,
      required: true,
    },
    response: {
      type: Schema.Types.String,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      toId: true,
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
      toId: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      toId: true,
    }
  },
  {  
    timestamps: true,
  }
);

ReportSchema.plugin(toJSON);
ReportSchema.plugin(autoPopulate);
// userSchema.plugin(paginate);

export const Report = mongoose.model<IReport, ReportModel>('Report', ReportSchema);


