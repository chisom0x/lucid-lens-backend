import { Router } from 'express';
import DreamController from '../controllers/ai_controller.js';
import RoastController from '../controllers/roast_controller.js';
import imageUpload from '../middlewares/multer_upload.js';

const router = Router();

router.post('/interpret', DreamController.interpretDream);
router.post(
  '/roast',
  imageUpload.single('image'),
  RoastController.generateRoast
);

export default router;
