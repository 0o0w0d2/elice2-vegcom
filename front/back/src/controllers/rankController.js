import { rankService } from '../services/rankService.js';
import errors from '../../errors.js';

class rankController {
    static async rankList({ userId }) {
        try {
            const user = await rankService.getRankList({ userId });
            // 성공적인 응답 반환
            return {
                statusCode: 200,
                response: user,
            };
        } catch (error) {
            if (error.name === 'UserNotFoundId') {
                throw errors.UserNotFoundId;
            } else {
                throw errors.test;
            }
        }
    }
}

export { rankController };
