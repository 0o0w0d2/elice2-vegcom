import React from 'react';

import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
import TierDecision from '../../utils/tierdecision';

const RankCard = ({ user, index }) => {
    const getImageSrc = () => {
        if (user.userImage.startsWith('http')) {
            user.userImage = user.userImage;
            return user.userImage;
        } else {
            user.userImage = `${BUCKET_BASE_URL}${user.userImage}`;
            return user.userImage;
        }
    };
    return (
        <div className="flex p-4 m-2 bg-white shadow-lg rounded-xl" style={{ width: '60vh', height: '20vh' }}>
            <div className="flex flex-row justify-between items-center text-center">
                <p style={{ color: '#008762' }} className="ml-5 mr-5 text-xl font-bold">
                    {index}
                </p>
                <img className="mr-5 w-20 h-20 object-cover rounded-full" src={getImageSrc()} alt={user.id} />
                <div className="w-full">
                    <div className="text-left ">
                        <p style={{ fontFamily: 'SUITE-Regular' }} className="text-lg font-bold">
                            {user.nickname}
                        </p>
                        <p className="text-sm">누적 포인트: {user.accuPoint}</p>
                        <p className="text-sm">총 게시물 수: {user.storyCount}</p>
                        <p className="text-sm flex items-center">
                            등급 :
                            <img
                                className="w-5 h-5 ml-2"
                                src={TierDecision(user.accuPoint)[2]}
                                alt={TierDecision(user.accuPoint)[0]}
                            />
                            {TierDecision(user.accuPoint)[1]}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RankCard;
