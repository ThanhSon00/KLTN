import { expect, describe, test, beforeEach, jest } from '@jest/globals';
import { faker } from "@faker-js/faker";
import setupTestDB from "../../utils/setupTestDB";
import { insertAnswer, answerOne } from '../../fixtures/answer.fixture';
import { insertQuestion, matchQuestionOne, questionOne } from '../../fixtures/question.fixture';
import { insertUser, userOne } from '../../fixtures/user.fixture';
import { insertVote, voteOne } from '../../fixtures/vote.fixture';
import { VoteType } from '../../../src/models/mongodb/documents/vote.model';
import { answerRepository, commentRepository, questionRepository, voteRepository } from '../../../src/repositories';
import { matchAnswerOne } from '../../integration/answer.test';
import { commentOne, insertComment, matchCommentOne } from '../../fixtures/comment.fixture';
import { Comment } from '../../../src/models/mongodb/documents/comment.model';

setupTestDB();



describe('Vote repository', () => {
  describe('Vote create', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
      await insertAnswer(answerOne);
      await insertComment(commentOne);
    })
    test('should update votes number in question after vote it', async () => {
      await insertVote({ voter: userOne.id, type: VoteType.upvote, questionId: questionOne.id });
      const question = await questionRepository.getById(questionOne.id as string);
      const data = question?.toJSON();
      expect(data).toMatchObject({
        ...matchQuestionOne,
        votes: 1,
      })
    })

    test('should update votes number in answer and question answer after vote it', async () => {
      await insertVote({ voter: userOne.id, type: VoteType.upvote, answerId: answerOne.id });
      const answer = await answerRepository.getById(answerOne.id as string);
      const answerJson = answer?.toJSON();
      expect(answerJson).toMatchObject({
        ...matchAnswerOne, 
        details: {
          ...matchAnswerOne.details, votes: 1
        }
      })

      const question = await questionRepository.getById(questionOne.id as string);
      const questionJson = question?.toJSON();
      expect(questionJson).toMatchObject({
        ...matchQuestionOne,
        answers: [{ 
          ...matchAnswerOne,
          details: {
           ...matchAnswerOne.details, 
           votes: 1
          } 
        }]
      })
    })

    test('should update votes number in comment after vote it', async () => {
      await insertVote({ voter: userOne.id, type: VoteType.upvote, commentId: commentOne.id })
      const comment = await Comment.findById(commentOne.id);
      const commentJson = comment?.toJSON();

      expect(commentJson).toMatchObject({
        ...matchCommentOne,
        details: {
          ...matchCommentOne.details,
          votes: 1
        }
      })
    })
  })

  describe('Vote update', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
      await insertAnswer(answerOne);
      await insertComment(commentOne);
    })

    test('should update votes number in question after change it', async () => {
      const vote = await insertVote({ voter: userOne.id, type: VoteType.upvote, questionId: questionOne.id });
      await voteRepository.updateVote(vote.id, { type: VoteType.downvote });
      const question = await questionRepository.getById(questionOne.id as string);
      const data = question?.toJSON();
      expect(data).toMatchObject({
        ...matchQuestionOne,
        votes: -1,
      })
    })

    test('should update votes number in answer and question answer after change it', async () => {
      const vote = await insertVote({ voter: userOne.id, type: VoteType.upvote, answerId: answerOne.id });
      await voteRepository.updateVote(vote.id, { type: VoteType.downvote });
      const answer = await answerRepository.getById(answerOne.id as string);
      const answerJson = answer?.toJSON();
      expect(answerJson).toMatchObject({
        ...matchAnswerOne, 
        details: {
          ...matchAnswerOne.details, votes: -1
        }
      })

      const question = await questionRepository.getById(questionOne.id as string);
      const questionJson = question?.toJSON();
      expect(questionJson).toMatchObject({
        ...matchQuestionOne,
        answers: [{ 
          ...matchAnswerOne,
          details: {
           ...matchAnswerOne.details, 
           votes: -1
          } 
        }]
      })
    })

    test('should update votes number in comment after change it', async () => {
      const vote = await insertVote({ voter: userOne.id, type: VoteType.upvote, commentId: commentOne.id })
      await voteRepository.updateVote(vote.id, { type: VoteType.downvote });

      const comment = await Comment.findById(commentOne.id);
      const commentJson = comment?.toJSON();

      expect(commentJson).toMatchObject({
        ...matchCommentOne,
        details: {
          ...matchCommentOne.details,
          votes: -1
        }
      })
    })
  })

  describe('Vote delete', () => {
    beforeEach(async () => {
      await insertUser(userOne);
      await insertQuestion(questionOne);
      await insertAnswer(answerOne);
      await insertComment(commentOne);
    })

    test('should update votes number in question after delete it', async () => {
      const vote = await insertVote({ voter: userOne.id, type: VoteType.upvote, questionId: questionOne.id });
      await voteRepository.deleteVote(vote.id);
      const question = await questionRepository.getById(questionOne.id as string);
      const data = question?.toJSON();
      expect(data).toMatchObject({
        ...matchQuestionOne,
        votes: 0,
      })
    })

    test('should update votes number in answer after delete it', async () => {
      const vote = await insertVote({ voter: userOne.id, type: VoteType.upvote, answerId: answerOne.id });
      await voteRepository.deleteVote(vote.id);
      const answer = await answerRepository.getById(answerOne.id as string);
      const answerJson = answer?.toJSON();
      expect(answerJson).toMatchObject({
        ...matchAnswerOne, 
        details: {
          ...matchAnswerOne.details, votes: 0
        }
      })

      const question = await questionRepository.getById(questionOne.id as string);
      const questionJson = question?.toJSON();
      expect(questionJson).toMatchObject({
        ...matchQuestionOne,
        answers: [{ 
          ...matchAnswerOne,
          details: {
           ...matchAnswerOne.details, 
           votes: 0
          } 
        }]
      })
    })

    test('should update votes number in comment after delete it', async () => {
      const vote = await insertVote({ voter: userOne.id, type: VoteType.upvote, commentId: commentOne.id })
      await voteRepository.deleteVote(vote.id);

      const comment = await Comment.findById(commentOne.id);
      const commentJson = comment?.toJSON();

      expect(commentJson).toMatchObject({
        ...matchCommentOne,
        details: {
          ...matchCommentOne.details,
          votes: 0
        }
      })
    })
  })
})