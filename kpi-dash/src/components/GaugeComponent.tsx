import React from "react";
import { useRef, useState, useEffect } from "react";
import * as GaugeChartModule from "react-gauge-chart";

const GaugeChart = GaugeChartModule.default;

interface GaugeData {
  value: number;
  title: string;
}

interface GaugeComponentProps {
  data: GaugeData;
}

const GaugeComponent: React.FC<GaugeComponentProps> = ({ data }) => {
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
        overflowX: "auto",
        overflowY: "auto",
      }}
    >
      <p>{data.title}</p>
      <GaugeChart
        id="gauge-chart1"
        nrOfLevels={20}
        colors={["#FF5F6D", "#FFC371"]}
        arcWidth={0.3}
        percent={data.value}
        textColor={"#000"}
        needleColor={"#000"}
      />
    </div>
  );
};

export default GaugeComponent;
