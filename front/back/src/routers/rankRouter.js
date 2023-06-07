import { Router } from 'express';
import { login_required } from '../middlewares/login_required.js';
import { rankController } from '../controllers/rankController.js';

const rankRouter = Router();

rankRouter.get('/list', login_required, async function (req, res, next) {
    try {
        const userId = req.currentUserId;
        const user = await rankController.rankList({ userId });

        res.status(user.statusCode).send(user.response);
    } catch (error) {
        next(error);
    }
});

export { rankRouter };
