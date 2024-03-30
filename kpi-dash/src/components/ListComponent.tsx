import React from 'react';

interface ListItem {
  label: string;
  value: number;
}

interface ListData {
  items: ListItem[];
}

interface ListComponentProps {
  data: ListData;
  height: number;
  width: number;
}

const ListComponent: React.FC<ListComponentProps> = ({ data, width, height }) => {
  return (
    <div>
      <h2>List</h2>
      <ul>
        {data.items.map((item, index) => (
          <li key={index}>
            {item.label}: {item.value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ListComponent;
