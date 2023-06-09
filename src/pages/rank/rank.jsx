import React, { useState, useContext, useEffect } from 'react';
import * as Api from '../../../api';
// import Navigator from '../../sections/navigator';
import Header from '../../sections/header';
import RankCard from '../../components/rankcard/rankcard';
import UserCard from '../../components/usercard/usercard';
import RankPageSentence from '../../components/rankpagesentence/rankpagesentence';
import { UserStateContext } from '../../../App';
import { useNavigate, useParams } from 'react-router-dom';
import PointBar from '../../components/pointbar/pointbar';

function Rank() {
    const navigate = useNavigate();
    const userState = useContext(UserStateContext);
    // const [users, setUsers] = useState([])
    const [rankList, setRankList] = useState([]);
    const userId = userState.id;
    const [owner, setOwner] = useState(
        {
            id: 1,
            image: "http://placekitten.com/200/200",
            nickname : "애호박",
            accPoint: 2000
        }
        // Add more users as needed
    );


    const [point, setPoint] = useState(200);
    const pointMax = 1000;
    
    const fetchRank = async (ownerId) => {
        try {
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
        fetchRank({ userId });
    }, [userState, navigate]);

    return (
        <div>
            <div className="headerSection" style={{ height: '20px' }}></div>
            <div>
                <RankPageSentence />
            </div>
            <div>
                <PointBar point={point} pointMax={pointMax} />
            </div>
            <div>
                <UserCard owner={owner}/>
            </div>
            <div className="headerSection" style={{ height: '50px' }}></div>
            <p>랭킹</p>
            <div className='w-full'>
                {rankList.map((user, index) => (
                    <div key={user.userId}>
                        <RankCard user={user} index={index + 1} />
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Rank;
