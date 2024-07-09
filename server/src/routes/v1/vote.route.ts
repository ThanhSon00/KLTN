import { Router } from 'express';
import validate from '../../middlewares/validate';
import { voteValidation } from '../../validations';
import { voteController } from '../../controllers';
import { auth } from '../../middlewares/auth';

const force = true;
const router = Router();

router.route('/')
    .post(validate(voteValidation.createVote), auth(force), voteController.createVote);

router.route('/:id')
    .delete(validate(voteValidation.deleteVote), voteController.deleteVote)
    .patch(validate(voteValidation.updateVote), auth(force), voteController.updateVote);


export default router;