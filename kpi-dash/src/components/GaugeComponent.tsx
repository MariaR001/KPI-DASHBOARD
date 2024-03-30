import React from 'react';
import GaugeChart from 'react-gauge-chart';

interface GaugeData {
  value: number;
  title: string;
}

interface GaugeComponentProps {
  data: GaugeData;
  height: number;
  width: number;
}

const GaugeComponent: React.FC<GaugeComponentProps> = ({ data, height, width }) => {
  return (
    <div  style={{ width: '100%', textAlign: 'center', justifyContent: 'center',  overflowX: 'auto', overflowY: 'auto' }}>
      <h2>{data.title}</h2>
      <div style={{ display: 'inline-block', width: width, height: height, }}>
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
