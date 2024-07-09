import mongoose, { Schema, Types } from "mongoose";
import { toJSON } from "../../plugins";
import { Answer, Question } from "../documents";
import autoPopulate from "mongoose-autopopulate";
import { removeFalsyProperties } from "../../../utils/removeFalsyProperties";
import { IComment } from "../documents/comment.model";
import { IUser } from "../documents/user.model";

export interface IAnswerDetail {
    id: Types.ObjectId | string; 
    author: Types.ObjectId | string | IUser;
    content: string;
    votes: number;
    enableTimestamps?: boolean;
    isBestAnswer: boolean;
    updatedAt: Date | string;
    createdAt: Date | string;
}

export interface IAnswerDetailMethods {
    //methods
}

export interface AnswerDetailModel extends mongoose.Model<IAnswerDetail, {}, IAnswerDetailMethods> {
    // static methods
}

export type AnswerDetailSearch = Partial<Pick<IAnswerDetail, 'content' | 'id'>> & { author?: string };

export type AnswerDetailUpdate = Partial<Pick<IAnswerDetail, 'content' | 'votes' | 'isBestAnswer'>>;

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
        votes: {
            type: Schema.Types.Number,
            required: true,
            default: 0,
        },
        enableTimestamps: {
            type: Schema.Types.Boolean,
            default: true,
        },
        isBestAnswer: {
            type: Schema.Types.Boolean,
            default: false,
        },
    }, {
        timestamps: true,
    }
);

AnswerDetailSchema.plugin(toJSON);
AnswerDetailSchema.plugin(autoPopulate);

AnswerDetailSchema.pre('find', function () {
    const newQuery = removeFalsyProperties(this.getQuery());
    this.setQuery(dot.dot(newQuery));
})