
import React, { useState, useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { RiDeleteBin5Line } from "react-icons/ri";
import { FiEdit } from "react-icons/fi";




interface CardProps {
  card: { 
    id: string; 
    title: string 
  };
  column: "todo" | "inProgress" | "done";
  updateCardTitle: (
    column: "todo" | "inProgress" | "done", 
    cardId: string, 
    title: string
  ) => void;
  deleteCard: (
    column: "todo" | "inProgress" | "done", 
    cardId: string
  ) => void;
  moveCard: (
    from: "todo" | "inProgress" | "done", 
    to: "todo" | "inProgress" | "done", 
    cardId: string
  ) => void;
}

const Card: React.FC<CardProps> = ({ 
  card, 
  column, 
  updateCardTitle, 
  deleteCard, 
  moveCard 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(card.title);
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'CARD',
    item: { cardId: card.id, fromColumn: column },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  }));

  const [, drop] = useDrop(() => ({
    accept: 'CARD',
    drop: (item: { cardId: string; fromColumn: "todo" | "inProgress" | "done" }) => {
      if (item.cardId !== card.id) {
        moveCard(item.fromColumn, column, item.cardId);
      }
    },
  }));

  // Combine drag and drop refs
  drag(drop(ref));

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.target.value);
  };

  const handleSaveTitle = () => {
    updateCardTitle(column, card.id, newTitle);
    setIsEditing(false);
  };

  return (
    <div
      ref={ref}
      className={`p-4 bg-white rounded shadow mb-2 cursor-pointer ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      {isEditing ? (
        <div>
          <input
            type="text"
            value={newTitle}
            onChange={handleTitleChange}
            className="border p-1 mb-2 w-full"
          />
          <button
            onClick={handleSaveTitle}
            className="bg-yellow-500 text-white p-3 py-1 rounded"
          >
           Save
          </button>
        </div>
      ) : (
        <div className='flex gap-6'>


          <p className="mb-2">{card.title}</p>
          <button
            onClick={() => deleteCard(column, card.id)}
            className="bg-red-500 text-white px-2 py-1 rounded mr-2 cursor-pointer"
          >
           <RiDeleteBin5Line/>
          </button>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-gray-800 text-red-500 px-2 py-1 rounded cursor-pointer"
          >
            <FiEdit/>
          </button>
        </div>
      
      )}
    </div>
  );
};

export default Card;