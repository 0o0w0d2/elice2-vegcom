import { Router } from 'express';
import { login_required } from '../middlewares/login_required.js';
import { userAuthController } from '../controllers/userController.js';

const userAuthRouter = Router();

// 회원가입
userAuthRouter.post('/register', async function (req, res, next) {
    try {
        const { email, password, nickname } = req.body;

        const createUser = await userAuthController.register({ email, password, nickname });

        res.status(createUser.statusCode).send(createUser.response);
    } catch (error) {
        next(error);
    }
});

// 로그인
userAuthRouter.post('/login', async function (req, res, next) {
    try {
        const { email, password } = req.body;

        const user = await userAuthController.login({ email, password });

        res.status(user.statusCode).send(user.response);
    } catch (error) {
        next(error);
    }
});

// 로그인 검증
userAuthRouter.get('/isLogin', login_required, async function (req, res, next) {
    try {
        const userId = req.currentUserId;
        const currentUserInfo = await userAuthController.isLogin({ userId });

        res.status(currentUserInfo.statusCode).send(currentUserInfo.response);
    } catch (error) {
        next(error);
    }
});

// 유저 실적 보여주기
userAuthRouter.get('/point', login_required, async function (req, res, next) {
    try {
        const userId = req.currentUserId;
        const userPoint = await userAuthController.getPoint({ userId });

        res.status(userPoint.statusCode).send(userPoint.response);
    } catch (error) {
        next(error);
    }
});

//전체 유저 수 불러오기
userAuthRouter.get('/userCount', login_required, async function (req, res, next) {
    try {
        const userId = req.currentUserId;
        const userCount = await userAuthController.getCount({ userId });

        res.status(userCount.statusCode).send(userCount.response);
    } catch (error) {
        next(error);
    }
});

// 유저 정보 불러오기
userAuthRouter.get('/:userId', login_required, async function (req, res, next) {
    try {
        const userId = req.params.userId;
        const user = await userAuthController.getInfo({ userId });

        res.status(user.statusCode).send(user.response);
    } catch (error) {
        next(error);
    }
});

// 유저 정보 수정하기(별명, 설명)
userAuthRouter.put('/:userId', login_required, async function (req, res, next) {
    try {
        const userId = req.params.userId;
        const { nickname, description } = req.body;
        const toUpdate = { nickname, description };
        const updatedUser = await userAuthController.setInfo({ userId, toUpdate });

        res.status(updatedUser.statusCode).send(updatedUser.response);
    } catch (error) {
        next(error);
    }
});

// 유저 정보 삭제하기
userAuthRouter.delete('/:userId', login_required, async function (req, res, next) {
    try {
        const userId = req.params.userId;
        const deletedUser = await userAuthController.delInfo({ userId });

        res.status(deletedUser.statusCode).send(deletedUser.response);
    } catch (error) {
        next(error);
    }
});

export { userAuthRouter };
