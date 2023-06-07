import React from 'react';

const UserCard = ({ user, index }) => {
  return (
    <div className="flex items-center justify-center p-4 m-2 bg-white shadow-2xl rounded-xl" style = {{ width:  '60vh' }}>
      <div className="flex flex-row justify-center items-center space-x-4 text-left">
        <p className="text-lg font-bold">{index}</p>
        <p className="text-lg font-bold">{user.nickname}</p>
        <img className="w-20 h-20 object-cover rounded-full" src={user.userImage} alt={user.id}/>
        <div className="space-y-2">
          <p className="text-sm text-gray-500">{user.accuPoint}</p>
          <p className="text-sm text-gray-500">{user.storyCount}</p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;




