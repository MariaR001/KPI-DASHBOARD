import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Config } from "../backend/Types";
import { Tile } from "../backend/Types";
import YAML from "yaml";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./App.css";
import DisplayData from "./components/DisplayData";

const ResponsiveGridLayout = WidthProvider(Responsive);

const MyGrid: React.FC = () => {
  const [isDraggable, setIsDraggable] = useState(true);
  const [config, setConfig] = useState<Config | null>(null);
  const [layout, setLayout] = useState<Tile[]>([]);
  const [counter, setCounter] = useState(layout.length);

  const onLayoutChange = async (newLayout: any) => {
    if (!newLayout) {
      return;
    }

    const newConfig: Config = {
      tiles: newLayout.map((item: any, index: number) => ({
        i: layout[index].i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
        representation: layout[index].representation,
        dataset: layout[index].dataset,
      })),
    };

    await setConfig(newConfig);
    await storeConfig(newConfig);
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
    setLayout((prevLayout) => prevLayout.filter((item) => item.i !== i));
  };

  const addItem = () => {
    let newCounter = counter;
    const isIndexInUse = (item: any) => item.i === newCounter;

    while (layout.some(isIndexInUse)) {
      newCounter++;
    }

    const newItem = {
      i: newCounter as unknown as string,
      x: (layout.length * 2) % 12,
      y: Infinity,
      w: 2,
      h: 2,
      representation: "",
      dataset: "",
    } as Tile;

    const newLayout = [...layout, newItem];

    setCounter(counter + 1);
    setLayout(newLayout);
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

 

  const data = {
    numberTextEmojiData: { value: 95, title: "Sample Number Display" },
    gaugeComponentValue: { value: 0.75, title: "Sample Gauge Display" },
    listComponentData: {
      items: [
        { label: "Item 1", value: 10 },
        { label: "Item 2", value: 20 },
        { label: "Item 3", value: 30 },
      ],
    },
    tableComponentData: {
      title: "Sample Table",
      columns: [
        { label: "Name", key: "name" },
        { label: "Age", key: "age" },
      ],
      rows: [
        { name: "John", age: 30 },
        { name: "Jane", age: 25 },
        { name: "Doe", age: 40 },
      ],
    },
    barGraphData: {
      title: "Sample Bar Graph",
      xAxisTitle: "Months",
      yAxisTitle: "Sales",
      data: [
        { name: "Jan", value: 100 },
        { name: "Feb", value: 150 },
        { name: "Mar", value: 200 },
        { name: "Apr", value: 250 },
        { name: "May", value: 300 },
        { name: "Jun", value: 350 },
        { name: "Jul", value: 400 },
        { name: "Aug", value: 450 },
        { name: "Sep", value: 500 },
        { name: "Oct", value: 550 },
        { name: "Nov", value: 600 },
        { name: "Dec", value: 650 },
      ],
    },
    linegraphData: {
      title: "Sample Line Graph",
      data: [
        { name: "Jan", value: 100 },
        { name: "Feb", value: 150 },
        { name: "Mar", value: 200 },
        { name: "Apr", value: 250 },
        { name: "May", value: 300 },
        { name: "Jun", value: 350 },
        { name: "Jul", value: 400 },
        { name: "Aug", value: 450 },
        { name: "Sep", value: 500 },
        { name: "Oct", value: 550 },
        { name: "Nov", value: 600 },
        { name: "Dec", value: 650 },
      ],
      lineKey: "value",
      xAxisTitle: "Months",
      yAxisTitle: "Sales",
    },
  };

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
        compactType={null}
      >
        {layout?.map((item, index) => (
          <div key={index} className="grid-item">
            <div className="tile-content" style={{ position: "relative" }}>
            </div>
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
            <div className="tile-content">
              <h2>
                Tile {item.i} 
                <div style={{ position: "relative", justifyContent:"center", alignItems: "center", display:"flex" }}>
                  <DisplayData tile={item} data={data} />
                </div>
              </h2>    
            </div>
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

export default MyGrid;
