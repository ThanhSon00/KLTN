import dot from "dot-object";
import mongoose, { Schema, Types } from "mongoose";
import { toJSON } from "../../plugins";
import { AnswerDetailInput, AnswerDetailSchema, AnswerDetailSearch, AnswerDetailUpdate, IAnswerDetail } from "../subdocuments/answerDetail.model";
import autoPopulate from "mongoose-autopopulate";

export interface IComment {
    id?: Types.ObjectId | string;
    answerId: Types.ObjectId | string;
    details: IAnswerDetail;
}

export interface ICommentMethods {
    //methods
}

export interface CommentModel extends mongoose.Model<IComment, {}, ICommentMethods> {
    // static methods
    getAnswerCommentsWithVoteStatus: (answerId: string, userId: string) => Promise<IComment[]>;
}

export type CommentSearch = {}

export type CommentInput = Pick<IComment, 'answerId'> & AnswerDetailInput & { _id?: string}

export type CommentUpdate = AnswerDetailUpdate

export type CommentDocument = mongoose.Document<unknown, {}, IComment> & Omit<IComment & {
    _id: Types.ObjectId;
  }, ""> & ICommentMethods;
  
export const CommentSchema = new mongoose.Schema<IComment, CommentModel>(
    {
        answerId: {
            type: Schema.Types.ObjectId,
            ref: 'AnswerDetail',
            required: true,
            toId: true,
        },
        details: AnswerDetailSchema,
    }, {
        timestamps: true,
        toJSON: {
            virtuals: true,
        }
    }
);

//@ts-expect-error
CommentSchema.plugin(toJSON);
//@ts-expect-error
CommentSchema.plugin(autoPopulate);  

CommentSchema.pre('findOneAndUpdate', function (next) {
    const query = this.getUpdate();
    this.setUpdate(dot.dot(query));
    next();
})

CommentSchema.virtual('voteStatus', {
    ref: 'Vote',
    localField: '_id',
    foreignField: 'commentId',
    justOne: true,
})

CommentSchema.statics.getAnswerCommentsWithVoteStatus = async function(answerId: string, userId: string): Promise<IComment[]> {
    const comments = await this.find({ answerId }).populate({
        path: 'voteStatus',
        match: { voter: userId },
        select: 'type',
    })
    return comments;
}


export const Comment = mongoose.model<IComment, CommentModel>('Comment', CommentSchema)
