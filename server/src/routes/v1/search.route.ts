import { Router } from 'express';
import validate from '../../middlewares/validate';
import { searchController } from '../../controllers';
const router = Router();

router.post('/init', searchController.init)
router.post('/refresh', searchController.refresh);

export default router;

