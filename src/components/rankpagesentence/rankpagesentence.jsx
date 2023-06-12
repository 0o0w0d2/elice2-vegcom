import React from 'react';

const RankPageSentence = ({users, posts}) => {

  return (
    <div className="p-4 m-2">
      <p className="text-lg font-sans font-bold">
        총 
        <span className="text-2xl text-green-700">
          {users}
        </span>
        명의 사람들이 
        <span className="text-2xl text-green-700">
          {posts}
        </span>
        끼 채식을 했어요!
      </p>
    </div>
  );
};

export default RankPageSentence;
