import { QueryOptions } from 'mongoose';
import { Question, Search, User } from '../models/mongodb/documents';
import { IQuestion, QuestionDocument, QuestionInput, QuestionUpdate } from '../models/mongodb/documents/question.model';
import userRepository from './user.repository';
import { Vote } from '../models/mongodb/documents/vote.model';
import searchRepository from './search.repository';

const createQuestionSearch = async (question: QuestionDocument) => {
  const mapOfWordOcurrences = new Map<string, number>();
  const keywords = await question.getKeywords()
  const search = await Search.create({ 
    questionId: question.id, 
    paragraph: question.toParagraph(), 
    keywords,
  });
  const totalDoc = await Search.estimatedDocumentCount();
  const updatedKeywords = await search.refreshKeywordRanking(totalDoc, 200, mapOfWordOcurrences);
  await searchRepository.update({ id: search.id }, {
    keywords: updatedKeywords
  })
}

const create = async (questionBody: QuestionInput) => {
  const user = await User.findById(questionBody.author);
  if (!user) throw new Error('User not found');
  const question = await Question.create({ ...questionBody, _id: questionBody.id });
  user.questions += 1;
  await user.save();

  await createQuestionSearch(question);
  return question;
};

const getById = (id: string, userId?: string) => {
  if (userId) {
    return Question.findById(id).populate({ 
      path: 'answers.voteStatus voteStatus', 
      match: { voter: userId },  
      select: 'type',
      options: { _recursed: true },
    });
  }
  return Question.findById(id);
}

const update = ({ id }: { id?: string, filter?: string}, questionBody: QuestionUpdate) => {
  return Question.findByIdAndUpdate(id, questionBody, { new: true });
}
const getList = (filter: Partial<QuestionInput>, queryOptions?: QueryOptions<IQuestion & { lean: true }>) => {  
  return Question.find(filter, null, queryOptions);
}

export default {
  create,
  getById,
  update,
  getList,
}
