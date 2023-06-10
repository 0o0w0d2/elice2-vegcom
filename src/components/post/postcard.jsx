import React, { useState, useContext, useEffect } from 'react';
import { UserStateContext } from '../../../App';
import { useNavigate } from 'react-router-dom';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import * as Api from '../../../api';
// import { formatPostcssSourceMap } from 'vite';

function PostCard({ post }) {
    const userState = useContext(UserStateContext);
    const [comments, setComments] = useState([]);
    const navigate = useNavigate();
<<<<<<< HEAD
    // console.log(post);
=======
>>>>>>> b374d586b9c89e18874a6c5c85c6b839cea7e7a9

    const handleClick = post => {
        navigate(`/post/${post.postId}`);
    };

    res = Api.get(`/like/${post.postId}`);
    console.log(res);

    const fetchComments = async () => {
        try {
            const res = await Api.get(`/comment/${post.postId}`);
            const commentData = res.data.commentList;
            setComments(commentData);
        } catch (err) {
            alert(err.response.data.message);
            console.log('댓글 불러오기를 실패했습니다');
        }
    };

    const handleLike = (postId, userId) => {
        try {
            Api.post(`/like/${postId}`, {
                // 좋아요 누르는 버튼 구현하기
                postId,
                userId,
            });
        } catch (err) {
            alert('err.response.data.message');
            console.log('좋아요 누르기 실패!');
        }
    };

    // const fetchLikes = async () => {
    //     try {
    //         const res = await Api.get(`like/${post.postId}`);
    //         const likesData = res.data;
    //         console.log(res);
    //     } catch (err) {
    //         alert('err.rseponse.data.message');
    //         console.log('좋아요 불러오기를 실패했습니다.');
    //     }
    // };

    useEffect(() => {
        // fetchLikes(post);
        fetchComments(post);
    }, [post.postId]);

    return (
        <div className="postCard rounded-lg mx-auto grid max-w-2xl grid-cols-1 border border-gray-300 pt-5 pl-5 pb-5 pr-5 mb-5">
            <article key={post.postId} className="flex max-w-xl flex-col items-start justify-between">
                <div className="profileSection relative flex items-center gap-x-4">
                    <img
                        src={`https://7team-bucket.s3.ap-northeast-2.amazonaws.com/${post.userImage}`}
                        alt=""
                        className="h-10 w-10 rounded-full bg-gray-50"
                    />
                    <div style={{ display: 'flex', verticalAlign: 'middle' }}>{post.userId}</div>
                </div>
                <div className="postSection w-full">
                    <img
                        src={`https://7team-bucket.s3.ap-northeast-2.amazonaws.com/${post.imageUrl}`}
                        alt="Post Image"
                        className="postImage w-full h-auto mt-5"
                    />
                    <div className="flex mt-3">
                        {/* 눌렀을 때 좋아요 상태 변경하는 코드 추가하기 */}
                        <StarIcon className="h-7 w-7" onClick={() => handleLike(post)} />
                        {/* {post.like == true ? (
                            <SolidStarIcon className="h-7 w-7" fill="#008762" />
                        ) : (
                            <StarIcon className="h-7 w-7" />
                        )} */}
                        <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" onClick={() => handleClick(post)} />
                    </div>
                    {/* <div className="text-left mt-3">{post.postLikeCount.toLocaleString()} 명이 좋아합니다.</div> */}
                    <div className="flex mt-2 text-md text-left">
                        <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{post.userId}</span> {post.content}
                    </div>
                </div>
                <div>
                    {/* {comments.slice(0, 3)?.map(item => (
                        <div key={item.id}>
                            {item.nickname}: {item.content}
                        </div>
                    ))} */}
                </div>
            </article>
        </div>
    );
}

export default PostCard;
