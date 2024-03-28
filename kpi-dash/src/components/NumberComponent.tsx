import React from 'react';

interface NumberData {
  value: number;
  title: string;
}

interface NumberComponentProps {
  data: NumberData;
  height: number;
  width: number;
}

const NumberComponent: React.FC<NumberComponentProps> = ({ data, height, width }) => {
  // Determine emoji based on the value
  let emoji;
  let color;

  if (data.value >= 80) {
    emoji = '😄'; // happy face emoji
    color = 'green';
  } else if (data.value >= 50) {
    emoji = '😐'; // neutral face emoji
    color = 'orange';
  } else {
    emoji = '😞'; // sad face emoji
    color = 'red';
  }

  return (
    <div style={{ textAlign: 'center', justifyContent: 'center', width, height }}>
      <h3 style={{ fontSize: '2rem'}}>{data.title}</h3>
      <p style={{ fontSize: '2rem', color }}>Number: {data.value}{emoji}</p>
    </div>
  );
};

export default NumberComponent;