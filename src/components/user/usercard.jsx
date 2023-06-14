import React, { useContext, useCallback } from 'react';
import { UserStateContext } from '../../../App';
import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
import GetDays from '../functions/getdays';

const UserCard = ({ user, point }) => {
    const getImageSrc = useCallback(() => {
        if (user.userImage.startsWith('http')) {
            return user.userImage;
        } else {
            return `${BUCKET_BASE_URL}${user.userImage}`;
        }
    }, []);

    return (
        <>
            <div
                className="flex items-center justify-center p-4 m-2 bg-white shadow-lg rounded-xl"
                style={{ width: '60vh', height: '20vh' }}>
                <div className="flex flex-row justify-center items-center text-center">
                    <img className="w-20 h-20 object-cover rounded-full mb-2 mr-5" src={getImageSrc()} alt={user.id} />
                    <div>
                        <div>
                            {user.nickname}님은 지금까지 {GetDays(user.createAt)}일 동안 총 {user.storyCount} 끼의 채식을 했어요!
                        </div>
                        <p className="text-sm text-gray-500">현재 누적 포인트: {point}</p>
                        <p className="text-sm text-gray-500">
                            오늘 순위: {user.TodayRanking}위 전체 누적 순위: {user.AccuRanking}위
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
