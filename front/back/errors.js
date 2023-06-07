const createError = (name, message = '', statusCode = 400) => ({
    name,
    message,
    statusCode,
});

const errors = {
    // 잘못된 인증 정보 (올바르지 않은 이메일 또는 비밀번호)로 인한 오류
    InvalidCredentials: createError(
        'InvalidCredentials',
        '이메일 또는 비밀번호가 일치하지 않습니다. 다시 한 번 확인해 주세요.',
        401,
    ),
    // 해당 이메일로 가입된 사용자가 없는 경우의 오류
    UserNotFoundEmail: createError('UserNotFoundEmail', '해당 이메일은 가입 내역이 없습니다. 다시 한 번 확인해 주세요.', 404),
    // 이미 사용 중인 이메일로 회원가입을 시도한 경우의 오류
    EmailAlreadyExists: createError('EmailAlreadyExists', '이 이메일은 현재 사용중입니다. 다른 이메일을 입력해 주세요.', 409),
    // 요청한 사용자의 정보를 찾을 수 없는 경우의 오류
    UserNotFoundId: createError('UserNotFoundId', '요청한 사용자의 정보를 찾을 수 없습니다.', 404),
    // 잘못된 또는 만료된 토큰을 사용하여 사용자 검증 요청을 받은 경우의 오류
    InvalidToken: createError('InvalidToken', '잘못된 또는 만료된 토큰입니다.', 401),
    // 로그인하지 않은 사용자가 요청하는 경우
    NotAuthenticatedError: createError('NotAuthenticatedError', '로그인한 유저만 사용할 수 있는 서비스입니다.', 401),
    // 서버 오류가 나타나는 경우
    ServerError: createError('ServerError', '서버 오류가 발생했습니다. 다시 시도해주세요.', 500),

    // 로그인 실패
    LoginFailedError: createError('LoginFailedError', '로그인에 실패하셨습니다.', 401),
    // 회원가입 실패
    RegistrationFailedError: createError('RegistrationFailedError', '회원가입에 실패했습니다.', 400),
    // 포인트 불러오기 실패
    PointLoadFailedError: createError('PointLoadFailedError', '포인트 불러오기에 실패했습니다.', 500),
    // 전체 유저 수 불러오기 실패
    UserCountLoadFailedError: createError('UserCountLoadFailedError', '총 수 불러오기에 실패했습니다.', 500),
    // 전체 유저 수 불러오기 실패
    UserLoadFailedError: createError('UserLoadFailedError', '유저 정보 불러오기에 실패했습니다.', 500),
    // 전체 유저 수 불러오기 실패
    UserUpdateFailedError: createError('UserUpdateFailedError', '유저 정보 수정하기에 실패했습니다.', 500),
    // 전체 유저 수 불러오기 실패
    UserDeleteFailedError: createError('UserDeleteFailedError', '유저 정보 삭제하기에 실패했습니다.', 500),
};

export default errors;
