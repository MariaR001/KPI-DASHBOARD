import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface GraphData {
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  data: { name: string; value: number }[];
}

interface GraphComponentProps {
  data: GraphData;
  width: number;
  height: number;
}

const GraphComponent: React.FC<GraphComponentProps> = ({ data, width, height }) => {
  return (
    <div style={{ width: '100%', textAlign: 'center', justifyContent: 'center' }}>
      <h3>{data.title}</h3>
      <div style={{ display: 'inline-block', width: width, height: height }}>
        <BarChart
          width= {width}
          height={height}
          data={data.data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#8884d8" />
        </BarChart>
      </div>
      <p>X-Axis Title: {data.xAxisTitle}</p>
      <p>Y-Axis Title: {data.yAxisTitle}</p>
    </div>
  );
};

export default GraphComponent;