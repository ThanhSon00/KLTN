import { Router } from 'express';
import validate from '../../middlewares/validate';
import userValidation from '../../validations/user.validation';
import { userController } from '../../controllers';
const router = Router();

router
  .route('/:id')
  .get(validate(userValidation.getUser), userController.getUser)
  // .patch(auth('manageUsers'), validate(updateUser), _updateUser)
  // .delete(auth('manageUsers'), validate(deleteUser), _deleteUser);

router
  .route('/')
  // .post(auth('manageUsers'), validate(createUser), _createUser)
  // .get(auth('getUsers'), validate(getUsers), _getUsers);


export default router;
