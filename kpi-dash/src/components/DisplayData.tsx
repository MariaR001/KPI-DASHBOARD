import React, { useState } from 'react';
import GaugeComponent from './GaugeComponent';
import TableComponent from './TableComponent';
import ListComponent from './ListComponent';
import NumberComponent from './NumberComponent';
import LineGraphComponent from './LineGraphComponent';
import GraphComponent from './BarGraphComponent';

const DisplayData: React.FC = () => {
  const [displayType, setDisplayType] = useState('');

  const barGraphData = {
    title: 'Sample Bar Graph',
    xAxisTitle: 'Months',
    yAxisTitle: 'Sales',
    data: [
      { name: 'Jan', value: 100 },
      { name: 'Feb', value: 150 },
      { name: 'Mar', value: 200 },
      { name: 'Apr', value: 250 },
      { name: 'May', value: 300 },
      { name: 'Jun', value: 350 },
      { name: 'Jul', value: 400 },
      { name: 'Aug', value: 450 },
      { name: 'Sep', value: 500 },
      { name: 'Oct', value: 550 },
      { name: 'Nov', value: 600 },
      { name: 'Dec', value: 650 },
    ],
  };

  const lineGraphData = {
    title: 'Sample Line Graph',
    data: [
      { name: 'Jan', value: 100 },
      { name: 'Feb', value: 150 },
      { name: 'Mar', value: 200 },
      { name: 'Apr', value: 250 },
      { name: 'May', value: 300 },
      { name: 'Jun', value: 350 },
      { name: 'Jul', value: 400 },
      { name: 'Aug', value: 450 },
      { name: 'Sep', value: 500 },
      { name: 'Oct', value: 550 },
      { name: 'Nov', value: 600 },
      { name: 'Dec', value: 650 },
    ],
    lineKey: 'value',
    xAxisTitle: 'Months',
    yAxisTitle: 'Sales',
  };

  const numberTextEmojiData = 
    { value: 95, // Value between 0 and 100
     title: 'Sample Number Display' };
  
  const gaugeComponentValue = 
    { value: 0.75 , // Value between 0 and 1
     title: 'Sample Gauge Display' }
  ;

  const listComponentData = {
    items: [
      { label: 'Item 1', value: 10 },
      { label: 'Item 2', value: 20 },
      { label: 'Item 3', value: 30 },
    ],
  };

  const tableComponentData = {
    title: 'Sample Table',
    columns: [
      { label: 'Name', key: 'name' },
      { label: 'Age', key: 'age' },
    ],
    rows: [
      { name: 'John', age: 30 },
      { name: 'Jane', age: 25 },
      { name: 'Doe', age: 40 },
    ],
  };

  const handleDisplayTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setDisplayType(event.target.value);
  };

  return (
    <div>
      <div  style={{ position: "relative", justifyContent:"center", alignItems: "center", display:"flex" }}>
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
        {displayType === 'barGraph' && <GraphComponent data={barGraphData} />}
        {displayType === 'lineGraph' && <LineGraphComponent data={lineGraphData} />}
        {displayType === 'gauge' && <GaugeComponent data={gaugeComponentValue} />}
        {displayType === 'table' && <TableComponent data={tableComponentData} />}
        {displayType === 'list' && <ListComponent data ={listComponentData} />}
        {displayType === 'number' && <NumberComponent data = {numberTextEmojiData} />}
      </div>
    </div>
  );
};

export default DisplayData;