import React, { useState, useEffect } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import { Config, Tile, TileData } from "../backend/Types";
import YAML from "yaml";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import "./App.css";
import DisplayData from "./components/DisplayData";

const ResponsiveGridLayout = WidthProvider(Responsive);

const MyGrid: React.FC = () => {
  const [isDraggable, setIsDraggable] = useState(true);
  const [layout, setLayout] = useState<Tile[]>([]);

  const [ids, setIds] = useState<Array<TileData>>([]);

  const [config, setConfig] = useState<Config | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const onLayoutChange = async (newLayoutArg: any) => {
    const newLayout = newLayoutArg.map((item: any, index: number) => {
      const tileData = ids[index];
      return {
        ...item,
        id: tileData.id,
        representation: tileData.representation,
        dataset: tileData.dataset,
        data: tileData.data,
      };
    });

    console.log("Layout Changed", newLayout);

    setLayout(newLayout);
  };

  // Fetches and Loads the layout and the tiles from the yaml file in the backend
  const loadConfig = async () => {
    try {
      const response = await fetch("http://localhost:3002/config");
      const configString = await response.text();

      const parsedConfig: Config = YAML.parse(configString);

      const tilesWithIds = await Promise.all(
        parsedConfig.tiles.map(async (tile) => {
          let fileData = null;

          if (tile.dataset) {
            const relativeFilePath = tile.dataset.replace(
              /^.*[\\/]uploads[\\/]/,
              ""
            );
            const fileResponse = await fetch(
              `http://localhost:3002/file/${relativeFilePath}`
            );
            fileData = await fileResponse.json();
          }

          return {
            ...tile,
            id: tile.id,
            dataset: tile.dataset,
            data: fileData,
          };
        })
      );

      setConfig(parsedConfig);

      setIds(
        tilesWithIds.map((tile) => ({
          id: tile.id,
          representation: tile.representation,
          dataset: tile.dataset,
          data: tile.data,
        }))
      );

      setLayout(tilesWithIds);
      setIsLoading(false);
    } catch (error) {
      console.error("Error loading config", error);
    }
  };

  // Stores the current configuration of the tiles in the yaml file in the backend
  const storeConfig = async (config: Config) => {
    try {
      const response = await fetch("http://localhost:3002/config", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(config),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error storing config", error);
    }
  };

  // Logic to remove a Tile from the Layout
  const removeItem = async (tile: Tile) => {
    setLayout((prevLayout) => {
      const newLayout = prevLayout.filter((item) => item.id !== tile.id);

      setIds((prevIds) =>
        prevIds.filter((tileData) => tileData.id !== tile.id)
      );
      return newLayout;
    });
  };

  // Logic to add a Tile to the Layout
  const addItem = async () => {
    const columns = 6;
    const columnHeights = new Array(columns).fill(0);

    layout.forEach((item) => {
      for (let i = item.x; i < item.x + item.w; i++) {
        columnHeights[i] = Math.max(columnHeights[i], item.y + item.h);
      }
    });

    const x = columnHeights.indexOf(Math.min(...columnHeights));
    const y = columnHeights[x];

    let newId: string;
    if (layout.length === 0) {
      newId = "n0";
    } else {
      const maxId = Math.max(
        ...layout.map((tile) => parseInt(tile.id.replace("n", "")))
      );
      newId = `n${maxId + 1}`;
    }

    const newItem = {
      i: layout.length.toString(),
      id: newId,
      x: x,
      y: y,
      w: 1,
      h: 1,
      representation: "",
      dataset: "",
    };

    setLayout((prevLayout) => {
      const newLayout = [...prevLayout, newItem];

      return newLayout;
    });

    // setIds((prevIds) => [...prevIds, newItem.id]);
    setIds((prevIds) => [
      ...prevIds,
      { id: newId, representation: "", dataset: "", data: {} },
    ]);
  };

  const updateTileRepresentation = (
    tileIndex: string,
    newRepresentation: string
  ) => {
    const index = parseInt(tileIndex, 10);

    setIds((prevIds) =>
      prevIds.map((item, i) =>
        i === index ? { ...item, representation: newRepresentation } : item
      )
    );

    setLayout((prevLayout) =>
      prevLayout.map((tile, i) =>
        i === index ? { ...tile, representation: newRepresentation } : tile
      )
    );
  };

  const updateTileDataset = (tileIndex: string, newDataset: string) => {
    const index = parseInt(tileIndex, 10);

    setIds((prevIds) =>
      prevIds.map((item, i) =>
        i === index ? { ...item, dataset: newDataset } : item
      )
    );

    setLayout((prevLayout) =>
      prevLayout.map((tile, i) =>
        i === index ? { ...tile, dataset: newDataset } : tile
      )
    );
  };

  const updateTileData = (tileIndex: string, newData: any) => {
    const index = parseInt(tileIndex, 10);

    setIds((prevIds) =>
      prevIds.map((item, i) =>
        i === index ? { ...item, data: newData } : item
      )
    );

    setLayout((prevLayout) =>
      prevLayout.map((tile, i) =>
        i === index ? { ...tile, data: newData } : tile
      )
    );
  };

  const handleMouseDown = () => {
    setIsDraggable(false);
  };

  const handleMouseUp = () => {
    setIsDraggable(true);
  };

  useEffect(() => {
    const storeConfigAsync = async () => {
      if (layout.length === 0 && isLoading) {
        return;
      }

      const newConfig = {
        tiles: layout,
      };

      setConfig(newConfig);
      await storeConfig(newConfig);
    };

    console.log("Storing Config");
    storeConfigAsync();
  }, [layout, isLoading]);

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
        isDraggable={isDraggable}
        compactType={null}
        onLayoutChange={onLayoutChange}
      >
        {layout.map((item, index) => (
          <div key={index} className="grid-item">
            <div
              className="tile-content"
              style={{ position: "relative" }}
            ></div>
            <div
              className="remove"
              onMouseDown={handleMouseDown}
              onMouseUp={handleMouseUp}
              onClick={() => {
                removeItem(item);
              }}
            >
              X
            </div>
            <div className="tile-content">
              <h2>
                {item.id}{" "}
                <div
                  style={{
                    position: "relative",
                    justifyContent: "center",
                    alignItems: "center",
                    display: "flex",
                  }}
                >
                  <DisplayData
                    tile={item}
                    data={ids.find((data) => data.id === item.id)?.data}
                    updateTileRepresentation={updateTileRepresentation}
                    updateTileDataset={updateTileDataset}
                    updateTileData={updateTileData}
                  />
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
