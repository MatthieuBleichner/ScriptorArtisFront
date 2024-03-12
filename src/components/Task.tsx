import React from "react";
import { Draggable } from "react-beautiful-dnd";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { useQuery } from "@apollo/client";
import { gql } from "../__generated__/gql";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";

interface ITaskProps {
  id: number;
  index: number;
  deleteTask?: (id: number) => void;
}

const GET_TASK = gql(/* GraphQL */ `
  query task($id: Int!) {
    task(id: $id) {
      id
      title
      description
      priority
      date
      owner {
        firstName
        lastName
      }
    }
  }
`);

function Task({ id, index, deleteTask }: ITaskProps): JSX.Element {
  const { loading, data } = useQuery(GET_TASK, {
    variables: {
      id,
    },
  });

  if (loading) return <p>Loading...</p>;

  const onDeletePressed = (): void => {
    deleteTask?.(id);
  };

  const formatdDate: Date | null =
    data?.task?.date !== null && data?.task?.date !== undefined
      ? new Date(data?.task?.date)
      : null;

  return (
    <Draggable draggableId={`${id}`} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          style={{ flex: 1 }}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <ListItem
            secondaryAction={
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={onDeletePressed}
              >
                <DeleteIcon />
              </IconButton>
            }
            sx={{ width: 345, bgcolor: "background.paper", margin: 1 }}
          >
            <ListItemAvatar>
              <Avatar
                alt={`${data?.task?.owner?.firstName} ${data?.task?.owner?.lastName}`}
                src={"path"}
                sx={{ bgcolor: "#81c784" }}
              />
            </ListItemAvatar>
            <ListItemText
              primaryTypographyProps={{ color: "black" }}
              primary={data?.task?.title}
              secondary={
                <React.Fragment>
                  <Typography
                    sx={{ display: "inline", paddingRight: 3 }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {data?.task?.priority}
                  </Typography>
                  {formatdDate !== null
                    ? formatdDate.toLocaleDateString("fr", {
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })
                    : null}
                </React.Fragment>
              }
            />
          </ListItem>
        </div>
      )}
    </Draggable>
  );
}

export default Task;
