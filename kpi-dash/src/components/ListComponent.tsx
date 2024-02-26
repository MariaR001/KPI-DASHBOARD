import React from 'react';

interface ListItem {
    label: string;
    value: number;
}

interface ListProps {
    items: ListItem[];
}

const ListComponent: React.FC<ListProps> = ({ items }) => {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index}>{item.label}: {item.value}</li>
            ))}
        </ul>
    );
};

export default ListComponent;
