import React, { useState, useContext, useEffect } from 'react';
import * as Api from '../../../api';
// import Navigator from '../../sections/navigator';
import Header from '../../sections/header';
import RankCard from '../../components/rankcard/rankcard';
import UserCard from '../../components/usercard/usercard';
import { UserStateContext } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';

function Rank() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    // const [users, setUsers] = useState([])
    const [rankList, setRankList] = useState([]);
    const userId = userState.id;

    // const [users, setUsers] = useState([
    //     {
    //         id: 1,
    //         image: "http://placekitten.com/200/200",
    //         ranking: 1,
    //         feedCount: 10,
    //         co2Decre: 20,
    //     },
    //     {
    //         id: 2,
    //         image: "http://placekitten.com/200/200",
    //         ranking: 2,
    //         feedCount: 5,
    //         co2Decre: 10,
    //     },
    //     {
    //         id: 3,
    //         image: "http://placekitten.com/200/200",
    //         ranking: 2,
    //         feedCount: 5,
    //         co2Decre: 10,
    //     }
    //     // Add more users as needed
    // ]);
    const fetchRank = async (ownerId) => {
        try {
            const res = await Api.get('rank/list');
            const ownerData = res.data;
            setRankList(ownerData);
        } catch (err) {
            if (err.response.status === 400) {
                alert(err.response.data.error);
            }
            console.log('DB 불러오기를 실패하였습니다.', err);
        }
    };

    useEffect(() => {
        if (!userState.user) {
            navigate('/login');
            alert('로그인한 유저만 사용할 수 있습니다.');
            return;
        }
        fetchRank({ userId });
    }, [userState, navigate]);

    return (
        <>
            <div>
                <UserCard user={userState.user} />
            </div>
            <div className='w-full'>
                {rankList.map((user, index) => (
                    <div key={user.userId}>
                        <RankCard user={user} index={index + 1} />
                    </div>
                ))}
            </div>
        </>
    );
}

export default Rank;
