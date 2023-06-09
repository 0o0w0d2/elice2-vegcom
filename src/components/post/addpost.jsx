import React, { useState, useContext, useEffect } from 'react';
import { UserStateContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import * as Api from '../../../api';

function AddPost({ post, postImage, userImage, postLike, postLikeCount, comment, like, isEditable }) {
    const userState = useContext(UserStateContext);
    const [imageUrl, setImageUrl] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async e => {
        const formData = new FormData();
        console.log('formData 전송 전:', formData);
        formData.append('ImageUrl', userImage);
        formData.append('content', content);
        await Api.post('/post', formData);

        console.log('formData 전송 후:', formData);
    };

    const handleFileChange = e => {
        const file = e.target.files[0];
        setImageUrl(file);
    };

    const navigate = useNavigate();

    // useEffect(() => {
    //     if (!userState.user) {
    //         navigate('/');
    //     }
    // }, []);

    // useEffect(() => {
    //     if (!userState.user) {
    //         navigate('/login');
    //         alert('로그인한 유저만 사용할 수 있습니다.');
    //         return;
    //     }
    // }, [userState, navigate]);

    return (
        <>
            <div>
                <h2 className="h-auto mb-3 text-bold">식단 기록하기</h2>
            </div>
            <h2 className="text-left">파일 선택</h2>
            <div className="flex items-center justify-center w-full">
                <label
                    htmlFor="dropzone-file"
                    className="flex flex-col items-center justify-center w-full h-50 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <svg
                            aria-hidden="true"
                            className="w-10 h-10 mb-3 text-gray-400"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg">
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                            <span className="font-semibold">사진 파일을 선택해 주세요.</span> drag&drop으로도 올릴 수 있습니다.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                    </div>
                    <input id="dropzone-file" type="file" onChange={e => setImageUrl(e.target.files[0])} className="hidden" />
                    {!!imageUrl && <p>업데이트 완료!</p>}
                </label>
            </div>
            <input
                type="text"
                name="postContent"
                id="postContent"
                value={content}
                onChange={e => setContent(e.target.value)}
                className="block w-full rounded-md border-0 mt-3 py-1.5 pl-3 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="설명을 입력해 주세요."
            />
            <div className="buttonSection flex mt-5" style={{ justifyContent: 'flex-end' }}>
                <button
                    onClick={() => navigate('/story')}
                    type="button"
                    className="text-sm font-semibold leading-6 text-gray-900">
                    취소
                </button>
                <button
                    onClick={() => handleSubmit(post)}
                    type="submit"
                    className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                    올리기
                </button>
            </div>
        </>
    );
}

export default AddPost;
