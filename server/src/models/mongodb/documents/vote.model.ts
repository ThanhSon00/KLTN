import mongoose, { Schema, Types } from 'mongoose';
import { toJSON, /*paginate*/ } from '../../plugins';
import autoPopulate from 'mongoose-autopopulate';
import { removeFalsyProperties } from '../../../utils/removeFalsyProperties';

/**
 * @type {SchemaDefinitionProperty}
 */
export enum VoteType {
    upvote = 'upvote',
    downvote = 'downvote'
}

export interface IVote {
  id: Types.ObjectId;
  voter: Types.ObjectId;
  questionId?: Types.ObjectId;
  answerId?: Types.ObjectId;
  commentId?: Types.ObjectId;
  type: string;
}

// export type UserInput = Omit<IQuestion, 'avatar' | 'isEmailVerified'>;
export type VoteInput = {
  voter?: string,
  questionId?: string,
  commentId?: string,
  answerId?: string,
  type: string;
  id?: string;
}

export type VoteSearch = Partial<IVote>;
export interface IVoteMethods {
    //methods
}

export interface VoteModel extends mongoose.Model<IVote, {}, IVoteMethods> {
    // static methods
    checkIfVoteExists(voteBody: VoteInput): Promise<boolean>;
}

export type VoteDocument = mongoose.Document<unknown, {}, IVote> & Omit<IVote & {
  _id: Types.ObjectId;
}, ""> & IVoteMethods;

export const VoteSchema = new mongoose.Schema<IVote, VoteModel>(
  {
    voter: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
    },
    answerId: {
      type: Schema.Types.ObjectId,
      ref: 'Answer',
    },
    commentId: {
      type: Schema.Types.ObjectId,
      ref: 'Comment',
    },
    type: {
      type: Schema.Types.String,
      required: true,
      enum: [VoteType.upvote, VoteType.downvote]
    }
  },
  {  
    timestamps: true,
  }
);

VoteSchema.index({ voter: 1, questionId: 1, answerDetailsId: 1, commentId: 1 }, { unique: true, sparse: true });

// @ts-expect-error
VoteSchema.plugin(toJSON);
// @ts-expect-error
VoteSchema.plugin(autoPopulate);

// userSchema.plugin(paginate);

VoteSchema.post('findOne', async function(result) {})
VoteSchema.statics.checkIfVoteExists = async function ({voter, questionId, answerId: answerDetailsId, commentId }: VoteInput): Promise<boolean> {
  const vote = await this.findOne(removeFalsyProperties({ voter, questionId, answerDetailsId, commentId }));
  return !!vote;
}

export const Vote = mongoose.model<IVote, VoteModel>('Vote', VoteSchema);
