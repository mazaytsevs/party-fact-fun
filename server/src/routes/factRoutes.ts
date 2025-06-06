import { Router } from 'express';
import { factController } from '../controllers/factController';

const router = Router();

router.post('/', factController.addFact);
router.get('/', factController.getFacts);
router.get('/:id', factController.getFact);

export default router; 