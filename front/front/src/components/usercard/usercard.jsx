import React from 'react';

const UserCard = ({ user }) => {
  return (
    <div className="flex items-center justify-center p-4 m-2 bg-white shadow-2xl rounded-xl" style = {{ width:  '60vh' }}>
      <div className="flex flex-col justify-center items-center text-center">
        <img className="w-20 h-20 object-cover rounded-full mb-2" src={user.userImage} alt={user.id}/>
        <h2 className="text-lg font-bold">{user.nickname}</h2>
        <p className="text-sm text-gray-500">{user.accuPoint}</p>
      </div>
    </div>
  );
};

export default UserCard;
