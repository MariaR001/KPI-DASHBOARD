import React from "react";
import { useRef, useState, useEffect } from "react";

interface NumberData {
  value: number;
  title: string;
}

interface NumberComponentProps {
  data: NumberData;
}

const NumberComponent: React.FC<NumberComponentProps> = ({ data }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });

  // Determine emoji based on the value
  let emoji;
  let color;

  if (data.value >= 80) {
    emoji = "😄"; // happy face emoji
    color = "green";
  } else if (data.value >= 50) {
    emoji = "😐"; // neutral face emoji
    color = "orange";
  } else {
    emoji = "😞"; // sad face emoji
    color = "red";
  }

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
        textAlign: "center",
        justifyContent: "center",
        height: "70%",
        width: "95%",
      }}
    >
      <h3 style={{ fontSize: "2rem" }}>{data.title}</h3>
      <p style={{ fontSize: "2rem", color }}>
        Number: {data.value}
        {emoji}
      </p>
    </div>
  );
};

export default NumberComponent;
