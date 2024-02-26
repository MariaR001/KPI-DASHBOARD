import React, { useState } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import './App.css';
import GraphTile from './components/tilegraphs';

const ResponsiveGridLayout = WidthProvider(Responsive);

const MyGrid: React.FC = () => {
  const [layout, setLayout] = useState([
    { i: '1', x: 0, y: 0, w: 1, h: 2 },
    { i: '2', x: 1, y: 0, w: 1, h: 2 },
    { i: '3', x: 2, y: 0, w: 1, h: 2 },
  ]);

  const onLayoutChange = (newLayout: any) => {
    setLayout(newLayout);
  };

  const removeItem = (i: string) => {
    setLayout(layout.filter((item) => item.i !== i));
  };

  const addItem = () => {
    const newItem = {
      i: (layout.length + 1).toString(),
      x: layout.length % 6, // Add horizontally first
      y: Math.floor(layout.length / 3), // Then vertically
      w: 1,
      h: 2,
    };
    setLayout([...layout, newItem]);
    }

    return (
      <div className="dashboard">
        <div className="grid-controls">
          <button onClick={addItem} className="add-tile-button">
            Add Tile
          </button>
        </div>
        <ResponsiveGridLayout
          className="layout"
          layouts={{ lg: layout }}
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
          cols={{ lg: 6, md: 6, sm: 3, xs: 2, xxs: 1 }}
          rowHeight={180}
          onLayoutChange={onLayoutChange}
        >
          {layout.map((item) => (
            <div key={item.i} className="grid-item">
              <div className="remove" onClick={() => removeItem(item.i)}>
                X
              </div>
              <div className="tile-content" style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }} >
                <GraphTile
                  content={
                    <div style={{position: 'relative' }}>
                      <center><h2>Tile {item.i}</h2></center>
                    </div>
                  }
                  onContentChange={(content) => console.log(content)}
                />
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    );
  };  

export default MyGrid;
