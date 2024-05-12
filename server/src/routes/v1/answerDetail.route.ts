import express from 'express';
import validate from '../../middlewares/validate';
import { answerDetailController } from '../../controllers'
import { answerDetailValidation } from '../../validations';
const router = express.Router();

router.patch('/:id', validate(answerDetailValidation.updateAnswerDetail), answerDetailController.updateAnswerDetail)
router.get('/:id', validate(answerDetailValidation.getAnswerDetail), answerDetailController.getAnswerDetail)

export default router;