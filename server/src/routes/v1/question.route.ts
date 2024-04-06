import { Router } from 'express';
import validate from '../../middlewares/validate';
import { questionController } from '../../controllers';
import questionValidation from '../../validations'
const router = Router();

router.post('/', validate(questionValidation.createQuestion), questionController.createQuestion);
router.get('/:id', validate(questionValidation.getQuestion), questionController.getQuestion);

export default router;
