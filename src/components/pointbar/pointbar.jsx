import React, { useMemo } from 'react';

const PointBar = ({ point }) => {
    const pointMax = 14000;

    const percentage = (point / pointMax) * 100;

    return (
        <div className="w-full h-4 bg-gray-200 rounded-full">
            <div className="h-full text-xs text-white bg-green-700 rounded-full" style={{ width: `${percentage}%` }}></div>
        </div>
    );
};

export default PointBar;
