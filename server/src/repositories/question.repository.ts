import { QueryOptions } from 'mongoose';
import { Question, Search } from '../models/mongodb/documents';
import { IQuestion, QuestionInput, QuestionUpdate } from '../models/mongodb/documents/question.model';

const create = async (questionBody: QuestionInput) => {
  const question = await Question.create({ ...questionBody, _id: questionBody.id });
  // const keywords = await question.getKeywords()
  // await Search.create({ 
  //   questionId: question.id, 
  //   paragraph: question.toParagraph(), 
  //   keywords
  // });
  return question;
};

const getById = (id: string) => {
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
};
