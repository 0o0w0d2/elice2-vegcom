import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserStateContext, DispatchContext } from '../../App';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ChatBubbleLeftRightIcon, TrophyIcon, ArrowLeftOnRectangleIcon } from '@heroicons/react/24/outline';

function Header() {
    const menus = [
        { name: '스토리', description: '스토리 페이지로 이동', href: '/story', icon: ChatBubbleLeftRightIcon },
        { name: '랭킹', description: '랭킹 페이지로 이동', href: '/rank/list', icon: TrophyIcon },
        // {name: '쇼핑'},
    ];
    const menusBelow = [{ name: '로그아웃', href: '/', icon: ArrowLeftOnRectangleIcon }];

    const dispatch = useContext(DispatchContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userToken');
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    // const location = useLocation();
    // console.log('useLocation', location);
    // const userState = useContext(UserStateContext);
    // console.log('state', userState);

    // const navigate = useNavigate();

    // const dispatch = useContext(DispatchContext);

    // const isLogin = !!userState.user;

    // // 기본 페이지로 돌아가기
    // const logout = () => {
    //     localStorage.removeItem('userToken');
    //     dispatch({ type: 'LOGOUT' });
    //     navigate('/');
    // };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 p-4 flex items-center justify-between p-4"
            style={{ height: '150px', backgroundColor: 'white' }}>
            <div className="logo">
                <div className="logo-container flex justify-center items-center">
                    <img src="/logoshort.png" alt="오채완 로고" className="h-full logo"></img>
                </div>
            </div>
            <div>
                <Popover className="relative mr-8">
                    <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                        <span>메뉴</span>
                        <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                    </Popover.Button>
                    <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1">
                        <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                            <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {menus.map(item => (
                                        <div
                                            key={item.name}
                                            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <item.icon
                                                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div>
                                                <div
                                                    className="font-semibold text-gray-900 text-left"
                                                    onClick={() => navigate(item.href)}>
                                                    {item.name}
                                                </div>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                    {menusBelow.map(item => (
                                        <div
                                            key={item.name}
                                            onClick={item.name === '로그아웃' ? logout : null}
                                            href={item.href}
                                            className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                                            <item.icon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                            {item.name}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </Popover.Panel>
                    </Transition>
                </Popover>
            </div>
        </header>
    );
}

export default Header;
