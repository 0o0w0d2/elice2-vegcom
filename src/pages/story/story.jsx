import React, { useState, useContext, useEffect } from 'react';
import * as Api from '../../../api';
// import Navigator from '../../sections/navigator';
import PostCard from '../../components/post/postcard';
import { UserStateContext } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';
import { PlusCircleIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';

function Story() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    const [postList, setPostList] = useState([]);
    const userId = userState.id;

    const fetchPost = async () => {
        try {
            const res = await Api.get('post/list');
            const postData = res.data;

            setPostList(postData.postList);
        } catch (err) {
            alert('err.response.data.message');
            console.log('DB 불러오기를 실패했습니다.');
        }
    };

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
            alert('로그인한 유저만 사용할 수 있습니다.');
            return;
        }
        fetchPost();
    }, [userState, navigate]);

    return (
        <>
            <div className="headerSection" style={{ height: '150px' }}></div>
            <div className="w-full">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
                        함께 실천하는 사람들을 만나 보세요.
                    </h2>
                </div>
                <div className="flex mb-3" style={{ justifyContent: 'flex-end' }}>
                    <PlusCircleIcon className="w-7 h-7" onClick={() => navigate('/addpost')} />{' '}
                    <MagnifyingGlassCircleIcon className="w-7 h-7" />
                </div>
                {postList.map(post => (
                    <div key={post.postId}>
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Story;
