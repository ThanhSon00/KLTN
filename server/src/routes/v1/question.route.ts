import { Router } from 'express';
import validate from '../../middlewares/validate';
import { questionController } from '../../controllers';
import questionValidation from '../../validations'
import { auth } from '../../middlewares/auth';
const router = Router();

router.get('/answered-percentage', validate(questionValidation.getAnsweredPercentage), questionController.getAnsweredPercentage)
router.get('/count', validate(questionValidation.getQuestionsCount), questionController.getQuestionsCount);

router.get('/:id', validate(questionValidation.getQuestion), auth(), questionController.getQuestion);
router.patch('/:id', validate(questionValidation.updateQuestion), questionController.updateQuestion);

router.post('/', validate(questionValidation.createQuestion), questionController.createQuestion);
router.get('/', validate(questionValidation.getQuestions), questionController.getQuestions);


export default router;
