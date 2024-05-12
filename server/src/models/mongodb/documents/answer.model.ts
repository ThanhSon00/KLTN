import mongoose, { Schema, Types } from "mongoose";
import { toJSON } from "../../plugins";
import { AnswerDetailInput, AnswerDetailSchema, AnswerDetailUpdate, IAnswerDetail } from "../subdocuments/answerDetail.model";
import autoPopulate from "mongoose-autopopulate";

export interface IAnswer {
    id: Types.ObjectId;
    questionId: Types.ObjectId;
    details: IAnswerDetail;
}

export interface IAnswerMethods {
    //methods
}

export interface AnswerModel extends mongoose.Model<IAnswer, {}, IAnswerMethods> {
    // static methods
}

export type AnswerInput = { 
    details: AnswerDetailInput, 
    id?: string, 
    questionId: string 
};

export type AnswerUpdate = {
    details: AnswerDetailUpdate, 
}

export type AnswerDocument = mongoose.Document<unknown, {}, IAnswer> & Omit<IAnswer & {
    _id: Types.ObjectId;
  }, ""> & IAnswerMethods;
  
  export const AnswerSchema = new mongoose.Schema<IAnswer, AnswerModel>(
    {
        questionId: {
            type: Schema.Types.ObjectId,
            ref: 'Question',
            required: true,
            toId: true,
        },
        details: AnswerDetailSchema,
    }, {
        timestamps: true,
    }
);

AnswerSchema.plugin(toJSON);
AnswerSchema.plugin(autoPopulate);

AnswerSchema.pre('save', function (next) {
    next();
})

export const Answer = mongoose.model<IAnswer, AnswerModel>('Answer', AnswerSchema)
