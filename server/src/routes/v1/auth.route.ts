import express from 'express';
import validate from '../../middlewares/validate';
import authValidation from '../../validations/auth.validation';
import authController from '../../controllers/auth.controller';

const router = express.Router();

router.post('/login', validate(authValidation.login), authController.login)
router.post('/register', validate(authValidation.register), authController.register);
router.post('/logout', validate(authValidation.logout), authController.logout());
router.post('/forgot-password', validate(authValidation.forgotPassword), authController.forgotPassword);
router.post('/verify-email', validate(authValidation.verifyEmail), authController.verifyEmail);
router.post('/new-password', validate(authValidation.newPassword), authController.newPassword);

router.get('/who-am-i', authController.verifyUser);

export default router;
