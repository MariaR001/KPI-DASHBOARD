import React from "react";
import { useRef, useState, useEffect } from "react";

interface ListItem {
  label: string;
  value: number;
}

interface ListData {
  items: ListItem[];
}

interface ListComponentProps {
  data: ListData;
}

const ListComponent: React.FC<ListComponentProps> = ({ data }) => {
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
        display: "inline-block",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <p>List</p>
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>
            {item.label}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
