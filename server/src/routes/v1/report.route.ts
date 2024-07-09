import { Router } from 'express';
import validate from '../../middlewares/validate';
import { reportController } from '../../controllers';
import { reportValidation } from '../../validations'
const router = Router();

router.route('/:id')
    .patch(validate(reportValidation.updateReport), reportController.updateReport)

router.route('/')
    .post(validate(reportValidation.createReport), reportController.createReport)
    .get(validate(reportValidation.getReports), reportController.getReports);

export default router;