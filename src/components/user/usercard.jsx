import React from 'react';

const UserCard = ({ user, point }) => {
    console.log(user);
    // const [userInfo, setUserInfo] = useState('');

    // const fetchUser = async userId => {
    //     try {
    //         const userInfo = await Api.get(`user/${userId.userId}`);
    //         setUserInfo(userInfo.data.userInfo);
    //     } catch (err) {
    //         if (err.response.status === 400) {
    //             alert(err.response.data.error);
    //         }
    //         console.log('DB 불러오기를 실패하였습니다.', err);
    //     }
    // };

    // const getImageSrc = () => {
    //     if (userInfo.userImage.startsWith('http')) {
    //         return userInfo.userImage;
    //     } else {
    //         userInfo.userImage = `https://7team-bucket.s3.ap-northeast-2.amazonaws.com/${userInfo.userImage}`;
    //         return userInfo.userImage;
    //     }
    // };

    // console.log(userInfo.userImage);

    return (
        <div>
            {/* // className="flex items-center justify-center p-4 m-2 bg-white shadow-2xl rounded-xl"
            // style={{ width: '60vh', height: '60vh' }}>
            // <div className="flex flex-col justify-center items-center text-center">
            //     {' '}
            //     <img className="w-20 h-20 object-cover rounded-full mb-2" src={'test.com'} alt={user.id} />
            //     <h2 className="text-lg font-bold">{user.nickname}</h2>
            //     <p className="text-sm text-gray-500">{point}</p>
            // </div> */}
        </div>
    );
};

export default UserCard;
