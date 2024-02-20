import React from "react";
import Task from "./Task";
import { useTranslation } from "react-i18next";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface Data {
  id: string;
  title: string;
  taskIds: string[];
}

interface ColumnProps {
  data: Data;
}

const Container = styled.div`
  margin: 8px;
  border: 1px solid lightgrey;
  border-radius: 2px;
`;
const Title = styled.h3`
  padding: 8px;
`;
const TaskList = styled.div`
  padding: 8px;
`;

function Column({ data }: ColumnProps): JSX.Element {
  const { t } = useTranslation();
  return (
    <Container>
      <Title> {t(data.title)} </Title>
      {/* Title */}
      <Droppable droppableId={data.id}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {data.taskIds.map((taskId, index) => (
              <Task id={taskId} key={taskId} index={index} />
            ))}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}

export default Column;
