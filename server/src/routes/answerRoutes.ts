import { Router } from 'express';
import { answerController } from '../controllers/answerController';

const router = Router();

router.post('/', answerController.submitAnswer);
router.get('/', answerController.getAnswers);

export default router; 