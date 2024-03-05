import React from "react";
import Task from "./Task";
import { useQuery } from "@apollo/client";
import { gql } from "../src/__generated__/gql";
import { type State } from "../src/__generated__/graphql";
import { useTranslation } from "react-i18next";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface ColumnProps {
  data: State;
}

const GET_TASKS = gql(/* GraphQL */ `
  query tasksByState($filters: TaskFiltersByState!) {
    tasksByState(filters: $filters) {
      id
    }
  }
`);

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

  const { loading, data: tasks } = useQuery(GET_TASKS, {
    variables: {
      filters: {
        stateId: data.id,
      },
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <Container>
      <Title> {t(data.title)} </Title>
      <Droppable droppableId={`${data.id}`}>
        {(provided) => (
          <TaskList ref={provided.innerRef} {...provided.droppableProps}>
            {tasks?.tasksByState?.length === 0 && <p> {t("No tasks")} </p>}
            {tasks?.tasksByState?.map((task, index) => {
              if (task !== null && task !== undefined) {
                return <Task key={`${task.id}`} id={task.id} index={index} />;
              }
              return null;
            })}
            {provided.placeholder}
          </TaskList>
        )}
      </Droppable>
    </Container>
  );
}

export default Column;
