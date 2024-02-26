import React from 'react';

interface NumberProps {
    value: number;
}

const NumberComponent: React.FC<NumberProps> = ({ value }) => {
    return <div>{value}</div>;
};

export default NumberComponent;