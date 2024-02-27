import React, { useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Config } from "../backend/Types";

import * as YAML from "yaml";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

const MyGrid: React.FC = () => {
  const [config, setConfig] = useState<Config | null>(null);
  const [layout, setLayout] = useState([
    { i: "1", x: 0, y: 0, w: 1, h: 2 },
    { i: "2", x: 1, y: 0, w: 1, h: 2 },
    { i: "3", x: 2, y: 0, w: 1, h: 2 },
  ]);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);

    const newConfig: Config = {
      tiles: newLayout.map((item: any) => {
        return {
          id: item.i,
          x: item.x,
          y: item.y,
          width: item.w,
          height: item.h,
          representation: "",
          dataset: "",
        };
      }),
    };

    setConfig(newConfig);
    storeConfig(newConfig);
  };

  const loadConfig = async () => {
    try {
      const response = await fetch("http://localhost:3002/config");
      const configString = await response.text();

      const config: Config = YAML.parse(configString);
      setConfig(config);
    } catch (error) {
      console.error("Error loading config", error);
    }
  };

  const storeConfig = async (config: Config) => {
    try {
      const configString = YAML.stringify(config);
      await fetch("http://localhost:3002/config", {
        method: "POST",
        body: configString,
      });
    } catch (error) {
      console.error("Error storing config", error);
    }
  };

  const removeItem = (i: string) => {
    setLayout(layout.filter((item) => item.i !== i));
  };

  if (config !== null) {
    loadConfig();
  }

  return (
    <div>
      <ResponsiveGridLayout
        className="layout"
        layouts={{ lg: layout }}
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
        cols={{ lg: 3, md: 3, sm: 2, xs: 1, xxs: 1 }}
        rowHeight={100}
        onLayoutChange={onLayoutChange}
      >
        {layout.map((item) => (
          <div
            key={item.i}
            style={{ border: "1px solid #ccc", position: "relative" }}
          >
            <span className="text">{item.i}</span>
            <div
              className="remove"
              onClick={() => removeItem(item.i)}
              style={{
                position: "absolute",
                top: "5px",
                right: "5px",
                cursor: "pointer",
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
