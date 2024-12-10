'use client';

import { useDrop } from 'react-dnd';
import { useState } from 'react';

export default function DropBox({ items, setItems, removeItem, folders, setFolders }) {
  const [, dropRef] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item, monitor) => {
      const didDrop = monitor.didDrop();
      if (!didDrop) {
        // Only handle drop if it wasn't handled by a folder
        removeItem(item);
        setItems((prevItems) => [...prevItems, item]);
      }
    },
  }));

  const handleFolderDrop = (folderId, item) => {
    removeItem(item);
    setFolders((prevFolders) =>
      prevFolders.map((folder) =>
        folder.id === folderId
          ? { ...folder, items: [...folder.items, item] }
          : folder
      )
    );
  };

  const addFolder = () => {
    const newFolder = {
      id: `folder-${folders.length + 1}`,
      name: `Folder ${folders.length + 1}`,
      items: [],
    };
    setFolders((prev) => [...prev, newFolder]);
  };

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
      <button onClick={addFolder} style={{ marginBottom: '10px' }}>
        Add Folder
      </button>
      {folders.map((folder) => (
        <Folder
          key={folder.id}
          folder={folder}
          onDrop={(item) => handleFolderDrop(folder.id, item)}
          updateFolderName={(name) =>
            setFolders((prevFolders) =>
              prevFolders.map((f) =>
                f.id === folder.id ? { ...f, name } : f
              )
            )
          }
        />
      ))}
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

function Folder({ folder, onDrop, updateFolderName }) {
  const [, folderDropRef] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => onDrop(item),
  }));

  const [isEditing, setIsEditing] = useState(false);
  const [folderName, setFolderName] = useState(folder.name);

  const handleNameChange = (e) => setFolderName(e.target.value);

  const handleBlur = () => {
    setIsEditing(false);
    updateFolderName(folderName);
  };

  return (
    <div
      ref={folderDropRef}
      style={{
        border: '1px solid #aaa',
        padding: '10px',
        margin: '5px',
        backgroundColor: '#ddd',
      }}
    >
      {isEditing ? (
        <input
          type="text"
          value={folderName}
          onChange={handleNameChange}
          onBlur={handleBlur}
          autoFocus
          style={{
            marginBottom: '10px',
            padding: '5px',
            width: '100%',
          }}
        />
      ) : (
        <h4
          onClick={() => setIsEditing(true)}
          style={{ cursor: 'pointer', marginBottom: '10px' }}
        >
          {folder.name}
        </h4>
      )}
      {folder.items.length > 0 ? (
        folder.items.map((item) => (
          <div
            key={item.id}
            style={{
              padding: '5px',
              backgroundColor: '#fff',
              margin: '5px',
            }}
          >
            {item.name}
          </div>
        ))
      ) : (
        <p>No items</p>
      )}
    </div>
  );
}
