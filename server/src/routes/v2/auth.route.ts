import express from 'express';
import validate from '../../middlewares/validate';
import authValidation from '../../validations/auth.validation';
import authController from '../../controllers/auth.controller';
import { auth } from '../../middlewares/auth';

const router = express.Router();
const isAdmin = true;

router.post('/login', validate(authValidation.adminLogin), authController.adminLogin);
router.post('/logout', validate(authValidation.logout), authController.logout(isAdmin));
router.get('/who-am-i', auth(), authController.verifyAdmin);

export default router;
