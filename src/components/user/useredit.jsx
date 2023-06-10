import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStateContext, DispatchContext } from '../../../App';
import { UserCircleIcon } from '@heroicons/react/24/solid';
import * as Api from '../../../api';

function UserEdit() {
    const userState = useContext(UserStateContext);
    const navigate = useNavigate();
    const userId = userState.user.userId;
    const [nickname, setNickname] = useState(userState.user.nickname);
    const [userImage, setUserImage] = useState(userState.user.imageUrl);

    const [description, setDescription] = useState('');

    const handleSubmit = async userId => {
        try {
            const formData = new FormData();
            formData.append('image', userImage);
            formData.append('nickname', nickname);
            formData.append('description', description);

            const res = await Api.put(`/user/${userId}`, formData);
            navigate(-1);

            navigate(-1);
        } catch (err) {
            console.log(err);
            // alert(err.response.data.message);
            console.log('DB 수정 요청을 실패했습니다.'); // 이거는 나중에 err안에 있는 message로 바꿔주세요. alert도 띄우고 콘솔도 띄우고
        }
    };
    return (
        <div className="userEditForm">
            <h2 className="font-semibold">유저 정보 변경</h2>
            <div className="formSection flex flex-col mt-10" style={{ width: '40vw', minWidth: '350px' }}>
                <label htmlFor="username" className="text-left block text-sm font-medium leading-6 text-gray-900">
                    닉네임
                </label>
                <div className="userNickname w-full mt-2">
                    <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                        <input
                            type="text"
                            className="w-60 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm"
                            placeholder={nickname}
                            value={nickname}
                            onChange={e => setNickname(e.target.value)}
                        />
                    </div>
                    {/* 글자수 제한 코드 추가하기 */}
                </div>

                <label htmlFor="userImage" className="text-left mt-7 block text-sm font-medium leading-6 text-gray-900">
                    프로필 사진
                </label>
                <div className="imageSection grid-cols-2">
                    <div className="mt-2 flex items-center gap-x-3">
                        <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" />
                        <input
                            onChange={e => setUserImage(e.target.files[0])}
                            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                            type="file"
                            multiple></input>
                    </div>
                </div>
                <label htmlFor="about" className="text-left mt-7 block text-sm font-medium text-gray-900">
                    자기소개
                </label>
                <div className="w-full mt-2">
                    <textarea
                        autoComplete={description}
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
                    />
                </div>
                <div className="buttonSection mt-5 justify-center">
                    <button onClick={goBack} type="button" className=" shadow-sm text-sm font-semibold leading-6 text-gray-900">
                        취소
                    </button>
                    <button
                        onClick={() => handleSubmit(userId)}
                        type="submit"
                        className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        올리기
                    </button>
                </div>
            </div>
        </div>
    );
}

export default UserEdit;
