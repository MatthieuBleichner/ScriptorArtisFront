import React, { useCallback, useEffect, useState } from "react";
import "./App.css";
import "./i18n/config";
import Column from "./Column";
// import { columns as initialColumnsData } from "./initialData";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "../src/__generated__/gql";
// import { type Task } from "../src/__generated__/graphql";
import { DragDropContext } from "react-beautiful-dnd";

// Define mutation
const UPDATE_TASK = gql(/* GraphQL */ `
  mutation UpdateTask($input: updateTaskInput!) {
    updateTask(input: $input) {
      id
      title
      description
      state {
        id
      }
    }
  }
`);

const GET_STATES = gql(/* GraphQL */ `
  query GetStates {
    states {
      id
      title
      index
    }
  }
`);

const GET_ALL_TASKS = gql(/* GraphQL */ `
  query GetFeaturedTasks($filter: TaskFilters!) {
    featuredTasks(filter: $filter) {
      id
      state {
        id
      }
    }
  }
`);

function App(): JSX.Element {
  const { loading, error, data } = useQuery(GET_STATES, {});
  const {
    // loading: tasksLoading,
    // error: tasksError,
    data: tasksData,
  } = useQuery(GET_ALL_TASKS, {
    variables: {
      filter: {},
    },
  });
  const [updateTask] = useMutation(UPDATE_TASK);
  console.log("=======> loading", loading, "error", error, "data", data);

  const [columns, setColumns] = useState<Record<number, number[]>>();

  useEffect(() => {
    console.log("tasks have changed", tasksData);

    const tasksByColumns: Record<number, number[]> | undefined =
      tasksData?.featuredTasks?.reduce<Record<number, number[]>>(
        (acc, task) => {
          console.log("task", task);
          if (task.state === undefined || task.state === null) return acc;
          if (acc[task.state.id] !== null && acc[task.state.id] !== undefined) {
            acc[task.state.id].push(task.id);
          } else {
            acc[task.state.id] = [task.id];
          }
          return acc;
        },
        {},
      );

    console.log("tasksByColumns", tasksByColumns);
    if (tasksByColumns !== null && tasksByColumns !== undefined)
      setColumns(tasksByColumns);
  }, [tasksData]);

  // console.log("columns", columns);

  // const [refresh, setRefresh] = React.useState(false);

  const onDragEnd = useCallback((result: any): void => {
    const destination = result.destination;
    if (destination === null) return;
    const destinationColumn: string = destination.droppableId;
    const destinationIndex: number = destination.index;
    const sourceColumn: string = result.source.droppableId;
    const sourceIndex: number = result.source.index;
    const draggableId: string = result.draggableId;

    if (destinationColumn === sourceColumn && destinationIndex === sourceIndex)
      return;

    console.log(
      "destinationColumn",
      destinationColumn,
      "destinationIndex",
      destinationIndex,
      "sourceColumn",
      sourceColumn,
      "sourceIndex",
      sourceIndex,
      "draggableId",
      draggableId,
    );
    updateTask({
      variables: {
        input: {
          id: parseInt(draggableId),
          stateId: parseInt(destinationColumn),
        },
      },
    })
      .then((res) => {})
      .catch(() => {});

    if (columns === undefined) return;

    console.log("ici");
    const updatedColumns = Object.keys(columns)?.reduce<
      Record<number, number[]>
    >((acc, columnId) => {
      const newTaskIds = columns[parseInt(columnId)];
      if (columnId === sourceColumn) {
        newTaskIds.splice(sourceIndex, 1);
      } else if (columnId === destinationColumn) {
        newTaskIds.splice(destinationIndex, 0, parseInt(draggableId));
      }
      acc[parseInt(columnId)] = newTaskIds;
      return acc;
    }, {});

    console.log("updatedColumns", updatedColumns);
    setColumns(updatedColumns);
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="App">
      <header className="App-header">
        <DragDropContext
          // onDragStart={() => {
          //   console.log("onDragStart");
          // }}
          onDragEnd={onDragEnd}
          // onDragUpdate={() => {
          //   console.log("onDragUpdate");
          // }}
        >
          <div style={{ display: "flex", flexDirection: "row" }}>
            {data?.states?.map((column) => (
              <Column
                data={column}
                key={column.id}
                tasksIds={columns?.[column.id]}
              />
            ))}
          </div>
        </DragDropContext>
      </header>
    </div>
  );
}

export default App;
