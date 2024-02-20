import React, { useState } from "react";
import "./App.css";
import "./i18n/config";
import Column from "./Column";
import { columns as initialColumnsData } from "./initialData";

import { DragDropContext } from "react-beautiful-dnd";

function App(): JSX.Element {
  const [columns, setColumns] = useState(initialColumnsData);

  const onDragEnd = (result: any): void => {
    const destination = result.destination;

    if (destination === null) return;
    const destinationColumn: string = destination.droppableId;
    const destinationIndex: number = destination.index;
    const sourceColumn: string = result.source.droppableId;
    const sourceIndex: number = result.source.index;

    const draggableId: string = result.draggableId;

    const updatedColumns = columns.map((column) => {
      let newColumn = column;
      if (column.id === sourceColumn) {
        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.splice(sourceIndex, 1);
        newColumn = {
          ...column,
          taskIds: newTaskIds,
        };
      }

      if (column.id === destinationColumn) {
        const newTaskIds = Array.from(newColumn.taskIds);
        newTaskIds.splice(destinationIndex, 0, draggableId);
        newColumn = {
          ...column,
          taskIds: newTaskIds,
        };
      }
      return newColumn;
    });

    setColumns(updatedColumns);
  };

  return (
    <div className="App">
      <header className="App-header">
        <DragDropContext
          onDragStart={() => {
            console.log("onDragStart");
          }}
          onDragEnd={onDragEnd}
          onDragUpdate={() => {
            console.log("onDragUpdate");
          }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {columns.map((column) => (
              <Column data={column} key={column.id} />
            ))}
          </div>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
