import React, { useEffect, useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStateContext, DispatchContext } from '../../../App';
import { UserCircleIcon } from '@heroicons/react/24/solid';
function UserEdit() {
    const userState = useContext(UserStateContext);
    const navigate = useNavigate();

    const user = userState.user;
    console.log('user:', user);
    //유저 이미지userImage, 자기소개description
    // userState.user
    // {id, description, userImage, nickname}

    // let des = user.description ?? null;
    // const [description, setDescription] = useState(des);
    const [nickname, setNickname] = useState(user.nickname);
    const [userImage, setUserImage] = useState('');

    const goBack = () => {
        navigate(-1);
    };

    const handleSubmit = async e => {
        try {
            const formData = new FormData();
            formData.append('userImage', userImage);
            formData.append('nickname', nickname);
            // formData.append('description', description);

            const res = await Api.put(`/user/${user.id}`);
            console.log(res);
        } catch (err) {
            alert(err.response.data.message);
            console.log('DB 불러오기를 실패했습니다.');
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
                            name="username"
                            id="username"
                            autoComplete="username"
                            className="w-60 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm"
                            placeholder="janesmith"
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
                        <button
                            type="button"
                            className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                            파일 선택
                        </button>
                    </div>
                </div>
                <label htmlFor="about" className="text-left mt-7 block text-sm font-medium text-gray-900">
                    자기소개
                </label>
                <div className="w-full mt-2">
                    <textarea
                        id="about"
                        name="about"
                        rows={3}
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "
                        defaultValue={''}
                    />
                </div>
                <div className="buttonSection mt-5 justify-center">
                    <button onClick={goBack} type="button" className=" shadow-sm text-sm font-semibold leading-6 text-gray-900">
                        취소
                    </button>
                    <button
                        onClick={() => handleSubmit()}
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
