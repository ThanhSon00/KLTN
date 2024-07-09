import mongoose, { Schema, Types } from "mongoose";
import { toJSON } from "../../plugins";
import { AnswerDetailInput, AnswerDetailSchema, AnswerDetailSearch, AnswerDetailUpdate, IAnswerDetail } from "../subdocuments/answerDetail.model";
import autoPopulate from "mongoose-autopopulate";
import dot from "dot-object";
import { removeFalsyProperties } from "../../../utils/removeFalsyProperties";
import { CommentSchema, IComment } from "./comment.model";

export interface IAnswer {
    id: Types.ObjectId | string;
    questionId: Types.ObjectId | string;
    details: IAnswerDetail;
    comments: IComment[];
    commentsAmount: number;
}

export interface IAnswerMethods {
    //methods
}

export interface AnswerModel extends mongoose.Model<IAnswer, {}, IAnswerMethods> {
    // static methods
    checkIfAnswerExists(questionId: string, author: string): Promise<boolean>;
}

export type AnswerSearch = {
    id?: string,
    questionId?: string,
    details: AnswerDetailSearch,
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
            // required: true,
            toId: true,
        },
        details: AnswerDetailSchema,
        comments: [CommentSchema],
        commentsAmount: {
            type: Schema.Types.Number,
            required: true,
            default: 0,
        }
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true,
        }
    }
);

// @ts-expect-error
AnswerSchema.plugin(toJSON);
// @ts-expect-error
AnswerSchema.plugin(autoPopulate);  

AnswerSchema.index({ questionId: 1, 'details.author': 1 }, { unique: true, sparse: true });

AnswerSchema.virtual('voteStatus', {
    ref: 'Vote',
    localField: '_id',
    foreignField: 'answerId',
    justOne: true,
})

AnswerSchema.pre('find', function (next) {
    const newQuery = removeFalsyProperties(this.getQuery());
    if (newQuery.details?.id) {
        Object.assign(newQuery, { details: { _id: newQuery.details.id } });
        delete newQuery.details.id;
    }
    this.setQuery(dot.dot(newQuery));

    const query = this.getOptions();
    if (query.limit) {
      const newOptions = {...query, limit: query.limit + 1 };
      this.setOptions(newOptions);
    }
    next();
})

AnswerSchema.post('find', async function(docs: Array<AnswerDocument | { hasMore: boolean }>) {
    const query = this.getOptions();
    if (query.limit) {
      const hasMore = !!docs[query.limit - 1]
      if (hasMore) {
          docs.pop();
      }
      docs.push({ hasMore })
    }
  })
  

AnswerSchema.pre('findOne', function (next) {
    const newQuery = removeFalsyProperties(this.getQuery());
    this.setQuery(dot.dot(newQuery));
    next();
})

AnswerSchema.pre('findOneAndUpdate', function () {
    const newQuery = removeFalsyProperties(this.getQuery());
    this.setQuery(dot.dot(newQuery));
})

AnswerSchema.pre('countDocuments', function() {
    this.setQuery(dot.dot(this.getQuery()));
})
AnswerSchema.pre('save', function (next) {
    next();
})

AnswerSchema.statics.checkIfAnswerExists = async function(questionId: string, author: string): Promise<boolean> {
    const answer = await this.findOne({ questionId, 'details.author': author });
    return !!answer;
}

export const Answer = mongoose.model<IAnswer, AnswerModel>('Answer', AnswerSchema)
