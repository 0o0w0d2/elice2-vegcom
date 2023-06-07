import { User } from '../db/index.js';
import errors from '../../errors.js';

import passport from 'passport';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class userAuthService {
    // 로그인 검사
    static async getUser({ email, password }) {
        const user = await User.findByEmail({ email });

        // 이메일 검증
        if (!user) {
            throw errors.UserNotFoundEmail;
        }

        // 비밀번호 확인
        const correctPasswordHash = user.password;
        const isPasswordCorrect = await bcrypt.compare(password, correctPasswordHash);

        if (!isPasswordCorrect) {
            throw errors.InvalidCredentials;
        }

        // 유저 정보가 있고 비밀번호가 일치하면 JWT 토큰을 생성한다.
        const secretKey = process.env.JWT_SECRET_KEY || 'jwt-secret-key';
        const token = jwt.sign({ userId: user.id }, secretKey);

        // 유저 정보 반환
        const id = user.id;
        const name = user.nickname;
        const description = user.description;

        const loginUser = {
            token,
            id,
            email,
            name,
            description,
            successMessage: '로그인에 성공했습니다.',
            errorMessage: null,
        };

        return loginUser;
    }

    // 유저 생성
    static async createUser({ email, password, nickname }) {
        // 이메일 중복 확인
        const user = await User.findByEmail({ email });

        if (user) {
            throw errors.EmailAlreadyExists;
        }

        // 비밀번호 암호화
        const hashedPassword = await bcrypt.hash(password, 10);

        const createUser = await User.create({
            email,
            password: hashedPassword,
            nickname,
        });

        let createdUser = {};

        if (createUser.affectedRows > 0) {
            createdUser = {
                email,
                password,
                nickname,
                successMessage: '회원가입에 성공하였습니다.',
                errorMessage: null,
            };
        } else {
            createdUser = {
                email,
                password,
                nickname,
                successMessage: null,
                errorMessage: '회원가입에 실패하였습니다. 입력값을 확인해주세요.',
            };
        }

        return createdUser;
    }

    // ID로 유저 검색
    static async getUserInfo({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw errors.UserNotFoundId;
        }

        const selectedUser = {
            id: user.id,
            email: user.email,
            password: user.password,
            userImage: user.userImage,
            successMessage: '유저 정보 검색에 성공하셨습니다.',
            errorMessage: null,
        };

        return selectedUser;
    }

    // 유저 정보 수정(별명, 설명)
    static async setUserInfo({ userId, toUpdate }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw errors.UserNotFoundId;
        }

        let updateUser = {};

        // toUpdate -> nickName, description
        for (const [fieldToUpdate, newValue] of Object.entries(toUpdate)) {
            updateUser = await User.update({ userId, fieldToUpdate, newValue });
        }

        let updatedUser = {};
        if (updateUser.changedRows > 0) {
            updatedUser = {
                nickname: fieldToUpdate,
                description: newValue,
                successMessage: '유저 정보 수정에 성공하였습니다.',
                errorMessage: null,
            };
        } else {
            updatedUser = {
                nickname: fieldToUpdate,
                description: newValue,
                successMessage: null,
                errorMessage: '유저 정보 수정에 실패하였습니다. 입력값을 확인해주세요.',
            };
        }

        return updatedUser;
    }

    // 유저 정보 삭제
    static async delUserInfo({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw errors.UserNotFoundId;
        }

        const deleteUser = await User.delete({ userId });

        let deletedUser = {};
        if (deleteUser.affectedRows > 0) {
            deletedUser = {
                userId,
                successMessage: '유저 정보 삭제에 성공하였습니다.',
                errorMessage: null,
            };
        } else {
            deletedUser = {
                userId,
                successMessage: null,
                errorMessage: '유저 정보 삭제에 실패하였습니다. 입력값을 확인해주세요.',
            };
        }

        return deletedUser;
    }

    // 유저의 현재 포인트, 누적 포인트 불러오기
    static async getUserPoint({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw errors.InvalidToken;
        }

        const getUserPoint = await User.getPoint({ userId });

        const userPoint = {
            id: getUserPoint.userId,
            currentPoint: getUserPoint.currentPoint,
            accuPoint: getUserPoint.accuPoint,
            successMessage: '유저의 포인트 현황 불러오기를 성공하셨습니다.',
            errorMessage: null,
        };

        return userPoint;
    }

    // 전체 유저 수 불러오기
    static async getUserCount({ userId }) {
        const user = await User.findById({ userId });

        if (!user) {
            throw errors.InvalidToken;
        }

        const getUserCount = await User.getCount();

        const userPoint = {
            userCount: getUserCount.userCount,
            successMessage: '전체 유저 수 불러오기를 성공하셨습니다.',
            errorMessage: null,
        };

        return userPoint;
    }
}

export { userAuthService };
