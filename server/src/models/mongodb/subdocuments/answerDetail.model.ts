import mongoose, { Schema, Types } from "mongoose";
import { toJSON } from "../../plugins";
import { Question } from "../documents";
import autoPopulate from "mongoose-autopopulate";

export interface IAnswerDetail {
    id: Types.ObjectId;
    author: Types.ObjectId;
    content: string;
    voteCount: number;
    enableTimestamps?: boolean;
}

export interface IAnswerDetailMethods {
    //methods
}

export interface AnswerDetailModel extends mongoose.Model<IAnswerDetail, {}, IAnswerDetailMethods> {
    // static methods
}

export type AnswerDetailUpdate = Pick<IAnswerDetail, 'content'>;

export type AnswerDetailInput = AnswerDetailUpdate & { id?: string, author: string };

export type AnswerDetailDocument = mongoose.Document<unknown, {}, IAnswerDetail> & Omit<IAnswerDetail & {
    _id: Types.ObjectId;
  }, ""> & IAnswerDetailMethods;
  
export const AnswerDetailSchema = new mongoose.Schema<IAnswerDetail, AnswerDetailModel>(
    {
        author: {
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            autopopulate: { maxDepth: 1 }
        },
        content: {
            type: Schema.Types.String,
            required: true,
        },
        voteCount: {
            type: Schema.Types.Number,
            default: 0,
        },
        enableTimestamps: {
            type: Schema.Types.Boolean,
            default: true,
        }
    }, {
        timestamps: true,
    }
);

AnswerDetailSchema.plugin(toJSON);
AnswerDetailSchema.plugin(autoPopulate);