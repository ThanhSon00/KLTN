import mongoose, { Schema, Types } from 'mongoose';
import { isEmail } from 'validator';
import { compare, hash } from 'bcryptjs';
import { toJSON, /*paginate*/ } from '../plugins';
import { ObjectId } from 'mongodb';
/**
 * @type {SchemaDefinitionProperty}
 */
export interface IQuestion {
  id: Types.ObjectId;
  title: string;
  details: string;
  authorId: Types.ObjectId;
  views: Number;
}

// export type UserInput = Omit<IQuestion, 'avatar' | 'isEmailVerified'>;

export interface IQuestionMethods {
    //methods
}

export interface QuestionModel extends mongoose.Model<IQuestion, {}, IQuestionMethods> {
    // static methods
}

export type QuestionInput = Omit<IQuestion, 'id' | 'views' | 'authorId'> & { authorId: string, id?: string };

export type QuestionDocument = mongoose.Document<unknown, {}, IQuestion> & Omit<IQuestion & {
  _id: Types.ObjectId;
}, ""> & IQuestionMethods;

export const QuestionSchema = new mongoose.Schema<IQuestion, QuestionModel>(
  {
    title: {
        type: Schema.Types.String,
        trim: true,
        required: true,
    },
    details: {
        type: Schema.Types.String,
        required: true,
    },
    authorId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        toJSON: true,
    },
    views: {
        type: Number,
        default: 0,
    }
  },
  {  
    timestamps: true,
  }
);

    
QuestionSchema.plugin(toJSON);
// userSchema.plugin(paginate);

QuestionSchema.pre('save', async function (next) {

});

export const Question = mongoose.model<IQuestion, QuestionModel>('Question', QuestionSchema);


