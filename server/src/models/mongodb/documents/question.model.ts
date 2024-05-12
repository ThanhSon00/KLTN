import mongoose, { Schema, Types } from 'mongoose';
import { toJSON, /*paginate*/ } from '../../plugins';
import { AnswerDetailSchema, IAnswerDetail } from '../subdocuments/answerDetail.model';
import autoPopulate from 'mongoose-autopopulate';
import axios from 'axios';
import config from '../../../config/config';
import { IKeyword } from '../subdocuments/keyword.model';
import { Decimal128 } from 'mongodb';

/**
 * @type {SchemaDefinitionProperty}
 */
export interface IQuestion {
  id: Types.ObjectId;
  title: string;
  details: string;
  author: Types.ObjectId;
  views: Number;
  comments: [IAnswerDetail]
  enableTimestamps?: boolean;
}

// export type UserInput = Omit<IQuestion, 'avatar' | 'isEmailVerified'>;

export interface IQuestionMethods {
    //methods
    toParagraph(): string;
    getKeywords(): Promise<[IKeyword]>;
}

export interface QuestionModel extends mongoose.Model<IQuestion, {}, IQuestionMethods> {
    // static methods
    getMeaningfulWords(text: string): Promise<Array<{ word: string }>>
}

export type QuestionInput = Pick<IQuestion, 'title' | 'details'> & { author: string, id?: string };

export type QuestionUpdate = Pick<IQuestion, 'title' | 'details'>;

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
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
        autopopulate: { maxDepth: 1 }
    },
    views: {
        type: Number,
        default: 0,
    },
    comments: [AnswerDetailSchema],
    enableTimestamps: {
      type: Schema.Types.Boolean,
      default: true,
    }
  },
  {  
    timestamps: true,
  }
);

// @ts-expect-error
QuestionSchema.plugin(toJSON);
// @ts-expect-error
QuestionSchema.plugin(autoPopulate);
// userSchema.plugin(paginate);

QuestionSchema.post('findOne', async function(result) {
  if (result) {
    result.views += 1;
    await result.save();
  }
})

QuestionSchema.statics.getMeaningfulWords = async function(text: string): Promise<Array<{ word: string }>> {
  const { data } = await axios.post(`${config.nlp.origin}/api/extract-keywords/`, { paragraph: text }, {
    headers: {
      'Content-Type': 'application/json'
    }
  })
  return data;
}

QuestionSchema.methods.toParagraph = function(): string {
  const question = this as QuestionDocument;
  const paragraphs = [question.title, question.details, ...question.comments.map(c => c.content)]
  return paragraphs.join('. ')
    .replace(/\.\./g , '.')  // Replace .. with .
    .replace(/<\/?[^>]+(>|$)/g, ""); // Remove HTML tags
}

QuestionSchema.methods.getKeywords = async function(): Promise<IKeyword[]> {
  const question = this as QuestionDocument;
  const paragraph = question.toParagraph();
  const keywords = await Question.getMeaningfulWords(paragraph);
  return keywords.map(item => { 
    return { 
      word: item.word, 
      tf_idf: mongoose.Types.Decimal128.fromString('0') 
    } 
  });
}

export const Question = mongoose.model<IQuestion, QuestionModel>('Question', QuestionSchema);


