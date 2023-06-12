import React, { Fragment, useContext, useState, useEffect, useCallback } from 'react';
import { UserStateContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import * as Api from '../../../api';
// import { comment } from 'postcss';
// import { formatPostcssSourceMap } from 'vite';

function PostCard({ post }) {
    const userState = useContext(UserStateContext);
    const [comments, setComments] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const userId = userState.user.userId;
    const [disabled, setDisabled] = useState(false);
    const isEditable = userId === post.userId;
    console.log(isEditable);

    const handleClick = useCallback(
        post => {
            navigate(`/post/${post.postId}`);
        },
        [post],
    );

    const getImageSrc = imageUrl => {
        if (imageUrl.startsWith('http')) {
            return imageUrl;
        } else {
            imageUrl = `https://7team-bucket.s3.ap-northeast-2.amazonaws.com/${imageUrl}`;
            return imageUrl;
        }
    };
    //likecount, likeuser
    const fetchLikes = useCallback(
        async post => {
            try {
                const res = await Api.get(`like/${post.postId}`);
                // console.log('like: ', res.data);
                const likesData = res.data;
                setLikeCount(likesData.likecount);
                setLiked(likesData.likeuser);
            } catch (err) {
                alert(err.rseponse.data.message);
                console.log('좋아요 불러오기를 실패했습니다.');
            }
        },
        [post],
    );

    const fetchComments = useCallback(
        async post => {
            try {
                const res = await Api.get(`/comment/${post.postId}`);
                const commentData = res.data.commentList;
                // console.log(commentData);
                setComments(commentData);
            } catch (err) {
                alert(err.response.data.message);
                console.log('댓글 불러오기를 실패했습니다');
            }
        },
        [post],
    );

    const handleLike = (postId, userId) => {
        try {
            if (disabled === true) {
                return;
            }
            setDisabled(true);
            if (liked === false) {
                Api.post(`/like/${postId}`, {
                    // 좋아요 누르는 버튼 구현하기
                    postId,
                    userId,
                });
                setLiked(true);
                setLikeCount(likeCount + 1);
            } else {
                Api.del(`/like/${postId}`);
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
        } catch (err) {
            alert(err.response.data.message);
            console.log(err.data.response.message);
        } finally {
            setDisabled(false);
        }
    };

    useEffect(() => {
        fetchLikes(post);
        fetchComments(post);
    }, [fetchLikes, fetchComments]);

    return (
        <div className="postCard rounded-lg mx-auto grid max-w-2xl grid-cols-1 border border-gray-300 pt-5 pl-5 pb-5 pr-5 mb-5">
            <article key={post.postId} className="flex max-w-xl flex-col justify-between">
                <div className="profileSection w-full relative flex items-center gap-x-4">
                    <img src={getImageSrc(post.userImage)} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div style={{ display: 'flex', alignItems: 'center', fontWeight: 'bold' }}>{post.nickname}</div>
                    {isEditable && (
                        <div className="flex flex-grow justify-end">
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <Menu.Button className="inline-flex w-full justify-center gap-x-1.5 bg-white px-3 py-2 text-sm font-semibold text-gray-900">
                                        <EllipsisVerticalIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </Menu.Button>
                                </div>

                                <Transition
                                    as={Fragment}
                                    enter="transition ease-out duration-100"
                                    enterFrom="transform opacity-0 scale-95"
                                    enterTo="transform opacity-100 scale-100"
                                    leave="transition ease-in duration-75"
                                    leaveFrom="transform opacity-100 scale-100"
                                    leaveTo="transform opacity-0 scale-95">
                                    <Menu.Items className="text-center absolute right-0 z-10 mt-2 w-36 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                        <div className="py-1">
                                            <div
                                                className="text-gray-700 block px-4 py-2 text-md"
                                                onClick={() => navigate('/rank')}>
                                                수정
                                            </div>
                                            <div
                                                className="text-gray-700 block px-4 py-2 text-md"
                                                onClick={() => navigate('/rank')}>
                                                삭제
                                            </div>
                                        </div>
                                    </Menu.Items>
                                </Transition>
                            </Menu>
                        </div>
                    )}
                </div>
                <div className="postSection w-full">
                    <img src={getImageSrc(post.imageUrl)} alt="Post Image" className="postImage w-full h-auto mt-5" />
                    <div className="flex mt-3">
                        {/* 눌렀을 때 좋아요 상태 변경하는 코드 추가하기 */}
                        {liked == true ? (
                            <SolidStarIcon
                                disabled={disabled}
                                onClick={() => handleLike(post.postId, userId)}
                                className="h-7 w-7"
                                fill="#008762"
                            />
                        ) : (
                            <StarIcon disabled={disabled} onClick={() => handleLike(post.postId, userId)} className="h-7 w-7" />
                        )}
                        <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" onClick={() => handleClick(post)} />
                    </div>
                    <div className="text-left mt-3">
                        <span style={{ fontWeight: 'bold' }}>{likeCount.toLocaleString()} 명</span>이 좋아합니다.
                    </div>
                    <div className="flex mt-2 text-md text-left">
                        <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{post.nickname}</span> {post.content}
                    </div>
                </div>
                <div className="commentSection mt-1">
                    {comments.slice(0, 3)?.map(item => (
                        <div className="flex w-full" key={item.id}>
                            <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{item.nickname}</span> {item.content}
                            {(userId === item.userId || isEditable) && (
                                <div className="flex flex-grow justify-end items-center">
                                    <PencilSquareIcon className="w-5 h-5" />
                                    <TrashIcon className="w-5 h-5" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </article>
        </div>
    );
}

export default PostCard;
