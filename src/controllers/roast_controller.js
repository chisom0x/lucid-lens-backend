import { successResponse, errorResponse } from '../utils/response.js';
import roastMeService from '../services/roast_ai_service.js';

export default class RoastController {
  static async generateRoast(req, res, next) {
    try {
      const image = req.file;

      if (!image) {
        return errorResponse(
          res,
          400,
          'Please add your image, abi you dey feel like say you be model?'
        );
      }

      const roast = await roastMeService.roastImage(image.buffer);

      return successResponse(res, roast);
    } catch (error) {
      return next(error);
    }
  }
}
