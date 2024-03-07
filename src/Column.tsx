import React /*, { useEffect } */ from "react";
import Task from "./Task";
// import { useQuery } from "@apollo/client";
// import { gql } from "../src/__generated__/gql";
import { type State } from "../src/__generated__/graphql";
import { useTranslation } from "react-i18next";
import { Droppable } from "react-beautiful-dnd";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

interface ColumnProps {
  data: State;
  tasksIds?: number[];
}

// const GET_TASKS = gql(/* GraphQL */ `
//   query tasksByState($filters: TaskFiltersByState!) {
//     tasksByState(filters: $filters) {
//       id
//     }
//   }
// `);

function Column({ data, tasksIds }: ColumnProps): JSX.Element {
  const { t } = useTranslation();

  // const { loading, data: tasks } = useQuery(GET_TASKS, {
  //   variables: {
  //     filters: {
  //       stateId: data.id,
  //     },
  //   },
  // });

  console.log("inside column", data, tasksIds);
  // if (loading) return <p>Loading...</p>;

  return (
    <Droppable droppableId={`${data.id}`}>
      {(provided) => (
        <List
          sx={{ width: 360, maxWidth: 360, bgcolor: "#90caf9", margin: 1 }}
          subheader={<ListSubheader>{t(data.title)}</ListSubheader>}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {/* {tasks?.tasksByState?.map((task, index) => { */}
          {tasksIds?.map((taskId, index) => {
            // if (task === undefined || task?.id === undefined) return null;
            // return <Task key={task?.id} id={task?.id} index={index} />;
            return <Task key={taskId} id={taskId} index={index} />;
          })}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}

export default React.memo(Column);
