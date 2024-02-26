import React, { useState } from 'react';
import BarGraphComponent from './BarGraphComponent';
import ListComponent from './ListComponent';
import NumberComponent from './NumberComponent';

// i need this component to  give the user options on how to display their data
// i.e. bar graph, list, number, etc

const GraphTile: React.FC = () => {
  const [displayType, setDisplayType] = useState('barGraph');
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const [listData, setListData] = useState([
    { label: 'Item 1', value: 1 },
    { label: 'Item 2', value: 2 },
    { label: 'Item 3', value: 3 },
  ]);

  const handleDisplayTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayType(event.target.value);
  };

  return (
    <div>
      <div>
        <select value={displayType} onChange={handleDisplayTypeChange}>
          <option value="barGraph">Bar Graph</option>
          <option value="list">List</option>
          <option value="number">Number</option>
        </select>
      </div>
      <div>
        {displayType === 'barGraph' && <BarGraphComponent data={data} />}
        {displayType === 'list' && <ListComponent items={listData} />}
        {displayType === 'number' && <NumberComponent value={data[0]} />}
      </div>
    </div>
  );
};

export default GraphTile;