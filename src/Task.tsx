import React from "react";

interface ITask {
  id: string;
}

function Task({ id }: ITask): JSX.Element {
  return (
    <div
      style={{
        border: "1px solid lightgrey",
        borderRadius: 2,
        padding: 8,
        marginBottom: 8,
      }}
    >
      {id}
    </div>
  );
}

export default Task;
