'use client';

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ItemList from './components/ItemList';
import DropBox from './components/DropBox';
import data from '../public/data.json'; // Import the JSON file here.

export default function Home() {
  const [availableItems, setAvailableItems] = useState(data); // Items on the left.
  const [droppedItems, setDroppedItems] = useState([]); // Items on the right.

  // Function to handle item drop
  const handleDrop = (item) => {
    // Remove the item from the available list
    setAvailableItems((prevItems) => prevItems.filter((i) => i.id !== item.id));

    // Add the item to the dropped list if it’s not already there
    setDroppedItems((prevItems) => [...prevItems, item]);
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ display: 'flex', gap: '20px', padding: '20px' }}>
        <ItemList items={availableItems} />
        <DropBox items={droppedItems} onDrop={handleDrop} />
      </div>
    </DndProvider>
  );
}
