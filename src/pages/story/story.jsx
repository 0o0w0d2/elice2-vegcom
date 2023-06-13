import React, { useState, useEffect, useCallback } from 'react';
import * as Api from '../../../api';
import PostCard from '../../components/post/postcard';
import { useNavigate } from 'react-router-dom';
import { PlusCircleIcon, MagnifyingGlassCircleIcon } from '@heroicons/react/24/outline';

function Story() {
    const navigate = useNavigate();
    const [postList, setPostList] = useState([]);
    const [nextCursor, setNextCursor] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [isReached, setIsReached] = useState(false);

    const fetchPost = useCallback(
        async cursor => {
            try {
                setIsLoading(true);
                console.log('요청 후 nextCursor:', cursor);
                const res = await Api.get(`post/list/${cursor}`);
                console.log('res:', res);

                const postData = res.data;

                if (postData.postList?.length < 5) {
                    setNextCursor(-1);
                } else {
                    setNextCursor(postData.postList[postData.postList.length - 1].postId);
                }

                let newPostList;

                if (cursor === 0) {
                    newPostList = postData.postList;
                } else if (cursor > 0 && postData.postList.length > 0) {
                    newPostList = [...postList, ...postData.postList];
                } else if (postData.postList.length === 0) {
                    newPostList = [...postList];
                }

                setPostList(newPostList);

                console.log('newpostList', newPostList);
                console.log('postData', postData.postList, postData.postList[postData.postList.length - 1].postId);

                console.log('set 후 nextCursor', nextCursor); // 0
                console.log('postData', postData);
                setIsReached(false);
            } catch (err) {
                alert(err.message);
                console.log(err.message);
            } finally {
                setIsLoading(false);
                console.log('finally nextCursor:', nextCursor); // 0
            }
        },
        [isReached],
    );

    console.log('fetch 후 nextCursor', nextCursor); // 61

    const handleScroll = useCallback(() => {
        const scrollHeight = document.documentElement.scrollHeight;
        const scrollTop = document.documentElement.scrollTop;
        const clientHeight = document.documentElement.clientHeight;
        // console.log('height:', scrollHeight, 'top:', scrollTop, 'clientHeight:', clientHeight);
        // console.log('top+height=', scrollTop + clientHeight);

        if (scrollTop + clientHeight >= scrollHeight) {
            setIsReached(true);
            console.log('isreached', isReached);
        }
    }, []);

    console.log('isreached', isReached);
    useEffect(() => {
        // 페이지 초기 렌더링 시에 postList를 불러오기 위해 fetchPost 호출
        fetchPost(nextCursor);
        // 스크롤 이벤트 핸들러 등록 및 해제
        window.addEventListener('scroll', handleScroll);
        // console.log('nextCursor', nextCursor);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [fetchPost]);

    // useEffect(() => {
    //     fetchPost(0);
    // }, []);

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
                {isLoading && <p>Loading...</p>}
                {nextCursor === -1 && <p>데이터 로딩 완료!</p>}
            </div>
        </>
    );
}

export default Story;
