import React, { Fragment, useMemo, useState, useEffect, useCallback } from 'react';
import { UserStateContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { get as getApi, post as postApi, del as delApi } from '../../../api';
import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
// import { comment } from 'postcss';
// import { formatPostcssSourceMap } from 'vite';

function PostCard({ post }) {
    const [commentsZero, setCommentsZero] = useState([]);
    const [commentsOther, setCommentsOther] = useState([]);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const navigate = useNavigate();
    const userId = Number(localStorage.getItem('userId'));
    const [disabled, setDisabled] = useState(false);
    // console.log(post);

    const isEditable = useMemo(() => userId === post.userId, [userId, post.userId]);

    const handleClick = useCallback(
        post => {
            navigate(`/post/${post.postId}`);
        },
        [post],
    );

    const handlePostDelete = async postId => {
        await delApi(`/post/${postId}`);
        window.location.replace('/story');
    };

    const handleCommentDelete = async commentId => {
        await delApi(`/comment/${commentId}`);
        window.location.replace('/story');
    };

    const getImageSrc = imageUrl => {
        if (imageUrl.startsWith('http')) {
            return imageUrl;
        } else {
            imageUrl = `${BUCKET_BASE_URL}${imageUrl}`;
            return imageUrl;
        }
    };
    //likecount, likeuser
    const fetchLikes = useCallback(
        async post => {
            try {
                const res = await getApi(`like/${post.postId}`);
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
                const res = await getApi(`/comment?postId=${post.postId}&cursor=0`);
                const commentDataZero = res.data.commentListZero;
                const commentDataOther = res.data.commentListOther;

                setCommentsZero(commentDataZero);
                setCommentsOther(commentDataOther);
            } catch (err) {
                alert(err.message);
                console.log('댓글 불러오기를 실패했습니다');
            }
        },
        [post],
    );

    const handleLike = async (postId, userId) => {
        try {
            if (disabled === true) {
                return;
            }
            setDisabled(true);

            if (liked === false) {
                await postApi(`/like/${postId}`, {
                    postId,
                    userId,
                });
                setLiked(true);
                setLikeCount(prev => likeCount + 1);
            } else {
                setLiked(false);
                setLikeCount(prev => likeCount - 1);
                await delApi(`/like/${postId}`);
            }

            console.log('like 누르기 이후', !liked);
        } catch (err) {
            alert(err.message);
            console.log(err.message);
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
            <article key={post.postId} className="flex max-w-xl flex-col justify-between text-bold">
                <div className="profileSection relative flex w-full items-center gap-x-4">
                    {post.userImage ? (
                        <img src={getImageSrc(post.userImage)} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    ) : (
                        <img src={'http://placekitten.com/200/200'} alt="" className="h-10 w-10 rounded-full bg-gray-50" />
                    )}
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
                                                onClick={() => {
                                                    if (post.userId !== userId) {
                                                        alert('접근할 수 없는 페이지입니다.');
                                                    } else {
                                                        navigate(`/postedit/${post.postId}`);
                                                    }
                                                }}>
                                                수정
                                            </div>
                                            <div
                                                className="text-gray-700 block px-4 py-2 text-md"
                                                onClick={() => {
                                                    if (window.confirm('정말로 삭제하시겠습니까?')) {
                                                        handlePostDelete(post.postId);
                                                    }
                                                }}>
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
                        {/* <StarIcon className="h-7 w-7" onClick={() => handleLike(post)} /> */}
                        {liked == true ? (
                            <SolidHeartIcon
                                disabled={disabled}
                                onClick={() => handleLike(post.postId, userId)}
                                className="h-7 w-7"
                                fill="#ff3040"
                            />
                        ) : (
                            <HeartIcon disabled={disabled} onClick={() => handleLike(post.postId, userId)} className="h-7 w-7" />
                        )}
                        <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" onClick={() => handleClick(post)} />
                    </div>
                    <div className="text-left mt-3">
                        <span style={{ fontWeight: 'bold' }}>{likeCount.toLocaleString()} 명</span>이 좋아합니다.
                    </div>

                    <div className="mt-2 text-md text-left">
                        <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{post.nickname}</span>
                        <span>{post.content}</span>
                    </div>
                </div>
                <div className="commentSection mt-1">
                    {commentsZero?.slice(0, 3).map(item => (
                        <div className="flex w-full" key={item.id}>
                            <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{item.nickname}</span> {item.content}
                            <div className="flex flex-grow justify-end items-center">
                                {(isEditable || userId === item.userId) && (
                                    <TrashIcon
                                        className="w-5 h-5"
                                        onClick={() => {
                                            if (window.confirm('정말로 삭제하시겠습니까?')) {
                                                handleCommentDelete(item.id);
                                            }
                                        }}
                                    />
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </article>
        </div>
    );
}

export default PostCard;
