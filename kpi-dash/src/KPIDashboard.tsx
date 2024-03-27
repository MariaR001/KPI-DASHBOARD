import React, { useState } from "react";
import MyGrid from "./App";
import { Config } from "../backend/Types";

interface KPIDashboardProps {
  initialConfig: Config;
  onConfigChange: (newConfig: Config) => void;
  data: any; // Custom data for the graphs
}

const KPIDashboard: React.FC<KPIDashboardProps> = ({ initialConfig, onConfigChange, data }) => {
  const [config, setConfig] = useState(initialConfig);

  const handleConfigChange = (newConfig: Config) => {
    setConfig(newConfig);
    onConfigChange(newConfig);
  };

  return <MyGrid initialConfig={config} onConfigChange={handleConfigChange} data={data} />;
};

export default KPIDashboard;
