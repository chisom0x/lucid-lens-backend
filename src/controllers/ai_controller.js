import { successResponse, errorResponse } from '../utils/response.js';
import dreamInterpreter from '../services/ai_service.js';

export default class DreamController {
  static async interpretDream(req, res, next) {
    try {
      const { text } = req.body;

      if (!text || text.trim().length === 0) {
        return errorResponse(res, 400, 'Dream description cannot be empty.');
      }

      const interpretation = await dreamInterpreter.interpretDream(text);

      return successResponse(res, interpretation);
    } catch (error) {
      return next(error);
    }
  }
}
