import React, { Fragment, useContext, useState, useEffect, useCallback } from 'react';
import { UserStateContext } from '../../../App';
import { useLocation } from 'react-router-dom';

import UserCard from '../../components/user/usercard';
import { ChatBubbleOvalLeftEllipsisIcon } from '@heroicons/react/24/outline';
import { StarIcon as SolidStarIcon, EllipsisVerticalIcon, PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import { StarIcon } from '@heroicons/react/24/outline';
import { Menu, Transition } from '@headlessui/react';
import { get as getApi } from '../../../api';
import { BUCKET_BASE_URL } from '../../utils/conts/bucket';

function UserDetail() {
    // post/:postId 로 받아와서 구현
    const location = useLocation();

    const userId = location.pathname.match(/\/mypage\/(\d+)/)[1];

    const [point, setPoint] = useState([]);
    const [postList, setPostList] = useState([]);

    const fetchUser = useCallback(async userId => {
        try {
            const point = await getApi('user/point');
            setPoint(point.data.userPoint.accuPoint);

            const postList = await getApi(`post/mypage/${userId}`);
            console.log(postList);
            setPostList(postList.data.userPostList);
        } catch (err) {
            // alert(err.response.data.error);
            console.log(err);
        }
    }, []);

    const getImageSrc = useCallback(imageUrl => {
        if (imageUrl.startsWith('http')) {
            return imageUrl;
        } else {
            return `${BUCKET_BASE_URL}${imageUrl}`;
        }
    }, []);

    useEffect(() => {
        fetchUser(userId);
    }, [fetchUser]);

    return (
        <>
            <div>
                <UserCard />
            </div>
            <div>
                {postList.map(item => (
                    <div key={item.id} className="" style={{ width: '20vh', height: '20vh' }}>
                        <img
                            style={{ flex: 2, width: undefined, height: undefined }}
                            src={getImageSrc(item.imageUrl)}
                            alt={item.id}
                        />
                    </div>
                ))}
            </div>
        </>
    );
}

export default UserDetail;
