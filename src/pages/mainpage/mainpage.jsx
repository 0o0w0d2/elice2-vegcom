import React, { useEffect, useState } from 'react';
import BarGraph from '../../components/datagraph/bargraph';
import LineGraph from '../../components/datagraph/linegraph';
import CO2BarGraph from '../../components/datagraph/co2bargraph';
import PieGraph from '../../components/datagraph/piegraph';
// import { Animator, ScrollContainer, ScrollPage, batch, Fade, FadeIn, FadeOut, Move, MoveIn, MoveOut, Sticky, StickyIn, StickyOut, Zoom, ZoomIn, ZoomOut } from "react-scroll-motion";
import AOS from 'aos';
import 'aos/dist/aos.css';

function MainPage() {
    useEffect(() => {
        AOS.init({ duration: 2000 });
    }, []);

    return (
        <div>
            <div className="p-4 ">
                <div className="items-center justify-center text-3xl font-sans font-bold">
                    <div className="flex items-center justify-center">
                        <img src="/logolong.png" alt="오채완 로고" className="logo"></img>
                    </div>
                </div>
            </div>

            <div className="space-y-80 font-['NanumSquareNeo-Variable']">
                <div className="flex justify-start items-center ">
                    <div className="w-1/2 text-center text-5xl text-[#0D0D0D]">
                        <span>
                            하루 한 끼 채식,
                            <br></br>
                            <br></br>
                            지구의 내일을 바꿉니다.
                        </span>
                    </div>
                    <img className="w-30 h-30" src={'/tree2.png'} alt={1} />
                </div>

                <div className="flex mt-10"></div>
                <div className="flex justify-start items-center space-x-10 ">
                    <div className="text-center space-y-10" data-aos="fade-right">
                        <div className="text-3xl text-[#0D0D0D] font-['NanumSquareNeo-Variable2']">
                            <span>
                                더욱더 심각해지는 지구온난화
                                <br></br>
                                전세계적인 트랜드 탄소 배출량 감소
                            </span>
                        </div>
                        <div className="text-2xl">
                            <p>최근 탄소 배출량을 감소시키는 것이 전세계적인 이슈로 떠올랐습니다. 지구의 평균 온도 상승을</p>
                            <p>막고 지속 가능한 발전을 위해 국가적, 개인적 차원에서 많은 노력이 이뤄지고 있습니다.</p>
                        </div>
                    </div>
                    <img
                        style={{ width: '30.075rem', height: '20.075rem' }}
                        data-aos="fade-left"
                        src={
                            'https://images.unsplash.com/photo-1569163139500-66446e2926ca?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80'
                        }
                        alt={2}
                    />
                </div>

                <div className="flex justify-center items-center">
                    <div className="text-center space-y-10">
                        <div className="text-3xl text-[#0D0D0D] font-['NanumSquareNeo-Variable2']" data-aos="fade-down">
                            <span>
                                온실가스 총 배출량 줄어들었지만
                                <br></br>
                                축산업 분야에서는 증가
                            </span>
                        </div>

                        <div className="text-2xl" data-aos="fade-down">
                            <span>
                                이러한 노력의 결과 한국에서의 온실가스 총 배출량 또한 매년 줄어들고 있습니다. 그러나 이와 상반되게
                                축산업
                                <br></br>
                                분야에서 나오는 온실가스의 양은 증가하고 있습니다.
                            </span>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} data-aos="fade-down">
                            <LineGraph />
                        </div>
                    </div>
                </div>

                <div className="flex justify-start items-center space-x-40">
                    <div className="w-30 h-30" data-aos="fade-left">
                        <PieGraph />
                    </div>
                    <div className="text-center">
                        <div className="space-y-10" data-aos="fade-left">
                            <div className="text-3xl text-[#0D0D0D] font-['NanumSquareNeo-Variable2']">
                                <span>
                                    전체 온실가스 배출량의 22.38%,
                                    <br></br>
                                    축산업이 차지
                                </span>
                            </div>
                            <div className="text-2xl">
                                <span>
                                    더 자세히 살펴보면 2020년 축산업이 배출하는
                                    <br></br>
                                    온실가스 비중이 전체 온실가스 배출량의 22.38%를
                                    <br></br>
                                    차지한다는 것을 확인 할 수 있습니다.
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex justify-start items-center space-x-40">
                    <div className="text-center">
                        <div className="space-y-10" data-aos="fade-right">
                            <div className="text-3xl text-[#0D0D0D] font-['NanumSquareNeo-Variable2']">
                                <span>
                                    육식의 탄소배출량
                                    <br></br>
                                    채식의 11배
                                </span>
                            </div>
                            <div className="text-2xl">
                                <span>
                                    또한 음식을 채식, 육식, 생선, 기타로 분류해
                                    <br></br>
                                    제작과 이동 등 생산과정에서 나오는 모든 탄소배출량을 평균내어
                                    <br></br>
                                    비교해본 결과 육식의 탄소배출량이 채식에 비해 현저히 많다는 것을
                                    <br></br>
                                    확인 할 수 있었습니다.
                                </span>
                            </div>
                        </div>
                    </div>
                    <div className="w-30 h-30" data-aos="fade-right">
                        <CO2BarGraph />
                    </div>
                </div>

                <div className="flex justify-center items-center space-x-40 space-y-24">
                    <div className="space-y-80">
                        <div className="space-y-60">
                            <div data-aos="zoom-in">
                                <span className="font-['NanumSquareNeo-Variable2'] text-5xl text-green-900">오채완에서는?</span>
                            </div>
                            <div className="space-y-10" data-aos="fade-down">
                                <div>
                                    <span className="text-4xl text-[#14A492]">나의 식단을 기록하고 공유해요</span>
                                </div>
                                <div className="flex justify-center items-center space-x-32">
                                    <div className="flex-1 flex justify-center">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={'https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg'}
                                            alt={1}
                                        />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={'https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg'}
                                            alt={2}
                                        />
                                    </div>
                                    <div className="flex-1 flex justify-center">
                                        <img
                                            className="w-full h-full object-cover"
                                            src={'https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg'}
                                            alt={3}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-10" data-aos="fade-down">
                            <div className="space-y-10">
                                <span className="text-4xl text-[#14A492]">탄소 감축 포인트를 쌓아요</span>
                            </div>
                            <div className="flex justify-center items-center">
                                <img
                                    className="w-90wv h-90wv object-cover"
                                    src={'https://cdn.pixabay.com/photo/2015/12/09/17/11/vegetables-1085063_640.jpg'}
                                    alt={3}
                                />
                            </div>
                        </div>

                        <div className="flex justify-center mt-4" data-aos="flip-right">
                            <a
                                href="/login"
                                className="bg-green-500 hover:bg-green-700 text-4xl text-white py-12 px-24 rounded-3xl inline-flex items-center">
                                <span>지금 시작하기</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    className="ml-2 w-4 h-4">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                </svg>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default MainPage;
