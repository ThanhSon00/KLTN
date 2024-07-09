import { faker } from "@faker-js/faker";
import { CommentInput, IComment } from "../../src/models/mongodb/documents/comment.model";
import { answerOne } from "./answer.fixture";
import { matchUserFour, matchUserOne, userFour, userOne } from "./user.fixture";
import { commentRepository } from "../../src/repositories";

export const commentOne: CommentInput = {
  id: faker.database.mongodbObjectId(),
  answerId: answerOne.id as string,
  author: userOne.id as string,
  content: faker.lorem.sentence(),
};

export const matchCommentOne = {
  id: commentOne.id as string,
  answerId: commentOne.answerId as string,
  details: {
    author: matchUserOne,
    content: commentOne.content as string,
    id: expect.any(String),
    votes: 0,
    isBestAnswer: false,
    updatedAt: expect.anything(),
    createdAt: expect.anything(),
  },
};

export const commentTwo: CommentInput = {
  id: faker.database.mongodbObjectId(),
  answerId: answerOne.id as string,
  author: userFour.id as string,
  content: faker.lorem.sentence(),
};

export const matchCommentTwo = {
  id: commentTwo.id as string,
  answerId: commentTwo.answerId as string,
  details: {
    author: matchUserFour,
    content: commentTwo.content as string,
    id: expect.any(String),
    votes: 0,
    isBestAnswer: false,
    updatedAt: expect.anything(),
    createdAt: expect.anything(),
  },
};

export const insertComment = async (comment: CommentInput): Promise<IComment> => {
  const commentDb = await commentRepository.create({ ...comment, _id: comment.id });
  return commentDb;
};