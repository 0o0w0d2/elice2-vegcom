import React, { useState, useContext, useEffect, useCallback } from 'react';
import { UserStateContext } from '../../../App';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import * as Api from '../../../api';

function PostDetail() {
    // post/:postId 로 받아와서 구현
    const userState = useContext(UserStateContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState([]);
    const userId = userState.user.userId;
    const postId = location.pathname.match(/\/post\/(\d+)/)[1];
    const [content, setContent] = useState('');
    const [comments, setComments] = useState([]);
    const [postImage, setPostImage] = useState('');
    const [userImage, setUserImage] = useState('');
    const [isSave, setIsSave] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [liked, setLiked] = useState(false);
    const path = location.pathname;

    const handleSubmit = async () => {
        await Api.post('/comment', {
            parentId: 0,
            content,
            postId,
        });

        setContent('');

        setIsSave(true);
    };

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
            alert(err.message);
            console.log('좋아요 누르기 실패!');
        } finally {
            setDisabled(false);
        }
    };

    const fetchLikes = async postId => {
        try {
            const res = await Api.get(`like/${postId}`);
            console.log('like: ', res.data);
            const likesData = res.data;
            setLikeCount(likesData.likecount);
            setLiked(likesData.likeuser);
        } catch (err) {
            alert('err.rseponse.data.message');
            console.log('좋아요 불러오기를 실패했습니다.');
        }
    };

    const fetchPostDetail = async postId => {
        try {
            const res = await Api.get(path);

            const postData = res.data.post;
            setPost(postData);

            if (postData.imageUrl.startsWith('https')) {
                setPostImage(postData.imageUrl);
            } else {
                setPostImage(`https://7team-bucket.s3.ap-northeast-2.amazonaws.com/${postData.imageUrl}`);
            }

            if (postData.userImage.startsWith('https')) {
                setUserImage(postData.userImage);
            } else {
                setUserImage(`https://7team-bucket.s3.ap-northeast-2.amazonaws.com/${postData.userImage}`);
            }
        } catch (err) {
            alert(err.response.data.message);
            console.log('DB 불러오기를 실패했습니다.');
        }
    };

    const fetchComments = useCallback(
        async postId => {
            try {
                const res = await Api.get(`/comment/${postId}`);
                console.log(res);
                const commentData = res.data.commentList;

                setComments(commentData);
                setIsSave(false);
            } catch (err) {
                alert(err.response.data.mesasge);
                console.log('DB 불러오기를 실패했습니다.');
            }
        },
        [postId, isSave],
    );

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
            alert('로그인한 유저만 사용할 수 있습니다.');
            return;
        }
        fetchPostDetail(postId);
        fetchComments(postId);
        fetchLikes(postId);
    }, [userState, fetchComments]);

    return (
        <>
            <div className="headerSection" style={{ height: '150px' }}></div>
            <div className="w-full pt-5 pl-5 pb-5 pr-5 mb-5">
                <article key={postId} className="flex-col justify-between" style={{ width: '30vw' }}>
                    <div className="profileSection flex items-center gap-x-4">
                        <img src={userImage} alt="유저 프로필" className="h-10 w-10 rounded-full bg-gray-50" />
                        <div style={{ display: 'flex', verticalAlign: 'middle' }}>{post.userId}</div>
                    </div>
                    <div className="postSection w-full">
                        <img src={postImage} alt="Post Image" className="postImage w-full h-auto mt-5" />
                        <div className="flex mt-3">
                            {liked == true ? (
                                <SolidStarIcon
                                    disabled={disabled}
                                    onClick={() => handleLike(postId, userId)}
                                    className="h-7 w-7"
                                    fill="#008762"
                                />
                            ) : (
                                <StarIcon disabled={disabled} onClick={() => handleLike(postId, userId)} className="h-7 w-7" />
                            )}
                            <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" />
                        </div>

                        <div className="text-left mt-3">
                            <span style={{ fontWeight: 'blod' }}>{likeCount.toLocaleString()} 명</span>이 좋아합니다.
                        </div>
                        <div className="flex mt-2 text-md text-left">
                            <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{post.userId}</span> {post.content}
                        </div>
                    </div>
                    <div className="commentSection text-left">
                        {comments?.map(item => (
                            <div key={item.id}>
                                <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{item.nickname}</span> {item.content}
                            </div>
                        ))}
                        <div className="flex mt-4 ">
                            <input
                                type="comment"
                                className="w-full flex-grow block rounded-lg border-0 py-1.5 pl-3 pr-3 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm"
                                placeholder="댓글을 입력하세요."
                                value={content}
                                onChange={e => setContent(e.target.value)}
                            />
                            <div className="flex items-center ml-2">
                                <button
                                    type="submit"
                                    className=" w-16 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                                    onClick={() => handleSubmit()}>
                                    등록
                                </button>
                            </div>
                        </div>
                    </div>
                </article>
            </div>
        </>
    );
}

export default PostDetail;
