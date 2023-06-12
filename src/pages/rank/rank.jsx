import React, { useState, useContext, useEffect, useCallback } from 'react';
import * as Api from '../../../api';
// import Navigator from '../../sections/navigator';
import Header from '../../sections/header';
import RankCard from '../../components/rankcard/rankcard';
import UserCard from '../../components/user/usercard';
import RankPageSentence from '../../components/rankpagesentence/rankpagesentence';
import { UserStateContext } from '../../../App';
import { useNavigate, useLocation } from 'react-router-dom';
import PointBar from '../../components/pointbar/pointbar';

function Rank() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [rankList, setRankList] = useState([]);
    const [point, setPoint] = useState();
    const [isFetchCompleted, setIsFetchCompleted] = useState(false);
    const userState = useContext(UserStateContext);

    const pointMax = 1000;

    const fetchOwner = useCallback(
        async ownerId => {
            try {
                // 유저 id를 가지고 "/user/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
                const res = await Api.get(`user/${ownerId}`);
                // 사용자 정보는 response의 data임.
                const ownerData = res.data;
                // portfolioOwner을 해당 사용자 정보로 세팅함.
                setUser(ownerData);
                // fetchOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
                setIsFetchCompleted(true);
            } catch (err) {
                if (err.response.status === 400) {
                    alert('유저 정보를 불러오는데 실패하였습니다.');
                }
                console.log('유저 정보를 불러오는데 실패하였습니다.', err);
            }
        },
        [userState.user.userId],
    );

    const fetchRank = useCallback(async () => {
        try {
            const res = await Api.get('rank/list');
            const ownerData = res.data;
            setRankList(ownerData.rankList);

            const point = await Api.get('user/point');
            setPoint(point.data.userPoint.accuPoint);
        } catch (err) {
            alert(err.response.data.error);
            console.log(err.data.response.message);
        }
    }, []);

    useEffect(() => {
        // if (!userState.user) {
        //     navigate('/login');
        //     alert('로그인한 유저만 사용할 수 있습니다.');
        //     return;
        // }
        fetchRank();
        fetchOwner(userState.user.userId);
    }, [fetchRank, fetchOwner]);

    if (!isFetchCompleted) {
        return 'loading...';
    }

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
                <UserCard user={user.userInfo} point={point} />
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
