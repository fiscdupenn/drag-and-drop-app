'use client';

import { useDrag } from 'react-dnd';

export default function ItemList({ items }) {
  const DragItem = ({ item }) => {
    const [, dragRef] = useDrag(() => ({
      type: 'ITEM',
      item,
    }));

    return (
      <div
        ref={dragRef}
        style={{
          padding: '10px',
          margin: '5px',
          backgroundColor: '#ddd',
          cursor: 'grab',
        }}
      >
        {item.name}
      </div>
    );
  };

  return (
    <div style={{ flex: 1, border: '1px solid #ccc', padding: '10px' }}>
      <h3>Items</h3>
      {items.length > 0 ? (
        items.map((item) => <DragItem key={item.id} item={item} />)
      ) : (
        <p>No items available</p>
      )}
    </div>
  );
}
