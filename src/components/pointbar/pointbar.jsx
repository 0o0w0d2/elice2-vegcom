import React from 'react';

const PointBar = ({ point }) => {
    let pointMax = 0;

    if (point < 14000) {
        pointMax = 14000;
    } else if (point < 60000) {
        pointMax = 60000;
    } else if (point < 180000) {
        pointMax = 180000;
    } else if (point < 360000) {
        pointMax = 360000;
    } else if (point < 720000) {
        pointMax = 720000;
    }

    const percentage = (point / pointMax) * 100;

    return (
        <div className="w-full h-4 bg-gray-200 rounded-full">
            <div className="h-full text-xs text-white bg-green-700 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export default PointBar;
