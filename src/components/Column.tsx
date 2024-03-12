import React from "react";
import Task from "./Task";
import { type State } from "../__generated__/graphql";
import { useTranslation } from "react-i18next";
import { Droppable } from "react-beautiful-dnd";
import List from "@mui/material/List";
import ListSubheader from "@mui/material/ListSubheader";

interface ColumnProps {
  data: State;
  tasksIds?: number[];
  deleteTask?: (id: number) => void;
}

/**
 * Dispaly a vertical components containing tasks
 */
function Column({ data, tasksIds, deleteTask }: ColumnProps): JSX.Element {
  const { t } = useTranslation();

  console.log("Column render", tasksIds);
  return (
    <Droppable droppableId={`${data.id}`}>
      {(provided) => (
        <List
          sx={{ width: 360, maxWidth: 360, bgcolor: "#dcdcdc", margin: 1 }}
          subheader={<ListSubheader>{t(data.title)}</ListSubheader>}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {tasksIds?.map((taskId, index) => {
            return (
              <Task
                key={taskId}
                id={taskId}
                index={index}
                deleteTask={deleteTask}
              />
            );
          })}
          {provided.placeholder}
        </List>
      )}
    </Droppable>
  );
}

export default React.memo(Column);
