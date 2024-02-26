import React, { useState } from 'react';

interface DashboardTileProps {
  content: React.ReactNode;
  onContentChange: (content: React.ReactNode) => void;
}

const GraphTile: React.FC<DashboardTileProps> = ({ content, onContentChange }) => {
  const [displayData, setDisplayData] = useState<boolean>(false);

  const handleDisplayData = () => {
   // Implement logic to prompt the user for graph options
   const graphOptions = ['Bar Chart', 'Line Chart', 'Pie Chart'];
   const selectedOption = window.prompt('Select Graph', graphOptions.join(', '));

   // If the user selects a valid option
   if (selectedOption && graphOptions.includes(selectedOption)) {
     // Update content with selected graph
     onContentChange(<div>{content}<br />Selected Graph: {selectedOption}</div>);
   } else {
     // Handle case where user cancels or selects invalid option
      onContentChange(content);
   }
   
   // Toggle displayData state
   setDisplayData(prevState => !prevState);
   console.log('test');
  };

  return (
    <div style={{ position: 'relative' }}>
      {content}
      <button onClick={handleDisplayData}>
        {displayData ? 'Hide Data' : 'Display Data'}
      </button>
    </div>
  );
};

export default GraphTile;