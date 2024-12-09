'use client';

import { useDrop } from 'react-dnd';

export default function DropBox({ items, onDrop }) {
  const [, dropRef] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => onDrop(item), // Call onDrop when an item is dropped
  }));

  return (
    <div
      ref={dropRef}
      style={{
        flex: 1,
        border: '1px solid #ccc',
        padding: '10px',
        backgroundColor: '#f9f9f9',
        minHeight: '200px',
      }}
    >
      <h3>Dropped Items</h3>
      {items.length > 0 ? (
        items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '10px',
              margin: '5px',
              backgroundColor: '#eee',
            }}
          >
            {item.name}
          </div>
        ))
      ) : (
        <p>No items dropped</p>
      )}
    </div>
  );
}
