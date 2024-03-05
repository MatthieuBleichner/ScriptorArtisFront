import React from "react";
import "./App.css";
import "./i18n/config";
import Column from "./Column";
// import { columns as initialColumnsData } from "./initialData";
import { useQuery } from "@apollo/client";
import { gql } from "../src/__generated__/gql";
import { DragDropContext } from "react-beautiful-dnd";

const GET_STATES = gql(/* GraphQL */ `
  query GetStates {
    states {
      id
      title
      index
    }
  }
`);

function App(): JSX.Element {
  const { loading, error, data } = useQuery(GET_STATES, {});

  console.log("=======> loading", loading, "error", error, "data", data);

  const onDragEnd = (result: any): void => {
    // const destination = result.destination;
    // if (destination === null) return;
    // const destinationColumn: string = destination.droppableId;
    // const destinationIndex: number = destination.index;
    // const sourceColumn: string = result.source.droppableId;
    // const sourceIndex: number = result.source.index;
    // const draggableId: string = result.draggableId;
    // // const updatedColumns = columns.map((column) => {
    // //   let newColumn = column;
    // //   if (column.id === sourceColumn) {
    // //     const newTaskIds = Array.from(column.taskIds);
    // //     newTaskIds.splice(sourceIndex, 1);
    // //     newColumn = {
    // //       ...column,
    // //       taskIds: newTaskIds,
    // //     };
    // //   }
    // //   if (column.id === destinationColumn) {
    // //     const newTaskIds = Array.from(newColumn.taskIds);
    // //     newTaskIds.splice(destinationIndex, 0, draggableId);
    // //     newColumn = {
    // //       ...column,
    // //       taskIds: newTaskIds,
    // //     };
    // //   }
    // //   return newColumn;
    // // });
    // // setColumns(updatedColumns);
  };

  if (loading) return <p>Loading...</p>;

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
            {data?.states?.map((column) => (
              <Column data={column} key={column.id} />
            ))}
          </div>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
