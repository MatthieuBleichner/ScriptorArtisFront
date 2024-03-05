import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

import { useQuery } from "@apollo/client";
import { gql } from "../src/__generated__/gql";
// import { type Task as ITask } from "../src/__generated__/graphql";
interface ITaskProps {
  id: number;
  index: number;
}

// const Container = styled.div`
//   border: 1px solid lightgrey;
//   border-radius: 2px;
//   padding: 8px;
//   margin-bottom: 8px;
// `;

const borderRadius = 2;
const grid = 8;
const imageSize = 40;

const getBackgroundColor = (
  isDragging: boolean,
  isGroupedOver: boolean,
): string => {
  if (isDragging) {
    return "#d6d6d6";
    // return authorColors.soft;
  }

  if (isGroupedOver) {
    return "#EBECF0";
  }

  return "#FFFFFF";
};

const getBorderColor = (isDragging: boolean): string =>
  isDragging ? /* authorColors.hard */ "black" : "transparent";

const Container = styled.div<{ isDragging: boolean; isGroupedOver: boolean }>`
  border-radius: ${borderRadius}px;
  border: 2px solid transparent;
  border-color: ${(props) => getBorderColor(props.isDragging)};
  background-color: ${(props) =>
    getBackgroundColor(props.isDragging, props.isGroupedOver)};
  box-shadow: ${({ isDragging }) =>
    isDragging ? `2px 2px 1px #A5ADBA` : "none"};
  box-sizing: border-box;
  padding: ${grid}px;
  min-height: ${imageSize}px;
  margin-bottom: ${grid}px;
  user-select: none;

  /* anchor overrides */

  color: #091e42;

  &:hover,
  &:active {
    color: #091e42;
    text-decoration: none;
  }

  &:focus {
    outline: none;
    border-color: "#000000";
    box-shadow: none;
  }

  /* flexbox */
  display: flex;
`;

// const Avatar = styled.div`
//   width: ${imageSize}px;
//   height: ${imageSize}px;
//   border-radius: 50%;
//   margin-right: ${grid}px;
//   flex-shrink: 0;
//   flex-grow: 0;
//   background-color: "red";
//   border: 2px solid "red";
// `;

const Owner = styled.small`
  color: "#000000";
  flex-grow: 0;
  margin: 0;
  background-color: "red";
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

const Round = styled.div`
  border-radius: 50%;
  width: 40px;
  height: 40px;
  background-color: red;
  color: "white";
`;

const Content = styled.div`
  /* flex child */
  flex-grow: 1;
  /*
    Needed to wrap text in ie11
    https://stackoverflow.com/questions/35111090/why-ie11-doesnt-wrap-the-text-in-flexbox
  */
  flex-basis: 100%;
  /* flex parent */
  display: flex;
  flex-direction: column;
`;

const BlockQuote = styled.b`
  fontweight: "bold";
`;

const Footer = styled.div`
  display: flex;
  margin-top: ${grid}px;
  align-items: center;
`;

const Author = styled.small`
  color: "red";
  flex-grow: 0;
  margin: 0;
  background-color: "red";
  border-radius: ${borderRadius}px;
  font-weight: normal;
  padding: ${grid / 2}px;
`;

const QuoteId = styled.small`
  flex-grow: 1;
  flex-shrink: 1;
  margin: 0;
  font-weight: normal;
  text-overflow: ellipsis;
  text-align: right;
`;

const GET_TASK = gql(/* GraphQL */ `
  query task($id: Int!) {
    task(id: $id) {
      id
      title
      description
    }
  }
`);

function Task({ id, index }: ITaskProps): JSX.Element {
  const { loading, data } = useQuery(GET_TASK, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided, dragSnapshot) => (
        <Container
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={dragSnapshot.isDragging}
          isGroupedOver={Boolean(dragSnapshot.combineTargetFor)}
        >
          <Round>
            <Owner>MB</Owner>
          </Round>
          <Content>
            <BlockQuote>{data?.task?.title}</BlockQuote>
            <Footer>
              <Author>{data?.task?.description}</Author>
              <QuoteId>
                id:
                {data?.task?.id}
              </QuoteId>
            </Footer>
          </Content>
        </Container>
      )}
    </Draggable>
  );
}

export default Task;
