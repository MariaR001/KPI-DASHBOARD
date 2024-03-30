import React, { useState } from "react";
import GaugeComponent from "./GaugeComponent";
import TableComponent from "./TableComponent";
import ListComponent from "./ListComponent";
import NumberComponent from "./NumberComponent";
import LineGraphComponent from "./LineGraphComponent";
import GraphComponent from "./BarGraphComponent";
import { Tile } from "../../backend/Types";
import { useEffect } from "react";

interface DisplayDataProps {
  tile: Tile;
  data: any;
  updateTileRepresentation: (tileId: string, newRepresentation: string) => void;
  updateTileDataset: (tileId: string, newDataset: string) => void;
  updateTileData: (tileId: string, newData: any) => void;
}

const DisplayData: React.FC<DisplayDataProps> = ({
  tile,
  data: propData,
  updateTileRepresentation,
  updateTileDataset,
  updateTileData,
}) => {
  const [displayType, setDisplayType] = useState(tile.representation);
  const [data, setData] = useState(propData);

  useEffect(() => {
    setDisplayType(tile.representation);
    setData(propData);
  }, [tile.representation, propData]);

  const handleDisplayTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayType(event.target.value);
    updateTileRepresentation(tile.i, event.target.value);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("tileId", tile.i);

      fetch("http://localhost:3002/upload", {
        method: "POST",
        body: formData,
      })
        .then((response) => response.json())
        .then((data) => {
          updateTileDataset(tile.i, data.file);
        })
        .catch((error) => console.error("Error uploading file", error));

      const reader = new FileReader();
      reader.onload = (e) => {
        const fileData = JSON.parse(e.target?.result as string);
        updateTileData(tile.i, fileData);
        setData(fileData);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div>
      <div
        style={{
          position: "relative",
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
        }}
      >
        <select value={displayType} onChange={handleDisplayTypeChange}>
          <option value="">Select Display Type</option>
          <option value="barGraph">Bar Graph</option>
          <option value="lineGraph">Line Graph</option>
          <option value="gauge">Gauge</option>
          <option value="table">Table</option>
          <option value="list">List</option>
          <option value="number">Number</option>
        </select>
        <input
          type="file"
          onChange={handleFileChange}
          style={{ color: "transparent" }}
        />
      </div>
      <div>
        {displayType === "barGraph" && data && (
          <GraphComponent
            data={data}
            width={tile.w * 200}
            height={tile.h * 300}
          />
        )}
        {displayType === "lineGraph" && data && (
          <LineGraphComponent
            data={data}
            width={tile.w * 200}
            height={tile.h * 300}
          />
        )}
        {displayType === "gauge" && data && (
          <GaugeComponent
            data={data}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
        {displayType === "table" && data && (
          <TableComponent
            data={data}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
        {displayType === "list" && data && (
          <ListComponent
            data={data}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
        {displayType === "number" && data && (
          <NumberComponent
            data={data}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
      </div>
    </div>
  );
};

export default DisplayData;
