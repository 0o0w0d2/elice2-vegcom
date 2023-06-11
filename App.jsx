import React, { useState, useEffect, useReducer, createContext } from 'react';
import { useNavigate, BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

import * as Api from './api';
import { loginReducer } from './reducer';

import Header from './src/sections/header';
// import Footer from './src/sections/footer';

import LoginForm from './src/pages/login/loginform.jsx';
import RegisterForm from './src/pages/register/registerform';
import MainPage from './src/pages/mainpage/mainpage.jsx';
import Rank from './src/pages/rank/rank';
import Story from './src/pages/story/story';
import AddPost from './src/components/post/addpost';
import PostDetail from './src/components/post/postdetail';
import UserEdit from './src/components/user/useredit';
import NotFound from './src/pages/notfound';

export const UserStateContext = createContext(null);
export const DispatchContext = createContext(null);

function App() {
    const navigate = useNavigate();
    const location = useLocation();
    // useReducer 훅을 통해 userState 상태와 dispatch함수를 생성함.
    const [userState, dispatch] = useReducer(loginReducer, {
        user: null,
    });

    // 아래의 fetchCurrentUser 함수가 실행된 다음에 컴포넌트가 구현되도록 함.
    // 아래 코드를 보면 isFetchCompleted 가 true여야 컴포넌트가 구현됨.
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);

    const fetchCurrentUser = async () => {
        try {
            // 이전에 발급받은 토큰이 있다면, 이를 가지고 유저 정보를 받아옴.
            const res = await Api.get('user/isLogin');
            const currentUser = res.data;

            // dispatch 함수를 통해 로그인 성공 상태로 만듦.
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: currentUser,
            });

            console.log('%c sessionStorage에 토큰 있음.', 'color: #d93d1a;');
        } catch (err) {
            console.log('%c sessionStorage에 토큰 없음.', 'color: #d93d1a;');
        }
        // fetchCurrentUser 과정이 끝났으므로, isFetchCompleted 상태를 true로 바꿔줌
        setIsFetchCompleted(true);
    };

    // useEffect함수를 통해 fetchCurrentUser 함수를 실행함.
    useEffect(() => {
        fetchCurrentUser();
    }, []);

    if (!isFetchCompleted) {
        return 'loading...';
    }

    const isLogin = !!userState.user;
    console.log('login status', isLogin);

    // useEffect(() => {
    //     const path = location.pathname;
    //     console.log(path);
    //     if (isLogin && (path === '/login' || path === 'register')) {
    //         navigate('/rank');
    //     }
    //     if (!isLogin && path != '/login' && path != '/register' && path != '/') {
    //         navigate('/login');
    //         alert('로그인한 유저만 접근할 수 있습니다.');
    //     }
    // }, [isLogin, location.pathname, navigate]);

    return (
        <DispatchContext.Provider value={dispatch}>
            <UserStateContext.Provider value={userState}>
                {isLogin && (
                    <>
                        <Header />
                    </>
                )}
                {/* <MainPage /> */}
                <Routes>
                    <Route path="/" exact element={<MainPage />} />
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                    <Route path="/rank" element={<Rank />} />
                    <Route path="/story" element={<Story />} />
                    <Route path="/addpost" element={<AddPost />} />
                    <Route path="/useredit" element={<UserEdit />} />
                    <Route path="/post/:postId" element={<PostDetail />} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                {/* <Footer /> */}
            </UserStateContext.Provider>
        </DispatchContext.Provider>
    );
}

export default App;
