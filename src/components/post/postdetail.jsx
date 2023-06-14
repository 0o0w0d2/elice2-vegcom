import React, { Fragment, useMemo, useState, useEffect, useCallback } from 'react';
import { UserStateContext } from '../../../App';
import { useLocation } from 'react-router-dom';
import { ChatBubbleBottomCenterTextIcon as CommentIcon, ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { HeartIcon as SolidHeartIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { HeartIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { get as getApi, post as postApi, del as delApi, put as putApi } from '../../../api';
import { BUCKET_BASE_URL } from '../../utils/conts/bucket';
import GetTime from '../../utils/gettime';
import { comment } from 'postcss';

function PostDetail() {
    // post/:postId 로 받아와서 구현
    const location = useLocation();
    const [post, setPost] = useState([]);
    const userId = Number(localStorage.getItem('userId'));
    const postId = location.pathname.match(/\/post\/(\d+)/)[1];
    const [content, setContent] = useState('');
    const [reContent, setReContent] = useState('');
    const [isReplying, setIsReplying] = useState(false);
    const [parentId, setParentId] = useState(0);
    const [commentsZero, setCommentsZero] = useState([]);
    const [commentsOther, setCommentsOther] = useState([]);
    const [postImage, setPostImage] = useState('');
    const [userImage, setUserImage] = useState('');
    const [isSave, setIsSave] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const path = location.pathname;
    const [isLoading, setIsLoading] = useState(false);
    const [isReached, setIsReached] = useState(false);
    const [nextCursor, setNextCursor] = useState(0);
    const [isEditing, setIsEditing] = useState(false);
    const [isReEditing, setIsReEditing] = useState(false);

    const handleSubmit = async commentId => {
        if (!isEditing) {
            await postApi('/comment', {
                parentId: 0,
                content,
                postId,
            });
        } else if (isEditing) {
            await putApi(`/comment/${commentId}`, {
                commentId,
                postId,
                content,
            });

            setCommentsZero(prevComments => {
                return prevComments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            content: content,
                        };
                    } else {
                        return comment;
                    }
                });
            });
            setIsEditing(false);
        }
        setContent('');
        setIsSave(true);
    };

    const handleReSubmit = async commentId => {
        if (!isReEditing) {
            await postApi('/comment', {
                parentId: parentId,
                content: reContent,
                postId,
            });
            setReContent('');
            setIsReplying(false);
        } else if (isReEditing) {
            await putApi(`/comment/${commentId}`, {
                commentId,
                postId,
                content: reContent,
            });

            setCommentsOther(prevComments => {
                return prevComments.map(comment => {
                    if (comment.id === commentId) {
                        return {
                            ...comment,
                            content: reContent,
                        };
                    } else {
                        return comment;
                    }
                });
            });
            setIsReEditing(false);
        }
        setIsSave(true);
    };

    const handlePostDelete = useCallback(async postId => {
        await delApi(`/post/${postId}`);
        navigate(-1);
    });

    const handleCommentDelete = useCallback(async commentId => {
        await delApi(`/comment/${commentId}`);
        window.location.replace(`/post/${postId}`);
    });

    const isEditable = useMemo(() => userId === post.userId, [userId, post.userId]);
    // console.log('userId', userId, 'post', post);
    // console.log('내건가', isEditable);

    const fetchPostDetail = useCallback(async () => {
        try {
            const res = await getApi(path);

            const postData = res.data.post;
            setPost(postData);

            if (postData.imageUrl.startsWith('http')) {
                setPostImage(postData.imageUrl);
            } else {
                setPostImage(`${BUCKET_BASE_URL}${postData.imageUrl}`);
            }

            if (postData.userImage.startsWith('http')) {
                setUserImage(postData.userImage);
            } else {
                setUserImage(`${BUCKET_BASE_URL}${postData.userImage}`);
            }
        } catch (err) {
            alert(err.response.data.message);
            console.log(err.data.response.message);
        }
    }, [path]);

    const fetchComments = useCallback(
        async (postId, cursor) => {
            try {
                if (cursor === -1) {
                    setIsLoading(false);
                    return;
                }
                setIsLoading(true);
                const res = await getApi(`/comment?postId=${postId}&cursor=${cursor}`);
                console.log('res:', res);

                const commentDataZero = res.data.commentListZero;
                const commentDataOther = res.data.commentListOther;

                console.log('답글', commentDataOther);
                if (commentDataZero?.length < 10) {
                    setNextCursor(-1);
                } else {
                    setNextCursor(commentDataZero[commentDataZero.length - 1].id);
                }

                let newCommentsZero;

                if (cursor == 0) {
                    newCommentsZero = res.data.commentListZero;
                } else if (cursor > 0 && commentDataZero.length > 0) {
                    newCommentsZero = [...commentsZero, ...commentDataZero];
                } else if (commentDataZero.length === 0) {
                    newCommentsZero = [...commentsZero];
                }

                setCommentsZero(newCommentsZero);
                setCommentsOther(commentDataOther);

                if (cursor != -1) {
                    setIsReached(false);
                    setIsSave(false);
                }
            } catch (err) {
                // alert(err.response.data.mesasge);
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        },
        [isSave, isReached],
    );

    console.log('댓글:', commentsZero);
    console.log('답글:', commentsOther);
    const handleScroll = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;

        if (scrollTop + clientHeight >= scrollHeight) {
            setIsReached(true);
        }
    }, []);

    console.log('isreached', isReached);

    const handleLike = (postId, userId) => {
        try {
            if (disabled === true) {
                return;
            }
            setDisabled(true);

            if (liked === false) {
                postApi(`/like/${postId}`, {
                    postId,
                    userId,
                });
                setLiked(true);
                setLikeCount(likeCount + 1);
            } else {
                delApi(`/like/${postId}`);
                setLiked(false);
                setLikeCount(likeCount - 1);
            }
        } catch (err) {
            alert(err.response.data.message);
            console.log(err.response.data.message);
        } finally {
            setDisabled(false);
        }
    };

    useEffect(() => {
        // 페이지 초기 렌더링 시에 postList를 불러오기 위해 fetchPost 호출
        fetchComments(postId, nextCursor);
        fetchPostDetail(postId);
        // 스크롤 이벤트 핸들러 등록 및 해제
        window.addEventListener('scroll', handleScroll);
        // console.log('nextCursor', nextCursor);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchComments, fetchPostDetail]);

    return (
        <>
            <div className="w-full pt-5 pl-5 pb-5 pr-5 mb-5">
                <article key={postId} className="flex-col justify-between" style={{ width: '40vw' }}>
                    <div className="profileSection flex items-center gap-x-4">
                        <img src={userImage} alt="유저 프로필" className="h-10 w-10 rounded-full bg-gray-50" />
                        <div style={{ display: 'flex', verticalAlign: 'middle' }}>{post.nickname}</div>
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
                                                    onClick={() => navigate(`/postedit/${postId}`)}>
                                                    수정
                                                </div>
                                                <div
                                                    className="text-gray-700 block px-4 py-2 text-md"
                                                    onClick={() => {
                                                        if (window.confirm('정말로 삭제하시겠습니까?')) {
                                                            handlePostDelete(postId);
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
                        <img src={postImage} alt="Post Image" className="postImage w-full h-auto mt-5" />
                        <div className="flex mt-3">
                            {liked == true ? (
                                <SolidHeartIcon
                                    disabled={disabled}
                                    onClick={() => handleLike(postId, userId)}
                                    className="h-7 w-7"
                                    fill="#ff3040"
                                />
                            ) : (
                                <HeartIcon disabled={disabled} onClick={() => handleLike(postId, userId)} className="h-7 w-7" />
                            )}
                            <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" />
                        </div>

                        <div className="text-left mt-3">
                            <span style={{ fontWeight: 'bold' }}>{likeCount.toLocaleString()} 명</span>이 좋아합니다.
                        </div>
                        <div className="flex mt-2 text-md text-left">
                            <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{post.nickname}</span>
                            <span style={{ color: '#737373' }}> {GetTime(post.createAt)} </span>
                        </div>
                        <div className="text-left">{post.content}</div>
                    </div>
                    <div className="commentSection w-full mt-1 mb-3">
                        {/* .. parentId === item.id  */}
                        {commentsZero?.map(item => (
                            <div>
                                <div className="pt-1 mt-1 pb-1 flex w-full" key={item.id}>
                                    <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{item.nickname}</span>{' '}
                                    <span style={{ color: '#737373' }}>{GetTime(item.createAt)}</span>
                                    <div className="flex flex-grow justify-end items-center">
                                        <CommentIcon
                                            onClick={() => {
                                                setIsReplying(!isReplying);
                                                parentId == 0 ? setParentId(item.id) : setParentId(0);
                                            }}
                                            className="h-5 w-5"
                                        />
                                        {userId === item.userId && (
                                            <PencilSquareIcon
                                                onClick={() => {
                                                    !isEditing ? setIsEditing(true) : setIsEditing(false);
                                                    setContent(item.content);
                                                }}
                                                className="w-5 h-5"
                                            />
                                        )}
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
                                <div className="text-left">{item.content}</div>
                                {isEditing && (
                                    <div className="ml-6 pl-2 pb-3 w-full bg-white" style={{ width: '40vw' }}>
                                        <div className="flex mt-4">
                                            <textarea
                                                style={{ width: '35vw' }}
                                                className="block rounded-lg border-0 py-1 pl-3 pr-3 pt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                value={content}
                                                onChange={e => setContent(e.target.value)}></textarea>
                                            <div className="flex items-center ml-2">
                                                <button
                                                    type="submit"
                                                    className="flex-grow w-auto bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                                                    onClick={() => handleSubmit(item.id)}>
                                                    수정
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {commentsOther
                                    .filter(comment => comment.parentId === item.id)
                                    .map((comment, index) => (
                                        <div className="ml-4" style={{ backgroundColor: '#c7c7c7' }}>
                                            <div className="pt-1  pb-1 mt-1 flex w-full" key={index}>
                                                <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>
                                                    {comment.nickname}
                                                </span>
                                                <span style={{ color: '#737373' }}> {GetTime(comment.createAt)}</span>
                                                <div className="flex flex-grow justify-end items-center">
                                                    {userId === comment.userId && (
                                                        <PencilSquareIcon
                                                            className="w-5 h-5"
                                                            onClick={() => {
                                                                isReEditing ? setIsReEditing(false) : setIsReEditing(true);
                                                                setReContent(comment.content);
                                                            }}
                                                        />
                                                    )}
                                                    {(isEditable || userId === comment.userId) && (
                                                        <TrashIcon
                                                            className="w-5 h-5"
                                                            onClick={() => {
                                                                if (window.confirm('정말로 삭제하시겠습니까?')) {
                                                                    handleCommentDelete(comment.id);
                                                                }
                                                            }}
                                                        />
                                                    )}
                                                </div>
                                            </div>
                                            <div className="text-left">{comment.content}</div>
                                            {isReEditing && (
                                                <div className="ml-6 pl-2 pb-3 w-full bg-white" style={{ width: '40vw' }}>
                                                    <div className="flex mt-4">
                                                        <textarea
                                                            style={{ width: '35vw' }}
                                                            className="block rounded-lg border-0 py-1 pl-3 pr-3 pt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                            value={reContent}
                                                            onChange={e => setReContent(e.target.value)}></textarea>
                                                        <div className="flex items-center ml-2">
                                                            <button
                                                                type="submit"
                                                                className="flex-grow w-auto bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                                                                onClick={() => handleReSubmit(comment.id)}>
                                                                수정
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}

                                {isReplying && parentId === item.id && (
                                    <div className="ml-6 pl-2 pb-3 w-full bg-white" style={{ width: '40vw' }}>
                                        <div className="flex mt-4">
                                            <textarea
                                                style={{ width: '35vw' }}
                                                className="block rounded-lg border-0 py-1 pl-3 pr-3 pt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                                placeholder="답글을 입력하세요."
                                                value={reContent}
                                                onChange={e => setReContent(e.target.value)}></textarea>
                                            <div className="flex items-center ml-2">
                                                <button
                                                    type="submit"
                                                    className="flex-grow w-auto bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                                                    onClick={() => handleReSubmit()}>
                                                    등록
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                        {isLoading && <p>Loading...</p>}

                        {!isEditing && (
                            <div className="pl-2 pb-3 fixed bottom-0 w-full bg-white" style={{ width: '40vw' }}>
                                <div className="flex mt-4">
                                    <textarea
                                        style={{ width: '35vw' }}
                                        className="block rounded-lg border-0 py-1 pl-3 pr-3 pt-1 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                        placeholder="댓글을 입력하세요."
                                        value={content}
                                        onChange={e => setContent(e.target.value)}></textarea>
                                    <div className="flex items-center ml-2">
                                        <button
                                            type="submit"
                                            className="flex-grow w-auto bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600"
                                            onClick={() => handleSubmit()}>
                                            등록
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </article>
            </div>
        </>
    );
}

export default PostDetail;
