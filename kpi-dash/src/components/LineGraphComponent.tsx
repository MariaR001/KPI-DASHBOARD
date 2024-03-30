import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface LineGraphData {
  title: string;
  data: { name: string; value: number }[];
  lineKey: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
}

interface GraphComponentProps {
  data: LineGraphData;
  height: number;
  width: number;
}

const LineGraphComponent: React.FC<GraphComponentProps> = ({ data, width, height }) => {
  const { title, data: chartData, lineKey, xAxisTitle = 'X Axis', yAxisTitle = 'Y Axis' } = data;

  return (
    <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
      <h2>{title}</h2>
      <div style={{ display: 'inline-block', }}>
      <LineChart width={width} height={height} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" label={{ value: xAxisTitle, position: 'insideBottom', offset: -10 }} />
        <YAxis label={{ value: yAxisTitle, angle: -90, position: 'insideLeft', offset: 0 }} />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey={lineKey} stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
      </div>
    </div>
  );
};

export default LineGraphComponent;