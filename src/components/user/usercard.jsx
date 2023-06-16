import React, { useCallback } from 'react';
import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
import GetDays from '../../utils/getdays';
import TierDecision from '../../utils/tierdecision';

const UserCard = ({ user, point }) => {
    const getImageSrc = useCallback(() => {
        if (user.userImage.startsWith('http')) {
            return user.userImage;
        } else {
            return `${BUCKET_BASE_URL}${user.userImage}`;
        }
    }, [user]);

    console.log(TierDecision(point)[2])
    return (
        <>
            <div
                className="flex items-center justify-center p-4 m-2 bg-white shadow-lg rounded-xl"
                style={{ width: '60vh', height: '20vh' }}>
                 <div className="flex flex-row justify-center items-center text-center">
                    <img className="w-20 h-20object-cover rounded-full mb-2 mr-5" src={getImageSrc()} alt={user.id} />
                    <div>
                        <div>
                            <span style={{ fontWeight: 'bold' }}> {user.nickname}</span> 님은 지금까지{' '}
                            <span style={{ color: '#008762', fontWeight: 'bold' }}>{GetDays(user.createAt)}</span>일 동안 총{' '}
                            <span style={{ fontWeight: 'bold', color: '#008762' }}>{user.storyCount} </span>끼 채식을 했어요!
                        </div>
                        <p className="text-sm">현재 누적 포인트: {point}</p>
                        <p className="text-sm flex items-center">
                            오늘 순위: {user.TodayRanking}위 전체 누적 순위: {user.AccuRanking}위 등급 :
                            <img className='w-5 h-5 ml-2' src={TierDecision(point)[2]} alt={TierDecision(point)[0]} />
                            {TierDecision(point)[1]}
                        </p>

                        
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
