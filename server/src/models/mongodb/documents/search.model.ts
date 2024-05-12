import mongoose, { Schema, Types } from 'mongoose';
import { toJSON, /*paginate*/ } from '../../plugins';
import { AnswerDetailSchema, IAnswerDetail } from '../subdocuments/answerDetail.model';
import autoPopulate from 'mongoose-autopopulate';
import { KeywordSchema } from '../subdocuments';
import { IKeyword } from '../subdocuments/keyword.model';
/**
 * @type {SchemaDefinitionProperty}
 */
export interface ISearch {
  id: Types.ObjectId;
  questionId: Types.ObjectId;
  paragraph: string;
  keywords: IKeyword[]
}

export type SearchInput = Pick<ISearch, "questionId" | "paragraph" | "keywords">;

export interface ISearchMethods {
    //methods
    refreshKeywordRanking(totalQuestions: number): Promise<IKeyword[]>;
    computeRelevanceScore(keywords: string[]): number;
}

export interface SearchModel extends mongoose.Model<ISearch, {}, ISearchMethods> {
    // static methods
    countAllSearch(): Promise<number>;
    countAllSearchWithWord(word: string): Promise<number>;
    computeTF_IDF(word: string, paragraph: string, totalQuestions: number): Promise<mongoose.mongo.BSON.Decimal128>;
    computeTF(word: string, paragraph: string): number;
    computeIDF(word: string, totalParagraph: number): Promise<number>;
}

export type SearchDocument = mongoose.Document<unknown, {}, ISearch> & Omit<ISearch & {
  _id: Types.ObjectId;
}, ""> & ISearchMethods;

export const SearchSchema = new mongoose.Schema<ISearch, SearchModel>(
  {
    questionId: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true,
      toId: true,
    },
    paragraph: {
      type: Schema.Types.String,
      required: true,
    },
    keywords: [KeywordSchema]
  }, {  
    timestamps: true,
  }
);

// @ts-expect-error
SearchSchema.plugin(toJSON);
// @ts-expect-error
SearchSchema.plugin(autoPopulate);
// userSchema.plugin(paginate);

SearchSchema.statics.countAllSearch = async function(): Promise<number> {
  return await this.estimatedDocumentCount();
}

SearchSchema.statics.countAllSearchWithWord = async function(word: string): Promise<number> {
  return await this.countDocuments({ 'keywords.word': word })
}

SearchSchema.statics.computeTF_IDF = async function(word: string, paragraph: string, totalQuestion: number): Promise<mongoose.mongo.BSON.Decimal128> {
  const IDF = await this.computeIDF(word, totalQuestion);
  const TF = this.computeTF(word, paragraph);
  const TF_IDF = mongoose.Types.Decimal128.fromString(`${IDF * TF}`);
  return TF_IDF;
}

SearchSchema.statics.computeTF = function(word: string, paragraph: string): number {
  const countOccurrencesIgnoreCase = (doc: string, wordToCount: string) => {
      doc = doc.toLowerCase(); // Convert the entire string to lowercase
      wordToCount = wordToCount.toLowerCase(); // Convert the substring to lowercase

      if (wordToCount.length <= 0) return doc.length + 1;

      let n = 0,
          pos = 0,
          step = wordToCount.length;

      while (true) {
          pos = doc.indexOf(wordToCount, pos);
          if (pos >= 0) {
              ++n;
              pos += step;
          } else break;
      }

      return n;
  }
  const totalWords = paragraph.split(' ').length;
  const count = countOccurrencesIgnoreCase(paragraph, word);
  return count / totalWords;
}

SearchSchema.statics.computeIDF = async function(word: string, totalDoc: number): Promise<number> {
  const getBaseLog = (base: number, number: number) => {
      return Math.log(number) / Math.log(base);
  }
  const totalMatchQuestion = await this.countAllSearchWithWord(word);
  return getBaseLog(10, totalDoc / (totalMatchQuestion + 1));
}

SearchSchema.methods.refreshKeywordRanking = async function(totalQuestions: number): Promise<IKeyword[]> {
  const search = this as SearchDocument;
  const updatedKeywords: IKeyword[] = [];
  for (const word of search.keywords) {
    const tf_idf = await Search.computeTF_IDF(word.word, search.paragraph, totalQuestions);
    updatedKeywords.push({ word: word.word, tf_idf });
  }
  return updatedKeywords.sort((a, b) => parseFloat(b.tf_idf.toString()) - parseFloat(a.tf_idf.toString()));
}

SearchSchema.methods.computeRelevanceScore = function(keywords: string[]): number {
  const search = this as SearchDocument;
  let score = 0;
  for (const word of search.keywords) {
    if (keywords.includes(word.word)) {
      score += parseFloat(word.tf_idf.toString());
    }
  }
  return score;
}
export const Search = mongoose.model<ISearch, SearchModel>('Search', SearchSchema);