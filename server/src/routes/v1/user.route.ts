import { Router } from 'express';
import validate from '../../middlewares/validate';
import userValidation from '../../validations/user.validation';
import { userController } from '../../controllers';
import multer from 'multer';

const upload = multer({ dest: 'src/public/uploads/' })
const router = Router();

router.route('/search')
  .get(validate(userValidation.searchUsers), userController.searchUsers)

router.route('/:id/notifications/:notificationId')
  .patch(validate(userValidation.markNotificationAsRead), userController.markNotificationAsRead)

router.route('/:id/notifications')
  .get(validate(userValidation.getUserNotifications), userController.getUserNotifications)

router.route('/:id/notifications/count-unseen')
  .get(validate(userValidation.countUnseenUserNotifications), userController.countUnseenUserNotifications)

router.route('/:id/questions/count')
  .get(validate(userValidation.getUserQuestionsCount), userController.getUserQuestionsCount)

router.route('/:id/questions')
  .get(validate(userValidation.getUserQuestions), userController.getUserQuestions)

router.route('/:id/answers/count')
  .get(validate(userValidation.getUserAnswersCount), userController.getUserAnswersCount)

router.route('/:id/answers')
  .get(validate(userValidation.getUserAnswers), userController.getUserAnswers)

router.route('/count')
  .get(validate(userValidation.getUsersCount), userController.getUsersCount)

router.route('/:id')
  .get(validate(userValidation.getUser), userController.getUser)
  .patch(upload.fields([
    { name: 'avatar', maxCount: 1 },
    { name: 'cover', maxCount: 1 },
  ]), validate(userValidation.updateUser), userController.updateUser)

router.route('/')
  .get(validate(userValidation.getUsers), userController.getUsers)
export default router;
