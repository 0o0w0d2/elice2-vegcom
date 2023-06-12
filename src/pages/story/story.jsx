import React, { useState, useEffect, useCallback } from 'react';
import * as Api from '../../../api';
import PostCard from '../../components/post/postcard';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';

function Story() {
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);

    const fetchPost = useCallback(async () => {
        try {
            const res = await Api.get('post/list');
            const postData = res.data;

            setPostList(postData.postList);
        } catch (err) {
            alert(err.data.response.message);
            console.log(err.data.response.message);
        }
    }, []);

    useEffect(() => {
        fetchPost();
    }, [fetchPost]);

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
                    <MagnifyingGlassCircleIcon className="w-7 h-7" />
                    <PlusCircleIcon className="w-7 h-7" onClick={() => navigate('/addpost')} />
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
