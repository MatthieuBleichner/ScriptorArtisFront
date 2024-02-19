import React from "react";
import Task from "./Task";

interface Data {
  id: string;
  title: string;
  taskIds: string[];
}

interface ColumnProps {
  data: Data;
}

function Column({ data }: ColumnProps): JSX.Element {
  return (
    <div style={{ margin: 8, border: "1px solid lightgrey", borderRadius: 2 }}>
      {" "}
      {/* Container */}
      <h3 style={{ padding: 8 }}> {data.title} </h3> {/* Title */}
      <div style={{ padding: 8 }}>
        {" "}
        {/* TaskList */}
        {data.taskIds.map((taskId) => (
          <Task id={taskId} key={taskId} />
        ))}
      </div>
    </div>
  );
}

export default Column;
