import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { get as getApi } from '../../../api';
import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
import GetDays from '../functions/getdays';
import { chunkArray } from '../../utils/chunkArray';

function UserDetail() {
    // post/:postId 로 받아와서 구현
    const location = useLocation();
    const navigate = useNavigate();

    const userId = location.pathname.match(/\/mypage\/(\d+)/)[1];

    const [userInfo, setUserInfo] = useState([]);
    const [userImage, setUserImage] = useState('');
    const [postList, setPostList] = useState([]);

    const [isFetchOwnerCompleted, setIsFetchOwnerCompleted] = useState(false);

    const fetchUser = useCallback(async userId => {
        try {
            // 유저 id를 가지고 "/user/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
            const user = await getApi(`user/${userId}`);
            // 사용자 정보는 response의 data임.
            const userData = user.data.userInfo;
            // portfolioOwner을 해당 사용자 정보로 세팅함.
            setUserInfo(userData);

            const imageUrl = user.data.userInfo.userImage;
            if (imageUrl.startsWith('http')) {
                setUserImage(imageUrl);
            } else {
                setUserImage(`${BUCKET_BASE_URL}${imageUrl}`);
            }

            const postList = await getApi(`post/mypage/${userId}`);
            setPostList(postList.data.userPostList);
            setIsFetchOwnerCompleted(true);
        } catch (err) {
            // alert(err.response.data.error);
            console.log(err);
        }
    }, []);

    const getImageSrc = useCallback(
        imageUrl => {
            if (imageUrl.startsWith('http')) {
                return imageUrl;
            } else {
                return `${BUCKET_BASE_URL}${imageUrl}`;
            }
        },
        [userId],
    );

    const n = 3; // 한 행에 표시할 이미지 개수

    const imageRows = [];
    for (let i = 0; i < postList.length; i += n) {
        const rowItems = postList.slice(i, i + n);
        imageRows.push(rowItems);
    }

    useEffect(() => {
        fetchUser(userId);
    }, [fetchUser]);

    if (!isFetchOwnerCompleted) {
        return 'loading...';
    }

    return (
        <>
            <div
                className="flex items-center justify-center p-4 m-2 bg-white shadow-lg rounded-xl"
                style={{ width: '60vh', height: '20vh' }}>
                <div className="flex flex-row justify-center items-center text-center">
                    {userImage ? (
                        <img className="w-20 h-20 object-cover rounded-full mb-2 mr-5" src={userImage} alt={userInfo.id} />
                    ) : (
                        <img
                            src={'http://placekitten.com/200/200'}
                            alt=""
                            className="w-20 h-20 object-cover rounded-full mb-2 mr-5"
                        />
                    )}
                    <div>
                        <div>
                            {userInfo.nickname}님은 지금까지 {GetDays(userInfo.createAt)}일 동안 총 {userInfo.storyCount} 끼의
                            채식을 했어요!
                        </div>
                        <p className="text-sm text-gray-500">현재 누적 포인트: {userInfo.accuPoint}</p>
                        <p className="text-sm text-gray-500">
                            오늘 순위: {userInfo.TodayRanking}위 전체 누적 순위: {userInfo.AccuRanking}위
                        </p>
                    </div>
                </div>
            </div>
            <div>
                <div className="w-full bg-white shadow-lg rounded-xl mt-10 pt-5 pb-5 pl-5">
                    {chunkArray(postList, 3).map((row, rowIndex) => (
                        <div key={rowIndex} className="flex justify-left">
                            {row.map((item, index) => (
                                <div key={index} className="flex items-center mx-2">
                                    <img
                                        className="object-cover mb-2"
                                        style={{ width: '18vh', height: '18vh' }}
                                        src={getImageSrc(item.imageUrl)}
                                        alt={item.id}
                                        onClick={() => navigate(`/post/${item.id}`)}
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default UserDetail;
