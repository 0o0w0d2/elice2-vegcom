import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DispatchContext } from '../../App';

import { Fragment } from 'react';
import { Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
    UserCircleIcon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    TrophyIcon,
    ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

function Header() {
    const userId = localStorage.getItem('userId');
    const menus = [
        { name: '스토리', description: '스토리 페이지', href: '/story', icon: ChatBubbleLeftRightIcon },
        { name: '랭킹', description: '랭킹 페이지', href: '/rank', icon: TrophyIcon },
        { name: '마이페이지', description: '마이페이지', href: `/mypage/${userId}`, icon: UserCircleIcon },
        // {name: '쇼핑'},
    ];

    const dispatch = useContext(DispatchContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userToken');
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    const [isLogoHovered, setIsLogoHovered] = useState(false);

    const handleLogoMouseEnter = () => {
        setIsLogoHovered(true);
    };

    const handleLogoMouseLeave = () => {
        setIsLogoHovered(false);
    };

    const getLogoSrc = () => {
        return isLogoHovered ? '/logolong.png' : '/logoshort.png';
    };

    return (
        <header
            className="fixed top-0 left-0 right-0 z-50 p-4 flex  shadow-md justify-center grid-cols-3"
            style={{ height: '120px', backgroundColor: 'white' }}>
            <div className="col-start-1 " style={{ width: '20vw' }}></div>
            <div className="col-start-2 items-center justify-center" style={{ width: '60vw' }}>
                <img
                    onClick={() => navigate('/rank')}
                    onMouseEnter={handleLogoMouseEnter}
                    onMouseLeave={handleLogoMouseLeave}
                    src={getLogoSrc()}
                    alt="오채완 로고"
                    className="logo"></img>
            </div>
            <div className="col-start-3 justify-center justify-end" style={{ width: '20vh' }}>
                <Popover className="mr-8">
                    <Popover.Button className="inline-flex gap-x-1 text-sm font-semibold leading-6 text-gray-900">
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
                        <Popover.Panel
                            className="relative left-1/2 z-10 mt-5 flex w-screen -translate-x-1/2 px-4"
                            style={{ maxWidth: '300px' }}>
                            <div className="w-screen max-w-full flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                <div className="p-4">
                                    {menus.map(item => (
                                        <div
                                            key={item.name}
                                            onClick={() => navigate(item.href)}
                                            className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                <item.icon
                                                    className="h-6 w-6 text-gray-600 group-hover:text-indigo-600"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                            <div>
                                                <div className="font-semibold text-gray-900 text-left">{item.name}</div>
                                                <p className="mt-1 text-gray-600">{item.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
                                    <div
                                        onClick={() => navigate('/useredit')}
                                        className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                                        <UserIcon className="h-5 w-5 flex-none text-gray-400" aria-hidden="true" />
                                        정보 수정
                                    </div>
                                    <div
                                        onClick={() => logout()}
                                        className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100">
                                        <ArrowLeftOnRectangleIcon
                                            className="h-5 w-5 flex-none text-gray-400"
                                            aria-hidden="true"
                                        />
                                        로그아웃
                                    </div>
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
