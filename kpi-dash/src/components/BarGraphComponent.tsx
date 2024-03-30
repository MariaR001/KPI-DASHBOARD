import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useRef, useState, useEffect } from "react";

interface GraphData {
  title: string;
  xAxisTitle: string;
  yAxisTitle: string;
  data: { name: string; value: number }[];
}

interface GraphComponentProps {
  data: GraphData;
}

const GraphComponent: React.FC<GraphComponentProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    console.log("COMPONENT CHANGING");
    const updateSize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        setContainerSize({ width, height });
      }
    };

    const currentContainerRef = containerRef.current;

    const resizeObserver = new ResizeObserver(updateSize);
    if (currentContainerRef) {
      resizeObserver.observe(currentContainerRef);
    }

    updateSize();

    return () => {
      if (currentContainerRef) {
        resizeObserver.unobserve(currentContainerRef);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        height: "70%",
        width: "95%",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <p>{data.title}</p>
      <BarChart
        width={containerSize.width}
        height={containerSize.height}
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
      <p>X-Axis Title: {data.xAxisTitle}</p>
      <p>Y-Axis Title: {data.yAxisTitle}</p>
    </div>
  );
};

export default GraphComponent;
