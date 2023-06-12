import React, { useContext } from 'react';
import { UserStateContext } from '../../../App';

const UserCard = ({ point }) => {
    const {
        user: { userImage = 'test.com', nickname = '', id = '' },
    } = useContext(UserStateContext);

    const getImageSrc = () => {
        if (userImage.startsWith('http')) {
            return userImage;
        } else {
            return `https://7team-bucket.s3.ap-northeast-2.amazonaws.com/${userImage}`;
        }
    };

    return (
        <div
            className="flex items-center justify-center p-4 m-2 bg-white shadow-2xl rounded-xl"
            style={{ width: '60vh', height: '60vh' }}>
            <div className="flex flex-col justify-center items-center text-center">
                {' '}
                <img className="w-20 h-20 object-cover rounded-full mb-2" src={getImageSrc()} alt={id} />
                <h2 className="text-lg font-bold">{nickname}</h2>
                <p className="text-sm text-gray-500">{point}</p>
            </div>
        </div>
    );
};

export default UserCard;
