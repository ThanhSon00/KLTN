import { Router } from 'express';
import { auth } from '../../middlewares/auth';
import validate from '../../middlewares/validate';
import { createUser, getUsers, getUser, updateUser, deleteUser } from '../../validations/user.validation';
import { userController } from '../../controllers';
const router = Router();

router
  .route('/:userId')
  .get(validate(getUser), userController.getUser)
  // .patch(auth('manageUsers'), validate(updateUser), _updateUser)
  // .delete(auth('manageUsers'), validate(deleteUser), _deleteUser);

router
  .route('/')
  // .post(auth('manageUsers'), validate(createUser), _createUser)
  // .get(auth('getUsers'), validate(getUsers), _getUsers);


export default router;
