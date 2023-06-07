import React, { useState } from 'react';

function MainPage() {
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
        <div>
            <img
                onMouseEnter={handleLogoMouseEnter}
                onMouseLeave={handleLogoMouseLeave}
                src={getLogoSrc()}
                alt="오채완 로고"
                className="logo"></img>
            <p>
                <a href="/login">로그인하기</a>
                <br />
                <a href="/register">회원가입하기</a>
            </p>
        </div>
    );
}

export default MainPage;
