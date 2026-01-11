// src/components/Column.tsx
import React from 'react';
import { useKanban } from '../store/useKanban';
import Card from './Card';
import { IoMdAdd } from "react-icons/io";



interface ColumnProps {
  column: 'todo' | 'inProgress' | 'done';
  cards: { id: string, title: string }[];
}

const Column: React.FC<ColumnProps> = ({ column, cards }) => {
  const { addCard, deleteCard, updateCardTitle, moveCard } = useKanban();

  return (
  <>
    <div className="bg-gray-200 p-4 rounded-lg w-80">
      
      <div className='bg-green-100 flex text-lg font-semibold mb-2 p-5 shadow gap-28 '>

     <div>
            <h3 className="">{column.toUpperCase()}
               </h3> </div>
               <div className='text-black cursor-pointer'>
                <IoMdAdd/>
               </div>
               
               
               </div>
               

    
   <button
        className=" cursor-pointer border-2 m-5 border-black p-2   bg-white-500 text-black  flex rounded"
        onClick={() => addCard(column, { id: Date.now().toString(), title: ' |  New Task' })}
      >

        <IoMdAdd/> 

        Add Card
      </button>
      <div className="space-y-4 font-sans ">
        {cards.map(card => (
          <Card
            key={card.id}
            card={card}
            column={column}
            updateCardTitle={updateCardTitle}
            deleteCard={deleteCard}
            moveCard={moveCard}
          />
        ))}
      </div>
    
    </div>
    </>
  );
};

export default Column;
