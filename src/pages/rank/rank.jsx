import React, { useState, useContext, useEffect } from 'react';
import * as Api from '../../../api';
// import Navigator from '../../sections/navigator';
import Header from '../../sections/header';
import RankCard from '../../components/rankcard/rankcard';
import UserCard from '../../components/user/usercard';
import RankPageSentence from '../../components/rankpagesentence/rankpagesentence';
import { UserStateContext } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';
import PointBar from '../../components/pointbar/pointbar';

function Rank() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    // const [users, setUsers] = useState([])
    const [rankList, setRankList] = useState([]);
    const [user, setUser] = useState(
        {
            id: userState.user.userId,
            image: userState.user.userImage,
            nickname: userState.user.nickname,
        },
        // Add more users as needed
    );
    // const [rankListUser, setRankListUser] = useState([]);

    const [point, setPoint] = useState();
    const pointMax = 1000;

    const fetchRank = async () => {
        try {
            const point = await Api.get('user/point');
            setPoint(point.data.userPoint.accuPoint);

            const res = await Api.get('rank/list');
            const ownerData = res.data;

            setRankList(ownerData.rankList);
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
        fetchRank();
    }, [userState, navigate]);

    return (
        <div>
            <div className="headerSection" style={{ height: '150px' }}></div>
            <div>
                <RankPageSentence />
            </div>
            <div>
                <PointBar point={point} pointMax={pointMax} />
            </div>
            <div>
                <UserCard owner={user} point={point} />
            </div>
            <div className="headerSection" style={{ height: '50px' }}></div>
            <p>랭킹</p>
            <div className="w-full">
                {rankList.map((owner, index) => (
                    <div key={owner.userId}>
                        <RankCard user={owner} point={point} index={index + 1} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rank;
