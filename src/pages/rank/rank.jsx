import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { get as getApi } from '../../../api';
import RankCard from '../../components/rankcard/rankcard';
import UserCard from '../../components/user/usercard';
import RankPageSentence from '../../components/rankpagesentence/rankpagesentence';
import PointBar from '../../components/pointbar/pointbar';
import Loading from '../loading';

function Rank() {
    const navigate = useNavigate();

    const [user, setUser] = useState(null);
    const [rankList, setRankList] = useState([]);
    const [point, setPoint] = useState();
    const [isFetchOwnerCompleted, setIsFetchOwnerCompleted] = useState(false);
    const [isFetchRankCompleted, setIsFetchRankCompleted] = useState(false);

    const userId = localStorage.getItem('userId');

    const fetchOwner = useCallback(
        async ownerId => {
            try {
                // 유저 id를 가지고 "/user/유저id" 엔드포인트로 요청해 사용자 정보를 불러옴.
                const res = await getApi(`user/${ownerId}`);

                // 사용자 정보는 response의 data임.
                const ownerData = res.data.userInfo;
                // portfolioOwner을 해당 사용자 정보로 세팅함.
                setUser(ownerData);
                // fetchOwner 과정이 끝났으므로, isFetchCompleted를 true로 바꿈.
                setIsFetchOwnerCompleted(true);
            } catch (err) {
                if (err.response.data.message) {
                    alert(err.response.data.message);
                } else {
                    alert('라우팅 경로가 잘못되었습니다.');
                }
            }
        },
        [userId],
    );

    const fetchRank = useCallback(async () => {
        try {
            const res = await getApi('rank/list');
            const ownerData = res.data;
            setRankList(ownerData.rankList);

            const point = await getApi('user/point');
            setPoint(point.data.userPoint.accuPoint);

            setIsFetchRankCompleted(true);
        } catch (err) {
            if (err.response.data.message) {
                alert(err.response.data.message);
            } else {
                alert('라우팅 경로가 잘못되었습니다.');
            }
        }
    }, []);

    useEffect(() => {
        fetchRank();
        fetchOwner(userId);
    }, [fetchRank, fetchOwner]);

    if (!isFetchOwnerCompleted && !isFetchRankCompleted) {
        return <Loading />;
    }

    return (
        <div className=" flex justify-center w-full items-center">
            <div>
                <div>
                    <RankPageSentence />
                </div>
                <div>
                    <PointBar point={point} />
                </div>
                <div>
                    <UserCard user={user} point={point} />
                </div>
                <p>랭킹</p>
                <div>
                    {rankList.map((owner, index) => (
                        <div key={owner.userId} onClick={() => navigate(`/mypage/${owner.userId}`)}>
                            <RankCard user={owner} index={index + 1} />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Rank;
