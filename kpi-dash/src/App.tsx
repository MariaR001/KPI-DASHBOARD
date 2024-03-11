import React, { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Config } from "../backend/Types";
import { Tile } from "../backend/Types";

import YAML from "yaml";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./App.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const MyGrid: React.FC = () => {
  const [isDraggable, setIsDraggable] = useState(true);
  const [config, setConfig] = useState<Config | null>(null);
  const [layout, setLayout] = useState<Tile[]>([]);
  const [counter, setCounter] = useState(layout.length);

  useEffect(() => {
    console.log(counter);
  });

  const onLayoutChange = (newLayout: any) => {
    if (!newLayout) {
      return;
    }

    const newConfig: Config = {
      tiles:
        newLayout?.map((item: any) => {
          return {
            i: item.i,
            x: item.x,
            y: item.y,
            w: item.w,
            h: item.h,
            representation: "",
            dataset: "",
          };
        }) || [],
    };

    setConfig(newConfig);
    storeConfig(newConfig);
    loadConfig();
  };

  const loadConfig = async () => {
    try {
      const response = await fetch("http://localhost:3002/config");
      const configString = await response.text();

      const config: Config = YAML.parse(configString);
      setConfig(config);
      setLayout(config.tiles);
    } catch (error) {
      console.error("Error loading config", error);
    }
  };

  const storeConfig = async (config: Config) => {
    try {
      const configString = JSON.stringify(config);
      await fetch("http://localhost:3002/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: configString,
      });
    } catch (error) {
      console.error("Error storing config", error);
    }
  };

  const removeItem = (i: string) => {
    setLayout(layout.filter((item) => item.i !== i));
  };

  const addItem = () => {
    const newItem = {
      i: counter.toString(),
      x: (layout.length * 2) % 12, // Add horizontally first
      y: Infinity, // Then vertically
      w: 2,
      h: 2,
      representation: "",
      dataset: "",
    };
    setLayout(layout.concat(newItem));
    setCounter(counter + 1);
  };

  const handleMouseDown = () => {
    setIsDraggable(false);
  };

  const handleMouseUp = () => {
    setIsDraggable(true);
  };

  if (!config) {
    loadConfig();
  }

  return (
    <div className="dashboard">
      <div className="grid-controls">
        <button onClick={addItem} className="add-tile-button">
          Add Tile
        </button>
      </div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 6, md: 6, sm: 3, xs: 2, xxs: 1 }}
        rowHeight={180}
        onLayoutChange={onLayoutChange}
        isDraggable={isDraggable}
      >
        {layout?.map((item, index) => (
          <div
            key={index}
            style={{ border: "1px solid #ccc", position: "relative" }}
          >
            <span className="text">{item.i}</span>
            <div
              className="remove"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={(e) => {
                e.stopPropagation();
                removeItem(item.i);
              }}
            >
              X
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default MyGrid;
