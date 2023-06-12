import React, { useContext, useCallback } from 'react';
import { UserStateContext } from '../../../App';
import { BUCKET_BASE_URL } from '../../utils/conts/bucket';

const UserCard = ({ point }) => {
    const {
        user: { userImage = 'http://placekitten.com/200/200', nickname = '', id = '' },
    } = useContext(UserStateContext);

    const getImageSrc = useCallback(() => {
        if (userImage.startsWith('http')) {
            return userImage;
        } else {
            return `${BUCKET_BASE_URL}${userImage}`;
        }
    }, [userImage]);

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
