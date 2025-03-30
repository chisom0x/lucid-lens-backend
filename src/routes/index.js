import { Router } from 'express';
import DreamController from '../controllers/ai_controller.js';

const router = Router();

router.post('/interpret', DreamController.interpretDream);

export default router;
