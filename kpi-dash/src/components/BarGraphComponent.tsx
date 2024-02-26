import React from 'react';

interface BarGraphProps {
    data: number[];
}

const BarGraphComponent: React.FC<BarGraphProps> = ({ data }) => {
    return (
        <div>
            Bar Graph:
            {data.map((value, index) => (
                <div key={index} style={{ height: `${value}px`, width: '20px', backgroundColor: 'blue', display: 'inline-block', margin: '2px' }} />
            ))}
        </div>
    );
};

export default BarGraphComponent;
