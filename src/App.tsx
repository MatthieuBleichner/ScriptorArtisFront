import React from "react";
import "./App.css";
import Column from "./Column";
import { columns } from "./initialData";

// import { DragDropContext } from "react-beautiful-dnd";

function App(): JSX.Element {
  return (
    <div className="App">
      <header className="App-header">
        <div style={{ display: "flex", flexDirection: "row" }}>
          {columns.map((column) => (
            <Column data={column} key={column.id} />
          ))}
        </div>
      </header>
    </div>
  );
}

export default App;
