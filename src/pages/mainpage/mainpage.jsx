import React from 'react';

function MainPage() {
    return (
        <div>
            
            
            <div className='p-4 -m-20'>
                <p className='text-3xl font-sans font-bold'>
                        <img
                        src="/logoshort.png"
                        alt="오채완 로고"
                        className="logo h-45 w-45 inline-block -mr-10 mb-14"
                        ></img>

                    
                    에서 함께
                    <span className='text-green-700'>
                        탄소 배출 감축
                    </span>
                    을 실현해요!
                </p>
            </div>
            <div class="hidden w-full md:block md:w-auto" id="navbar-default">
                <ul class="font-medium flex flex-col items-center justify-center p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                    <li>
                        <a href="/login" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">로그인하기</a>
                    </li>
                    <li>
                        <a href="/register" class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">회원가입하기</a>
                    </li>
                </ul>
            </div>
            {/* <p>
                <a href="/login">로그인하기</a>
                <br />
                <a href="/register">회원가입하기</a>
            </p> */}
        </div>
        
    );
}

export default MainPage;

