import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ITaskProps {
  id: string;
  index: number;
}

const Container = styled.div`
  border: 1px solid lightgrey;
  border-radius: 2px;
  padding: 8px;
  margin-bottom: 8px;
`;

function Task({ id, index }: ITaskProps): JSX.Element {
  console.log("TaskId:", id, "Index:", index);
  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {id}
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
