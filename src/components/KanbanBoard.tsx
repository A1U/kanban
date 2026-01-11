// import React from 'react';
import { useKanban } from '../store/useKanban';
import Column from './Column';





const KanbanBoard = () => {
  const  columns  = useKanban(state => state.columns);

  return (
   


<main className="pt-2 px-4">
  <div className="flex flex-wrap gap-6 justify-center ">
    {/* Columns */}
    <Column  column="todo" cards={columns.todo}/>
    <Column column="inProgress" cards={columns.inProgress} />
    <Column column="done" cards={columns.done} />
  </div>
</main>



  );
};

export default KanbanBoard;
