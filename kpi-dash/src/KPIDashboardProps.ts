import { Config } from "../backend/Types";

interface KPIDashboardProps {
    initialConfig: Config;
    onConfigChange: (newConfig: Config) => void;
}

export default KPIDashboardProps;
