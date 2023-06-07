import errors from '../../errors.js';

function errorMiddleware(error, req, res, next) {
    // 터미널에 노란색으로 출력됨.
    console.log('\x1b[33m%s\x1b[0m', error);

    const defaultError = errors.InvalidCredentials;
    const { statusCode, message } = errors[error.name] || defaultError;

    res.status(statusCode).send({ message });
}

export { errorMiddleware };
