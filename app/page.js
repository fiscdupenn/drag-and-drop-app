'use client';

import { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ItemList from './components/ItemList';
import DropBox from './components/DropBox';
import data from '../public/data.json';

export default function Home() {
  const [availableItems, setAvailableItems] = useState(data); // Items on the left
  const [droppedItems, setDroppedItems] = useState([]); // Non-folder dropped items
  const [folders, setFolders] = useState([]); // All folders in DropBox

  const removeItem = (item) => {
    setAvailableItems((prev) => prev.filter((i) => i.id !== item.id));
    setDroppedItems((prev) => prev.filter((i) => i.id !== item.id));
    setFolders((prevFolders) =>
      prevFolders.map((folder) => ({
        ...folder,
        items: folder.items.filter((i) => i.id !== item.id),
      }))
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div style={{ padding: '20px' }}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px' }}>
          Organizational Drag & Drop
        </h1>
        <div style={{ display: 'flex', gap: '20px' }}>
          <ItemList items={availableItems} />
          <DropBox
            items={droppedItems}
            setItems={setDroppedItems}
            removeItem={removeItem}
            folders={folders}
            setFolders={setFolders}
          />
        </div>
      </div>
    </DndProvider>
  );
}
