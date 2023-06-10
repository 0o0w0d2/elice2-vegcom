import React from 'react';

const RankPageSentence = () => {

  const usersPostData = {users : 100, post : 124};

  return (
    <div className="p-4 m-2">
      <p className="text-lg font-sans font-bold">
        총 
        <span className="text-2xl text-green-700">
          {usersPostData.users}
        </span>
        명의 사람들이 
        <span className="text-2xl text-green-700">
          {usersPostData.post}
        </span>
        끼 채식을 했어요!
      </p>
    </div>
  );
};

export default RankPageSentence;
