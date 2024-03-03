import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

interface GraphData {
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  data: { name: string; value: number }[];
}

const GraphComponent: React.FC<{ data: GraphData }> = ({ data }) => {
  return (
    <div>
      <h3>{data.title}</h3>
      <p>X-Axis Title: {data.xAxisTitle}</p>
      <p>Y-Axis Title: {data.yAxisTitle}</p>
      <div style={{ position: "relative", justifyContent:"center", alignItems: "center", display:"flex" }}>
        <BarChart
          width={600}
          height={300}
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
    </div>
  );
};

export default GraphComponent;