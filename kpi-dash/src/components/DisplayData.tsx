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
  updateTileRepresentation: (tileId: string, newRepresentation: string) => void;
  updateTileDataset: (tileId: string, newDataset: string) => void;
}

const DisplayData: React.FC<DisplayDataProps> = ({
  tile,
  updateTileRepresentation,
  updateTileDataset,
}) => {
  const [displayType, setDisplayType] = useState(tile.representation);
  const [fileData, setFileData] = useState(null);

  useEffect(() => {
    setDisplayType(tile.representation);
  }, [tile.representation]);

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
          setFileData(data.data);
          updateTileDataset(tile.i, data.file);
        })
        .catch((error) => console.error("Error uploading file", error));
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
        <input type="file" onChange={handleFileChange} />
      </div>
      <div>
        {displayType === "barGraph" && fileData && (
          <GraphComponent
            data={fileData}
            width={tile.w * 200}
            height={tile.h * 300}
          />
        )}
        {displayType === "lineGraph" && fileData && (
          <LineGraphComponent
            data={fileData}
            width={tile.w * 200}
            height={tile.h * 300}
          />
        )}
        {displayType === "gauge" && fileData && (
          <GaugeComponent
            data={fileData}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
        {displayType === "table" && fileData && (
          <TableComponent
            data={fileData}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
        {displayType === "list" && fileData && (
          <ListComponent
            data={fileData}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
        {displayType === "number" && fileData && (
          <NumberComponent
            data={fileData}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
      </div>
    </div>
  );
};

export default DisplayData;
