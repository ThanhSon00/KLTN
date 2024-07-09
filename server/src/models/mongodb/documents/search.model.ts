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
    refreshKeywordRanking(totalQuestions: number, maxWords: number, mapOfWordOcurrences: Map<string, number> ): Promise<IKeyword[]>;
    computeRelevanceScore(keywords: string[]): { score: number, totalWordsMatch: number, totalWordsRelated: number };
}

export interface SearchModel extends mongoose.Model<ISearch, {}, ISearchMethods> {
    // static methods
    countAllSearch(): Promise<number>;
    countAllSearchWithWord(word: string, setOfWordOcurrences: Map<string, number>): Promise<number>;
    computeTF_IDF(word: string, paragraph: string, totalQuestions: number, setOfWordOcurrences: Map<string, number>): Promise<mongoose.mongo.BSON.Decimal128>;
    computeTF(word: string, paragraph: string): number;
    computeIDF(word: string, totalParagraph: number, setOfWordOcurrences: Map<string, number>): Promise<number>;
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

SearchSchema.statics.countAllSearchWithWord = async function(word: string, mapOfWordOcurrences: Map<string, number>): Promise<number> {
  if (mapOfWordOcurrences.get(word) === undefined) {
    const occurences = await this.countDocuments({ 'keywords.word': word })
    mapOfWordOcurrences.set(word, occurences);
  }
  return mapOfWordOcurrences.get(word) as number;
}

SearchSchema.statics.computeTF_IDF = async function(word: string, paragraph: string, totalQuestion: number, mapOfWordOcurrences: Map<string, number>): Promise<mongoose.mongo.BSON.Decimal128> {
  const IDF = await this.computeIDF(word, totalQuestion, mapOfWordOcurrences);
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

SearchSchema.statics.computeIDF = async function(word: string, totalDoc: number, mapOfWordOcurrences: Map<string, number>): Promise<number> {
  const getBaseLog = (base: number, number: number) => {
      return Math.log(number) / Math.log(base);
  }
  const totalMatchQuestion = await this.countAllSearchWithWord(word, mapOfWordOcurrences);
  return getBaseLog(10, totalDoc / (totalMatchQuestion + 1));
}

SearchSchema.methods.refreshKeywordRanking = async function(totalQuestions: number, maxWords: number, mapOfWordOcurrences: Map<string, number>): Promise<IKeyword[]> {
  const search = this as SearchDocument;
  const updatedKeywords: IKeyword[] = [];
  for (const word of search.keywords) {
    const tf_idf = await Search.computeTF_IDF(word.word, search.paragraph, totalQuestions, mapOfWordOcurrences);
    updatedKeywords.push({ word: word.word, tf_idf });
  }
  return updatedKeywords.sort((a, b) => parseFloat(b.tf_idf.toString()) - parseFloat(a.tf_idf.toString())).splice(0, maxWords);
}

SearchSchema.methods.computeRelevanceScore = function(keywordsToFind: string[]): { score: number, totalWordsMatch: number, totalWordsRelated: number } {
  const keywordsToFindSet = new Set(keywordsToFind);
  const search = this as SearchDocument;
  const containPartOfString = (word: string) => {
    for (const keywordToFind of keywordsToFindSet) {
      if (keywordToFind.includes(word) || word.includes(keywordToFind)) {
        return true;
      }
    } return false;
  }

  let totalWordsMatch = 0, score = 0, totalWordsRelated = 0;
  for (const word of search.keywords) {
    if (keywordsToFindSet.has(word.word)) {
      score += parseFloat(word.tf_idf.toString());
      totalWordsMatch += 1;
      keywordsToFindSet.delete(word.word);
    }
  }

  for (const word of search.keywords) {
    if (containPartOfString(word.word)) {
      score += parseFloat(word.tf_idf.toString());
      totalWordsRelated += 1;
    }
  }
  return { score, totalWordsMatch, totalWordsRelated };
}

export const Search = mongoose.model<ISearch, SearchModel>('Search', SearchSchema);