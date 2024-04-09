import { Question } from '../models/mongodb';
import { QuestionInput } from '../models/mongodb/question.model';

const create = (questionBody: QuestionInput) => {
  return Question.create({ ...questionBody, _id: questionBody.id });
};

const getById = (id: string) => {
  return Question.findById(id);
}

export default {
  create,
  getById,
};
