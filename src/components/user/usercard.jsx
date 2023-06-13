import React from 'react';
import GetDays from '../functions/getdays';

const UserCard = ({ user, point }) => {
    const getImageSrc = () => {
        if (user.userImage.startsWith('http')) {
            return user.userImage;
        } else {
            return `https://7team-bucket.s3.ap-northeast-2.amazonaws.com/${user.userImage}`;
        }
    };

    // console.log(GetDays(user.createAt));

    return (
        <>
            {/* <div
                className="userCard flex p-4 m-2 bg-white shadow-2xl rounded-xl"
                style={{ width: '60vh', height: '30vh', minWidth: '600px', minHeight: '300px' }}>
                <div className="m-3 contentSection flex text-center">
                    <div className="userImage w-20 h-20 rounded-full overflow-hidden">
                        <img
                            className="w-full h-full object-cover"
                            src={getImageSrc()}
                            style={{ objectFit: 'cover' }}
                            alt={user.id}
                        />
                    </div>
                    <div className="m-3 pointSection w-full">
                        <h2 className="text-lg font-bold">{user.nickname}</h2>
                        <p className="text-sm text-gray-500">{point}</p>
                    </div>
                </div>
            </div> */}

            <div
                className="flex items-center justify-center p-4 m-2 bg-white shadow-lg rounded-xl"
                style={{ width: '60vh', height: '30vh' }}>
                <div className="flex flex-col justify-center items-center text-center">
                    {' '}
                    <img className="w-20 h-20 object-cover rounded-full mb-2" src={getImageSrc()} alt={user.id} />
                    <h2 className="text-lg font-bold">{user.nickname}</h2>
                    <p className="text-sm text-gray-500">현재 누적 포인트: {point}</p>
                    <div>
                        {user.nickname}님은 지금까지 {GetDays(user.createAt)}일 동안 총{user.storyCount} 끼의 채식을 했어요!
                    </div>
                </div>
            </div>
        </>
    );
};

export default UserCard;
