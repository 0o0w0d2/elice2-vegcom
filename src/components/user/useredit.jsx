import React, { useEffect, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { UserCircleIcon } from '@heroicons/react/24/solid';

import { put as putApi, get as getApi } from '../../../api';

import { BUCKET_BASE_URL } from '../../utils/conts/bucket';

function UserEdit() {
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem('userId'));
    const [nickname, setNickname] = useState('');
    const [description, setDescription] = useState('');
    const [userImage, setUserImage] = useState('');

    const handleSubmit = async userId => {
        try {
            const formData = new FormData();
            formData.append('image', userImage);
            formData.append('nickname', nickname);
            formData.append('description', description);

            await putApi(`/user/${userId}`, formData);
            navigate(-1);
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }
    };

    const fetchUser = useCallback(
        async userId => {
            try {
                const res = await getApi(`user/${userId}`);
                const userData = res.data.userInfo;
                setDescription(userData.description);
                setNickname(userData.nickname);

                if (userData.userImage.startsWith('http')) {
                    setUserImage(userData.userImage);
                } else {
                    setUserImage(`${BUCKET_BASE_URL}${userData.userImage}`);
                }
            } catch (err) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert('라우팅 경로가 잘못되었습니다.');
                }
            }
        },
        [userId],
    );

    const handleImageUpload = e => {
        const input = e.target;

        if (input.files && input.files[0]) {
            const reader = new FileReader();
            reader.onload = e => {
                const preview = document.getElementById('preview');
                if (preview) {
                    preview.src = e.target.result;
                }
            };
            reader.readAsDataURL(input.files[0]);
        }
    };

    useEffect(() => {
        fetchUser(userId);
    }, []);

    return (
        <div className="userEditForm relative flex justify-center">
            <div>
                <h2 className="font-semibold">유저 정보 변경</h2>
                <div className="formSection flex flex-col mt-10" style={{ width: '40vw', minWidth: '350px' }}>
                    <label htmlFor="username" className="text-left block text-sm font-medium leading-6 text-gray-900">
                        닉네임
                    </label>
                    <div className="userNickname w-full mt-2">
                        <div className="w-full flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600">
                            <textarea
                                type="text"
                                className="w-60 block flex-1 border-0 bg-transparent py-1.5 pl-1 text-gray-900 placeholder:text-gray-400 sm:text-sm"
                                placeholder={nickname}
                                value={nickname}
                                onChange={e => setNickname(e.target.value)}></textarea>
                        </div>
                        {/* 글자수 제한 코드 추가하기 */}
                    </div>

                    <label htmlFor="userImage" className="text-left mt-7 block text-sm font-medium leading-6 text-gray-900">
                        프로필 사진
                    </label>
                    <div className="imageSection grid-cols-2">
                        <div className="mt-2 flex items-center gap-x-3">
                            {userImage && (
                                <div>
                                    <img className="h-12 w-12 text-gray-300" id="preview" src={userImage} alt="Preview" />
                                </div>
                            )}
                            {/* <UserCircleIcon className="h-12 w-12 text-gray-300" aria-hidden="true" /> */}
                            <input
                                onChange={e => {
                                    setUserImage(e.target.files[0]);
                                    handleImageUpload(e);
                                }}
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
                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm "></textarea>
                    </div>
                    <div className="buttonSection mt-5 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            type="button"
                            className="shadow-sm text-sm font-semibold leading-6 text-gray-900 mr-5">
                            취소
                        </button>
                        <button
                            onClick={() => handleSubmit(userId)}
                            type="submit"
                            className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            수정하기
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserEdit;
