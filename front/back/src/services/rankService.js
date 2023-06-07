import { User, Rank } from '../db/index.js';
import errors from '../../errors.js';

class rankService {
    static async getRankList({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw errors.UserNotFoundId;
        }

        const rankList = await Rank.getRankList();

        return rankList;
    }
}

export { rankService };
