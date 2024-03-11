import React from 'react';
import GaugeChart from 'react-gauge-chart';

interface GaugeData {
  value: number;
  title: string;
}

const GaugeComponent: React.FC<{ data: GaugeData }> = ({ data }) => {
  return (
    <div>
      <h2>{data.title}</h2>
      <div style={{ width: '200px' }}>
        <GaugeChart
          id="gauge-chart1"
          nrOfLevels={20}
          colors={['#FF5F6D', '#FFC371']}
          arcWidth={0.3}
          percent={data.value}
          textColor={'#000'}
          needleColor={'#000'}
        />
      </div>
    </div>
  );
};

export default GaugeComponent;
