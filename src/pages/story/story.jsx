import React, { useState, useContext, useEffect } from 'react';
import * as Api from '../../../api';
// import Navigator from '../../sections/navigator';
import PostCard from '../../components/post/postcard';
import { UserStateContext } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';

function Story() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);

    useEffect(() => {
        if (!userState.user) {
            navigate('/');
            alert('로그인한 유저만 사용할 수 있습니다.');
        }
    });

    const [post, setPost] = useState();
    Api.get('post/list').then(res => setPost(res.data));

    console.log('post: ', post);

    const [posts, setPosts] = useState([
        {
            postId: 1,
            userImage: 'http://placekitten.com/200/200',
            userId: '안녕하세요',
            postImage: 'http://placekitten.com/200/201',
            content: '나는 감자다 푸하하하',
            like: true,
            postLikeCount: 2394923,
        },
        {
            postId: 2,
            userImage: 'http://placekitten.com/200/202',
            userId: '관악구 불주먹',
            postImage: 'http://placekitten.com/200/203',
            content: '나는 채식 안 한다',
            like: true,
            postLikeCount: 32,
        },
        {
            postId: 3,
            userImage: 'http://placekitten.com/200/206',
            userId: '효천 보안관',
            postImage: 'http://placekitten.com/200/202',
            content: '나는 채식 안 한다',
            like: false,
            postLikeCount: 918,
        },
        {
            postId: 4,
            userImage: 'http://placekitten.com/200/205',
            userId: '네모라이팅 고수',
            postImage: 'http://placekitten.com/200/202',
            content: '나는 채식 안 한다',
            like: false,
            postLikeCount: 29981,
        },
        // Add more users as needed
    ]);

    return (
        <>
            <div className="headerSection" style={{ height: '150px' }}></div>
            <div className="w-full">
                <div className="mx-auto max-w-2xl lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-10">
                        함께 실천하는 사람들을 만나 보세요.
                    </h2>
                </div>
                <div onClick={() => navigate('/addpost')}>검색 버튼, 추가 버튼</div>
                {posts.map(post => (
                    <div key={post.postId}>
                        <PostCard post={post} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Story;
