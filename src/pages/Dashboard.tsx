import React, { useCallback, useEffect, useState, useRef } from "react";
import "./Dashboard.css";
import Column from "../components/Column";
import { useQuery, useMutation } from "@apollo/client";
import { gql } from "../../src/__generated__/gql";
import {
  type Task as ITask,
  type TaskFilters,
} from "../../src/__generated__/graphql";
import { DragDropContext } from "react-beautiful-dnd";
import TaskCreator from "../components/TaskCreator";
import TaskSelector from "../components/TaskSelector";

// Define GraphQl functions

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

const DELETE_TASK = gql(/* GraphQL */ `
  mutation DeleteTask($input: deleteTaskInput!) {
    deleteTask(input: $input) {
      id
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

// Define Dashboard page
function Dashboard(): JSX.Element {
  const { loading, data: statesDate } = useQuery(GET_STATES, {});

  const [updateTask] = useMutation(UPDATE_TASK);
  const [deleteTask] = useMutation(DELETE_TASK);

  const [columns, setColumns] = useState<Record<number, number[]>>();
  const [fileringCritria, setFilteringCriteria] = useState<TaskFilters>({});

  const { data: tasksData, refetch } = useQuery(GET_ALL_TASKS, {
    variables: {
      filter: { ...fileringCritria },
    },
  });

  const enableRefreshFromBackend = useRef(true);
  useEffect(() => {
    // if tasks have changed then update columns
    // this should only be done after the first render
    if (
      !enableRefreshFromBackend.current ||
      tasksData?.featuredTasks === undefined ||
      tasksData?.featuredTasks?.length === 0 ||
      statesDate?.states === undefined ||
      statesDate?.states === null ||
      statesDate?.states?.length === 0
    )
      return;

    const initialTasksByColumns: Record<number, number[]> =
      statesDate.states.reduce<Record<number, number[]>>((acc, state) => {
        acc[state.id] = [];
        return acc;
      }, {});

    const tasksByColumns: Record<number, number[]> | undefined =
      tasksData?.featuredTasks?.reduce<Record<number, number[]>>(
        (acc, task) => {
          if (task.state === undefined || task.state === null) return acc;
          if (acc[task.state.id] !== null && acc[task.state.id] !== undefined) {
            acc[task.state.id].push(task.id);
          } else {
            acc[task.state.id] = [task.id];
          }
          return acc;
        },
        initialTasksByColumns,
      );
    if (tasksByColumns !== null && tasksByColumns !== undefined)
      setColumns(tasksByColumns);
    enableRefreshFromBackend.current = false;
  }, [tasksData]);

  /**
   * onDeleteTask should be called after task deletion. It enables to reorder tasks in columns
   */
  const onDeleteTask = useCallback(
    (id: number): void => {
      deleteTask({
        variables: {
          input: {
            id,
          },
        },
      })
        .then((res) => {
          const deletedTask = res?.data?.deleteTask;
          if (deletedTask?.state === null || deletedTask?.state === undefined)
            return;
          const columnId: number = deletedTask.state.id;
          if (columns === undefined) return;
          const updatedColumns = {
            ...columns,
            [columnId]: columns[columnId].filter((taskId) => {
              return taskId !== deletedTask.id;
            }),
          };
          setColumns(updatedColumns);
        })
        .catch(() => {});
    },
    [columns],
  );

  /**
   * onDragEnd should be called after task drag and drop. It enables to reorder tasks in columns
   */
  const onDragEnd = useCallback(
    (result: any): void => {
      const destination = result.destination;
      if (destination === null) return;
      const destinationColumn: string = destination.droppableId;
      const destinationIndex: number = destination.index;
      const sourceColumn: string = result.source.droppableId;
      const sourceIndex: number = result.source.index;
      const draggableId: string = result.draggableId;

      if (
        destinationColumn === sourceColumn &&
        destinationIndex === sourceIndex
      )
        return;

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

      const updatedColumns = Object.keys(columns)?.reduce<
        Record<number, number[]>
      >((acc, columnId) => {
        const newTaskIds = columns[parseInt(columnId)];
        if (columnId === sourceColumn) {
          newTaskIds.splice(sourceIndex, 1);
        }
        if (columnId === destinationColumn) {
          newTaskIds.splice(destinationIndex, 0, parseInt(draggableId));
        }
        acc[parseInt(columnId)] = newTaskIds;
        return acc;
      }, {});

      setColumns(updatedColumns);
    },
    [columns],
  );

  const onTaskCreated = (task: ITask): void => {
    if (task.state === null || task.state === undefined) return;
    const columnId: number = task.state.id;
    if (columns === undefined) return;
    const updatedColumns = {
      ...columns,
      [columnId]: [...columns[columnId], task.id],
    };
    setColumns(updatedColumns);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="Dashboard" style={{ color: "#a9a9a9" }}>
      <header
        className="Dashboard-header"
        style={{ backgroundColor: "#c5c5c5" }}
      >
        <div
          className="Dashboard-selector"
          style={{
            display: "flex",
            width: 1110,
            flexDirection: "row",
            backgroundColor: "white",
            borderRadius: 2,
            padding: 10,
          }}
        >
          <TaskCreator onTaskCreated={onTaskCreated} />
        </div>
        <div
          style={{
            display: "flex",
            width: 1110,
            flexDirection: "row",
            backgroundColor: "white",
            marginTop: 5,
            borderRadius: 2,
            padding: 10,
          }}
        >
          <TaskSelector
            onApplyFilters={(filters: TaskFilters) => {
              setFilteringCriteria(filters);
              enableRefreshFromBackend.current = true;
              refetch()
                .then((res) => {})
                .catch(() => {});
            }}
          />
        </div>
        <DragDropContext onDragEnd={onDragEnd}>
          <div style={{ display: "flex", flexDirection: "row" }}>
            {statesDate?.states?.map((column) => (
              <Column
                data={column}
                key={column.id}
                tasksIds={columns?.[column.id]}
                deleteTask={onDeleteTask}
              />
            ))}
          </div>
        </DragDropContext>
      </header>
    </div>
  );
}

export default Dashboard;
