import errors from '../../errors.js';

import passport from 'passport';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';

const jwtOptions = {
    // JWT 토큰의 비밀 키 설정
    secretOrKey: process.env.JWT_SECRET_KEY || 'jwt-secret-key',
    // 토큰 추출 방식 설정
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

passport.use(
    new JwtStrategy(jwtOptions, (jwtPayload, done) => {
        // JWT 토큰으로부터 추출한 userId를 검증하고, 검증 결과를 done 콜백 함수를 통해 전달
        const userId = jwtPayload.userId;
        if (userId) {
            return done(null, userId);
        } else {
            return done(null, false);
        }
    }),
);

function login_required(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, userId) => {
        if (err) {
            throw errors.ServerError;
        }

        if (!userId) {
            throw errors.NotAuthenticatedError;
        }

        req.currentUserId = userId;
        next();
    })(req, res, next);
}

export { login_required };
