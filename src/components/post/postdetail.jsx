import React, { useState, useContext, useEffect } from 'react';
import { UserStateContext } from '../../../App';
import { useNavigate, useLocation } from 'react-router-dom';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';

function PostDetail() {
    // post/:postId 로 받아와서 구현
    const userState = useContext(UserStateContext);
    const navigate = useNavigate();
    const location = useLocation();
    const [post, setPost] = useState([]);
    const userId = userState.id;
    const postId = location.pathname.match(/\/post\/(\d+)/)[1];
    console.log('postId ', postId);
    console.log('location: ', location);

    const fetchPostDetail = async postId => {
        try {
            const res = await Api.get(`post/${postId}`);
            console.log(res.data);
            const postData = res.data;
            setPost(postData.post);
        } catch (err) {
            alert(err.response.data.message);
            console.log('DB 불러오기를 실패했습니다.');
        }
    };

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
            alert('로그인한 유저만 사용할 수 있습니다.');
            return;
        }
        fetchPostDetail({ postId });
    }, [userState, navigate, post]);

    return (
        <div>
            <article key={post.postId} className="flex max-w-xl flex-col items-start justify-between">
                <div className="profileSection relative flex items-center gap-x-4">
                    <img src={post.userImage} alt="유저 프로필" className="h-10 w-10 rounded-full bg-gray-50" />
                    <div style={{ display: 'flex', verticalAlign: 'middle' }}>{post.userId}</div>
                </div>
                <div className="postSection w-full">
                    <img src={post.postImage} alt="Post Image" className="postImage w-full h-auto mt-5" />
                    <div className="flex mt-3">
                        {/* {like == true ? <SolidStarIcon className="h-7 w-7" fill="#008762" /> : <StarIcon className="h-7 w-7" />} */}
                        <ChatBubbleOvalLeftEllipsisIcon className="h-7 w-7" onClick={() => handleClick(post)} />
                    </div>
                    {/* <div className="text-left mt-3">{post.postLikeCount.toLocaleString()} 명이 좋아합니다.</div> */}
                    <div className="flex mt-2 text-md text-left">
                        <span style={{ fontWeight: 'bold', marginRight: '0.4rem' }}>{post.userId}</span> {post.content}
                    </div>
                </div>
                {/* <div className="commentSection">
                    {comment.slice(0, 3).map(item => (
                        <div>
                            {item.userId} {item.content}
                        </div>
                    ))}
                </div> */}
            </article>
        </div>
    );
}

export default PostDetail;
