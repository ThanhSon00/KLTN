import mongoose, { Schema, Types } from 'mongoose';
import { toJSON, /*paginate*/ } from '../../plugins';
import { AnswerDetailSchema, IAnswerDetail } from '../subdocuments/answerDetail.model';
import autoPopulate from 'mongoose-autopopulate';
import axios from 'axios';
import config from '../../../config/config';
import { IKeyword } from '../subdocuments/keyword.model';
import { Vote } from './vote.model';
import { AnswerSchema, IAnswer } from './answer.model';
import { IUser } from './user.model';

/**
 * @type {SchemaDefinitionProperty}
 */
export interface IQuestion {
  id: Types.ObjectId;
  title: string;
  details: string;
  author: Types.ObjectId | IUser;
  views: number;
  answers: IAnswer[]
  enableTimestamps?: boolean;
  votes: number;
  answered: boolean;
  answersCount: number;
  totalVotes: number;
}

// export type UserInput = Omit<IQuestion, 'avatar' | 'isEmailVerified'>;

export interface IQuestionMethods {
    //methods
    toParagraph(): string;
    getKeywords(): Promise<[IKeyword]>;
}

export interface QuestionModel extends mongoose.Model<IQuestion, {}, IQuestionMethods> {
    // static methods
    getMeaningfulWords(text: string): Promise<Array<{ word: string }>>;
    getAnsweredPecentage(): Promise<number>;
    countAnsweredQuestions(): Promise<number>;
    markAnswered(id: string, answered: boolean): Promise<void>;
}

export type QuestionInput = Pick<IQuestion, 'title' | 'details' | 'answersCount'> & { author: string, id?: string };

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
        type: Schema.Types.Number,
        default: 0,
    },
    answers: [AnswerSchema],
    enableTimestamps: {
      type: Schema.Types.Boolean,
      default: true,
    },
    votes: {
      type: Schema.Types.Number,
      required: true,
      default: 0,
    },
    answered: {
      type: Schema.Types.Boolean,
      required: true,
      default: false,
    },
    answersCount: {
      type: Schema.Types.Number,
      required: true,
      default: 0,
    },
    totalVotes: {
      type: Schema.Types.Number,
      required: true,
      default: 0
    }
  },
  {  
    timestamps: true,
    toJSON: {
      virtuals: true,
      getters: true,
    },
  }
);

// @ts-expect-error
QuestionSchema.plugin(toJSON);
// @ts-expect-error
QuestionSchema.plugin(autoPopulate);
// userSchema.plugin(paginate);

QuestionSchema.virtual('voteStatus', {
  ref: 'Vote',
  localField: '_id',
  foreignField: 'questionId',
  justOne: true,
});

QuestionSchema.pre('find', async function(next) {
  const query = this.getOptions();
  if (query.limit) {
    const newOptions = {...query, limit: query.limit + 1 };
    this.setOptions(newOptions);
  }
  next();
})

QuestionSchema.post('find', async function(docs: Array<QuestionDocument>) {
  for (const doc of docs) {
    doc.answers.sort((a, b) => b.details.votes - a.details.votes);
  }
})


QuestionSchema.post('find', async function(docs: Array<QuestionDocument | { hasMore: boolean }>) {
  const query = this.getOptions();
  for (const doc of docs as QuestionDocument[]) {
    (doc.answers).sort((a, b) => b.details.votes - a.details.votes);
  }
  if (query.limit) {
    const hasMore = !!docs[query.limit - 1]
    if (hasMore) {
      docs.pop();
    }
    docs.push({ hasMore })
  }
})

QuestionSchema.post('findOne', function(doc: QuestionDocument) {
  doc.answers.sort((a, b) => b.details.votes - a.details.votes);
})

QuestionSchema.post('find', function(docs: QuestionDocument[]) {

})
// QuestionSchema.pre('save', (next) => {
//   const question = this as unknown as QuestionDocument;
//   if (question.isModified(['answers.details.votes', 'votes'])) {
//     question.answersCount = question.answers.length;
//     question.totalVotes = question.votes + question.answers.reduce((sum, answer) => sum + answer.details.votes, 0);
//   }
//   next();
// })

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
  const paragraphs = [question.title, question.details, ...question.answers.map(c => c.details.content).splice(0, 5)]
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

QuestionSchema.statics.getAnsweredPecentage = async function(): Promise<number> {
  const answeredQuestionCount = await this.countAnsweredQuestions();
  const totalQuestions = await this.estimatedDocumentCount();
  return Math.round((answeredQuestionCount / totalQuestions) * 100);
}

QuestionSchema.statics.countAnsweredQuestions = async function(): Promise<number> {
  const count = await this.countDocuments({ answers: { $ne: [] } });
  return count;
}

QuestionSchema.statics.markAnswered = async function(id: string, answered: boolean): Promise<void> {
  await this.findByIdAndUpdate(id, { answered })
}

export const Question = mongoose.model<IQuestion, QuestionModel>('Question', QuestionSchema);


// Question.findById("sfiwoe").populate('voteStatus', 'type', Vote, { voter: " iowfiwof" })
 