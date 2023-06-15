import React, { useState, useCallback, useEffect } from 'react';
import { get as getApi } from '../../../api';
import PostCard from '../../components/post/postcard';
import { useNavigate } from 'react-router-dom';

function SearchPost() {
    const [keyword, setKeyword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSave, setIsSave] = useState(false);
    const [searchList, setSearchList] = useState([]);
    const [nextCursor, setNextCursor] = useState(0);
    const [isReached, setIsReached] = useState(false);

    const handleChange = e => {
        setKeyword(e.target.value);
        console.log(keyword);
    };

    const handleSearch = useCallback(
        async keyword => {
            try {
                setIsLoading(true);
                console.log('keyword', keyword);
                const res = await getApi(`/search?keyword=${keyword}&cursor=0`);
                console.log('res.data', res.data);
                const searchData = res.data.searchPost;

                setSearchList(searchData);
            } catch (err) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert('라우팅 경로가 잘못되었습니다.');
                }
            } finally {
                setIsLoading(false);
                setKeyword('');
            }
        },
        [isSave],
    );

    // const handleScroll = useCallback(() => {
    //     const scrollHeight = document.documentElement.scrollHeight;
    //     const scrollTop = document.documentElement.scrollTop;
    //     const clientHeight = document.documentElement.clientHeight;

    //     if (scrollTop + clientHeight >= scrollHeight) {
    //         setIsReached(true);
    //     }
    // }, []);

    // useEffect(() => {
    //     // 페이지 초기 렌더링 시에 postList를 불러오기 위해 fetchPost 호출

    //     handleSearch(keyword, 0);
    //     // 스크롤 이벤트 핸들러 등록 및 해제
    //     // window.addEventListener('scroll', handleScroll);
    //     // // console.log('nextCursor', nextCursor);
    //     // return () => {
    //     //     window.removeEventListener('scroll', handleScroll);
    //     // };
    // }, [handleSearch]);

    return (
        <>
            <div className="flex justify-center items-center" style={{ width: '960px' }}>
                <div className="search fixed top-0" style={{ marginTop: '150px', width: '800px' }}>
                    <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">
                        Search
                    </label>
                    <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                            <svg
                                aria-hidden="true"
                                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <input
                            onChange={e => handleChange(e)}
                            value={keyword}
                            type="text"
                            className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                            placeholder="궁금한 식단의 키워드를 검색해 보세요"
                        />
                        <button
                            onClick={() => handleSearch(keyword)}
                            type="submit"
                            className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                            검색
                        </button>
                    </div>
                </div>
            </div>

            <div className="w-full">
                {searchList.map(post => (
                    <div key={post.postId}>
                        <PostCard post={post} />
                    </div>
                ))}
                {isLoading && <p>Loading...</p>}
            </div>
        </>
    );
}

export default SearchPost;
