import express from 'express';
import validate from '../../middlewares/validate';
import { answerController } from '../../controllers'
import { answerValidation } from '../../validations';
const router = express.Router();

router.post('/', validate(answerValidation.createAnswer), answerController.createAnswer);
router.get('/', validate(answerValidation.getAnswers), answerController.getAnswers);

export default router;