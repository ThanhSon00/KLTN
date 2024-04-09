import mongoose, { Model, Schema, Types, Document } from 'mongoose';
// import { toJSON } from '../plugins';
import { TokenType } from '../../config/tokens';
import { PartialBy } from '../../utils/types';
import { toJSON } from '../plugins';

export interface TokenDoc {
  token: string;
  userId: Types.ObjectId;
  type: TokenType;
  expires: Date;
  blacklisted: boolean;
}
export type TokenInput = Omit<PartialBy<TokenDoc, 'blacklisted'>, 'userId'> & { userId: string };

interface TokenVirtuals {}

export interface TokenModel extends Model<TokenDoc, {}, TokenVirtuals> {}

export type TokenDocument = Document<unknown, {}, TokenDoc> & TokenDoc & {
  _id: Types.ObjectId;
} 

const tokenSchema = new Schema<TokenDoc, TokenModel, TokenVirtuals>(
  {
    token: {
      type: Schema.Types.String,
      required: true,
      index: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: Schema.Types.String,
      enum: [TokenType.REFRESH, TokenType.RESET_PASSWORD, TokenType.VERIFY_EMAIL],
      required: true,
    },
    expires: {
      type: Schema.Types.Date,
      required: true,
    },
    blacklisted: {
      type: Schema.Types.Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
tokenSchema.plugin(toJSON);
/**
 * @typedef Token
 */
export const Token = mongoose.model('Token', tokenSchema);