import { userAuthService } from '../services/userService.js';
import errors from '../../errors.js';

class userAuthController {
    static async login({ email, password }) {
        try {
            const user = await userAuthService.getUser({ email, password });
            // 성공적인 응답 반환
            return {
                statusCode: 200,
                response: user,
            };
        } catch (error) {
            // 오류 발생 시 오류 응답 반환
            if (error.name === 'UserNotFoundEmail') {
                throw errors.UserNotFoundEmail;
            } else if (error.name === 'InvalidCredentials') {
                throw errors.InvalidCredentials;
            } else {
                throw errors.LoginFailedError;
            }
        }
    }

    static async register({ email, password, nickname }) {
        try {
            const user = await userAuthService.createUser({ email, password, nickname });
            // 성공적인 응답 반환
            return {
                statusCode: 200,
                response: user,
            };
        } catch (error) {
            console.log(error);
            // 오류 발생 시 오류 응답 반환
            if (error.name === 'EmailAlreadyExists') {
                throw errors.EmailAlreadyExists;
            } else {
                throw errors.RegistrationFailedError;
            }
        }
    }

    static async isLogin({ userId }) {
        try {
            const user = await userAuthService.getUserInfo({ userId });
            // 성공적인 응답 반환
            return {
                statusCode: 200,
                response: user,
            };
        } catch (error) {
            // 오류 발생 시 오류 응답 반환
            if (error.name === 'UserNotFoundId') {
                throw errors.UserNotFoundId;
            } else {
                throw errors.InvalidToken;
            }
        }
    }

    static async getPoint({ userId }) {
        try {
            const point = await userAuthService.getUserPoint({ userId });
            // 성공적인 응답 반환
            return {
                statusCode: 200,
                response: point,
            };
        } catch (error) {
            // 오류 발생 시 오류 응답 반환
            if (error.name === 'InvalidToken') {
                throw errors.InvalidToken;
            } else {
                throw errors.PointLoadFailedError;
            }
        }
    }

    static async getCount({ userId }) {
        try {
            const count = await userAuthService.getUserCount({ userId });
            // 성공적인 응답 반환
            return {
                statusCode: 200,
                response: count,
            };
        } catch (error) {
            // 오류 발생 시 오류 응답 반환
            if (error.name === 'InvalidToken') {
                throw errors.InvalidToken;
            } else {
                throw errors.UserCountLoadFailedError;
            }
        }
    }

    static async getInfo({ userId }) {
        try {
            const user = await userAuthService.getUserInfo({ userId });
            // 성공적인 응답 반환
            return {
                statusCode: 200,
                response: user,
            };
        } catch (error) {
            // 오류 발생 시 오류 응답 반환
            if (error.name === 'UserNotFoundId') {
                throw errors.UserNotFoundId;
            } else {
                throw errors.UserLoadFailedError;
            }
        }
    }

    static async setInfo({ userId, toUpdate }) {
        try {
            const user = await userAuthService.setUserInfo({ userId, toUpdate });
            // 성공적인 응답 반환
            return {
                statusCode: 200,
                response: user,
            };
        } catch (error) {
            // 오류 발생 시 오류 응답 반환
            if (error.name === 'UserNotFoundId') {
                throw errors.UserNotFoundId;
            } else {
                throw errors.UserUpdateFailedError;
            }
        }
    }

    static async delInfo({ userId }) {
        try {
            const user = await userAuthService.delUserInfo({ userId });
            // 성공적인 응답 반환
            return {
                statusCode: 200,
                response: user,
            };
        } catch (error) {
            // 오류 발생 시 오류 응답 반환
            if (error.name === 'UserNotFoundId') {
                throw errors.UserNotFoundId;
            } else {
                throw errors.UserDeleteFailedError;
            }
        }
    }
}

export { userAuthController };
