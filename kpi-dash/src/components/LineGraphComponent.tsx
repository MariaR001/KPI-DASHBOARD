import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { useRef, useState, useEffect } from "react";

interface LineGraphData {
  title: string;
  data: { name: string; value: number }[];
  lineKey: string;
  xAxisTitle?: string;
  yAxisTitle?: string;
}

interface GraphComponentProps {
  data: LineGraphData;
}

const LineGraphComponent: React.FC<GraphComponentProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  const {
    title,
    data: chartData,
    lineKey,
    xAxisTitle = "X Axis",
    yAxisTitle = "Y Axis",
  } = data;

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
        display: "inline-block",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <p>{title}</p>
      <LineChart
        width={containerSize.width}
        height={containerSize.height}
        data={chartData}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="name"
          label={{
            value: xAxisTitle,
            position: "insideBottom",
            offset: -10,
          }}
        />
        <YAxis
          label={{
            value: yAxisTitle,
            angle: -90,
            position: "insideLeft",
            offset: 0,
          }}
        />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey={lineKey}
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </div>
  );
};

export default LineGraphComponent;
