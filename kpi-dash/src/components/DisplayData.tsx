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
  data: any;
}

const DisplayData: React.FC<DisplayDataProps> = ({
  tile,
  updateTileRepresentation,
  data,
}) => {
  const [displayType, setDisplayType] = useState(tile.representation);

  useEffect(() => {
    setDisplayType(tile.representation);
  }, [tile.representation]);

  const handleDisplayTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setDisplayType(event.target.value);
    updateTileRepresentation(tile.i, event.target.value);
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
      </div>
      <div>
        {displayType === "barGraph" && (
          <GraphComponent
            data={data.barGraphData}
            width={tile.w * 200}
            height={tile.h * 300}
          />
        )}
        {displayType === "lineGraph" && (
          <LineGraphComponent
            data={data.linegraphData}
            width={tile.w * 200}
            height={tile.h * 300}
          />
        )}
        {displayType === "gauge" && (
          <GaugeComponent
            data={data.gaugeComponentValue}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
        {displayType === "table" && (
          <TableComponent
            data={data.tableComponentData}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
        {displayType === "list" && (
          <ListComponent
            data={data.listComponentData}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
        {displayType === "number" && (
          <NumberComponent
            data={data.numberTextEmojiData}
            width={tile.w * 100}
            height={tile.h * 100}
          />
        )}
      </div>
    </div>
  );
};

export default DisplayData;
