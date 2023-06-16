import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { DispatchContext } from '../../App';

import { Fragment } from 'react';
import { Dialog, Disclosure, Popover, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import {
    UserCircleIcon,
    ChatBubbleLeftRightIcon,
    UserIcon,
    TrophyIcon,
    ArrowLeftOnRectangleIcon,
    ArrowPathIcon,
    Bars3Icon,
    ChartPieIcon,
    CursorArrowRaysIcon,
    FingerPrintIcon,
    SquaresPlusIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';

function HeaderLogout() {
    const userId = localStorage.getItem('userId');
    const mymenu = [
        { name: '마이페이지', description: '마이페이지', href: `/mypage/${userId}`, icon: UserCircleIcon },
        { name: '정보 수정', description: '유저 정보 수정', href: `/useredit`, icon: UserIcon },
        // {name: '쇼핑'},
    ];
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const dispatch = useContext(DispatchContext);
    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem('userToken');
        dispatch({ type: 'LOGOUT' });
        navigate('/');
    };

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ');
    }

    const [isLogoHovered, setIsLogoHovered] = useState(false);

    return (
        <header className="fixed top-0 left-0 right-0 z-50" style={{ backgroundColor: 'white' }}>
            <nav className="mx-auto flex max-w-7xl items-center justify-between p-6 lg:px-8" aria-label="Global">
                <div className="flex lg:flex-1"></div>
                <div className="flex lg:hidden">
                    <button
                        type="button"
                        className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                        onClick={() => setMobileMenuOpen(true)}>
                        <span className="sr-only">Open main menu</span>
                        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                    </button>
                </div>

                <div className="hidden lg:flex lg:flex-1 lg:justify-end">
                    <a href="/login" className="text-sm font-semibold leading-6 text-gray-900 mr-5">
                        Login <span aria-hidden="true">&rarr;</span>
                    </a>
                    <a href="/register" className="text-sm font-semibold leading-6 text-gray-900">
                        Register <span aria-hidden="true">&rarr;</span>
                    </a>
                </div>
            </nav>
        </header>
    );
}

export default HeaderLogout;
