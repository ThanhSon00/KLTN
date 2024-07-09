import express from 'express';
import validate from '../../middlewares/validate';
import { answerController } from '../../controllers'
import { answerValidation } from '../../validations';
import { auth } from '../../middlewares/auth';
const router = express.Router();

router.route('/count')
  .get(validate(answerValidation.getAnswersCount), answerController.getAnswersCount);

router.route('/:id/comments/:commentId')
  .patch(validate(answerValidation.updateAnswerComment), answerController.updateAnswerComment)

router.route('/:id/comments')
  .post(validate(answerValidation.createAnswerComment), answerController.createAnswerComment)
  .get(validate(answerValidation.getAnswerComments), auth(), answerController.getAnswerComments);

router.route('/:id')
  .patch(validate(answerValidation.updateAnswer), answerController.updateAnswer)
  .get(validate(answerValidation.getAnswer), answerController.getAnswer)


router.route('/')
  .get(validate(answerValidation.getAnswers), answerController.getAnswers)
  .post(validate(answerValidation.createAnswer), answerController.createAnswer);

export default router;