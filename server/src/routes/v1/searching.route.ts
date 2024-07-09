import { Router } from 'express';
import validate from '../../middlewares/validate';
import { searchingController, userController } from '../../controllers';
import { searchingValidation } from '../../validations';

const router = Router();

router.route('/')
    .get(validate(searchingValidation.searching), searchingController.searching)

export default router;